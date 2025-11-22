import { getDecryptedJwt } from "../../utils/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




interface GetUserByIdPayload {
  id: number;
}

export const getUserById = createAsyncThunk<
  { id: number; name: string; email: string, address?: string },
  GetUserByIdPayload
>("users/getById", async (payload, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      return rejectWithValue("No authentication token found");
    }

    const decodedToken = getDecryptedJwt();
    if (!decodedToken) {
      return rejectWithValue("Invalid authentication token");
    }

    const response = await axios.get(
      `/users/getById`,
      {
        params: { id: payload.id },
        headers: {
          Authorization: `Bearer ${decodedToken}`,
          Accept: "*/*",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user by ID"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
});
