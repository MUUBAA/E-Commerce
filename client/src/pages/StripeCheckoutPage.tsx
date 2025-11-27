// src/pages/StripeCheckoutPage.tsx
import React from "react";
import { useSelector } from "react-redux";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type { RootState } from "../../redux/stores";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice ?? 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      console.error(error);
      alert(error.message || "Payment failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-green-600 text-white py-2 rounded-lg mt-4"
      >
        Pay ₹{totalPrice}
      </button>
    </form>
  );
};

const StripeCheckoutPage: React.FC = () => {
  const { clientSecret, publishableKey } = useSelector((state: RootState) => state.payment);

  if (!clientSecret || !publishableKey) {
    return <div className="p-4 text-center">No payment in progress</div>;
  }

  const stripePromise = loadStripe(publishableKey);

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeCheckoutPage;
