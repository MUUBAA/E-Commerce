import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createOrderFromCart } from "../thunk/orders";
import type { CreateOrderResponseDto } from "../thunk/orders";

interface OrderState {
  orderId: number | null;
  totalPrice: number;
  orderStatus: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orderId: null,
  totalPrice: 0,
  orderStatus: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrder(state) {
      state.orderId = null;
      state.totalPrice = 0;
      state.orderStatus = null;
      state.loading = false;
      state.error = null;
    },
    setOrderStatus(state, action: PayloadAction<string>) {
      state.orderStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createOrderFromCart.fulfilled,
        (state, action: PayloadAction<CreateOrderResponseDto>) => {
          state.loading = false;
          state.error = null;
          state.orderId = action.payload.orderId;
          state.totalPrice = action.payload.totalPrice;
          state.orderStatus = action.payload.status;
        }
      )
      .addCase(createOrderFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Failed to create order";
      });
  },
});

export const { resetOrder, setOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
