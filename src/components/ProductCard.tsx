import { Star } from 'lucide-react';
import React from 'react';

interface ProductCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  discount?: string;
  rating?: number;
  reviews?: string;
  weight?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  originalPrice,
  imageUrl,
  discount,
  rating,
  reviews,
  weight,
}) => {
  return (
    <div className="relative flex min-w-[160px] max-w-[180px] flex-col rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      {/* Image section */}
      <div className="relative mb-3">
        <img 
          className="h-32 w-full rounded-md object-cover" 
          src={imageUrl} 
          alt={name} 
        />
        <button className="absolute bottom-2 right-2 rounded-md border border-pink-500 bg-white px-3 py-1 text-sm font-semibold text-pink-500 transition-colors hover:bg-pink-50">
          ADD
        </button>
      </div>

      {/* Price section */}
      <div className="mb-2 flex items-baseline gap-2">
        <span className="rounded bg-green-600 px-2 py-1 text-sm font-bold text-white">{price}</span>
        {originalPrice && (
          <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
        )}
      </div>

      {/* Discount */}
      {discount && (
        <p className="mb-2 text-xs font-semibold text-green-700">{discount}</p>
      )}

      {/* Product Name */}
      <h3 className="mb-1 line-clamp-2 text-sm font-medium leading-tight text-gray-800">{name}</h3>

      {/* Weight */}
      {weight && (
        <p className="mb-2 text-xs text-gray-500">{weight}</p>
      )}

      {/* Rating */}
      {rating && (
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-gray-800">{rating}</span>
          {reviews && <span>({reviews})</span>}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
