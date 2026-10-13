import React from 'react';
import { useBusiness } from '../context/BusinessContext';
import { MessageCircle } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const { businessInfo } = useBusiness();

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Hello Yash Decoration! I am exploring your decoration services and would love to check availability for my event.`
    );
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <aside aria-label="Quick WhatsApp contact" className="fixed bottom-5 right-5 z-40">
      <button
        onClick={handleWhatsAppClick}
        aria-label="Chat with Yash Decoration on WhatsApp"
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-emerald-400/40"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="sr-only">Chat on WhatsApp</span>

        {/* Hover Tooltip (desktop only) */}
        <span className="hidden md:group-hover:inline-block absolute right-16 px-3 py-1 bg-black/80 backdrop-blur-md border border-emerald-500/30 text-white text-xs font-medium rounded-md whitespace-nowrap shadow-lg">
          Chat on WhatsApp
        </span>
      </button>
    </aside>
  );
};
