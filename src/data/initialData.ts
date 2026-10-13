import {
  BusinessInfo,
  DecorationService,
  DecorationPackage,
  GalleryItem,
  PartySupplyItem,
  Testimonial,
  FAQItem,
} from '../types';

import heroStageImg from '../assets/images/hero_luxury_stage_1791873272318.jpg';
import weddingReceptionImg from '../assets/images/wedding_reception_decor_1791873272273.jpg';
import birthdayBalloonImg from '../assets/images/birthday_balloon_styling_1791873281913.jpg';
import haldiMehndiImg from '../assets/images/haldi_mehndi_setup_1791873282089.jpg';
import babyShowerImg from '../assets/images/baby_shower_decor_1791873327823.jpg';
import engagementRingsImg from '../assets/images/engagement_stage_rings_1791873328973.jpg';

export const INITIAL_BUSINESS_INFO: BusinessInfo = {
  name: 'Yash Decoration',
  tagline: 'Making Every Celebration Unforgettable',
  phone: '+91 98220 54321',
  whatsapp: '919822054321',
  email: 'yashdecoration.events@gmail.com',
  address: 'Shop 12, Royal Plaza Commercial Hub, Opp. Grand Banquet, Pune-Bangalore Highway',
  city: 'Pune',
  state: 'Maharashtra',
  pincode: '411038',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04362704257!2d73.792928822998!3d18.52461645802521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d3e3f32!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000',
  googleMapsShareUrl: 'https://maps.google.com/?q=Pune+Maharashtra',
  openingHours: 'Mon - Sun: 09:00 AM - 09:30 PM (All 7 Days)',
  instagramUrl: 'https://instagram.com/yash_decoration_official',
  facebookUrl: 'https://facebook.com/yashdecoration',
  currency: '₹',
};

