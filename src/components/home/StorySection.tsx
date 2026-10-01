import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Quote } from 'lucide-react';
import { WatercolorDivider } from '../common/WatercolorDivider';

export const StorySection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F7F1E4] bg-[url('/images/textures/parchment.jpg')] bg-repeat [background-size:600px_auto] [background-blend-mode:multiply] relative overflow-hidden border-t border-[#EDE2CB]">
      
      {/* Decorative Botanical Leaf Silhouettes in Background */}
      <div className="absolute top-10 left-6 w-56 h-56 text-[#536B3F]/5 pointer-events-none -z-0">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 C60 30, 90 40, 100 50 C70 60, 60 90, 50 100 C40 70, 10 60, 0 50 C30 40, 40 10, 50 0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ========================================================
              LEFT COLUMN: Heading, Narrative, and CTA
              ======================================================== */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#536B3F]/10 text-[#536B3F] text-xs font-semibold uppercase tracking-widest">
              <Leaf className="w-3.5 h-3.5 text-[#536B3F]" />
              <span>ROOTED IN TRADITION</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263F27] leading-tight">
              Our Story
            </h2>

            <WatercolorDivider className="justify-center lg:justify-start my-2" />

            <div className="space-y-4 text-sm sm:text-base text-[#282619]/80 leading-relaxed font-normal">
              <p>
                Ruthved Organic was born from a simple belief — that real food, made the traditional way,
                can create a healthier world. Inspired by the timeless wisdom of Indian culinary traditions,
                we bring thoughtfully prepared products from trusted sources to your home.
              </p>
              <p>
                Our A2 Desi Cow Ghee is made solely through the ancient Vedic Bilona method — slow-churning
                cultured whole curd from grass-fed native Indian cows. Every drop of oil is pressed on
                traditional wooden rotaries without heating, preserving life-giving micronutrients.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/story"
                className="btn-forest group"
              >
                <span>Read Our Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* ========================================================
              CENTER COLUMN: Farm Lifestyle Photo with Organic Mask
              ======================================================== */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] p-3 rounded-[2.5rem] bg-white/70 border border-[#EDE2CB] shadow-premium">
              <div className="w-full h-full overflow-hidden rounded-[2.2rem]">
                <img
                  src="/images/lifestyle/countryside-farm.jpg"
                  alt="Native Indian Desi Gir cows grazing peacefully in organic lush pastures at golden hour"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Verified Origin Stamp */}
              <div className="absolute -bottom-4 -left-4 bg-[#263F27] text-[#F7F1E4] px-4 py-2.5 rounded-2xl shadow-elevated border border-[#344F34] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6A16A] animate-ping" />
                <span className="text-xs font-serif italic tracking-wide">Grass-Fed Native Cows</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: Decorative Brand Quotation & Botanical Accent
              ======================================================== */}
          <div className="lg:col-span-3 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6 p-6 rounded-3xl bg-white/50 border border-[#EDE2CB]/70">
            <Quote className="w-10 h-10 text-[#C6A16A]/70 stroke-[1.2]" />
            
            <blockquote className="font-cormorant italic text-2xl sm:text-3xl text-[#263F27] leading-snug">
              "Real food, made the traditional way, can heal and nourish generations."
            </blockquote>

            <div className="w-16 h-[1.5px] bg-[#C6A16A]" />

            <div className="space-y-1">
              <p className="font-serif text-sm font-bold text-[#263F27]">Saga Anand</p>
              <p className="text-xs text-[#536B3F] uppercase tracking-wider font-semibold">Founder, Ruthved Organic</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
