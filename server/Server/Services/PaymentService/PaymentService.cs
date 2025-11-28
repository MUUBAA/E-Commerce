using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Server.Data.Contract.Payments;
using Server.Data.Dto;
using Server.Data.Repositories;
using Stripe;
using Stripe.Checkout;

namespace Server.Services.PaymentService
{
    public interface IPaymentService
    {
        PaymentDto CreatePaymentOrder(PaymentCreateContract contract);
        bool VerifyPayment(PaymentVerifyContract contract);
        CheckoutSessionDto CreateCheckoutSession(PaymentCreateContract contract, string successUrl, string cancelUrl);
    }

    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly string _stripePublishableKey;
        private readonly string _stripeSecretKey;
        private readonly PaymentIntentService _paymentIntentService;
        private readonly ILogger<PaymentService> _logger;
        private readonly IConfiguration _configuration;

        public PaymentService(
            IPaymentRepository paymentRepository,
            IConfiguration configuration,
            ILogger<PaymentService> logger)

        {
            _paymentRepository = paymentRepository;
            _logger = logger;

            _logger.LogInformation("===== PaymentService constructor started =====");

            _configuration = configuration;
            // NOTE: you are using Stripe_PublishableKey / Stripe_SecretKey keys.
            // Make sure your env vars in Render use EXACTLY those names.
            _stripePublishableKey = configuration["Stripe_PublishableKey"];
            _stripeSecretKey = configuration["Stripe_SecretKey"];

            _logger.LogInformation("Stripe_PublishableKey from config: {Key}", _stripePublishableKey ?? "NULL");
            _logger.LogInformation("Stripe_SecretKey from config: {Info}",
                string.IsNullOrEmpty(_stripeSecretKey) ? "NULL" : $"Length={_stripeSecretKey.Length}");

            if (string.IsNullOrEmpty(_stripePublishableKey))
            {
                _logger.LogError("Stripe Publishable Key is MISSING (Stripe_PublishableKey)!");
                throw new Exception("Stripe PublishableKey not configured");
            }

            if (string.IsNullOrEmpty(_stripeSecretKey))
            {
                _logger.LogError("Stripe Secret Key is MISSING (Stripe_SecretKey)!");
                throw new Exception("Stripe SecretKey not configured");
            }

            StripeConfiguration.ApiKey = _stripeSecretKey;
            _paymentIntentService = new PaymentIntentService();

            _logger.LogInformation("Stripe initialized successfully.");
            _logger.LogInformation("===== PaymentService constructor finished =====");
        }

        public PaymentDto CreatePaymentOrder(PaymentCreateContract contract)
        {
            _logger.LogInformation("CreatePaymentOrder called. OrderId={OrderId}, Amount={Amount}, PaymentMethod={Method}",
                contract.OrderId, contract.Amount, contract.PaymentMethod);

            var amountInPaise = (long)(contract.Amount * 100);

            var options = new PaymentIntentCreateOptions
            {
                Amount = amountInPaise,
                Currency = "inr",
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true
                }
            };

            PaymentIntent paymentIntent;
            try
            {
                paymentIntent = _paymentIntentService.Create(options);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating Stripe PaymentIntent for OrderId={OrderId}", contract.OrderId);
                throw;
            }

            _logger.LogInformation("Stripe PaymentIntent created: {PaymentIntentId}", paymentIntent.Id);

            _paymentRepository.CreatePayment(
                orderId: contract.OrderId,
                amount: contract.Amount,
                paymentMethod: contract.PaymentMethod,
                razorpayOrderId: paymentIntent.Id // storing PaymentIntent Id
            );

            _logger.LogInformation("Payment DB record created for OrderId={OrderId}, PaymentIntent={PaymentIntentId}",
                contract.OrderId, paymentIntent.Id);

