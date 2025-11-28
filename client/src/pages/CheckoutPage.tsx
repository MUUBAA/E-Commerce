import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCheckoutSession } from "../../redux/thunk/paymentCheckout";
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




const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items) as CartItem[];
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice ?? 0);
  const [paying, setPaying] = useState(false);

  const handleStripeCheckout = async () => {
    const token = getDecryptedJwt();
    if (!token) {
      toast.warn("Please login to continue");
      return;
    }
    if (!cartItems.length) {
      toast.warn("Cart is empty");
      return;
    }

    setPaying(true);
    const orderId = 2;

    try {
      const resultAction = await dispatch(
        createCheckoutSession({
          orderId,
          amount: totalPrice,
          paymentMethod: "STRIPE_CHECKOUT",
          token,
        })
      );

      if (createCheckoutSession.fulfilled.match(resultAction)) {
        const { url } = resultAction.payload;
        window.location.href = url;
      } else {
        const msg =
          (resultAction.payload as { message?: string })?.message || "Failed to start checkout";
        toast.error(msg);
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <div className="border rounded-xl p-4 bg-white shadow-sm">
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
              className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2 shadow-sm"
            >
              {item.itemUrl && (
                <img
                  src={item.itemUrl}
                  alt={item.itemName}
                  className="h-12 w-12 rounded-md object-cover mr-3 flex-shrink-0"
                />
              )}
              <div className="flex-1 mr-2">
                <div className="font-medium">{item.itemName}</div>
                <div className="text-xs text-gray-500">
                  {item.quantity} x ₹{item.price}
                </div>
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

        <button
          onClick={handleStripeCheckout}
          disabled={paying}
          className="w-full mt-6 rounded-xl bg-pink-500 px-6 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-pink-600 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {paying ? "Redirecting to Stripe…" : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
