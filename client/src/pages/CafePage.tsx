import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/stores/index.tsx';
import { fetchAllProducts, type GetAllProductsPayload } from '../../redux/thunk/product.tsx';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import type { Product } from '../../redux/slices/productsSlice.tsx';

const CafePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const { loading, error } = useSelector((state: RootState) => state.products);

  // Fetch cafe products from API (categoryId=4)
  const FetchProducts = async () => {
    try {
      const preparePayload: GetAllProductsPayload = {
        id: 0,
        categoryId: 4, // Cafe category
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
  };

  useEffect(() => {
    FetchProducts();
  }, [dispatch]);

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

  // Cafe banner data
  const cafeBanner = {
    title: 'Nest café',
    subtitle: 'FOOD FROM ₹99',
    description: 'SELLING FAST!!',
    buttonText: 'EXPLORE →',
    imageUrl: 'https://i.ibb.co/9TRc4Tq/cafe.png'
  };

  // What's On Your Mind categories (static)
  // const mindCategories = [
  //   { name: 'Breakfast', imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/breakfast.jpg?ts=1709800030' },
  //   { name: 'Meals', imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/meals.jpg?ts=1709800030' },
  //   { name: 'Chai', imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/chai.jpg?ts=1709800030' },
  //   { name: 'Coffee', imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/coffee.jpg?ts=1709800030' },
  //   { name: 'Desserts', imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/desserts.jpg?ts=1709800030' },
  // ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Nest Café</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Cafe Banner */}
        <div className="mb-6">
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-yellow-100 to-orange-100 p-6 shadow-sm">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">{cafeBanner.title}</h2>
              <div className="mt-2 inline-block rounded bg-red-600 px-3 py-1 text-white">
                <span className="text-lg font-bold">{cafeBanner.subtitle}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-700">{cafeBanner.description}</p>
              <button className="mt-4 cursor-pointer rounded-full bg-gray-800 px-6 py-3 font-bold text-white transition-transform hover:scale-105">
                {cafeBanner.buttonText}
              </button>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="https://res.cloudinary.com/dulie41id/image/upload/v1762751208/blackPepper_maggi_elhkos.webp"
                alt="Food"
                className="h-20 w-20 rounded-full object-cover md:h-24 md:w-24"
              />
              <img
                src="https://res.cloudinary.com/dulie41id/image/upload/v1762751233/spanish_coffee_vyp6xv.webp"
                alt="Coffee"
                className="h-16 w-16 rounded-full object-cover md:h-20 md:w-20"
              />
            </div>
          </div>
        </div>

        {/* What's On Your Mind Section (static) */}
        {/* <div className="mb-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">What's On Your Mind?</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {mindCategories.map((category) => (
              <div key={category.name} className="flex-shrink-0 text-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-700">{category.name}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Cafe Product Grid (dynamic, like other categories) */}
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
            No cafe products available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default CafePage;