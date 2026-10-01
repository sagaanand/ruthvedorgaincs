import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Check,
  Truck,
  Leaf,
  Sparkles,
  Heart,
  MessageCircle,
  ChevronDown
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatCurrency, calculateDiscountPercentage } from '../utils/formatters';
import { OrganicProductCard } from '../components/products/OrganicProductCard';
import { WatercolorDivider } from '../components/common/WatercolorDivider';
import { BUSINESS_INFO } from '../data/businessInfo';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart, wishlist, toggleWishlist } = useCart();

  const product = PRODUCTS.find((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<'highlights' | 'process' | 'storage' | 'ingredients'>('highlights');

  useEffect(() => {
    if (product) {
      setSelectedImage(product.gallery[0] || product.image);
      setSelectedSize(product.variants[0]?.size || 'Standard');
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product, slug]);

  if (!product) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-[#263F27]">Product Not Found</h2>
        <p className="text-sm text-[#282619]/70 mt-2">
          The requested product could not be located in our organic pantry.
        </p>
        <Link to="/shop" className="btn-forest mt-6 text-xs inline-block">
          Return to Shop
        </Link>
      </div>
    );
  }

  const currentVariant = product.variants.find((v) => v.size === selectedSize) || product.variants[0];
  const unitPrice = currentVariant?.price || product.price;
  const originalPrice = product.originalPrice
    ? Math.round(unitPrice * (product.originalPrice / product.price))
    : undefined;
  const discountPercent = originalPrice
    ? calculateDiscountPercentage(originalPrice, unitPrice)
    : 0;

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F7F1E4] bg-[url('/images/textures/parchment.jpg')] bg-repeat [background-size:600px_auto] [background-blend-mode:multiply] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#536B3F] font-medium">
          <Link to="/" className="hover:text-[#263F27] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#263F27] transition-colors">Shop</Link>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="font-bold text-[#263F27] truncate">{product.name}</span>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Gallery Column (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Photo Box */}
            <div className="relative rounded-3xl bg-white p-8 border border-[#EDE2CB] shadow-soft overflow-hidden aspect-square flex items-center justify-center">
              {product.tag && (
                <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#263F27] text-white text-[11px] font-semibold tracking-wider z-10 shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#C6A16A]" />
                  {product.tag}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#536B3F] text-white text-[11px] font-bold z-10 shadow-xs">
                  {discountPercent}% OFF
                </span>
              )}

              <img
                src={selectedImage}
                alt={product.name}
                className="max-h-[85%] max-w-[85%] object-contain transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnails */}
            {product.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-2xl bg-white p-2 border transition-all shrink-0 ${
                      selectedImage === img
                        ? 'border-[#263F27] ring-2 ring-[#263F27]/20 shadow-xs'
                        : 'border-[#EDE2CB] hover:border-[#536B3F]'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Assurance Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-[11px] text-[#263F27]">
              <div className="p-3 bg-white/80 rounded-2xl border border-[#EDE2CB] shadow-xs">
                <Sparkles className="w-4 h-4 text-[#C6A16A] mx-auto mb-1" />
                <span className="font-semibold">Vedic Tradition</span>
              </div>
              <div className="p-3 bg-white/80 rounded-2xl border border-[#EDE2CB] shadow-xs">
                <Leaf className="w-4 h-4 text-[#536B3F] mx-auto mb-1" />
                <span className="font-semibold">Zero Preservatives</span>
              </div>
              <div className="p-3 bg-white/80 rounded-2xl border border-[#EDE2CB] shadow-xs">
                <Truck className="w-4 h-4 text-[#C6A16A] mx-auto mb-1" />
                <span className="font-semibold">Free Shipping &gt;₹999</span>
              </div>
            </div>
          </div>

          {/* Details & Action Column (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-[#C6A16A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#282619]">{product.rating}</span>
                <span className="text-xs text-[#282619]/50">({product.reviewsCount} verified reviews)</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#263F27] leading-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#536B3F] font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-[#536B3F]" />
                <span>{product.subtitle}</span>
              </p>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-white/90 border border-[#EDE2CB] shadow-xs flex items-baseline justify-between flex-wrap gap-2">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#263F27]">
                  {formatCurrency(unitPrice)}
                </span>
                {originalPrice && (
                  <span className="text-base text-[#282619]/40 line-through">
                    {formatCurrency(originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-xs text-[#536B3F] font-semibold bg-[#EFF1EA] px-3 py-1 rounded-full">
                Eco-Friendly Glass Vessel
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-[#282619]/80 leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Variant / Size Selector */}
            {product.variants.length > 1 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#263F27] block">
                  Packaging Options:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.size}
                      type="button"
                      onClick={() => setSelectedSize(v.size)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                        selectedSize === v.size
                          ? 'bg-[#263F27] text-[#F7F1E4] shadow-xs'
                          : 'bg-white text-[#282619]/80 border border-[#EDE2CB] hover:bg-[#FAF7F0]'
                      }`}
                    >
                      <span>{v.size}</span>
                      <span className="ml-1.5 opacity-70">({formatCurrency(v.price)})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & CTA Row */}
            <div className="flex items-center gap-3 pt-2">
              {/* Quantity Counter */}
              <div className="flex items-center rounded-full bg-white border border-[#EDE2CB] p-1 shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#282619] hover:bg-[#F7F1E4] transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-[#263F27]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#282619] hover:bg-[#F7F1E4] transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 btn-forest py-3.5 ${isAdded ? 'bg-[#536B3F]' : ''}`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>ADDED TO CART</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#C6A16A]" />
                    <span>ADD TO CART • {formatCurrency(unitPrice * quantity)}</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-full border transition-all ${
                  isWishlisted
                    ? 'bg-[#C6A16A] text-white border-[#C6A16A]'
                    : 'bg-white text-[#282619] border-[#EDE2CB] hover:text-[#C6A16A]'
                }`}
                title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* WhatsApp Enquiry Shortcut */}
            <div className="pt-2">
              <a
                href={`${BUSINESS_INFO.whatsappUrl}&text=Hello%20Ruthved%20Organic,%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#FAF7F0] hover:bg-white text-xs font-semibold text-[#263F27] border border-[#EDE2CB] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#536B3F]" />
                <span>Enquire or Order via WhatsApp Direct</span>
              </a>
            </div>

            {/* Information Accordions */}
            <div className="pt-4 space-y-3">
              {/* 1. Highlights */}
              <div className="rounded-2xl bg-white/80 border border-[#EDE2CB] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'highlights' ? ('' as any) : 'highlights')}
                  className="w-full p-4 text-left font-serif text-sm font-bold text-[#263F27] flex items-center justify-between"
                >
                  <span>Health Highlights & Key Benefits</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'highlights' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'highlights' && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#282619]/80 space-y-2 border-t border-[#EDE2CB]/60">
                    <ul className="space-y-1.5 list-disc list-inside">
                      {product.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 2. Process */}
              <div className="rounded-2xl bg-white/80 border border-[#EDE2CB] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'process' ? ('' as any) : 'process')}
                  className="w-full p-4 text-left font-serif text-sm font-bold text-[#263F27] flex items-center justify-between"
                >
                  <span>Authentic Preparation Process</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'process' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'process' && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#282619]/80 leading-relaxed border-t border-[#EDE2CB]/60">
                    {product.processMethod}
                  </div>
                )}
              </div>

              {/* 3. Storage & Shelf Life */}
              <div className="rounded-2xl bg-white/80 border border-[#EDE2CB] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'storage' ? ('' as any) : 'storage')}
                  className="w-full p-4 text-left font-serif text-sm font-bold text-[#263F27] flex items-center justify-between"
                >
                  <span>Storage Instructions & Origin</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'storage' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'storage' && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#282619]/80 space-y-1.5 border-t border-[#EDE2CB]/60">
                    <p><strong>Storage:</strong> {product.storageInstructions}</p>
                    <p><strong>Shelf Life:</strong> {product.shelfLife}</p>
                    <p><strong>Origin:</strong> {product.origin}</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Related Products Grid */}
        <div className="pt-12 border-t border-[#EDE2CB] space-y-8">
          <div className="text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#263F27]">
              Pairs Beautifully With
            </h2>
            <WatercolorDivider className="my-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <OrganicProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;
