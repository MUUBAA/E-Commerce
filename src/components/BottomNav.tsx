import React from 'react';
import { Home, LayoutGrid, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/list', icon: LayoutGrid, label: 'Categories' },
  { href: '/checkout', icon: ShoppingCart, label: 'Cart' },
];

const BottomNav: React.FC = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg md:hidden">
      <div className="flex justify-around py-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = location.pathname === href;
          return (
            <Link
              key={href}
              to={href}
              className={`flex flex-col items-center justify-center w-full text-sm font-medium transition-colors ${
                isActive ? 'text-purple-600' : 'text-gray-500 hover:text-purple-600'
              }`}>
              <Icon className="h-6 w-6" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
