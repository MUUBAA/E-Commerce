import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
// import ProductGrid from '../components/ProductGrid';

const categories = [
  { name: 'Fruits & Vegetables', imageUrl: 'https://i.ibb.co/bJC2wT9/vegetables.png' },
  { name: 'Dairy, Bread & Eggs', imageUrl: 'https://i.ibb.co/VvZv1pP/dairy.png' },
  { name: 'Atta, Rice, Oil & Dals', imageUrl: 'https://i.ibb.co/Jq6M2hM/atta.png' },
  { name: 'Masala & Dry Fruits', imageUrl: 'https://i.ibb.co/2j2BqjB/masala.png' },
  { name: 'Breakfast & Sauces', imageUrl: 'https://i.ibb.co/b3vTQzQ/breakfast.png' },
  { name: 'Packaged Food', imageUrl: 'https://i.ibb.co/KKhs02W/packaged.png' },
  { name: 'Nest Cafe', imageUrl: 'https://i.ibb.co/9TRc4Tq/cafe.png' },
  { name: 'Tea, Coffee & More', imageUrl: 'https://i.ibb.co/Yy4d0xX/tea.png' },
  { name: 'Ice Creams & More', imageUrl: 'https://i.ibb.co/B2k0L1P/icecream.png' },
  { name: 'Frozen Food', imageUrl: 'https://i.ibb.co/HTn3pBt/frozen.png' },
];

// const vegetables = [
//   {
//     id: 1,
//     itemName: 'Fresh Onion',
//     itemPrice: '₹26',
//     originalPrice: '₹54',
//     discount: '₹28 OFF',
//     itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/483611a.jpg?ts=1641540272',
//     weight: '1 Pack / 900 -1000 gm',
//   },
//   {
//     itemName: 'Coriander leaves',
//     itemPrice: '₹8',
//     originalPrice: '₹16',
//     discount: '₹8 OFF',
//     itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/462971a.jpg?ts=1667826193',
//     weight: '1 pack (100 g)',
//   },
//   {
//     itemName: 'Nandini Fresh Toned Fresh Milk (Pouch Blue)',
//     itemPrice: '₹24',
//     originalPrice: '₹30',
//     discount: '₹6 OFF',
//     itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481850a.jpg?ts=1690813329',
//     weight: '1 pack (500 ml)',
//   },
//   {
//     itemName: 'Nandini Thick Curd Pouch',
//     itemPrice: '₹27',
//     originalPrice: '₹30',
//     discount: '₹3 OFF',
//     itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/172a.jpg?ts=1688629928',
//     weight: '1 pack (500 g)',
//   },
//   {
//     itemName: 'Banana Robusta',
//     itemPrice: '₹21',
//     originalPrice: '₹39',
//     discount: '₹18 OFF',
//     itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/1000109a.jpg?ts=1689339414',
//     weight: '4 pcs',
//   },
//   {
//     itemName: 'Chilli Green',
//     itemPrice: '₹17',
//     originalPrice: '₹31',
//     discount: '₹14 OFF',
//     itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/160a.jpg?ts=1692884708',
//     weight: '100 g',
//   },
//   {
//     itemName: 'Tomato Local',
//     itemPrice: '₹20',
//     originalPrice: '₹37',
//     discount: '₹17 OFF',
//     itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/448141a.jpg?ts=1692018823',
//     weight: '500 g',
//   },
//   {
//     itemName: 'Cauliflower',
//     itemPrice: '₹33',
//     originalPrice: '₹70',
//     discount: '₹37 OFF',
//     itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/448141a.jpg?ts=1692018823',
//     weight: '1 pc',
//   },
// ];

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
];

