import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const IceCreamsMorePage: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      name: 'Amul Vanilla Ice Cream',
      price: '₹185',
      originalPrice: '₹220',
      discount: '₹35 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/127a.jpg?ts=1688463542',
      weight: '1 L',
      rating: 4.6,
      reviews: '78.5k',
    },
    {
      name: 'Kwality Walls Cornetto',
      price: '₹85',
      originalPrice: '₹105',
      discount: '₹20 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/165a.jpg?ts=1688978656',
      weight: '1 Cone',
      rating: 4.5,
      reviews: '95.2k',
    },
    {
      name: 'Mother Dairy Ice Cream - Kulfi',
      price: '₹165',
      originalPrice: '₹195',
      discount: '₹30 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10491a.jpg?ts=1688621679',
      weight: '700 ml',
      rating: 4.7,
      reviews: '52.8k',
    },
    {
      name: 'Baskin Robbins Family Pack',
      price: '₹485',
      originalPrice: '₹550',
      discount: '₹65 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40156a.jpg?ts=1690963785',
      weight: '1 L',
      rating: 4.8,
      reviews: '38.9k',
    },
    {
      name: 'Cadbury Dairy Milk Ice Cream',
      price: '₹295',
      originalPrice: '₹340',
      discount: '₹45 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/483599a.jpg?ts=1687339771',
      weight: '1 L',
      rating: 4.7,
      reviews: '68.3k',
    },
    {
      name: 'Amul Chocolate Fudge Bar',
      price: '₹45',
      originalPrice: '₹55',
      discount: '₹10 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/176950a.jpg?ts=1687948889',
      weight: '1 Bar (65 ml)',
      rating: 4.5,
      reviews: '125.7k',
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
          <h1 className="text-lg font-bold text-gray-900">Ice Creams & More</h1>
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

export default IceCreamsMorePage;
