import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Users,
  Leaf,
  HeartHandshake,
  Award,
  ArrowRight
} from 'lucide-react';
import { MILESTONES, VALUES } from '../data/storyData';

export const OurStoryPage: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-saffron-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-leaf-600" />;
      case 'Users': return <Users className="w-6 h-6 text-gold-600" />;
      case 'Leaf': return <Leaf className="w-6 h-6 text-leaf-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-saffron-500" />;
      default: return <Award className="w-6 h-6 text-gold-600" />;
    }
  };

  return (
    <div className="py-8 sm:py-16 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. HERO HEADER */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-50 border border-saffron-200 text-saffron-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-saffron-500 fill-saffron-500" />
          Rooted in Tradition • Nurtured by Passion
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-forest-950 leading-tight">
          Our Story
        </h1>
        <p className="text-base sm:text-lg text-forest-700/90 leading-relaxed">
          From humble beginnings with a small family farm to becoming a trusted household name in organic purity, our journey has always honored one core truth: true wellness comes from our roots.
        </p>
      </section>

      {/* 2. HERITAGE ESSAY & VISUAL */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-ivory-200 shadow-soft">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5 text-forest-800 text-sm sm:text-base leading-relaxed">
            <span className="text-xs font-bold uppercase tracking-wider text-leaf-700">The Ruthved Philosophy</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
              Trust In Nature’s Best
            </h2>
            <p>
              At Ruthved Organic, we believe the purest solutions for a healthy life come from our roots — in nature, in tradition, and in the love with which we prepare our products.
            </p>
            <p>
              Every jar of Desi Ghee, every drop of cold-pressed oil, and every spoonful of raw wild honey we craft is a tribute to the wisdom passed down through generations. Using age-old, traditional methods like the Vedic Bilona technique and wood-pressed oil extraction, we ensure that what reaches your home is untouched by chemicals and full of nature’s original goodness.
            </p>
            <p className="font-semibold text-forest-950 italic border-l-2 border-saffron-500 pl-4 py-1">
              "Choose Ruthved Organic — where every drop, every grain, and every jar is a step towards wholesome living."
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-premium border border-ivory-200">
              <img
                src="/images/DESI COW GHEE (6).avif"
                alt="Ruthved Organic Traditional Heritage"
                className="w-full h-auto max-h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent flex items-end p-6">
                <p className="text-white text-xs sm:text-sm font-serif">
                  Traditional A2 Gir Cow Bilona Churning • Handcrafted in Bengaluru, Karnataka
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. VERIFIED TIMELINE: THE JOURNEY */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-saffron-600 uppercase tracking-widest text-xs font-bold">Milestones</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 mt-1.5">
            Our Journey Through The Years
          </h2>
          <p className="text-sm text-forest-600 mt-2">
            From our family farm beginnings in 2010 to serving over 50,000 households today.
          </p>
        </div>

        <div className="relative border-l-2 border-saffron-200 ml-4 sm:ml-32 space-y-10 py-4">
          {MILESTONES.map((item, index) => (
            <div key={index} className="relative pl-6 sm:pl-10 group">
              {/* Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-saffron-500 border-4 border-white shadow-sm group-hover:scale-125 transition-transform" />

              {/* Year Stamp */}
              <div className="sm:absolute sm:-left-28 sm:top-1 text-saffron-600 font-serif font-bold text-xl sm:text-right sm:w-20">
                {item.year}
              </div>

              <div className="bg-white rounded-2xl p-6 border border-ivory-200 shadow-soft hover:shadow-premium hover:border-saffron-200 transition-all">
                <h3 className="font-serif text-xl font-bold text-forest-950">{item.title}</h3>
                <p className="text-xs sm:text-sm text-forest-700 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CORE VALUES GRID */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-saffron-600 uppercase tracking-widest text-xs font-bold">Foundational Pillars</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950 mt-1.5">
            Our Guiding Values
          </h2>
          <p className="text-sm text-forest-600 mt-2">
            The principles that guide every batch, every partnership, and every delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map(val => (
            <div
              key={val.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-ivory-200 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-ivory-100 flex items-center justify-center">
                {getIcon(val.iconName)}
              </div>
              <h3 className="font-serif text-xl font-bold text-forest-950">{val.title}</h3>
              <p className="text-xs sm:text-sm text-forest-700/80 leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MISSION STATEMENT */}
      <section className="bg-gradient-to-br from-forest-950 via-[#182917] to-forest-950 text-ivory-100 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-elevated border border-forest-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <span className="text-saffron-400 uppercase tracking-widest text-xs font-bold">Our Eternal Mission</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto leading-tight">
          "To reconnect Indian families with the nourishing power of traditional foods by making authentic, chemical-free organic products accessible to everyone."
        </h2>
        <p className="text-forest-200 text-sm max-w-2xl mx-auto leading-relaxed">
          We are committed to preserving ancient food wisdom while supporting sustainable farming practices that honor both people and the planet. Every jar of Desi Ghee, every drop of cold-pressed oil, and every spoonful of honey carries this mission forward.
        </p>
        <div className="pt-4">
          <Link to="/shop" className="btn-saffron text-xs py-3.5 px-8 shadow-glow-orange inline-flex items-center gap-2">
            <span>Explore Our Organic Range</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};
