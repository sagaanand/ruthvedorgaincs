import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';

export const LifestyleImmersion: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-[#263F27]">
      {/* Full-width Indian Countryside Farm Photography Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/lifestyle/countryside-farm.jpg"
          alt="Lush green pastures with native Indian cows grazing under banyan trees at sunrise"
          className="w-full h-full object-cover object-center filter brightness-50"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#263F27]/90 via-[#263F27]/70 to-[#263F27]/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl space-y-6 text-white">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#536B3F]/40 border border-[#A5AD89]/30 text-[#C6A16A] text-xs font-semibold uppercase tracking-widest backdrop-blur-xs">
            <Leaf className="w-3.5 h-3.5" />
            <span>ETHICAL HARVESTING & PURITY</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#F7F1E4]">
            Reconnecting You with the Wisdom of the Earth
          </h2>

          <p className="text-base sm:text-lg text-[#F7F1E4]/85 leading-relaxed font-normal">
            Every morning across pastoral South India, traditional dairy farmers milk native grass-fed cows,
            wood rotary expellers press golden oils, and tribal honey collectors harvest nectar from deep
            Nilgiri forest canopies. We bring this untouched purity directly to your dining table.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/story"
              className="btn-harvest group"
            >
              <span>Explore Our Roots</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/shop"
              className="btn-outline-white"
            >
              <span>Taste True Purity</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
