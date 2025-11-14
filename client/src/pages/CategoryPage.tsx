import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ChevronLeft } from 'lucide-react';

interface CategoryData {
  title: string;
  banners: {
    imageUrl: string;
    title: string;
    subtitle: string;
    buttonText: string;
    backgroundColor: string;
  }[];
  products: {
    id: number;
    itemName: string;
    itemPrice: string;
    originalPrice?: string;
    itemUrl: string;
    discount?: string;
    rating?: number;
    reviews?: string;
    weight?: string;
  }[];
}

// Category data configuration
const categoryData: Record<string, CategoryData> = {
  'fruits-vegetables': {
    title: 'Fresh Fruits and Vegetables',
    banners: [
      {
        imageUrl: 'https://i.ibb.co/bJC2wT9/vegetables.png',
        title: 'Fresh Seasonal Drops',
        subtitle: 'UP TO 30% OFF',
        buttonText: 'Explore',
        backgroundColor: 'bg-orange-100'
      },
      {
        imageUrl: 'https://i.ibb.co/2j2BqjB/masala.png',
        title: 'TULSI VIVAH SPECIALS',
        subtitle: 'BEST DEALS',
        buttonText: 'Order now',
        backgroundColor: 'bg-green-700'
      },
      {
        imageUrl: 'https://i.ibb.co/B2k0L1P/icecream.png',
        title: "Season's Freshest APPLES",
        subtitle: 'UP TO 30% OFF',
        buttonText: 'Explore now',
        backgroundColor: 'bg-blue-500'
      }
    ],
    products: [
      {
        id: 1,
        itemName: 'Coriander leaves',
        itemPrice: '₹8',
        originalPrice: '₹16',
        discount: '₹8 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/462971a.jpg?ts=1667826193',
        weight: '1 pack (100 g)',
      },
      {
        id: 2,
        itemName: 'Fresh Onion',
        itemPrice: '₹26',
        originalPrice: '₹54',
        discount: '₹28 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/483611a.jpg?ts=1641540272',
        weight: '1 Pack / 900 -1000 gm',
      },
      {
        id: 3,
        itemName: 'Banana Robusta',
        itemPrice: '₹21',
        originalPrice: '₹39',
        discount: '₹18 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/1000109a.jpg?ts=1689339414',
        weight: '4 pcs',
      },
      {
        id: 4,
        itemName: 'Button Mushroom',
        itemPrice: '₹53',
        originalPrice: '₹79',
        discount: '₹26 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/mushroom123.jpg?ts=1709800030',
        weight: '200 g',
      },
      {
        id: 5,
        itemName: 'Chilli Green',
        itemPrice: '₹17',
        originalPrice: '₹31',
        discount: '₹14 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/160a.jpg?ts=1692884708',
        weight: '100 g',
      },
      {
        id: 6,
        itemName: 'Tomato Local',
        itemPrice: '₹17',
        originalPrice: '₹37',
        discount: '₹20 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/448141a.jpg?ts=1692884708',
        weight: '500 g',
      },
      {
        id: 7,
        itemName: 'Baby Orange (Mandarin)',
        itemPrice: '₹149',
        originalPrice: '₹220',
        discount: '₹71 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/orange123.jpg?ts=1709800030',
        weight: '500 g',
      },
      {
        id: 8,
        itemName: 'Lettuce Green',
        itemPrice: '₹17',
        originalPrice: '₹25',
        discount: '₹8 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/lettuce123.jpg?ts=1709800030',
        weight: '100 g',
      },
      {
        id: 9,
        itemName: 'Spinach - Cleaned, without roots',
        itemPrice: '₹28',
        originalPrice: '₹54',
        discount: '₹26 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/spinach123.jpg?ts=1709800030',
        weight: '1 pack (250 g)',
      },
      {
        id: 10,
        itemName: 'Carrot Local',
        itemPrice: '₹20',
        originalPrice: '₹42',
        discount: '₹22 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/carrot123.jpg?ts=1709800030',
        weight: '250 g',
      },
      {
        id: 11,
        itemName: 'Coconut Pooja',
        itemPrice: '₹34',
        originalPrice: '₹63',
        discount: '₹29 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/coconut123.jpg?ts=1709800030',
        weight: '1 pc',
      },
      {
        id: 12,
        itemName: 'Mint Leaves',
        itemPrice: '₹9',
        originalPrice: '₹15',
        discount: '₹6 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/mint123.jpg?ts=1709800030',
        weight: '100 g',
      },
      {
        id: 13,
        itemName: 'Kiwi Green',
        itemPrice: '₹76',
        originalPrice: '₹113',
        discount: '₹37 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/kiwi123.jpg?ts=1709800030',
        weight: '3 pcs',
      },
      {
        id: 14,
        itemName: 'Lemon',
        itemPrice: '₹37',
        originalPrice: '₹67',
        discount: '₹30 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/lemon123.jpg?ts=1709800030',
        weight: '500 g',
      },
      {
        id: 15,
        itemName: 'Lime',
        itemPrice: '₹27',
        originalPrice: '₹50',
        discount: '₹23 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/lime123.jpg?ts=1709800030',
        weight: '500 g',
      },
      {
        id: 16,
        itemName: 'Capsicum Green',
        itemPrice: '₹17',
        originalPrice: '₹36',
        discount: '₹19 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/capsicum123.jpg?ts=1709800030',
        weight: '2 pcs',
      },
      {
        id: 17,
        itemName: 'Ginger',
        itemPrice: '₹18',
        originalPrice: '₹34',
        discount: '₹16 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/ginger123.jpg?ts=1709800030',
        weight: '200 g',
      },
      {
        id: 18,
        itemName: 'Tomato Hybrid',
        itemPrice: '₹21',
        originalPrice: '₹37',
        discount: '₹16 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/tomato_hybrid123.jpg?ts=1709800030',
        weight: '500 g',
      },
      {
        id: 19,
        itemName: 'Grapes Bangalore Blue',
        itemPrice: '₹37',
        originalPrice: '₹67',
        discount: '₹30 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/grapes123.jpg?ts=1709800030',
        weight: '500 g',
      },
      {
        id: 20,
        itemName: 'Coccinia',
        itemPrice: '₹12',
        originalPrice: '₹25',
        discount: '₹13 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/coccinia123.jpg?ts=1709800030',
        weight: '250 g',
      },
    ]
  },
  'rice': {
    title: 'Rice',
    banners: [
          {
        imageUrl: 'https://i.ibb.co/bJC2wT9/vegetables.png',
        title: 'Fresh Seasonal Drops',
        subtitle: 'UP TO 30% OFF',
        buttonText: 'Explore',
        backgroundColor: 'bg-orange-100'
      },
      {
        imageUrl: 'https://i.ibb.co/2j2BqjB/masala.png',
        title: 'TULSI VIVAH SPECIALS',
        subtitle: 'BEST DEALS',
        buttonText: 'Order now',
        backgroundColor: 'bg-green-700'
      },
      {
        imageUrl: 'https://i.ibb.co/B2k0L1P/icecream.png',
        title: "Season's Freshest APPLES",
        subtitle: 'UP TO 30% OFF',
        buttonText: 'Explore now',
        backgroundColor: 'bg-blue-500'
      }
    ],
    products: [
      {
        id: 1,
        itemName: 'Shree Akshara Premium Steam Sona Masoori Rice',
        itemPrice: '₹474',
        originalPrice: '₹750',
        discount: '₹276 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/b5ac6b32-7e46-4b15-9fa7-16dd8334b59e.jpg?ts=1709800030',
        rating: 4.8,
        reviews: '995',
        weight: '1 pack (10 kg)',
      },
      {
        id: 2,
        itemName: 'India Gate Gold Standard Classic Basmati Rice | 2 Year...',
        itemPrice: '₹1069',
        originalPrice: '₹1255',
        discount: '₹186 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/c2f5e39b-f9c7-4af2-bd66-85e8f8e86ccf.jpg?ts=1709800030',
        rating: 4.7,
        reviews: '607',
        weight: '1 pack (5 kg)',
      },
      // Add more rice products...
    ]
  },
  'dal-pulses': {
    title: 'Dal & Pulses',
    banners: [],
    products: [
      {
        id: 1,
        itemName: 'Tata Sampann Unpolished Toor Dal-Arhar Dal',
        itemPrice: '₹142',
        originalPrice: '₹210',
        discount: '₹68 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/a1b2c3d4-1234-5678-9abc-def123456789.jpg?ts=1709800030',
        rating: 4.7,
        reviews: '42.4k',
        weight: '1 pack (1 kg)',
      },
      {
        id: 2,
        itemName: 'Tata Sampann Unpolished Toor Dal-Arhar Dal',
        itemPrice: '₹142',
        originalPrice: '₹210',
        discount: '₹68 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/a1b2c3d4-1234-5678-9abc-def123456789.jpg?ts=1709800030',
        rating: 4.7,
        reviews: '42.4k',
        weight: '1 pack (1 kg)',
      },
      {
        id: 3,
        itemName: 'Tata Sampann Unpolished Toor Dal-Arhar Dal',
        itemPrice: '₹142',
        originalPrice: '₹210',
        discount: '₹68 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/a1b2c3d4-1234-5678-9abc-def123456789.jpg?ts=1709800030',
        rating: 4.7,
        reviews: '42.4k',
        weight: '1 pack (1 kg)',
      },
      {
        id: 4,
        itemName: 'Tata Sampann Unpolished Toor Dal-Arhar Dal',
        itemPrice: '₹142',
        originalPrice: '₹210',
        discount: '₹68 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/a1b2c3d4-1234-5678-9abc-def123456789.jpg?ts=1709800030',
        rating: 4.7,
        reviews: '42.4k',
        weight: '1 pack (1 kg)',
      },
      {
        id: 5,
        itemName: 'Tata Sampann Unpolished Toor Dal-Arhar Dal',
        itemPrice: '₹142',
        originalPrice: '₹210',
        discount: '₹68 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/a1b2c3d4-1234-5678-9abc-def123456789.jpg?ts=1709800030',
        rating: 4.7,
        reviews: '42.4k',
        weight: '1 pack (1 kg)',
      },
      {
        id: 6,
        itemName: 'Tata Sampann Unpolished Toor Dal-Arhar Dal',
        itemPrice: '₹142',
        originalPrice: '₹210',
        discount: '₹68 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/a1b2c3d4-1234-5678-9abc-def123456789.jpg?ts=1709800030',
        rating: 4.7,
        reviews: '42.4k',
        weight: '1 pack (1 kg)',
      },
      {
        id: 7,
        itemName: 'Tata Sampann Unpolished Toor Dal-Arhar Dal',
        itemPrice: '₹142',
        originalPrice: '₹210',
        discount: '₹68 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/a1b2c3d4-1234-5678-9abc-def123456789.jpg?ts=1709800030',
        rating: 4.7,
        reviews: '42.4k',
        weight: '1 pack (1 kg)',
      },
      {
        id: 8,
        itemName: 'Tata Sampann Unpolished Toor Dal-Arhar Dal',
        itemPrice: '₹142',
        originalPrice: '₹210',
        discount: '₹68 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/a1b2c3d4-1234-5678-9abc-def123456789.jpg?ts=1709800030',
        rating: 4.7,
        reviews: '42.4k',
        weight: '1 pack (1 kg)',
      },
      {
        id: 9,
        itemName: 'Tata Sampann Unpolished Toor Dal-Arhar Dal',
        itemPrice: '₹142',
        originalPrice: '₹210',
        discount: '₹68 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/a1b2c3d4-1234-5678-9abc-def123456789.jpg?ts=1709800030',
        rating: 4.7,
        reviews: '42.4k',
        weight: '1 pack (1 kg)',
      },
      {
        id: 10,
        itemName: 'Tata Sampann Unpolished Toor Dal-Arhar Dal',
        itemPrice: '₹142',
        originalPrice: '₹210',
        discount: '₹68 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/a1b2c3d4-1234-5678-9abc-def123456789.jpg?ts=1709800030',
        rating: 4.7,
        reviews: '42.4k',
        weight: '1 pack (1 kg)',
      },
      {
        id: 11,
        itemName: 'Tata Sampann Unpolished Toor Dal-Arhar Dal',
        itemPrice: '₹142',
        originalPrice: '₹210',
        discount: '₹68 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/a1b2c3d4-1234-5678-9abc-def123456789.jpg?ts=1709800030',
        rating: 4.7,
        reviews: '42.4k',
        weight: '1 pack (1 kg)',
      },
      // Add more dal products...
    ]
  },
  'spices-seasonings': {
    title: 'Spices & Seasonings',
    banners: [],
    products: [
      {
        id: 1,
        itemName: 'Catch Jeera Whole',
        itemPrice: '₹43',
        originalPrice: '₹68',
        discount: '₹25 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/10227a.jpg?ts=1688463558',
        rating: 4.7,
        reviews: '58.8k',
        weight: '1 pack (100 g)',
      },
      // Add more spice products...
    ]
  },
  'chips-crisps': {
    title: 'Chips & Crisps',
    banners: [],
    products: [
      {
        id: 1,
        itemName: 'Uncle Chips Spicy Treat',
        itemPrice: '₹30',
        originalPrice: '₹50',
        discount: '₹20 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/q6r7s8t9-0123-4567-89ab-234567890123.jpg?ts=1709800030',
        rating: 4.7,
        reviews: '73.6k',
        weight: '1 pack (80 g)',
      },
      // Add more chips products...
    ]
  },
  'juices-healthy-drinks': {
    title: 'Juices & Healthy Drinks',
    banners: [],
    products: [
      {
        id: 1,
        itemName: 'Dabur Hommade Organic Coconut Milk',
        itemPrice: '₹74',
        originalPrice: '₹89',
        discount: '₹15 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/y4z5a6b7-89ab-cdef-0123-012345678901.jpg?ts=1709800030',
        rating: 4.7,
        reviews: '9.9k',
        weight: '1 pc (200 ml)',
      },
      // Add more drinks products...
    ]
  },
  'cafe-bestsellers': {
    title: 'Bestsellers',
    banners: [],
    products: [
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
    ]
  },
  'cafe-snacks': {
    title: 'Snack Time',
    banners: [],
    products: [
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
    ]
  },
  'home-kitchen': {
    title: 'Home & Kitchen',
    banners: [],
    products: [
      {
        id: 1,
        itemName: 'Kitchen Towel',
        itemPrice: '₹89',
        originalPrice: '₹120',
        discount: '₹31 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/kitchen_towel.jpg?ts=1709800030',
        weight: '1 pack',
        rating: 4.3,
        reviews: '5.2k'
      }
    ]
  },
  'toys-games': {
    title: 'Toys & Games',
    banners: [],
    products: [
      {
        id: 1,
        itemName: 'Building Blocks Set',
        itemPrice: '₹299',
        originalPrice: '₹450',
        discount: '₹151 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/building_blocks.jpg?ts=1709800030',
        weight: '1 set',
        rating: 4.5,
        reviews: '2.1k'
      }
    ]
  },
  'electronics': {
    title: 'Electronics',
    banners: [],
    products: [
      {
        id: 1,
        itemName: 'Wireless Earbuds',
        itemPrice: '₹1299',
        originalPrice: '₹2000',
        discount: '₹701 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/earbuds.jpg?ts=1709800030',
        weight: '1 pair',
        rating: 4.2,
        reviews: '8.7k'
      }
    ]
  },
  'mobiles': {
    title: 'Mobiles',
    banners: [],
    products: [
      {
        id: 1,
        itemName: 'Phone Case',
        itemPrice: '₹199',
        originalPrice: '₹399',
        discount: '₹200 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/phone_case.jpg?ts=1709800030',
        weight: '1 piece',
        rating: 4.1,
        reviews: '3.4k'
      }
    ]
  },
  'beauty-personal-care': {
    title: 'Beauty & Personal Care',
    banners: [],
    products: [
      {
        id: 1,
        itemName: 'Face Wash',
        itemPrice: '₹149',
        originalPrice: '₹200',
        discount: '₹51 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/face_wash.jpg?ts=1709800030',
        weight: '100ml',
        rating: 4.3,
        reviews: '12.5k'
      }
    ]
  },
  'fashion': {
    title: 'Fashion',
    banners: [],
    products: [
      {
        id: 1,
        itemName: 'Cotton T-Shirt',
        itemPrice: '₹499',
        originalPrice: '₹799',
        discount: '₹300 OFF',
        itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/tshirt.jpg?ts=1709800030',
        weight: 'Size M',
        rating: 4.4,
        reviews: '6.8k'
      }
    ]
  }
};

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  if (!category || !categoryData[category]) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const data = categoryData[category];

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
          <h1 className="text-lg font-bold text-gray-900">{data.title}</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Banner section - only for fruits and vegetables */}
        {data.banners.length > 0 && (
          <div className="mb-6">
            <div className="mb-4 grid gap-4 md:grid-cols-3">
              {data.banners.map((banner, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-2xl p-4 shadow-sm ${banner.backgroundColor} ${
                    index === 1 ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  <div className="flex-1">
                    <h2 className="text-lg font-bold md:text-xl">{banner.title}</h2>
                    <p className="mt-1 text-sm opacity-90">{banner.subtitle}</p>
                    <button 
                      className={`mt-3 rounded-lg px-4 py-2 text-sm font-bold transition-transform hover:scale-105 ${
                        index === 1 
                          ? 'bg-white text-gray-800' 
                          : 'bg-gray-800 text-white'
                      }`}
                    >
                      {banner.buttonText}
                    </button>
                  </div>
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="h-20 w-20 object-contain md:h-24 md:w-24"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {data.products.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;