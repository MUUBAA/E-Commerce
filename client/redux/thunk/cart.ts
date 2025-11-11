// redux/thunk/cart.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getDecryptedJwt } from '../../utils/auth';

export interface AddToCartPayload {
  userId: number;    // make this required to avoid surprise undefined
  productId: number;
  quantity: number;
  price: number;
}

export const getCartItems = createAsyncThunk<any, { userId?: number }>(
  'cart/getAll',
  async (arg, { rejectWithValue }) => {
    try {
      const token = getDecryptedJwt();
      if (!token) return rejectWithValue('No authentication token found');

      // Resolve user id either from arg or from token
      type JwtPayload = { id?: number; sub?: string; [k: string]: any };
      const decoded = jwtDecode<JwtPayload>(token);
      const tokenUserId =
        arg?.userId ??
        (typeof decoded.id === 'number'
          ? decoded.id
          : decoded.sub
            ? Number(decoded.sub)
            : undefined);

      if (!tokenUserId || Number.isNaN(tokenUserId)) {
        return rejectWithValue('Invalid user identity in token');
      }

      const base = (import.meta as any)?.env?.VITE_API_BASE_URL || '';
      const response = await axios.get(
        `${base}/cart/items`,
        {
          params: { userId: tokenUserId },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to load cart items');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
export const addToCart = createAsyncThunk<any, AddToCartPayload>(
  'cart/add',
  async (payload, { rejectWithValue }) => {
    try {
      const token = getDecryptedJwt();
      if (!token) return rejectWithValue('No authentication token found');

      // Ensure userId in payload matches token
      type JwtPayload = { id?: number; sub?: string; [k: string]: any };
      const decoded = jwtDecode<JwtPayload>(token);
      const tokenUserId =
        typeof decoded.id === 'number'
          ? decoded.id
          : decoded.sub
            ? Number(decoded.sub)
            : undefined;

      if (!tokenUserId || Number.isNaN(tokenUserId)) {
        return rejectWithValue('Invalid user identity in token');
      }

      const requestBody: AddToCartPayload = {
        ...payload,
        userId: tokenUserId,
      };

      // Use API base URL when running client directly (e.g., Vite on 5015).
      // When using SpaProxy and browsing via backend, keep it relative.
      const base = (import.meta as any)?.env?.VITE_API_BASE_URL || '';

      const response = await axios.post(
        `${base}/cart/add`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,     // raw decrypted token
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      return response.data; // return server's updated item/cart if available
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add product to cart');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
