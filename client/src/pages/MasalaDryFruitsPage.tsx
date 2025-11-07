import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const MasalaDryFruitsPage: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      name: 'Catch Jeera Whole',
      price: '₹43',
      originalPrice: '₹68',
      discount: '₹25 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10227a.jpg?ts=1688463558',
      weight: '100 g',
      rating: 4.7,
      reviews: '58.8k',
    },
    {
      name: 'Everest Turmeric Powder',
      price: '₹58',
      originalPrice: '₹85',
      discount: '₹27 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10228a.jpg?ts=1688463558',
      weight: '200 g',
      rating: 4.6,
      reviews: '45.2k',
    },
    {
      name: 'Everest Garam Masala',
      price: '₹68',
      originalPrice: '₹95',
      discount: '₹27 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10230a.jpg?ts=1688463558',
      weight: '100 g',
      rating: 4.8,
      reviews: '52.1k',
    },
    {
      name: 'California Almonds',
      price: '₹145',
      originalPrice: '₹210',
      discount: '₹65 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/71204a.jpg?ts=1687948531',
      weight: '200 g',
      rating: 4.6,
      reviews: '38.5k',
    },
    {
      name: 'Premium Cashews',
      price: '₹165',
      originalPrice: '₹230',
      discount: '₹65 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/71205a.jpg?ts=1687948531',
      weight: '200 g',
      rating: 4.7,
      reviews: '42.3k',
    },
    {
      name: 'Dried Black Raisins',
      price: '₹85',
      originalPrice: '₹125',
      discount: '₹40 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/71206a.jpg?ts=1687948531',
      weight: '200 g',
      rating: 4.5,
      reviews: '28.9k',
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

export default MasalaDryFruitsPage;
