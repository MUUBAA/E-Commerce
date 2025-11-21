import React from 'react';
import { Link } from 'react-router-dom';

const homepageCategories = [
  { name: 'Fruits & Vegetables', route: '/fresh' },
  { name: 'Rices & Oils', route: '/rice' },
  { name: 'Atta & Dals', route: '/dal-pulses' },
  { name: 'Spices & Seasonings', route: '/spices-seasonings' },
  { name: 'Chips & Crisps', route: '/chips-crisps' },
  { name: 'Nest Cafe', route: '/cafe' },
  { name: 'Juices & Healthy Drinks', route: '/juices-healthy-drinks' },
  { name: 'Salt, Sugar & Jaggery', route: '/salt-sugar-jaggery' },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 p-4 border-t border-gray-200">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="font-bold text-lg mb-2">Categories</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {homepageCategories.map((cat) => (
              <Link
                key={cat.route}
                to={cat.route}
                className="text-gray-800 hover:underline px-2 py-1 rounded cursor-pointer"
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <h1 className="text-3xl font-bold text-red-600 italic mb-1">Nest</h1>
            <p className="text-sm text-gray-500">© Nest Marketplace Private Limited</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
