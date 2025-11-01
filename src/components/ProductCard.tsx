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
    <div className="flex h-full w-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Image section */}
      <div className="relative p-2">
        <img className="w-full rounded-md" src={imageUrl} alt={name} />
        <button className="absolute bottom-[-8px] right-4 rounded-lg border border-red-500 bg-white px-4 py-1 text-sm font-bold text-red-500 shadow-lg transition-colors hover:bg-red-50">
          ADD
        </button>
      </div>

      {/* Details section */}
      <div className="flex flex-grow flex-col px-3 pb-3">
        <div className="flex-grow">
          {/* Price section */}
          <div className="flex items-center">
            <p className="rounded bg-green-600 px-2 py-1 text-sm font-bold text-white">{price}</p>
            {originalPrice && (
              <p className="ml-2 text-sm text-gray-500 line-through">{originalPrice}</p>
            )}
          </div>
          {discount && <p className="mt-1 text-xs font-semibold text-green-700">{discount}</p>}

          {/* Product Name */}
          <h3 className="mt-2 text-sm font-medium text-gray-800">{name}</h3>

          {/* Weight */}
          {weight && <p className="mt-1 text-sm text-gray-500">{weight}</p>}
        </div>

        {/* Rating */}
        {rating && (
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
            <span className="ml-1 font-bold text-gray-700">{rating}</span>
            {reviews && <span className="ml-1">({reviews})</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
