import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const DairyPage: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      itemName: 'Nandini Fresh Toned Fresh Milk (Pouch Blue)',
      itemPrice: '₹24',
      originalPrice: '₹30',
      discount: '₹6 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481850a.jpg?ts=1690813329',
      weight: '1 pack (500 ml)',
    },
    {
      id: 2,
      itemName: 'Nandini Thick Curd Pouch',
      itemPrice: '₹27',
      originalPrice: '₹30',
      discount: '₹3 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/172a.jpg?ts=1688629928',
      weight: '1 pack (500 g)',
    },
    {
      id: 3,
      itemName: 'Amul Taaza Toned Fresh Milk',
      itemPrice: '₹28',
      originalPrice: '₹32',
      discount: '₹4 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40156a.jpg?ts=1690963785',
      weight: '500 ml',
      rating: 4.5,
      reviews: '125.4k',
    },
    {
      id: 4,
      itemName: 'Amul Masti Curd',
      itemPrice: '₹30',
      originalPrice: '₹35',
      discount: '₹5 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10491a.jpg?ts=1688621679',
      weight: '400 g',
      rating: 4.6,
      reviews: '98.2k',
    },
    {
      id: 5,
      itemName: 'Britannia Bread - Whole Wheat',
      itemPrice: '₹40',
      originalPrice: '₹50',
      discount: '₹10 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/165a.jpg?ts=1688978656',
      weight: '400 g',
      rating: 4.4,
      reviews: '85.7k',
    },
    {
      id: 6,
      itemName: 'Amul Butter - Salted',
      itemPrice: '₹56',
      originalPrice: '₹60',
      discount: '₹4 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/127a.jpg?ts=1688463542',
      weight: '100 g',
      rating: 4.7,
      reviews: '156.3k',
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
          <h1 className="text-lg font-bold text-gray-900">Dairy, Bread & Eggs</h1>
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

export default DairyPage;
