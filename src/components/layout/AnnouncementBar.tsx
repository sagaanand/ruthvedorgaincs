import React, { useState } from 'react';
import { Phone, Check, Copy, Tag, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo';

export const AnnouncementBar: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.promoOffer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-forest-950 text-ivory-100 py-2 px-4 text-xs font-medium border-b border-forest-900/80 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        
        {/* Left: Direct Support */}
        <div className="hidden md:flex items-center gap-4 text-ivory-200/80">
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="flex items-center gap-1.5 hover:text-saffron-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-saffron-500" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>
          <span className="text-forest-700">•</span>
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-leaf-400 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-leaf-400" />
            <span>WhatsApp Direct</span>
          </a>
        </div>

        {/* Center: Offer & Coupon Code */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-[11.5px]">
          <span className="text-saffron-400 font-bold tracking-wider flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            SPECIAL OFFER:
          </span>
          <span className="text-ivory-100 font-normal">{BUSINESS_INFO.promoOffer.bannerText}</span>
          <button
            onClick={handleCopyCode}
            type="button"
            className="inline-flex items-center gap-1 ml-1 px-2.5 py-0.5 rounded-full bg-saffron-500 hover:bg-saffron-600 text-white transition-all cursor-pointer font-mono text-[11px] shadow-xs active:scale-95"
            title="Click to copy coupon code"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-white" />
                <span className="font-sans font-bold">COPIED!</span>
              </>
            ) : (
              <>
                <span>USE: {BUSINESS_INFO.promoOffer.code}</span>
                <Copy className="w-3 h-3 opacity-90" />
              </>
            )}
          </button>
        </div>

        {/* Right: Certified Note */}
        <div className="hidden lg:flex items-center gap-1.5 text-leaf-300 text-right font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-leaf-400 animate-pulse" />
          <span>Vedic Bilona & Wood-Pressed Mara Chekku</span>
        </div>
      </div>
    </div>
  );
};
