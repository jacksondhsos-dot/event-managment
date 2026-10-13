import React, { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { Phone, MessageCircle, Menu, X, Settings } from 'lucide-react';

interface NavbarProps {
  onOpenOwnerModal: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOwnerModal, onOpenBooking }) => {
  const { businessInfo } = useBusiness();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#090a0f]/95 backdrop-blur-md border-b border-[#2a2721] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 text-xl sm:text-2xl font-serif text-[#f5f5f7] tracking-wider whitespace-nowrap shrink-0 group"
          >
            <span className="text-[#d4af37] font-semibold">✦</span>
            <span className="tracking-tight font-bold bg-gradient-to-r from-[#f7e7ce] via-[#d4af37] to-[#e6ca65] bg-clip-text text-transparent">
              {businessInfo.name}
            </span>
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a
              href="#services"
              className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#packages"
              className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0"
            >
              Packages
            </a>
            <a
              href="#gallery"
              className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0"
            >
              Gallery
            </a>
            <a
              href="#supplies"
              className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0"
            >
              Party Supplies
            </a>
            <a
              href="#contact"
              className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action (+ discreet owner trigger) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Call */}
            <a
              href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#e6ca65] hover:text-white bg-[#1a1c24] hover:bg-[#252833] border border-[#d4af37]/20 rounded-md transition-colors whitespace-nowrap shrink-0"
              title="Call Yash Decoration"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{businessInfo.phone}</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#090a0f] bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] hover:brightness-110 rounded-md shadow-sm transition-all whitespace-nowrap shrink-0"
            >
              Book Your Decor
            </button>

            {/* Owner Portal discreet key */}
            <button
              onClick={onOpenOwnerModal}
              title="Owner Management Portal"
              className="p-2 text-neutral-400 hover:text-[#d4af37] hover:bg-[#1a1c24] rounded-md transition-colors"
              aria-label="Owner Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white rounded-md"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1017] border-b border-[#2a2721] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-base font-medium text-neutral-300">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4af37] transition-colors py-1"
            >
              Services
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4af37] transition-colors py-1"
            >
              Packages
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4af37] transition-colors py-1"
            >
              Gallery
            </a>
            <a
              href="#supplies"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4af37] transition-colors py-1"
            >
              Party Supplies
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4af37] transition-colors py-1"
            >
              Location & Contact
            </a>
          </div>

          <div className="pt-4 border-t border-[#2a2721] flex flex-col gap-3">
            <a
              href={`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(
                'Hello Yash Decoration! I am looking for decoration services for my upcoming celebration.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Consultation</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOwnerModal();
              }}
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-medium text-neutral-400 hover:text-[#d4af37] bg-[#141720] rounded-md transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Owner Portal & Settings</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
