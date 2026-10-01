import React from 'react';
import { Leaf, MessageCircle, MapPin, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#263F27] text-[#F7F1E4] py-2 px-4 text-xs font-medium border-b border-[#344F34]/60 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-center sm:text-left">
        
        {/* Left: Brand Creed with Botanical Leaf */}
        <div className="hidden lg:flex items-center gap-2 text-[#A5AD89] text-[11.5px] tracking-wide">
          <Leaf className="w-3.5 h-3.5 text-[#C6A16A]" />
          <span className="font-serif italic font-semibold text-[#F7F1E4]">Pure. Traditional. Natural.</span>
          <span className="text-[#536B3F]">•</span>
          <span>Vedic Bilona Churned</span>
        </div>

        {/* Center: Verified Delivery Offer */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center text-[11.5px] sm:text-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A16A] animate-pulse hidden sm:inline" />
          <span className="text-[#F7F1E4]">
            Free Express Delivery on orders above <span className="text-[#C6A16A] font-semibold">₹999</span>
          </span>
          <span className="text-[#536B3F] hidden sm:inline">•</span>
          <span className="hidden sm:inline bg-[#344F34] px-2.5 py-0.5 rounded-full text-[10.5px] tracking-wider text-[#C6A16A] font-mono font-bold">
            CODE: FIRST15 (15% OFF)
          </span>
        </div>

        {/* Right: Location & WhatsApp */}
        <div className="hidden md:flex items-center gap-4 text-[#A5AD89] text-[11.5px]">
          <div className="flex items-center gap-1 hover:text-[#F7F1E4] transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#C6A16A]" />
            <span>Bengaluru, India</span>
          </div>
          <span className="text-[#536B3F]">•</span>
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#A5AD89] hover:text-[#C6A16A] transition-colors"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#C6A16A]" />
            <span className="font-medium">WhatsApp Support</span>
          </a>
        </div>
      </div>
    </div>
  );
};
