using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Contract.Orders;
using Server.Data.Dto;
using Server.Data.Dto.Orders;
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
                return Unauthorized(new GenericApiResponse<CreateOrderDto>(false, "User id not found in token" ));
            }

            try
            {
                var order = orderService.CreateOrder(userId);

                var dto = new CreateOrderDto
                {
                    OrderId   = order.Id,
                    TotalPrice = order.TotalPrice,
                    Status    = order.Status
                };

                return Ok(new GenericApiResponse<CreateOrderDto>( true, "Order created successfully", dto));
            }
            catch (Exception ex)
            {
                return BadRequest(new GenericApiResponse<CreateOrderDto>( false, ex.Message ));
            }
        }

        [HttpPost]
        [Route("order/mark-paid")]
        public ActionResult<GenericApiResponse<string>> MarkPaid( [FromBody] MarkOrderPaidContract contract)
        {
            if (contract == null || contract.OrderId <= 0)
            {
                return BadRequest(new GenericApiResponse<string>( false, "Invalid order id" ));
            }

            try
            {
                orderService.MarkOrderPaid(contract.OrderId);

                return Ok(new GenericApiResponse<string>(true, "Order marked as paid", null ));
            }
            catch (Exception ex)
            {
                return BadRequest(new GenericApiResponse<string>(false, ex.Message ));
            }
        }

         [HttpGet]
        [Route("order/my-orders")]
        public ActionResult<GenericApiResponse<List<UserOrderDto>>> GetMyOrders()
        {
            var userIdClaim = User.FindFirst("id") ?? User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
            {
                return Unauthorized(new GenericApiResponse<List<UserOrderDto>>(
                    false,
                    "User id not found in token"
                ));
            }

            var orders = orderService.GetUserOrders(userId);

            return Ok(new GenericApiResponse<List<UserOrderDto>>(
                true,
                "Orders fetched successfully",
                orders
            ));
        }
    }
}
