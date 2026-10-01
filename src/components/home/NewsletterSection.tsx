import React, { useState } from 'react';
import { Mail, MessageCircle, ArrowRight, CheckCircle2, Leaf } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate or call real backend newsletter endpoint
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 600);
  };

  return (
    <section className="py-20 lg:py-24 bg-[#263F27] text-[#F7F1E4] relative overflow-hidden">
      {/* Decorative Botanical Background Silhouettes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#536B3F]/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C6A16A]/15 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#536B3F]/30 text-[#C6A16A] text-xs font-semibold uppercase tracking-widest border border-[#536B3F]/40">
              <Leaf className="w-3.5 h-3.5" />
              <span>JOIN OUR WELLNESS CIRCLE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F7F1E4] leading-tight">
              Bring Nature Closer to Home
            </h2>

            <p className="text-sm sm:text-base text-[#F7F1E4]/80 max-w-xl font-normal leading-relaxed">
              Discover traditional foods, new arrivals, Vedic recipes, and seasonal harvest updates from Ruthved Organic.
            </p>
          </div>

          {/* Right: Form & WhatsApp Box */}
          <div className="lg:col-span-5 space-y-5">
            {subscribed ? (
              <div className="p-6 rounded-2xl bg-[#344F34] border border-[#536B3F] text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#C6A16A] mx-auto" />
                <h4 className="font-serif text-lg font-bold text-[#F7F1E4]">
                  Welcome to Ruthved Organic!
                </h4>
                <p className="text-xs text-[#F7F1E4]/80">
                  Thank you for subscribing. We've sent a special welcome discount to your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[#A5AD89] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/10 border border-[#A5AD89]/40 text-[#F7F1E4] placeholder-[#F7F1E4]/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A16A] focus:border-transparent transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-harvest shrink-0"
                  >
                    <span>{loading ? 'Subscribing...' : 'Subscribe'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[11px] text-[#A5AD89] text-center sm:text-left">
                  By subscribing, you agree to receive brand updates. You can unsubscribe anytime.
                </p>
              </form>
            )}

            {/* Direct WhatsApp Enquiry Box */}
            <div className="pt-3 border-t border-[#344F34] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <span className="text-xs text-[#F7F1E4]/80">
                Have questions or need bulk order assistance?
              </span>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#344F34] hover:bg-[#466746] text-[#F7F1E4] text-xs font-semibold transition-all border border-[#536B3F]/60"
              >
                <MessageCircle className="w-4 h-4 text-[#C6A16A]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
