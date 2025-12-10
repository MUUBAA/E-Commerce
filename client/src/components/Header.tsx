import React, { useState } from 'react';
import { Search, ChevronDown, User, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import UserProfileSidebar from './UserProfileSidebar';
import LocationModal from './LocationModal';
import {  useSelector } from 'react-redux';
import type {  RootState } from '../../redux/stores';
// import { getCartItems } from '../../redux/thunk/cart';

import { useNavigate } from 'react-router-dom';
// import { getDecryptedJwt } from '../../utils/auth';
// import { jwtDecode } from 'jwt-decode';

const Header: React.FC = () => {
  const { openCart } = useCart();
  // const dispatch = useDispatch<AppDispatch>();
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmed = searchTerm.trim();
      if (trimmed.length > 0) {
        navigate(`/search?query=${encodeURIComponent(trimmed)}`);
      } else {
        navigate('/'); // Reset search results page
      }
    }
  };

  // Total items in cart (sum of quantities)
const cartCount = useSelector((state: RootState) =>
  state.cart?.totalItems ?? 0
);

  

  const handleCartClick = () => {
    // Open cart immediately - fetching will happen inside CartDrawer
    openCart();
  };

  const handleProfileClick = () => {
    setIsProfileSidebarOpen(true);
  };

  const handleLocationClick = () => {
    setIsLocationModalOpen(true);
  };

  const handleCloseProfileSidebar = () => {
    setIsProfileSidebarOpen(false);
  };

  const handleCloseLocationModal = () => {
    setIsLocationModalOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between p-2 md:p-4">
          <div className="flex items-center">
            <h1 
              className="font-italic text-4xl font-bold text-red-600 cursor-pointer hover:text-red-700 transition-colors"
              onClick={() => navigate('/')}
            >
             Nest
            </h1>
            <div 
              className="ml-4 hidden cursor-pointer items-center md:flex"
              onClick={handleLocationClick}
            >
              <span className="font-semibold">Select Location</span>
              <ChevronDown className="h-5 w-5" />
            </div>
          </div>

          <div className="flex-grow px-4 md:px-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for 'kurkure'"
                className="w-full rounded-xl border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 focus:border-red-500 focus:ring-red-500"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button 
              onClick={handleProfileClick}
              className="flex cursor-pointer items-center space-x-1 rounded-lg p-2 transition-colors hover:bg-gray-100"
            >
              <User className="h-6 w-6 text-gray-700" />
              <span className="hidden text-sm font-medium md:block">Profile</span>
            </button>
            <button 
              onClick={handleCartClick}
              className="relative flex cursor-pointer items-center space-x-1 rounded-lg p-2 transition-colors hover:bg-gray-100"
            >
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartCount > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-600 px-1 text-xs font-semibold text-white"
                  aria-label={`Cart items: ${cartCount}`}
                >
                  {cartCount}
                </span>
              )}
              <span className="hidden text-sm font-medium md:block">Cart</span>
            </button>
          </div>
        </div>
      </header>

      {/* User Profile Sidebar */}
      <UserProfileSidebar 
        isOpen={isProfileSidebarOpen} 
        onClose={handleCloseProfileSidebar} 
      />

      {/* Location Modal */}
      <LocationModal 
        isOpen={isLocationModalOpen} 
        onClose={handleCloseLocationModal} 
      />
    </>
  );
};

export default Header;