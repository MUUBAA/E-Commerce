import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/stores/index.js';
import { fetchAllProducts, type GetAllProductsPayload } from '../../redux/thunk/product.js';
import ProductCard from '../components/ProductCard';
import CategoryBanner from '../components/CategoryBanner';
import type {Product} from '../../redux/slices/productsSlice';

const FreshPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<Product[]> ([]);
  const { loading, error } = useSelector((state: RootState) => state.products);
  
  // ref to products section
  const productsRef = useRef<HTMLDivElement | null>(null);

  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const FetchProducts = React.useCallback(async () => {
    try {
      const preparePayload : GetAllProductsPayload = {
        id: 0,
        categoryId: 1, // Example categoryId for Fruits & Vegetables
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

  // Transform API products to match ProductGrid props
  const transformedProducts = products.map((product: Product) => ({
    id: product.id,
    itemName: product.itemName || 'Unknown Product',
    itemPrice: product.itemPrice ? `₹${product.itemPrice}` : '₹0',
    itemUrl: product.itemUrl || 'https://via.placeholder.com/150', // Placeholder image for missing URLs
    itemDescription: product.itemDescription || 'No description available',
    originalPrice: product.itemPrice ? `₹${product.itemPrice + 20}` : undefined, // Example
    discount: product.itemPrice ? `₹20 OFF` : undefined,
    rating: 4.2, // Placeholder, replace with real if available
    reviews: '1k', // Placeholder, replace with real if available
    weight: '1 unit', // Placeholder, replace with real if available
  }));

  // Banners for Fresh Produce
  const banners = [
    {
      imageUrl: 'https://res.cloudinary.com/dulie41id/image/upload/v1762581493/Apple_royal_gala_o3450p.webp',
      title: 'Fresh Apples',
      subtitle: 'UP TO 15% OFF',
      buttonText: 'Shop Now',
      backgroundColor: 'bg-green-100',
      isDark: false,
    },
    {
      imageUrl: 'https://res.cloudinary.com/dulie41id/image/upload/v1762581776/Organic_tomato_country_khdaja.webp',
      title: 'Organic Tomatoes',
      subtitle: 'FARM FRESH',
      buttonText: 'Order now',
      backgroundColor: 'bg-red-100',
      isDark: false,
    },
    {
      imageUrl: 'https://res.cloudinary.com/dulie41id/image/upload/v1762581703/Lecutte_green_hlijsp.webp',
      title: 'Green Leafy Veggies',
      subtitle: 'BUY 1 GET 1',
      buttonText: 'Grab Offer',
      backgroundColor: 'bg-green-700',
      isDark: true,
    },
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        {/* Banners */}
        <div className="mb-6">
          <div className="mb-4 grid gap-4 md:grid-cols-3">
            {banners.map((banner, index) => (
              <CategoryBanner key={index} {...banner} onClick={scrollToProducts} />
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
          <div ref={productsRef}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {transformedProducts.map((product, index) => (
                <ProductCard key={`${product.itemName}-${index}`} {...product} />
              ))}
            </div>
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

export default FreshPage;
