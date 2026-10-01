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
import { WatercolorDivider } from '../components/common/WatercolorDivider';

export const OurStoryPage: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#C6A16A]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#536B3F]" />;
      case 'Users': return <Users className="w-5 h-5 text-[#C6A16A]" />;
      case 'Leaf': return <Leaf className="w-5 h-5 text-[#536B3F]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-[#C6A16A]" />;
      default: return <Award className="w-5 h-5 text-[#536B3F]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F1E4] bg-[url('/images/textures/parchment.jpg')] bg-repeat [background-size:600px_auto] [background-blend-mode:multiply] py-12 sm:py-20 space-y-20">
      
      {/* 1. HERO HEADER WITH COUNTRYSIDE HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#536B3F]/10 text-[#536B3F] text-xs font-semibold uppercase tracking-widest">
            <Leaf className="w-3.5 h-3.5" />
            <span>ROOTED IN TRADITION • NURTURED BY PASSION</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#263F27] leading-tight">
            Our Story & Heritage
          </h1>
          <WatercolorDivider className="my-2" />
          <p className="text-base sm:text-lg text-[#282619]/80 leading-relaxed font-normal">
            From humble beginnings partnering with native pastoral farmers to becoming a cherished household name in pure organic living, our journey has always honored one core truth: authentic wellness comes from our roots.
          </p>
        </div>

        {/* Full-width countryside hero photo */}
        <div className="mt-12 rounded-3xl overflow-hidden aspect-[21/9] border border-[#EDE2CB] shadow-premium relative">
          <img
            src="/images/lifestyle/countryside-farm.jpg"
            alt="Lush green pastures with native Indian cows grazing under banyan trees at sunrise"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 sm:p-10">
            <p className="text-[#F7F1E4] font-serif italic text-sm sm:text-lg">
              "The soil, the cow, and the human hand — sacred harmony in every harvest."
            </p>
          </div>
        </div>
      </section>

      {/* 2. HERITAGE ESSAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-xs rounded-3xl p-8 sm:p-14 border border-[#EDE2CB] shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-[#282619]/80 text-sm sm:text-base leading-relaxed">
              <span className="text-xs font-bold uppercase tracking-wider text-[#536B3F]">The Ruthved Philosophy</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#263F27]">
                Trust In Nature’s Best
              </h2>
              <p>
                At Ruthved Organic, we believe the purest solutions for a healthy life come from our roots — in nature, in tradition, and in the love with which we prepare our products.
              </p>
              <p>
                Every jar of Desi Ghee, every drop of cold-pressed oil, and every spoonful of raw wild honey we craft is a tribute to the wisdom passed down through generations. Using age-old, traditional methods like the Vedic Bilona technique and wood-pressed oil extraction, we ensure that what reaches your home is untouched by chemicals and full of nature’s original goodness.
              </p>
              <div className="p-5 rounded-2xl bg-[#FAF7F0] border-l-4 border-[#C6A16A] text-[#263F27] font-serif italic text-base sm:text-lg">
                "Choose Ruthved Organic — where every drop, every grain, and every jar is a step towards wholesome living."
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] p-3 rounded-[2.5rem] bg-[#FAF7F0] border border-[#EDE2CB] shadow-premium">
                <div className="w-full h-full overflow-hidden rounded-[2.2rem]">
                  <img
                    src="/images/lifestyle/traditional-bilona.jpg"
                    alt="Authentic traditional wooden Bilona churning in earthen clay pot"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CORE VALUES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#536B3F] block mb-2">
            GUIDING PRINCIPLES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#263F27]">
            Values That Guide Every Harvest
          </h2>
          <WatercolorDivider className="my-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {VALUES.map((val, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white/90 border border-[#EDE2CB] shadow-soft hover:shadow-premium transition-all duration-300 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FAF7F0] border border-[#EDE2CB] flex items-center justify-center">
                {getIcon(val.iconName)}
              </div>
              <h3 className="font-serif text-xl font-bold text-[#263F27]">
                {val.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#282619]/75 leading-relaxed font-normal">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HISTORICAL MILESTONES */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#536B3F] block mb-2">
            OUR JOURNEY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#263F27]">
            Milestones of Trust
          </h2>
          <WatercolorDivider className="my-2" />
        </div>

        <div className="space-y-6">
          {MILESTONES.map((m, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-[#EDE2CB] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C6A16A]">
                  {m.year}
                </span>
                <div className="h-8 w-[1px] bg-[#EDE2CB]" />
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#263F27]">
                    {m.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#282619]/75 mt-0.5">
                    {m.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#263F27]">
          Experience Traditional Indian Purity
        </h2>
        <p className="text-sm sm:text-base text-[#282619]/75 max-w-xl mx-auto">
          Join thousands of mindful Indian families who have replaced refined factory oils and commercial butter with Ruthved Organic.
        </p>
        <div>
          <Link to="/shop" className="btn-forest px-8 py-4">
            <span>Explore The Pantry</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default OurStoryPage;
