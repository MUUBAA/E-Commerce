import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const BreakfastSaucesPage: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      itemName: 'Kelloggs Corn Flakes Original',
      itemPrice: '₹185',
      originalPrice: '₹225',
      discount: '₹40 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/24986a.jpg?ts=1687948888',
      weight: '875 g',
      rating: 4.5,
      reviews: '68.4k',
    },
    {
      id: 2,
      itemName: 'Maggi 2-Minute Masala Noodles',
      itemPrice: '₹56',
      originalPrice: '₹72',
      discount: '₹16 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/127a.jpg?ts=1688463542',
      weight: '280 g (4 pcs)',
      rating: 4.6,
      reviews: '185.2k',
    },
    {
      id: 3,
      itemName: 'Kissan Fresh Tomato Ketchup',
      itemPrice: '₹89',
      originalPrice: '₹110',
      discount: '₹21 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/90000363a.jpg?ts=1687948889',
      weight: '950 g',
      rating: 4.5,
      reviews: '95.7k',
    },
    {
      id: 4,
      itemName: 'Nutella Hazelnut Spread',
      itemPrice: '₹285',
      originalPrice: '₹340',
      discount: '₹55 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/176950a.jpg?ts=1687948889',
      weight: '350 g',
      rating: 4.7,
      reviews: '72.3k',
    },
    {
      id: 5,
      itemName: 'Britannia Peanut Butter Smooth',
      itemPrice: '₹199',
      originalPrice: '₹145',
      discount: '₹20 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10491a.jpg?ts=1688621679',
      weight: '200 g',
      rating: 4.6,
      reviews: '58.9k',
    },
    {
      id: 6,
      itemName: 'Saffola Oats',
      itemPrice: '₹145',
      originalPrice: '₹175',
      discount: '₹30 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/483599a.jpg?ts=1687339771',
      weight: '1 kg',
      rating: 4.5,
      reviews: '48.2k',
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
          <h1 className="text-lg font-bold text-gray-900">Breakfast & Sauces</h1>
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

export default BreakfastSaucesPage;
