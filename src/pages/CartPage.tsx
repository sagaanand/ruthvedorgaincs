import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ShieldCheck, Tag, Truck } from 'lucide-react';
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
    removeCoupon,
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
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F7F1E4] bg-[url('/images/textures/parchment.jpg')] bg-repeat [background-size:600px_auto] [background-blend-mode:multiply] py-20 px-4">
        <div className="text-center max-w-md mx-auto space-y-5 bg-white/90 p-8 sm:p-12 rounded-3xl border border-[#EDE2CB] shadow-soft">
          <div className="w-20 h-20 bg-[#FAF7F0] rounded-full flex items-center justify-center mx-auto text-[#536B3F] border border-[#EDE2CB]">
            <ShoppingBag className="w-9 h-9" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#263F27]">Your Cart is Empty</h1>
          <p className="text-xs sm:text-sm text-[#282619]/70 leading-relaxed font-normal">
            Your shopping basket is waiting for pure Vedic Bilona A2 Ghee, wood-pressed virgin oils, and raw forest honey.
          </p>
          <Link to="/shop" className="btn-forest text-xs py-3.5 px-8 inline-block shadow-soft">
            Explore Organic Pantry
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F1E4] bg-[url('/images/textures/parchment.jpg')] bg-repeat [background-size:600px_auto] [background-blend-mode:multiply] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-1">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#263F27]">
            Your Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-[#282619]/70">
            Review your pure artisanal selections before secure checkout.
          </p>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-[#EDE2CB] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#263F27]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#C6A16A]" />
              {amountNeeded > 0 ? (
                <span>
                  Add <strong className="text-[#C6A16A]">₹{amountNeeded}</strong> more to qualify for <strong>FREE Delivery</strong> across India!
                </span>
              ) : (
                <span className="text-[#536B3F] font-bold">
                  🎉 Congratulations! You have unlocked FREE Express Delivery!
                </span>
              )}
            </div>
            <span className="text-[#536B3F]">{shippingProgress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#FAF7F0] overflow-hidden border border-[#EDE2CB]">
            <div
              className="h-full bg-[#536B3F] rounded-full transition-all duration-500"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Layout: Items List (Left) + Order Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Items Column (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="p-6 rounded-3xl bg-white/95 border border-[#EDE2CB] shadow-soft divide-y divide-[#EDE2CB]/60">
              {items.map((item) => (
                <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex items-center gap-4 sm:gap-6">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-2xl bg-[#FAF7F0] border border-[#EDE2CB] p-2 flex items-center justify-center shrink-0">
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#263F27] truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#536B3F] font-semibold mt-0.5">
                      Pack: {item.size}
                    </p>
                    <p className="text-xs text-[#282619]/60 font-serif font-bold mt-1">
                      {formatCurrency(item.price)} each
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center rounded-full bg-[#FAF7F0] border border-[#EDE2CB] p-0.5">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[#282619] hover:bg-white transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center text-xs font-bold text-[#263F27]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[#282619] hover:bg-white transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right shrink-0">
                    <span className="font-serif text-sm sm:text-base font-bold text-[#263F27] block">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-[11px] text-red-500 hover:text-red-700 mt-1 flex items-center gap-1 ml-auto"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <Link to="/shop" className="text-[#536B3F] font-semibold hover:underline">
                ← Continue Shopping
              </Link>
              <span className="text-[#282619]/60">{totalItems} items in cart</span>
            </div>
          </div>

          {/* Summary Column (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Coupon Box */}
            <div className="p-6 rounded-3xl bg-white/95 border border-[#EDE2CB] shadow-soft space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#263F27] block">
                Have a Promo Code?
              </span>
              {appliedCoupon ? (
                <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#536B3F]/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#536B3F]" />
                    <span className="font-mono text-xs font-bold text-[#263F27]">{appliedCoupon}</span>
                    <span className="text-[10.5px] text-[#536B3F] font-semibold">(15% OFF Applied)</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs text-red-500 font-semibold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter FIRST15"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-full bg-[#FAF7F0] border border-[#EDE2CB] text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-[#C6A16A]"
                  />
                  <button type="submit" className="btn-forest text-xs py-2.5 px-5">
                    Apply
                  </button>
                </form>
              )}
              {couponFeedback && (
                <p className={`text-xs ${couponFeedback.success ? 'text-[#536B3F]' : 'text-red-600'}`}>
                  {couponFeedback.message}
                </p>
              )}
            </div>

            {/* Total Breakdown Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-[#EDE2CB] shadow-soft space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#263F27] pb-3 border-b border-[#EDE2CB]/70">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm text-[#282619]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#536B3F] font-semibold">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold">
                    {shippingFee === 0 ? (
                      <span className="text-[#536B3F]">FREE</span>
                    ) : (
                      formatCurrency(shippingFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-[#282619]/60">
                  <span>Applicable GST (5%)</span>
                  <span>Included</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EDE2CB] flex justify-between items-baseline">
                <span className="font-serif text-lg font-bold text-[#263F27]">Total</span>
                <span className="font-serif text-2xl font-bold text-[#263F27]">
                  {formatCurrency(total)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setCheckoutOpen(true)}
                className="w-full btn-forest py-4 text-xs font-bold tracking-wider uppercase shadow-soft mt-2"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#536B3F] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Secure Encrypted Payment</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
};

export default CartPage;
