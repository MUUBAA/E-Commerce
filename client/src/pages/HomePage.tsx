import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
import ProductGrid from '../components/ProductGrid';

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

const buyAgain = [
    { name: 'All Items', imageUrl: 'https://i.ibb.co/mHw3f6h/all.png' },
    { name: 'Nest Cafe', imageUrl: 'https://i.ibb.co/9TRc4Tq/cafe.png' },
    { name: 'Fruits & Vegetables', imageUrl: 'https://i.ibb.co/bJC2wT9/vegetables.png' },
    { name: 'Dairy Products', imageUrl: 'https://i.ibb.co/VvZv1pP/dairy.png' },
    { name: 'Snacks & Drinks', imageUrl: 'https://i.ibb.co/KKhs02W/packaged.png' },
    { name: 'Grocery & Kitchen', imageUrl: 'https://i.ibb.co/Jq6M2hM/atta.png' },
    { name: 'Sweets & Chocolates', imageUrl: 'https://i.ibb.co/B2k0L1P/icecream.png' },
    { name: 'Beauty & Personal...', imageUrl: 'https://i.ibb.co/tZ2M4NL/beauty.png' },
    { name: 'Household Essentials', imageUrl: 'https://i.ibb.co/LQrSc2f/household.png' },
];

const vegetables = [
  {
    name: 'Fresh Onion',
    price: '₹26',
    originalPrice: '₹54',
    discount: '₹28 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/483611a.jpg?ts=1641540272',
    weight: '1 Pack / 900 -1000 gm',
  },
  {
    name: 'Coriander leaves',
    price: '₹8',
    originalPrice: '₹16',
    discount: '₹8 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/462971a.jpg?ts=1667826193',
    weight: '1 pack (100 g)',
  },
  {
    name: 'Nandini Fresh Toned Fresh Milk (Pouch Blue)',
    price: '₹24',
    originalPrice: '₹30',
    discount: '₹6 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481850a.jpg?ts=1690813329',
    weight: '1 pack (500 ml)',
  },
  {
    name: 'Nandini Thick Curd Pouch',
    price: '₹27',
    originalPrice: '₹30',
    discount: '₹3 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/172a.jpg?ts=1688629928',
    weight: '1 pack (500 g)',
  },
  {
    name: 'Banana Robusta',
    price: '₹21',
    originalPrice: '₹39',
    discount: '₹18 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/1000109a.jpg?ts=1689339414',
    weight: '4 pcs',
  },
  {
    name: 'Chilli Green',
    price: '₹17',
    originalPrice: '₹31',
    discount: '₹14 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/160a.jpg?ts=1692884708',
    weight: '100 g',
  },
  {
    name: 'Tomato Local',
    price: '₹20',
    originalPrice: '₹37',
    discount: '₹17 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/448141a.jpg?ts=1692018823',
    weight: '500 g',
  },
  {
    name: 'Cauliflower',
    price: '₹33',
    originalPrice: '₹70',
    discount: '₹37 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/448141a.jpg?ts=1692018823',
    weight: '1 pc',
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
];

const rice = [
  {
    name: 'Shree Akshara Premium Steam Sona Masoori Rice',
    price: '₹474',
    originalPrice: '₹750',
    discount: '₹276 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/b5ac6b32-7e46-4b15-9fa7-16dd8334b59e.jpg?ts=1709800030',
    rating: 4.8,
    reviews: '995',
    weight: '1 pack (10 kg)',
  },
  {
    name: 'India Gate Gold Standard Classic Basmati Rice | 2 Year...',
    price: '₹1069',
    originalPrice: '₹1255',
    discount: '₹186 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/c2f5e39b-f9c7-4af2-bd66-85e8f8e86ccf.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '607',
    weight: '1 pack (5 kg)',
  },
  {
    name: 'Daily Good Sona Masoori Raw Rice',
    price: '₹72',
    originalPrice: '₹100',
    discount: '₹28 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/a25bb0a6-7e46-45e6-9cf0-3db0b2c8b1fc.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '13.9k',
    weight: '1 pack (1 kg)',
  },
  {
    name: 'Daawat Sona Masoori',
    price: '₹76',
    originalPrice: '₹95',
    discount: '₹19 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/d2e6b0a6-7e46-45e6-9cf0-3db0b2c8b1fc.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '1.3k',
    weight: '1 pack (1 kg)',
  },
  {
    name: 'India Gate Flavourful and Fine Dubar Basmati Rice | Long...',
    price: '₹131',
    originalPrice: '₹146',
    discount: '₹15 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/e3f7c2b0-7e46-45e6-9cf0-3db0b2c8b1fc.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '14.8k',
    weight: '1 pack (1 kg)',
  },
  {
    name: 'Daily Good Sona Masoori Raw Rice',
    price: '₹299',
    originalPrice: '₹500',
    discount: '₹201 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/f4g8h2c0-7e46-45e6-9cf0-3db0b2c8b1fc.jpg?ts=1709800030',
    rating: 4.5,
    reviews: '2.9k',
    weight: '1 pack (5 kg)',
  },
  {
    name: 'Daawat Rozana Super Basmati Rice | Medium Grain',
    price: '₹79',
    originalPrice: '₹100',
    discount: '₹21 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/h5j9k3d0-7e46-45e6-9cf0-3db0b2c8b1fc.jpg?ts=1709800030',
    rating: 4.3,
    reviews: '74.5k',
    weight: '1 pack (1 kg)',
  },
  {
    name: 'Daily Good Idli Rice',
    price: '₹58',
    originalPrice: '₹100',
    discount: '₹42 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/i6k0l4e0-7e46-45e6-9cf0-3db0b2c8b1fc.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '3.4k',
    weight: '1 pack (1 kg)',
  },
];

const dalsPulses = [
  {
    name: 'Tata Sampann Unpolished Toor Dal-Arhar Dal',
    price: '₹142',
    originalPrice: '₹210',
    discount: '₹68 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/a1b2c3d4-1234-5678-9abc-def123456789.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '42.4k',
    weight: '1 pack (1 kg)',
  },
  {
    name: 'Sri Bhagyalakshmi Ground Nut',
    price: '₹81',
    originalPrice: '₹110',
    discount: '₹29 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/b2c3d4e5-2345-6789-abcd-ef0123456789.jpg?ts=1709800030',
    rating: 4.5,
    reviews: '11.0k',
    weight: '1 pack (500 g)',
  },
  {
    name: 'Sri Bhagyalakshmi Fried Gram',
    price: '₹63',
    originalPrice: '₹80',
    discount: '₹17 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/c3d4e5f6-3456-789a-bcde-f01234567890.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '8.0k',
    weight: '1 pack (500 g)',
  },
  {
    name: 'Tata Sampann Unpolished Green Moong',
    price: '₹68',
    originalPrice: '₹94',
    discount: '₹26 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/d4e5f6g7-4567-89ab-cdef-012345678901.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '23.6k',
    weight: '1 pack (500 g)',
  },
  {
    name: 'Tata Sampann Unpolished Moong Dal',
    price: '₹76',
    originalPrice: '₹104',
    discount: '₹28 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/e5f6g7h8-5678-9abc-def0-123456789012.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '36.5k',
    weight: '1 pack (500 g)',
  },
  {
    name: 'Tata Sampann Unpolished Toor Dal | Arhar Dal',
    price: '₹75',
    originalPrice: '₹106',
    discount: '₹31 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/f6g7h8i9-6789-abcd-ef01-234567890123.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '39.8k',
    weight: '1 pack (500 g)',
  },
  {
    name: 'Tata Sampann Unpolished Moong Dal',
    price: '₹146',
    originalPrice: '₹207',
    discount: '₹61 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/g7h8i9j0-789a-bcde-f012-345678901234.jpg?ts=1709800030',
    rating: 4.8,
    reviews: '17.0k',
    weight: '1 pack (1 kg)',
  },
  {
    name: 'Daily Good Raw Peanut / Singdana',
    price: '₹84',
    originalPrice: '₹150',
    discount: '₹66 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/h8i9j0k1-89ab-cdef-0123-456789012345.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '55.0k',
    weight: '1 pack (500 g)',
  },
];

const spicesSeasonings = [
  {
    name: 'Catch Jeera Whole',
    price: '₹43',
    originalPrice: '₹68',
    discount: '₹25 OFF',
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
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/j9k0l1m2-9abc-def0-1234-567890123456.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '6.0k',
    weight: '1 pack (100 g)',
  },
  {
    name: 'Aashirvaad Turmeric/Haldi Powder',
    price: '₹25',
    originalPrice: '₹40',
    discount: '₹15 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/k0l1m2n3-abcd-ef01-2345-678901234567.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '45.3k',
    weight: '1 pack (100 g)',
  },
  {
    name: 'Daily Good Chilli With Stem / Guntur With Stem',
    price: '₹34',
    originalPrice: '₹90',
    discount: '₹56 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/l1m2n3o4-bcde-f012-3456-789012345678.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '12.9k',
    weight: '1 pack (100 g)',
  },
  {
    name: 'Catch Ginger Garlic Paste',
    price: '₹25',
    originalPrice: '₹47',
    discount: '₹22 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/m2n3o4p5-cdef-0123-4567-890123456789.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '27.5k',
    weight: '1 pack (200 g)',
  },
  {
    name: 'Maggi Masala-ae-Magic Sabzi Masala',
    price: '₹51',
    originalPrice: '₹60',
    discount: '₹9 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/n3o4p5q6-def0-1234-5678-901234567890.jpg?ts=1709800030',
    rating: 4.8,
    reviews: '52.3k',
    weight: '1 pack (72 g)',
  },
  {
    name: 'Daily Good Till - Sesame White',
    price: '₹29',
    originalPrice: '₹70',
    discount: '₹41 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/o4p5q6r7-ef01-2345-6789-012345678901.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '14.6k',
    weight: '1 pack (100 g)',
  },
  {
    name: 'Eastern Chilli Powder',
    price: '₹24',
    originalPrice: '₹40',
    discount: '₹16 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/p5q6r7s8-f012-3456-789a-123456789012.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '8.7k',
    weight: '1 pack (100 g)',
  },
];

const chipsCrisps = [
  {
    name: 'Uncle Chips Spicy Treat',
    price: '₹30',
    originalPrice: '₹50',
    discount: '₹20 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/q6r7s8t9-0123-4567-89ab-234567890123.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '73.6k',
    weight: '1 pack (80 g)',
  },
  {
    name: 'Bingo! Original Style Chilli Sprinkled - Flat Cut Spicy Potato...',
    price: '₹29',
    originalPrice: '₹50',
    discount: '₹21 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/r7s8t9u0-1234-5678-9abc-345678901234.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '361.3k',
    weight: '1 pack (85 g)',
  },
  {
    name: 'Uncle Chips Plain Salted',
    price: '₹30',
    originalPrice: '₹50',
    discount: '₹20 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/s8t9u0v1-2345-6789-abcd-456789012345.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '22.7k',
    weight: '1 pack (80 g)',
  },
  {
    name: '4700BC Chips+ Hawaiian Barbeque Popped Corn-Based',
    price: '₹37',
    originalPrice: '₹46',
    discount: '₹9 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/t9u0v1w2-3456-789a-bcde-567890123456.jpg?ts=1709800030',
    rating: 4.5,
    reviews: '1.3k',
    weight: '1 pack (55 g)',
  },
  {
    name: 'Crax Korean Ramen Noodle Puff Chips',
    price: '₹28',
    originalPrice: '₹60',
    discount: '₹32 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/u0v1w2x3-4567-89ab-cdef-678901234567.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '2.2k',
    weight: '1 pack (70 g)',
  },
  {
    name: 'Cheetos Masala Balls, Crispy Chips & Snacks',
    price: '₹28',
    originalPrice: '₹50',
    discount: '₹22 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/v1w2x3y4-5678-9abc-def0-789012345678.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '30.3k',
    weight: '1 pack (84 g)',
  },
  {
    name: 'Sweet Karam Coffee - No Palm Oil Potato Chips - Guntur Red...',
    price: '₹49',
    originalPrice: '₹59',
    discount: '₹10 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/w2x3y4z5-6789-abcd-ef01-890123456789.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '516',
    weight: '1 pack (60 g)',
  },
  {
    name: 'Namaskaram Beetroot Chips',
    price: '₹66',
    originalPrice: '₹75',
    discount: '₹9 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/x3y4z5a6-789a-bcde-f012-901234567890.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '4.3k',
    weight: '1 pack (100 g)',
  },
];

const juicesHealthyDrinks = [
  {
    name: 'Dabur Hommade Organic Coconut Milk',
    price: '₹74',
    originalPrice: '₹89',
    discount: '₹15 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/y4z5a6b7-89ab-cdef-0123-012345678901.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '9.9k',
    weight: '1 pc (200 ml)',
  },
  {
    name: 'Sofit Vanilla Soy Milk',
    price: '₹111',
    originalPrice: '₹145',
    discount: '₹34 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/z5a6b7c8-9abc-def0-1234-123456789012.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '4.7k',
    weight: '1 pc (1 L)',
  },
  {
    name: 'Sofit Chocolate Soy Milk',
    price: '₹122',
    originalPrice: '₹155',
    discount: '₹33 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/a6b7c8d9-abcd-ef01-2345-234567890123.jpg?ts=1709800030',
    rating: 4.6,
    reviews: '1.5k',
    weight: '1 pc (1 L)',
  },
  {
    name: 'Sofit Chocolate Soy Milk',
    price: '₹33',
    originalPrice: '₹40',
    discount: '₹7 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/b7c8d9e0-bcde-f012-3456-345678901234.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '1.8k',
    weight: '1 pc (180 ml)',
  },
  {
    name: 'Storia Tender Coconut Water',
    price: '₹90',
    originalPrice: '₹170',
    discount: '₹80 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/c8d9e0f1-cdef-0123-4567-456789012345.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '31.2k',
    weight: '1 pc (1 L or 1.01 L)',
  },
  {
    name: 'Alt Co. Oat Drink',
    price: '₹234',
    originalPrice: '₹266',
    discount: '₹32 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/d9e0f1g2-def0-1234-5678-567890123456.jpg?ts=1709800030',
    rating: 4.3,
    reviews: '1.2k',
    weight: '1 pc (1 L)',
  },
  {
    name: 'Mogu Mogu Imported Lychee Fruit Juice',
    price: '₹57',
    originalPrice: '₹70',
    discount: '₹13 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/e0f1g2h3-ef01-2345-6789-678901234567.jpg?ts=1709800030',
    rating: 4.7,
    reviews: '17.5k',
    weight: '1 pc (320 ml)',
  },
  {
    name: 'So Good Plant Based Almond Milk',
    price: '₹229',
    originalPrice: '₹300',
    discount: '₹71 OFF',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/large_images/jpeg/f1g2h3i4-f012-3456-789a-789012345678.jpg?ts=1709800030',
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

  const handleBuyAgainClick = (categoryName: string) => {
    // Map buy again items to their routes
    const categoryRoutes: Record<string, string> = {
      'All Items': '/',
      'Nest Cafe': '/cafe',
      'Fruits & Vegetables': '/fresh',
      'Dairy Products': '/dairy',
      'Snacks & Drinks': '/packaged-food',
      'Grocery & Kitchen': '/atta-rice-oil-dals',
      'Sweets & Chocolates': '/ice-creams-more',
      'Beauty & Personal...': '/beauty',
      'Household Essentials': '/home-kitchen',
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

      {/* Buy Again Section */}
      <div className="mb-8">
        <h2 className="mb-2 text-xl font-bold md:text-2xl">Buy Again</h2>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10">
          {buyAgain.map((category) => (
            <div 
              key={category.name} 
              className="cursor-pointer text-center transition-transform hover:scale-105"
              onClick={() => handleBuyAgainClick(category.name)}
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
      <ProductGrid title="Fruits & Vegetables" categorySlug="fruits-vegetables" products={vegetables} />

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
