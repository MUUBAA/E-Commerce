import React from 'react';
import ProductCard from './ProductCard';

interface ProductGridProps {
  title: string;
  products: {
    name: string;
    price: string;
    originalPrice?: string;
    imageUrl: string;
    discount?: string;
    rating?: number;
    reviews?: string;
    weight?: string;
  }[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, products }) => {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <button className="text-sm font-medium text-pink-500 hover:text-pink-600">
          See All →
        </button>
      </div>
      
      {/* Mobile: Horizontal scroll, Tablet+: Grid layout */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-3 sm:overflow-visible md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {products.map((product, index) => (
          <div key={`${product.name}-${index}`} className="flex-shrink-0 sm:flex-shrink">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;