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
            _paymentRepository = paymentRepository;

            _stripePublishableKey = configuration["Stripe_PublishableKey"]
                ?? throw new Exception("Stripe PublishableKey not configured");
            _stripeSecretKey = configuration["Stripe_SecretKey"]
                ?? throw new Exception("Stripe SecretKey not configured");

            StripeConfiguration.ApiKey = _stripeSecretKey;

            _paymentIntentService = new PaymentIntentService();

            Console.WriteLine($"StripePublishableKey: {_stripePublishableKey}");
            Console.WriteLine($"StripeSecretKey length: {_stripeSecretKey.Length}");
        }

        public PaymentDto CreatePaymentOrder(PaymentCreateContract contract)
        {
            // Stripe amount is in smallest unit (cents/paise)
            var amountInPaise = (long)(contract.Amount * 100);

            var options = new PaymentIntentCreateOptions
            {
                Amount = amountInPaise,
                Currency = "inr",
                // If you want automatic confirmation from front-end
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true
                }
            };

            var paymentIntent = _paymentIntentService.Create(options);

            // IMPORTANT: we store PaymentIntent.Id into RazorpayOrderId field (no entity change)
            _paymentRepository.CreatePayment(
                orderId: contract.OrderId,
                amount: contract.Amount,
                paymentMethod: contract.PaymentMethod,
                razorpayOrderId: paymentIntent.Id        // Stripe PaymentIntent Id
            );

            // You SHOULD return client secret to front-end for Stripe.js
            return new PaymentDto
            {
                // reuse existing names but fill with Stripe data
                RazorpayKey = _stripePublishableKey,     // actually Stripe publishable key
                RazorpayOrderId = paymentIntent.Id,      // Stripe PaymentIntent Id
                AmountInPaise = (int)amountInPaise,
                Currency = "INR",
                // add this property to PaymentDto if not present yet:
                ClientSecret = paymentIntent.ClientSecret
            };
        }

        public bool VerifyPayment(PaymentVerifyContract contract)
        {
            // With Stripe, you normally verify via webhook.
            // If you still need a "Verify" API, we can:
            // 1. Get PaymentIntent from Stripe
            // 2. Check if status == "succeeded"
            try
            {
                // contract.RazorpayOrderId here is actually Stripe PaymentIntent Id
                var paymentIntent = _paymentIntentService.Get(contract.RazorpayOrderId);

                if (paymentIntent.Status == "succeeded")
                {
                    // Get latest charge id, if any
                    var chargeId = paymentIntent.LatestChargeId;

                    _paymentRepository.MarkPaymentAsCompleted(
                        razorpayOrderId: contract.RazorpayOrderId,  // PaymentIntent Id
                        razorpaymentId: chargeId ?? string.Empty,   // Charge Id
                        signature: string.Empty                     // optional: webhook sig if you want
                    );

                    return true;
                }
                else
                {
                    _paymentRepository.MarkPaymentFailed(
                        razorpayOrderId: contract.RazorpayOrderId,
                        errorMessage: $"Stripe PaymentIntent status: {paymentIntent.Status}"
                    );
                    return false;
                }
            }
            catch (StripeException ex)
            {
                _paymentRepository.MarkPaymentFailed(
                    razorpayOrderId: contract.RazorpayOrderId,
                    errorMessage: ex.Message
                );
                return false;
            }
        }
    }
}
