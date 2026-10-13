import React, { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { GalleryItem } from '../types';
import { X, Sparkles, Eye, ArrowRight, MessageCircle } from 'lucide-react';

interface GallerySectionProps {
  onSelectLookForBooking: (themeLook: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onSelectLookForBooking }) => {
  const { gallery, businessInfo } = useBusiness();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Photos' },
    { id: 'wedding', label: 'Royal Weddings' },
    { id: 'birthday', label: 'Birthdays & Balloons' },
    { id: 'haldi_mehndi', label: 'Haldi & Mehndi' },
    { id: 'baby_shower', label: 'Baby Shower' },
    { id: 'engagement', label: 'Engagement Stages' },
  ];

  const filteredGallery =
    selectedFilter === 'all' ? gallery : gallery.filter(item => item.category === selectedFilter);

  const handleBookFromLightbox = (item: GalleryItem) => {
    onSelectLookForBooking(item.title);
    setLightboxItem(null);
  };

  const handleWhatsAppLightbox = (item: GalleryItem) => {
    const text = encodeURIComponent(
      `Hello Yash Decoration! I saw your gallery photo *${item.title}* and would love to have a similar decoration setup for my event. Is this style available?`
    );
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="gallery" className="py-24 bg-[#090a0f] text-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#2a2721]">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
              Real Event Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Our Signature Decoration Gallery
            </h2>
            <p className="text-sm text-neutral-400">
              Authentic photographs from actual stages, mandaps, luxury birthdays, and intimate rituals curated by Yash Decoration.
            </p>
          </div>

          <div className="text-xs text-neutral-400 shrink-0">
            Click any photo to inspect details or book that exact style.
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#e6ca65] text-[#090a0f] font-semibold shadow'
                  : 'bg-[#141720] text-neutral-300 hover:text-white border border-[#2a2721] hover:border-[#d4af37]/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map(item => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative rounded-xl overflow-hidden bg-[#131620] border border-[#252833] hover:border-[#d4af37] cursor-pointer transition-all duration-300 shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Hover Eye indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/40 text-[#f3e5ab] text-xs font-medium flex items-center gap-1.5 shadow-lg">
                    <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>View Details</span>
                  </div>
                </div>

                {/* Bottom Card Meta */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[11px] font-mono tracking-wider text-[#d4af37] uppercase">
                    {item.eventDate || 'Featured Event'}
                  </span>
                  <h4 className="text-base font-serif font-bold text-white group-hover:text-[#f3e5ab] transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-300 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGallery.length === 0 && (
          <div className="py-16 text-center text-neutral-400 text-sm">
            No gallery items found in this category.
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative max-w-4xl w-full bg-[#121520] border border-[#d4af37]/40 rounded-2xl overflow-hidden shadow-2xl my-8">
            {/* Close Button */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Photo */}
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-black">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Details & Actions */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#d4af37] uppercase">
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <span>Real Event Inspiration</span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                    {lightboxItem.title}
                  </h3>

                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {lightboxItem.description}
                  </p>

                  <div className="pt-2 border-t border-[#232635] space-y-1.5 text-xs text-neutral-400">
                    <div>
                      <strong className="text-neutral-300">Category:</strong>{' '}
                      <span className="capitalize">{lightboxItem.category.replace('_', ' ')}</span>
                    </div>
                    {lightboxItem.eventDate && (
                      <div>
                        <strong className="text-neutral-300">Celebration:</strong>{' '}
                        {lightboxItem.eventDate}
                      </div>
                    )}
                    {lightboxItem.clientType && (
                      <div>
                        <strong className="text-neutral-300">Venue Setting:</strong>{' '}
                        {lightboxItem.clientType}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#232635]">
                  <button
                    onClick={() => handleBookFromLightbox(lightboxItem)}
                    className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-[#090a0f] bg-gradient-to-r from-[#d4af37] to-[#e6ca65] hover:brightness-110 rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Book This Specific Style</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleWhatsAppLightbox(lightboxItem)}
                    className="w-full py-2.5 px-4 text-xs font-medium text-neutral-300 hover:text-white bg-[#1a1d29] hover:bg-[#232738] rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#2b2f3e]"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Inquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
