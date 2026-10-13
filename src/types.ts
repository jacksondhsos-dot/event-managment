export interface BusinessInfo {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  mapsEmbedUrl: string;
  googleMapsShareUrl: string;
  openingHours: string;
  instagramUrl: string;
  facebookUrl: string;
  currency: string;
}

export interface DecorationService {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  startingPrice: number;
  image: string;
  highlights: string[];
  popular?: boolean;
}

export interface DecorationPackage {
  id: string;
  name: string;
  tier: 'basic' | 'premium' | 'luxury';
  price: number;
  originalPrice: number;
  description: string;
  recommendedFor: string;
  includedServices: string[];
  isPopular?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'wedding' | 'birthday' | 'balloon' | 'haldi_mehndi' | 'baby_shower' | 'engagement' | 'stage';
  image: string;
  description: string;
  eventDate?: string;
  clientType?: string;
}

export interface PartySupplyItem {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  available: boolean;
}

export interface BookingRequest {
  id: string;
  bookingCode: string;
  customerName: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  venueLocation: string;
  preferredTheme: string;
  packageId?: string;
  estimatedBudget: string;
  specialRequirements: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';
}

export interface Testimonial {
  id: string;
  customerName: string;
  eventType: string;
  location: string;
  date: string;
  rating: number;
  comment: string;
  verified: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
