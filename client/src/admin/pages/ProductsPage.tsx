import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AdminRootState, AdminDispatch } from '../redux/store';
import {
  fetchAdminProducts,
  createAdminProduct,
  updateAdminProduct,
} from '../redux/thunk/adminProduct';
import { fetchAdminProductById } from '../redux/thunk/adminProduct';
import adminApi from '../services/api';
import DataTable from '../components/DataTable';

import {
  Package,
  Plus,
  Edit3,
  ToggleLeft,
  ToggleRight,
  // Image,
  // DollarSign,
  // Tag,
  // Layers,
  AlertTriangle,
  CheckCircle,
  X,
  RefreshCw,
} from 'lucide-react';

/* ---------------- TYPES ---------------- */

interface AdminProduct {
  id: number;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  categoryId: number;
  categoryName: string;
  stockQuantity: number;
  discountPercent: number;
  imageUrl: string;
  isActive: boolean;
}

/* ---------------- COMPONENT ---------------- */

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AdminDispatch>();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector(
    (state: AdminRootState) => state.adminProducts
  );

  const [togglingIds, setTogglingIds] = useState<number[]>([]);

  const [productData, setProductData] = useState({
    id: 0,
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
    categoryName: '',
    stockQuantity: 0,
    discountPercent: 0,
    imageUrl: '',
    isActive: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------------- EFFECTS ---------------- */

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const refreshProducts = useCallback(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  /* ---------------- HANDLERS ---------------- */

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
    // no preview handling
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(createAdminProduct(productData)).unwrap();
      refreshProducts();
      setProductData({ ...productData, id: 0, name: '', description: '', price: 0, categoryId: 0, categoryName: '', stockQuantity: 0, discountPercent: 0, imageUrl: '', isActive: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await dispatch(updateAdminProduct(productData)).unwrap();
      refreshProducts();
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleActive = async (product: AdminProduct) => {
    setTogglingIds((s) => [...s, product.id]);
    try {
      await adminApi.patch(`/admin/products/${product.id}/status`, {
        isActive: !product.isActive,
      });
      refreshProducts();
    } catch (err) {
      console.error('Failed to toggle product status', err);
    } finally {
      setTogglingIds((s) => s.filter((i) => i !== product.id));
    }
  };

  const editProduct = async (id: number) => {
    await dispatch(fetchAdminProductById(id)).unwrap();
    navigate(`/admin/edit-product/${id}`);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Package /> Product Management
            </h1>
            <p className="text-purple-100">Manage your product catalog</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-purple-100">Total Products</p>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
        </div>
      </div>

      {/* ================= ADD PRODUCT FORM ================= */}
      <div className="bg-white rounded-3xl shadow-xl border p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Plus className="text-green-500" /> Add
        </h3>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={productData.id ? handleUpdate : handleCreate}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
              <input
                name="name"
                placeholder="Product Name"
                onChange={handleInputChange}
                value={productData.name}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category Name</label>
              <input
                name="categoryName"
                placeholder="Category Name"
                onChange={handleInputChange}
                value={productData.categoryName}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category ID</label>
              <input
                name="categoryId"
                type="number"
                placeholder="Category ID"
                onChange={handleInputChange}
                value={productData.categoryId}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
              <input
                name="price"
                type="number"
                placeholder="Price"
                onChange={handleInputChange}
                value={productData.price}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
              <input
                name="stockQuantity"
                type="number"
                placeholder="Stock"
                onChange={handleInputChange}
                value={productData.stockQuantity}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Discount %</label>
              <input
                name="discountPercent"
                type="number"
                placeholder="Discount %"
                onChange={handleInputChange}
                value={productData.discountPercent}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                name="description"
                placeholder="Description"
                className="w-full px-3 py-2 border rounded-md min-h-[80px] resize-vertical focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleInputChange}
                value={productData.description}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
              <input
                name="imageUrl"
                placeholder="Image URL"
                onChange={handleInputChange}
                value={productData.imageUrl}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white font-medium ${isSubmitting ? 'bg-indigo-500 opacity-80 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isSubmitting ? (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                ) : (
                  <Plus />
                )}
                <span>{productData.id ? 'Update' : 'Create'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ================= PRODUCTS TABLE ================= */}
      <div className="bg-white rounded-3xl shadow-xl border p-6">
        <DataTable
          title="Product Inventory"
          data={products}
          searchable
          actions={
            <button
              onClick={refreshProducts}
              className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-xl cursor-pointer"
            >
              <RefreshCw className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
          }
          columns={[
            { header: 'Name', accessor: 'itemName' },
            { header: 'Category', accessor: 'categoryName' },
            {
              header: 'Price',
              accessor: (p: AdminProduct) => `₹${p.itemPrice}`,
            },
            {
              header: 'Stock',
              accessor: (p: AdminProduct) => (
                <span className={p.stockQuantity < 10 ? 'text-red-600' : 'text-green-600'}>
                  {p.stockQuantity}
                  {p.stockQuantity < 10 && <AlertTriangle size={14} />}
                </span>
              ),
            },
            {
              header: 'Status',
              accessor: (p: AdminProduct) => (
                <span className={p.isActive ? 'text-green-600' : 'text-red-600'}>
                  {p.isActive ? <CheckCircle size={14} /> : <X size={14} />}
                </span>
              ),
            },
            {
              header: 'Actions',
              accessor: (p: AdminProduct) => {
                const isToggling = togglingIds.includes(p.id);
                return (
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => toggleActive(p)}
                      disabled={isToggling}
                      title={p.isActive ? 'Deactivate product' : 'Activate product'}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition ${p.isActive ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'} cursor-pointer`}
                      aria-pressed={p.isActive}
                    >
                      {isToggling ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        p.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />
                      )}
                      <span className="hidden md:inline">{p.isActive ? 'Active' : 'Inactive'}</span>
                    </button>

                    <button
                      onClick={() => editProduct(p.id)}
                      title="Edit product"
                      className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 text-sm cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span className="hidden md:inline">Edit</span>
                    </button>
                  </div>
                );
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
