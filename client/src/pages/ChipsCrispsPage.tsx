import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ChipsCrispsPage: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      name: 'Uncle Chips Spicy Treat',
      price: '₹30',
      originalPrice: '₹50',
      discount: '₹20 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/185a.jpg?ts=1688463558',
      rating: 4.7,
      reviews: '73.6k',
      weight: '1 pack (80 g)',
    },
    {
      name: 'Lays Classic Salted',
      price: '₹35',
      originalPrice: '₹55',
      discount: '₹20 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/186a.jpg?ts=1688463558',
      rating: 4.6,
      reviews: '85.2k',
      weight: '1 pack (90 g)',
    },
    {
      name: 'Bingo Mad Angles',
      price: '₹28',
      originalPrice: '₹45',
      discount: '₹17 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/187a.jpg?ts=1688463558',
      rating: 4.5,
      reviews: '62.8k',
      weight: '1 pack (75 g)',
    },
    {
      name: 'Kurkure Masala Munch',
      price: '₹32',
      originalPrice: '₹50',
      discount: '₹18 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/188a.jpg?ts=1688463558',
      rating: 4.7,
      reviews: '78.4k',
      weight: '1 pack (85 g)',
    },
    {
      name: 'Haldirams Aloo Bhujia',
      price: '₹45',
      originalPrice: '₹65',
      discount: '₹20 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/189a.jpg?ts=1688463558',
      rating: 4.8,
      reviews: '92.1k',
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
          <h1 className="text-lg font-bold text-gray-900">Chips & Crisps</h1>
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

export default ChipsCrispsPage;
