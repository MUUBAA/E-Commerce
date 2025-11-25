// redux/slices/cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { addToCart, getCartItems, removeCartItem } from "../thunk/cart";

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  price: number;
  itemUrl?: string;
  itemName?: string;
  itemDescription?: string;
  totalPrice?: number;
}

interface CartState {
  items: CartItem[];
  page: number;
  pageSize: number;
  productId?: number;
  quantity?: number;
  price?: number;
  userId: number;
  itemUrl?: string;
  itemName?: string;
  itemDescription?: string;
  totalItems?: number;
  totalPrice?: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  page: 0,
  totalItems: 0,
  totalPrice: 0,
  pageSize: 0,
  userId: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;

        const payload = action.payload as any;

        const data = payload?.data ?? payload;

        const items = Array.isArray(data?.items) ? data.items : [];
        state.items = items;
        state.totalItems =
          typeof data?.totalItems === "number"
            ? data.totalItems
            : items.reduce(
                (sum: number, i: CartItem) => sum + (i.quantity || 0),
                0
              );

        state.totalPrice =
          typeof data?.totalPrice === "number"
            ? data.totalPrice
            : items.reduce(
                (sum: number, i: CartItem) =>
                  sum + (i.price || 0) * (i.quantity || 0),
                0
              );
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to load cart items";
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;

        // Prefer using the server response if it has totals/items
        const payload = action.payload as any;
        const data = payload?.data ?? payload;

        if (data) {
          if (Array.isArray(data.items)) {
            state.items = data.items;
          } else {
            const incoming: CartItem = action.meta.arg;
            const existing = state.items.find(
              (i) => i.productId === incoming.productId
            );
            if (existing) {
              existing.quantity += incoming.quantity;
              existing.price = incoming.price;
            } else {
              state.items.push(incoming);
              // Only increase totalItems if quantity is 1 (new product)
              if (incoming.quantity === 1) {
                state.totalItems = (state.totalItems || 0) + 1;
              }
            }
          }

          if (typeof data.totalItems === "number") {
            state.totalItems = data.totalItems;
          } else {
            // Always set to number of unique products
            state.totalItems = state.items.length;
          }

          if (typeof data.totalPrice === "number") {
            state.totalPrice = data.totalPrice;
          } else {
            state.totalPrice = state.items.reduce(
              (sum, i) => sum + (i.price || 0) * (i.quantity || 0),
              0
            );
          }
        } else {
          const incoming: CartItem = action.meta.arg;
          const existing = state.items.find(
            (i) => i.productId === incoming.productId
          );
          if (existing) {
            existing.quantity += incoming.quantity;
            existing.price = incoming.price;
          } else {
            state.items.push(incoming);
            // Only increase totalItems if quantity is 1 (new product)
            if (incoming.quantity === 1) {
              state.totalItems = (state.totalItems || 0) + 1;
            }
          }

          state.totalItems = state.items.length;
          state.totalPrice = state.items.reduce(
            (sum, i) => sum + (i.price || 0) * (i.quantity || 0),
            0
          );
        }
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to add product to cart";
      })
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const { productId } = action.payload;
        const item = state.items.find((i) => i.productId === productId);
        if (!item) return;

        if (item.quantity > 1) {
          item.quantity -= 1; // 3 → 2, 2 → 1
        } else {
          state.items = state.items.filter((i) => i.productId !== productId); // remove row
        }
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to remove product from cart";
      });
  },
});

export default cartSlice.reducer;
