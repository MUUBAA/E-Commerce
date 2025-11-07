import React from 'react';
import ProductGrid from '../components/ProductGrid';

const freshProducts = [
  {
    name: 'Fresh Onion',
    price: '₹26',
    originalPrice: '₹54',
    discount: '₹28 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/483611a.jpg?ts=1641540272',
    weight: '1 Pack / 900 -1000 gm',
  },
  {
    name: 'Tomato Local',
    price: '₹20',
    originalPrice: '₹37',
    discount: '₹17 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/448141a.jpg?ts=1692018823',
    weight: '500 g',
  },
  {
    name: 'Banana Robusta',
    price: '₹21',
    originalPrice: '₹39',
    discount: '₹18 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/1000109a.jpg?ts=1689339414',
    weight: '4 pcs',
  },
];

const FreshPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Fresh Produce</h1>
          <p className="mt-2 text-gray-600">Fresh fruits, vegetables, and organic products</p>
        </div>
        
        <ProductGrid title="Fruits & Vegetables" products={freshProducts} />
      </div>
    </div>
  );
};

export default FreshPage;
