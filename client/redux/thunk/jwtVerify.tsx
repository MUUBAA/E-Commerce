// Reset Password Thunk
export const resetPassword = createAsyncThunk<any, { token: string; newPassword: string }>(
  'resetPassword',
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/auth/reset-password',
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
    const response = await axios.post(
      "/auth/register",
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
    } catch (error) {
      console.error('Forgot-password error:', error);
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(axiosError.response?.data?.message || 'Forgot password request failed');
    }
  }
);
