import { useEffect, useState } from "react";
import adminApi from "../services/api";
import DataTable from "../components/DataTable";
import type { AdminCategory } from "../types";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const load = async () => {
    const { data } = await adminApi.get("/admin/categories");
    setCategories(data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminApi.post("/admin/categories", { name, description, isActive: true });
    setName("");
    setDescription("");
    load();
  };

  const toggle = async (cat: AdminCategory) => {
    await adminApi.put(`/admin/categories/${cat.id}`, {
      ...cat,
      isActive: !cat.isActive,
    });
    load();
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Add Category</h3>
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
          <button className="bg-[#ff2f92] text-white rounded-xl py-2 px-4 shadow">
            Save
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

