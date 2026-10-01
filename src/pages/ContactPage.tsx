import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  MessageCircle
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="py-8 sm:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-gold-600 uppercase tracking-widest text-xs font-semibold">
          Customer Care & Enquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-900">
          Get in Touch
        </h1>
        <p className="text-sm text-forest-600 leading-relaxed">
          We’d love to hear from you! Reach out for bulk orders, customized gift hampers, store visits, or questions about our traditional Bilona process.
        </p>
      </div>

      {/* Main Grid: Form + Contact Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Form Column (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-ivory-200 shadow-soft">
          <h2 className="font-serif text-2xl font-bold text-forest-900 mb-2">
            Send Us a Message
          </h2>
          <p className="text-xs text-forest-600 mb-6">
            Fill out the form below and our family team will respond within 24 business hours.
          </p>

          {submitted ? (
            <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-forest-900">
                Message Sent Successfully!
              </h3>
              <p className="text-xs text-forest-700 max-w-md mx-auto">
                Thank you for reaching out to Ruthved Organic. A customer advisor will contact you shortly via email or phone.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-primary text-xs py-2.5 px-6 mt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1.5 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-ivory-50 border border-ivory-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1.5 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="priya@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-ivory-50 border border-ivory-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5 uppercase tracking-wider">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Product inquiry, bulk order, or store visit"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-ivory-50 border border-ivory-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1.5 uppercase tracking-wider">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Share details of your inquiry or feedback..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-ivory-50 border border-ivory-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-4 text-xs tracking-wider"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Direct WhatsApp Callout */}
          <div className="mt-8 pt-6 border-t border-ivory-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-emerald-600 text-white">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-forest-900">Need Instant Assistance?</h4>
                <p className="text-xs text-forest-600">Chat with us directly on WhatsApp during store hours.</p>
              </div>
            </div>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-emerald-700 hover:bg-emerald-800 text-xs py-2.5 px-5 whitespace-nowrap"
            >
              Open WhatsApp
            </a>
          </div>
        </div>

        {/* Contact Info Column (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-soft space-y-6">
            <h2 className="font-serif text-2xl font-bold text-forest-900">
              Store & Office Information
            </h2>
            
            <ul className="space-y-4 text-sm text-forest-800">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="block text-forest-900">Flagship Store Location</strong>
                  <span className="text-xs text-forest-600 leading-relaxed block mt-0.5">
                    {BUSINESS_INFO.address.fullFormatted}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="block text-forest-900">Phone & WhatsApp Support</strong>
                  <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-xs text-forest-600 hover:text-gold-600 transition-colors block mt-0.5">
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="block text-forest-900">Email Inquiries</strong>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="text-xs text-forest-600 hover:text-gold-600 transition-colors block mt-0.5">
                    {BUSINESS_INFO.email}
                  </a>
                  <a href={`mailto:${BUSINESS_INFO.secondaryEmail}`} className="text-xs text-forest-500 hover:text-gold-600 transition-colors block">
                    {BUSINESS_INFO.secondaryEmail}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3 pt-2 border-t border-ivory-200">
                <Clock className="w-5 h-5 text-gold-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="block text-forest-900">Visiting Hours</strong>
                  <div className="space-y-1 text-xs text-forest-600 mt-1">
                    {BUSINESS_INFO.hours.map((h, i) => (
                      <p key={i}>
                        <span className="font-semibold text-forest-800">{h.days}:</span> {h.time}
                      </p>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Embedded Google Map */}
          <div className="rounded-3xl overflow-hidden border border-ivory-200 shadow-soft h-72">
            <iframe
              src={BUSINESS_INFO.googleMapEmbedUrl}
              title="Ruthved Organic Store Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </div>

    </div>
  );
};
