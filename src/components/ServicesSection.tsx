import React, { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { DecorationService } from '../types';
import { Sparkles, Check, ArrowRight, MessageCircle } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const { services, businessInfo } = useBusiness();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Celebrations' },
    { id: 'wedding', label: 'Weddings & Anniversaries' },
    { id: 'birthday', label: 'Birthdays & Balloons' },
    { id: 'engagement', label: 'Engagements & Ring Ceremonies' },
    { id: 'haldi_mehndi', label: 'Haldi & Mehndi' },
    { id: 'baby_shower', label: 'Baby Showers' },
    { id: 'stage', label: 'Stages, Mandap & Corporate' },
    { id: 'supplies', label: 'Materials & Rentals' },
  ];

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter(s => {
          if (selectedCategory === 'wedding') return s.category === 'wedding' || s.id === 'anniversary';
          if (selectedCategory === 'birthday') return s.category === 'birthday' || s.category === 'balloon';
          if (selectedCategory === 'stage') return s.category === 'stage';
          if (selectedCategory === 'supplies') return s.category === 'supplies';
          return s.category === selectedCategory;
        });

  const handleWhatsAppInquiry = (service: DecorationService) => {
    const text = encodeURIComponent(
      `Hello Yash Decoration! I am interested in booking *${service.title}* (Starting at ${businessInfo.currency}${service.startingPrice.toLocaleString()}). Could you share design catalogs and availability?`
    );
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="services" className="py-24 bg-[#090a0f] text-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#2a2721]">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
              Our Decoration Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Bespoke Styling for Every Precious Milestone
            </h2>
            <p className="text-sm text-neutral-400">
              Explore our complete suite of event designs. Every package is fully customizable to your venue, theme, and color palette.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400 shrink-0">
            <span>Starting from</span>
            <span className="text-base font-serif font-bold text-[#d4af37]">
              {businessInfo.currency}4,999
            </span>
          </div>
        </div>

        {/* Functional Filter Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#e6ca65] text-[#090a0f] font-semibold shadow'
                  : 'bg-[#141720] text-neutral-300 hover:text-white border border-[#2a2721] hover:border-[#d4af37]/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="rounded-xl overflow-hidden bg-[#12151f] border border-[#252833] hover:border-[#d4af37]/50 transition-all flex flex-col group shadow-lg"
            >
              {/* Image Banner */}
              <div className="relative h-56 overflow-hidden bg-neutral-900">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={e => {
                    // Styled graceful fallback
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12151f] via-transparent to-transparent" />

                {service.popular && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#d4af37] text-[#090a0f] text-[11px] font-bold rounded shadow-sm tracking-wide">
                    MOST REQUESTED
                  </div>
                )}

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-neutral-300 font-mono">
                    Starting from
                  </span>
                  <span className="text-lg font-serif font-bold text-[#d4af37] tabular-nums">
                    {businessInfo.currency}
                    {service.startingPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 line-clamp-3 leading-relaxed">
                    {service.fullDesc}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-2 border-t border-[#222530]">
                  {service.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                      <span className="truncate">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="pt-4 flex items-center gap-2">
                  <button
                    onClick={() => onSelectServiceForBooking(service.title)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-[#090a0f] bg-gradient-to-r from-[#d4af37] to-[#e6ca65] hover:brightness-110 rounded-md transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>Book Decor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleWhatsAppInquiry(service)}
                    className="p-2.5 text-neutral-300 hover:text-white bg-[#1a1d28] hover:bg-[#232736] border border-[#2a2e3d] rounded-md transition-colors"
                    title="Inquire on WhatsApp"
                    aria-label={`Inquire about ${service.title} on WhatsApp`}
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
