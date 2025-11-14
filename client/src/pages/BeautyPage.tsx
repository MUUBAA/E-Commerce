import React from 'react';
import ProductGrid from '../components/ProductGrid';

const beautyProducts = [
  {
    id: 1,
    itemName: 'Lakme Face Cream',
    itemPrice: '₹249',
    originalPrice: '₹349',
    discount: '₹100 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/placeholder.jpg',
    weight: '50g',
    rating: 4.2,
    reviews: '456',
  },
  {
    id: 2,
    itemName: 'Maybelline Lipstick',
    itemPrice: '₹399',
    originalPrice: '₹599',
    discount: '₹200 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/placeholder.jpg',
    weight: '3.9g',
    rating: 4.5,
    reviews: '789',
  },
];

const BeautyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Beauty & Personal Care</h1>
          <p className="mt-2 text-gray-600">Top beauty and personal care products</p>
        </div>
        
        <ProductGrid title="All Beauty Products" products={beautyProducts} />
      </div>
    </div>
  );
};

export default BeautyPage;
