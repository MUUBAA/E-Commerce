import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/';

// Thunk for admin login
export const adminLogin = createAsyncThunk(
  'admin/auth/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/admin/auth/login`, {
        email,
        password,
      }, {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json-patch+json',
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);