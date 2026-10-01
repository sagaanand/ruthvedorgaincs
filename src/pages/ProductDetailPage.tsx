import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Check,
  Truck,
  Leaf,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatCurrency, calculateDiscountPercentage } from '../utils/formatters';
import { ProductCard } from '../components/products/ProductCard';
import { BUSINESS_INFO } from '../data/businessInfo';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();

  const product = PRODUCTS.find(p => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'process' | 'storage'>('benefits');

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
        <h2 className="font-serif text-2xl font-bold text-forest-900">Product Not Found</h2>
        <p className="text-sm text-forest-600 mt-2">
          The requested product could not be located in our organic pantry.
        </p>
        <Link to="/shop" className="btn-primary mt-6 text-xs">
          Return to Shop
        </Link>
      </div>
    );
  }

  const currentVariant = product.variants.find(v => v.size === selectedSize) || product.variants[0];
  const unitPrice = currentVariant?.price || product.price;
  const originalPrice = product.originalPrice
    ? Math.round(unitPrice * (product.originalPrice / product.price))
    : undefined;
  const discountPercent = originalPrice
    ? calculateDiscountPercentage(originalPrice, unitPrice)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="py-8 sm:py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-forest-500">
        <Link to="/" className="hover:text-forest-900 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-forest-900 transition-colors">Shop</Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="font-semibold text-forest-900 truncate">{product.name}</span>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Gallery Column (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Photo Box */}
          <div className="relative rounded-3xl bg-white p-8 border border-ivory-200/90 shadow-soft overflow-hidden aspect-square flex items-center justify-center">
            {product.tag && (
              <span className="absolute top-4 left-4 badge-tag bg-forest-800 text-white z-10">
                {product.tag}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="absolute top-4 right-4 badge-tag bg-rose-600 text-white z-10">
                {discountPercent}% OFF
              </span>
            )}

            <img
              src={selectedImage}
              alt={product.name}
              className="max-h-[85%] max-w-[85%] object-contain transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Thumbnails (if multiple images) */}
          {product.gallery.length > 1 && (
            <div className="flex items-center gap-3">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl bg-white p-2 border transition-all ${
                    selectedImage === img
                      ? 'border-forest-800 shadow-sm ring-2 ring-forest-800/20'
                      : 'border-ivory-200 hover:border-forest-400'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Assurance Badges */}
          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-[11px] text-forest-700">
            <div className="p-3 bg-ivory-50 rounded-xl border border-ivory-200">
              <Sparkles className="w-4 h-4 text-gold-600 mx-auto mb-1" />
              <span>Vedic Tradition</span>
            </div>
            <div className="p-3 bg-ivory-50 rounded-xl border border-ivory-200">
              <Leaf className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <span>100% Chemical-Free</span>
            </div>
            <div className="p-3 bg-ivory-50 rounded-xl border border-ivory-200">
              <Truck className="w-4 h-4 text-forest-700 mx-auto mb-1" />
              <span>Free Delivery &gt;₹750</span>
            </div>
          </div>
        </div>

        {/* Product Details & Actions Column (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-forest-900">{product.rating}</span>
              <span className="text-xs text-forest-400">({product.reviewsCount} verified reviews)</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-gold-700 font-semibold tracking-wide mt-1">
              {product.subtitle}
            </p>
          </div>

          {/* Price Box */}
          <div className="bg-ivory-50 p-4 rounded-2xl border border-ivory-200 flex items-baseline gap-3">
            <span className="font-serif text-3xl font-bold text-forest-900">
              {formatCurrency(unitPrice)}
            </span>
            {originalPrice && (
              <span className="text-base text-forest-400 line-through">
                {formatCurrency(originalPrice)}
              </span>
            )}
            <span className="text-xs text-forest-500 ml-auto">
              Inclusive of all taxes • Glass Packaging
            </span>
          </div>

          {/* Short Description */}
          <p className="text-sm text-forest-700/90 leading-relaxed">
            {product.description}
          </p>

          {/* Size Variant Picker */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider font-bold text-forest-900 block">
              Package Size:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {product.variants.map((v) => (
                <button
                  key={v.size}
                  onClick={() => setSelectedSize(v.size)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all border ${
                    selectedSize === v.size
                      ? 'bg-forest-800 text-white border-forest-800 shadow-sm'
                      : 'bg-white text-forest-800 border-ivory-300 hover:border-forest-600'
                  }`}
                >
                  <span>{v.size}</span>
                  <span className="block text-[10px] opacity-80 font-normal">
                    {formatCurrency(v.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center border border-ivory-300 rounded-xl bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-forest-700 hover:bg-ivory-100 transition-colors font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-bold text-forest-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-forest-700 hover:bg-ivory-100 transition-colors font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`btn-primary flex-1 py-4 text-xs tracking-wider uppercase font-bold shadow-md ${
                  isAdded ? 'bg-emerald-600' : ''
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart ({formatCurrency(unitPrice * quantity)})</span>
                  </>
                )}
              </button>
            </div>

            {/* Buy Now / Quick WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={handleBuyNow}
                className="btn-gold w-full py-3.5 text-xs tracking-wider"
              >
                Buy Now with 1-Click
              </button>

              <a
                href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=Hello%20Ruthved%20Organic,%20I%20am%20interested%20in%20ordering%20${encodeURIComponent(product.name)}%20(${selectedSize}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-forest w-full py-3.5 text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Key Facts Strip */}
          <div className="pt-4 border-t border-ivory-200/80 text-xs text-forest-600 space-y-1.5">
            <p><strong>Shelf Life:</strong> {product.shelfLife}</p>
            <p><strong>Origin:</strong> {product.origin}</p>
            <p><strong>Ingredients:</strong> {product.ingredients}</p>
          </div>

        </div>

      </div>

      {/* Product Deep-Dive Tabs */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ivory-200 shadow-soft">
        {/* Tab Headers */}
        <div className="flex items-center gap-4 sm:gap-8 border-b border-ivory-200 pb-4 overflow-x-auto text-sm font-semibold">
          <button
            onClick={() => setActiveTab('benefits')}
            className={`pb-2 whitespace-nowrap transition-colors relative ${
              activeTab === 'benefits'
                ? 'text-forest-900 border-b-2 border-forest-800'
                : 'text-forest-400 hover:text-forest-700'
            }`}
          >
            Health Benefits & Highlights
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`pb-2 whitespace-nowrap transition-colors relative ${
              activeTab === 'process'
                ? 'text-forest-900 border-b-2 border-forest-800'
                : 'text-forest-400 hover:text-forest-700'
            }`}
          >
            Traditional Extraction Method
          </button>
          <button
            onClick={() => setActiveTab('storage')}
            className={`pb-2 whitespace-nowrap transition-colors relative ${
              activeTab === 'storage'
                ? 'text-forest-900 border-b-2 border-forest-800'
                : 'text-forest-400 hover:text-forest-700'
            }`}
          >
            Storage & Culinary Instructions
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-6">
          {activeTab === 'benefits' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-forest-900 mb-3">Key Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-forest-700">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-ivory-200">
                <h3 className="font-serif text-xl font-bold text-forest-900 mb-3">Ayurvedic & Nutritional Value</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-forest-700">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-4 max-w-3xl text-sm text-forest-700 leading-relaxed">
              <h3 className="font-serif text-xl font-bold text-forest-900">
                How We Make It
              </h3>
              <p>{product.processMethod}</p>
              <div className="p-4 bg-ivory-100 rounded-2xl border border-ivory-200 text-xs text-forest-800 space-y-1 mt-4">
                <p><strong>Unrefined & Pure:</strong> No mineral oils, paraffin, chemical bleaching agents, or hexane solvents are ever used in our facilities.</p>
                <p><strong>Batch Freshness:</strong> Made in small artisanal batches to maintain maximum therapeutic potency.</p>
              </div>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-4 max-w-3xl text-sm text-forest-700 leading-relaxed">
              <h3 className="font-serif text-xl font-bold text-forest-900">
                Preserving Purity At Home
              </h3>
              <p>{product.storageInstructions}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-ivory-50 rounded-xl border border-ivory-200">
                  <span className="text-xs uppercase tracking-wider font-bold text-forest-900 block mb-1">
                    Shelf Life
                  </span>
                  <span className="text-sm text-forest-700">{product.shelfLife}</span>
                </div>
                <div className="p-4 bg-ivory-50 rounded-xl border border-ivory-200">
                  <span className="text-xs uppercase tracking-wider font-bold text-forest-900 block mb-1">
                    Origin of Harvest
                  </span>
                  <span className="text-sm text-forest-700">{product.origin}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-forest-900">
              You May Also Like
            </h2>
            <Link to="/shop" className="text-xs uppercase tracking-wider font-bold text-forest-800 hover:text-gold-600">
              View All Products &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
