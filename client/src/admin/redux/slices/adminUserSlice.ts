import { createSlice } from '@reduxjs/toolkit';
import { fetchAdminUsers } from '../thunk/adminUsers';

interface AdminUserState {
  users: any[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  total?: number;
}

const initialState: AdminUserState = {
  users: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  total: 0,
};

const adminUserSlice = createSlice({
  name: 'adminUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchAdminUsers
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.users = action.payload as any[];
        } else if (action.payload && typeof action.payload === 'object') {
          const payload: any = action.payload;
          state.users = payload.items ?? payload.data ?? payload;
          if (typeof payload.total === 'number') state.total = payload.total;
        } else {
          state.users = [];
        }

        const arg = action.meta?.arg as { page?: number; pageSize?: number } | undefined;
        if (arg?.page) state.page = arg.page;
        if (arg?.pageSize) state.pageSize = arg.pageSize;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminUserSlice.reducer;