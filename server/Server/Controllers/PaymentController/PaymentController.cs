using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data.Contract.Payments;
using Server.Data.Dto;
using Server.Services.PaymentService;
using Server.Utils;

namespace Server.Controllers.PaymentController
{
    [Authorize]
    [ApiController]
    public class PaymentController(IPaymentService paymentService) : BaseController
    {
        [HttpPost]
        [Route("payment/create-order")]
        public ActionResult<GenericApiResponse<PaymentDto>> CreateOrder([FromBody] PaymentCreateContract contract)
        {

            var result = paymentService.CreatePaymentOrder(contract);
            return Ok(new GenericApiResponse<PaymentDto>(true, "order created successfully", result));
        }

        [HttpPost]
        [Route("payment/verify")]
        public ActionResult<GenericApiResponse<string>> Verify([FromBody] PaymentVerifyContract contract)
        {
            var success = paymentService.VerifyPayment(contract);
            if (success)
            {
                return BadRequest(new GenericApiResponse<string>(false, "Payment verification failed"));
            }

            return Ok(new GenericApiResponse<string>(true, "Payment verified sucessfully", null));


        }

        [HttpPost]
        [Route("payment/create-checkout-session")]
        public ActionResult<GenericApiResponse<CheckoutSessionDto>> CreateCheckoutSession(
       [FromBody] PaymentCreateContract contract)
        {
            // build success/cancel URLs; you can also take them from config or request
            var origin = $"{Request.Scheme}://{Request.Host}";
            var successUrl = $"{origin}/payment-success?session_id={{CHECKOUT_SESSION_ID}}";
            var cancelUrl = $"{origin}/checkout";

            var result = paymentService.CreateCheckoutSession(contract, successUrl, cancelUrl);
            return Ok(new GenericApiResponse<CheckoutSessionDto>(
                true,
                "Checkout session created successfully",
                result
            ));
        }
    }
}