const rice = [
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
  {
    id: 3,
    itemName: 'Daily Good Sona Masoori Raw Rice',
    itemPrice: '₹72',
    originalPrice: '₹100',
    discount: '₹28 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/a25bb0a6-7e46-45e6-9cf0-3db0b2c8b1fc.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '13.9k',
    weight: '1 pack (1 kg)',
  },
  {
    id: 4,
    itemName: 'Daawat Sona Masoori',
    itemPrice: '₹76',
    originalPrice: '₹95',
    discount: '₹19 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/d2e6b0a6-7e46-45e6-9cf0-3db0b2c8b1fc.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '1.3k',
    weight: '1 pack (1 kg)',
  },
  {
    id: 5,
    itemName: 'India Gate Flavourful and Fine Dubar Basmati Rice | Long...',
    itemPrice: '₹131',
    originalPrice: '₹146',
    discount: '₹15 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/e3f7c2b0-7e46-45e6-9cf0-3db0b2c8b1fc.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '14.8k',
    weight: '1 pack (1 kg)',
  },
  {
    id: 6,
    itemName: 'Daily Good Sona Masoori Raw Rice',
    itemPrice: '₹299',
    originalPrice: '₹500',
    discount: '₹201 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/f4g8h2c0-7e46-45e6-9cf0-3db0b2c8b1fc.jpg?ts=1709800030',
    rating: 4.5,
    reviews: '2.9k',
    weight: '1 pack (5 kg)',
  },
  {
    id: 7,
    itemName: 'Daawat Rozana Super Basmati Rice | Medium Grain',
    itemPrice: '₹79',
    originalPrice: '₹100',
    discount: '₹21 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/h5j9k3d0-7e46-45e6-9cf0-3db0b2c8b1fc.jpg?ts=1709800030',
    rating: 4.3,
    reviews: '74.5k',
    weight: '1 pack (1 kg)',
  },
  {
    id: 8,
    itemName: 'Daily Good Idli Rice',
    itemPrice: '₹58',
    originalPrice: '₹100',
    discount: '₹42 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/i6k0l4e0-7e46-45e6-9cf0-3db0b2c8b1fc.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '3.4k',
    weight: '1 pack (1 kg)',
  },
];

const dalsPulses = [
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
    itemName: 'Sri Bhagyalakshmi Ground Nut',
    itemPrice: '₹81',
    originalPrice: '₹110',
    discount: '₹29 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/b2c3d4e5-2345-6789-abcd-ef0123456789.jpg?ts=1709800030',
    rating: 4.5,
    reviews: '11.0k',
    weight: '1 pack (500 g)',
  },
  {
    id: 3,
    itemName: 'Sri Bhagyalakshmi Fried Gram',
    itemPrice: '₹63',
    originalPrice: '₹80',
    discount: '₹17 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/c3d4e5f6-3456-789a-bcde-f01234567890.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '8.0k',
    weight: '1 pack (500 g)',
  },
  {
    id: 4,
    itemName: 'Tata Sampann Unpolished Green Moong',
    itemPrice: '₹68',
    originalPrice: '₹94',
    discount: '₹26 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/d4e5f6g7-4567-89ab-cdef-012345678901.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '23.6k',
    weight: '1 pack (500 g)',
  },
  {

    id: 5,
    itemName: 'Tata Sampann Unpolished Moong Dal',
    itemPrice: '₹76',
    originalPrice: '₹104',
    discount: '₹28 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/e5f6g7h8-5678-9abc-def0-123456789012.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '36.5k',
    weight: '1 pack (500 g)',
  },
  {
    id: 6,
    itemName: 'Tata Sampann Unpolished Toor Dal | Arhar Dal',
    itemPrice: '₹75',
    originalPrice: '₹106',
    discount: '₹31 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/f6g7h8i9-6789-abcd-ef01-234567890123.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '39.8k',
    weight: '1 pack (500 g)',
  },
  {
    id: 7,
    itemName: 'Tata Sampann Unpolished Moong Dal',
    itemPrice: '₹146',
    originalPrice: '₹207',
    discount: '₹61 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/g7h8i9j0-789a-bcde-f012-345678901234.jpg?ts=1709800030',
    rating: 4.8,
    reviews: '17.0k',
    weight: '1 pack (1 kg)',
  },
  {
    id: 8,
    itemName: 'Daily Good Raw Peanut / Singdana',
    itemPrice: '₹84',
    originalPrice: '₹150',
    discount: '₹66 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/h8i9j0k1-89ab-cdef-0123-456789012345.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '55.0k',
    weight: '1 pack (500 g)',
  },
];

