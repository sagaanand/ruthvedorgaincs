import React from 'react';

interface BotanicalBackgroundProps {
  children: React.ReactNode;
  variant?: 'parchment' | 'watercolor' | 'ivory' | 'sage' | 'forest';
  className?: string;
  withBotanicalPattern?: boolean;
}

export const BotanicalBackground: React.FC<BotanicalBackgroundProps> = ({
  children,
  variant = 'parchment',
  className = '',
  withBotanicalPattern = true,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'watercolor':
        return 'bg-[#F7F1E4] bg-[url("/images/textures/watercolor-wash.jpg")] bg-cover bg-center';
      case 'ivory':
        return 'bg-[#F7F1E4] bg-[radial-gradient(#C6A16A_0.4px,transparent_0.4px)] [background-size:20px_20px]';
      case 'sage':
        return 'bg-[#EFF1EA] border-y border-[#A5AD89]/30';
      case 'forest':
        return 'bg-[#263F27] text-[#F7F1E4]';
      case 'parchment':
      default:
        return 'bg-[#F7F1E4] bg-[url("/images/textures/parchment.jpg")] bg-repeat [background-size:500px_auto] [background-blend-mode:multiply]';
    }
  };

  return (
    <div className={`relative overflow-hidden ${getVariantStyles()} ${className}`}>
      {withBotanicalPattern && variant !== 'forest' && (
        <>
          {/* Subtle botanical leaf silhouette in top right */}
          <svg
            className="absolute -top-12 -right-12 w-64 h-64 text-[#536B3F]/5 pointer-events-none -z-0"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M50 0 C60 30, 90 40, 100 50 C70 60, 60 90, 50 100 C40 70, 10 60, 0 50 C30 40, 40 10, 50 0 Z" />
          </svg>
          {/* Subtle botanical branch silhouette in bottom left */}
          <svg
            className="absolute -bottom-16 -left-12 w-72 h-72 text-[#C6A16A]/5 pointer-events-none -z-0"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <circle cx="50" cy="50" r="40" opacity="0.4" />
          </svg>
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
