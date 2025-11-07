import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const CafeBestsellersPage: React.FC = () => {
  const navigate = useNavigate();

  const products = [
    {
      name: 'Veg Puff',
      price: '₹70',
      originalPrice: '₹79',
      discount: '₹9 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/veg_puff.jpg?ts=1709800030',
      weight: '1 Piece',
      rating: 4.4,
      reviews: '72.4k'
    },
    {
      name: 'Adrak Chai',
      price: '₹129',
      originalPrice: '₹149',
      discount: '₹20 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/adrak_chai.jpg?ts=1709800030',
      weight: '250 ml',
      rating: 4.2,
      reviews: '22.5k'
    },
    {
      name: 'Iced Americano',
      price: '₹129',
      originalPrice: '₹149',
      discount: '₹20 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/iced_americano.jpg?ts=1709800030',
      weight: '450 ml',
      rating: 4.2,
      reviews: '10.0k'
    },
    {
      name: 'Spanish Coffee',
      price: '₹169',
      originalPrice: '₹189',
      discount: '₹20 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/spanish_coffee.jpg?ts=1709800030',
      weight: '350 ml',
      rating: 4.2,
      reviews: '11.7k'
    },
    {
      name: 'Poha',
      price: '₹115',
      originalPrice: '₹129',
      discount: '₹14 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/poha.jpg?ts=1709800030',
      weight: 'Serves 1',
      rating: 4.2,
      reviews: '20.2k'
    },
    {
      name: 'Vietnamese Cold Coffee',
      price: '₹189',
      originalPrice: '₹209',
      discount: '₹20 OFF',
      imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/vietnamese_coffee.jpg?ts=1709800030',
      weight: '450 ml',
      rating: 4.4,
      reviews: '117.5k'
    }
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
          <h1 className="text-lg font-bold text-gray-900">Cafe Bestsellers</h1>
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

export default CafeBestsellersPage;
