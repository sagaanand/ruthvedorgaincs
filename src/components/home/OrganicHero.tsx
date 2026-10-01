import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

export const OrganicHero: React.FC = () => {
  const highlights = [
    {
      title: '100% Natural Ingredients',
      description: 'Zero adulteration, additives or chemicals',
      icon: Leaf,
    },
    {
      title: 'Traditional Preparation',
      description: 'Vedic Bilona & wood-pressed Mara Chekku',
      icon: Sparkles,
    },
    {
      title: 'Sourced from Trusted Farmers',
      description: 'Native grass-fed cows & sustainable farms',
      icon: HeartHandshake,
    },
    {
      title: 'No Added Preservatives',
      description: 'Raw, pure & packaged in glass vessels',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F7F1E4] border-b border-[#EDE2CB]">
      {/* Container with Split Composition (43% Left / 57% Right on Desktop) */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[640px] lg:min-h-[700px] items-stretch">
        
        {/* ========================================================
            LEFT PANEL: 43% Content with Parchment & Watercolor Wash
            ======================================================== */}
        <div className="lg:col-span-5 flex flex-col justify-center px-6 sm:px-10 lg:pl-12 lg:pr-8 py-12 lg:py-16 relative bg-[#F7F1E4] bg-[url('/images/textures/parchment.jpg')] bg-repeat [background-size:500px_auto] [background-blend-mode:multiply] z-10">
          
          {/* Subtle botanical branch background wash */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[url('/images/textures/watercolor-wash.jpg')] bg-cover opacity-20 pointer-events-none rounded-full blur-xl" />
          
          <div className="space-y-6 relative z-10">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#536B3F]/10 border border-[#536B3F]/20 text-[#536B3F] text-xs font-semibold uppercase tracking-widest"
            >
              <Leaf className="w-3.5 h-3.5 text-[#536B3F]" />
              <span>TRADITIONAL FOODS FOR A HEALTHIER TOMORROW</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#263F27] leading-[1.12] tracking-tight"
            >
              Goodness from <span className="italic font-normal text-[#C6A16A]">Nature</span> to Your Home
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#282619]/80 font-normal leading-relaxed max-w-xl"
            >
              Discover the purity of traditional Indian foods, thoughtfully prepared for your family.
              Handcrafted A2 Desi Cow Bilona Ghee, virgin wood-pressed oils, and raw forest honey.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                to="/shop"
                className="btn-forest group"
              >
                <span>Shop Our Products</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/story"
                className="btn-outline-forest"
              >
                <span>Discover Our Story</span>
              </Link>
            </motion.div>

            {/* Four Compact Illustrated Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 pt-8 border-t border-[#EDE2CB]"
            >
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#536B3F]/10 text-[#536B3F] shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4 stroke-[1.8]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#263F27] leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#282619]/70 leading-normal mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* ========================================================
            RIGHT PANEL: 57% Editorial Organic Product Photography
            ======================================================== */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[480px] lg:min-h-full overflow-hidden bg-[#EDE2CB]">
          
          {/* Subtle Organic Torn Paper Left Boundary on Desktop */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-8 z-20 pointer-events-none bg-gradient-to-r from-[#F7F1E4] to-transparent" />

          {/* High Resolution Editorial Lifestyle Composition */}
          <img
            src="/images/lifestyle/hero-composition.jpg"
            alt="Ruthved Organic A2 Desi Cow Bilona Ghee, Cold-Pressed Virgin Oils, and Forest Honey"
            className="w-full h-full object-cover object-center transform scale-100 hover:scale-102 transition-transform duration-1000 ease-out"
            loading="eager"
          />

          {/* Decorative Floating Organic Badge */}
          <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-20 bg-[#F7F1E4]/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-premium border border-[#EDE2CB] max-w-[240px]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#263F27] text-[#C6A16A] flex items-center justify-center shrink-0">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#536B3F] font-bold">100% Authentic</p>
                <p className="text-xs font-serif font-semibold text-[#263F27]">Vedic Bilona Churned</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
