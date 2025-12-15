import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get JWT token from localStorage
export interface GetAllProductsPayload
{
  id?: number;
  totalItems: number;
  itemsPerPage?: number;
  totalPages: number;
  currentPage: number;
  categoryId?: number;
  itemName?: string;
  pageSize?: number;

}
// Fetch all products
export const fetchAllProducts = createAsyncThunk<any, GetAllProductsPayload>(
  'products/fetchAll',
  async (payload, { rejectWithValue }) => {
    try {
      const base = import.meta.env.VITE_API_BASE_URL || '/';
      const url = `${base.replace(/\/$/, '')}/product/get-all`;
      const response = await axios.post(
        url, payload || {},
        {
          headers: {
            "Content-Type": "application/json-patch+json",
            Accept: 'text/plain'
          }
        }
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Fetch products by category

// Fetch single product by ID
export const fetchProductById = createAsyncThunk(
  'product/fetchById',
  async (productId: number, thunkAPI) => {
    try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:5200';
      const response = await axios.get(
        `${baseUrl}/product/get-by-id/${productId}`,
        {
          headers: {
            'accept': '*/*',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtdWJhc2lyQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJBYmR1bGxhaCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiaXNBZG1pbiI6InRydWUiLCJqdGkiOiI1ZWNlZjVkYi00NDU1LTRlYzEtYmYxYS0wZGZmNDBmNGEwZTgiLCJleHAiOjE3NjU1NTgxOTB9.pGEVnejMd_J9sIiP4rPJqfS5Hanf-oukpGfNvyILjaY'
          }
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch product');
    }
  }
);

// // Search products
// export const searchProducts = createAsyncThunk<ProductGetAllResponse[], string, { rejectValue: string }>(
//   'products/search',
//   async (query, { rejectWithValue }) => {
//     try {
//       const token = getAuthToken();
      
//       if (!token) {
//         return rejectWithValue('No authentication token found');
//       }

//       const response = await axios.get<{ success: boolean; message: string; data: ProductGetAllResponse[] }>(
//         `/products/search`,
//         {
//           params: { q: query },
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'accept': '*/*'
//           }
//         }
//       );

//       return response.data.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         return rejectWithValue(error.response?.data?.message || 'Failed to search products');
//       }
//       return rejectWithValue('An unexpected error occurred');
//     }
//   }
// );
