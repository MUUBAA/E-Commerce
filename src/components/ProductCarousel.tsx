import React from 'react';
import ProductCard from './ProductCard';

interface ProductCarouselProps {
  title: string;
  products: {
    name: string;
    price: string;
    originalPrice?: string;
    imageUrl: string;
    discount?: string;
  }[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products }) => {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <div className="flex overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
        {products.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
