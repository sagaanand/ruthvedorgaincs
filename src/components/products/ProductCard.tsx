import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Check, Eye } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { formatCurrency, calculateDiscountPercentage } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.variants[0]?.size || 'Standard'
  );
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const currentVariant = product.variants.find(v => v.size === selectedSize) || product.variants[0];
  const currentPrice = currentVariant?.price || product.price;
  const originalPrice = product.originalPrice
    ? Math.round(currentPrice * (product.originalPrice / product.price))
    : undefined;
  const discountPercent = originalPrice
    ? calculateDiscountPercentage(originalPrice, currentPrice)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-ivory-200/90 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col h-full">
      
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {product.tag && (
          <span
            className={`badge-tag ${
              product.tag === 'Best Seller'
                ? 'bg-forest-800 text-white'
                : product.tag === 'New'
                ? 'bg-gold-500 text-white'
                : 'bg-forest-900 text-gold-300'
            }`}
          >
            {product.tag}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="badge-tag bg-rose-600 text-white">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Image Container */}
      <Link
        to={`/shop/${product.slug}`}
        className="relative block w-full pt-[85%] bg-gradient-to-b from-ivory-50 to-ivory-100/60 overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-4 transform group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Quick View Overlay on hover */}
        <div className="absolute inset-0 bg-forest-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 text-forest-900 text-xs font-semibold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-forest-700" />
            <span>Quick View</span>
          </span>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-1.5 text-xs text-forest-600">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-dark-800">{product.rating}</span>
            <span className="text-forest-400">({product.reviewsCount})</span>
            <span className="text-forest-300 mx-1">•</span>
            <span className="text-[11px] text-forest-600 uppercase tracking-wider font-medium">
              {product.category}
            </span>
          </div>

          {/* Title & Subtitle */}
          <Link to={`/shop/${product.slug}`}>
            <h3 className="font-serif text-lg font-bold text-forest-900 group-hover:text-forest-700 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-forest-600/90 line-clamp-1 mt-1 font-medium">
            {product.subtitle}
          </p>

          {/* Short Benefit Bullet */}
          <p className="text-xs text-forest-700/80 mt-2 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Size Variant Pill Selectors */}
          {product.variants.length > 1 && (
            <div className="mt-3.5 pt-3 border-t border-ivory-200/60">
              <span className="text-[11px] uppercase tracking-wider text-forest-500 font-semibold block mb-1.5">
                Select Size:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.map((v) => (
                  <button
                    key={v.size}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedSize(v.size);
                    }}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                      selectedSize === v.size
                        ? 'bg-forest-800 text-white font-semibold shadow-xs'
                        : 'bg-ivory-100 text-forest-700 hover:bg-ivory-200 border border-ivory-300/80'
                    }`}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-5 pt-3.5 border-t border-ivory-200 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-bold text-forest-900">
                {formatCurrency(currentPrice)}
              </span>
              {originalPrice && (
                <span className="text-xs text-forest-400 line-through">
                  {formatCurrency(originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-forest-500 uppercase tracking-wider">
              {selectedSize} • Incl. of taxes
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-forest-800 hover:bg-forest-900 text-white hover:shadow-md'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
