import { useEffect, useState } from "react";
import adminApi from "../services/api";
import type { AdminProduct } from "../types";
import DataTable from "../components/DataTable";

const ProductsPage = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
    categoryName: "",
    stockQuantity: 0,
    discountPercent: 0,
    imageUrl: "",
  });

  const loadProducts = async () => {
    const { data } = await adminApi.get("/admin/products");
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminApi.post("/admin/products", {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      categoryId: Number(form.categoryId),
      categoryName: form.categoryName,
      stockQuantity: Number(form.stockQuantity),
      discountPercent: Number(form.discountPercent),
      imageUrl: form.imageUrl,
    });
    setForm({
      name: "",
      description: "",
      price: 0,
      categoryId: 0,
      categoryName: "",
      stockQuantity: 0,
      discountPercent: 0,
      imageUrl: "",
    });
    loadProducts();
  };

  const toggleActive = async (product: AdminProduct) => {
    await adminApi.patch(`/admin/products/${product.id}/status`, {
      isActive: !product.isActive,
    });
    loadProducts();
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          Add Product
        </h3>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-3" onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            className="border rounded-xl px-3 py-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Category Name"
            className="border rounded-xl px-3 py-2"
            value={form.categoryName}
            onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Category Id"
            className="border rounded-xl px-3 py-2"
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="border rounded-xl px-3 py-2"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            required
          />
          <input
            type="number"
            placeholder="Stock"
            className="border rounded-xl px-3 py-2"
            value={form.stockQuantity}
            onChange={(e) =>
              setForm({ ...form, stockQuantity: Number(e.target.value) })
            }
            required
          />
          <input
            type="number"
            placeholder="Discount %"
            className="border rounded-xl px-3 py-2"
            value={form.discountPercent}
            onChange={(e) =>
              setForm({ ...form, discountPercent: Number(e.target.value) })
            }
          />
          <input
            placeholder="Image URL"
            className="border rounded-xl px-3 py-2 col-span-full"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="border rounded-xl px-3 py-2 col-span-full"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button className="bg-[#ff2f92] text-white rounded-xl py-2 px-4 shadow col-span-full md:col-span-1">
            Save
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-slate-800">Products</h3>
        </div>
        <DataTable
          columns={[
            { header: "Name", accessor: "itemName" },
            { header: "Price", accessor: (p) => `₹${p.itemPrice}` },
            { header: "Stock", accessor: "stockQuantity" },
            { header: "Active", accessor: (p) => (p.isActive ? "Yes" : "No") },
            {
              header: "Actions",
              accessor: (p) => (
                <button
                  onClick={() => toggleActive(p)}
                  className="px-3 py-1 bg-slate-100 rounded-lg text-xs"
                >
                  {p.isActive ? "Disable" : "Enable"}
                </button>
              ),
            },
          ]}
          data={products}
        />
      </div>
    </div>
  );
};

export default ProductsPage;

