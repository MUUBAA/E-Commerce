import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const SpicesSeasoningsPage: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      itemName: 'Catch Jeera Whole',
      itemPrice: '₹43',
      originalPrice: '₹68',
      discount: '₹25 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10227a.jpg?ts=1688463558',
      rating: 4.7,
      reviews: '58.8k',
      weight: '1 pack (100 g)',
    },
    {
      id: 2,
      itemName: 'Daily Good Mustard / Rai / Sarso Small',
      itemPrice: '₹18',
      originalPrice: '₹85',
      discount: '₹27 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10228a.jpg?ts=1688463558',
      rating: 4.6,
      reviews: '45.2k',
      weight: '1 pack (200 g)',
    },
    {
      id: 3,
      itemName: 'MDH Red Chilli Powder',
      itemPrice: '₹52',
      originalPrice: '₹78',
      discount: '₹26 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10229a.jpg?ts=1688463558',
      rating: 4.5,
      reviews: '38.9k',
      weight: '1 pack (100 g)',
    },
    {
      id: 4,
      itemName: 'Everest Garam Masala',
      itemPrice: '₹68',
      originalPrice: '₹95',
      discount: '₹27 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10230a.jpg?ts=1688463558',
      rating: 4.8,
      reviews: '52.1k',
      weight: '1 pack (100 g)',
    },
    {
      id: 5,
      itemName: 'Catch Coriander Powder',
      itemPrice: '₹48',
      originalPrice: '₹72',
      discount: '₹24 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10231a.jpg?ts=1688463558',
      rating: 4.6,
      reviews: '41.3k',
      weight: '1 pack (200 g)',
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
          <h1 className="text-lg font-bold text-gray-900">Spices & Seasonings</h1>
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

export default SpicesSeasoningsPage;
