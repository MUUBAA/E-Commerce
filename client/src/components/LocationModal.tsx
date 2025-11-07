import React, { useState } from 'react';
import { X, Search, MapPin, Navigation } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalView = 'location' | 'map';

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const [currentView, setCurrentView] = useState<ModalView>('location');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddNewAddress = () => {
    setCurrentView('map');
  };

  const handleBackToLocation = () => {
    setCurrentView('location');
  };

  const handleEnableLocation = () => {
    // Handle enable current location logic
    console.log('Enable current location');
  };

  const handleSearchLocation = () => {
    // Handle search location logic
    console.log('Search location:', searchQuery);
  };

  const renderLocationView = () => (
    <div className="p-6">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search a new address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Use Current Location */}
      <div className="mb-6 flex items-center justify-between rounded-lg border border-gray-200 p-4">
        <div className="flex items-center">
          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-pink-100">
            <Navigation className="h-4 w-4 text-pink-500" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Use My Current Location</h3>
            <p className="text-sm text-gray-600">Enable your current location for better services</p>
          </div>
        </div>
        <button
          onClick={handleEnableLocation}
          className="rounded-lg border border-pink-500 px-4 py-2 text-sm font-medium text-pink-500 transition-colors hover:bg-pink-50"
        >
          Enable
        </button>
      </div>

      {/* Add New Address */}
      <button
        onClick={handleAddNewAddress}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
      >
        <div className="flex items-center">
          <div className="mr-3 text-pink-500">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-medium text-pink-500">Add New Address</span>
        </div>
        <div className="text-gray-400">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  );

  const renderMapView = () => (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search a new address"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-gray-100 min-h-[300px]">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
          {/* Mock Streets */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-16 left-0 w-full h-0.5 bg-gray-400"></div>
            <div className="absolute top-32 left-0 w-full h-0.5 bg-gray-400"></div>
            <div className="absolute top-48 left-0 w-full h-0.5 bg-gray-400"></div>
            <div className="absolute top-0 left-16 w-0.5 h-full bg-gray-400"></div>
            <div className="absolute top-0 left-32 w-0.5 h-full bg-gray-400"></div>
            <div className="absolute top-0 left-48 w-0.5 h-full bg-gray-400"></div>
          </div>
        </div>

        {/* Mock Buildings/Areas */}
        <div className="absolute top-8 left-8 w-16 h-12 bg-green-200 rounded opacity-60 flex items-center justify-center">
          <span className="text-xs text-green-800 font-medium">School</span>
        </div>
        <div className="absolute top-16 right-12 w-20 h-8 bg-blue-200 rounded opacity-60 flex items-center justify-center">
          <span className="text-xs text-blue-800 font-medium">1st Cross Road</span>
        </div>

        {/* Location Pin */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
          <div className="relative">
            <MapPin className="h-8 w-8 text-pink-500 drop-shadow-lg" fill="currentColor" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Delivery Message */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-full">
          <div className="bg-black text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap">
            <div className="font-medium">Order will be delivered here</div>
            <div className="text-xs opacity-90">Place the pin to your exact location</div>
            {/* Arrow pointing down */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 bg-white border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-4 text-center">Select a delivery location</h3>
        
        <div className="flex space-x-3 mb-4">
          <button className="flex-1 cursor-pointer rounded-lg border border-gray-300 py-3 text-center text-gray-700 transition-colors hover:bg-gray-50">
            Search Location
          </button>
          <button className="flex-1 cursor-pointer rounded-lg bg-pink-500 py-3 text-center text-white transition-colors hover:bg-pink-600">
            Current Location
          </button>
        </div>

        {/* Selected Location */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="text-sm font-medium text-green-800">Smaraka Vidya</div>
          <div className="text-sm text-green-700">Kendra School</div>
        </div>
      </div>
    </div>
  );

  const getModalTitle = () => {
    switch (currentView) {
      case 'map': return 'Location Information';
      default: return 'Your Location';
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
      
      {/* Location Modal - Centered Overlay */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className={`relative bg-white rounded-2xl shadow-2xl w-full mx-auto overflow-hidden ${
          currentView === 'map' ? 'max-w-md h-[600px]' : 'max-w-sm'
        }`}>
          {/* Header */}
          <div className="relative flex items-center justify-between p-6 border-b border-gray-100">
            <button 
              onClick={currentView !== 'location' ? handleBackToLocation : onClose}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 w-full text-center">{getModalTitle()}</h2>
          </div>

          {/* Content */}
          <div className={`${currentView === 'map' ? 'flex-1 flex flex-col' : ''}`}>
            {currentView === 'location' && renderLocationView()}
            {currentView === 'map' && renderMapView()}
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationModal;