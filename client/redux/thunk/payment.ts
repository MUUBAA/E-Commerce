import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface CreateOrderResponse {
  razorpayKey: string;
  razorpayOrderId: string;
  amountInPaise: number;
  currency: string;
  clientSecret: string;
}

export const createOrder = createAsyncThunk<
  CreateOrderResponse,
  { orderId: number; amount: number; paymentMethod: string; token: string },
  { rejectValue: any }
>(
  "payment/createOrder",
  async ({ orderId, amount, paymentMethod, token }, { rejectWithValue }) => {
    try {
      const base = (import.meta as any)?.env?.VITE_API_BASE_URL || '/';
      const url = `${base.replace(/\/$/, '')}/payment/create-order`;
      const response = await axios.post<CreateOrderResponse>(
        url,
        { orderId, amount, paymentMethod },
        {
          headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json-patch+json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
