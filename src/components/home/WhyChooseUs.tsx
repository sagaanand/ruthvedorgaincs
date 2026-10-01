import React from 'react';
import { Sparkles, Leaf, ShieldCheck, Package, Award, ArrowUpRight } from 'lucide-react';
import { WatercolorDivider } from '../common/WatercolorDivider';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      id: 'traditional-preparation',
      number: '01',
      title: 'Traditional Preparation',
      subtitle: 'Vedic Bilona & Mara Chekku',
      description:
        'We strictly adhere to centuries-old Ayurvedic methods. Our Ghee is hand-churned from cultured curd (Makkhan) using bi-directional wooden bilonas, and our virgin oils are pressed at ambient temperatures on wooden expellers.',
      icon: Sparkles,
      className: 'lg:col-span-7 bg-[#FAF7F0]',
    },
    {
      id: 'carefully-selected',
      number: '02',
      title: 'Carefully Selected Ingredients',
      subtitle: 'Native Heirloom Crops',
      description:
        'Sourced directly from certified organic smallholder farms in Karnataka and Tamil Nadu. Only single-origin native Indian sesame, small-grain mustard, and sun-dried coconut copra are selected.',
      icon: Leaf,
      className: 'lg:col-span-5 bg-[#EFF1EA]',
    },
    {
      id: 'quality-focused',
      number: '03',
      title: 'Quality-Focused Processes',
      subtitle: 'Zero Adulteration or Chemicals',
      description:
        'Every batch undergoes rigorous quality testing. We never use artificial deodorizers, chemical hexane extraction, bleaches, or micro-filtration that strip natural aromas.',
      icon: ShieldCheck,
      className: 'lg:col-span-4 bg-[#EFF1EA]',
    },
    {
      id: 'thoughtful-packaging',
      number: '04',
      title: 'Thoughtful Packaging',
      subtitle: 'Food-Grade Glass & Pure Tins',
      description:
        'Plastic leaches endocrine disruptors into pure oils and ghee. Ruthved Organic exclusively packages in heavy UV-resistant glass jars and food-grade metal canisters.',
      icon: Package,
      className: 'lg:col-span-4 bg-[#FAF7F0]',
    },
    {
      id: 'commitment-authenticity',
      number: '05',
      title: 'Commitment to Authenticity',
      subtitle: 'Honest Indian Superfoods',
      description:
        'No false health claims or trendy gimmicks. Just pure, wholesome, traditional foods crafted with reverence for nature and your family’s wellness.',
      icon: Award,
      className: 'lg:col-span-4 bg-[#FAF7F0]',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#EFF1EA] bg-[url('/images/textures/parchment.jpg')] bg-repeat [background-size:600px_auto] [background-blend-mode:multiply] border-y border-[#A5AD89]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#536B3F] block mb-2">
            CONSCIOUS CRAFTSMANSHIP
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263F27]">
            Why Choose Ruthved Organic
          </h2>
          <WatercolorDivider className="my-2" />
          <p className="text-sm sm:text-base text-[#282619]/75 font-normal mt-2">
            In an era of industrial shortcuts and mass chemical processing, we remain uncompromising in our dedication to true purity and traditional heritage.
          </p>
        </div>

        {/* Asymmetrical 5-Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                className={`${b.className} p-8 sm:p-10 rounded-3xl border border-[#EDE2CB] shadow-soft hover:shadow-premium transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden flex flex-col justify-between`}
              >
                {/* Large Background Number */}
                <span className="absolute top-4 right-6 font-serif text-4xl sm:text-5xl font-bold text-[#C6A16A]/15 select-none pointer-events-none group-hover:text-[#C6A16A]/30 transition-colors">
                  {b.number}
                </span>

                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-[#EDE2CB] flex items-center justify-center text-[#536B3F] group-hover:bg-[#263F27] group-hover:text-[#C6A16A] transition-colors">
                    <Icon className="w-6 h-6 stroke-[1.6]" />
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#536B3F] block mb-1">
                      {b.subtitle}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#263F27]">
                      {b.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#282619]/75 leading-relaxed font-normal">
                    {b.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#EDE2CB]/60 flex items-center gap-2 text-xs font-semibold text-[#536B3F] group-hover:text-[#263F27]">
                  <span>Verified Standard</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
