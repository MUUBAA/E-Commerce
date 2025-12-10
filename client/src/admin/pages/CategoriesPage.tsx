import { useEffect, useState } from "react";
import adminApi from "../services/api";
import DataTable from "../components/DataTable";
import type { AdminCategory } from "../types";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await adminApi.get("/admin/categories");
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories", err);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await adminApi.post("/admin/categories", { name, description, isActive: true });
      setName("");
      setDescription("");
      await load();
    } catch (err) {
      console.error("Failed to create category", err);
      setError("Failed to create category");
      setLoading(false);
    }
  };

  const toggle = async (cat: AdminCategory) => {
    setLoading(true);
    setError(null);
    try {
      await adminApi.put(`/admin/categories/${cat.id}`, {
        ...cat,
        isActive: !cat.isActive,
      });
      await load();
    } catch (err) {
      console.error("Failed to update category", err);
      setError("Failed to update category");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Add Category</h3>
        {error && (
          <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </div>
        )}
        <form className="grid grid-cols-1 md:grid-cols-3 gap-3" onSubmit={submit}>
          <input
            className="border rounded-xl px-3 py-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="border rounded-xl px-3 py-2 md:col-span-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button 
            className="bg-[#ff2f92] text-white rounded-xl py-2 px-4 shadow disabled:opacity-60"
            disabled={loading}
          >
            Save
          </button>
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="bg-slate-100 text-slate-700 rounded-xl py-2 px-4 shadow disabled:opacity-60"
          >
            Refresh
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-md">
        <DataTable
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Active", accessor: (c) => (c.isActive ? "Yes" : "No") },
            {
              header: "Actions",
              accessor: (c) => (
                <button
                  onClick={() => toggle(c)}
                  className="px-3 py-1 bg-slate-100 rounded-lg text-xs"
                >
                  {c.isActive ? "Disable" : "Enable"}
                </button>
              ),
            },
          ]}
          data={categories}
        />
      </div>
    </div>
  );
};

export default CategoriesPage;

