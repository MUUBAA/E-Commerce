import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import AdminLayout from "../layouts/AdminLayout";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import OrdersPage from "../pages/OrdersPage";
import UsersPage from "../pages/UsersPage";
import InventoryPage from "../pages/InventoryPage";
import CategoriesPage from "../pages/CategoriesPage";
import AdminGuard from "../guards/AdminGuard";
import { adminStore } from "../redux/store";

const AdminRoutes = () => {
  return (
    <Provider store={adminStore}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <AdminGuard>
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/inventory" element={<InventoryPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
              </AdminLayout>
            </AdminGuard>
          }
        />
      </Routes>
    </Provider>
  );
};

export default AdminRoutes;

