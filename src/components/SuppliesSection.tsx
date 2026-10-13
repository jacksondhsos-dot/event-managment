import React from 'react';
import { useBusiness } from '../context/BusinessContext';
import { PartySupplyItem } from '../types';
import { Sparkles, MessageCircle, CheckCircle2 } from 'lucide-react';

export const SuppliesSection: React.FC = () => {
  const { partySupplies, businessInfo } = useBusiness();

  const handleInquireSupply = (item: PartySupplyItem) => {
    const text = encodeURIComponent(
      `Hello Yash Decoration! I am interested in renting/ordering the *${item.name}* (${businessInfo.currency}${item.price.toLocaleString()} ${item.unit}). Please confirm availability for my date.`
    );
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="supplies" className="py-24 bg-[#0d0f16] text-[#f5f5f7] border-t border-[#2a2721]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#2a2721]">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
              Event Materials & Rentals
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Party Supplies & Special Effects Equipment
            </h2>
            <p className="text-sm text-neutral-400">
              Need props or special effects for your event? We supply smokeless cold pyro spark machines, low-lying dry ice foggers, giant illuminated marquee letters, and authentic brass decor.
            </p>
          </div>

          <div className="text-xs text-neutral-400">
            Available for direct rental & decorator supply
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partySupplies.map(supply => (
            <div
              key={supply.id}
              className="rounded-xl overflow-hidden bg-[#12151f] border border-[#252833] hover:border-[#d4af37]/50 transition-all flex flex-col justify-between group shadow-md"
            >
              <div className="relative h-44 overflow-hidden bg-neutral-900">
                <img
                  src={supply.image}
                  alt={supply.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12151f] via-transparent to-transparent" />

                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 border border-white/10 text-[11px] text-[#f3e5ab] font-medium">
                  {supply.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-serif font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    {supply.name}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                    {supply.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#222530] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-neutral-400">Rental Rate:</span>
                    <div className="text-right">
                      <span className="text-base font-serif font-bold text-[#d4af37] tabular-nums">
                        {businessInfo.currency}
                        {supply.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-neutral-400 block">{supply.unit}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleInquireSupply(supply)}
                    className="w-full py-2 px-3 text-xs font-semibold text-neutral-200 hover:text-white bg-[#191c26] hover:bg-[#222736] border border-[#2c3040] hover:border-[#d4af37]/40 rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Inquire Rental</span>
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
