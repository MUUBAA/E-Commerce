import { createSlice } from '@reduxjs/toolkit';
import { fetchAdminUsers } from '../thunk/adminUsers';

interface AdminUserState {
  users: any[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminUserState = {
  users: [],
  loading: false,
  error: null,
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
        state.users = action.payload;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminUserSlice.reducer;