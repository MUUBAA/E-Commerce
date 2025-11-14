import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const AttaRiceOilDalsPage: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      itemName: 'Aashirvaad Superior MP Whole Wheat Atta',
      itemPrice: '₹285',
      originalPrice: '₹320',
      discount: '₹35 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10491a.jpg?ts=1688621679',
      weight: '5 kg',
      rating: 4.7,
      reviews: '245.8k',
    },
    {
      id: 2,
      itemName: 'Fortune Sunflower Refined Oil',
      itemPrice: '₹235',
      originalPrice: '₹280',
      discount: '₹45 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40156a.jpg?ts=1690963785',
      weight: '2 L',
      rating: 4.5,
      reviews: '128.3k',
    },
    {
      id: 3,
      itemName: 'Tata Sampann Unpolished Toor Dal',
      itemPrice: '₹142',
      originalPrice: '₹210',
      discount: '₹68 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40771a.jpg?ts=1688978598',
      weight: '1 kg',
      rating: 4.7,
      reviews: '42.4k',
    },
    {
      id: 4,
      itemName: 'India Gate Basmati Rice Classic',
      itemPrice: '₹640',
      originalPrice: '₹750',
      discount: '₹110 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10791a.jpg?ts=1688978830',
      weight: '5 kg',
      rating: 4.6,
      reviews: '1.2k',
    },
    {
      id: 5,
      itemName: 'Tata Sampann Unpolished Moong Dal',
      itemPrice: '₹158',
      originalPrice: '₹235',
      discount: '₹77 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40772a.jpg?ts=1688978598',
      weight: '1 kg',
      rating: 4.6,
      reviews: '38.2k',
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
          <h1 className="text-lg font-bold text-gray-900">Atta, Rice, Oil & Dals</h1>
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

export default AttaRiceOilDalsPage;
