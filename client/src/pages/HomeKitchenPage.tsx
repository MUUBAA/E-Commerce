import React from 'react';
import ProductGrid from '../components/ProductGrid';

const homeProducts = [
  {
    id: 1,
    itemName: 'Kitchen Utensil Set',
    itemPrice: '₹799',
    originalPrice: '₹1,299',
    discount: '₹500 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/placeholder.jpg',
    rating: 4.4,
    reviews: '345',
  },
  {
    id: 2,
    itemName: 'Bed Sheet Set',
    itemPrice: '₹999',
    originalPrice: '₹1,799',
    discount: '₹800 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/placeholder.jpg',
    rating: 4.5,
    reviews: '456',
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Home & Kitchen</h1>
          <p className="mt-2 text-gray-600">Everything for your home and kitchen needs</p>
        </div>
        
        <ProductGrid title="All Home Products" products={homeProducts} />
      </div>
    </div>
  );
};

export default HomePage;
