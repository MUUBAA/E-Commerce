using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Dto;
using Server.Services.OrderService;
using Server.Utils; // for GenericApiResponse<T>

namespace Server.Controllers.OrderController
{
    [Authorize]
    [ApiController]
    public class OrderController(IOrderService orderService) : BaseController
    {
        [HttpPost]
        [Route("order/create")]
        public ActionResult<GenericApiResponse<CreateOrderDto>> Create()
        {
            
            var userIdClaim = User.FindFirst("id") ?? User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
            {
                return Unauthorized(new GenericApiResponse<CreateOrderDto>(
                    false,
                    "User id not found in token"
                ));
            }

            try
            {
                // 2) Create order via service
                var order = orderService.CreateOrder(userId);

                var dto = new CreateOrderDto
                {
                    OrderId = order.Id,
                    TotalPrice = order.TotalPrice,
                    Status = order.Status
                };

                return Ok(new GenericApiResponse<CreateOrderDto>(
                    true,
                    "Order created successfully",
                    dto
                ));
            }
            catch (Exception ex)
            {
                // e.g. "Cart is empty"
                return BadRequest(new GenericApiResponse<CreateOrderDto>(
                    false,
                    ex.Message
                ));
            }
        }
    }
}
