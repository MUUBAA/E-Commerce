import React from 'react';
import ProductGrid from '../components/ProductGrid';

const fashionProducts = [
  {
    id: 1,
    itemName: 'Men\'s Cotton T-Shirt',
    itemPrice: '₹499',
    originalPrice: '₹999',
    discount: '₹500 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/placeholder.jpg',
    rating: 4.3,
    reviews: '234',
  },
  {
    id: 2,
    itemName: 'Women\'s Kurti',
    itemPrice: '₹799',
    originalPrice: '₹1,499',
    discount: '₹700 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/placeholder.jpg',
    rating: 4.6,
    reviews: '567',
  },
];

const FashionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Fashion</h1>
          <p className="mt-2 text-gray-600">Trendy clothing and accessories</p>
        </div>
        
        <ProductGrid title="All Fashion" products={fashionProducts} />
      </div>
    </div>
  );
};

export default FashionPage;
