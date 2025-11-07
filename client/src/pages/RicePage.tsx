import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryBanner from '../components/CategoryBanner';

const RicePage: React.FC = () => {
  const navigate = useNavigate();

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

  const products = [
    {
      name: 'Shree Akshara Premium Steam Sona Masoori Rice',
      price: '₹474',
      originalPrice: '₹750',
      discount: '₹276 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/b5ac6b32-7e46-4b15-9fa7-16dd8334b59e.jpg?ts=1709800030',
      rating: 4.8,
      reviews: '995',
      weight: '1 pack (10 kg)',
    },
    {
      name: 'India Gate Gold Standard Classic Basmati Rice | 2 Year...',
      price: '₹1069',
      originalPrice: '₹1255',
      discount: '₹186 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/c2f5e39b-f9c7-4af2-bd66-85e8f8e86ccf.jpg?ts=1709800030',
      rating: 4.7,
      reviews: '607',
      weight: '1 pack (5 kg)',
    },
    {
      name: 'India Gate Basmati Rice Classic',
      price: '₹640',
      originalPrice: '₹750',
      discount: '₹110 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10791a.jpg?ts=1688978830',
      rating: 4.6,
      reviews: '1.2k',
      weight: '1 pack (5 kg)',
    },
    {
      name: 'Daawat Rozana Gold Basmati Rice',
      price: '₹558',
      originalPrice: '₹650',
      discount: '₹92 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10792a.jpg?ts=1688978830',
      rating: 4.5,
      reviews: '890',
      weight: '1 pack (5 kg)',
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

        {/* Products grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {products.map((product, index) => (
            <ProductCard key={`${product.name}-${index}`} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RicePage;
