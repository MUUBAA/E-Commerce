// redux/thunk/cart.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getDecryptedJwt } from '../../utils/auth';

export interface AddToCartPayload {
  id: number;         // cart item id, if needed for updates
  userId: number;    // make this required to avoid surprise undefined
  productId: number;
  quantity: number;
  price: number;
}

export interface GetAllCartPayload {
   id: number;
   page: number;
   pageSize: number;
   userId: number;
   productId?: number;
   quantity?: number;
   price?: number;
   itemUrl?: string;
   itemName?: string;
   itemDescription?: string;
}


export const getCartItems = createAsyncThunk<any, GetAllCartPayload>(
  'cart/getAll',
  async (Payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      const decodedToken = getDecryptedJwt();
        if(!decodedToken) {
          return rejectWithValue('Invalid authentication token');
        } 
        const response = await axios.post(
          `/cart/get-all`, Payload || {},
          {
          headers: {
            Authorization: `Bearer ${decodedToken}`,
            "Content-Type": "application/json-patch+json",
            Accept: 'text/plain'
          }
        }
      );
      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to load cart items');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
export const addToCart = createAsyncThunk<
  any, // Replace with the actual return type of the API response
  AddToCartPayload
>(
  'cart/add',
  async (payload, { rejectWithValue }) => {
    try {
      const token = getDecryptedJwt();
      if (!token) return rejectWithValue('No authentication token found');

      // Ensure userId in payload matches token
      type JwtPayload = { id?: number; sub?: string; [k: string]: unknown };
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
      const base = (import.meta.env as Record<string, string>)?.VITE_API_BASE_URL || '';

      const response = await axios.post(
        `${base}/cart/add`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`, // raw decrypted token
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      return response.data; // return server's updated item/cart if available
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add product to cart');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const removeCartItem = createAsyncThunk<
  any, // Replace with the actual return type if known
  { id: number }
>(
  'cart/remove',
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = getDecryptedJwt();
      if (!token) return rejectWithValue('No authentication token found');

      const response = await axios.delete(
        `/cart/remove`,
        {
          params: { id },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'text/plain',
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to remove cart item');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
