import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/stores/index.tsx';
import { fetchAllProducts, type GetAllProductsPayload } from '../../redux/thunk/product.tsx';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryBanner from '../components/CategoryBanner';
import type { Product } from '../../redux/slices/productsSlice.tsx';

const ChipsCrispsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const { loading, error } = useSelector((state: RootState) => state.products);

  // Fetch chips & crisps products from API (categoryId=7)
  const FetchProducts = React.useCallback(async () => {
    try {
      const preparePayload: GetAllProductsPayload = {
        id: 0,
        categoryId: 7, // Chips & Crisps category
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
  }, [dispatch, FetchProducts]);

  // Transform API products for ProductCard
  const transformedProducts = products.map((product: Product) => ({
    id: product.id,
    itemName: product.itemName || 'Unknown Product',
    itemPrice: product.itemPrice ? `₹${product.itemPrice}` : '₹0',
    itemUrl: product.itemUrl || 'https://via.placeholder.com/150',
    itemDescription: product.itemDescription || 'No description available',
    originalPrice: product.itemPrice ? `₹${product.itemPrice + 20}` : undefined, // Example
    discount: product.itemPrice ? `₹20 OFF` : undefined,
    rating: 4.2, // Placeholder, replace with real if available
    reviews: '1k', // Placeholder, replace with real if available
    weight: '1 pack', // Placeholder, replace with real if available
  }));

  // Banners for Chips & Crisps
  const banners = [
    {
      imageUrl: 'https://res.cloudinary.com/dulie41id/image/upload/v1762581703/Lays_magicmasala_dpn6re.webp',
      title: 'Lays Classic',
      subtitle: 'UP TO 25% OFF',
      buttonText: 'Shop Now',
      backgroundColor: 'bg-yellow-100',
      isDark: false,
    },
    {
      imageUrl: 'https://res.cloudinary.com/dulie41id/image/upload/v1763609084/pringles_sour_cream_gvnnky.webp',
      title: 'Pringles Sour Cream',
      subtitle: 'LIMITED TIME DEALS',
      buttonText: 'Order now',
      backgroundColor: 'bg-green-700',
      isDark: true,
    },
    {
      imageUrl: 'https://res.cloudinary.com/dulie41id/image/upload/v1762581689/Kurkure_masalamunch_kqugyv.webp',
      title: 'Kurkure Masala Munch',
      subtitle: 'BUY 1 GET 1',
      buttonText: 'Grab Offer',
      backgroundColor: 'bg-orange-200',
      isDark: false,
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
          <h1 className="text-lg font-bold text-gray-900">Chips & Crisps</h1>
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

        {/* Products grid */}
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
  );
};

export default ChipsCrispsPage;
