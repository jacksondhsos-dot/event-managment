/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BusinessProvider } from './context/BusinessContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PackagesSection } from './components/PackagesSection';
import { GallerySection } from './components/GallerySection';
import { SuppliesSection } from './components/SuppliesSection';
import { BookingSection } from './components/BookingSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { LocationContactSection } from './components/LocationContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { OwnerDashboardModal } from './components/OwnerDashboardModal';
import { DecorationPackage } from './types';

function MainAppContent() {
  const [ownerModalOpen, setOwnerModalOpen] = useState(false);
  const [prefilledTheme, setPrefilledTheme] = useState<string>('');
  const [prefilledPackageId, setPrefilledPackageId] = useState<string>('');
  const [prefilledService, setPrefilledService] = useState<string>('');

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (pkg: DecorationPackage) => {
    setPrefilledPackageId(pkg.id);
    scrollToBooking();
  };

  const handleSelectService = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    scrollToBooking();
  };

  const handleSelectGalleryLook = (lookTitle: string) => {
    setPrefilledTheme(lookTitle);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#f5f5f7] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#fff8e7]">
      {/* 1-Row 3-Zone Top Navigation */}
      <Navbar
        onOpenOwnerModal={() => setOwnerModalOpen(true)}
        onOpenBooking={scrollToBooking}
      />

      <main className="flex-1">
        {/* Luxury Hero with Focal Stage Visual & Headline */}
        <Hero onOpenBooking={scrollToBooking} />

        {/* Brand Story & Philosophy */}
        <AboutSection />

        {/* 10 Detailed Event Decoration Services */}
        <ServicesSection onSelectServiceForBooking={handleSelectService} />

        {/* Basic, Premium, Luxury Packages with Configurable Prices */}
        <PackagesSection onSelectPackageForBooking={handleSelectPackage} />

        {/* Curated Real Photo Gallery & Lightbox */}
        <GallerySection onSelectLookForBooking={handleSelectGalleryLook} />

        {/* Event Materials & Rental Supplies (Cold Pyro, Dry Ice, Marquee Letters) */}
        <SuppliesSection />

        {/* Comprehensive Booking Engine with WhatsApp Integration */}
        <BookingSection
          prefilledTheme={prefilledTheme}
          prefilledPackageId={prefilledPackageId}
          prefilledService={prefilledService}
        />

        {/* Authentic Customer Reviews & Submission */}
        <ReviewsSection />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Studio Location, Address, Hours & Google Maps */}
        <LocationContactSection />
      </main>

      {/* Quiet Footer */}
      <Footer onOpenOwnerModal={() => setOwnerModalOpen(true)} />

      {/* Quick Floating WhatsApp Access */}
      <FloatingActions />

      {/* Owner Management System for Prices, Phone, Photos & Inquiries CRM */}
      <OwnerDashboardModal
        isOpen={ownerModalOpen}
        onClose={() => setOwnerModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BusinessProvider>
      <MainAppContent />
    </BusinessProvider>
  );
}
