import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { SearchModal } from '../navigation/SearchModal';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, setIsCartOpen, wishlist } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Our Story', path: '/story' },
    { name: 'Why Us', path: '/why-us' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F1E4]/95 backdrop-blur-md shadow-md py-2.5 border-b border-[#EDE2CB]'
            : 'bg-[#F7F1E4] py-3.5 border-b border-[#EDE2CB]/80'
        } bg-[url("/images/textures/parchment.jpg")] bg-repeat [background-size:400px_auto] [background-blend-mode:multiply]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 text-[#263F27] hover:text-[#536B3F] rounded-lg transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo & Name */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-11 sm:h-12 w-auto flex items-center p-1 bg-white/90 rounded-xl shadow-xs border border-[#EDE2CB]">
                <img
                  src="/images/image.png"
                  alt="Ruthved Organic Logo"
                  className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#263F27] leading-none">
                  Ruthved<span className="text-[#C6A16A] font-normal ml-1">Organic</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#536B3F] font-semibold mt-0.5">
                  Pure • Traditional • Natural
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs font-semibold uppercase tracking-wider transition-colors relative py-1.5 ${
                      isActive
                        ? 'text-[#263F27] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#263F27] after:rounded-full'
                        : 'text-[#282619]/75 hover:text-[#263F27]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Icons: Search, Wishlist, Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Minimal Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 text-[#282619]/80 hover:text-[#263F27] hover:bg-[#EDE2CB]/50 rounded-full transition-colors"
                aria-label="Search products"
                title="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/shop"
                className="relative p-2 text-[#282619]/80 hover:text-[#263F27] hover:bg-[#EDE2CB]/50 rounded-full transition-colors hidden sm:inline-flex"
                aria-label="Wishlist"
                title="Your Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute 0 top-1 right-1 w-4 h-4 rounded-full bg-[#C6A16A] text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#263F27] text-[#F7F1E4] hover:bg-[#1B2C1C] transition-all shadow-xs hover:shadow-soft active:scale-95 cursor-pointer"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 text-[#C6A16A]" />
                <span className="text-xs font-semibold tracking-wider hidden sm:inline">CART</span>
                <span className="w-5 h-5 rounded-full bg-[#C6A16A] text-[#263F27] text-xs font-bold flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EDE2CB] bg-[#F7F1E4] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
            {/* Mobile Search Input */}
            <div className="pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#EDE2CB] text-xs text-[#282619]/60"
              >
                <Search className="w-4 h-4 text-[#536B3F]" />
                <span>Search A2 ghee, wood-pressed oils, wild honey...</span>
              </button>
            </div>

            <nav className="flex flex-col space-y-1 pt-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-colors ${
                      isActive
                        ? 'bg-[#263F27] text-[#F7F1E4]'
                        : 'text-[#282619] hover:bg-[#EDE2CB]/60'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
