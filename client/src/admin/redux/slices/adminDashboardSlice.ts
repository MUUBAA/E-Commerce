import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminApi from "../../services/api";
import type { AdminOrder, AdminProduct, AdminUser, InventoryAlert } from "../../types";

interface DashboardState {
  orders: AdminOrder[];
  users: AdminUser[];
  products: AdminProduct[];
  lowStock: InventoryAlert[];
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: DashboardState = {
  orders: [],
  users: [],
  products: [],
  lowStock: [],
  status: "idle",
};

export const fetchDashboardData = createAsyncThunk(
  "admin/dashboard",
  async (_, { rejectWithValue }) => {
    try {
      const [ordersRes, usersRes, productsRes, alertRes] = await Promise.all([
        adminApi.get("/admin/orders"),
        adminApi.get("/admin/users"),
        adminApi.get("/admin/products"),
        adminApi.get("/admin/products/alerts/low-stock"),
      ]);

      const normalize = (res: any) => {
        if (!res) return [];
        const d = res.data ?? res;
        if (Array.isArray(d)) return d;
        return d.items ?? d.data ?? [];
      };

      return {
        orders: normalize(ordersRes) as AdminOrder[],
        users: normalize(usersRes) as AdminUser[],
        products: normalize(productsRes) as AdminProduct[],
        lowStock: alertRes.data as InventoryAlert[],
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to load dashboard");
    }
  }
);

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload.orders;
        state.users = action.payload.users;
        state.products = action.payload.products;
        state.lowStock = action.payload.lowStock;
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default adminDashboardSlice.reducer;

