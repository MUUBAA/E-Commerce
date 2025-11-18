using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Contract.Products;
using Server.Data.Dto;
using Server.Data.Entities.Products;
using Server.Services.ProductService;
using Server.Utils;

namespace Server.Controllers.ProductController;
[ApiController]
public class ProductsController : BaseController
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

   [HttpPost]
   [Route("/product/create")]
   public IActionResult CreateProduct([FromBody] ProductsContract request)
    {
         _productService.CreateProduct(request);
         
        return Ok(new GenericApiResponse<string>(true, "Product Created Sucessfully", null));
    }

    [HttpPost]
    [Route("/product/update")]
    public IActionResult UpdateProduct([FromBody] ProductUpdate request)
    {
        var result = _productService.UpdateProduct(request);
        return Ok(new GenericApiResponse<bool>(true, "Product Updated Sucessfully", result));
    }
    [HttpGet]
    [Route("/product/get-by-id")]
    public IActionResult GetProductById([FromRoute] int productId)
    {
        var product = _productService.GetProductById(productId);
        return Ok(new GenericApiResponse<Product>(true, "Product Fetched Sucessfully", product));
    }
    [HttpPost]
    [Route("/product/get-all")]
    public ActionResult<GenericApiResponse<PaginationResponse<Product>>> GetAllProducts([FromBody] ProductsContract request)
    {
        var products = _productService.GetAllProducts(request);
        return Ok(new GenericApiResponse<PaginationResponse<Product>>(true, "Products Fetched Sucessfully", products));
    }
}




