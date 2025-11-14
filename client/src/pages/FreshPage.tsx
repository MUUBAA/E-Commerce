import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/stores/index.js';
import { fetchAllProducts, type GetAllProductsPayload } from '../../redux/thunk/product.js';
import ProductGrid from '../components/ProductGrid';
import type {Product} from '../../redux/slices/productsSlice';

const FreshPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<Product[]> ([]);
  const { loading, error } = useSelector((state: RootState) => state.products);
  
  const FetchProducts = async () => {
    try {
      const preparePayload : GetAllProductsPayload = {
        id: 0,
        categoryId: 1, // Example categoryId for Fruits & Vegetables
        itemName: "",
        itemsPerPage: 20,
        totalItems: 0,
        totalPages: 0,
        currentPage: 0
      };
      const response = await dispatch(fetchAllProducts(preparePayload));
      if (response.meta.requestStatus === 'fulfilled') {
        if (Array.isArray(response.payload)) {
          setProducts(response.payload);
        } else if (response.payload && typeof response.payload === 'object') {
          setProducts(response?.payload?.items || []); // Convert single product to array
        } else {
          console.error('Unexpected response payload:', response.payload);
          setProducts([]); // Fallback to an empty array
        }
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }; 
  
  useEffect(() => {
    FetchProducts();
  }, [dispatch]);

  // Transform API products to match ProductGrid props
  const transformedProducts = products.map((product: Product) => ({
    id: product.id,
    itemName: product.itemName || 'Unknown Product',
    itemPrice: product.itemPrice ? `₹${product.itemPrice}` : '₹0',
    itemUrl: product.itemUrl || 'https://via.placeholder.com/150', // Placeholder image for missing URLs
    itemDescription: product.itemDescription || 'No description available',
  }));


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Fresh Produce</h1>
          <p className="mt-2 text-gray-600">Fresh fruits, vegetables, and organic products</p>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {!loading && !error && transformedProducts.length > 0 && (
          <ProductGrid title="Fruits & Vegetables" products={transformedProducts} />
        )}

        {!loading && !error && transformedProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No products available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default FreshPage;
