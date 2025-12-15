using Server.Data.Contract.Products;
using Server.Data.Dto;
using Server.Data.Entities.Products;
using static Server.Data.Exceptions.DataExceptions;

namespace Server.Data.Repositories
{
    public interface IProductsRepository
    {
        int CreateProduct(Product products);
        void UpdateProduct(ProductUpdate productUpdate);
        Product? GetProductById(int productId);
        (long, int, List<Product> products) GetAllProducts(ProductsContract contract);
        List<ProductSearchDto> SearchProductsByName(string itemName);
    }
    public class ProductsRepository(Repository repository) : IProductsRepository
    {
        public int CreateProduct(Product products)
        {
            var existingProduct = repository.Products.FirstOrDefault(p => p.ItemName == products.ItemName);
            if (existingProduct != null)
            {
                if (!existingProduct.IsDeleted)
                {
                    throw new Exception("Product with the same name already exists.");

                }

                else
                {
                    existingProduct.IsDeleted = false;
                    existingProduct.UpdatedAt = DateTime.UtcNow;
                    existingProduct.UpdatedBy = products.CreatedBy;
                    repository.SaveChanges();
                    return existingProduct.Id;
                }
            }
            repository.Add(products);
            repository.SaveChanges();
            return products.Id;
        }

        public void UpdateProduct(ProductUpdate productUpdate)
        {
            var existingProduct = repository.Products.FirstOrDefault(p => p.Id == productUpdate.Id);
            if (existingProduct == null)
            {
                throw new Exception("Product not found.");
            }
            existingProduct.ItemName = productUpdate.ItemName;
            existingProduct.ItemDescription = productUpdate.ItemDescription;
            existingProduct.ItemPrice = productUpdate.ItemPrice;
            existingProduct.CategoryId = productUpdate.CategoryId;
            existingProduct.CategoryName = productUpdate.CategoryName;
            existingProduct.StockQuantity = productUpdate.StockQuantity;
            existingProduct.UpdatedAt = DateTime.UtcNow;
            existingProduct.UpdatedBy = productUpdate.UpdatedBy;
            repository.SaveChanges();
        }

         public Product? GetProductById(int productId)
        {
           
            var product = repository.Products.FirstOrDefault(p => p.Id == productId);
            return product;
        }

        public (long, int, List<Product> products) GetAllProducts(ProductsContract contract)
        {
              var page = contract.Page <= 0 ? 1 : contract.Page;
              var pageSize = contract.PageSize <= 0 ? 10 : contract.PageSize;

              var query = repository.Products.Where(c => !c.IsDeleted && c.IsActive);
              if(!string.IsNullOrEmpty(contract.ItemName))
              {
                  query = query.Where(p => p.ItemName != null && p.ItemName.Contains(contract.ItemName));
              }
              if(!string.IsNullOrEmpty(contract.CategoryName))
              {
                  query = query.Where(p => p.CategoryName != null && p.CategoryName.Contains(contract.CategoryName));
              }
            if (contract.CategoryId > 0)
            {
                query = query.Where(p => p.CategoryId == contract.CategoryId);
            }
              var totalItems = query.Count();
              var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
              var products = query
                  .Take(pageSize)
                  .ToList();
              return (totalItems, totalPages, products);
        }
        public List<ProductSearchDto> SearchProductsByName(string itemName)
        {
            var query = repository.Products.AsQueryable();
            if (!string.IsNullOrEmpty(itemName))
            {
                query = query.Where(p => p.ItemName != null && p.ItemName.Contains(itemName));
            }

            var products = repository.Products
                .Where(p => p.ItemName != null && p.ItemName.Contains(itemName))
                .Select(p => new ProductSearchDto
                {
                    Id = p.Id,
                    ItemName = p.ItemName
                }).ToList();
            return products;
        }

    }
}