export const INITIAL_SERVICES: DecorationService[] = [
  {
    id: 'wedding',
    title: 'Wedding Decoration',
    category: 'wedding',
    shortDesc: 'Opulent mandaps, fairy-lit banquet canopies, and lavish royal floral stages.',
    fullDesc:
      'Turn your sacred union into a timeless royal masterpiece. We craft grand palace-inspired mandaps, bespoke stage backdrops, entrance pathways with floral arches, and candlelit guest table arrangements tailored to your royal aesthetic.',
    startingPrice: 45000,
    image: weddingReceptionImg,
    highlights: ['Bespoke Floral Mandaps', 'Grand Crystal Chandeliers', 'Custom Varmala Stage', 'Bridal Walkway & Cold Pyro Entry'],
    popular: true,
  },
  {
    id: 'birthday',
    title: 'Birthday Party Decoration',
    category: 'birthday',
    shortDesc: 'Chic balloon arches, neon signage, themed pedestals, and customized photobooths.',
    fullDesc:
      'From 1st birthday milestones to grand 18th, 30th, and 50th jubilees, our luxury birthday setups feature organic chrome balloon installations, warm neon typography, designer backdrop panels, and themed cake tables.',
    startingPrice: 7999,
    image: birthdayBalloonImg,
    highlights: ['Organic Chrome Balloon Garlands', 'Custom LED Neon Nameplates', 'Cylinder Pedestal Stands', 'Themed Photo-Ops'],
    popular: true,
  },
  {
    id: 'balloon',
    title: 'Balloon Decoration & Styling',
    category: 'balloon',
    shortDesc: 'Trendsetting organic balloon arches, ring installations, and metallic styling.',
    fullDesc:
      'We use premium double-stuffed metallic, pastel, and chrome balloons that retain luster for 24+ hours. Featuring organic flow architecture, ring backdrops, shimmer wall integrations, and ceiling balloon drops.',
    startingPrice: 4999,
    image: birthdayBalloonImg,
    highlights: ['Double-stuffed Pastel & Metallic Latex', 'Shimmer Sequin Walls', 'Circular Grid Balloon Frames', 'Ceiling Balloon Canopies'],
  },
  {
    id: 'engagement',
    title: 'Engagement & Ring Ceremony',
    category: 'engagement',
    shortDesc: 'Dreamy floral rings, illuminated Marry Me marquees, and mirror glass aisles.',
    fullDesc:
      'Celebrate your ring exchange in pure cinematic romance. Our engagement designs feature oversized floral circular arches, warm twinkling fairy backdrops, mirrored flooring aisles, and illuminated marquee letters.',
    startingPrice: 22000,
    image: engagementRingsImg,
    highlights: ['Oversized Circular Floral Ring Arch', 'Mirror Glass Runway', 'Illuminated Love / Marry Me Letters', 'Ambient Warm Uplighting'],
    popular: true,
  },
  {
    id: 'anniversary',
    title: 'Anniversary Decoration',
    category: 'wedding',
    shortDesc: 'Intimate candlelit setups, romantic floral gazebos, and golden milestone themes.',
    fullDesc:
      'Whether celebrating 25 years of Silver Jubilee, 50 years of Golden union, or an intimate private candlelight terrace, we curate warm champagne drapes, rose petal walkways, and personalized memory walls.',
    startingPrice: 11999,
    image: heroStageImg,
    highlights: ['Champagne Silk Drapery', 'Personalized Photo Memory Chandelier', 'Candlelit Walkways', 'Intimate Gazebo Structure'],
  },
  {
    id: 'baby_shower',
    title: 'Baby Shower & Cradle Ceremony',
    category: 'baby_shower',
    shortDesc: 'Whimsical cloud arches, pastel gold accents, cradle styling, and teddy installations.',
    fullDesc:
      'Welcome your newest blessing with dreamy cloud backdrops, pastel floral garlands, illuminated nursery neon signs, royal cradle floral covers, and elegant guest seating arrangements.',
    startingPrice: 8999,
    image: babyShowerImg,
    highlights: ['Cloud Arch with Hidden Lighting', 'Traditional Cradle Flower Adornment', 'Pastel Balloon Swags', 'Baby Announcement Photo Frame'],
  },
  {
    id: 'haldi_mehndi',
    title: 'Haldi & Mehndi Decoration',
    category: 'haldi_mehndi',
    shortDesc: 'Fresh marigold drapes, brass urli setups, royal diwan seating, and vibrant festive charm.',
    fullDesc:
      'Infuse traditional warmth into your pre-wedding rituals with fresh yellow and orange marigold canopies, authentic brass urlis filled with floating petals, colorful Rajasthani umbrellas, and plush floor diwan seating.',
    startingPrice: 14999,
    image: haldiMehndiImg,
    highlights: ['Fresh Fragrant Genda Phool Curtains', 'Brass Urli with Floating Petals & Diyas', 'Boho Cane & Rattan Seating', 'Vibrant Festive Photo Booth'],
    popular: true,
  },
  {
    id: 'stage_mandap',
    title: 'Stage & Mandap Architecture',
    category: 'stage',
    shortDesc: 'Architectural mandaps with dome structures, crystal chandeliers, and royal thrones.',
    fullDesc:
      'Our signature grand wedding stages feature multi-pillar mandap domes, flowing chiffon ceiling drapes, imported exotic blooms (hydrangeas, orchids, Dutch roses), and regal maharaja thrones with ambient focus lighting.',
    startingPrice: 55000,
    image: heroStageImg,
    highlights: ['Heavy Floral Dome & Pillar Mandap', 'Maharaja Sofa & Royal Diwans', 'Crystal Cascading Chandeliers', 'Engineered Trussing & Stage Carpeting'],
  },
  {
    id: 'corporate_festival',
    title: 'Festival & Corporate Event Decor',
    category: 'stage',
    shortDesc: 'Professional brand launch stages, annual gala setups, and festive seasonal decor.',
    fullDesc:
      'High-impact event styling for corporate award ceremonies, company anniversaries, product launches, Diwali celebrations, and Ganpati pandal decorations with precision trussing, LED screens, and branded backdrops.',
    startingPrice: 28000,
    image: weddingReceptionImg,
    highlights: ['Corporate Podium & Stage Backing', 'Gala Dinner Table Centerpieces', 'Festival Themed Entrance Gates', 'LED Video Wall Accents'],
  },
  {
    id: 'supplies_materials',
    title: 'Decoration Materials & Party Supplies',
    category: 'supplies',
    shortDesc: 'Rentals for cold pyro machines, dry ice fog, 360 photo booths, and neon signs.',
    fullDesc:
      'Complete supply rental inventory for planners and families: cold spark fireworks (fire-safe), low-lying dry ice fog machines for cloud bridal entry, marquee alphabet letters, golden brass stands, and shimmer sequin walls.',
    startingPrice: 2500,
    image: birthdayBalloonImg,
    highlights: ['Indoor-safe Cold Pyro Spark Guns', 'Dry Ice Cloud Fogger Machine', 'Illuminated Marquee Letters', 'Brass Urli & Antique Props'],
  },
];

