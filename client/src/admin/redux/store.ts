import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./slices/adminAuthSlice";
import dashboardReducer from "./slices/adminDashboardSlice";

export const adminStore = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    adminDashboard: dashboardReducer,
  },
});

export type AdminRootState = ReturnType<typeof adminStore.getState>;
export type AdminDispatch = typeof adminStore.dispatch;

