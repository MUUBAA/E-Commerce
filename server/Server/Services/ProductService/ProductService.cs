using Microsoft.EntityFrameworkCore;
using Server.Data.Contract.Products;
using Server.Data.Dto;
using Server.Data.Entities.Products;
using Server.Data.Repositories;
using Server.Services.CloudinaryService;
using static Server.Data.Exceptions.DataExceptions;

namespace Server.Services.ProductService
{
    public interface IProductService
    {
      void CreateProduct(ProductsContract products);
      bool UpdateProduct(ProductUpdate productUpdate);
      Product GetProductById(int productId);
      PaginationResponse<Product> GetAllProducts(ProductsContract contract);
    }

    public class ProductService(IProductsRepository productsRepository, Repository repository) : IProductService
    {
       private readonly IProductsRepository _productsRepository = productsRepository;

       public void CreateProduct(ProductsContract products)
       {
            var product = new Product
            {
                Id = products.Id,
                ItemName = products.ItemName,
                ItemDescription = products.ItemDescription,
                ItemPrice = products.ItemPrice,
                CategoryId = products.CategoryId,
                CategoryName = products.CategoryName,
                StockQuantity = products.StockQuantity,
                ItemUrl = products.ItemUrl,
            };

            var productId = _productsRepository.CreateProduct(product);
            repository.SaveChanges();
        }

         public bool UpdateProduct(ProductUpdate productUpdate)
        {
            _productsRepository.UpdateProduct(productUpdate);
            return true;
        }

        public PaginationResponse<Product> GetAllProducts(ProductsContract contract)
        {
            var (totalItems, count, products) = _productsRepository.GetAllProducts(contract);
            var response = new PaginationResponse<Product>
            {
                TotalItems = totalItems,
                ItemsPerPage = count,
                Items = products
            };
            return response;
        }
        
        public Product GetProductById(int productId)
        {
            var product = _productsRepository.GetProductById(productId) ?? throw new NotFoundException("User not Found");
            return product;
        }


    }
}
