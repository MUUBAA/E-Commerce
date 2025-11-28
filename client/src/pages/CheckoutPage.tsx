
import React, { useState } from "react";
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
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 disabled:opacity-50"
      >
        {submitting ? "Processing..." : `Pay Now ₹${totalPrice}`}
      </button>
    </form>
  );
};

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items) as CartItem[];
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice ?? 0);
  const { clientSecret, publishableKey } = useSelector((state: RootState) => state.payment);
  const [creatingIntent, setCreatingIntent] = useState(false);

  const handlePayNowClick = async () => {
    if (clientSecret) {
      return;
    }

    const token = getDecryptedJwt();
    if (!token) {
      toast.warn("Please login again");
      return;
    }

    if (!cartItems.length) {
      toast.warn("Cart is empty");
      return;
    }

    setCreatingIntent(true);
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
        toast.success("Payment options loaded. Please choose a method.");
      } else {
        const errorMsg =
          (resultAction.payload as { message?: string })?.message || "Failed to create payment";
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create payment");
    } finally {
      setCreatingIntent(false);
    }
  };

  const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT: Payment area */}
        <div className="md:col-span-2 border rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>

          {!clientSecret && (
            <button
              onClick={handlePayNowClick}
              disabled={creatingIntent}
              className="w-full bg-green-600 text-white py-3 rounded-lg disabled:opacity-50"
            >
              {creatingIntent ? "Loading payment options..." : "Pay Now"}
            </button>
          )}

          {clientSecret && publishableKey && stripePromise && (
            <div className="mt-4">
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm />
              </Elements>
            </div>
          )}
        </div>

        {/* RIGHT: Delivery address + cart summary */}
        <div className="border rounded-xl p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Delivery Address</h3>
          <div className="text-sm text-gray-700 mb-4">
            Home: Abd, 5/7, Bangla Sahib Road<br />
            Sector 4, Gole Market, New Delhi, Delhi, India
          </div>

          <h3 className="font-semibold mb-2">My Cart</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <div>
                  <div>{item.itemName}</div>
                  <div className="text-xs text-gray-500">{item.quantity} x ₹{item.price}</div>
                </div>
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
