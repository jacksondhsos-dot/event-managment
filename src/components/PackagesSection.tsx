import React from 'react';
import { useBusiness } from '../context/BusinessContext';
import { DecorationPackage } from '../types';
import { Check, Star, MessageCircle, Sparkles, ShieldCheck } from 'lucide-react';

interface PackagesSectionProps {
  onSelectPackageForBooking: (pkg: DecorationPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackageForBooking }) => {
  const { packages, businessInfo } = useBusiness();

  const handleWhatsAppPackage = (pkg: DecorationPackage) => {
    const text = encodeURIComponent(
      `Hello Yash Decoration! I am interested in booking the *${pkg.name} (${pkg.tier.toUpperCase()})* package priced at ${businessInfo.currency}${pkg.price.toLocaleString()}. Please let me know how we can proceed!`
    );
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="packages" className="py-24 bg-[#0d0f16] text-[#f5f5f7] border-t border-[#2a2721]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
            Curated Packages
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Transparent, All-Inclusive Decoration Packages
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            No surprise add-ons. Every package includes design materials, professional setup, ambient lighting, and post-event teardown.
          </p>
        </div>

        {/* Packages 3-column layout */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map(pkg => {
            const isFeatured = pkg.isPopular || pkg.tier === 'premium';
            const savings = pkg.originalPrice > pkg.price ? pkg.originalPrice - pkg.price : 0;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-[#151824] border-2 border-[#d4af37] shadow-xl shadow-[#d4af37]/10 -translate-y-1'
                    : 'bg-[#10121a] border border-[#262935] hover:border-[#d4af37]/40'
                } p-7 sm:p-8`}
              >
                {/* Popular Pill badge if featured */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-[#090a0f] text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  {/* Tier & Name */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                      {pkg.tier} Tier
                    </span>
                    {pkg.tier === 'luxury' && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#f3e5ab] font-medium">
                        <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
                        VIP Choice
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 text-2xl font-serif font-bold text-white">{pkg.name}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-400 min-h-[38px] leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Pricing Box */}
                  <div className="mt-6 pt-6 border-t border-[#232634] flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-[#d4af37] tabular-nums">
                      {businessInfo.currency}
                      {pkg.price.toLocaleString()}
                    </span>
                    {pkg.originalPrice > pkg.price && (
                      <span className="text-sm text-neutral-400 line-through tabular-nums">
                        {businessInfo.currency}
                        {pkg.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {savings > 0 && (
                    <div className="mt-1 text-xs text-emerald-400 font-medium">
                      Save {businessInfo.currency}{savings.toLocaleString()} this season
                    </div>
                  )}

                  {/* Recommended For Note */}
                  <div className="mt-4 p-3 rounded-lg bg-[#0a0c12] border border-[#1e212d] text-xs text-neutral-300">
                    <strong className="text-white">Best suited for:</strong> {pkg.recommendedFor}
                  </div>

                  {/* Included Services Checklist */}
                  <div className="mt-6 space-y-3">
                    <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
                      Everything Included:
                    </span>
                    <ul className="space-y-2.5">
                      {pkg.includedServices.map((service, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                          <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-8 pt-6 border-t border-[#232634] space-y-3">
                  <button
                    onClick={() => onSelectPackageForBooking(pkg)}
                    className={`w-full py-3 px-4 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isFeatured
                        ? 'bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-[#090a0f] hover:brightness-110 shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    Select & Book This Package
                  </button>

                  <button
                    onClick={() => handleWhatsAppPackage(pkg)}
                    className="w-full py-2 px-3 flex items-center justify-center gap-1.5 text-xs text-neutral-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Inquire this package on WhatsApp</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Bespoke Callout */}
        <div className="mt-12 p-6 rounded-xl bg-[#12151f] border border-[#2a2721] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-serif font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              Need a 100% Customized Bespoke Stage or Multi-Day Wedding Decor?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400">
              We design custom turnkey mandates including thematic entrances, varmala special effects, sangeet stages, and floral canopies.
            </p>
          </div>

          <a
            href={`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(
              'Hello Yash Decoration! I need a custom turnkey decoration quotation for a multi-day or destination event.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs font-semibold text-[#090a0f] bg-[#d4af37] hover:bg-[#e6ca65] rounded-md transition-colors shrink-0 whitespace-nowrap"
          >
            Request Custom Quotation
          </a>
        </div>
      </div>
    </section>
  );
};
