import React from 'react';
import ProductGrid from '../components/ProductGrid';

const toysProducts = [
  {
    id: 1,
    itemName: 'LEGO Building Blocks',
    itemPrice: '₹999',
    originalPrice: '₹1499',
    discount: '₹500 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/placeholder.jpg',
    weight: '500 pcs',
    rating: 4.5,
    reviews: '234',
  },
  {
    id: 2,
    itemName: 'Remote Control Car',
    itemPrice: '₹799',
    originalPrice: '₹1299',
    discount: '₹500 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/placeholder.jpg',
    weight: '1 pc',
    rating: 4.2,
    reviews: '189',
  },
];

const ToysPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Toys & Games</h1>
          <p className="mt-2 text-gray-600">Discover amazing toys and games for all ages</p>
        </div>
        
        <ProductGrid title="All Toys" products={toysProducts} />
      </div>
    </div>
  );
};

export default ToysPage;
