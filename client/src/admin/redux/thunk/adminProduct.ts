import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/';

// Thunk for fetching admin products
export const fetchAdminProducts = createAsyncThunk(
  'admin/products/fetch',
  async (pagination: { page?: number; pageSize?: number; search?: string } | undefined, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as {adminAuth: { token: string };} // Explicitly typing state
      const token = state.adminAuth.token; // Assuming token is stored in auth slice
      const page = pagination?.page ?? 1;
      const pageSize = pagination?.pageSize ?? 20;
      const response = await axios.get(`${BASE_URL}/admin/products`, {
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
      console.log('fetchAdminProducts CALLED', response.data);
      return response.data;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Thunk for updating an admin product
export const updateAdminProduct = createAsyncThunk(
  'admin/products/update',
  async (product: {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    categoryName: string;
    stockQuantity: number;
    discountPercent: number;
    imageUrl: string;
    id: number;
    isActive: boolean;
  }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as {adminAuth: { token: string };}// Explicitly typing state
      const token = state.adminAuth.token; // Assuming token is stored in auth slice
      const response = await axios.put(`${BASE_URL}/admin/products/${product.id}`, product, {
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

// Thunk for creating a new admin product
export const createAdminProduct = createAsyncThunk(
  'admin/products/create',
  async (
    product: {
      name: string;
      description: string;
      price: number;
      categoryId: number;
      categoryName: string;
      stockQuantity: number;
      discountPercent: number;
      imageUrl: string;
    },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState() as {adminAuth: { token: string };} // Explicitly typing state
      const token = state.adminAuth.token; // Assuming token is stored in auth slice
      const response = await axios.post(`${BASE_URL}/admin/products`, product, {
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

// Thunk for fetching a product by ID
export const fetchAdminProductById = createAsyncThunk(
  'admin/products/fetchById',
  async (productId: number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as {
        adminAuth: { token: string };
      };

      const token = state.adminAuth.token;

      const response = await axios.get(
        `${BASE_URL}/admin/products/getById/${productId}`, // ✅ FIXED
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: '*/*',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch product'
      );
    }
  }
);
