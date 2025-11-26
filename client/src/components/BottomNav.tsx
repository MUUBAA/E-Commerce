import React, { useState } from 'react';
import { Home, ShoppingCart, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/stores';
import LocationModal from './LocationModal';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const { openCart } = useCart();
  // Get cart count from Redux
  const cartCount = useSelector((state: RootState) => state.cart.totalItems || state.cart.items?.reduce((sum, i) => sum + (i.quantity || 0), 0) || 0);


  // Home, Location, Cart in nav row
  const navItems = [
    { href: '/', icon: Home, label: 'Home', type: 'link' as const },
    { action: () => setIsLocationModalOpen(true), icon: MapPin, label: 'Location', type: 'button' as const },
    { action: openCart, icon: ShoppingCart, label: 'Cart', type: 'button' as const },
  ];

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  return (
    <>
      {/* Location Modal for Mobile */}
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg md:hidden">
        <div className="flex justify-around py-2">
          {navItems.map((item, index) => {
            if (item.type === 'link') {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href!}
                  className={`flex cursor-pointer flex-col items-center justify-center w-full text-sm font-medium transition-colors ${
                    isActive ? 'text-purple-600' : 'text-gray-500 hover:text-purple-600'
                  }`}>
                  <span className="relative">
                    <item.icon className="h-6 w-6" />
                    {item.label === 'Cart' && cartCount > 0 && (
                      <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center font-bold border border-white shadow">
                        {cartCount}
                      </span>
                    )}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            } else {
              return (
                <button
                  key={index}
                  onClick={item.action}
                  className={`flex cursor-pointer flex-col items-center justify-center w-full text-sm font-medium transition-colors ${
                  (item.label === 'Location' && isLocationModalOpen) || (item.label === 'Cart' && location.pathname === '/cart')
                    ? 'text-purple-600'
                    : 'text-gray-500 hover:text-purple-600'
                  }`}
                  aria-label={item.label}
                >
                  <item.icon className="h-6 w-6" />
                  <span>{item.label}</span>
                </button>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default BottomNav;
