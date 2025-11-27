// src/redux/slices/paymentSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../thunk/payment";
import type  { CreateOrderResponse } from "../thunk/payment";

interface PaymentState {
  clientSecret: string | null;
  publishableKey: string | null;
  paymentIntentId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PaymentState = {
  clientSecret: null,
  publishableKey: null,
  paymentIntentId: null,
  status: "idle",
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPayment(state) {
      state.clientSecret = null;
      state.publishableKey = null;
      state.paymentIntentId = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        const data: CreateOrderResponse = action.payload;
        state.clientSecret = data.clientSecret;
        state.publishableKey = data.razorpayKey; // Stripe pk
        state.paymentIntentId = data.razorpayOrderId;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) || action.error.message || "Payment failed";
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
