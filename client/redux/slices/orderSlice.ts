// src/redux/slices/orderSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createOrderFromCart, fetchMyOrders } from "../thunk/orders";


export interface CreateOrderResponseDto {
  orderId: number;
  totalPrice: number;
  status: string;
}

export interface CheckoutSessionResponse {
  url: string;
}

import type { OrderItemListDto } from "../thunk/orders";

export interface MyOrderDto {
  orderId: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: OrderItemListDto[];
}

interface OrderState {
  currentOrder: CreateOrderResponseDto | null;
  checkoutSession: CheckoutSessionResponse | null;
  myOrders: MyOrderDto[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  currentOrder: null,
  checkoutSession: null,
  myOrders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCurrentOrder(state, action: PayloadAction<CreateOrderResponseDto>) {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderFromCart.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      })
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Failed to fetch orders";
      });
  },
});

export const { setCurrentOrder, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
