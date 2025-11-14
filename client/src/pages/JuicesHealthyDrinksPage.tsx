import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const JuicesHealthyDrinksPage: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      itemName: 'Dabur Hommade Organic Coconut Milk',
      itemPrice: '₹74',
      originalPrice: '₹89',
      discount: '₹15 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/45698a.jpg?ts=1688463558',
      rating: 4.7,
      reviews: '9.9k',
      weight: '1 pc (200 ml)',
    },
    {
      id: 2,
      itemName: 'Real Fruit Power Orange Juice',
      itemPrice: '₹120',
      originalPrice: '₹145',
      discount: '₹25 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/45699a.jpg?ts=1688463558',
      rating: 4.5,
      reviews: '15.6k',
      weight: '1 L',
    },
    {
      id: 3,
      itemName: 'Tropicana Mixed Fruit Delight',
      itemPrice: '₹115',
      originalPrice: '₹138',
      discount: '₹23 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/45700a.jpg?ts=1688463558',
      rating: 4.6,
      reviews: '18.2k',
      weight: '1 L',
    },
    {
      id: 4,
      itemName: 'Paper Boat Aamras',
      itemPrice: '₹85',
      originalPrice: '₹105',
      discount: '₹20 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/45701a.jpg?ts=1688463558',
      rating: 4.7,
      reviews: '12.4k',
      weight: '250 ml',
    },
    {
      id: 5,
      itemName: 'Raw Pressery Cold Pressed Green Juice',
      itemPrice: '₹165',
      originalPrice: '₹195',
      discount: '₹30 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/45702a.jpg?ts=1688463558',
      rating: 4.8,
      reviews: '8.7k',
      weight: '250 ml',
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
          <h1 className="text-lg font-bold text-gray-900">Juices & Healthy Drinks</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Products grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {products.map((product, index) => (
            <ProductCard key={`${product.itemName}-${index}`} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JuicesHealthyDrinksPage;
