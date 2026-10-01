import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle, HelpCircle, Leaf } from 'lucide-react';
import { FAQS } from '../data/faqData';
import { BUSINESS_INFO } from '../data/businessInfo';
import { WatercolorDivider } from '../components/common/WatercolorDivider';

export const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'products' | 'ordering' | 'usage'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-4']);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F7F1E4] bg-[url('/images/textures/parchment.jpg')] bg-repeat [background-size:600px_auto] [background-blend-mode:multiply] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#536B3F]/10 text-[#536B3F] text-xs font-semibold uppercase tracking-widest">
            <Leaf className="w-3.5 h-3.5 text-[#536B3F]" />
            <span>TRANSPARENCY & CLARITY</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#263F27]">
            Frequently Asked Questions
          </h1>
          <WatercolorDivider className="my-2" />
          <p className="text-sm sm:text-base text-[#282619]/75 leading-relaxed font-normal">
            Everything you need to know about our Vedic Bilona method, wood-pressed oil extraction, storage instructions, and pan-India shipping.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-[#A5AD89] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. Bilona, shipping, hair care)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/95 border border-[#EDE2CB] rounded-full text-xs sm:text-sm text-[#282619] placeholder-[#282619]/50 shadow-soft focus:outline-none focus:ring-1 focus:ring-[#C6A16A]"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'products', label: 'Products & Purity' },
              { id: 'ordering', label: 'Ordering & Shipping' },
              { id: 'usage', label: 'Usage & Shelf Life' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#263F27] text-[#F7F1E4] shadow-xs'
                    : 'bg-white text-[#282619]/75 border border-[#EDE2CB] hover:bg-[#FAF7F0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-white/90 backdrop-blur-xs border border-[#EDE2CB] shadow-soft overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none group cursor-pointer"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#263F27] group-hover:text-[#536B3F] transition-colors">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-[#263F27] text-[#F7F1E4] rotate-180' : 'bg-[#FAF7F0] text-[#536B3F]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#282619]/80 leading-relaxed border-t border-[#EDE2CB]/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 p-6 rounded-2xl bg-white/80 border border-[#EDE2CB]">
              <HelpCircle className="w-8 h-8 text-[#C6A16A] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#263F27]">No questions found</p>
              <p className="text-xs text-[#282619]/60 mt-1">
                Try searching for a different keyword or chat with our support team on WhatsApp.
              </p>
            </div>
          )}
        </div>

        {/* Support Direct Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#263F27] text-[#F7F1E4] shadow-premium text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif text-xl sm:text-2xl font-bold">Still have questions?</h3>
            <p className="text-xs sm:text-sm text-[#F7F1E4]/80">
              Our organic food experts in Bengaluru are always happy to help with storage, usage, or bulk orders.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-harvest text-xs py-3 px-6"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQPage;
