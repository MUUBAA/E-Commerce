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
  page: number;
  pageSize: number;
  total?: number;
}

const initialState: AdminProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  total: 0,
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
        if (Array.isArray(action.payload)) {
          state.products = action.payload as AdminProduct[];
        } else if (action.payload && typeof action.payload === 'object') {
          const payload: any = action.payload;
          state.products = payload.items ?? payload.data ?? payload;
          if (typeof payload.total === 'number') state.total = payload.total;
        } else {
          state.products = [];
        }

        const arg = action.meta?.arg as { page?: number; pageSize?: number } | undefined;
        if (arg?.page) state.page = arg.page;
        if (arg?.pageSize) state.pageSize = arg.pageSize;
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
