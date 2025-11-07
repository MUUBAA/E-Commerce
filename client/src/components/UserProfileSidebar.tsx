import React, { useState } from 'react';
import { X, Package, MapPin, User, ChevronRight } from 'lucide-react';

interface UserProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type SidebarView = 'main' | 'orders' | 'address' | 'profile';

const UserProfileSidebar: React.FC<UserProfileSidebarProps> = ({ isOpen, onClose }) => {
  const [currentView, setCurrentView] = useState<SidebarView>('main');

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  const renderMainView = () => (
    <div className="p-6">
      {/* User Profile Header */}
      <div className="flex items-center mb-8">
        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
          <User className="h-8 w-8 text-white" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">Muba</h3>
          <p className="text-gray-600">7868982095</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        <button
          onClick={() => setCurrentView('orders')}
          className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <Package className="h-5 w-5 text-gray-600 mr-3" />
            <span className="text-gray-900 font-medium">Orders</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>

        <button
          onClick={() => setCurrentView('address')}
          className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-600 mr-3" />
            <span className="text-gray-900 font-medium">Address</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>

        <button
          onClick={() => setCurrentView('profile')}
          className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-600 mr-3" />
            <span className="text-gray-900 font-medium">Profile</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      {/* Log Out Button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button className="w-full text-left p-4 rounded-lg hover:bg-gray-50 transition-colors">
          <span className="text-gray-900 font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );

  const renderOrdersView = () => (
    <div className="p-6">
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <div className="w-8 h-8 bg-pink-500 rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-sm">Z</span>
          </div>
          <div className="absolute w-4 h-4 bg-red-500 rounded-full -mt-2 -mr-2"></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
        <button className="mt-6 cursor-pointer px-6 py-2 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 transition-colors">
          Browse products
        </button>
      </div>
    </div>
  );

  const renderAddressView = () => (
    <div className="p-6">
      {/* Add New Address Button */}
      <button className="w-full cursor-pointer flex items-center justify-between p-4 border border-dashed border-pink-300 rounded-lg hover:bg-pink-50 transition-colors mb-6">
        <span className="text-pink-500 font-medium">+ Add New Address</span>
        <ChevronRight className="h-5 w-5 text-pink-500" />
      </button>

      {/* Saved Addresses Section */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Saved Addresses</h4>
      </div>

      {/* No Address State */}
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <div className="w-16 h-20 bg-yellow-400 rounded-b-full transform rotate-12"></div>
          <div className="absolute w-2 h-2 bg-red-500 rounded-full -mt-4 -ml-2"></div>
          <div className="absolute w-1 h-1 bg-purple-500 rounded-full mt-2 ml-4"></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Address Added</h3>
        <p className="text-gray-600 text-sm">To see the saved address here, add your work or home address</p>
      </div>
    </div>
  );

  const renderProfileView = () => (
    <div className="p-6">
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
          <input
            type="text"
            defaultValue="Muba"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">We promise not to spam you</p>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
        >
          Submit
        </button>
      </form>

      {/* Delete Account Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-pink-500 font-semibold mb-2">Delete Account</h4>
        <p className="text-gray-600 text-sm">
          Deleting your account will remove all your orders, wallet amount and any active referral
        </p>
      </div>
    </div>
  );

  const getHeaderTitle = () => {
    switch (currentView) {
      case 'orders': return 'Orders';
      case 'address': return 'Address';
      case 'profile': return 'Profile';
      default: return 'Settings';
    }
  };

  return (
    <>
      {/* Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <button 
            onClick={currentView !== 'main' ? handleBackToMain : onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">{getHeaderTitle()}</h2>
          <div className="w-8" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {currentView === 'main' && renderMainView()}
          {currentView === 'orders' && renderOrdersView()}
          {currentView === 'address' && renderAddressView()}
          {currentView === 'profile' && renderProfileView()}
        </div>
      </div>
    </>
  );
};

export default UserProfileSidebar;