import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { SearchModal } from '../navigation/SearchModal';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Our Story', path: '/story' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft py-3'
            : 'bg-ivory-100/95 backdrop-blur-sm py-4 border-b border-ivory-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 text-forest-800 hover:text-forest-900 rounded-lg hover:bg-forest-100/50 transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Center/Left: Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 sm:h-12 w-auto flex items-center">
                <img
                  src="/images/image.png"
                  alt="Ruthved Organic"
                  className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                  onError={(e) => {
                    // Graceful fallback if image has issue
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-forest-900 leading-none">
                  Ruthved<span className="text-gold-500 font-normal ml-1">Organic</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-forest-500 font-medium mt-0.5">
                  Pure Traditional Goodness
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wide transition-colors relative py-1 ${
                      isActive
                        ? 'text-forest-800 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold-500 after:rounded-full'
                        : 'text-forest-700/80 hover:text-forest-900'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right: Actions (Search, Cart) */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 text-forest-700 hover:text-forest-900 hover:bg-forest-100/50 rounded-full transition-colors flex items-center gap-1.5"
                aria-label="Search catalog"
              >
                <Search className="w-5 h-5" />
                <span className="hidden xl:inline text-xs font-medium text-forest-600">Search</span>
              </button>

              {/* Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 bg-forest-800 text-white hover:bg-forest-900 rounded-full transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-forest-700"
                aria-label="View shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-500 text-forest-950 text-[11px] font-bold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[73px] z-30 bg-forest-950/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-ivory-50 border-b border-ivory-200 px-6 py-6 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between text-base font-medium py-2 border-b border-ivory-200/60 ${
                        isActive ? 'text-forest-900 font-bold' : 'text-forest-700'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-gold-500" />
                  </NavLink>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-ivory-200 flex flex-col gap-3">
                <Link
                  to="/shop"
                  className="btn-primary w-full text-center py-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Explore Organic Shop
                </Link>
                <div className="flex items-center justify-center gap-4 text-xs text-forest-600 mt-2">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-gold-500" /> 100% Authentic
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-rose-500" /> Vedic Bilona Method
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
