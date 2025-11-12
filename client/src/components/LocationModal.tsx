import React, { useEffect, useState, useRef, useCallback } from 'react';
import { X, Search, Navigation } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getDecryptedJwt } from '../../utils/auth';
import { MapContainer, Marker, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import { Icon, Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalView = 'location' | 'map';

type LatLng = {
  lat: number;
  lng: number;
};

const defaultLocation: LatLng = { lat: 12.9716, lng: 77.5946 };

const leafletMarkerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const [currentView, setCurrentView] = useState<ModalView>('location');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LatLng>(defaultLocation);
  const [addressPreview, setAddressPreview] = useState<string>('');
  const mapRef = useRef<LeafletMap | null>(null);

  const setMapInstance = useCallback((map: LeafletMap) => {
    mapRef.current = map;
  }, []);

  const geoApiKey = (import.meta as any)?.env?.VITE_GEO_API_KEY || '8eb348cc908a4478b167b2c15e15fa17';

  const buildGeoApiUrl = (query: string) => {
    const override = (import.meta as any)?.env?.VITE_GEO_API_URL as string | undefined;
    if (override) {
      let url = override;
      if (override.includes('{query}')) {
        url = url.replace('{query}', encodeURIComponent(query));
      } else {
        const separator = override.includes('?') ? '&' : '?';
        url = `${override}${separator}q=${encodeURIComponent(query)}`;
      }
      if (url.includes('{key}')) {
        url = url.replace('{key}', geoApiKey);
      } else {
        url += url.includes('?') ? `&key=${geoApiKey}` : `?key=${geoApiKey}`;
      }
      return url;
    }
    return `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${geoApiKey}`;
  };

  const requestGeoData = async (query: string) => {
    const url = buildGeoApiUrl(query);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Geo API failed');
    }
    return response.json();
  };

  const reverseGeocodeWithKey = async (lat: number, lon: number) => {
    const data = await requestGeoData(`${lat}+${lon}`);
    const formatted =
      data?.results?.[0]?.formatted ||
      data?.display_name ||
      data?.features?.[0]?.properties?.display_name ||
      `${lat},${lon}`;
    return formatted as string;
  };

  const forwardGeocodeWithKey = async (query: string) => {
    const data = await requestGeoData(query);
    const result = data?.results?.[0];
    if (!result) {
      throw new Error('Location not found');
    }
    return {
      coords: {
        lat: result.geometry.lat,
        lng: result.geometry.lng,
      } as LatLng,
      formatted: result.formatted as string || query,
    };
  };

  const fetchAddressPreview = async (coords: LatLng) => {
    setIsPreviewLoading(true);
    try {
      const formatted = await reverseGeocodeWithKey(coords.lat, coords.lng);
      setAddressPreview(formatted);
    } catch (error) {
      setAddressPreview('');
    } finally {
      setIsPreviewLoading(false);
    }
  };

  useEffect(() => {
    if (currentView === 'map' && mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
        mapRef.current?.flyTo([selectedLocation.lat, selectedLocation.lng], 15);
      }, 120);
    }
  }, [currentView, selectedLocation]);

  const saveAddressToBackend = async (address: string) => {
    const token = getDecryptedJwt();
    if (!token) throw new Error('Not authenticated');
    const inferredBase =
      (typeof window !== 'undefined' && window.location.origin.includes('5015'))
        ? 'https://localhost:5200'
        : '';
    const base = (import.meta as any)?.env?.VITE_API_BASE_URL || inferredBase;
    await axios.put(
      `${base}/users/address`,
      { address },
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );
  };

  const handleAddNewAddress = () => {
    setCurrentView('map');
    setAddressPreview('');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const coords: LatLng = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setSelectedLocation(coords);
          await fetchAddressPreview(coords);
        },
        () => undefined,
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  };

  const handleBackToLocation = () => {
    setCurrentView('location');
  };

  const handleUseCurrentLocation = async (saveImmediately: boolean) => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser.');
      return;
    }
    setIsSubmitting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords: LatLng = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        try {
          if (saveImmediately) {
            const address = await reverseGeocodeWithKey(coords.lat, coords.lng);
            await saveAddressToBackend(address);
            toast.success('Address saved');
            onClose();
          } else {
            setSelectedLocation(coords);
            mapRef.current?.flyTo([coords.lat, coords.lng], 16);
            await fetchAddressPreview(coords);
          }
        } catch (e: any) {
          toast.error(typeof e?.message === 'string' ? e.message : 'Failed to update address');
        } finally {
          setIsSubmitting(false);
        }
      },
      (err) => {
        toast.error(err?.message || 'Failed to get location');
        setIsSubmitting(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleSearchLocation = async () => {
    if (!searchQuery.trim()) {
      toast.warn('Enter a location to search');
      return;
    }
    setIsSearching(true);
    try {
      const { coords, formatted } = await forwardGeocodeWithKey(searchQuery);
      setSelectedLocation(coords);
      setAddressPreview(formatted);
      mapRef.current?.flyTo([coords.lat, coords.lng], 16);
    } catch (e: any) {
      toast.error(typeof e?.message === 'string' ? e.message : 'Failed to find location');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSavePinnedLocation = async () => {
    setIsSubmitting(true);
    try {
      const address =
        addressPreview || (await reverseGeocodeWithKey(selectedLocation.lat, selectedLocation.lng));
      await saveAddressToBackend(address);
      toast.success('Address saved');
      onClose();
    } catch (e: any) {
      toast.error(typeof e?.message === 'string' ? e.message : 'Failed to save address');
    } finally {
      setIsSubmitting(false);
    }
  };

  const MapInstanceSetter = ({ setMap }: { setMap: (map: LeafletMap) => void }) => {
    const map = useMap();
    useEffect(() => {
      setMap(map);
    }, [map, setMap]);
    return null;
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click: (event) => {
        const coords: LatLng = { lat: event.latlng.lat, lng: event.latlng.lng };
        setSelectedLocation(coords);
        fetchAddressPreview(coords);
      },
    });

    useEffect(() => {
      map.flyTo([selectedLocation.lat, selectedLocation.lng], map.getZoom());
    }, [map, selectedLocation]);

    return (
      <Marker
        position={[selectedLocation.lat, selectedLocation.lng]}
        draggable
        icon={leafletMarkerIcon}
        eventHandlers={{
          dragend: (event) => {
            const latLng = event.target.getLatLng();
            const coords: LatLng = { lat: latLng.lat, lng: latLng.lng };
            setSelectedLocation(coords);
            fetchAddressPreview(coords);
          },
        }}
      />
    );
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
          onClick={() => handleUseCurrentLocation(true)}
          className="rounded-lg border border-pink-500 px-4 py-2 text-sm font-medium text-pink-500 transition-colors hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Enable'}
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
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200 p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for an address or landmark"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button
            onClick={handleSearchLocation}
            disabled={isSearching}
            className="rounded-lg bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSearching ? 'Searching…' : 'Search'}
          </button>
        </div>
      </div>

      <div className="flex-1">
        <MapContainer
          center={[selectedLocation.lat, selectedLocation.lng]}
          zoom={16}
          scrollWheelZoom
          className="h-full w-full"
          style={{ minHeight: '320px' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <MapInstanceSetter setMap={setMapInstance} />
          <LocationMarker />
        </MapContainer>
      </div>

      <div className="border-t border-gray-200 bg-white p-4">
        <div className="mb-3 text-sm text-gray-700">
          {isPreviewLoading
            ? 'Resolving address…'
            : addressPreview || 'Tap on the map or drag the pin to set your delivery location.'}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => handleUseCurrentLocation(false)}
            className="flex-1 rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Use Current Location
          </button>
          <button
            onClick={handleSavePinnedLocation}
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-pink-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Saving…' : 'Save Location'}
          </button>
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