using Server.Data.Entities.Payments;

namespace Server.Data.Repositories
{
    public interface IPaymentRepository
    {
        // razorpayOrderId => Stripe PaymentIntent Id
        Payments CreatePayment(int orderId, decimal amount, string paymentMethod, string razorpayOrderId);

        // razorpayOrderId => Stripe PaymentIntent Id
        Payments? GetPaymentByRazorpayOrderId(string razorpayOrderId);

        // razorpaymentId => Stripe Charge Id (or LatestCharge)
        // signature => Stripe webhook signature (optional)
        void MarkPaymentAsCompleted(string razorpayOrderId, string razorpaymentId, string signature);

        void MarkPaymentFailed(string razorpayOrderId, string? errorMessage = null);
    }

    public class PaymentRepository : IPaymentRepository
    {
        private readonly Repository _repository;

        public PaymentRepository(Repository repository)
        {
            _repository = repository;
        }

        public Payments CreatePayment(int orderId, decimal amount, string paymentMethod, string razorpayOrderId)
        {
            var payment = new Payments
            {
                OrderId = orderId,
                Amount = amount,
                PaymentMethod = paymentMethod,
                RazorpayOrderId = razorpayOrderId, // Stripe PaymentIntent Id
                Status = "PENDING",
                CreatedAt = DateTime.UtcNow
            };

            _repository.Add(payment);
            _repository.SaveChanges();
            return payment;
        }

        public Payments? GetPaymentByRazorpayOrderId(string razorpayOrderId)
        {
            // razorpayOrderId = Stripe PaymentIntent Id
            return _repository.Payments.FirstOrDefault(p => p.RazorpayOrderId == razorpayOrderId);
        }

        public void MarkPaymentAsCompleted(string razorpayOrderId, string razorpaymentId, string signature)
        {
            // razorpayOrderId = Stripe PaymentIntent Id
            // razorpaymentId = Stripe Charge Id
            var payment = GetPaymentByRazorpayOrderId(razorpayOrderId) ?? throw new Exception("Payment not found");

            payment.Status = "COMPLETED";
            payment.RazorpayPaymentId = razorpaymentId; // Stripe Charge Id
            payment.RazorpaySignature = signature;      // Stripe webhook signature (optional)
            payment.UpdatedAt = DateTime.UtcNow;

            _repository.Update(payment);
            _repository.SaveChanges();
        }

        public void MarkPaymentFailed(string razorpayOrderId, string? errorMessage = null)
        {
            var payment = GetPaymentByRazorpayOrderId(razorpayOrderId) ?? throw new Exception("Payment not found");

            payment.Status = "FAILED";
            payment.ErrorMessage = errorMessage ?? "Unknown error";

            _repository.Update(payment);
            _repository.SaveChanges();
        }
    }
}
