import React from 'react';
import { useBusiness } from '../context/BusinessContext';
import { MessageCircle, CalendarCheck, Sparkles, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import heroImage from '../assets/images/hero_luxury_stage_1791873272318.jpg';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const { businessInfo } = useBusiness();

  const handleWhatsAppHero = () => {
    const text = encodeURIComponent(
      `Hello Yash Decoration! I would like to check availability and packages for my upcoming celebration.`
    );
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-[#090a0f] text-[#f5f5f7] pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#d4af37]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition and Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#d4af37] uppercase">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>Premier Event Styling & Luxury Decor</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15] text-balance">
              Making Every Celebration{' '}
              <span className="bg-gradient-to-r from-[#f7e7ce] via-[#d4af37] to-[#e6ca65] bg-clip-text text-transparent">
                Unforgettable.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
              From majestic wedding mandaps and candlelit reception stages to bespoke birthday balloon installations and vibrant Haldi setups. We craft opulent atmospheres tailored to your grand moments.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-[#090a0f] bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] hover:brightness-110 rounded-md shadow-lg shadow-[#d4af37]/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <CalendarCheck className="w-4 h-4 text-[#090a0f]" />
                <span>Book Your Decoration</span>
              </button>

              <button
                onClick={handleWhatsAppHero}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#161922] hover:bg-[#202430] border border-[#d4af37]/30 hover:border-[#d4af37] rounded-md transition-all cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Instant Quote</span>
              </button>
            </div>

            {/* Unboxed Micro Metadata separator */}
            <div className="pt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
              <span>Fresh Exotic Blooms</span>
              <span aria-hidden="true">·</span>
              <span>On-Time Venue Setup</span>
              <span aria-hidden="true">·</span>
              <span>Transparent Upfront Pricing</span>
            </div>
          </div>

          {/* Right Column: Hero Showcase Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-2xl bg-[#141720] group">
              <img
                src={heroImage}
                alt="Breathtaking royal wedding stage mandap decorated with golden fairy lights and chandeliers by Yash Decoration"
                className="w-full h-[380px] sm:h-[460px] lg:h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Caption Overlay */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-left">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                    Signature Wedding Mandap
                  </span>
                  <p className="text-sm font-serif font-medium text-white">
                    Grand Crystal & Champagne Rose Architecture
                  </p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-neutral-300">
                  Pune & Maharashtra
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Strip */}
        <div className="mt-14 pt-8 border-t border-[#2a2721] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <Award className="w-4 h-4" />
              <span className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
                10+
              </span>
            </div>
            <p className="text-xs text-neutral-400">Years of Luxury Artistry</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <HeartHandshake className="w-4 h-4" />
              <span className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
                1,200+
              </span>
            </div>
            <p className="text-xs text-neutral-400">Grand Celebrations Delivered</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
                100%
              </span>
            </div>
            <p className="text-xs text-neutral-400">Fresh Blooms & Fire-safe Pyro</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <Sparkles className="w-4 h-4" />
              <span className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
                4.9 / 5.0
              </span>
            </div>
            <p className="text-xs text-neutral-400">Verified Client Ratings</p>
          </div>
        </div>
      </div>
    </section>
  );
};
