import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';
import { ChevronLeft } from 'lucide-react';

const CafePage: React.FC = () => {
  const navigate = useNavigate();

  // Cafe banner data
  const cafeBanner = {
    title: 'Nest café',
    subtitle: 'FOOD FROM ₹99',
    description: 'SELLING FAST!!',
    buttonText: 'EXPLORE →',
    imageUrl: 'https://i.ibb.co/9TRc4Tq/cafe.png'
  };

  // What's On Your Mind categories
  const mindCategories = [
    { name: '✨ Bestsellers', imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/bestseller.jpg?ts=1709800030' },
    { name: 'Breakfast', imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/breakfast.jpg?ts=1709800030' },
    { name: 'Meals', imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/meals.jpg?ts=1709800030' },
    { name: 'Chai', imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/chai.jpg?ts=1709800030' },
    { name: 'Coffee', imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/coffee.jpg?ts=1709800030' },
    { name: 'Desserts', imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/desserts.jpg?ts=1709800030' },
  ];

  // Cafe products for different sections
  const cafeProducts = [
    {
      id: 6,
      itemName: 'Vietnamese Cold Coffee',
      itemPrice: '₹189',
      originalPrice: '₹209',
      discount: '₹20 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/vietnamese_coffee.jpg?ts=1709800030',
      weight: '450 ml',
      rating: 4.4,
      reviews: '117.5k'
    },
    {
      id: 2,
      itemName: 'Adrak Chai',
      itemPrice: '₹129',
      originalPrice: '₹149',
      discount: '₹20 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/adrak_chai.jpg?ts=1709800030',
      weight: '250 ml',
      rating: 4.2,
      reviews: '22.5k'
    },
    {
      id: 3,
      itemName: 'Mini Butter Croissants',
      itemPrice: '₹129',
      originalPrice: '₹149',
      discount: '₹20 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/croissants.jpg?ts=1709800030',
      weight: '1 pack',
      rating: 4.2,
      reviews: '10.0k'
    },
    {
      id: 4,
      itemName: 'Chili Cheese Toast',
      itemPrice: '₹169',
      originalPrice: '₹189',
      discount: '₹20 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/cheese_toast.jpg?ts=1709800030',
      weight: '1 piece',
      rating: 4.2,
      reviews: '11.7k'
    },
    {
      id: 5,
      itemName: 'Chocolate Mousse',
      itemPrice: '₹115',
      originalPrice: '₹129',
      discount: '₹14 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/chocolate_mousse.jpg?ts=1709800030',
      weight: 'Serves 1',
      rating: 4.2,
      reviews: '20.2k'
    },
    {
      id: 1,
      itemName: 'Kesari Rasmalai',
      itemPrice: '₹169',
      originalPrice: '₹189',
      discount: '₹20 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/rasmalai.jpg?ts=1709800030',
      weight: '2 pieces',
      rating: 4.6,
      reviews: '14.6k'
    },
    {
      id: 7,
      itemName: 'Hazelnut Cold Coffee',
      itemPrice: '₹169',
      originalPrice: '₹189',
      discount: '₹20 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/hazelnut_coffee.jpg?ts=1709800030',
      weight: '450 ml',
      rating: 4.5,
      reviews: '995'
    }
  ];

  const newlyLaunched = [
    {
      id: 1,
      itemName: 'Veg Puff',
      itemPrice: '₹70',
      originalPrice: '₹79',
      discount: '₹9 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/veg_puff.jpg?ts=1709800030',
      weight: '1 Piece',
      rating: 4.4,
      reviews: '72.4k'
    },
    {
      id: 2,
      itemName: 'Adrak Chai',
      itemPrice: '₹129',
      originalPrice: '₹99',
      discount: '₹10 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/chocolate_bao.jpg?ts=1709800030',
      weight: '2 Pieces',
      rating: 4.2,
      reviews: '260'
    }
  ];

  const bestsellers = [
    {
      id: 1,
      itemName: 'Veg Puff',
      itemPrice: '₹70',
      originalPrice: '₹79',
      discount: '₹9 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/veg_puff.jpg?ts=1709800030',
      weight: '1 Piece',
      rating: 4.4,
      reviews: '72.4k'
    },
    {
      id: 2,
      itemName: 'Adrak Chai',
      itemPrice: '₹129',
      originalPrice: '₹149',
      discount: '₹20 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/adrak_chai.jpg?ts=1709800030',
      weight: '250 ml',
      rating: 4.2,
      reviews: '22.5k'
    },
    {
      id: 3,
      itemName: 'Iced Americano',
      itemPrice: '₹129',
      originalPrice: '₹149',
      discount: '₹20 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/iced_americano.jpg?ts=1709800030',
      weight: '450 ml',
      rating: 4.2,
      reviews: '10.0k'
    },
    {
      id: 4,
      itemName: 'Spanish Coffee',
      itemPrice: '₹169',
      originalPrice: '₹189',
      discount: '₹20 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/spanish_coffee.jpg?ts=1709800030',
      weight: '350 ml',
      rating: 4.2,
      reviews: '11.7k'
    },
    {
      id: 5,
      itemName: 'Poha',
      itemPrice: '₹115',
      originalPrice: '₹129',
      discount: '₹14 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/poha.jpg?ts=1709800030',
      weight: 'Serves 1',
      rating: 4.2,
      reviews: '20.2k'
    },
    {
      id: 6,
      itemName: 'Vietnamese Cold Coffee',
      itemPrice: '₹189',
      originalPrice: '₹209',
      discount: '₹20 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/vietnamese_coffee.jpg?ts=1709800030',
      weight: '450 ml',
      rating: 4.4,
      reviews: '117.5k'
    }
  ];

  const snackTime = [
    {
      id: 1,
      itemName: 'Bun Maska',
      itemPrice: '₹89',
      originalPrice: '₹99',
      discount: '₹10 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/bun_maska.jpg?ts=1709800030',
      weight: '1 Piece',
      rating: 4.4,
      reviews: '72.4k'
    },
    {
      id: 2,
      itemName: 'Veg Puff',
      itemPrice: '₹70',
      originalPrice: '₹79',
      discount: '₹9 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/veg_puff.jpg?ts=1709800030',
      weight: '1 Piece',
      rating: 4.4,
      reviews: '72.4k'
    },
    {
      id: 3,
      itemName: 'Chicken Puff',
      itemPrice: '₹80',
      originalPrice: '₹89',
      discount: '₹9 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/chicken_puff.jpg?ts=1709800030',
      weight: '1 Piece',
      rating: 4.3,
      reviews: '83.6k'
    },
    {
      id: 4,
      itemName: 'Cheese Maggi',
      itemPrice: '₹99',
      originalPrice: '₹109',
      discount: '₹10 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/cheese_maggi.jpg?ts=1709800030',
      weight: '1 Portion',
      rating: 4.3,
      reviews: '100.0k'
    },
    {
      id: 5,
      itemName: 'Plain Maggi',
      itemPrice: '₹79',
      originalPrice: '₹89',
      discount: '₹10 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/plain_maggi.jpg?ts=1709800030',
      weight: '1 Portion',
      rating: 4.3,
      reviews: '97.8k'
    },
    {
      id: 6,
      itemName: 'Bhelpuri',
      itemPrice: '₹119',
      originalPrice: '₹139',
      discount: '₹20 OFF',
      itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/bhelpuri.jpg?ts=1709800030',
      weight: '1 Portion',
      rating: 4.3,
      reviews: '42.5k'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Zepto Café</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Cafe Banner */}
        <div className="mb-6">
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-yellow-100 to-orange-100 p-6 shadow-sm">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">{cafeBanner.title}</h2>
              <div className="mt-2 inline-block rounded bg-red-600 px-3 py-1 text-white">
                <span className="text-lg font-bold">{cafeBanner.subtitle}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-700">{cafeBanner.description}</p>
              <button className="mt-4 cursor-pointer rounded-full bg-gray-800 px-6 py-3 font-bold text-white transition-transform hover:scale-105">
                {cafeBanner.buttonText}
              </button>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/food_plate.jpg?ts=1709800030"
                alt="Food"
                className="h-20 w-20 rounded-full object-cover md:h-24 md:w-24"
              />
              <img
                src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/coffee_cup.jpg?ts=1709800030"
                alt="Coffee"
                className="h-16 w-16 rounded-full object-cover md:h-20 md:w-20"
              />
            </div>
          </div>
        </div>

        {/* Featured Products Carousel */}
        <ProductCarousel title="" products={cafeProducts} />

        {/* What's On Your Mind Section */}
        <div className="mb-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">What's On Your Mind?</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {mindCategories.map((category) => (
              <div key={category.name} className="flex-shrink-0 text-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-700">{category.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newly Launched Section */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              Newly Launched 
              <span className="text-pink-500">✨</span>
            </h2>
            <button className="text-sm font-medium text-pink-500 hover:text-pink-600">
              See All →
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {newlyLaunched.map((product, index) => (
              <div key={`${product.itemName}-${index}`} className="flex-shrink-0">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>

        {/* Bestsellers Section */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              Bestsellers 
              <span className="text-purple-500">⭐</span>
            </h2>
            <div className="rounded-lg bg-pink-100 px-4 py-2">
              <button 
                onClick={() => navigate('/cafe-bestsellers')}
                className="cursor-pointer text-sm font-medium text-pink-500 hover:text-pink-600"
              >
                See all →
              </button>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {bestsellers.map((product, index) => (
              <div key={`${product.itemName}-${index}`} className="flex-shrink-0">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>

        {/* Snack Time Section */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              Snack Time 
              <span className="text-orange-500">🍿</span>
            </h2>
            <div className="rounded-lg bg-pink-100 px-4 py-2">
              <button 
                onClick={() => navigate('/cafe-snacks')}
                className="cursor-pointer text-sm font-medium text-pink-500 hover:text-pink-600"
              >
                See all →
              </button>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {snackTime.map((product, index) => (
              <div key={`${product.itemName}-${index}`} className="flex-shrink-0">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafePage;