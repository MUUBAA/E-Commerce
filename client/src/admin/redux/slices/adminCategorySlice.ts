import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAdminCategories,
  createAdminCategory,
  updateAdminCategory,
} from '../thunk/adminCategory';

interface AdminCategoryState {
  categories: any[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  total?: number;
}

const initialState: AdminCategoryState = {
  categories: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  total: 0,
};

const adminCategorySlice = createSlice({
  name: 'adminCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchAdminCategories
      .addCase(fetchAdminCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminCategories.fulfilled, (state, action) => {
        state.loading = false;
        // payload may be an array or an object containing items + metadata
        if (Array.isArray(action.payload)) {
          state.categories = action.payload as any[];
        } else if (action.payload && typeof action.payload === 'object') {
          // try common shapes: { items: [], total: N } or { data: [], total: N }
          const payload: any = action.payload;
          state.categories = payload.items ?? payload.data ?? payload;
          if (typeof payload.total === 'number') state.total = payload.total;
        } else {
          state.categories = [];
        }

        // update paging from the thunk arg if provided
        const arg = action.meta?.arg as { page?: number; pageSize?: number } | undefined;
        if (arg?.page) state.page = arg.page;
        if (arg?.pageSize) state.pageSize = arg.pageSize;
      })
      .addCase(fetchAdminCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle createAdminCategory
      .addCase(createAdminCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdminCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createAdminCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle updateAdminCategory
      .addCase(updateAdminCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (category) => category.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateAdminCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminCategorySlice.reducer;