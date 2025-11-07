import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// Define the request parameters type
interface LoginRequest {
  email: string;
  password: string;
}

// Define the register request parameters type
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Define error response type
interface ErrorResponse {
  message?: string;
}

export const loginUser = createAsyncThunk<string, LoginRequest>(
  'loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post<string>(
        `/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        {},
        {
          headers: {
            'accept': '*/*',
          },
        }
      );

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(axiosError.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk<void, RegisterRequest>(
  'registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await axios.post(
        '/auth/register',
        {
          name,
          email,
          password,
        },
        {
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(axiosError.response?.data?.message || 'Registration failed');
    }
  }
);

// Forgot password request type
interface ForgotPasswordRequest {
  email: string;
}

export const forgotPassword = createAsyncThunk<void, ForgotPasswordRequest>(
  'forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      console.log('Attempting forgot-password with:', { email });
      await axios.post(
        '/auth/forgot-password',
        { email },
        {
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Forgot-password request successful');
    } catch (error) {
      console.error('Forgot-password error:', error);
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(axiosError.response?.data?.message || 'Forgot password request failed');
    }
  }
);
