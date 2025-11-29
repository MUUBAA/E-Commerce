import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../../redux/stores";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../../redux/thunk/user";

import { getDecryptedJwt } from "../../utils/auth";
import { createCheckoutSession } from "../../redux/thunk/paymentCheckout";
import { fetchMyOrders } from "../../redux/thunk/orders";
import type { MyOrderDto } from "../../redux/slices/orderSlice";



const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Get userId from JWT
  const token = getDecryptedJwt();
  let userIdFromToken: number | undefined;
  if (token) {
    try {
      const decoded = jwtDecode<{ id?: number; sub?: string }>(token);
      userIdFromToken =
        typeof decoded.id === 'number'
          ? decoded.id
          : decoded.sub
            ? Number(decoded.sub)
            : undefined;
    } catch {
      userIdFromToken = undefined;
    }
  }

  // Fetch user info on mount
  useEffect(() => {
    if (userIdFromToken) {
      dispatch(getUserById({ id: userIdFromToken }));
    }
  }, [dispatch, userIdFromToken]);


  // Get user address from Redux
  const userAccount = useSelector((state: RootState) => state.user.UserAccount);
  const userAddress = userAccount?.address;

  const myOrders = useSelector((state: RootState) => state.orders.myOrders);
  const ordersLoading = useSelector((state: RootState) => state.orders.loading);
  const [paying, setPaying] = useState(false);

  // Find the latest pending order (or adjust logic as needed)
  const pendingOrder = myOrders.find((order: MyOrderDto) => order.status === "pending");
  const orderItems = pendingOrder?.items || [];
  const totalPrice = pendingOrder?.totalPrice || 0;


  useEffect(() => {
    const token = getDecryptedJwt();
    if (token) {
      dispatch(fetchMyOrders({ token }));
    }
  }, [dispatch]);

  const handleStripeCheckout = async () => {
    const token = getDecryptedJwt();
    if (!token) {
      toast.warn("Please login to continue");
      return;
    }
    if (!userAddress || userAddress.trim() === "") {
      toast.warn("Please select the address before pay");
      return;
    }
    if (!orderItems.length || !pendingOrder) {
      toast.warn("No pending order found");
      return;
    }

    setPaying(true);

    try {
      const { orderId, totalPrice: backendTotal } = pendingOrder;

      const resultAction = await dispatch(
        createCheckoutSession({
          orderId,
          amount: backendTotal ?? totalPrice,
          paymentMethod: "STRIPE_CHECKOUT",
          token,
        })
      );

      if (createCheckoutSession.fulfilled.match(resultAction)) {
        const { url } = resultAction.payload;
        window.location.href = url;
      } else {
        const msg =
          (resultAction.payload as { message?: string })?.message ||
          "Failed to start checkout";
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
          {userAddress ? (
            <>{userAddress}</>
          ) : (
            <span className="italic text-gray-400">No address found</span>
          )}
        </div>


        <h3 className="font-semibold mb-2">Order Items</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {ordersLoading && (
            <div className="text-center text-gray-400 py-8">Loading...</div>
          )}
          {!ordersLoading && orderItems.length === 0 && (
            <div className="text-center text-gray-400 py-8">No items in your order.</div>
          )}
          {!ordersLoading && orderItems.map((item) => (
            <div
              key={item.orderItemId}
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
                  {item.quantity} x ₹{item.linePrice}
                </div>
              </div>
              <div className="font-semibold">
                ₹{Number(item.linePrice) * item.quantity}
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
