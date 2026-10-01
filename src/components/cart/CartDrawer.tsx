import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { CheckoutModal } from './CheckoutModal';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
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

  if (!isCartOpen) return null;

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

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-forest-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      >
        {/* Slide-over panel */}
        <div
          className="fixed inset-y-0 right-0 max-w-full flex pl-10"
          onClick={e => e.stopPropagation()}
        >
          <div className="w-screen max-w-md bg-white shadow-elevated flex flex-col h-full border-l border-ivory-200">
            
            {/* Header */}
            <div className="p-5 border-b border-ivory-200 bg-ivory-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-forest-800" />
                <h3 className="font-serif text-xl font-bold text-forest-900">
                  Your Cart ({totalItems})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-forest-500 hover:text-forest-900 rounded-full hover:bg-ivory-200 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Ribbon */}
            <div className="px-5 py-3 bg-forest-50 border-b border-forest-100 text-xs text-forest-800">
              <div className="flex items-center justify-between mb-1.5">
                {amountNeededForFreeShipping === 0 ? (
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Congratulations! You unlocked FREE Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong>{formatCurrency(amountNeededForFreeShipping)}</strong> more to unlock <strong>FREE Shipping</strong>
                  </span>
                )}
                <span className="font-semibold">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-forest-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-forest-700 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-ivory-100 text-forest-400 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-forest-900">Your cart is empty</h4>
                    <p className="text-xs text-forest-600 mt-1 max-w-xs mx-auto">
                      Explore our handcrafted A2 Bilona Ghee and wood-pressed oils.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="btn-primary text-xs py-3 px-6 mt-2"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 rounded-xl border border-ivory-200 bg-ivory-50/50 hover:bg-ivory-50 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="w-18 h-18 w-20 h-20 rounded-lg bg-white p-1.5 flex-shrink-0 border border-ivory-200 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-serif font-bold text-sm text-forest-900 leading-snug">
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-forest-600 font-medium block">
                            Size: {item.size}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-forest-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-ivory-200/60">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-ivory-300 rounded-lg bg-white overflow-hidden">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-forest-600 hover:bg-ivory-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-forest-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-forest-600 hover:bg-ivory-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-serif font-bold text-forest-900 text-sm">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary (if items present) */}
            {items.length > 0 && (
              <div className="p-5 border-t border-ivory-200 bg-ivory-50 space-y-4">
                
                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-forest-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. FIRST15)"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-ivory-300 uppercase font-mono focus:outline-none focus:ring-1 focus:ring-forest-800"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  {couponFeedback && (
                    <p
                      className={`text-xs ${
                        couponFeedback.success ? 'text-emerald-700' : 'text-rose-600'
                      }`}
                    >
                      {couponFeedback.message}
                    </p>
                  )}

                  {appliedCoupon && (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs text-emerald-800">
                      <span>
                        Coupon <strong>{appliedCoupon}</strong> active (-15%)
                      </span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-emerald-900 hover:text-rose-600 underline font-semibold ml-2 text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </form>

                {/* Calculation Lines */}
                <div className="space-y-1.5 text-xs text-forest-700 pt-2 border-t border-ivory-200">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-forest-900">{formatCurrency(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount (15%):</span>
                      <span className="font-semibold">-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Standard Shipping:</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="font-bold text-emerald-700 uppercase">FREE</span>
                      ) : (
                        formatCurrency(shippingFee)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-forest-900 pt-2 border-t border-ivory-200">
                    <span>Estimated Total:</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutOpen(true)}
                    className="btn-primary w-full py-3.5 text-xs tracking-wider"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full text-center text-xs text-forest-600 hover:text-forest-900 underline py-1"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal Dialog */}
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
};
