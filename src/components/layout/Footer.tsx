import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  ShieldCheck,
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#263F27] text-[#F7F1E4] pt-16 pb-10 border-t border-[#344F34] relative overflow-hidden">
      
      {/* Delicate Botanical Leaf Silhouettes in Footer Background */}
      <div className="absolute top-0 right-0 w-80 h-80 text-[#536B3F]/10 pointer-events-none -z-0">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 C60 30, 90 40, 100 50 C70 60, 60 90, 50 100 C40 70, 10 60, 0 50 C30 40, 40 10, 50 0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#344F34]/70">
          
          {/* Column 1: Brand Info (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="p-1 rounded-xl bg-white/90 border border-[#EDE2CB]">
                <img
                  src="/images/image.png"
                  alt="Ruthved Organic Logo"
                  className="h-9 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#F7F1E4]">
                  Ruthved<span className="text-[#C6A16A] ml-1">Organic</span>
                </span>
                <span className="block text-[10.5px] uppercase tracking-widest text-[#A5AD89] font-medium">
                  Trust in Nature's Best
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#F7F1E4]/75 max-w-sm leading-relaxed font-normal">
              Ruthved Organic is dedicated to reviving authentic traditional Indian foods. Handcrafted
              A2 Desi Cow Bilona Ghee, virgin wood-pressed oils, and raw forest honey sourced ethically from smallholder farmers.
            </p>

            <div className="pt-2 flex items-center gap-3 text-[#A5AD89]">
              <a
                href={BUSINESS_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#344F34] hover:bg-[#C6A16A] hover:text-[#263F27] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#344F34] hover:bg-[#C6A16A] hover:text-[#263F27] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#344F34] hover:bg-[#C6A16A] hover:text-[#263F27] flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-base font-bold text-[#F7F1E4] tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F7F1E4]/75">
              <li>
                <Link to="/" className="hover:text-[#C6A16A] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#C6A16A] transition-colors">Shop All</Link>
              </li>
              <li>
                <Link to="/story" className="hover:text-[#C6A16A] transition-colors">Our Story</Link>
              </li>
              <li>
                <Link to="/why-us" className="hover:text-[#C6A16A] transition-colors">Why Choose Us</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#C6A16A] transition-colors">FAQs & Care</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C6A16A] transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-base font-bold text-[#F7F1E4] tracking-wide">
              Collections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F7F1E4]/75">
              <li>
                <Link to="/shop?category=ghee" className="hover:text-[#C6A16A] transition-colors">
                  A2 Desi Cow Ghee
                </Link>
              </li>
              <li>
                <Link to="/shop?category=oils" className="hover:text-[#C6A16A] transition-colors">
                  Cold-Pressed Oils
                </Link>
              </li>
              <li>
                <Link to="/shop?category=honey" className="hover:text-[#C6A16A] transition-colors">
                  Organic Raw Honey
                </Link>
              </li>
              <li>
                <Link to="/shop?category=wellness" className="hover:text-[#C6A16A] transition-colors">
                  Dhoop & Incense
                </Link>
              </li>
              <li>
                <Link to="/shop?category=combo" className="hover:text-[#C6A16A] transition-colors">
                  Traditional Combos
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-[#F7F1E4] tracking-wide">
              Reach Us
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#F7F1E4]/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6A16A] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address.fullFormatted}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C6A16A] shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-[#C6A16A] transition-colors">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C6A16A] shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-[#C6A16A] transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#344F34] text-[11px] font-semibold text-[#C6A16A]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>FSSAI Certified Brand</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A5AD89]">
          <p>© {new Date().getFullYear()} Ruthved Organic. All rights reserved. Handcrafted in India.</p>

          <div className="flex items-center gap-6 flex-wrap">
            <Link to="/faq" className="hover:text-[#F7F1E4] transition-colors">Shipping Policy</Link>
            <Link to="/faq" className="hover:text-[#F7F1E4] transition-colors">Refund & Cancellation</Link>
            <Link to="/contact" className="hover:text-[#F7F1E4] transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-[#F7F1E4] transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
