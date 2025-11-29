using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Contract.Payments;
using Server.Data.Dto;
using Server.Services.PaymentService;
using Server.Services.OrderService;
using Server.Utils;

namespace Server.Controllers.PaymentController
{
    [Authorize]
    [ApiController]
    public class PaymentController : BaseController
    {
        private readonly IPaymentService _paymentService;
        private readonly IOrderService _orderService;
        private readonly IConfiguration _configuration;

        public PaymentController(
            IPaymentService paymentService,
            IOrderService orderService,
            IConfiguration configuration
        )
        {
            _paymentService = paymentService;
            _orderService = orderService;
            _configuration = configuration;
        }

       [HttpPost]
    [Route("payment/create-checkout")]
    public ActionResult<GenericApiResponse<CheckoutSessionDto>> CreateCheckout(
        [FromBody] PaymentCreateContract contract)
    {
        try
        {
            // 👇 use FRONTEND url instead of backend host
            var frontendUrl = _configuration["FrontendUrl"]
                              ?? "https://nestonlinestore.vercel.app";

            var successUrl = $"{frontendUrl}/payment-success?session_id={{CHECKOUT_SESSION_ID}}";
            var cancelUrl  = $"{frontendUrl}/checkout";

            var session = _paymentService.CreateCheckoutSession(contract, successUrl, cancelUrl);

            return Ok(new GenericApiResponse<CheckoutSessionDto>( true, "Checkout session created", session ));
        }
        catch (Exception ex)
        {
            return BadRequest(new GenericApiResponse<CheckoutSessionDto>(false, ex.Message  ));
        }
    }
        [AllowAnonymous]
        [HttpGet]
        [Route("payment/confirm")]
        public ActionResult<GenericApiResponse<string>> ConfirmPayment([FromQuery] string session_id)
        {
            if (string.IsNullOrEmpty(session_id))
            {
                return BadRequest(new GenericApiResponse<string>(false, "session_id missing"));
            }

            bool success = _paymentService.ConfirmCheckoutSession(session_id);

            if (!success)
            {
                return BadRequest(new GenericApiResponse<string>(false, "Payment not completed" ));
            }

            return Ok(new GenericApiResponse<string>(true, "Payment verified successfully", null));
        }
    }
}
