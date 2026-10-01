import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, User, MessageCircle, AlertCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BUSINESS_INFO } from '../../data/businessInfo';
import { formatCurrency } from '../../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, subtotal, shippingFee, discount, total, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi'>('upi');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !pincode.trim()) {
      return;
    }

    const generatedId = `RO-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderPlaced(true);
    clearCart();
  };

  const handleWhatsAppCheckout = () => {
    const itemList = items
      .map((item, idx) => `${idx + 1}. ${item.name} (${item.size}) x ${item.quantity} = ₹${item.price * item.quantity}`)
      .join('%0A');

    const message = `*New Order Enquiry - Ruthved Organic*%0A%0A*Items:*%0A${itemList}%0A%0A*Subtotal:* ₹${subtotal}%0A*Discount:* -₹${discount}%0A*Delivery:* ${shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}%0A*Total Payable:* ₹${total}%0A%0A*Delivery Details:*%0AName: ${name || 'N/A'}%0APhone: ${phone || 'N/A'}%0AAddress: ${address || 'N/A'}, ${city} - ${pincode || 'N/A'}`;

    window.open(`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-sm animate-in fade-in">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-elevated border border-ivory-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-ivory-200 bg-ivory-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-forest-800" />
            <h3 className="font-serif text-xl font-bold text-forest-900">
              {orderPlaced ? 'Order Confirmation' : 'Complete Your Order'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-forest-500 hover:text-forest-900 rounded-full hover:bg-ivory-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {orderPlaced ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-forest-900">
                Order Received Successfully!
              </h4>
              <p className="text-sm text-forest-600 max-w-md mx-auto">
                Thank you, <strong>{name}</strong>. Your order ID is{' '}
                <span className="font-mono font-bold text-forest-800">{orderId}</span>. Our team in Bengaluru will prepare your pure organic products with care.
              </p>

              <div className="bg-ivory-100 p-4 rounded-xl border border-ivory-200 text-xs text-forest-700 text-left space-y-1.5">
                <p><strong>Shipping to:</strong> {address}, {city} - {pincode}</p>
                <p><strong>Contact Phone:</strong> {phone}</p>
                <p><strong>Payment Mode:</strong> {paymentMethod === 'upi' ? 'UPI on Delivery / Payment Link' : 'Cash on Delivery (COD)'}</p>
              </div>

              {/* Notice regarding frontend demo / whatsapp connection */}
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-800 flex items-start gap-2 text-left">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Frontend Demo Notice:</strong> As this is the frontend presentation build without live backend server integration, no live payment transaction took place. You can also verify or place this order directly with our founders on WhatsApp below.
                </span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsAppCheckout}
                  type="button"
                  className="btn-primary w-full bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order Details via WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  type="button"
                  className="btn-outline-forest w-full"
                >
                  Back to Store
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              {/* Order Summary Snapshot */}
              <div className="bg-ivory-100/70 p-4 rounded-xl border border-ivory-200/90 text-sm">
                <div className="flex justify-between items-center text-forest-700 mb-1">
                  <span>Items Total ({items.length}):</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-rose-600 mb-1">
                    <span>Discount (FIRST15):</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-forest-700 mb-2">
                  <span>Delivery:</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : formatCurrency(shippingFee)}</span>
                </div>
                <div className="flex justify-between items-center text-forest-900 font-bold font-serif text-base pt-2 border-t border-ivory-200">
                  <span>Grand Total:</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-bold text-forest-800 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Customer & Shipping Info
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-forest-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-ivory-300 focus:outline-none focus:ring-2 focus:ring-forest-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-forest-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-ivory-300 focus:outline-none focus:ring-2 focus:ring-forest-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-forest-700 mb-1">Delivery Address *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Flat No., Apartment, Street, Landmark"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-ivory-300 focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-forest-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-ivory-300 focus:outline-none focus:ring-2 focus:ring-forest-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-forest-700 mb-1">PIN Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="560068"
                      value={pincode}
                      onChange={e => setPincode(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-ivory-300 focus:outline-none focus:ring-2 focus:ring-forest-800"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-forest-800 mb-2">
                  Select Payment Option
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-forest-800 bg-forest-50/50 text-forest-900 font-semibold'
                        : 'border-ivory-300 bg-white text-forest-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="text-forest-800 focus:ring-forest-800"
                    />
                    <span className="text-xs">UPI / GPay / PhonePe</span>
                  </label>

                  <label
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-forest-800 bg-forest-50/50 text-forest-900 font-semibold'
                        : 'border-ivory-300 bg-white text-forest-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-forest-800 focus:ring-forest-800"
                    />
                    <span className="text-xs">Cash on Delivery (COD)</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="submit"
                  className="btn-primary w-full py-3.5 text-center text-sm font-bold tracking-wider"
                >
                  Confirm & Place Order ({formatCurrency(total)})
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="inline-flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Prefer to order directly via WhatsApp? Click here</span>
                </button>
              </div>

              <div className="text-[11px] text-forest-500 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
                <span>100% Secure Checkout • Bilona Pure Quality Guarantee</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
