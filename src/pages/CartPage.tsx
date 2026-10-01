import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';
import { CheckoutModal } from '../components/cart/CheckoutModal';

export const CartPage: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
    setTimeout(() => setCouponFeedback(null), 4000);
  };

  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  if (items.length === 0) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto px-4 space-y-5">
        <div className="w-20 h-20 bg-ivory-100 rounded-full flex items-center justify-center mx-auto text-forest-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-forest-950">Your Cart is Empty</h1>
        <p className="text-sm text-forest-600">
          Explore our range of traditional Vedic Bilona A2 Ghee and cold-pressed oils.
        </p>
        <Link to="/shop" className="btn-saffron text-xs py-3.5 px-8 inline-block shadow-glow-orange">
          Explore Organic Pantry
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
          Shopping Cart ({totalItems} items)
        </h1>
        <p className="text-xs text-forest-600 mt-1 font-medium">
          Review your authentic organic products before checkout.
        </p>
      </div>

      {/* Free Shipping Alert */}
      <div className="bg-leaf-50/80 p-4 rounded-2xl border border-leaf-200 flex items-center justify-between text-xs text-forest-800">
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-saffron-500 fill-saffron-500" />
          {amountNeeded === 0 ? (
            <strong className="text-leaf-800">Congratulations! You have unlocked FREE Shipping nationwide.</strong>
          ) : (
            <span>Add <strong className="text-saffron-600">{formatCurrency(amountNeeded)}</strong> more to unlock <strong className="text-leaf-800">FREE Delivery</strong></span>
          )}
        </span>
        <span className="font-bold text-forest-900">{formatCurrency(subtotal)} / {formatCurrency(freeShippingThreshold)}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Items List (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-ivory-200 shadow-soft space-y-4">
          {items.map(item => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-ivory-100 hover:border-ivory-200 transition-colors bg-ivory-50/40"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 rounded-xl bg-white p-2 border border-ivory-200 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-forest-950">{item.name}</h3>
                  <span className="text-xs text-forest-600 font-medium">Size: {item.size}</span>
                  <span className="block font-bold text-forest-800 text-xs mt-1">
                    {formatCurrency(item.price)} each
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                {/* Stepper */}
                <div className="flex items-center border border-ivory-300 rounded-lg bg-white overflow-hidden shadow-xs">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 text-forest-700 hover:bg-ivory-100 transition-colors font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-forest-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 text-forest-700 hover:bg-ivory-100 transition-colors font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <span className="font-serif font-bold text-base text-forest-950 min-w-20 text-right">
                  {formatCurrency(item.price * item.quantity)}
                </span>

                {/* Delete */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-forest-400 hover:text-rose-600 p-1.5 transition-colors"
                  title="Remove product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Summary (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-soft space-y-6">
          <h2 className="font-serif text-xl font-bold text-forest-950 pb-3 border-b border-ivory-200">
            Order Summary
          </h2>

          {/* Coupon */}
          <form onSubmit={handleApplyCoupon} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="PROMO CODE"
                value={couponInput}
                onChange={e => setCouponInput(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-ivory-300 uppercase font-mono focus:outline-none focus:ring-2 focus:ring-saffron-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-saffron-500 hover:bg-saffron-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                Apply
              </button>
            </div>
            {couponFeedback && (
              <p className={`text-xs ${couponFeedback.success ? 'text-leaf-700 font-semibold' : 'text-rose-600'}`}>
                {couponFeedback.message}
              </p>
            )}
            {appliedCoupon && (
              <div className="flex items-center justify-between bg-leaf-50 border border-leaf-200 p-2 rounded-lg text-xs text-leaf-800">
                <span>Code <strong>{appliedCoupon}</strong> active (-15%)</span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-rose-700 underline font-semibold text-[11px]"
                >
                  Remove
                </button>
              </div>
            )}
          </form>

          {/* Calculations */}
          <div className="space-y-2 text-xs text-forest-700 border-t border-ivory-200 pt-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-forest-900">{formatCurrency(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-leaf-700 font-semibold">
                <span>Discount (15%):</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Standard Shipping:</span>
              <span>
                {shippingFee === 0 ? (
                  <strong className="text-leaf-700 uppercase">FREE</strong>
                ) : (
                  formatCurrency(shippingFee)
                )}
              </span>
            </div>
            <div className="flex justify-between text-lg font-serif font-bold text-forest-950 pt-3 border-t border-ivory-200">
              <span>Total Payable:</span>
              <span className="text-saffron-600 font-bold">{formatCurrency(total)}</span>
            </div>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            className="btn-saffron w-full py-4 text-xs tracking-wider uppercase font-bold shadow-glow-orange flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-[11px] text-forest-500 text-center flex items-center justify-center gap-1.5 pt-2 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
            <span>Guaranteed Pure Vedic Craft • Safe Delivery</span>
          </div>
        </div>

      </div>

      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
};
