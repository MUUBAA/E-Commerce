import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/';

// Thunk for fetching admin users
export const fetchAdminUsers = createAsyncThunk(
  'admin/users/fetch',
  async (pagination: { page?: number; pageSize?: number; search?: string } | undefined, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as {adminAuth: { token: string };} // Explicitly typing state
      const token = state.adminAuth.token; // Assuming token is stored in auth slice
      const page = pagination?.page ?? 1;
      const pageSize = pagination?.pageSize ?? 10;
      const response = await axios.get(`${BASE_URL}/admin/users`, {
        params: {
          Page: page,
          PageSize: pageSize,
          Search: pagination?.search,
        },
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);