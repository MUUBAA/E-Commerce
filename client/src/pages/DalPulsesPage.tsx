import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const DalPulsesPage: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      name: 'Tata Sampann Unpolished Toor Dal-Arhar Dal',
      price: '₹142',
      originalPrice: '₹210',
      discount: '₹68 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40771a.jpg?ts=1688978598',
      rating: 4.7,
      reviews: '42.4k',
      weight: '1 pack (1 kg)',
    },
    {
      name: 'Tata Sampann Unpolished Moong Dal',
      price: '₹158',
      originalPrice: '₹235',
      discount: '₹77 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40772a.jpg?ts=1688978598',
      rating: 4.6,
      reviews: '38.2k',
      weight: '1 pack (1 kg)',
    },
    {
      name: 'Tata Sampann Unpolished Masoor Dal',
      price: '₹125',
      originalPrice: '₹185',
      discount: '₹60 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40773a.jpg?ts=1688978598',
      rating: 4.5,
      reviews: '35.8k',
      weight: '1 pack (1 kg)',
    },
    {
      name: 'Tata Sampann Unpolished Chana Dal',
      price: '₹138',
      originalPrice: '₹205',
      discount: '₹67 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40774a.jpg?ts=1688978598',
      rating: 4.6,
      reviews: '30.5k',
      weight: '1 pack (1 kg)',
    },
    {
      name: 'Tata Sampann Unpolished Urad Dal',
      price: '₹165',
      originalPrice: '₹245',
      discount: '₹80 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40775a.jpg?ts=1688978598',
      rating: 4.7,
      reviews: '28.9k',
      weight: '1 pack (1 kg)',
    },
    {
      name: 'India Gate Kabuli Chana',
      price: '₹95',
      originalPrice: '₹140',
      discount: '₹45 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/40776a.jpg?ts=1688978598',
      rating: 4.4,
      reviews: '25.3k',
      weight: '1 pack (500 g)',
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
          <h1 className="text-lg font-bold text-gray-900">Dal & Pulses</h1>
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

export default DalPulsesPage;
