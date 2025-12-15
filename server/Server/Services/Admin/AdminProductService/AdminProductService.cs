using Microsoft.EntityFrameworkCore;
using Server.Data.Contract.Products;
using Server.Data.Contract;
using Server.Data.Dto.Admin;
using Server.Data.Entities.Products;
using Server.Data.Repositories;

namespace Server.Services.Admin.AdminProductService
{
    public interface IAdminProductService
    {
        int AddProduct(AdminProductCreateDto dto, string performedBy);
        void UpdateProduct(AdminProductUpdateDto dto, string performedBy);
        void DeleteProduct(int productId, string performedBy);
        void UpdateStatus(ProductStatusUpdateDto dto, string performedBy);
        void UpdatePricing(ProductPriceStockDto dto, string performedBy);
        void UpdateImage(int productId, string imageUrl, string performedBy);
        PagedResult<Product> GetAll(PaginationContract pagination);
        Product GetProductById(int productId);
    }
    public class AdminProductService : IAdminProductService
    {
        private readonly IProductsRepository _productsRepository;
        private readonly Repository _db;
        private readonly ILogger<AdminProductService> _logger;

        public AdminProductService(IProductsRepository productsRepository, Repository db, ILogger<AdminProductService> logger)
        {
            _productsRepository = productsRepository;
            _db = db;
            _logger = logger;
        }

        public int AddProduct(AdminProductCreateDto dto, string performedBy)
        {
            var product = new Product
            {
                ItemName = dto.Name,
                ItemDescription = dto.Description,
                ItemPrice = dto.Price,
                CategoryId = dto.CategoryId,
                CategoryName = dto.CategoryName,
                StockQuantity = dto.StockQuantity,
                DiscountPercent = dto.DiscountPercent,
                ImageUrl = dto.ImageUrl,
                CreatedBy = performedBy,
                UpdatedBy = performedBy,
                IsActive = true
            };
            return _productsRepository.CreateProduct(product);
        }

        public void UpdateProduct(AdminProductUpdateDto dto, string performedBy)
        {
            var update = new ProductUpdate
            {
                Id = dto.Id,
                ItemName = dto.Name,
                ItemDescription = dto.Description,
                ItemPrice = dto.Price,
                CategoryId = dto.CategoryId,
                CategoryName = dto.CategoryName,
                StockQuantity = dto.StockQuantity,
                UpdatedBy = performedBy
            };
            _productsRepository.UpdateProduct(update);
            var dbProduct = _productsRepository.GetProductById(dto.Id);
            if (dbProduct != null)
            {
                dbProduct.DiscountPercent = dto.DiscountPercent;
                dbProduct.ImageUrl = dto.ImageUrl;
                dbProduct.IsActive = dto.IsActive;
                dbProduct.UpdatedAt = DateTime.UtcNow;
                dbProduct.UpdatedBy = performedBy;
                _db.SaveChanges();
            }
        }

        public void DeleteProduct(int productId, string performedBy)
        {
            var product = _productsRepository.GetProductById(productId) ?? throw new Exception("Product not found");
            product.IsDeleted = true;
            product.DeletedAt = DateTime.UtcNow;
            product.DeletedBy = performedBy;
            _db.SaveChanges();
        }

        public void UpdateStatus(ProductStatusUpdateDto dto, string performedBy)
        {
            var product = _productsRepository.GetProductById(dto.ProductId) ?? throw new Exception("Product not found");
            product.IsActive = dto.IsActive;
            product.UpdatedAt = DateTime.UtcNow;
            product.UpdatedBy = performedBy;
            _db.SaveChanges();
        }

        public void UpdatePricing(ProductPriceStockDto dto, string performedBy)
        {
            var product = _productsRepository.GetProductById(dto.ProductId) ?? throw new Exception("Product not found");
            product.ItemPrice = dto.Price;
            product.DiscountPercent = dto.DiscountPercent;
            product.StockQuantity = dto.StockQuantity;
            product.UpdatedAt = DateTime.UtcNow;
            product.UpdatedBy = performedBy;
            if (product.StockQuantity <= 0)
            {
                product.IsActive = false;
            }
            _db.SaveChanges();
        }

        public void UpdateImage(int productId, string imageUrl, string performedBy)
        {
            var product = _productsRepository.GetProductById(productId) ?? throw new Exception("Product not found");
            product.ImageUrl = imageUrl;
            product.UpdatedAt = DateTime.UtcNow;
            product.UpdatedBy = performedBy;
            _db.SaveChanges();
        }

        public PagedResult<Product> GetAll(PaginationContract pagination)
        {
            var page = pagination != null && pagination.Page > 0 ? pagination.Page : 1;
            var pageSize = pagination != null && pagination.PageSize > 0 ? pagination.PageSize : 20;

            var query = _db.Products
                .AsNoTracking()
                .Where(p => !p.IsDeleted);

            // Optional product name search filter
            if (!string.IsNullOrWhiteSpace(pagination?.Search))
            {
                var search = pagination!.Search!.Trim();
                query = query.Where(p => p.ItemName != null && p.ItemName.Contains(search));
            }

            var total = query.Count();

            var items = query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return new PagedResult<Product>
            {
                Items = items,
                Total = total
            };
        }

        public Product GetProductById(int productId)
        {
            var product = _db.Products
                .AsNoTracking()
                .FirstOrDefault(p => p.Id == productId && !p.IsDeleted);

            if (product == null)
                throw new Exception("Product not found");

            return product;
        }

    }

}
