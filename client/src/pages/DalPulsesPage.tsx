import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryBanner from '../components/CategoryBanner';
import { useDispatch, useSelector } from 'react-redux';
import type { Product } from '../../redux/slices/productsSlice';
import type { AppDispatch, RootState } from '../../redux/stores';
import { type GetAllProductsPayload, fetchAllProducts } from '../../redux/thunk/product';

const DalPulsesPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<Product[]>([]);
  const { loading, error } = useSelector((state: RootState) => state.products);

  const FetchProducts = React.useCallback(async () => {
    try {
      const preparePayload : GetAllProductsPayload = {
        id: 0,
        categoryId: 2, // Example categoryId for Dal & Pulses
        itemName: "",
        itemsPerPage: 20,
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        pageSize: 60
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
  }, [dispatch]);

  useEffect(() => {
    FetchProducts();
  }, [dispatch, FetchProducts]);

  // Transform API products to match ProductCard props
  const transformedProducts = products.map((product: Product) => ({
    id: product.id,
    itemName: product.itemName,
    itemPrice: `₹${product.itemPrice}`,
    originalPrice: product.itemPrice > 0 ? `₹${Math.round(product.itemPrice * 1.2)}` : undefined, // Example calculation
    discount: product.itemPrice > 0 ? `₹${Math.round(product.itemPrice * 0.2)} OFF` : undefined, // Example calculation
    itemUrl: product.itemUrl,
    rating: 4.5, // Default rating
    reviews: '100', // Default reviews
    weight: product.itemDescription || '100 g',
  }));

  // Banners for Dal & Pulses
  const banners = [
    {
      imageUrl: 'https://res.cloudinary.com/dulie41id/image/upload/v1762755766/green_moong_whole_nmiyse.webp',
      title: 'Moong Dal',
      subtitle: 'UP TO 20% OFF',
      buttonText: 'Shop Now',
      backgroundColor: 'bg-yellow-100',
      isDark: false,
    },
    {
      imageUrl: 'https://res.cloudinary.com/dulie41id/image/upload/v1762581905/Split_masoor_dhal_svo39p.webp',
      title: 'Masoor Dal',
      subtitle: 'FRESH STOCK',
      buttonText: 'Order now',
      backgroundColor: 'bg-orange-200',
      isDark: false,
    },
    {
      imageUrl: 'https://res.cloudinary.com/dulie41id/image/upload/v1762581514/Chana_brown_liungi.webp',
      title: 'Chana Dal',
      subtitle: 'BUY 1 GET 1',
      buttonText: 'Grab Offer',
      backgroundColor: 'bg-green-700',
      isDark: true,
    },
  ];
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Masala & Dry Fruits</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Banners */}
        <div className="mb-6">
          <div className="mb-4 grid gap-4 md:grid-cols-3">
            {banners.map((banner, index) => (
              <CategoryBanner key={index} {...banner} />
            ))}
          </div>
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
          <>
            {/* Products grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {transformedProducts.map((product, index) => (
                <ProductCard key={`${product.itemName}-${index}`} {...product} />
              ))}
            </div>
          </>
        )}

        {!loading && !error && transformedProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No masala & dry fruits products available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default DalPulsesPage;
