import React from 'react';
import { useBusiness } from '../context/BusinessContext';
import { Sparkles, Clock, Palette, Flower2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { businessInfo } = useBusiness();

  const pillars = [
    {
      icon: Palette,
      title: 'Bespoke Theme Styling',
      desc: 'Every milestone is unique. We translate your dreams, color palettes, and Pinterest boards into reality with precision scale.',
    },
    {
      icon: Flower2,
      title: 'Exotic & Fresh Florals',
      desc: 'We source fresh Dutch roses, orchids, hydrangeas, and fragrant marigolds on event day morning to ensure maximum bloom vitality.',
    },
    {
      icon: Clock,
      title: 'Strict Punctuality Guarantee',
      desc: 'Our dedicated crew finishes the complete setup 2 to 3 hours before guest arrival, giving you peace of mind and pristine photo-ops.',
    },
    {
      icon: Sparkles,
      title: 'End-to-End Execution',
      desc: 'From stage lighting and structural trussing to final teardown, we manage every detail so you can enjoy your celebration stress-free.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#0d0f16] border-y border-[#2a2721] text-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
            About Yash Decoration
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Crafting Extraordinary Experiences with Elegance & Soul
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Founded with an obsession for aesthetic perfection, <strong className="text-white font-medium">{businessInfo.name}</strong> is a full-service event decor atelier and party supply specialist. Whether it is an intimate baby shower or a regal multi-day wedding celebration, our team delivers breathtaking floral architecture, modern balloon styling, and flawless stage environments.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl bg-[#131620] border border-[#2a2721] hover:border-[#d4af37]/40 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1c202d] flex items-center justify-center text-[#d4af37]">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