            return new PaymentDto
            {
                RazorpayKey = _stripePublishableKey,      // actually Stripe publishable key
                RazorpayOrderId = paymentIntent.Id,       // Stripe PaymentIntent Id
                AmountInPaise = (int)amountInPaise,
                Currency = "INR",
                ClientSecret = paymentIntent.ClientSecret
            };
        }

        public bool VerifyPayment(PaymentVerifyContract contract)
        {
            _logger.LogInformation("VerifyPayment called. PaymentIntentId(RazorpayOrderId)={PaymentIntentId}",
                contract.RazorpayOrderId);

            try
            {
                var paymentIntent = _paymentIntentService.Get(contract.RazorpayOrderId);
                _logger.LogInformation("Stripe PaymentIntent status={Status}", paymentIntent.Status);

                if (paymentIntent.Status == "succeeded")
                {
                    var chargeId = paymentIntent.LatestChargeId;
                    _logger.LogInformation("Payment succeeded. ChargeId={ChargeId}", chargeId);

                    _paymentRepository.MarkPaymentAsCompleted(
                        razorpayOrderId: contract.RazorpayOrderId,
                        razorpaymentId: chargeId ?? string.Empty,
                        signature: string.Empty
                    );
                    return true;
                }

                _logger.LogWarning("Payment not succeeded. Status={Status}", paymentIntent.Status);
                _paymentRepository.MarkPaymentFailed(
                    razorpayOrderId: contract.RazorpayOrderId,
                    errorMessage: $"Stripe PaymentIntent status: {paymentIntent.Status}"
                );
                return false;
            }
            catch (StripeException ex)
            {
                _logger.LogError(ex, "StripeException while verifying PaymentIntentId={PaymentIntentId}",
                    contract.RazorpayOrderId);

                _paymentRepository.MarkPaymentFailed(
                    razorpayOrderId: contract.RazorpayOrderId,
                    errorMessage: ex.Message
                );
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while verifying PaymentIntentId={PaymentIntentId}",
                    contract.RazorpayOrderId);

                _paymentRepository.MarkPaymentFailed(
                    razorpayOrderId: contract.RazorpayOrderId,
                    errorMessage: ex.Message
                );
                return false;
            }
        }
      public CheckoutSessionDto CreateCheckoutSession(PaymentCreateContract contract, string? successUrlOverride, string? cancelUrlOverride)
{
    _logger.LogInformation("CreateCheckoutSession called. OrderId={OrderId}, Amount={Amount}",
        contract.OrderId, contract.Amount);

    // 👇 FRONTEND URL (put this in appsettings / env)
    var frontendUrl = _configuration["FrontendUrl"]
                      ?? "https://nestonlinestore.vercel.app";

    var successUrl = successUrlOverride
                     ?? $"{frontendUrl}/payment-success?session_id={{CHECKOUT_SESSION_ID}}";

    var cancelUrl = cancelUrlOverride
                    ?? $"{frontendUrl}/checkout";

    var amountInPaise = (long)(contract.Amount * 100);

    var options = new SessionCreateOptions
    {
        Mode = "payment",
        SuccessUrl = successUrl,
        CancelUrl = cancelUrl,
        LineItems = new List<SessionLineItemOptions>
        {
            new SessionLineItemOptions
            {
                Quantity = 1,
                PriceData = new SessionLineItemPriceDataOptions
                {
                    Currency = "inr",
                    UnitAmount = amountInPaise,
                    ProductData = new SessionLineItemPriceDataProductDataOptions
                    {
                        Name = $"Order #{contract.OrderId}"
                    }
                }
            }
        },
        AutomaticTax = new SessionAutomaticTaxOptions { Enabled = false }
    };

    var service = new SessionService();
    var session = service.Create(options);

    _paymentRepository.CreatePayment(
        orderId: contract.OrderId,
        amount: contract.Amount,
        paymentMethod: contract.PaymentMethod,
        razorpayOrderId: session.Id
    );

    return new CheckoutSessionDto
    {
        SessionId = session.Id,
        Url = session.Url!
    };
}
    }
}
