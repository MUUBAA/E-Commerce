import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/stores/index.js';
import { fetchAllProducts, type GetAllProductsPayload } from '../../redux/thunk/product.js';
import ProductCard from './ProductCard';
import type { Product } from '../../redux/slices/productsSlice.js';

interface ProductsListProps {
  categoryId?: number;
}

const ProductsList: React.FC<ProductsListProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<Product[]> ([]);
  const { loading, error } = useSelector((state: RootState) => state.products);
  const FetchProducts = async () => {
      try {
        const preparePayload : GetAllProductsPayload = {
          id: 0,
          categoryId: 1, 
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
            setProducts(response?.payload?.items || []); 
          } else {
            console.error('Unexpected response payload:', response.payload);
            setProducts([]); // Fallback to an empty array
          }
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    ;
  useEffect(() => {
    FetchProducts();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>Error loading products: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 p-8">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          itemName={product.itemName}
          itemPrice={`₹${product.itemPrice}`}
          itemUrl={product.itemUrl}
          weight={product.itemDescription}
        />
      ))}
    </div>
  );
};

export default ProductsList;
