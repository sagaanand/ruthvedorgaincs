import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import { WatercolorDivider } from '../common/WatercolorDivider';

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F7F1E4] bg-[url('/images/textures/parchment.jpg')] bg-repeat [background-size:600px_auto] [background-blend-mode:multiply] relative border-b border-[#EDE2CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#536B3F] block mb-2">
            TRUSTED BY FAMILIES ACROSS INDIA
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263F27]">
            Words from Our Community
          </h2>
          <WatercolorDivider className="my-2" />
          <p className="text-sm sm:text-base text-[#282619]/75 font-normal mt-2">
            Hear from families and wellness enthusiasts who have made Ruthved Organic a cherished staple in their daily kitchens.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-xs border border-[#EDE2CB] shadow-soft hover:shadow-premium transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-[#C6A16A]/40 mb-4 stroke-[1.5]" />

              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#C6A16A]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="font-serif italic text-base sm:text-lg text-[#263F27] leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              {/* Author & Verified Purchase Badge */}
              <div className="pt-6 mt-6 border-t border-[#EDE2CB]/70 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#263F27]">
                    {t.name}
                  </h4>
                  <p className="text-xs text-[#282619]/60 font-normal">
                    {t.location || 'India'} • {t.product}
                  </p>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#536B3F]/10 text-[#536B3F] text-[10.5px] font-semibold">
                  <ShieldCheck className="w-3 h-3 text-[#536B3F]" />
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
