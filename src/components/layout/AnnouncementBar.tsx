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
    <div className="bg-forest-900 text-ivory-100 py-2 px-4 text-xs font-medium border-b border-forest-800 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        
        {/* Left: Direct Support */}
        <div className="hidden md:flex items-center gap-4 text-ivory-200/80">
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="flex items-center gap-1.5 hover:text-gold-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-gold-500" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>
          <span className="text-forest-700">•</span>
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gold-400 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp Enquiry</span>
          </a>
        </div>

        {/* Center: Offer & Coupon Code */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-gold-400 font-semibold tracking-wider flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            SPECIAL OFFER:
          </span>
          <span>{BUSINESS_INFO.promoOffer.bannerText}</span>
          <button
            onClick={handleCopyCode}
            type="button"
            className="inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded bg-forest-800 hover:bg-gold-600/40 text-gold-300 border border-gold-500/30 transition-all cursor-pointer font-mono text-[11px]"
            title="Click to copy coupon code"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <span>USE: {BUSINESS_INFO.promoOffer.code}</span>
                <Copy className="w-3 h-3 text-gold-400 opacity-80" />
              </>
            )}
          </button>
        </div>

        {/* Right: Certified Note */}
        <div className="hidden lg:block text-ivory-200/70 text-right">
          <span>Traditional Bilona & Wood-Pressed Guarantee</span>
        </div>
      </div>
    </div>
  );
};
