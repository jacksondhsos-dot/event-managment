import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BusinessInfo,
  DecorationService,
  DecorationPackage,
  GalleryItem,
  PartySupplyItem,
  BookingRequest,
  Testimonial,
} from '../types';
import {
  INITIAL_BUSINESS_INFO,
  INITIAL_SERVICES,
  INITIAL_PACKAGES,
  INITIAL_GALLERY,
  INITIAL_PARTY_SUPPLIES,
  INITIAL_TESTIMONIALS,
} from '../data/initialData';

interface BusinessContextType {
  businessInfo: BusinessInfo;
  services: DecorationService[];
  packages: DecorationPackage[];
  gallery: GalleryItem[];
  partySupplies: PartySupplyItem[];
  testimonials: Testimonial[];
  bookings: BookingRequest[];
  updateBusinessInfo: (info: BusinessInfo) => void;
  updatePackage: (pkg: DecorationPackage) => void;
  addPackage: (pkg: DecorationPackage) => void;
  deletePackage: (id: string) => void;
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  addTestimonial: (item: Omit<Testimonial, 'id' | 'verified' | 'date'>) => void;
  createBooking: (booking: Omit<BookingRequest, 'id' | 'bookingCode' | 'createdAt' | 'status'>) => BookingRequest;
  updateBookingStatus: (id: string, status: BookingRequest['status']) => void;
  deleteBooking: (id: string) => void;
  resetAllToDefaults: () => void;
}

const STORAGE_KEYS = {
  INFO: 'yd_business_info_v1',
  SERVICES: 'yd_services_v1',
  PACKAGES: 'yd_packages_v1',
  GALLERY: 'yd_gallery_v1',
  SUPPLIES: 'yd_party_supplies_v1',
  TESTIMONIALS: 'yd_testimonials_v1',
  BOOKINGS: 'yd_bookings_v1',
};

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INFO);
      return saved ? JSON.parse(saved) : INITIAL_BUSINESS_INFO;
    } catch {
      return INITIAL_BUSINESS_INFO;
    }
  });

  const [services] = useState<DecorationService[]>(INITIAL_SERVICES);

  const [packages, setPackages] = useState<DecorationPackage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PACKAGES);
      return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
    } catch {
      return INITIAL_PACKAGES;
    }
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return saved ? JSON.parse(saved) : INITIAL_GALLERY;
    } catch {
      return INITIAL_GALLERY;
    }
  });

  const [partySupplies] = useState<PartySupplyItem[]>(INITIAL_PARTY_SUPPLIES);

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'b-sample-1',
          bookingCode: 'YD-2026-9042',
          customerName: 'Sanjay Shinde',
          phone: '+91 98901 23456',
          eventType: 'Wedding Reception',
          eventDate: '2026-11-20',
          eventTime: '06:30 PM',
          venueLocation: 'Orchid Banquet, Baner Road, Pune',
          preferredTheme: 'Royal Gold & Champagne',
          packageId: 'pkg_luxury',
          estimatedBudget: '₹80,000 - ₹1,00,000',
          specialRequirements: 'Mandap dome with fresh white hydrangeas and cold firework entry',
          createdAt: new Date().toISOString(),
          status: 'confirmed',
        },
        {
          id: 'b-sample-2',
          bookingCode: 'YD-2026-9043',
          customerName: 'Kavita Sharma',
          phone: '+91 97654 32190',
          eventType: 'Baby Shower',
          eventDate: '2026-10-28',
          eventTime: '11:00 AM',
          venueLocation: 'Home Lawn, Koregaon Park',
          preferredTheme: 'Cloud Arch & Teddy Bear',
          packageId: 'pkg_premium',
          estimatedBudget: '₹30,000',
          specialRequirements: 'Pastel ivory balloons and floral cradle decor',
          createdAt: new Date().toISOString(),
          status: 'new',
        }
      ];
    } catch {
      return [];
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(businessInfo));
  }, [businessInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  const updateBusinessInfo = (info: BusinessInfo) => {
    setBusinessInfo(info);
  };

  const updatePackage = (updatedPkg: DecorationPackage) => {
    setPackages(prev => prev.map(p => (p.id === updatedPkg.id ? updatedPkg : p)));
  };

  const addPackage = (newPkg: DecorationPackage) => {
    setPackages(prev => [...prev, newPkg]);
  };

  const deletePackage = (id: string) => {
    setPackages(prev => prev.filter(p => p.id !== id));
  };

  const addGalleryItem = (item: GalleryItem) => {
    setGallery(prev => [item, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const addTestimonial = (item: Omit<Testimonial, 'id' | 'verified' | 'date'>) => {
    const newTestimonial: Testimonial = {
      ...item,
      id: `rev-${Date.now()}`,
      verified: true,
      date: 'Just now',
    };
    setTestimonials(prev => [newTestimonial, ...prev]);
  };

  const createBooking = (
    bookingData: Omit<BookingRequest, 'id' | 'bookingCode' | 'createdAt' | 'status'>
  ): BookingRequest => {
    const randomCodeNum = Math.floor(1000 + Math.random() * 9000);
    const newBooking: BookingRequest = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      bookingCode: `YD-2026-${randomCodeNum}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingRequest['status']) => {
    setBookings(prev => prev.map(b => (b.id === id ? { ...b, status } : b)));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const resetAllToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.INFO);
    localStorage.removeItem(STORAGE_KEYS.PACKAGES);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    setBusinessInfo(INITIAL_BUSINESS_INFO);
    setPackages(INITIAL_PACKAGES);
    setGallery(INITIAL_GALLERY);
    setTestimonials(INITIAL_TESTIMONIALS);
  };

  return (
    <BusinessContext.Provider
      value={{
        businessInfo,
        services,
        packages,
        gallery,
        partySupplies,
        testimonials,
        bookings,
        updateBusinessInfo,
        updatePackage,
        addPackage,
        deletePackage,
        addGalleryItem,
        deleteGalleryItem,
        addTestimonial,
        createBooking,
        updateBookingStatus,
        deleteBooking,
        resetAllToDefaults,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};
