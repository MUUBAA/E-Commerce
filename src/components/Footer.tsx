import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-100 p-4 border-t border-gray-200">
      <h2 className="font-bold text-lg mb-2">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-4">
        <a href="#" className="text-gray-800 hover:underline">Fruits & Vegetables</a>
        <a href="#" className="text-gray-800 hover:underline">Atta, Rice, Oil & Dals</a>
        <a href="#" className="text-gray-800 hover:underline">Masala & Dry Fruits</a>
        <a href="#" className="text-gray-800 hover:underline">Sweet Cravings</a>
        <a href="#" className="text-gray-800 hover:underline">Frozen Food & Ice Creams</a>
        <a href="#" className="text-gray-800 hover:underline">Baby Food</a>
        <a href="#" className="text-gray-800 hover:underline">Dairy, Bread & Eggs</a>
        <a href="#" className="text-gray-800 hover:underline">Cold Drinks & Juices</a>
        <a href="#" className="text-gray-800 hover:underline">Munchies</a>
        <a href="#" className="text-gray-800 hover:underline">Meats, Fish & Eggs</a>
        <a href="#" className="text-gray-800 hover:underline">Breakfast & Sauces</a>
        <a href="#" className="text-gray-800 hover:underline">Tea, Coffee & More</a>
        <a href="#" className="text-gray-800 hover:underline">Biscuits</a>
        <a href="#" className="text-gray-800 hover:underline">Makeup & Beauty</a>
        <a href="#" className="text-gray-800 hover:underline">Bath & Body</a>
        <a href="#" className="text-gray-800 hover:underline">Cleaning Essentials</a>
        <a href="#" className="text-gray-800 hover:underline">Home Needs</a>
        <a href="#" className="text-gray-800 hover:underline">Electricals & Accessories</a>
        <a href="#" className="text-gray-800 hover:underline">Hygiene & Grooming</a>
        <a href="#" className="text-gray-800 hover:underline">Health & Baby Care</a>
        <a href="#" className="text-gray-800 hover:underline">Homegrown Brands</a>
        <a href="#" className="text-gray-800 hover:underline">Paan Corner</a>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <h1 className="text-4xl font-bold text-red-600 italic mb-2">zepto</h1>
          <div className="flex space-x-2">
            <a href="#" className="text-gray-800 hover:text-red-600">IG</a>
            <a href="#" className="text-gray-800 hover:text-red-600">TW</a>
            <a href="#" className="text-gray-800 hover:text-red-600">FB</a>
            <a href="#" className="text-gray-800 hover:text-red-600">LI</a>
          </div>
          <p className="text-sm text-gray-500 mt-2">© Zepto Marketplace Private Limited</p>
        </div>
        <div className="w-full md:w-1/6">
          <h3 className="font-bold">Home</h3>
          <a href="#" className="block mt-1 text-gray-800 hover:underline">Delivery Areas</a>
          <a href="#" className="block mt-1 text-gray-800 hover:underline">Careers</a>
          <a href="#" className="block mt-1 text-gray-800 hover:underline">Customer Support</a>
          <a href="#" className="block mt-1 text-gray-800 hover:underline">Press</a>
        </div>
        <div className="w-full md:w-1/6">
          <h3 className="font-bold">Privacy Policy</h3>
          <a href="#" className="block mt-1 text-gray-800 hover:underline">Terms of Use</a>
          <a href="#" className="block mt-1 text-gray-800 hover:underline">Responsible Disclosure Policy</a>
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="font-bold">Download App</h3>
          <div className="mt-2">
            <img src="https://i.ibb.co/GQLD9DP/google-play.png" alt="Get it on Google Play" className="w-36" />
          </div>
          <div className="mt-2">
            <img src="https://i.ibb.co/rfn23Y3/app-store.png" alt="Download on the App Store" className="w-36" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
