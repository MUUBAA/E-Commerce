import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getDecryptedJwt } from "../../utils/auth";


// Get JWT token from localStorage
export interface GetAllProductsPayload
{
  productId?: number;
  totalItems: number;
  itemsPerPage?: number;
  totalPages: number;
  currentPage: number;
  categoryId?: number;
  itemName?: string;

}
// Fetch all products
export const fetchAllProducts = createAsyncThunk<any, GetAllProductsPayload>(
  'products/fetchAll',
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('jwtToken');
      
      if (!token) {
        return rejectWithValue('No authentication token found');
      }
      const decodedToken = getDecryptedJwt(); // Decode the base64 encoded toke
      if (!decodedToken) {
        return rejectWithValue('Invalid authentication token');
      }

      const response = await axios.post(
        `/product/get-all`, payload || {},
        {
          headers: {
            Authorization: `Bearer ${decodedToken}`,
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
// export const fetchProductById = createAsyncThunk<ProductGetAllResponse, number, { rejectValue: string }>(
//   'products/fetchById',
//   async (productId, { rejectWithValue }) => {
//     try {
//       const token = getAuthToken();
      
//       if (!token) {
//         return rejectWithValue('No authentication token found');
//       }

//       const response = await axios.get<{ success: boolean; message: string; data: ProductGetAllResponse }>(
//         `/product/get-by-id`,
//         {
//           params: { productId },
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'accept': '*/*'
//           }
//         }
//       );

//       return response.data.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
//       }
//       return rejectWithValue('An unexpected error occurred');
//     }
//   }
// );

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
