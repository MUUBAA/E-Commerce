import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  fetchAdminProductById,
} from '../thunk/adminProduct';

export interface AdminProduct {
  id: number;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  categoryId: number;
  categoryName: string;
  stockQuantity: number;
  discountPercent: number;
  imageUrl: string;
  isActive: boolean;
}

export interface AdminProductState {
  products: AdminProduct[];
  product: AdminProduct | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

const adminProductSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create product
      .addCase(createAdminProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // Update product
      .addCase(updateAdminProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      // Fetch product by ID
      .addCase(fetchAdminProductById.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  },
});

export default adminProductSlice.reducer;
