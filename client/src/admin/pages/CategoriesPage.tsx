import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import DataTable from "../components/DataTable";
import type { AdminCategory } from "../types";
import type { AdminDispatch, AdminRootState } from '../redux/store';
import { fetchAdminCategories, createAdminCategory, updateAdminCategory } from '../redux/thunk/adminCategory';

const CategoriesPage = () => {
  const dispatch = useDispatch<AdminDispatch>();
  const { categories, loading, error } = useSelector((s: AdminRootState) => s.adminCategories);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, [dispatch]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createAdminCategory({ id: 0, name, description, isActive: true })).unwrap();
      setName("");
      setDescription("");
      // refetch
      dispatch(fetchAdminCategories());
    } catch (err) {
      console.error('Failed to create category', err);
    }
  };

  const toggle = async (cat: AdminCategory) => {
    try {
      await dispatch(updateAdminCategory({ ...cat, description: cat.description ?? '', isActive: !cat.isActive })).unwrap();
      dispatch(fetchAdminCategories());
    } catch (err) {
      console.error('Failed to update category', err);
    }
  };

  const load = () => {
    dispatch(fetchAdminCategories());
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

