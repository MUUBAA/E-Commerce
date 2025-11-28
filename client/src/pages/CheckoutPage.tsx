import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createOrder } from "../../redux/thunk/payment";
import { getDecryptedJwt } from "../../utils/auth";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../../redux/stores";

interface CartItem {
  productId: number;
  itemName: string;
  itemDescription?: string;
  itemUrl?: string;
  price: number;
  quantity: number;
}

/* ---------- Stripe payment form ---------- */
const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice ?? 0);
  const [submitting, setSubmitting] = useState(false);

  const handleConfirmPay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      console.error(error);
      toast.error(error.message || "Payment failed");
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleConfirmPay} className="space-y-4">
      {/* This renders Stripe’s full payment method UI
          (Card / UPI / Netbanking / Wallets etc.) */}
      <PaymentElement />

      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 disabled:opacity-50"
      >
        {submitting ? "Processing..." : `Pay ₹${totalPrice}`}
      </button>
    </form>
  );
};

/* ---------- Checkout page ---------- */
const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector((state: RootState) => state.cart.items) as CartItem[];
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice ?? 0);
  const { clientSecret, publishableKey } = useSelector((state: RootState) => state.payment);

  const [creatingIntent, setCreatingIntent] = useState(false);

  // Automatically create PaymentIntent when page loads (and we have cart items)
  useEffect(() => {
    const createIntent = async () => {
      if (clientSecret) return;            // already created
      if (!cartItems.length) {
        toast.warn("Cart is empty");
        return;
      }

      const token = getDecryptedJwt();
      if (!token) {
        toast.warn("Please login to continue");
        return;
      }

      setCreatingIntent(true);

      // TODO: replace with actual orderId from your backend
      const orderId = 1;

      try {
        const resultAction = await dispatch(
          createOrder({
            orderId,
            amount: totalPrice,
            paymentMethod: "STRIPE",
            token,
          })
        );

        if (createOrder.fulfilled.match(resultAction)) {
          toast.success("Payment methods loaded");
        } else {
          const errorMsg =
            (resultAction.payload as { message?: string })?.message ||
            "Failed to create payment";
          toast.error(errorMsg);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to create payment");
      } finally {
        setCreatingIntent(false);
      }
    };

    createIntent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT: full Stripe payment UI (no outer Pay Now box) */}
        <div className="md:col-span-2 border rounded-xl p-4 min-h-[300px]">
          <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>

          {creatingIntent && !clientSecret && (
            <div className="text-sm text-gray-600">Loading payment options…</div>
          )}

          {clientSecret && publishableKey && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm />
            </Elements>
          )}

          {!creatingIntent && !clientSecret && (
            <div className="text-sm text-red-500 mt-2">
              Unable to load payment options. Please refresh the page.
            </div>
          )}
        </div>

        {/* RIGHT: Delivery address + cart summary with images */}
        <div className="border rounded-xl p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Delivery Address</h3>
          <div className="text-sm text-gray-700 mb-4">
            Home: Abd, 5/7, Bangla Sahib Road<br />
            Sector 4, Gole Market, New Delhi, Delhi, India
          </div>

          <h3 className="font-semibold mb-2">My Cart</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between text-sm bg-white rounded-lg p-2 shadow-sm"
              >
                {/* Image */}
                {item.itemUrl && (
                  <img
                    src={item.itemUrl}
                    alt={item.itemName}
                    className="h-12 w-12 rounded-md object-cover mr-3 flex-shrink-0"
                  />
                )}

                {/* Name + qty */}
                <div className="flex-1 mr-2">
                  <div className="font-medium">{item.itemName}</div>
                  <div className="text-xs text-gray-500">
                    {item.quantity} x ₹{item.price}
                  </div>
                </div>

                {/* Line total */}
                <div className="font-semibold">
                  ₹{Number(item.price) * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
