import { useEffect, useState } from "react";
import adminApi from "../services/api";
import DataTable from "../components/DataTable";
import type { InventoryAlert } from "../types";

const InventoryPage = () => {
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await adminApi.get("/admin/products/alerts/low-stock");
      setAlerts(data);
    } catch (err) {
      console.error("Failed to load inventory alerts", err);
      setError("Failed to load inventory alerts");
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
          className="px-3 py-1 bg-[#ff2f92] text-white rounded-lg shadow disabled:opacity-60"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>
      {error && (
        <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </div>
      )}
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

