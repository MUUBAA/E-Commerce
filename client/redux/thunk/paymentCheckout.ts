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
      const base = import.meta.env.VITE_API_BASE_URL || '/';
      const url = `${base.replace(/\/$/, '')}/payment/create-checkout`;
      const res = await axios.post<GenericApiResponse<CheckoutSessionResponse>>(
        url,
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
      const base = import.meta.env.VITE_API_BASE_URL || '/';
      const url = `${base.replace(/\/$/, '')}/payment/confirm`;
      const res = await axios.get<GenericApiResponse<string>>(
        url,
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
