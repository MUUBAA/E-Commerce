// src/redux/thunk/paymentCheckout.ts
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface GenericApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export const createCheckoutSession = createAsyncThunk<
  CheckoutSessionResponse,
  { orderId: number; amount: number; paymentMethod: string; token: string },
  { rejectValue: string }
>(
  "payment/createCheckoutSession",
  async ({ orderId, amount, paymentMethod, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post<GenericApiResponse<CheckoutSessionResponse>>(
        "https://nestonlinestore.onrender.com/payment/create-checkout", // FIXED ROUTE
        { orderId, amount, paymentMethod },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );

      if (!res.data.success || !res.data.data) {
        return rejectWithValue(res.data.message || "Failed to create session");
      }

      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || err.message || "Request failed"
      );
    }
  }
);

export interface ConfirmPaymentResult {
  message: string;
}

export const confirmCheckoutPayment = createAsyncThunk<
  ConfirmPaymentResult,
  { sessionId: string },              // payload type
  { rejectValue: string }            // error type
>(
  "payment/confirmCheckoutPayment",
  async ({ sessionId }, { rejectWithValue }) => {
    try {
      const res = await axios.get<GenericApiResponse<string>>(
        "https://nestonlinestore.onrender.com/payment/confirm",
        {
          params: {
            session_id: sessionId,  
          },
          headers: {
            accept: "application/json",
          },
        }
      );

      if (!res.data.success) {
        return rejectWithValue(res.data.message || "Payment verification failed");
      }

      return {
        message: res.data.message || "Payment verified successfully",
      };
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err.message ||
        "Payment verification failed";
      return rejectWithValue(msg);
    }
  }
);
