import React from 'react';
import { useBusiness } from '../context/BusinessContext';
import { Phone, MessageCircle, Mail, MapPin, Settings, Heart } from 'lucide-react';

interface FooterProps {
  onOpenOwnerModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOwnerModal }) => {
  const { businessInfo } = useBusiness();

  return (
    <footer className="bg-[#07080c] text-neutral-400 border-t border-[#1e212d] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-xl font-serif font-bold text-white">
              <span className="text-[#d4af37]">✦</span>
              <span className="bg-gradient-to-r from-[#f7e7ce] via-[#d4af37] to-[#e6ca65] bg-clip-text text-transparent">
                {businessInfo.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Luxury event decoration, royal wedding mandap architecture, organic balloon styling, and party rental equipment based in Pune, creating unforgettable milestones across Maharashtra.
            </p>
            <div className="text-xs text-neutral-400">
              <span>GST Registered</span>
              <span className="mx-2">·</span>
              <span>100% Verified Quality</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Celebrations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-[#d4af37] transition-colors">
                  Wedding Mandaps
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#d4af37] transition-colors">
                  Birthday Themes
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#d4af37] transition-colors">
                  Haldi & Mehndi
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#d4af37] transition-colors">
                  Baby Shower & Cradle
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#d4af37] transition-colors">
                  Engagement Stages
                </a>
              </li>
            </ul>
          </div>

          {/* Packages & Supplies */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#packages" className="hover:text-[#d4af37] transition-colors">
                  Decoration Packages
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#d4af37] transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#supplies" className="hover:text-[#d4af37] transition-colors">
                  Party Supplies & Rentals
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#d4af37] transition-colors">
                  Booking FAQs
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[#d4af37] transition-colors">
                  Reserve Date
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{businessInfo.address}, {businessInfo.city}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {businessInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${businessInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp: +{businessInfo.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href={`mailto:${businessInfo.email}`} className="hover:text-white">
                  {businessInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & owner portal access */}
        <div className="pt-8 border-t border-[#181a24] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-neutral-500">
            © {new Date().getFullYear()} {businessInfo.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#contact" className="hover:text-neutral-200">
              Privacy & Cancellation Terms
            </a>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={onOpenOwnerModal}
              className="text-neutral-500 hover:text-[#d4af37] flex items-center gap-1.5 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Owner Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
