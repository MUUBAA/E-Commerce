import React from 'react';
import ProductCard from '../components/ProductCard';

const spices = [
  {
    id: 1,
    itemName: 'Catch Jeera Whole',
    itemPrice: '₹42',
    originalPrice: '₹68',
    discount: '₹26 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10227a.jpg?ts=1688463558',
    rating: 4.7,
    reviews: '58.8k',
    weight: '1 pack (100 g)',
  },
  {
    id: 2,
    itemName: 'Daily Good Mustard / Rai / Sarso Small',
    itemPrice: '₹18',
    originalPrice: '₹40',
    discount: '₹22 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481850a.jpg?ts=1690813329',
    rating: 4.7,
    reviews: '6.0k',
    weight: '1 pack (100 g)',
  },
  {
    id: 3,
    itemName: 'MDH Chana Masala',
    itemPrice: '₹100',
    originalPrice: '₹40',
    discount: '₹14 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/172a.jpg?ts=1688629928',
    rating: 4.7,
    reviews: '45.3k',
    weight: '1 pack (100 g)',
  },
];

const sugarAndJaggery = [
    {
      id: 1,
    itemName: 'Parrys White Label Sugar',
    itemPrice: '₹48',
    originalPrice: '₹65',
    discount: '₹17 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/1000109a.jpg?ts=1689339414',
    rating: 4.8,
    reviews: '137.5k',
    weight: '1 pack (1 kg)',
  },
  {
    id: 2,
    itemName: 'Tata Salt, Free Flowing and Iodised Namak',
    itemPrice: '₹25',
    originalPrice: '₹30',
    discount: '₹5 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/160a.jpg?ts=1692884708',
    rating: 4.8,
    reviews: '292.0k',
    weight: '1 pack (1 kg)',
  },
  {
    id: 3,
    itemName: 'Jivana Classic Sugar',
    itemPrice: '₹47',
    originalPrice: '₹65',
    discount: '₹18 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/448141a.jpg?ts=1692018823',
    rating: 4.8,
    reviews: '10.9k',
    weight: '1 pack (1 kg)',
  },
]

const ListPage: React.FC = () => {
  return (
    <div className="p-2 pb-8 md:p-4">
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Spices & Seasonings</h2>
            <a href="#" className="text-sm font-semibold text-red-600">See All &gt;</a>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {spices.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                itemName={product.itemName}
                itemPrice={product.itemPrice}
                originalPrice={product.originalPrice}
                discount={product.discount}
                itemUrl={product.itemUrl}
                rating={product.rating}
                reviews={product.reviews}
                weight={product.weight}
              />
          ))}
        </div>
      </div>

       <div>
        <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Salt, Sugar & Jaggery</h2>
            <a href="#" className="text-sm font-semibold text-red-600">See All &gt;</a>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {sugarAndJaggery.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                itemName={product.itemName}
                itemPrice={product.itemPrice}
                originalPrice={product.originalPrice}
                discount={product.discount}
                itemUrl={product.itemUrl}
                rating={product.rating}
                reviews={product.reviews}
                weight={product.weight}
              />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListPage;
