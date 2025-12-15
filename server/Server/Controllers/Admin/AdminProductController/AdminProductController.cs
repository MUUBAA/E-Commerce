using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Dto.Admin;
using Server.Services.Admin.AdminProductService;
using Server.Services.Admin.InventoryService;
using System.Security.Claims;

namespace Server.Controllers.Admin.AdminProductController
{
    [ApiController]
    [Route("admin/products")]
    [Authorize(Roles = "Admin")]
    public class AdminProductController : ControllerBase
    {
        private readonly IAdminProductService _productService;
        private readonly IInventoryService _inventoryService;
        private readonly ILogger<AdminProductController> _logger;

        public AdminProductController(
            IAdminProductService productService,
            IInventoryService inventoryService,
            ILogger<AdminProductController> logger)
        {
            _productService = productService;
            _inventoryService = inventoryService;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var products = _productService.GetAll();
            return Ok(products);
        }

        [HttpPost]
        public IActionResult Create([FromBody] AdminProductCreateDto dto)
        {
            try
            {
                var id = _productService.AddProduct(dto, GetAdminUser());
                return CreatedAtAction(nameof(GetAll), new { id }, new { id });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to create product");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] AdminProductUpdateDto dto)
        {
            try
            {
                dto.Id = id;
                _productService.UpdateProduct(dto, GetAdminUser());
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to update product");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPatch("{id}/status")]
        public IActionResult UpdateStatus(int id, [FromBody] ProductStatusUpdateDto dto)
        {
            dto.ProductId = id;
            _productService.UpdateStatus(dto, GetAdminUser());
            return NoContent();
        }

        [HttpPatch("{id}/pricing")]
        public IActionResult UpdatePricing(int id, [FromBody] ProductPriceStockDto dto)
        {
            dto.ProductId = id;
            _productService.UpdatePricing(dto, GetAdminUser());
            return NoContent();
        }

        [HttpPatch("{id}/image")]
        public IActionResult UpdateImage(int id, [FromBody] string imageUrl)
        {
            _productService.UpdateImage(id, imageUrl, GetAdminUser());
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _productService.DeleteProduct(id, GetAdminUser());
            return NoContent();
        }

        [HttpGet("alerts/low-stock")]
        public IActionResult LowStock([FromQuery] int threshold = 5)
        {
            var alerts = _inventoryService.GetLowStockAlerts(threshold);
            return Ok(alerts);
        }

        [HttpGet("getById/{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _productService.GetProductById(id);
            return Ok(product);
        }


        private string GetAdminUser()
        {
            return User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? "system";
        }
    }
}

