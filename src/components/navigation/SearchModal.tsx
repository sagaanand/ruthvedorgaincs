import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { formatCurrency } from '../../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setSearchTerm('');
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const query = searchTerm.toLowerCase().trim();
    if (!query) return matchesCategory;

    return (
      matchesCategory &&
      (product.name.toLowerCase().includes(query) ||
        product.subtitle.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.highlights.some(h => h.toLowerCase().includes(query)))
    );
  });

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/shop/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-forest-950/70 backdrop-blur-md transition-all">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-elevated overflow-hidden border border-forest-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="relative p-4 sm:p-5 border-b border-ivory-200 flex items-center gap-3 bg-ivory-50">
          <Search className="w-5 h-5 text-forest-700 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search A2 Bilona Ghee, Wood-Pressed Oils, Wild Honey..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-forest-900 placeholder:text-forest-400 text-base sm:text-lg focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-forest-400 hover:text-forest-700 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-forest-500 hover:text-forest-900 hover:bg-forest-100 rounded-full transition-colors ml-1"
            title="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-5 py-3 bg-white border-b border-ivory-200 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-forest-400 font-medium whitespace-nowrap">Filter:</span>
          {(['all', 'ghee', 'oils', 'honey'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full font-medium capitalize transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'bg-ivory-100 text-forest-700 hover:bg-ivory-200'
              }`}
            >
              {cat === 'all' ? 'All Products' : cat === 'oils' ? 'Cold-Pressed Oils' : cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-forest-600">
              <p className="font-serif text-lg font-medium">No organic products found</p>
              <p className="text-sm text-forest-400 mt-1">
                Try searching for "Ghee", "Coconut", "Groundnut", or "Honey"
              </p>
            </div>
          ) : (
            filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product.slug)}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-ivory-100/70 border border-transparent hover:border-ivory-200 cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-lg bg-ivory-200/50 p-1 flex-shrink-0 overflow-hidden border border-ivory-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-forest-900 group-hover:text-forest-700 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-forest-600 line-clamp-1">{product.subtitle}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold text-forest-800">
                        {formatCurrency(product.price)}
                      </span>
                      {product.tag && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-gold-100 text-gold-700">
                          {product.tag}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-forest-400 group-hover:text-forest-800 transition-colors pl-2">
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-ivory-50 border-t border-ivory-200 text-center text-xs text-forest-500">
          Press <kbd className="px-1.5 py-0.5 bg-white border border-ivory-300 rounded font-mono text-[10px]">ESC</kbd> to close or select an item to view full details
        </div>
      </div>
    </div>
  );
};
