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
}

const initialState: AdminCategoryState = {
  categories: [],
  loading: false,
  error: null,
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
        state.categories = action.payload;
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