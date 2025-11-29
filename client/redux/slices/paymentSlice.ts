// src/redux/slices/paymentSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { createCheckoutSession, type CheckoutSessionResponse } from "../thunk/paymentCheckout";
import { confirmCheckoutPayment} from "../thunk/paymentCheckout";

type LoadStatus = "idle" | "loading" | "succeeded" | "failed";

interface PaymentState {
  checkoutSessionId: string | null;
  checkoutUrl: string | null;
  status: LoadStatus;
  error: string | null;
  confirmStatus: LoadStatus;
  confirmError: string | null;
}

const initialState: PaymentState = {
  checkoutSessionId: null,
  checkoutUrl: null,
  status: "idle",
  error: null,
  confirmStatus: "idle",
  confirmError: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPayment(state) {
      state.checkoutSessionId = null;
      state.checkoutUrl = null;
      state.status = "idle";
      state.error = null;
      state.confirmStatus = "idle";
      state.confirmError = null;
    },
  },
  extraReducers: (builder) => {
    // 1) Create Stripe Checkout session
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.status = "succeeded";
        const data = action.payload as CheckoutSessionResponse;
        state.checkoutSessionId = data.sessionId;
        state.checkoutUrl = data.url;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to create checkout session";
      });

    // 2) Confirm payment (on success page)
    builder
      .addCase(confirmCheckoutPayment.pending, (state) => {
        state.confirmStatus = "loading";
        state.confirmError = null;
      })
      .addCase(confirmCheckoutPayment.fulfilled, (state) => {
        state.confirmStatus = "succeeded";
      })
      .addCase(confirmCheckoutPayment.rejected, (state, action) => {
        state.confirmStatus = "failed";
        state.confirmError =
          (action.payload as string) ||
          action.error.message ||
          "Payment confirmation failed";
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
