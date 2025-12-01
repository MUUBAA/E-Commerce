import React from 'react';

interface CategoryBannerProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundColor: string;
  isDark?: boolean;
  onClick?: () => void;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({
  imageUrl,
  title,
  subtitle,
  buttonText,
  backgroundColor,
  isDark = false,
  onClick,
}) => {
  return (
    <div
      className={`flex items-center justify-between rounded-2xl p-4 shadow-sm ${backgroundColor} ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}
    >
      <div className="flex-1">
        <h2 className="text-lg font-bold md:text-xl">{title}</h2>
        <p className="mt-1 text-sm opacity-90">{subtitle}</p>
        <button 
          className={`mt-3 cursor-pointer rounded-lg px-4 py-2 text-sm font-bold transition-transform hover:scale-105 ${
            isDark 
              ? 'bg-white text-gray-800' 
              : 'bg-gray-800 text-white'
          }`}
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
      <img
        src={imageUrl}
        alt={title}
        className="h-20 w-20 object-contain md:h-24 md:w-24"
      />
    </div>
  );
};

export default CategoryBanner;
