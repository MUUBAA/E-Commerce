using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Contract;
using Server.Data.Dto.Admin;
using Server.Services.Admin;
using Server.Services.Admin.AdminOrderService;
using Server.Services.Admin.InventoryService;
using System.Security.Claims;

namespace Server.Controllers.Admin.AdminOrderController
{
    [ApiController]
    [Route("admin/orders")]
    [Authorize(Roles = "Admin")]
    public class AdminOrderController : ControllerBase
    {
        private readonly IAdminOrderService _orderService;
        private readonly IInventoryService _inventoryService;

        public AdminOrderController(IAdminOrderService orderService, IInventoryService inventoryService)
        {
            _orderService = orderService;
            _inventoryService = inventoryService;
        }

        [HttpGet]
        public IActionResult GetAll([FromQuery] PaginationContract pagination)
        {
            return Ok(_orderService.GetAll(pagination));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var order = _orderService.GetById(id);
            if (order == null) return NotFound();
            var items = _orderService.GetOrderItems(id);
            return Ok(new { order, items });
        }

        [HttpPatch("{id}/status")]
        public IActionResult UpdateStatus(int id, [FromBody] OrderStatusUpdateDto dto)
        {
            dto.OrderId = id;
            var updated = _orderService.UpdateStatus(dto, GetAdmin());
            if (string.Equals(dto.OrderStatus, "Paid", StringComparison.OrdinalIgnoreCase)
                || string.Equals(dto.OrderStatus, "Packed", StringComparison.OrdinalIgnoreCase))
            {
                _inventoryService.ReduceStockForOrder(id);
            }
            _inventoryService.DisableInactiveProducts();
            return Ok(updated);
        }

        private string GetAdmin()
        {
            return User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? "system";
        }
    }
}

