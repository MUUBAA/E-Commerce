import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAdminProductById, updateAdminProduct } from '../redux/thunk/adminProduct';
import type { AdminDispatch, AdminRootState } from '../redux/store';
import { toast, ToastContainer } from 'react-toastify';

const EditProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch<AdminDispatch>(); // Use admin store dispatch type
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    itemPrice: 0,
    categoryId: 0,
    stockQuantity: 0,
  });

  const product = useSelector((state: AdminRootState) => state.adminProducts?.product || null);

  useEffect(() => {
    if (productId) {
      dispatch(fetchAdminProductById(Number(productId)));
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (product) {
      setFormData({
        itemName: product.itemName || '',
        itemDescription: product.itemDescription || '',
        itemPrice: product.itemPrice || 0,
        categoryId: product.categoryId || 0,
        stockQuantity: product.stockQuantity || 0,
      });
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'itemPrice' || name === 'stockQuantity' || name === 'categoryId' ? Number(value) : value,
    });
  };

  const handleUpdate = async () => {
    try {
      // Dispatch admin update thunk (admin endpoints require auth handled by thunk)
      await dispatch(updateAdminProduct({
        id: Number(productId),
        name: formData.itemName,
        description: formData.itemDescription,
        price: formData.itemPrice,
        categoryId: formData.categoryId,
        categoryName: '',
        stockQuantity: formData.stockQuantity,
        discountPercent: 0,
        imageUrl: '',
        isActive: true,
      })).unwrap();
      toast.success('Product updated successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Failed to update product:', error);
      toast.error('Failed to update product.');
    }
  };

  if (!product) {
    return <div>Loading product details...</div>; // Display a loading message or fallback UI
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <ToastContainer />
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b">
          <h1 className="text-2xl font-semibold text-slate-800">Edit Product</h1>
          <p className="text-sm text-slate-500 mt-1">Modify product details and click Update.</p>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:gap-8">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <div className="w-full h-48 bg-slate-50 rounded-lg flex items-center justify-center border">
                {product?.imageUrl || (product as any)?.itemUrl ? (
                  <img
                    src={product.imageUrl || (product as any).itemUrl}
                    alt={product.itemName}
                    className="object-contain max-h-44"
                  />
                ) : (
                  <div className="text-sm text-slate-400">No image available</div>
                )}
              </div>
            </div>

            <div className="md:flex-1">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Item Name</label>
                    <input
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Item Price</label>
                    <input
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="number"
                      name="itemPrice"
                      value={formData.itemPrice}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Item Description</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-md min-h-[100px] resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="itemDescription"
                    value={formData.itemDescription}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category ID</label>
                    <input
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="number"
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Stock Quantity</label>
                    <input
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="number"
                      name="stockQuantity"
                      value={formData.stockQuantity}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleUpdate}
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md shadow"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;