// src/components/CategoryBanner.tsx
import React from "react";

interface CategoryBannerProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundColor: string; // tailwind bg class
  isDark?: boolean;
  onClick?: () => void;    // 👈 add this
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
    <div className={`flex items-center rounded-2xl p-4 ${backgroundColor}`}>
      <img
        src={imageUrl}
        alt={title}
        className="h-20 w-20 rounded-xl object-cover mr-4 flex-shrink-0"
      />
      <div className="flex-1">
        <h3
          className={`text-sm font-bold mb-1 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-xs mb-3 ${
            isDark ? "text-gray-100" : "text-gray-600"
          }`}
        >
          {subtitle}
        </p>
        <button
          type="button"
          onClick={onClick}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer
            ${isDark
              ? "bg-white text-gray-900 hover:bg-gray-100"
              : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CategoryBanner;
