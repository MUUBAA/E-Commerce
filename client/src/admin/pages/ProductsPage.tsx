import { useEffect, useState } from 'react';
import adminApi from '../services/api';
import type { AdminProduct } from '../types';
import DataTable from '../components/DataTable';
import { 
  Package, 
  Plus, 
  Edit3, 
  ToggleLeft, 
  ToggleRight,
  Image,
  DollarSign,
  Tag,
  Layers,
  AlertTriangle,
  CheckCircle,
  X,
  RefreshCw
} from 'lucide-react';

const ProductsPage = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    setLoading(true);
    setError(null);
    try {
      const { data } = await adminApi.get("/admin/products");
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
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
      await loadProducts();
    } catch (err) {
      console.error("Failed to create product", err);
      setError("Failed to create product");
      setLoading(false);
    }
  };

  const toggleActive = async (product: AdminProduct) => {
    setLoading(true);
    setError(null);
    try {
      await adminApi.patch(`/admin/products/${product.id}/status`, {
        isActive: !product.isActive,
      });
      await loadProducts();
    } catch (err) {
      console.error("Failed to update product", err);
      setError("Failed to update product");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-3">
              <Package size={28} className="sm:w-9 sm:h-9" />
              <span className="truncate">Product Management</span>
            </h1>
            <p className="text-purple-100 text-sm sm:text-base">Manage your product catalog and inventory</p>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <p className="text-purple-100 text-xs sm:text-sm">Total Products</p>
            <p className="text-xl sm:text-2xl font-bold">{products.length}</p>
          </div>
        </div>
      </div>

      {/* Add Product Form */}
      <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl border border-slate-100">
        <div className="p-4 sm:p-6 border-b border-slate-100">
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-3">
            <Plus size={20} className="sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
            <span className="truncate">Add New Product</span>
          </h3>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">Fill in the details to add a new product to your catalog</p>
        </div>
        <form className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" onSubmit={handleSubmit}>
          {error && (
            <div className="lg:col-span-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </div>
          )}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Package size={16} className="inline mr-1" />
              Product Name
            </label>
            <input
              placeholder="Enter product name"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Tag size={16} className="inline mr-1" />
              Category Name
            </label>
            <input
              placeholder="Enter category name"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={form.categoryName}
              onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Layers size={16} className="inline mr-1" />
              Category ID
            </label>
            <input
              type="number"
              placeholder="Enter category ID"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <DollarSign size={16} className="inline mr-1" />
              Price (₹)
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Package size={16} className="inline mr-1" />
              Stock Quantity
            </label>
            <input
              type="number"
              placeholder="Enter stock quantity"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={form.stockQuantity}
              onChange={(e) => setForm({ ...form, stockQuantity: Number(e.target.value) })}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Tag size={16} className="inline mr-1" />
              Discount (%)
            </label>
            <input
              type="number"
              placeholder="Enter discount percentage"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={form.discountPercent}
              onChange={(e) => setForm({ ...form, discountPercent: Number(e.target.value) })}
            />
          </div>

          <div className="relative lg:col-span-3">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Image size={16} className="inline mr-1" />
              Image URL
            </label>
            <input
              placeholder="Enter image URL"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />
          </div>

          <div className="relative lg:col-span-3">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Edit3 size={16} className="inline mr-1" />
              Description
            </label>
            <textarea
              placeholder="Enter product description"
              rows={3}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="lg:col-span-3 flex gap-4">
            <button 
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl py-3 px-8 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Plus size={20} />
              Add Product
            </button>
            <button
              type="button"
              onClick={() => setForm({
                name: "",
                description: "",
                price: 0,
                categoryId: 0,
                categoryName: "",
                stockQuantity: 0,
                discountPercent: 0,
                imageUrl: "",
              })}
              disabled={loading}
              className="bg-slate-200 text-slate-700 rounded-xl py-3 px-8 font-semibold hover:bg-slate-300 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60">
            
              <X size={20} />
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100">
        <DataTable
          title="Product Inventory"
          searchable={true}
          actions={
            <button
              onClick={loadProducts}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition-colors cursor-pointer disabled:opacity-60"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          }
          columns={[
            { 
              header: 'Product Name', 
              accessor: 'itemName',
              sortable: true
            },
            { 
              header: 'Category', 
              accessor: 'categoryName',
              sortable: true
            },
            { 
              header: 'Price', 
              accessor: (p) => (
                <span className="font-semibold text-green-600">₹{p.itemPrice?.toLocaleString() || 0}</span>
              ),
              sortable: true
            },
            { 
              header: 'Stock', 
              accessor: (p) => (
                <span className={`font-medium ${
                  p.stockQuantity < 10 
                    ? 'text-red-600' 
                    : p.stockQuantity < 50 
                    ? 'text-orange-600' 
                    : 'text-green-600'
                }`}>
                  {p.stockQuantity}
                  {p.stockQuantity < 10 && <AlertTriangle size={16} className="inline ml-1 text-red-500" />}
                </span>
              ),
              sortable: true
            },
            { 
              header: 'Discount', 
              accessor: (p) => (
                <span className="text-purple-600 font-medium">
                  {p.discountPercent || 0}%
                </span>
              ),
              sortable: true
            },
            { 
              header: 'Status', 
              accessor: (p) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                  p.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {p.isActive ? <CheckCircle size={12} /> : <X size={12} />}
                  {p.isActive ? 'Active' : 'Inactive'}
                </span>
              )
            },
            {
              header: 'Actions',
              accessor: (p) => (
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleActive(p)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      p.isActive
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                  >
                    {p.isActive ? <ToggleLeft size={14} /> : <ToggleRight size={14} />}
                    {p.isActive ? 'Disable' : 'Enable'}
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-all cursor-pointer">
                    <Edit3 size={14} />
                    Edit
                  </button>
                </div>
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

