import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/';

// Thunk for fetching admin users
export const fetchAdminUsers = createAsyncThunk(
  'admin/users/fetch',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as {adminAuth: { token: string };} // Explicitly typing state
      const token = state.adminAuth.token; // Assuming token is stored in auth slice
      const response = await axios.get(`${BASE_URL}/admin/users`, {
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