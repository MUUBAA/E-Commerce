import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

interface ProductCarouselProps {
  title: string;
  categorySlug?: string;
  products: {
    id: number;
    itemName: string;
    itemPrice: string;
    originalPrice?: string;
    itemUrl: string;
    discount?: string;
  }[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, categorySlug, products }) => {
  const navigate = useNavigate();
  
  const handleSeeAllClick = () => {
    if (categorySlug) {
      // Navigate to specific route instead of generic category route
      navigate(`/${categorySlug}`);
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        {categorySlug && (
          <button 
            onClick={handleSeeAllClick}
            className="cursor-pointer text-sm font-medium text-pink-500 hover:text-pink-600"
          >
            See All →
          </button>
        )}
      </div>
      
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
        {products.map((product, index) => (
          <div key={`${product.itemName}-${index}`} className="flex-shrink-0">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
