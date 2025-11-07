import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Coffee, Home, ToyBrick, Leaf, HardDrive, Smartphone, Sparkles, Shirt, MoreHorizontal } from 'lucide-react';

const subHeaderItems = [
  { label: 'All', icon: MoreHorizontal, path: '/' },
  { label: 'Cafe', icon: Coffee, path: '/cafe' },
  { label: 'Home', icon: Home, path: '/home-kitchen' },
  { label: 'Toys', icon: ToyBrick, path: '/toys' },
  { label: 'Fresh', icon: Leaf, path: '/fresh' },
  { label: 'Electronics', icon: HardDrive, path: '/electronics' },
  { label: 'Mobiles', icon: Smartphone, path: '/mobiles' },
  { label: 'Beauty', icon: Sparkles, path: '/beauty' },
  { label: 'Fashion', icon: Shirt, path: '/fashion' },
];

const SubHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveIndex = () => {
    const currentPath = location.pathname;
    const index = subHeaderItems.findIndex(item => item.path === currentPath);
    return index >= 0 ? index : 0; // Default to "All" if no match
  };

  const activeIndex = getActiveIndex();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="scrollbar-hide -mb-px flex space-x-4 overflow-x-auto px-4">
        {subHeaderItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeIndex;

          return (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.path)}
              className={`flex cursor-pointer items-center space-x-2 whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}>
              <Icon className={`h-5 w-5 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubHeader;