export const INITIAL_PACKAGES: DecorationPackage[] = [
  {
    id: 'pkg_basic',
    name: 'Classic Celebration',
    tier: 'basic',
    price: 9999,
    originalPrice: 12500,
    description: 'Perfect for intimate home birthdays, anniversary dinners, and cozy baby showers.',
    recommendedFor: 'Home gatherings & banquet rooms up to 50 guests',
    includedServices: [
      '8ft x 8ft round arch or panel backdrop',
      'Double-colour organic balloon garland (200+ balloons)',
      'Custom acrylic or LED neon name sign',
      '2 pedestal cake stands with styling',
      'Focus LED warm spotlights (2 units)',
      'Setup & post-event dismantle included',
    ],
    isPopular: false,
  },
  {
    id: 'pkg_premium',
    name: 'Grand Elegance',
    tier: 'premium',
    price: 29999,
    originalPrice: 38000,
    description: 'Our most sought-after package for grand birthdays, engagements, and vibrant Haldi/Mehndi.',
    recommendedFor: 'Medium banquet halls & clubs up to 150 guests',
    includedServices: [
      '14ft x 10ft layered 3D backdrop with floral elements',
      'Custom gold metallic & pastel organic balloon installation',
      'Fresh flower table arrangements & floral ring or urli',
      'Illuminated large marquee letters / custom LED neon',
      'Pair of luxury seating chairs / diwan setup',
      'Pathway decoration with lanterns & floral stands (6 units)',
      'Professional ambient uplighting & truss lighting',
      'Dedicated on-site decorator throughout the setup',
    ],
    isPopular: true,
  },
  {
    id: 'pkg_luxury',
    name: 'Royal Heritage Luxury',
    tier: 'luxury',
    price: 79999,
    originalPrice: 95000,
    description: 'A bespoke royal experience for high-end weddings, lavish sangeets, and VIP receptions.',
    recommendedFor: 'Grand banquet lawns, 5-star ballrooms & full weddings',
    includedServices: [
      'Architectural 4-pillar or circular floral mandap / stage (up to 24ft width)',
      'Exotic imported flowers: Orchids, Hydrangeas, Dutch Roses, Gypsophila',
      'Grand crystal chandeliers & cascading fairy light ceiling canopy',
      'Red carpet or mirror aisle runner with flower row pedestals',
      'Bridal entry package: 4 Cold Pyro sparks + Dry Ice cloud fog machine',
      'Royal Maharaja thrones / couple lounge sofa with silk cushions',
      'Grand welcome gate with floral monogram & calligraphy easel',
      'Full venue ambient wash lighting & stage follow spotlights',
      'Lead event designer + full crew management for duration of event',
    ],
    isPopular: false,
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal_1',
    title: 'The Golden Rajwada Wedding Stage',
    category: 'wedding',
    image: heroStageImg,
    description: 'Opulent mandap with cascading crystal chandeliers, gold arches, and fresh champagne rose canopies.',
    eventDate: 'Wedding Gala',
    clientType: 'Banquet Hall',
  },
  {
    id: 'gal_2',
    title: 'Romantic Candlelight Wedding Reception',
    category: 'wedding',
    image: weddingReceptionImg,
    description: 'Fairy light ceiling drapes, golden floral table centerpieces, and glowing neon photo-op.',
    eventDate: 'Reception Night',
    clientType: 'Grand Lawn',
  },
  {
    id: 'gal_3',
    title: 'Champagne & Chrome Milestone Birthday',
    category: 'birthday',
    image: birthdayBalloonImg,
    description: 'Sophisticated organic balloon arch, golden fluted pedestals, and neon signage.',
    eventDate: '30th Birthday',
    clientType: 'Private Lounge',
  },
  {
    id: 'gal_4',
    title: 'Sunlit Royal Marigold Haldi Ceremony',
    category: 'haldi_mehndi',
    image: haldiMehndiImg,
    description: 'Traditional fresh marigold curtains, brass urli petal pool, and royal bohemian cushions.',
    eventDate: 'Haldi & Sangeet',
    clientType: 'Courtyard Lawn',
  },
  {
    id: 'gal_5',
    title: 'Dreamy Cloud & Teddy Baby Shower',
    category: 'baby_shower',
    image: babyShowerImg,
    description: 'Illuminated floating cloud installation, ivory florals, plush teddy styling, and candlelit guest tables.',
    eventDate: 'Baby Shower',
    clientType: 'Boutique Venue',
  },
  {
    id: 'gal_6',
    title: 'Everlasting Love Engagement Ring Stage',
    category: 'engagement',
    image: engagementRingsImg,
    description: 'Monumental circular floral arch with mirror aisle runway and glowing marquee lettering.',
    eventDate: 'Ring Ceremony',
    clientType: 'Hotel Ballroom',
  },
];

