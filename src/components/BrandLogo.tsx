import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'light';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'full',
}) => {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Emblem */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl transition-transform duration-200 shrink-0 ${
        isLight
          ? 'bg-white/15 text-white border border-white/20'
          : 'bg-[#0F6B5C] text-white shadow-xs'
      }`}>
        <span>خ</span>
      </div>

      {/* Typography */}
      <div className="flex flex-col text-right">
        <span className={`text-xl font-extrabold tracking-tight leading-none ${
          isLight ? 'text-white' : 'text-[#0F6B5C]'
        }`}>
          خدمة بيت
        </span>
        {variant !== 'compact' && (
          <span className={`text-[11px] font-semibold tracking-wider mt-1 leading-tight ${
            isLight ? 'text-[#BCC9C5]' : 'text-[#5C6B67]'
          }`}>
            خدمات منزلية متكاملة
          </span>
        )}
      </div>
    </div>
  );
};
