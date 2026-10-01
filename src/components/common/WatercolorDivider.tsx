import React from 'react';

interface WatercolorDividerProps {
  className?: string;
  variant?: 'leaves' | 'wave' | 'flourish';
}

export const WatercolorDivider: React.FC<WatercolorDividerProps> = ({
  className = '',
  variant = 'leaves',
}) => {
  return (
    <div className={`flex items-center justify-center gap-4 py-4 ${className}`} aria-hidden="true">
      <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#C6A16A]/50" />
      {variant === 'leaves' && (
        <div className="flex items-center gap-1.5 text-[#536B3F]">
          <svg className="w-4 h-4 transform -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.5 6.5 4 8.5C9 18 12 14 12 2z" fill="#536B3F" fillOpacity="0.2" />
            <path d="M12 2c5.5 0 10 4.5 10 10 0 3.5-1.5 6.5-4 8.5C15 18 12 14 12 2z" />
          </svg>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A16A]" />
          <svg className="w-4 h-4 transform rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.5 6.5 4 8.5C9 18 12 14 12 2z" fill="#536B3F" fillOpacity="0.2" />
            <path d="M12 2c5.5 0 10 4.5 10 10 0 3.5-1.5 6.5-4 8.5C15 18 12 14 12 2z" />
          </svg>
        </div>
      )}
      {variant === 'wave' && (
        <svg className="w-8 h-4 text-[#A5AD89]" viewBox="0 0 40 12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M0 6 Q10 0, 20 6 T40 6" />
        </svg>
      )}
      {variant === 'flourish' && (
        <span className="text-[#C6A16A] text-sm font-serif italic">§</span>
      )}
      <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#C6A16A]/50" />
    </div>
  );
};
