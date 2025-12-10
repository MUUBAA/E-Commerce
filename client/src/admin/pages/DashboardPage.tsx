import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import { fetchDashboardData } from "../redux/slices/adminDashboardSlice";
import type { AdminRootState } from "../redux/store";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { orders, users, products, lowStock, status } = useSelector(
    (state: AdminRootState) => state.adminDashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardData() as any);
  }, [dispatch]);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <StatCard label="Total Orders" value={orders.length} />
        <StatCard label="Total Revenue" value={`₹${totalRevenue.toFixed(2)}`} />
        <StatCard label="Total Users" value={users.length} />
        <StatCard label="Low Stock" value={lowStock.length} />
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-slate-800">Recent Orders</h3>
          {status === "loading" && (
            <span className="text-xs text-slate-500">Refreshing...</span>
          )}
        </div>
        <DataTable
          columns={[
            { header: "Order", accessor: "id" },
            { header: "User", accessor: "userId" },
            { header: "Amount", accessor: (o) => `₹${o.totalPrice}` },
            { header: "Status", accessor: "orderStatus" },
            { header: "Payment", accessor: "paymentStatus" },
          ]}
          data={orders.slice(0, 5)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">
            Low Stock Alerts
          </h3>
          <DataTable
            columns={[
              { header: "Product", accessor: "productName" },
              { header: "Qty", accessor: "stockQuantity" },
              { header: "Active", accessor: (p) => (p.isActive ? "Yes" : "No") },
            ]}
            data={lowStock}
          />
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">
            Active Products
          </h3>
          <DataTable
            columns={[
              { header: "Name", accessor: "itemName" },
              { header: "Price", accessor: (p) => `₹${p.itemPrice}` },
              { header: "Stock", accessor: "stockQuantity" },
            ]}
            data={products.slice(0, 5)}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

