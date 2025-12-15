import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/';

// Thunk for fetching admin categories
export const fetchAdminCategories = createAsyncThunk(
  'admin/categories/fetch',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as {adminAuth: { token: string } }; // Explicitly typing state
      const token = state.adminAuth.token; // Assuming token is stored in auth slice
      const response = await axios.get(`${BASE_URL}/admin/categories`, {
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

// Thunk for creating a new admin category
export const createAdminCategory = createAsyncThunk(
  'admin/categories/create',
  async (category: { id: number; name: string; description: string; isActive: boolean }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as {adminAuth: { token: string } }; // Explicitly typing state
      const token = state.adminAuth.token; // Assuming token is stored in auth slice
      const response = await axios.post(`${BASE_URL}/admin/categories`, category, {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json-patch+json',
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Thunk for updating an admin category
export const updateAdminCategory = createAsyncThunk(
  'admin/categories/update',
  async (category: { id: number; name: string; description: string; isActive: boolean }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as {adminAuth: { token: string } }; // Explicitly typing state
      const token = state.adminAuth.token; // Assuming token is stored in auth slice
      const response = await axios.put(`${BASE_URL}/admin/categories/${category.id}`, category, {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json-patch+json',
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);