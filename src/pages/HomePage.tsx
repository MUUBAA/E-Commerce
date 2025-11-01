import React from 'react';
import ProductCarousel from '../components/ProductCarousel';

const categories = [
  { name: 'Fruits & Vegetables', imageUrl: 'https://i.ibb.co/bJC2wT9/vegetables.png' },
  { name: 'Dairy, Bread & Eggs', imageUrl: 'https://i.ibb.co/VvZv1pP/dairy.png' },
  { name: 'Atta, Rice, Oil & Dals', imageUrl: 'https://i.ibb.co/Jq6M2hM/atta.png' },
  { name: 'Masala & Dry Fruits', imageUrl: 'https://i.ibb.co/2j2BqjB/masala.png' },
  { name: 'Breakfast & Sauces', imageUrl: 'https://i.ibb.co/b3vTQzQ/breakfast.png' },
  { name: 'Packaged Food', imageUrl: 'https://i.ibb.co/KKhs02W/packaged.png' },
  { name: 'Zepto Cafe', imageUrl: 'https://i.ibb.co/9TRc4Tq/cafe.png' },
  { name: 'Tea, Coffee & More', imageUrl: 'https://i.ibb.co/Yy4d0xX/tea.png' },
  { name: 'Ice Creams & More', imageUrl: 'https://i.ibb.co/B2k0L1P/icecream.png' },
  { name: 'Frozen Food', imageUrl: 'https://i.ibb.co/HTn3pBt/frozen.png' },
];

const buyAgain = [
    { name: 'All Items', imageUrl: 'https://i.ibb.co/mHw3f6h/all.png' },
    { name: 'Zepto Cafe', imageUrl: 'https://i.ibb.co/9TRc4Tq/cafe.png' },
    { name: 'Fruits & Vegetables', imageUrl: 'https://i.ibb.co/bJC2wT9/vegetables.png' },
    { name: 'Dairy Products', imageUrl: 'https://i.ibb.co/VvZv1pP/dairy.png' },
    { name: 'Snacks & Drinks', imageUrl: 'https://i.ibb.co/KKhs02W/packaged.png' },
    { name: 'Grocery & Kitchen', imageUrl: 'https://i.ibb.co/Jq6M2hM/atta.png' },
    { name: 'Sweets & Chocolates', imageUrl: 'https://i.ibb.co/B2k0L1P/icecream.png' },
    { name: 'Beauty & Personal...', imageUrl: 'https://i.ibb.co/tZ2M4NL/beauty.png' },
    { name: 'Household Essentials', imageUrl: 'https://i.ibb.co/LQrSc2f/household.png' },
];

const spices = [
  {
    name: 'Catch Jeera Whole',
    price: '₹42',
    originalPrice: '₹68',
    discount: '₹26 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10227a.jpg?ts=1688463558',
    rating: 4.7,
    reviews: '58.8k',
    weight: '1 pack (100 g)',
  },
  {
    name: 'Daily Good Mustard / Rai / Sarso Small',
    price: '₹18',
    originalPrice: '₹40',
    discount: '₹22 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481850a.jpg?ts=1690813329',
    rating: 4.7,
    reviews: '6.0k',
    weight: '1 pack (100 g)',
  },
  {
    name: 'Aashirvaad Turmeric/Haldi Powder',
    price: '₹26',
    originalPrice: '₹40',
    discount: '₹14 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/172a.jpg?ts=1688629928',
    rating: 4.7,
    reviews: '45.3k',
    weight: '1 pack (100 g)',
  },
];

const sugarAndJaggery = [
    {
    name: 'Parrys White Label Sugar',
    price: '₹48',
    originalPrice: '₹65',
    discount: '₹17 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/1000109a.jpg?ts=1689339414',
    rating: 4.8,
    reviews: '137.5k',
    weight: '1 pack (1 kg)',
  },
  {
    name: 'Tata Salt, Free Flowing and Iodised Namak',
    price: '₹25',
    originalPrice: '₹30',
    discount: '₹5 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/160a.jpg?ts=1692884708',
    rating: 4.8,
    reviews: '292.0k',
    weight: '1 pack (1 kg)',
  },
  {
    name: 'Jivana Classic Sugar',
    price: '₹47',
    originalPrice: '₹65',
    discount: '₹18 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/448141a.jpg?ts=1692018823',
    rating: 4.8,
    reviews: '10.9k',
    weight: '1 pack (1 kg)',
  },
]

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-50 p-2 pb-24 md:p-4">
      {/* Hero Banner */}
      <div className="mb-4 flex items-center justify-between rounded-2xl bg-pink-50 p-4 shadow-sm">
        <div className="flex-1">
          <h2 className="text-2xl font-bold md:text-3xl">
            Get Cigarettes <br /> at <span className="text-red-600">₹0</span> Convenience Fee
          </h2>
          <p className="mt-2 text-gray-600">Get smoking accessories, fresheners & more in minutes!</p>
          <button className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-bold text-white transition-transform hover:scale-105">
            Order now
          </button>
        </div>
        <img
          src="https://i.ibb.co/8mjS1f2/cigarettes.png"
          alt="Cigarettes"
          className="h-32 w-32 object-contain md:h-36 md:w-36"
        />
      </div>

      {/* Zepto Experience Banner */}
      <div className="mb-4 rounded-2xl bg-purple-50 p-4 text-center shadow-sm">
        <h3 className="font-bold text-purple-800">ALL NEW ZEPTO EXPERIENCE</h3>
        <div className="mt-2 flex justify-around">
          <div>
            <p className="text-2xl font-bold md:text-3xl">₹0 FEES</p>
            <p className="text-sm text-gray-600">Free delivery unlocked</p>
          </div>
          <div>
            <p className="text-2xl font-bold md:text-3xl">LOWEST PRICES</p>
            <p className="text-sm text-gray-600">EVERYDAY</p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-4">
        <h2 className="mb-2 text-xl font-bold md:text-2xl">Categories</h2>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10">
          {categories.map((category) => (
            <div key={category.name} className="text-center">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="mx-auto h-20 w-20 object-contain transition-transform hover:scale-105 md:h-24 md:w-24"
              />
              <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-medium text-gray-700 md:text-sm">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Buy Again Section */}
      <div className="mb-8">
        <h2 className="mb-2 text-xl font-bold md:text-2xl">Buy Again</h2>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10">
          {buyAgain.map((category) => (
            <div key={category.name} className="text-center">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="mx-auto h-20 w-20 object-contain transition-transform hover:scale-105 md:h-24 md:w-24"
              />
              <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-medium text-gray-700 md:text-sm">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Carousels */}
      <ProductCarousel title="Spices & Seasonings" products={spices} />
      <ProductCarousel title="Salt, Sugar & Jaggery" products={sugarAndJaggery} />
    </div>
  );
};

export default HomePage;