const spicesSeasonings = [
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
  {
    id: 2,
    itemName: 'Daily Good Mustard / Rai / Sarso Small',
    itemPrice: '₹18',
    originalPrice: '₹40',
    discount: '₹22 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/j9k0l1m2-9abc-def0-1234-567890123456.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '6.0k',
    weight: '1 pack (100 g)',
  },
  {
    id: 3,
    itemName: 'Aashirvaad Turmeric/Haldi Powder',
    itemPrice: '₹25',
    originalPrice: '₹40',
    discount: '₹15 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/k0l1m2n3-abcd-ef01-2345-678901234567.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '45.3k',
    weight: '1 pack (100 g)',
  },
  {
    id: 4,
    itemName: 'Daily Good Chilli With Stem / Guntur With Stem',
    itemPrice: '₹34',
    originalPrice: '₹90',
    discount: '₹56 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/l1m2n3o4-bcde-f012-3456-789012345678.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '12.9k',
    weight: '1 pack (100 g)',
  },
  {
    id: 5,
    itemName: 'Catch Ginger Garlic Paste',
    itemPrice: '₹25',
    originalPrice: '₹47',
    discount: '₹22 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/m2n3o4p5-cdef-0123-4567-890123456789.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '27.5k',
    weight: '1 pack (200 g)',
  },
  {
    id: 6,
    itemName: 'Maggi Masala-ae-Magic Sabzi Masala',
    itemPrice: '₹51',
    originalPrice: '₹60',
    discount: '₹9 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/n3o4p5q6-def0-1234-5678-901234567890.jpg?ts=1709800030',
    rating: 4.8,
    reviews: '52.3k',
    weight: '1 pack (72 g)',
  },
  {
    id: 7,
    itemName: 'Daily Good Till - Sesame White',
    itemPrice: '₹29',
    originalPrice: '₹70',
    discount: '₹41 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/o4p5q6r7-ef01-2345-6789-012345678901.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '14.6k',
    weight: '1 pack (100 g)',
  },
  {
    id: 8,
    itemName: 'Eastern Chilli Powder',
    itemPrice: '₹24',
    originalPrice: '₹40',
    discount: '₹16 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/p5q6r7s8-f012-3456-789a-123456789012.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '8.7k',
    weight: '1 pack (100 g)',
  },
];

const chipsCrisps = [
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
  {
    id: 2,
    itemName: 'Bingo! Original Style Chilli Sprinkled - Flat Cut Spicy Potato...',
    itemPrice: '₹29',
    originalPrice: '₹50',
    discount: '₹21 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/r7s8t9u0-1234-5678-9abc-345678901234.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '361.3k',
    weight: '1 pack (85 g)',
  },
  {
    id: 3,
    itemName: 'Uncle Chips Plain Salted',
    itemPrice: '₹30',
    originalPrice: '₹50',
    discount: '₹20 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/s8t9u0v1-2345-6789-abcd-456789012345.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '22.7k',
    weight: '1 pack (80 g)',
  },
  {
    id: 4,
    itemName: '4700BC Chips+ Hawaiian Barbeque Popped Corn-Based',
    itemPrice: '₹37',
    originalPrice: '₹46',
    discount: '₹9 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/t9u0v1w2-3456-789a-bcde-567890123456.jpg?ts=1709800030',
    rating: 4.5,
    reviews: '1.3k',
    weight: '1 pack (55 g)',
  },
  {
    id: 5,
    itemName: 'Crax Korean Ramen Noodle Puff Chips',
    itemPrice: '₹28',
    originalPrice: '₹60',
    discount: '₹32 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/u0v1w2x3-4567-89ab-cdef-678901234567.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '2.2k',
    weight: '1 pack (70 g)',
  },
  {
    id: 6,
    itemName: 'Cheetos Masala Balls, Crispy Chips & Snacks',
    itemPrice: '₹28',
    originalPrice: '₹50',
    discount: '₹22 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/v1w2x3y4-5678-9abc-def0-789012345678.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '30.3k',
    weight: '1 pack (84 g)',
  },
  {
    id: 7,
    itemName: 'Sweet Karam Coffee - No Palm Oil Potato Chips - Guntur Red...',
    itemPrice: '₹49',
    originalPrice: '₹59',
    discount: '₹10 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/w2x3y4z5-6789-abcd-ef01-890123456789.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '516',
    weight: '1 pack (60 g)',
  },
  {
    id: 8,
    itemName: 'Namaskaram Beetroot Chips',
    itemPrice: '₹66',
    originalPrice: '₹75',
    discount: '₹9 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/x3y4z5a6-789a-bcde-f012-901234567890.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '4.3k',
    weight: '1 pack (100 g)',
  },
];

