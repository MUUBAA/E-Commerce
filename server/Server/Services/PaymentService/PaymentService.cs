using Microsoft.Extensions.Configuration;
using Server.Data.Contract.Payments;
using Server.Data.Dto;
using Server.Data.Repositories;
using Stripe;

namespace Server.Services.PaymentService
{
    public interface IPaymentService
    {
        PaymentDto CreatePaymentOrder(PaymentCreateContract contract);
        bool VerifyPayment(PaymentVerifyContract contract);
    }

    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly string _stripePublishableKey;
        private readonly string _stripeSecretKey;
        private readonly PaymentIntentService _paymentIntentService;

        public PaymentService(IPaymentRepository paymentRepository, IConfiguration configuration)
        {
            Console.WriteLine("========== STRIPE CONFIG CHECK ==========");

            _paymentRepository = paymentRepository;

            _stripePublishableKey = configuration["Stripe_PublishableKey"];
            _stripeSecretKey = configuration["Stripe_SecretKey"];

            // Log raw values (safe)
            Console.WriteLine($"Stripe_PublishableKey: {_stripePublishableKey ?? "NULL"}");
            Console.WriteLine($"Stripe_SecretKey: {(string.IsNullOrEmpty(_stripeSecretKey) ? "NULL" : $"Length = {_stripeSecretKey.Length}")}");

            // Throw meaningful error if missing
            if (string.IsNullOrEmpty(_stripePublishableKey))
            {
                Console.WriteLine("ERROR: Stripe Publishable Key is MISSING!");
                throw new Exception("Stripe PublishableKey not configured");
            }

            if (string.IsNullOrEmpty(_stripeSecretKey))
            {
                Console.WriteLine("ERROR: Stripe Secret Key is MISSING!");
                throw new Exception("Stripe SecretKey not configured");
            }

            // Initialize Stripe
            StripeConfiguration.ApiKey = _stripeSecretKey;
            _paymentIntentService = new PaymentIntentService();

            Console.WriteLine("Stripe initialization OK.");
            Console.WriteLine("==========================================");
        }

        public PaymentDto CreatePaymentOrder(PaymentCreateContract contract)
        {
            Console.WriteLine("Creating Stripe PaymentIntent...");
            Console.WriteLine($"OrderId: {contract.OrderId}, Amount: {contract.Amount}");

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

            var paymentIntent = _paymentIntentService.Create(options);

            Console.WriteLine($"PaymentIntent Created: {paymentIntent.Id}");

            _paymentRepository.CreatePayment(
                orderId: contract.OrderId,
                amount: contract.Amount,
                paymentMethod: contract.PaymentMethod,
                razorpayOrderId: paymentIntent.Id
            );

            return new PaymentDto
            {
                RazorpayKey = _stripePublishableKey,
                RazorpayOrderId = paymentIntent.Id,
                AmountInPaise = (int)amountInPaise,
                Currency = "INR",
                ClientSecret = paymentIntent.ClientSecret
            };
        }

        public bool VerifyPayment(PaymentVerifyContract contract)
        {
            Console.WriteLine("Verifying Stripe Payment...");
            Console.WriteLine($"PaymentIntentId (RazorpayOrderId): {contract.RazorpayOrderId}");

            try
            {
                var paymentIntent = _paymentIntentService.Get(contract.RazorpayOrderId);

                Console.WriteLine($"PaymentIntent Status: {paymentIntent.Status}");

                if (paymentIntent.Status == "succeeded")
                {
                    var chargeId = paymentIntent.LatestChargeId;
                    Console.WriteLine($"Charge ID: {chargeId}");

                    _paymentRepository.MarkPaymentAsCompleted(
                        contract.RazorpayOrderId,
                        chargeId ?? "",
                        ""
                    );

                    return true;
                }
                else
                {
                    _paymentRepository.MarkPaymentFailed(
                        contract.RazorpayOrderId,
                        $"Stripe PaymentIntent status: {paymentIntent.Status}"
                    );
                    return false;
                }
            }
            catch (StripeException ex)
            {
                Console.WriteLine("Stripe ERROR: " + ex.Message);

                _paymentRepository.MarkPaymentFailed(
                    contract.RazorpayOrderId,
                    ex.Message
                );
                return false;
            }
        }
    }
}
