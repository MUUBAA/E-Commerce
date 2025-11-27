public class PaymentDto
{
    public string RazorpayKey { get; set; } = default!;      // now = Stripe publishable key
    public string RazorpayOrderId { get; set; } = default!;  // now = Stripe PaymentIntent Id
    public int AmountInPaise { get; set; }
    public string Currency { get; set; } = "INR";

    // NEW: needed by Stripe.js
    public string ClientSecret { get; set; } = default!;
}
