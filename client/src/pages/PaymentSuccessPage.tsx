import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import type { AppDispatch } from "../../redux/stores";
import { resetPayment } from "../../redux/slices/paymentSlice";
// import { clearCart } from "../redux/slices/cartSlice"; // if you have this

const REDIRECT_SECONDS = 15; // or 10

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  const sessionId = searchParams.get("session_id"); // from Stripe Checkout

  useEffect(() => {
    // Optionally show a toast
    toast.dismiss();
    toast.success("Payment successful!");

    // Reset payment state / clear cart etc.
    dispatch(resetPayment());
    // dispatch(clearCart()); // uncomment if you have this action

    // Simple countdown + redirect
    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(intervalId);
          navigate("/"); // redirect to home
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-50 flex items-center justify-center">
          <svg
            className="h-10 w-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Payment Successful
        </h1>
        <p className="text-gray-600 text-sm mb-4">
          Thank you for your purchase! Your payment has been processed
          successfully.
        </p>

        {sessionId && (
          <p className="text-xs text-gray-400 mb-4">
            Stripe session ID: <span className="font-mono">{sessionId}</span>
          </p>
        )}

        <p className="text-gray-500 text-sm mb-6">
          You will be redirected to the home page in{" "}
          <span className="font-semibold">{secondsLeft}</span> seconds.
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors"
        >
          Go to Home Now
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
