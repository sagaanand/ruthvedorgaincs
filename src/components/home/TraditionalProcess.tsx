import React, { useState } from 'react';
import { WatercolorDivider } from '../common/WatercolorDivider';

export const TraditionalProcess: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bilona' | 'chekku'>('bilona');

  const bilonaSteps = [
    {
      step: '01',
      title: 'Ethical Grass-Fed Milking',
      desc: 'Native Indian Gir and Hallikar cows graze freely on organic pastures. Calves are fed first before milk is gathered in sacred bronze vessels.',
    },
    {
      step: '02',
      title: 'Boiling & Curd Culturing',
      desc: 'Fresh A2 milk is slowly boiled over low earthen flame, cooled, and cultured overnight into thick whole-milk probiotic curd (Dahi).',
    },
    {
      step: '03',
      title: 'Wooden Bilona Hand Churning',
      desc: 'The cultured curd is churned bi-directionally using a traditional wooden churner (Bilona) until pure butter fat (Makkhan) separates.',
    },
    {
      step: '04',
      title: 'Slow Flame Clarification',
      desc: 'The separated makkhan is gently melted on low earthen heat until the golden liquid turns into aromatic, granular Vedic A2 Desi Cow Ghee.',
    },
  ];

  const chekkuSteps = [
    {
      step: '01',
      title: 'Sun-Dried Whole Seeds',
      desc: 'Certified native seeds and coconuts are sun-dried without sulfur or chemical bleaching agents to remove residual moisture naturally.',
    },
    {
      step: '02',
      title: 'Mara Chekku Wooden Pressing',
      desc: 'Crushed slowly in authentic Vaagai tree wooden mortars. The natural wood absorbs friction heat, keeping temperatures strictly below 45°C.',
    },
    {
      step: '03',
      title: 'Cloth Cotton Filtration',
      desc: 'Zero chemical hexane or synthetic deodorizers. The extracted virgin oil is allowed to settle naturally and filtered through pure cotton fabric.',
    },
    {
      step: '04',
      title: 'Food-Grade Glass Bottling',
      desc: 'Bottled immediately in dark amber and flint glass to protect delicate vitamins, healthy antioxidants, and authentic natural aromas.',
    },
  ];

  const currentSteps = activeTab === 'bilona' ? bilonaSteps : chekkuSteps;

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F0] bg-[url('/images/textures/parchment.jpg')] bg-repeat [background-size:600px_auto] [background-blend-mode:multiply] border-b border-[#EDE2CB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#536B3F] block mb-2">
            ANCIENT VEDIC METHODS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263F27]">
            Tradition in Every Drop
          </h2>
          <WatercolorDivider className="my-2" />
          <p className="text-sm sm:text-base text-[#282619]/75 font-normal mt-2">
            We follow ancestral Indian food preparation practices where patience and reverence replace industrial shortcuts.
          </p>
        </div>

        {/* Process Switcher Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-[#EDE2CB]/60 border border-[#EDE2CB]">
            <button
              type="button"
              onClick={() => setActiveTab('bilona')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'bilona'
                  ? 'bg-[#263F27] text-[#F7F1E4] shadow-xs'
                  : 'text-[#282619]/70 hover:text-[#263F27]'
              }`}
            >
              5-Step Vedic Bilona Ghee
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('chekku')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'chekku'
                  ? 'bg-[#263F27] text-[#F7F1E4] shadow-xs'
                  : 'text-[#282619]/70 hover:text-[#263F27]'
              }`}
            >
              Cold Wood-Pressed Oils
            </button>
          </div>
        </div>

        {/* Process Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Visual Image with Caption */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-white border border-[#EDE2CB] shadow-premium">
              <img
                src={
                  activeTab === 'bilona'
                    ? '/images/lifestyle/traditional-bilona.jpg'
                    : '/images/lifestyle/wood-pressed-chekku.jpg'
                }
                alt={
                  activeTab === 'bilona'
                    ? 'Authentic two-way wooden rope Bilona churning in earthen clay pot'
                    : 'Mara Chekku traditional cold wood-pressed virgin oil extraction'
                }
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#C6A16A]">
                  {activeTab === 'bilona' ? 'HAND-CHURNED BI-DIRECTIONAL BILONA' : 'ZERO HEAT MARA CHEKKU ROTARY'}
                </span>
                <p className="font-serif text-lg sm:text-xl font-bold mt-1">
                  {activeTab === 'bilona'
                    ? 'Hand-churned makkhan clarified on earthen wood-stoves'
                    : 'Slow ambient wood pressing below 45°C'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Step Cards */}
          <div className="lg:col-span-6 space-y-4">
            {currentSteps.map((s, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#EDE2CB] shadow-soft hover:shadow-premium transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#263F27] text-[#C6A16A] text-xs font-bold flex items-center justify-center shrink-0 font-serif">
                  {s.step}
                </div>
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#263F27]">
                    {s.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#282619]/75 mt-1 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
