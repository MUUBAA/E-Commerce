// Reset Password Thunk
export const resetPassword = createAsyncThunk<any, { token: string; newPassword: string }>(
  'resetPassword',
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const base = import.meta.env.VITE_API_BASE_URL || '/';
      const url = `${base.replace(/\/$/, '')}/auth/reset-password`;
      const response = await axios.post(
        url,
        { token, newPassword },
        {
          headers: {
            'Content-Type': 'application/json-patch+json',
            'accept': '*/*',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Password reset failed');
    }
  }
);
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface LoginRequest {
  email: string;
  password: string;
}

interface ErrorResponse {
  message?: string;
}

export const loginUser = createAsyncThunk<string, LoginRequest>(
  'loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const base = import.meta.env.VITE_API_BASE_URL || '/';
      const url = `${base.replace(/\/$/, '')}/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
      const response = await axios.post<string>(
        url,
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

interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserResponse {
  sucess: boolean;  
  token: string;
  message: string;
}

export const registerUser = createAsyncThunk<
  RegisterUserResponse,
  RegisterUserPayload
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const base = import.meta.env.VITE_API_BASE_URL || '/';
    const url = `${base.replace(/\/$/, '')}/auth/register`;
    const response = await axios.post(
      url,
      payload,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
          Accept: "*/*",
        },
      }
    );

    
    return response.data as RegisterUserResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        (error.response?.data as any)?.message || "Failed to register user"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

// Forgot password request type
interface ForgotPasswordRequest {
  email: string;
}

export const forgotPassword = createAsyncThunk<void, ForgotPasswordRequest>(
  'forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const base = import.meta.env.VITE_API_BASE_URL || '/';
      const url = `${base.replace(/\/$/, '')}/auth/forgot-password`;
      await axios.post(
        url,
        { email },
        {
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Forgot-password error:', error);
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(axiosError.response?.data?.message || 'Forgot password request failed');
    }
  }
);
