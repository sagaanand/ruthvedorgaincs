import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Leaf,
  CheckCircle2,
  XCircle,
  Package,
  ArrowRight
} from 'lucide-react';
import { WatercolorDivider } from '../components/common/WatercolorDivider';

export const WhyUsPage: React.FC = () => {
  const comparisonItems = [
    {
      feature: 'Source of Milk / Seeds',
      ruthved: 'Grass-fed native Gir & Hallikar cows; certified organic single-origin seeds',
      commercial: 'Factory feedlot Holstein/Jersey crossbred cows; mixed commercial crops with pesticide residues',
    },
    {
      feature: 'Extraction Technique',
      ruthved: 'Vedic Bilona hand churning from whole curd & slow Mara Chekku wooden expellers',
      commercial: 'High-speed industrial centrifuges, chemical hexane solvents, and heat above 200°C',
    },
    {
      feature: 'Nutritional Integrity',
      ruthved: '100% active butyric acid, natural vitamins A, D, E, K, and volatile natural aromas intact',
      commercial: 'Stripped by chemical bleaching, deodorizing, and hydrogenated trans fats',
    },
    {
      feature: 'Packaging Standard',
      ruthved: 'Heavy UV-protected food-grade glass jars and food-safe recyclable metal tins',
      commercial: 'Cheap single-use PET plastic bottles that leach microplastics and phthalates',
    },
    {
      feature: 'Artificial Additives',
      ruthved: 'Strictly ZERO preservatives, synthetic colorants, stabilizers, or artificial fragrances',
      commercial: 'Preservatives (TBHQ, BHA/BHT), synthetic beta-carotene, and artificial butter flavoring',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F1E4] bg-[url('/images/textures/parchment.jpg')] bg-repeat [background-size:600px_auto] [background-blend-mode:multiply] py-12 sm:py-20 space-y-20">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#536B3F]/10 text-[#536B3F] text-xs font-semibold uppercase tracking-widest">
          <Leaf className="w-3.5 h-3.5" />
          <span>TRUE TRANSPARENCY & INTEGRITY</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#263F27] leading-tight">
          Why Choose Ruthved Organic
        </h1>
        <WatercolorDivider className="my-2" />
        <p className="text-base sm:text-lg text-[#282619]/80 leading-relaxed font-normal max-w-2xl mx-auto">
          We believe in complete transparency about how our food is grown, harvested, and crafted. See how our artisanal Vedic methods stand apart from modern industrial mass-production.
        </p>
      </section>

      {/* Comparison Table Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 rounded-3xl border border-[#EDE2CB] shadow-soft overflow-hidden">
          
          <div className="p-6 sm:p-10 border-b border-[#EDE2CB] bg-[#FAF7F0] text-center sm:text-left">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#263F27]">
              The Purity Difference
            </h2>
            <p className="text-xs sm:text-sm text-[#282619]/70 mt-1">
              A factual comparison between Ruthved Organic artisanal methods and conventional commercial supermarket brands.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#EDE2CB] bg-[#F7F1E4]/70">
                  <th className="py-4 px-6 font-serif font-bold text-[#263F27] w-1/4">Attribute</th>
                  <th className="py-4 px-6 font-serif font-bold text-[#263F27] bg-[#536B3F]/10 w-3/8">
                    <span className="flex items-center gap-1.5 text-[#263F27]">
                      <Sparkles className="w-4 h-4 text-[#C6A16A]" />
                      Ruthved Organic Standard
                    </span>
                  </th>
                  <th className="py-4 px-6 font-serif font-bold text-[#282619]/60 w-3/8">
                    Conventional Supermarket Brands
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE2CB]/60">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF7F0]/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-[#263F27]">
                      {item.feature}
                    </td>
                    <td className="py-4 px-6 bg-[#536B3F]/5 text-[#263F27] font-medium">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#536B3F] shrink-0 mt-0.5" />
                        <span>{item.ruthved}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#282619]/70">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500/70 shrink-0 mt-0.5" />
                        <span>{item.commercial}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* Sourcing & Environmental Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-3xl bg-white/90 border border-[#EDE2CB] shadow-soft space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#536B3F]/10 text-[#536B3F] flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#263F27]">
              Ethical Grass-Fed Native Cows
            </h3>
            <p className="text-xs sm:text-sm text-[#282619]/75 leading-relaxed font-normal">
              Our dairy cows are native Indian breeds (Gir & Hallikar). They are never subjected to hormonal injections or artificial insemination. They graze freely under Karnataka's natural sunshine.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/90 border border-[#EDE2CB] shadow-soft space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C6A16A]/10 text-[#C6A16A] flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#263F27]">
              Zero-Plastic Food Contact
            </h3>
            <p className="text-xs sm:text-sm text-[#282619]/75 leading-relaxed font-normal">
              Edible oils and clarified butter absorb chemical stabilizers when packaged in plastic. We bottle strictly in sterilised heavy glass containers to ensure uncompromised chemical purity.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/90 border border-[#EDE2CB] shadow-soft space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#536B3F]/10 text-[#536B3F] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#263F27]">
              Batch Quality Assured
            </h3>
            <p className="text-xs sm:text-sm text-[#282619]/75 leading-relaxed font-normal">
              Every production lot is lab-tested for fatty acid profile, zero adulteration with palm oil, and negative for chemical pesticides before reaching our packaging facility in Indiranagar Bengaluru.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#263F27]">
          Taste the Difference of Pure Heritage
        </h2>
        <p className="text-sm sm:text-base text-[#282619]/75 max-w-xl mx-auto">
          Treat your kitchen to genuine Vedic Bilona Ghee, fresh cold-pressed oils, and wild raw honey today.
        </p>
        <div>
          <Link to="/shop" className="btn-forest px-8 py-4">
            <span>Explore Organic Products</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default WhyUsPage;
