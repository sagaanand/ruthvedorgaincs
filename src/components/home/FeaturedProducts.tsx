import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { OrganicProductCard } from '../products/OrganicProductCard';
import { WatercolorDivider } from '../common/WatercolorDivider';

export const FeaturedProducts: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Selections' },
    { id: 'ghee', name: 'A2 Desi Ghee' },
    { id: 'oils', name: 'Wood-Pressed Oils' },
    { id: 'honey', name: 'Raw Forest Honey' },
    { id: 'wellness', name: 'Wellness & Dhoop' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => {
        if (activeCategory === 'ghee') return p.category === 'ghee';
        if (activeCategory === 'oils') return p.category === 'oils';
        if (activeCategory === 'honey') return p.category === 'honey';
        if (activeCategory === 'wellness') return p.category === 'wellness' || p.category === 'combos';
        return true;
      });

  return (
    <section className="py-20 lg:py-28 bg-[#F7F1E4] bg-[url('/images/textures/parchment.jpg')] bg-repeat [background-size:600px_auto] [background-blend-mode:multiply] relative border-b border-[#EDE2CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#536B3F] block mb-2">
            HARVESTED WITH REVERENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263F27]">
            Nature's Finest Selection
          </h2>
          <WatercolorDivider className="my-2" />
          <p className="text-sm sm:text-base text-[#282619]/75 font-normal mt-2">
            Every product is handcrafted in small batches to preserve natural life-force (Prana), authentic aroma, and wholesome nutrition.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#263F27] text-[#F7F1E4] shadow-xs'
                  : 'bg-white/80 text-[#282619]/75 hover:bg-white hover:text-[#263F27] border border-[#EDE2CB]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.slice(0, 8).map((product) => (
            <OrganicProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/shop"
            className="btn-outline-forest group inline-flex items-center gap-2 px-8 py-3.5"
          >
            <span>Explore Complete Shop ({PRODUCTS.length} Traditional Products)</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};
