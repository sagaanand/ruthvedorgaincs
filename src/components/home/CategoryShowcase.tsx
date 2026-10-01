import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { WatercolorDivider } from '../common/WatercolorDivider';

export const CategoryShowcase: React.FC = () => {
  const categories = [
    {
      id: 'ghee',
      title: 'A2 Desi Cow Ghee',
      subtitle: 'Bilona Churned',
      description: 'Traditional Bilona method for pure nourishment. Handcrafted from cultured curd of grass-fed native cows.',
      cta: 'Shop Ghee',
      link: '/shop?category=ghee',
      image: '/images/photoshoot/DESI GHEE - 1L front.jpg',
      badge: 'Heritage Recipe',
      accentColor: '#C6A16A',
    },
    {
      id: 'oils',
      title: 'Cold-Pressed Oils',
      subtitle: 'Mara Chekku Virgin',
      description: 'Pure oils for a healthy and vibrant lifestyle. Extracted on slow wooden rotaries below 45°C without chemicals.',
      cta: 'Shop Oils',
      link: '/shop?category=oils',
      image: '/images/photoshoot/COCONUT OIL - 1L front.jpg',
      badge: 'Wood-Pressed',
      accentColor: '#536B3F',
    },
    {
      id: 'honey',
      title: 'Organic Honey',
      subtitle: 'Raw Forest Harvest',
      description: "Nature's sweet gift, packed with goodness. Unheated, unfiltered wild multifloral honey from tribal bee-keepers.",
      cta: 'Shop Honey',
      link: '/shop?category=honey',
      image: '/images/photoshoot/HONEY - 1KG back.jpg',
      badge: '100% Unprocessed',
      accentColor: '#C6A16A',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F7F1E4] bg-[url('/images/textures/parchment.jpg')] bg-repeat [background-size:500px_auto] [background-blend-mode:multiply] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#536B3F] block mb-2">
            TRADITIONAL INDIAN NOURISHMENT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263F27]">
            Crafted by Hand, Blessed by Nature
          </h2>
          <WatercolorDivider className="my-2" />
          <p className="text-sm sm:text-base text-[#282619]/75 font-normal mt-2">
            Each category represents generations of Indian agricultural wisdom, harvested with reverence and prepared without compromise.
          </p>
        </div>

        {/* Horizontal Desktop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.link}
              className="group relative flex flex-col rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xs border border-[#EDE2CB] shadow-soft hover:shadow-premium transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Product Image Frame */}
              <div className="relative h-64 sm:h-72 w-full bg-[#FAF7F0] overflow-hidden flex items-center justify-center p-6">
                {/* Subtle parchment texture overlay in card image */}
                <div className="absolute inset-0 bg-[radial-gradient(#C6A16A_0.3px,transparent_0.3px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
                
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-full w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-108 group-hover:rotate-1"
                  loading="lazy"
                />

                {/* Badge */}
                <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 text-[11px] font-semibold text-[#263F27] border border-[#EDE2CB] shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#C6A16A]" />
                  {cat.badge}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between bg-white/90">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#536B3F]">
                    {cat.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#263F27] group-hover:text-[#536B3F] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#282619]/70 leading-relaxed pt-1">
                    {cat.description}
                  </p>
                </div>

                {/* Minimal Text CTA with Arrow */}
                <div className="pt-6 mt-4 border-t border-[#EDE2CB]/60 flex items-center justify-between text-[#263F27] font-semibold text-xs uppercase tracking-wider group-hover:text-[#C6A16A] transition-colors">
                  <span>{cat.cta}</span>
                  <div className="w-8 h-8 rounded-full bg-[#F7F1E4] flex items-center justify-center group-hover:bg-[#263F27] group-hover:text-[#F7F1E4] transition-all duration-300">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
