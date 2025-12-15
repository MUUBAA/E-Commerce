using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Dto.Admin;
using Server.Services.Admin;
using Server.Services.Admin.PaymentMonitoringService;

namespace Server.Controllers.Admin.AdminPaymentController
{
    [ApiController]
    [Route("admin/payments")]
    [Authorize(Roles = "Admin")]
    public class AdminPaymentController : ControllerBase
    {
        private readonly IPaymentMonitoringService _paymentService;

        public AdminPaymentController(IPaymentMonitoringService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet]
        public IActionResult GetPayments([FromQuery] string? status, [FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var filter = new PaymentMonitoringFilterDto
            {
                Status = status,
                From = from,
                To = to
            };
            return Ok(_paymentService.GetPayments(filter));
        }
    }
}

