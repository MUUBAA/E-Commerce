import React, { useState } from 'react';
import { Coffee, Home, ToyBrick, Leaf, HardDrive, Smartphone, Sparkles, Shirt, MoreHorizontal } from 'lucide-react';

const subHeaderItems = [
  { label: 'All', icon: MoreHorizontal },
  { label: 'Cafe', icon: Coffee },
  { label: 'Home', icon: Home },
  { label: 'Toys', icon: ToyBrick },
  { label: 'Fresh', icon: Leaf },
  { label: 'Electronics', icon: HardDrive },
  { label: 'Mobiles', icon: Smartphone },
  { label: 'Beauty', icon: Sparkles },
  { label: 'Fashion', icon: Shirt },
];

const SubHeader: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="no-scrollbar -mb-px flex space-x-4 overflow-x-auto px-4">
        {subHeaderItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeIndex;

          return (
            <button
              key={item.label}
              onClick={() => setActiveIndex(index)}
              className={`flex items-center space-x-2 whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium transition-colors ${
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
