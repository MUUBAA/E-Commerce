import React from 'react';
import ProductGrid from '../components/ProductGrid';

const electronicsProducts = [
  {
    name: 'Wireless Headphones',
    price: '₹1,999',
    originalPrice: '₹3,499',
    discount: '₹1,500 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/placeholder.jpg',
    rating: 4.3,
    reviews: '567',
  },
  {
    name: 'Smart Watch',
    price: '₹2,499',
    originalPrice: '₹4,999',
    discount: '₹2,500 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/placeholder.jpg',
    rating: 4.5,
    reviews: '892',
  },
];

const ElectronicsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Electronics</h1>
          <p className="mt-2 text-gray-600">Latest gadgets and electronic devices</p>
        </div>
        
        <ProductGrid title="All Electronics" products={electronicsProducts} />
      </div>
    </div>
  );
};

export default ElectronicsPage;