const juicesHealthyDrinks = [
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
  {
    id: 2,
    itemName: 'Sofit Vanilla Soy Milk',
    itemPrice: '₹111',
    originalPrice: '₹145',
    discount: '₹34 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/z5a6b7c8-9abc-def0-1234-123456789012.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '4.7k',
    weight: '1 pc (1 L)',
  },
  {
    id: 3,
    itemName: 'Sofit Chocolate Soy Milk',
    itemPrice: '₹122',
    originalPrice: '₹155',
    discount: '₹33 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/a6b7c8d9-abcd-ef01-2345-234567890123.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '1.5k',
    weight: '1 pc (1 L)',
  },
  {
    id: 4,
    itemName: 'Sofit Chocolate Soy Milk',
    itemPrice: '₹33',
    originalPrice: '₹40',
    discount: '₹7 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/b7c8d9e0-bcde-f012-3456-345678901234.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '1.8k',
    weight: '1 pc (180 ml)',
  },
  {
    id: 5,
    itemName: 'Storia Tender Coconut Water',
    itemPrice: '₹90',
    originalPrice: '₹170',
    discount: '₹80 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/c8d9e0f1-cdef-0123-4567-456789012345.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '31.2k',
    weight: '1 pc (1 L or 1.01 L)',
  },
  {
    id: 6,
    itemName: 'Alt Co. Oat Drink',
    itemPrice: '₹234',
    originalPrice: '₹266',
    discount: '₹32 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/d9e0f1g2-def0-1234-5678-567890123456.jpg?ts=1709800030',
    rating: 4.3,
    reviews: '1.2k',
    weight: '1 pc (1 L)',
  },
  {
    id: 7,
    itemName: 'Mogu Mogu Imported Lychee Fruit Juice',
    itemPrice: '₹57',
    originalPrice: '₹70',
    discount: '₹13 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/e0f1g2h3-ef01-2345-6789-678901234567.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '17.5k',
    weight: '1 pc (320 ml)',
  },
  {
    id: 8,
    itemName: 'So Good Plant Based Almond Milk',
    itemPrice: '₹229',
    originalPrice: '₹300',
    discount: '₹71 OFF',
    itemUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/f1g2h3i4-f012-3456-789a-789012345678.jpg?ts=1709800030',
    rating: 4.5,
    reviews: '995',
    weight: '1 pc (1 L)',
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    // Map category names to their routes
    const categoryRoutes: Record<string, string> = {
      'Fruits & Vegetables': '/fresh',
      'Dairy, Bread & Eggs': '/dairy',
      'Atta, Rice, Oil & Dals': '/atta-rice-oil-dals',
      'Masala & Dry Fruits': '/masala-dry-fruits',
      'Breakfast & Sauces': '/breakfast-sauces',
      'Packaged Food': '/packaged-food',
      'Nest Cafe': '/cafe',
      'Tea, Coffee & More': '/tea-coffee-more',
      'Ice Creams & More': '/ice-creams-more',
      'Frozen Food': '/frozen-food',
    };

    const route = categoryRoutes[categoryName];
    if (route) {
      navigate(route);
    }
  };


  return (
    <div className="bg-gray-50 p-2 pb-24 md:p-4">
      {/* Hero Banner */}
      <div className="mb-4 flex items-center justify-between rounded-2xl bg-pink-50 p-4 shadow-sm">
        <div className="flex-1">
          <h2 className="text-2xl font-bold md:text-3xl">
            Get Cigarettes <br /> at <span className="text-red-600">₹0</span> Convenience Fee
          </h2>
          <p className="mt-2 text-gray-600">Get smoking accessories, fresheners & more in minutes!</p>
          <button className="mt-4 cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-bold text-white transition-transform hover:scale-105">
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
            <div 
              key={category.name} 
              className="cursor-pointer text-center transition-transform hover:scale-105"
              onClick={() => handleCategoryClick(category.name)}
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="mx-auto h-20 w-20 object-contain md:h-24 md:w-24"
              />
              <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-medium text-gray-700 md:text-sm">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Grid - Fruits & Vegetables */}
      {/* <ProductGrid title="Fruits & Vegetables" categorySlug="fruits-vegetables" products={vegetables} /> */}

      {/* Rice Section */}
      <ProductCarousel title="Rice" categorySlug="rice" products={rice} />

      {/* Dal & Pulses Section */}
      <ProductCarousel title="Dal & Pulses" categorySlug="dal-pulses" products={dalsPulses} />

      {/* Spices & Seasonings Section */}
      <ProductCarousel title="Spices & Seasonings" categorySlug="spices-seasonings" products={spicesSeasonings} />

      {/* Chips & Crisps Section */}
      <ProductCarousel title="Chips & Crisps" categorySlug="chips-crisps" products={chipsCrisps} />

      {/* Juices & Healthy Drinks Section */}
      <ProductCarousel title="Juices & Healthy Drinks" categorySlug="juices-healthy-drinks" products={juicesHealthyDrinks} />

      {/* Legacy sections */}
      <ProductCarousel title="Salt, Sugar & Jaggery" products={sugarAndJaggery} />
    </div>
  );
};

export default HomePage;
