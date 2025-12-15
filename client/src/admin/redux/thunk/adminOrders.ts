import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/';

// Thunk for fetching admin orders
export const fetchAdminOrders = createAsyncThunk(
  'admin/orders/fetch',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as {adminAuth: { token: string };} // Explicitly typing state
      const token = state.adminAuth.token; // Assuming token is stored in auth slice
      const response = await axios.get(`${BASE_URL}/admin/orders`, {
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

// Thunk for fetching a specific admin order by ID
export const fetchAdminOrderById = createAsyncThunk(
  'admin/orders/fetchById',
  async (orderId: string, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as {adminAuth: { token: string } }; // Explicitly typing state
      const token = state.adminAuth.token; // Assuming token is stored in auth slice
      const response = await axios.get(`${BASE_URL}/admin/orders/${orderId}`, {
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

// Thunk for updating the status of an admin order
export const updateAdminOrderStatus = createAsyncThunk(
  'admin/orders/updateStatus',
  async (
    statusUpdate: { orderId: number; orderStatus: string; paymentStatus: string },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState() as {adminAuth: { token: string } }; // Explicitly typing state
      const token = state.adminAuth.token; // Assuming token is stored in auth slice
      const response = await axios.patch(
        `${BASE_URL}/admin/orders/${statusUpdate.orderId}/status`,
        statusUpdate,
        {
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json-patch+json',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);