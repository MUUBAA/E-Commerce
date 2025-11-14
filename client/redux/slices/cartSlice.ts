// redux/slices/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { addToCart, getCartItems } from '../thunk/cart';

export interface CartItem {
  productId: number;
  quantity: number;
  price: number;
  itemUrl?: string;
  itemName?: string;
  itemDescription?: string;
};

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
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  page: 0,
  pageSize: 0,
  userId: 0,
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // optional: local add/remove for optimistic updates
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to load cart items';
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        // If your API returns the updated cart, replace it:
        // state.items = action.payload.items;

        // If API returns only the item, merge it locally:
        const incoming: CartItem = action.meta.arg; // the request we sent
        const existing = state.items.find(i => i.productId === incoming.productId);
        if (existing) {
          existing.quantity += incoming.quantity;
          existing.price = incoming.price; // or keep existing if price is per unit
        } else {
          state.items.push(incoming);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to add product to cart';
      });
  }
});

export default cartSlice.reducer;
