import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminApi from "../../services/api";

interface LoginPayload {
  email: string;
  password: string;
}

interface AdminAuthState {
  token: string | null;
  status: "idle" | "loading" | "failed" | "succeeded";
  error?: string;
}

const initialState: AdminAuthState = {
  token: localStorage.getItem("adminToken"),
  status: "idle",
};

export const adminLogin = createAsyncThunk(
  "admin/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.post("/admin/auth/login", payload);
      localStorage.setItem("adminToken", data.token);
      return data.token as string;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    adminLogout(state) {
      state.token = null;
      localStorage.removeItem("adminToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Login failed";
      });
  },
});

export const { adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;

