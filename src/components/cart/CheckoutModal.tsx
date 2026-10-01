import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, MessageCircle, Lock, ShoppingBag, Truck } from 'lucide-react';
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
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
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

    const message = `*New Order Enquiry - Ruthved Organic*%0A%0A*Items:*%0A${itemList}%0A%0A*Subtotal:* ₹${subtotal}%0A*Discount:* -₹${discount}%0A*Delivery:* ${shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}%0A*Total Payable:* ₹${total}%0A%0A*Customer Details:*%0AName: ${name || 'N/A'}%0APhone: ${phone || 'N/A'}%0AAddress: ${address || 'N/A'}, ${city} - ${pincode || 'N/A'}`;

    window.open(`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#263F27]/70 backdrop-blur-sm animate-in fade-in">
      <div
        className="relative w-full max-w-xl bg-[#F7F1E4] rounded-3xl shadow-elevated border border-[#EDE2CB] overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EDE2CB] bg-white/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#263F27]" />
            <h3 className="font-serif text-xl font-bold text-[#263F27]">
              {orderPlaced ? 'Order Received' : 'Secure Express Checkout'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#282619]/60 hover:text-[#263F27] rounded-full hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {orderPlaced ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#536B3F]/15 text-[#536B3F] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#263F27]">
                Thank You, {name}!
              </h4>
              <p className="text-xs sm:text-sm text-[#282619]/80 max-w-md mx-auto leading-relaxed">
                Your order ID is <strong className="font-mono text-[#263F27] bg-[#EDE2CB] px-2 py-0.5 rounded">{orderId}</strong>. Our team in Bengaluru will prepare your pure Vedic products with care.
              </p>

              <div className="bg-white/90 p-4 rounded-2xl border border-[#EDE2CB] text-xs text-[#282619]/80 text-left space-y-1.5">
                <p><strong>Shipping to:</strong> {address}, {city} - {pincode}</p>
                <p><strong>Contact Phone:</strong> {phone}</p>
                <p><strong>Payment Mode:</strong> {paymentMethod === 'online' ? 'Online Payment (Razorpay / UPI)' : 'Cash on Delivery (COD)'}</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsAppCheckout}
                  type="button"
                  className="btn-forest w-full flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#C6A16A]" />
                  <span>Send Order to Founder on WhatsApp</span>
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
              
              {/* Summary Snapshot */}
              <div className="bg-white/90 p-4 rounded-2xl border border-[#EDE2CB] text-xs sm:text-sm space-y-1.5">
                <div className="flex justify-between items-center text-[#282619]/70">
                  <span>Items Total ({items.length}):</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-[#536B3F] font-semibold">
                    <span>Discount:</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-[#282619]/70">
                  <span>Express Delivery:</span>
                  <span>{shippingFee === 0 ? <strong className="text-[#536B3F]">FREE</strong> : formatCurrency(shippingFee)}</span>
                </div>
                <div className="flex justify-between items-center text-[#263F27] font-bold font-serif text-base pt-2 border-t border-[#EDE2CB]">
                  <span>Total Payable:</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-3">
                <h4 className="font-serif text-base font-bold text-[#263F27] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#536B3F]" />
                  <span>Shipping Address</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#263F27] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Aditi Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE2CB] text-xs text-[#282619] focus:outline-none focus:ring-1 focus:ring-[#C6A16A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#263F27] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE2CB] text-xs text-[#282619] focus:outline-none focus:ring-1 focus:ring-[#C6A16A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#263F27] mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="aditi@example.com (for order updates)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE2CB] text-xs text-[#282619] focus:outline-none focus:ring-1 focus:ring-[#C6A16A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#263F27] mb-1">Delivery Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="Flat / House No., Apartment, Street"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE2CB] text-xs text-[#282619] focus:outline-none focus:ring-1 focus:ring-[#C6A16A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#263F27] mb-1">Postal PIN Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="560038"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE2CB] text-xs text-[#282619] focus:outline-none focus:ring-1 focus:ring-[#C6A16A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#263F27] mb-1">City / State</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EDE2CB] text-xs text-[#282619] focus:outline-none focus:ring-1 focus:ring-[#C6A16A]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-[#263F27] uppercase tracking-wider">
                  Payment Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'online'
                        ? 'border-[#263F27] bg-white ring-1 ring-[#263F27]'
                        : 'border-[#EDE2CB] bg-white/70'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      className="text-[#263F27] focus:ring-0"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#263F27] block">Online Payment</span>
                      <span className="text-[10px] text-[#282619]/60">Razorpay / UPI / Cards</span>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#263F27] bg-white ring-1 ring-[#263F27]'
                        : 'border-[#EDE2CB] bg-white/70'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-[#263F27] focus:ring-0"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#263F27] block">Cash on Delivery</span>
                      <span className="text-[10px] text-[#282619]/60">Pay on Handover</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-forest py-4 text-xs font-bold uppercase tracking-wider shadow-soft"
                >
                  <Lock className="w-3.5 h-3.5 mr-1" />
                  <span>Confirm Order • {formatCurrency(total)}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#536B3F]">
                <ShieldCheck className="w-4 h-4" />
                <span>Encrypted Transaction • FSSAI Food Grade Packaging</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
