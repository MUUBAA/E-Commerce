import { useEffect, useState } from "react";
import adminApi from "../services/api";
import DataTable from "../components/DataTable";
import type { InventoryAlert } from "../types";

const InventoryPage = () => {
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);

  const load = async () => {
    const { data } = await adminApi.get("/admin/products/alerts/low-stock");
    setAlerts(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-slate-800">Inventory Overview</h3>
        <button
          onClick={load}
          className="px-3 py-1 bg-[#ff2f92] text-white rounded-lg shadow"
        >
          Refresh
        </button>
      </div>
      <DataTable
        columns={[
          { header: "Product", accessor: "productName" },
          { header: "Stock", accessor: "stockQuantity" },
          { header: "Active", accessor: (a) => (a.isActive ? "Yes" : "No") },
        ]}
        data={alerts}
      />
    </div>
  );
};

export default InventoryPage;

