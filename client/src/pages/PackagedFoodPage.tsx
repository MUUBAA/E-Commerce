import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const PackagedFoodPage: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      name: 'Lays Classic Salted Chips',
      price: '₹35',
      originalPrice: '₹55',
      discount: '₹20 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/186a.jpg?ts=1688463558',
      weight: '90 g',
      rating: 4.6,
      reviews: '85.2k',
    },
    {
      name: 'Kurkure Masala Munch',
      price: '₹32',
      originalPrice: '₹50',
      discount: '₹18 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/188a.jpg?ts=1688463558',
      weight: '85 g',
      rating: 4.7,
      reviews: '78.4k',
    },
    {
      name: 'Haldirams Aloo Bhujia',
      price: '₹45',
      originalPrice: '₹65',
      discount: '₹20 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/189a.jpg?ts=1688463558',
      weight: '200 g',
      rating: 4.8,
      reviews: '92.1k',
    },
    {
      name: 'MTR Ready to Eat - Dal Makhani',
      price: '₹72',
      originalPrice: '₹95',
      discount: '₹23 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/483599a.jpg?ts=1687339771',
      weight: '300 g',
      rating: 4.4,
      reviews: '35.8k',
    },
    {
      name: 'Britannia Good Day Cookies',
      price: '₹45',
      originalPrice: '₹60',
      discount: '₹15 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/165a.jpg?ts=1688978656',
      weight: '200 g',
      rating: 4.5,
      reviews: '125.3k',
    },
    {
      name: 'Parle-G Gold Biscuits',
      price: '₹28',
      originalPrice: '₹40',
      discount: '₹12 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/176950a.jpg?ts=1687948889',
      weight: '200 g',
      rating: 4.6,
      reviews: '158.9k',
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
          <h1 className="text-lg font-bold text-gray-900">Packaged Food</h1>
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

export default PackagedFoodPage;
