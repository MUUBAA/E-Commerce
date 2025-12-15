import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./slices/adminAuthSlice";
import dashboardReducer from "./slices/adminDashboardSlice";
import adminOrderReducer from "./slices/adminOrderSlice";
import adminCategoryReducer from "./slices/adminCategorySlice";
import adminProductReducer from "./slices/adminProductSlice";
import adminUserReducer from "./slices/adminUserSlice";


export const adminStore = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    adminDashboard: dashboardReducer,
    adminOrders: adminOrderReducer,
    adminCategories: adminCategoryReducer,
    adminProducts: adminProductReducer,
    adminUsers: adminUserReducer,
  },
});

export type AdminRootState = ReturnType<typeof adminStore.getState>;
export type AdminDispatch = typeof adminStore.dispatch;

