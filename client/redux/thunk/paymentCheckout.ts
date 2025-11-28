// src/redux/thunk/paymentCheckout.ts (or in same payment thunk file)
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
  { rejectValue: any }
>(
  "payment/createCheckoutSession",
  async ({ orderId, amount, paymentMethod, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post<GenericApiResponse<CheckoutSessionResponse>>(
        "https://nestonlinestore.onrender.com/payment/create-checkout-session",
        { orderId, amount, paymentMethod },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.data.success || !res.data.data) {
        return rejectWithValue(res.data.message || "Failed to create session");
      }

      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
