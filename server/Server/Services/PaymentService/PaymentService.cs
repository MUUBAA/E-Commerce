using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Server.Data.Contract.Payments;
using Server.Data.Dto;
using Server.Data.Repositories;
using Stripe;

namespace Server.Services.PaymentService
{
     public interface IPaymentService
    {
        CheckoutSessionDto CreateCheckoutSession(PaymentCreateContract contract, string successUrl, string cancelUrl
        );

        bool ConfirmCheckoutSession(string sessionId);
    }
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly IOrdersRepository _ordersRepository;
        private readonly ILogger<PaymentService> _logger;

        private readonly string _stripeSecretKey;

        public PaymentService(
            IPaymentRepository paymentRepository,
            IOrdersRepository ordersRepository,
            IConfiguration configuration,
            ILogger<PaymentService> logger)
        {
            _paymentRepository = paymentRepository;
            _ordersRepository = ordersRepository;
            _logger = logger;

            _logger.LogInformation("===== PaymentService (Stripe Checkout) constructor started =====");

            // use these exact env keys in Render
            var publishableKey = configuration["Stripe_PublishableKey"];
            _stripeSecretKey = configuration["Stripe_SecretKey"];

            _logger.LogInformation("Stripe_PublishableKey from config: {Key}", publishableKey ?? "NULL");
            _logger.LogInformation("Stripe_SecretKey from config: {Info}",
                string.IsNullOrEmpty(_stripeSecretKey) ? "NULL" : $"Length={_stripeSecretKey.Length}");

            if (string.IsNullOrEmpty(publishableKey))
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

            _logger.LogInformation("Stripe initialized successfully (Checkout).");
            _logger.LogInformation("===== PaymentService constructor finished =====");
        }
        public CheckoutSessionDto CreateCheckoutSession(PaymentCreateContract contract, string successUrl, string cancelUrl)
        {
            _logger.LogInformation(
                "CreateCheckoutSession called. OrderId={OrderId}, Amount={Amount}, PaymentMethod={Method}",
                contract.OrderId, contract.Amount, contract.PaymentMethod);

            // Stripe expects amount in smallest unit (paise)
            var amountInPaise = (long)(contract.Amount * 100);

            // Use fully-qualified names to avoid ambiguity:
            var options = new Stripe.Checkout.SessionCreateOptions
            {
                Mode = "payment",
                SuccessUrl = successUrl,  // e.g. https://nestonlinestore.onrender.com/payment-success?session_id={CHECKOUT_SESSION_ID}
                CancelUrl = cancelUrl,    // e.g. https://nestonlinestore.onrender.com/checkout

                LineItems = new List<Stripe.Checkout.SessionLineItemOptions>
                {
                    new Stripe.Checkout.SessionLineItemOptions
                    {
                        Quantity = 1,
                        PriceData = new Stripe.Checkout.SessionLineItemPriceDataOptions
                        {
                            Currency = "inr",
                            UnitAmount = amountInPaise,
                            ProductData = new Stripe.Checkout.SessionLineItemPriceDataProductDataOptions
                            {
                                Name = $"Order #{contract.OrderId}"
                            }
                        }
                    }
                },

                // so we can map back to the order later
                Metadata = new Dictionary<string, string>
                {
                    { "orderId", contract.OrderId.ToString() }
                }
            };

            var service = new Stripe.Checkout.SessionService();
            Stripe.Checkout.Session session;

            try
            {
                session = service.Create(options);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error creating Stripe Checkout Session for OrderId={OrderId}", contract.OrderId);
                throw;
            }

            _logger.LogInformation("Stripe Checkout Session created: {SessionId}", session.Id);

            // Save payment row: reusing RazorpayOrderId to store Stripe SessionId
            _paymentRepository.CreatePayment(
                orderId: contract.OrderId,
                amount: contract.Amount,
                paymentMethod: contract.PaymentMethod,
                razorpayOrderId: session.Id
            );

            _logger.LogInformation(
                "Payment DB record created for OrderId={OrderId}, SessionId={SessionId}",
                contract.OrderId, session.Id);

            return new CheckoutSessionDto
            {
                SessionId = session.Id,
                Url = session.Url
            };
        }

        public bool ConfirmCheckoutSession(string sessionId)
        {
            _logger.LogInformation(
                "ConfirmCheckoutSession called. SessionId={SessionId}",
                sessionId);

            var service = new Stripe.Checkout.SessionService();
            Stripe.Checkout.Session session;

            try
            {
                session = service.Get(sessionId);
            }
            catch (StripeException ex)
            {
                _logger.LogError(ex,
                    "StripeException while retrieving Checkout Session {SessionId}",
                    sessionId);

                // mark payment as failed
                _paymentRepository.MarkPaymentFailed(
                    razorpayOrderId: sessionId,
                    errorMessage: ex.Message
                );
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Unexpected error while retrieving Checkout Session {SessionId}",
                    sessionId);

                _paymentRepository.MarkPaymentFailed(
                    razorpayOrderId: sessionId,
                    errorMessage: ex.Message
                );
                return false;
            }

            _logger.LogInformation(
                "Stripe Checkout Session retrieved. Status={Status}, PaymentStatus={PaymentStatus}",
                session.Status, session.PaymentStatus);

            // Stripe marks checkout session as paid this way
            var isPaid = session.PaymentStatus == "paid"
                         || string.Equals(session.Status, "complete", StringComparison.OrdinalIgnoreCase);

            if (!isPaid)
            {
                _logger.LogWarning(
                    "Checkout Session not paid. SessionId={SessionId}, Status={Status}, PaymentStatus={PaymentStatus}",
                    sessionId, session.Status, session.PaymentStatus);

                _paymentRepository.MarkPaymentFailed(
                    razorpayOrderId: sessionId,
                    errorMessage: $"Stripe session status: {session.Status}, paymentStatus: {session.PaymentStatus}"
                );
                return false;
            }

            // Get PaymentIntent id (for logging or storing as RazorpayPaymentId field)
            var paymentIntentId = session.PaymentIntentId ?? string.Empty;

            // Update Payments row → COMPLETED
            _paymentRepository.MarkPaymentAsCompleted(
                razorpayOrderId: sessionId,       // we stored Session.Id in Payments.RazorpayOrderId
                razorpaymentId: paymentIntentId,  // store PaymentIntentId into RazorpayPaymentId
                signature: string.Empty           // no real signature here, but keep param for compatibility
            );

            _logger.LogInformation(
                "Payment marked as COMPLETED for SessionId={SessionId}, PaymentIntent={PaymentIntentId}",
                sessionId, paymentIntentId);

            // Mark the order as paid using metadata
            if (session.Metadata != null &&
                session.Metadata.TryGetValue("orderId", out var orderIdStr) &&
                int.TryParse(orderIdStr, out var orderId))
            {
                try
                {
                    _ordersRepository.MarkOrderPaid(orderId);
                    _logger.LogInformation("Order {OrderId} marked as 'paid'", orderId);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex,
                        "Error marking Order {OrderId} as paid", orderId);
                }
            }
            else
            {
                _logger.LogWarning(
                    "No valid orderId metadata found on Checkout Session {SessionId}. Order not updated.",
                    sessionId);
            }

            return true;
        }
    }
}
