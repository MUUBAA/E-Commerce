import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const CafeSnacksPage: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      itemName: 'Bun Maska',
      itemPrice: '₹89',
      originalPrice: '₹99',
      discount: '₹10 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/bun_maska.jpg?ts=1709800030',
      weight: '1 Piece',
      rating: 4.4,
      reviews: '72.4k'
    },
    {
      id: 2,
      itemName: 'Veg Puff',
      itemPrice: '₹70',
      originalPrice: '₹79',
      discount: '₹9 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/veg_puff.jpg?ts=1709800030',
      weight: '1 Piece',
      rating: 4.4,
      reviews: '72.4k'
    },
    {
      id: 3,
      itemName: 'Chicken Puff',
      itemPrice: '₹80',
      originalPrice: '₹89',
      discount: '₹9 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/chicken_puff.jpg?ts=1709800030',
      weight: '1 Piece',
      rating: 4.3,
      reviews: '83.6k'
    },
    {
      id: 4,
      itemName: 'Cheese Maggi',
      itemPrice: '₹99',
      originalPrice: '₹109',
      discount: '₹10 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/cheese_maggi.jpg?ts=1709800030',
      weight: '1 Portion',
      rating: 4.3,
      reviews: '100.0k'
    },
    {
      id: 5,
      itemName: 'Plain Maggi',
      itemPrice: '₹79',
      originalPrice: '₹89',
      discount: '₹10 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/plain_maggi.jpg?ts=1709800030',
      weight: '1 Portion',
      rating: 4.3,
      reviews: '97.8k'
    },
    {
      id: 6,
      itemName: 'Bhelpuri',
      itemPrice: '₹119',
      originalPrice: '₹139',
      discount: '₹20 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/bhelpuri.jpg?ts=1709800030',
      weight: '1 Portion',
      rating: 4.3,
      reviews: '42.5k'
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
          <h1 className="text-lg font-bold text-gray-900">Cafe Snacks</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Products grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {products.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CafeSnacksPage;
