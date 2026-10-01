import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
  MessageCircle,
  Leaf
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { WatercolorDivider } from '../components/common/WatercolorDivider';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#F7F1E4] bg-[url('/images/textures/parchment.jpg')] bg-repeat [background-size:600px_auto] [background-blend-mode:multiply] py-12 sm:py-20 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto px-4 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#536B3F]/10 text-[#536B3F] text-xs font-semibold uppercase tracking-widest">
          <Leaf className="w-3.5 h-3.5" />
          <span>CUSTOMER CARE & CORPORATE ENQUIRIES</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#263F27]">
          Get in Touch
        </h1>
        <WatercolorDivider className="my-2" />
        <p className="text-sm sm:text-base text-[#282619]/75 font-normal leading-relaxed">
          We’d love to hear from you! Reach out for bulk orders, customized festive gift boxes, or questions about our authentic Vedic Bilona process.
        </p>
      </div>

      {/* Main Grid: Form + Contact Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Form Column (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white/95 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#EDE2CB] shadow-soft">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#263F27] mb-2">
            Send Us a Message
          </h2>
          <p className="text-xs sm:text-sm text-[#282619]/70 mb-6">
            Fill out the form below and our team will get back to you within 24 business hours.
          </p>

          {submitted ? (
            <div className="p-8 text-center bg-[#FAF7F0] border border-[#A5AD89] rounded-2xl space-y-3">
              <CheckCircle className="w-10 h-10 text-[#536B3F] mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#263F27]">
                Thank you for reaching out!
              </h3>
              <p className="text-xs sm:text-sm text-[#282619]/75">
                We have received your message and will reply shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-outline-forest text-xs py-2 px-5 mt-2"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#263F27] mb-1.5 uppercase tracking-wider">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Aditi Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#EDE2CB] text-xs sm:text-sm text-[#282619] placeholder-[#282619]/40 focus:outline-none focus:ring-1 focus:ring-[#C6A16A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#263F27] mb-1.5 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="aditi@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#EDE2CB] text-xs sm:text-sm text-[#282619] placeholder-[#282619]/40 focus:outline-none focus:ring-1 focus:ring-[#C6A16A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#263F27] mb-1.5 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#EDE2CB] text-xs sm:text-sm text-[#282619] placeholder-[#282619]/40 focus:outline-none focus:ring-1 focus:ring-[#C6A16A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#263F27] mb-1.5 uppercase tracking-wider">
                    Topic of Enquiry
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#EDE2CB] text-xs sm:text-sm text-[#282619] focus:outline-none focus:ring-1 focus:ring-[#C6A16A]"
                  >
                    <option value="">General Question</option>
                    <option value="bulk">Bulk / Corporate Order</option>
                    <option value="bilona">A2 Ghee Preparation Method</option>
                    <option value="shipping">Delivery / Tracking Status</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#263F27] mb-1.5 uppercase tracking-wider">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help your family enjoy authentic organic foods?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F0] border border-[#EDE2CB] text-xs sm:text-sm text-[#282619] placeholder-[#282619]/40 focus:outline-none focus:ring-1 focus:ring-[#C6A16A]"
                />
              </div>

              <button
                type="submit"
                className="btn-forest py-3.5 px-8 text-xs font-semibold"
              >
                <span>Send Note</span>
                <Send className="w-4 h-4 ml-1.5" />
              </button>
            </form>
          )}
        </div>

        {/* Contact Information Cards (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-8 rounded-3xl bg-white/95 border border-[#EDE2CB] shadow-soft space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#263F27]">
              Visit or Call Us
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#282619]/80">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] text-[#536B3F] shrink-0 border border-[#EDE2CB]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#263F27]">Headquarters</h4>
                  <p className="mt-0.5 leading-relaxed">
                    {BUSINESS_INFO.address.fullFormatted}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] text-[#536B3F] shrink-0 border border-[#EDE2CB]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#263F27]">Customer Care Helpline</h4>
                  <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-[#263F27] font-semibold hover:text-[#C6A16A]">
                    {BUSINESS_INFO.phone}
                  </a>
                  <p className="text-[11px] text-[#282619]/60 mt-0.5">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#FAF7F0] text-[#536B3F] shrink-0 border border-[#EDE2CB]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#263F27]">Order Enquiries</h4>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="text-[#263F27] font-semibold hover:text-[#C6A16A]">
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-4 border-t border-[#EDE2CB]">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#263F27] text-[#F7F1E4] hover:bg-[#1B2C1C] text-xs font-semibold transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#C6A16A]" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactPage;
