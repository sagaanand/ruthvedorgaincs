import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  ShieldCheck,
  Heart,
  Sparkles
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-forest-950 text-ivory-100 pt-16 pb-8 border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Strip */}
        <div className="bg-gradient-to-r from-forest-900 via-[#1a2f18] to-forest-900 rounded-3xl p-6 sm:p-10 mb-14 border border-forest-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-elevated relative overflow-hidden">
          
          <div className="absolute right-0 top-0 w-64 h-64 bg-saffron-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-xl text-center md:text-left relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-500/20 border border-saffron-500/30 text-saffron-400 text-xs uppercase tracking-widest font-bold">
              <Sparkles className="w-3 h-3 text-saffron-400" />
              Join The Pure Living Circle
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold mt-2">
              Receive 15% off your first order & seasonal harvest updates
            </h3>
            <p className="text-forest-200/80 text-sm mt-2">
              Learn about traditional wellness, recipes with A2 Bilona ghee, and newly pressed cold-pressed oils.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md relative z-10">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3 rounded-full bg-forest-950/90 border border-forest-700 text-ivory-100 placeholder:text-forest-400 text-sm focus:outline-none focus:border-saffron-500 focus:ring-1 focus:ring-saffron-500 transition-colors"
              />
              <button
                type="submit"
                className="btn-saffron whitespace-nowrap text-xs py-3 px-7 shadow-glow-orange flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            {subscribed && (
              <p className="text-leaf-400 text-xs mt-2 flex items-center gap-1.5 justify-center md:justify-start font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                Thank you for subscribing! Your 15% code is <strong className="text-white">FIRST15</strong>.
              </p>
            )}
          </form>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-forest-900">
          
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
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
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Ruthved<span className="text-saffron-400 ml-1">Organic</span>
                </span>
                <p className="text-[10px] text-leaf-400 font-semibold tracking-wider uppercase">
                  Trust in Nature's Best
                </p>
              </div>
            </div>
            
            <p className="text-forest-200/80 text-sm leading-relaxed max-w-sm">
              Bringing the best of nature’s bounty to your home with a range of premium organic products since 2010. Handcrafted using Vedic methods and zero artificial adulterants.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-forest-900 hover:bg-saffron-500 hover:text-white text-forest-300 flex items-center justify-center transition-all shadow-xs"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-forest-900 hover:bg-saffron-500 hover:text-white text-forest-300 flex items-center justify-center transition-all shadow-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-forest-900 hover:bg-saffron-500 hover:text-white text-forest-300 flex items-center justify-center transition-all shadow-xs"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-xs text-forest-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-leaf-400" />
              <span>Registered & Sourced in Karnataka, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-forest-300">
              <li>
                <Link to="/" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-saffron-500" /> Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-saffron-500" /> Shop Catalog
                </Link>
              </li>
              <li>
                <Link to="/story" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-saffron-500" /> Our Story & Heritage
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> FAQ & Shipping
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-gold-500" /> Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-forest-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-saffron-400 flex-shrink-0 mt-1" />
                <span className="leading-snug">{BUSINESS_INFO.address.fullFormatted}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-saffron-400 flex-shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-saffron-400 transition-colors">
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-saffron-400 flex-shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-saffron-400 transition-colors break-all">
                  {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Store Hours */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-4">Store Hours</h4>
            <ul className="space-y-2 text-sm text-forest-300">
              {BUSINESS_INFO.hours.map((h, i) => (
                <li key={i} className="flex flex-col">
                  <span className="text-xs text-forest-400 uppercase tracking-wider">{h.days}</span>
                  <span className="font-medium text-white text-xs">{h.time}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-forest-900">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-leaf-400 hover:text-leaf-300"
              >
                <span>Order via WhatsApp Direct</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-forest-400 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} Ruthved Organic. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-forest-400/80">
              Pure Traditional Cold-Pressed & Vedic Bilona Craft
            </span>
            <span className="hidden md:inline">•</span>
            <span className="text-saffron-400/90 flex items-center gap-1 font-medium">
              Made with <Heart className="w-3 h-3 fill-rose-500 text-rose-500 inline" /> for Indian families
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
