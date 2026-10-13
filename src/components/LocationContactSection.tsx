import React from 'react';
import { useBusiness } from '../context/BusinessContext';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  ExternalLink,
  Instagram,
  Facebook,
  Compass,
} from 'lucide-react';

export const LocationContactSection: React.FC = () => {
  const { businessInfo } = useBusiness();

  return (
    <section id="contact" className="py-24 bg-[#0d0f16] text-[#f5f5f7] border-t border-[#2a2721]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#2a2721]">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
              Visit or Connect
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Our Studio Location & Contact
            </h2>
            <p className="text-sm text-neutral-400">
              Visit our decoration studio to view live material swatches, floral catalogs, and discuss your event timeline in person.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`}
              className="px-4 py-2 text-xs font-semibold text-[#090a0f] bg-gradient-to-r from-[#d4af37] to-[#e6ca65] rounded-md transition-all flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#090a0f]" />
              <span>Call Us Now</span>
            </a>

            <a
              href={`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(
                'Hello Yash Decoration! I would like to schedule an in-person consultation at your studio.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-md transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Location & Map Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-[#121520] p-6 sm:p-8 rounded-2xl border border-[#262939] space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
                  Main Atelier & Shop
                </span>
                <h3 className="text-2xl font-serif font-bold text-white">{businessInfo.name}</h3>
                <p className="text-xs text-neutral-400">
                  Event Decoration, Floral Styling & Party Supplies
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#1a1d29] text-[#d4af37] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">Shop Address:</strong>
                    <span className="text-neutral-400 leading-relaxed">
                      {businessInfo.address}, {businessInfo.city}, {businessInfo.state} -{' '}
                      {businessInfo.pincode}
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#1a1d29] text-[#d4af37] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">Operating Hours:</strong>
                    <span className="text-neutral-400">{businessInfo.openingHours}</span>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#1a1d29] text-[#d4af37] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">Phone Consultation:</strong>
                    <a
                      href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`}
                      className="text-[#d4af37] hover:underline"
                    >
                      {businessInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#1a1d29] text-[#d4af37] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block">Email Inquiries:</strong>
                    <a
                      href={`mailto:${businessInfo.email}`}
                      className="text-neutral-400 hover:text-white"
                    >
                      {businessInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links & Local Search Callout */}
            <div className="pt-6 border-t border-[#222533] space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs text-neutral-400">Follow Our Work:</span>
                <a
                  href={businessInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-[#191c28] hover:bg-[#232737] text-neutral-300 hover:text-[#d4af37] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={businessInfo.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-[#191c28] hover:bg-[#232737] text-neutral-300 hover:text-[#d4af37] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>

              <div className="p-3 rounded-lg bg-[#0a0c12] border border-[#1e212f] text-[11px] text-neutral-400 leading-relaxed">
                <strong className="text-[#f3e5ab]">Searching for decorators near you?</strong> We provide on-site setup across Pune, Pimpri-Chinchwad, Lonavala, Hinjewadi, Hadapsar, Baner, and destination venues throughout Maharashtra.
              </div>
            </div>
          </div>

          {/* Interactive Google Maps Frame */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#262939] bg-[#121520] flex flex-col">
            <div className="p-3 bg-[#161924] border-b border-[#242735] flex items-center justify-between text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#d4af37]" />
                <span className="font-medium">Google Maps Location & Directions</span>
              </div>
              <a
                href={businessInfo.googleMapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d4af37] hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative flex-1 min-h-[360px] sm:min-h-[420px] bg-neutral-900">
              <iframe
                title="Yash Decoration Location Map"
                src={businessInfo.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[25%] contrast-[110%] brightness-[90%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
