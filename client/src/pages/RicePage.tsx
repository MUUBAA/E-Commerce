import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import type { AppDispatch, RootState } from '../../redux/stores/index.js';
import { fetchAllProducts, type GetAllProductsPayload } from '../../redux/thunk/product.js';
import ProductCard from '../components/ProductCard';
import CategoryBanner from '../components/CategoryBanner';
import type {Product} from '../../redux/slices/productsSlice';

const RicePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<Product[]>([]);
  const { loading, error } = useSelector((state: RootState) => state.products);

  const FetchProducts = async () => {
      try {
        const preparePayload : GetAllProductsPayload = {
          id: 0,
          categoryId: 3, // Example categoryId for Fruits & Vegetables
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
            console.log('Fetched products:', response.payload);
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
    weight: product.itemDescription || '1 kg',
  }));

  const banners = [
    {
      imageUrl: 'https://i.ibb.co/bJC2wT9/vegetables.png',
      title: 'Fresh Seasonal Drops',
      subtitle: 'UP TO 30% OFF',
      buttonText: 'Explore',
      backgroundColor: 'bg-orange-100',
      isDark: false,
    },
    {
      imageUrl: 'https://i.ibb.co/2j2BqjB/masala.png',
      title: 'TULSI VIVAH SPECIALS',
      subtitle: 'BEST DEALS',
      buttonText: 'Order now',
      backgroundColor: 'bg-green-700',
      isDark: true,
    },
    {
      imageUrl: 'https://i.ibb.co/B2k0L1P/icecream.png',
      title: "Season's Freshest APPLES",
      subtitle: 'UP TO 30% OFF',
      buttonText: 'Explore now',
      backgroundColor: 'bg-blue-500',
      isDark: false,
    }
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
          <h1 className="text-lg font-bold text-gray-900">Rice</h1>
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
            No rice products available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default RicePage;
