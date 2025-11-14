import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const TeaCoffeeMorePage: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      itemName: 'Tata Tea Premium',
      itemPrice: '₹245',
      originalPrice: '₹285',
      discount: '₹40 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/165a.jpg?ts=1688978656',
      weight: '1 kg',
      rating: 4.6,
      reviews: '145.3k',
    },
    {
      id: 2,
      itemName: 'Nescafe Classic Coffee',
      itemPrice: '₹285',
      originalPrice: '₹340',
      discount: '₹55 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/127a.jpg?ts=1688463542',
      weight: '200 g',
      rating: 4.5,
      reviews: '98.7k',
    },
    {
      id: 3,
      itemName: 'Red Label Natural Care Tea',
      itemPrice: '₹195',
      originalPrice: '₹235',
      discount: '₹40 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10491a.jpg?ts=1688621679',
      weight: '1 kg',
      rating: 4.4,
      reviews: '68.2k',
    },
    {
      id: 4,
      itemName: 'Bru Instant Coffee',
      itemPrice: '₹145',
      originalPrice: '₹175',
      discount: '₹30 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40156a.jpg?ts=1690963785',
      weight: '100 g',
      rating: 4.5,
      reviews: '52.8k',
    },
    {
      id: 5,
      itemName: 'Society Tea Premium',
      itemPrice: '₹165',
      originalPrice: '₹195',
      discount: '₹30 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/483599a.jpg?ts=1687339771',
      weight: '500 g',
      rating: 4.3,
      reviews: '38.5k',
    },
    {
      id: 6,
      itemName: 'Lipton Green Tea',
      itemPrice: '₹185',
      originalPrice: '₹225',
      discount: '₹40 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/176950a.jpg?ts=1687948889',
      weight: '100 Tea Bags',
      rating: 4.4,
      reviews: '72.4k',
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
          <h1 className="text-lg font-bold text-gray-900">Tea, Coffee & More</h1>
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

export default TeaCoffeeMorePage;
