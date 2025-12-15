import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import DataTable from "../components/DataTable";
import type { InventoryAlert } from "../types";
import { fetchDashboardData } from '../redux/slices/adminDashboardSlice';
import type { AdminDispatch, AdminRootState } from '../redux/store';

const InventoryPage = () => {
  const dispatch = useDispatch<AdminDispatch>();
  const { lowStock, status } = useSelector((s: AdminRootState) => s.adminDashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const loading = status === 'loading';

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-slate-800">Inventory Overview</h3>
        <button
          onClick={() => dispatch(fetchDashboardData())}
          disabled={loading}
          className="px-3 py-1 bg-[#ff2f92] text-white rounded-lg shadow disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      <DataTable
        columns={[
          { header: "Product", accessor: "productName" },
          { header: "Stock", accessor: "stockQuantity" },
          { header: "Active", accessor: (a: InventoryAlert) => (a.isActive ? "Yes" : "No") },
        ]}
        data={lowStock}
      />
    </div>
  );
};

export default InventoryPage;

