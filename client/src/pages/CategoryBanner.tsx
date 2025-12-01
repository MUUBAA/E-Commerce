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
    <div
      className={`flex items-center gap-8 rounded-3xl p-6 md:p-10 shadow-lg transition-transform hover:scale-[1.02] ${backgroundColor}`}
      style={{ minHeight: '170px' }}
    >
      <img
        src={imageUrl}
        alt={title}
        className="h-28 w-28 md:h-36 md:w-36 rounded-2xl object-cover shadow-md border-4 border-white flex-shrink-0"
      />
      <div className="flex-1">
        <h3
          className={`text-xl md:text-2xl font-extrabold mb-2 tracking-tight ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-base md:text-lg mb-4 font-medium ${
            isDark ? "text-gray-100" : "text-gray-700"
          }`}
        >
          {subtitle}
        </p>
        <button
          type="button"
          onClick={onClick}
          className={`inline-flex items-center px-5 py-2 rounded-full text-base font-bold shadow-md cursor-pointer transition-all duration-150
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
