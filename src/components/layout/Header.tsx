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
              <div className="h-11 sm:h-13 w-auto flex items-center p-1 bg-white rounded-xl shadow-xs border border-ivory-200">
                <img
                  src="/images/image.png"
                  alt="Ruthved Organic Logo"
                  className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-forest-900 leading-none">
                  Ruthved<span className="text-saffron-500 font-normal ml-1">Organic</span>
                </span>
                <span className="text-[10.5px] uppercase tracking-widest text-leaf-700 font-semibold mt-0.5">
                  Trust in Nature's Best
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
                    `text-xs font-semibold uppercase tracking-wider transition-colors relative py-1.5 ${
                      isActive
                        ? 'text-saffron-600 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-saffron-500 after:rounded-full'
                        : 'text-forest-800/80 hover:text-saffron-600'
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
                className="p-2 text-forest-700 hover:text-saffron-600 hover:bg-saffron-50 rounded-full transition-colors flex items-center gap-1.5"
                aria-label="Search catalog"
              >
                <Search className="w-4.5 h-4.5" />
                <span className="hidden xl:inline text-xs font-medium text-forest-600">Search</span>
              </button>

              {/* Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 bg-forest-800 text-white hover:bg-forest-900 rounded-full transition-all duration-200 shadow-sm hover:shadow-glow-orange flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-saffron-400 active:scale-95"
                aria-label="View shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-saffron-500 text-white text-[11px] font-bold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center shadow-xs animate-pulse">
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
                      `flex items-center justify-between text-sm font-semibold uppercase tracking-wider py-2.5 border-b border-ivory-200/60 ${
                        isActive ? 'text-saffron-600 font-bold' : 'text-forest-800'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-saffron-500" />
                  </NavLink>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-ivory-200 flex flex-col gap-3">
                <Link
                  to="/shop"
                  className="btn-saffron w-full text-center py-3.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Explore Organic Shop
                </Link>
                <div className="flex items-center justify-center gap-4 text-xs text-forest-600 mt-2">
                  <span className="flex items-center gap-1 text-leaf-700 font-medium">
                    <ShieldCheck className="w-4 h-4 text-leaf-600" /> 100% Authentic
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-saffron-700 font-medium">
                    <Heart className="w-4 h-4 text-saffron-500" /> Vedic Bilona Method
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
