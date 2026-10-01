import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Check, Sparkles } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';

interface OrganicProductCardProps {
  product: Product;
}

export const OrganicProductCard: React.FC<OrganicProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]?.size || 'Standard');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const activeVariant = product.variants.find((v) => v.size === selectedVariant) || product.variants[0];
  const currentPrice = activeVariant?.price || product.price;
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative flex flex-col rounded-3xl bg-white/95 border border-[#EDE2CB] shadow-soft hover:shadow-premium transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      
      {/* 1. Image Container */}
      <div className="relative aspect-square w-full bg-[#FAF7F0] p-6 flex items-center justify-center overflow-hidden">
        {/* Subtle background grain */}
        <div className="absolute inset-0 bg-[radial-gradient(#C6A16A_0.3px,transparent_0.3px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        <Link to={`/shop/${product.slug}`} className="w-full h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-108"
            loading="lazy"
          />
        </Link>

        {/* Badge */}
        {product.tag && (
          <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 text-[10.5px] font-semibold tracking-wider text-[#263F27] border border-[#EDE2CB] shadow-xs">
            <Sparkles className="w-3 h-3 text-[#C6A16A]" />
            {product.tag}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-[#C6A16A] text-white shadow-xs'
              : 'bg-white/90 text-[#282619]/60 hover:text-[#C6A16A] hover:bg-white shadow-xs'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Availability Indicator */}
        <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/90 border border-[#EDE2CB] text-[10px] font-medium text-[#536B3F]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#536B3F]" />
          <span>In Stock</span>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs">
            <div className="flex items-center text-[#C6A16A]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-[#282619]">{product.rating}</span>
            <span className="text-[#282619]/50 text-[11px]">({product.reviewsCount})</span>
          </div>

          {/* Product Title */}
          <Link to={`/shop/${product.slug}`} className="block group-hover:text-[#536B3F] transition-colors">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#263F27] leading-snug line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-[#282619]/65 line-clamp-1 mt-0.5 font-normal">
              {product.subtitle}
            </p>
          </Link>
        </div>

        {/* 3. Variants Selector (if multiple variants exist) */}
        {product.variants.length > 1 && (
          <div className="pt-1">
            <span className="text-[10.5px] uppercase tracking-wider text-[#282619]/60 font-semibold block mb-1.5">
              Select Size:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((v) => (
                <button
                  key={v.size}
                  type="button"
                  onClick={() => setSelectedVariant(v.size)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedVariant === v.size
                      ? 'bg-[#263F27] text-[#F7F1E4] shadow-xs'
                      : 'bg-[#F7F1E4] text-[#282619]/80 hover:bg-[#EDE2CB] border border-[#EDE2CB]'
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. Price and Add to Cart Action */}
        <div className="pt-3 border-t border-[#EDE2CB]/70 flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-[#282619]/60 block leading-none">Price</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-serif text-lg sm:text-xl font-bold text-[#263F27]">
                ₹{currentPrice}
              </span>
              {product.originalPrice && product.originalPrice > currentPrice && (
                <span className="text-xs text-[#282619]/40 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
              addedAnimation
                ? 'bg-[#536B3F] text-white'
                : 'bg-[#263F27] text-[#F7F1E4] hover:bg-[#1B2C1C] shadow-xs'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#C6A16A]" />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
