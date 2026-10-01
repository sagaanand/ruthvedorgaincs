import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
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
    removeCoupon,
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
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-[#263F27]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      >
        {/* Slide-over Panel */}
        <div
          className="fixed inset-y-0 right-0 max-w-full flex pl-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-screen max-w-md bg-[#F7F1E4] shadow-elevated flex flex-col h-full border-l border-[#EDE2CB]">
            
            {/* Header */}
            <div className="p-5 border-b border-[#EDE2CB] bg-white/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#263F27]" />
                <h3 className="font-serif text-lg font-bold text-[#263F27]">
                  Your Basket ({totalItems})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full text-[#282619]/60 hover:text-[#263F27] hover:bg-[#FAF7F0] transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="p-4 bg-white/95 border-b border-[#EDE2CB] space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#263F27]">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#C6A16A]" />
                  {amountNeeded > 0 ? (
                    <span>Add ₹{amountNeeded} for FREE Express Shipping</span>
                  ) : (
                    <span className="text-[#536B3F] font-bold">You've unlocked FREE Shipping!</span>
                  )}
                </span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#FAF7F0] overflow-hidden border border-[#EDE2CB]">
                <div
                  className="h-full bg-[#536B3F] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#EDE2CB]/60">
              {items.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-[#536B3F] border border-[#EDE2CB]">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#263F27]">Your basket is empty</h4>
                  <p className="text-xs text-[#282619]/60 max-w-xs mx-auto">
                    Add handcrafted Vedic A2 Desi Ghee or cold-pressed virgin oils to start nourishing your family.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="btn-forest text-xs py-2.5 px-6 inline-block"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex items-center gap-3.5">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-white border border-[#EDE2CB] p-1.5 flex items-center justify-center shrink-0">
                      <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>

                    {/* Meta */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-bold text-[#263F27] truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#536B3F] font-semibold">{item.size}</p>
                      <p className="text-xs font-serif font-bold text-[#263F27] mt-0.5">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>

                    {/* Quantity Counter */}
                    <div className="flex items-center rounded-full bg-white border border-[#EDE2CB] p-0.5 shadow-xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#282619] hover:bg-[#FAF7F0]"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#263F27]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#282619] hover:bg-[#FAF7F0]"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#EDE2CB] bg-white/95 space-y-4">
                
                {/* Coupon Input */}
                {appliedCoupon ? (
                  <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#536B3F]/40 flex items-center justify-between text-xs">
                    <span className="font-mono text-[#263F27] font-bold">
                      {appliedCoupon} (15% OFF)
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-red-500 font-semibold hover:underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon (FIRST15)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-[#FAF7F0] border border-[#EDE2CB] text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-[#C6A16A]"
                    />
                    <button type="submit" className="btn-forest text-xs py-2 px-4">
                      Apply
                    </button>
                  </form>
                )}

                {couponFeedback && (
                  <p className={`text-[11px] font-medium ${couponFeedback.success ? 'text-[#536B3F]' : 'text-red-500'}`}>
                    {couponFeedback.message}
                  </p>
                )}

                {/* Subtotal & Delivery */}
                <div className="space-y-1.5 text-xs text-[#282619]/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#536B3F] font-semibold">
                      <span>Discount</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {shippingFee === 0 ? <span className="text-[#536B3F]">FREE</span> : formatCurrency(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#EDE2CB] text-sm font-bold text-[#263F27]">
                    <span className="font-serif">Total Payable</span>
                    <span className="font-serif text-base">{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutOpen(true);
                    }}
                    className="w-full btn-forest py-3.5 text-xs font-bold uppercase tracking-wider"
                  >
                    <span>Instant Checkout</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                  <Link
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="block text-center text-xs font-semibold text-[#536B3F] hover:underline"
                  >
                    View Full Cart Page
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
};
