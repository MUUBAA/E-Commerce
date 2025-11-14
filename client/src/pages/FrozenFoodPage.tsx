import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const FrozenFoodPage: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      itemName: 'McCain French Fries',
      itemPrice: '₹125',
      originalPrice: '₹155',
      discount: '₹30 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/165a.jpg?ts=1688978656',
      weight: '420 g',
      rating: 4.5,
      reviews: '85.3k',
    },
    {
      id: 2,
      itemName: 'Sumeru Chicken Nuggets',
      itemPrice: '₹185',
      originalPrice: '₹225',
      discount: '₹40 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/127a.jpg?ts=1688463542',
      weight: '400 g',
      rating: 4.4,
      reviews: '52.7k',
    },
    {
      id: 3,
      itemName: 'iD Fresh Frozen Parathas',
      itemPrice: '₹95',
      originalPrice: '₹115',
      discount: '₹20 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10491a.jpg?ts=1688621679',
      weight: '400 g (5 pcs)',
      rating: 4.6,
      reviews: '98.2k',
    },
    {
      id: 4,
      itemName: 'McCain Veggie Fingers',
      itemPrice: '₹145',
      originalPrice: '₹175',
      discount: '₹30 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40156a.jpg?ts=1690963785',
      weight: '360 g',
      rating: 4.5,
      reviews: '68.5k',
    },
    {
      id: 5,
      itemName: 'Godrej Yummiez Chicken Seekh Kabab',
      itemPrice: '₹235',
      originalPrice: '₹285',
      discount: '₹50 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/483599a.jpg?ts=1687339771',
      weight: '250 g',
      rating: 4.4,
      reviews: '42.8k',
    },
    {
      id: 6,
      itemName: 'Sumeru Cheese Corn Balls',
      itemPrice: '₹165',
      originalPrice: '₹195',
      discount: '₹30 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/176950a.jpg?ts=1687948889',
      weight: '300 g',
      rating: 4.5,
      reviews: '58.9k',
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
          <h1 className="text-lg font-bold text-gray-900">Frozen Food</h1>
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

export default FrozenFoodPage;
