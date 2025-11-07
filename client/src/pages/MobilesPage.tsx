import React from 'react';
import ProductGrid from '../components/ProductGrid';

const mobilesProducts = [
  {
    name: 'iPhone 15 Pro',
    price: '₹1,29,999',
    originalPrice: '₹1,39,999',
    discount: '₹10,000 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/placeholder.jpg',
    rating: 4.8,
    reviews: '1,234',
  },
  {
    name: 'Samsung Galaxy S24',
    price: '₹79,999',
    originalPrice: '₹89,999',
    discount: '₹10,000 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/placeholder.jpg',
    rating: 4.6,
    reviews: '987',
  },
];

const MobilesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Mobiles</h1>
          <p className="mt-2 text-gray-600">Latest smartphones and accessories</p>
        </div>
        
        <ProductGrid title="All Mobiles" products={mobilesProducts} />
      </div>
    </div>
  );
};

export default MobilesPage;