export const INITIAL_PARTY_SUPPLIES: PartySupplyItem[] = [
  {
    id: 'sup_1',
    name: 'Cold Pyro Spark Machine (Pair)',
    category: 'Special Effects',
    price: 3499,
    unit: 'Per Event (2 Units + 2 min spark)',
    image: weddingReceptionImg,
    description: '100% smokeless, fire-safe cold spark fountain machine for grand bride & groom entries.',
    available: true,
  },
  {
    id: 'sup_2',
    name: 'Dry Ice Cloud Fog Machine',
    category: 'Special Effects',
    price: 3999,
    unit: 'Per Event with Dry Ice Refill',
    image: heroStageImg,
    description: 'Creates a dreamy blanket of low-lying white clouds on the stage and dance floor for ring ceremony or varmala.',
    available: true,
  },
  {
    id: 'sup_3',
    name: 'Giant Illuminated Marquee Letters',
    category: 'Props & Signage',
    price: 1999,
    unit: 'Per Word (e.g., LOVE, BABY, 30)',
    image: engagementRingsImg,
    description: '4ft warm-white LED wooden marquee vintage letters that make every photo unforgettable.',
    available: true,
  },
  {
    id: 'sup_4',
    name: 'Antique Brass Urli & Diya Stand Set',
    category: 'Traditional Props',
    price: 2499,
    unit: 'Set of 4 Urli Bowls + Stands',
    image: haldiMehndiImg,
    description: 'Heavy authentic brass urlis for floating flower petals and aromatic tea-lights at the entrance.',
    available: true,
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev_1',
    customerName: 'Rohit & Sneha Kulkarni',
    eventType: 'Wedding & Reception Stage',
    location: 'Conrad Pune',
    date: 'February 2026',
    rating: 5,
    comment:
      'Yash Decoration turned our wedding stage into an absolute royal dream! The crystal chandeliers and fresh rose mandap looked even more breathtaking in person than the 3D preview. Our guests are still raving about the photographs.',
    verified: true,
  },
  {
    id: 'rev_2',
    customerName: 'Pooja Deshmukh',
    eventType: '1st Birthday Extravaganza',
    location: 'Baner, Pune',
    date: 'January 2026',
    rating: 5,
    comment:
      'The pastel balloon cloud setup for my baby’s first birthday was flawless. The colors matched our theme perfectly and their team arrived 3 hours ahead of time to finish everything calmly. Highly recommended!',
    verified: true,
  },
  {
    id: 'rev_3',
    customerName: 'Anand & Dr. Priya Joshi',
    eventType: 'Ring Ceremony & Sangeet',
    location: 'Koregaon Park',
    date: 'March 2026',
    rating: 5,
    comment:
      'Transparent pricing, prompt WhatsApp communication, and zero hidden charges. The circular floral ring stage and mirror aisle runner looked straight out of a celebrity celebration.',
    verified: true,
  },
  {
    id: 'rev_4',
    customerName: 'Vikram Mehta',
    eventType: 'Corporate Annual Gala',
    location: 'JW Marriott',
    date: 'November 2025',
    rating: 5,
    comment:
      'Very professional team for corporate setup. They managed stage trussing, LED backdrop decor, and guest table centerpieces seamlessly. Delivery and teardown was timely.',
    verified: true,
  },
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    question: 'How far in advance should I book my event decoration?',
    answer:
      'For weddings and large mandap stages, we recommend booking 3 to 6 weeks in advance to reserve your preferred date and flower varieties. For birthdays, baby showers, and home ceremonies, 3 to 5 days prior notice is usually sufficient. Last-minute emergency bookings are also accommodated subject to crew availability.',
  },
  {
    question: 'Can you customize decorations according to photos I found on Instagram or Pinterest?',
    answer:
      'Yes, absolutely! 80% of our clients share reference photos or specific color palettes. Send your ideas to our WhatsApp, and our lead designer will propose an exact customized setup matching your venue dimensions and budget.',
  },
  {
    question: 'Are setup and teardown charges included in the package price?',
    answer:
      'Yes, all our transparent packages include full on-site delivery, professional installation before your guests arrive, and neat post-event teardown within city limits.',
  },
  {
    question: 'How does the booking and payment process work?',
    answer:
      'After you submit your inquiry or connect on WhatsApp, we confirm date availability and venue specs. A modest 25% token advance secures your booking slot on our calendar. The balance is paid upon completion of decoration inspection on your event day.',
  },
  {
    question: 'Do you provide on-site venue inspection before the event?',
    answer:
      'For Premium and Luxury packages, our team conducts a complimentary venue recce to measure ceiling heights, power access, and stage layout to ensure seamless execution.',
  },
];
