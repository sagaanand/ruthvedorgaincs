import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle, Mail, HelpCircle, Sparkles } from 'lucide-react';
import { FAQS } from '../data/faqData';
import { BUSINESS_INFO } from '../data/businessInfo';

export const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'products' | 'ordering' | 'usage'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-4']);

  const toggleAccordion = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-8 sm:py-16 space-y-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-gold-600 uppercase tracking-widest text-xs font-semibold">
          Customer Clarity & Support
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-900">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-forest-600 leading-relaxed">
          Learn about our traditional Vedic preparation techniques, cold extraction, door delivery, and product shelf life.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-forest-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs (e.g. Bilona, shipping, skin care)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-ivory-300 rounded-full text-sm text-forest-900 placeholder:text-forest-400 shadow-soft focus:outline-none focus:ring-2 focus:ring-forest-800"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {(['all', 'products', 'ordering', 'usage'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'bg-white text-forest-700 hover:bg-ivory-200 border border-ivory-200'
              }`}
            >
              {cat === 'all'
                ? 'All Questions'
                : cat === 'products'
                ? 'Our Products & Bilona'
                : cat === 'ordering'
                ? 'Shipping & Delivery'
                : 'Storage & Usage'}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-ivory-200 text-forest-600 space-y-2">
            <HelpCircle className="w-8 h-8 text-forest-400 mx-auto" />
            <p className="font-serif text-lg font-bold text-forest-900">No matching answers found</p>
            <p className="text-xs text-forest-500">
              Try searching for different keywords or ask us directly on WhatsApp.
            </p>
          </div>
        ) : (
          filteredFaqs.map(faq => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-ivory-200/90 shadow-soft overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-ivory-50/50 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-serif font-bold text-base sm:text-lg text-forest-900">
                    {faq.question}
                  </h3>
                  <div
                    className={`w-8 h-8 rounded-full bg-ivory-100 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-forest-800 text-white' : 'text-forest-700'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-forest-700/90 leading-relaxed border-t border-ivory-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Card */}
      <div className="bg-ivory-50 rounded-3xl p-8 border border-ivory-200 text-center space-y-4 shadow-soft">
        <Sparkles className="w-8 h-8 text-gold-600 mx-auto" />
        <h3 className="font-serif text-2xl font-bold text-forest-900">
          Still Have Questions?
        </h3>
        <p className="text-xs sm:text-sm text-forest-600 max-w-md mx-auto">
          Our friendly customer team in Bengaluru is available to answer any questions about our artisanal ghee or cold-pressed oils.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-emerald-700 hover:bg-emerald-800 text-xs py-3 px-6 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="btn-outline-forest text-xs py-3 px-6 flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Email Customer Care</span>
          </a>
        </div>
      </div>

    </div>
  );
};
