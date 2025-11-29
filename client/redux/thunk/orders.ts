import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface CreateOrderResponseDto {
  orderId: number;
  totalPrice: number;
  status: string; // "pending" | "success" | ...
}

export interface GenericApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

// userId comes from JWT on backend, so we only send token
export const createOrderFromCart = createAsyncThunk<
  CreateOrderResponseDto,
  { token: string },
  { rejectValue: string }
>(
  "order/createOrderFromCart",
  async ({ token }, { rejectWithValue }) => {
    try {
      const res = await axios.post<GenericApiResponse<CreateOrderResponseDto>>(
        "https://nestonlinestore.onrender.com/order/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );

      if (!res.data.success || !res.data.data) {
        return rejectWithValue(res.data.message || "Failed to create order");
      }

      return res.data.data;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err.message ||
        "Failed to create order";
      return rejectWithValue(msg);
    }
  }
);

export interface OrderItemListDto {
  orderItemId: number;
  productId: number;
  itemName?: string;
  itemDescription?: string;
  itemUrl?: string;
  quantity: number;
  linePrice: number;
}

export interface UserOrderDto {
  orderId: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: OrderItemListDto[];
}

export const fetchMyOrders = createAsyncThunk<
  UserOrderDto[],
  { token: string },
  { rejectValue: string }
>("orders/fetchMyOrders", async ({ token }, { rejectWithValue }) => {
  try {
    const res = await axios.get<GenericApiResponse<UserOrderDto[]>>(
      "https://nestonlinestore.onrender.com/order/my-orders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      }
    );

    if (!res.data.success || !res.data.data) {
      return rejectWithValue(res.data.message || "Failed to fetch orders");
    }
    return res.data.data;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data ||
      err.message ||
      "Failed to fetch orders";
    return rejectWithValue(msg);
  }
});
