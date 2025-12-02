import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/stores/index.tsx';
import { fetchAllProducts, type GetAllProductsPayload } from '../../redux/thunk/product.tsx';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryBanner from './CategoryBanner';
import type { Product } from '../../redux/slices/productsSlice.tsx';

const SpicesSeasoningsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const { loading, error } = useSelector((state: RootState) => state.products);

  // 👇 ref to products section
  const productsRef = useRef<HTMLDivElement | null>(null);

  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Fetch spices & seasonings products from API (categoryId=5)
  const FetchProducts = React.useCallback(async () => {
    try {
      const preparePayload: GetAllProductsPayload = {
        id: 0,
        categoryId: 5, // Spices & Seasonings category
        itemName: '',
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
          setProducts(response?.payload?.items || []);
        } else {
          setProducts([]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    }
  }, [dispatch]);

  useEffect(() => {
    FetchProducts();
  }, [FetchProducts]);

  // Transform API products for ProductCard
  const transformedProducts = products.map((product: Product) => ({
    id: product.id,
    itemName: product.itemName || 'Unknown Product',
    itemPrice: product.itemPrice ? `₹${product.itemPrice}` : '₹0',
    itemUrl: product.itemUrl || 'https://via.placeholder.com/150',
    itemDescription: product.itemDescription || 'No description available',
    originalPrice: product.itemPrice ? `₹${product.itemPrice + 20}` : undefined, // Example
    discount: product.itemPrice ? `₹20 OFF` : undefined,
    rating: 4.2, // Placeholder
    reviews: '1k', // Placeholder
    weight: '1 pack', // Placeholder
  }));

  // Banners for Spices & Seasonings
  const banners = [
    {
      imageUrl: 'https://res.cloudinary.com/dulie41id/image/upload/v1762581523/Chilli_powder_swzjsk.webp',
      title: 'Everest Chilli Powder',
      subtitle: 'UP TO 18% OFF',
      buttonText: 'Shop Now',
      backgroundColor: 'bg-red-100',
      isDark: false,
    },
    {
      imageUrl: 'https://res.cloudinary.com/dulie41id/image/upload/v1764150534/orika_masalas_q7mtxv.webp',
      title: 'ORIKA Masalas',
      subtitle: 'SPICE UP YOUR MEALS',
      buttonText: 'Order below',
      backgroundColor: 'bg-yellow-100',
      isDark: false,
    },
    {
      imageUrl: 'https://res.cloudinary.com/dulie41id/image/upload/v1762581675/jeera_whole_ashirvad_qv36hp.webp',
      title: 'Catch Jeera Powder',
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
          <h1 className="text-lg font-bold text-gray-900">Spices & Seasonings</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Banners */}
        <div className="mb-6">
          <div className="mb-4 grid gap-4 md:grid-cols-3">
            {banners.map((banner, index) => (
              <CategoryBanner
                key={index}
                {...banner}
                onClick={scrollToProducts}   // 👈 hook buttons to scroll action
              />
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div ref={productsRef}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {transformedProducts.map((product, index) => (
              <ProductCard key={`${product.itemName}-${index}`} {...product} />
            ))}
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

          {!loading && !error && transformedProducts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No products available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpicesSeasoningsPage;
