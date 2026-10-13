import React, { useState, useEffect } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { BookingRequest } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Phone,
  User,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  Copy,
  Check,
} from 'lucide-react';

interface BookingSectionProps {
  prefilledTheme?: string;
  prefilledPackageId?: string;
  prefilledService?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  prefilledTheme,
  prefilledPackageId,
  prefilledService,
}) => {
  const { businessInfo, packages, createBooking } = useBusiness();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Wedding Decoration');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('06:00 PM (Evening)');
  const [venueLocation, setVenueLocation] = useState('');
  const [preferredTheme, setPreferredTheme] = useState('Royal Gold & Champagne');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [estimatedBudget, setEstimatedBudget] = useState('₹25,000 - ₹50,000');
  const [specialRequirements, setSpecialRequirements] = useState('');

  // UI & Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedBooking, setSubmittedBooking] = useState<BookingRequest | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Update on prefilled changes
  useEffect(() => {
    if (prefilledTheme) {
      setPreferredTheme(prefilledTheme);
    }
  }, [prefilledTheme]);

  useEffect(() => {
    if (prefilledPackageId) {
      setSelectedPackageId(prefilledPackageId);
      const pkg = packages.find(p => p.id === prefilledPackageId);
      if (pkg) {
        setEstimatedBudget(`${businessInfo.currency}${pkg.price.toLocaleString()}`);
      }
    }
  }, [prefilledPackageId, packages, businessInfo.currency]);

  useEffect(() => {
    if (prefilledService) {
      setEventType(prefilledService);
    }
  }, [prefilledService]);

  const eventTypeOptions = [
    'Wedding Decoration',
    'Birthday Party Decoration',
    'Organic Balloon Decoration',
    'Engagement & Ring Ceremony',
    'Anniversary Celebration',
    'Baby Shower & Cradle Ceremony',
    'Haldi & Mehndi Traditional Ceremony',
    'Grand Stage & Mandap Architecture',
    'Corporate & Festival Event',
    'Party Supplies & Equipment Rental',
  ];

  const themeOptions = [
    'Royal Gold & Champagne',
    'Pastel Floral Cloud & Ivory',
    'Traditional Vibrant Marigold & Brass',
    'Modern Bohemian Chic & Pampas',
    'Neon Glow & Metallic Chrome',
    'Whimsical Fairy Light Forest',
    'Custom Theme (Described Below)',
  ];

  const budgetOptions = [
    '₹5,000 - ₹15,000 (Intimate Home)',
    '₹15,000 - ₹35,000 (Grand Birthday / Baby Shower)',
    '₹35,000 - ₹65,000 (Engagement / Haldi Mehndi)',
    '₹65,000 - ₹1,20,000 (Signature Wedding Stage)',
    '₹1,20,000+ (Full Bespoke Turnkey Wedding)',
  ];

  const timeOptions = [
    '09:00 AM (Morning Ceremony)',
    '12:30 PM (Afternoon Lunch Event)',
    '05:00 PM (Sunset / High Tea)',
    '07:00 PM (Grand Evening Reception)',
    'Full Day / Multi-Slot Timing',
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!customerName.trim() || customerName.trim().length < 2) {
      newErrors.customerName = 'Please enter your full name';
    }

    const cleanPhone = phone.replace(/[\s\-+()]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!eventDate) {
      newErrors.eventDate = 'Please select your celebration date';
    } else {
      const selected = new Date(eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.eventDate = 'Event date cannot be in the past';
      }
    }

    if (!venueLocation.trim() || venueLocation.trim().length < 3) {
      newErrors.venueLocation = 'Please provide the venue address or city / hall name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppMessage = (booking: BookingRequest) => {
    const pkgName = packages.find(p => p.id === booking.packageId)?.name || 'Custom Setup';
    return `*EVENT DECORATION INQUIRY — YASH DECORATION*
Reference ID: *${booking.bookingCode}*

• *Customer Name:* ${booking.customerName}
• *Mobile Number:* ${booking.phone}
• *Event Type:* ${booking.eventType}
• *Event Date:* ${booking.eventDate}
• *Time Slot:* ${booking.eventTime}
• *Venue Location:* ${booking.venueLocation}
• *Preferred Theme:* ${booking.preferredTheme}
• *Package Choice:* ${pkgName}
• *Estimated Budget:* ${booking.estimatedBudget}
• *Special Requests:* ${booking.specialRequirements || 'None specified'}

_Sent via Yash Decoration Official Website_`;
  };

  const handleBookingSubmit = (e: React.FormEvent, sendToWhatsApp = false) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newBooking = createBooking({
      customerName: customerName.trim(),
      phone: phone.trim(),
      eventType,
      eventDate,
      eventTime,
      venueLocation: venueLocation.trim(),
      preferredTheme,
      packageId: selectedPackageId || undefined,
      estimatedBudget,
      specialRequirements: specialRequirements.trim(),
    });

    setSubmittedBooking(newBooking);

    if (sendToWhatsApp) {
      const messageText = generateWhatsAppMessage(newBooking);
      window.open(
        `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(messageText)}`,
        '_blank'
      );
    }
  };

  const handleCopyCode = () => {
    if (!submittedBooking) return;
    navigator.clipboard.writeText(submittedBooking.bookingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleResetForNewBooking = () => {
    setSubmittedBooking(null);
    setCustomerName('');
    setPhone('');
    setVenueLocation('');
    setSpecialRequirements('');
    setEventDate('');
    setErrors({});
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <section id="booking" className="py-24 bg-[#090a0f] text-[#f5f5f7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
            Reservations & Availability
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Book Your Decoration
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Tell us about your event. We will confirm date availability, prepare a personalized design moodboard, and send an itemized quotation directly to your WhatsApp.
          </p>
        </div>

        {submittedBooking ? (
          /* Submission Success View */
          <div className="mt-12 max-w-2xl mx-auto p-8 rounded-2xl bg-[#121520] border-2 border-[#d4af37]/60 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37] text-[#d4af37] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
                Inquiry Received Successfully
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Thank You, {submittedBooking.customerName}!
              </h3>
              <p className="text-sm text-neutral-300">
                Your decoration request has been registered in our schedule. Our chief designer will reach out to you within 2 business hours.
              </p>
            </div>

            {/* Reference Code Card */}
            <div className="p-4 rounded-xl bg-[#0b0c12] border border-[#2a2d3c] flex items-center justify-between max-w-md mx-auto">
              <div className="text-left">
                <span className="text-[11px] text-neutral-400 block font-mono">
                  Your Booking Reference:
                </span>
                <span className="text-lg font-mono font-bold text-[#d4af37]">
                  {submittedBooking.bookingCode}
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                className="p-2 text-neutral-400 hover:text-white bg-[#191c28] hover:bg-[#232738] rounded-md transition-colors"
                title="Copy reference code"
              >
                {copiedCode ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Summary Details */}
            <div className="text-left text-xs sm:text-sm text-neutral-300 bg-[#161924] p-5 rounded-xl border border-[#282c3c] space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">Event:</span>
                <span className="font-medium text-white">{submittedBooking.eventType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Date & Slot:</span>
                <span className="font-medium text-white">
                  {submittedBooking.eventDate} ({submittedBooking.eventTime})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Venue:</span>
                <span className="font-medium text-white truncate max-w-[220px]">
                  {submittedBooking.venueLocation}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Theme:</span>
                <span className="font-medium text-[#f3e5ab]">{submittedBooking.preferredTheme}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(
                  generateWhatsAppMessage(submittedBooking)
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </a>

              <a
                href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-[#090a0f] bg-[#d4af37] hover:bg-[#e6ca65] rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#090a0f]" />
                <span>Call Yash Decoration</span>
              </a>
            </div>

            <div>
              <button
                onClick={handleResetForNewBooking}
                className="text-xs text-neutral-400 hover:text-white underline underline-offset-4"
              >
                Submit another inquiry
              </button>
            </div>
          </div>
        ) : (
          /* Main Booking Form Grid */
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-8 bg-[#121520] p-6 sm:p-8 rounded-2xl border border-[#2a2d3c] shadow-xl">
              <form onSubmit={e => handleBookingSubmit(e, false)} className="space-y-6">
                {/* Row 1: Name and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Your Full Name <span className="text-[#d4af37]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={customerName}
                        onChange={e => {
                          setCustomerName(e.target.value);
                          if (errors.customerName) setErrors({ ...errors, customerName: '' });
                        }}
                        placeholder="e.g. Ramesh Kulkarni"
                        className={`w-full pl-10 pr-4 py-2.5 bg-[#0b0c12] rounded-lg border text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] transition-colors ${
                          errors.customerName ? 'border-red-500' : 'border-[#262938]'
                        }`}
                      />
                    </div>
                    {errors.customerName && (
                      <span className="text-xs text-red-400 mt-1 block flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.customerName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Mobile / WhatsApp Number <span className="text-[#d4af37]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        placeholder="e.g. 98220 12345"
                        className={`w-full pl-10 pr-4 py-2.5 bg-[#0b0c12] rounded-lg border text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-[#262938]'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-xs text-red-400 mt-1 block flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: Event Type and Package */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Event Type <span className="text-[#d4af37]">*</span>
                    </label>
                    <select
                      value={eventType}
                      onChange={e => setEventType(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#0b0c12] rounded-lg border border-[#262938] text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                    >
                      {eventTypeOptions.map(option => (
                        <option key={option} value={option} className="bg-[#121520]">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Package Preference
                    </label>
                    <select
                      value={selectedPackageId}
                      onChange={e => {
                        setSelectedPackageId(e.target.value);
                        const found = packages.find(p => p.id === e.target.value);
                        if (found) {
                          setEstimatedBudget(`${businessInfo.currency}${found.price.toLocaleString()}`);
                        }
                      }}
                      className="w-full px-4 py-2.5 bg-[#0b0c12] rounded-lg border border-[#262938] text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                    >
                      <option value="" className="bg-[#121520]">
                        Custom / Not Decided Yet
                      </option>
                      {packages.map(pkg => (
                        <option key={pkg.id} value={pkg.id} className="bg-[#121520]">
                          {pkg.name} ({businessInfo.currency}
                          {pkg.price.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Event Date and Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Event Date <span className="text-[#d4af37]">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                      <input
                        type="date"
                        min={todayStr}
                        value={eventDate}
                        onChange={e => {
                          setEventDate(e.target.value);
                          if (errors.eventDate) setErrors({ ...errors, eventDate: '' });
                        }}
                        className={`w-full pl-10 pr-4 py-2.5 bg-[#0b0c12] rounded-lg border text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] transition-colors ${
                          errors.eventDate ? 'border-red-500' : 'border-[#262938]'
                        }`}
                      />
                    </div>
                    {errors.eventDate && (
                      <span className="text-xs text-red-400 mt-1 block flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.eventDate}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Time Slot
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                      <select
                        value={eventTime}
                        onChange={e => setEventTime(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#0b0c12] rounded-lg border border-[#262938] text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                      >
                        {timeOptions.map(slot => (
                          <option key={slot} value={slot} className="bg-[#121520]">
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Row 4: Venue Location */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Venue Location & Hall Name <span className="text-[#d4af37]">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={venueLocation}
                      onChange={e => {
                        setVenueLocation(e.target.value);
                        if (errors.venueLocation) setErrors({ ...errors, venueLocation: '' });
                      }}
                      placeholder="e.g. Royal Orchid Lawn, Baner, Pune or Home Address"
                      className={`w-full pl-10 pr-4 py-2.5 bg-[#0b0c12] rounded-lg border text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] transition-colors ${
                        errors.venueLocation ? 'border-red-500' : 'border-[#262938]'
                      }`}
                    />
                  </div>
                  {errors.venueLocation && (
                    <span className="text-xs text-red-400 mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.venueLocation}
                    </span>
                  )}
                </div>

                {/* Row 5: Theme & Estimated Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Preferred Color & Theme
                    </label>
                    <select
                      value={preferredTheme}
                      onChange={e => setPreferredTheme(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#0b0c12] rounded-lg border border-[#262938] text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                    >
                      {themeOptions.map(th => (
                        <option key={th} value={th} className="bg-[#121520]">
                          {th}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Estimated Budget Range
                    </label>
                    <select
                      value={estimatedBudget}
                      onChange={e => setEstimatedBudget(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#0b0c12] rounded-lg border border-[#262938] text-sm text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                    >
                      {budgetOptions.map(bg => (
                        <option key={bg} value={bg} className="bg-[#121520]">
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 6: Special Requirements */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Special Requirements & Specific Notes
                  </label>
                  <textarea
                    rows={3}
                    value={specialRequirements}
                    onChange={e => setSpecialRequirements(e.target.value)}
                    placeholder="e.g. Need cold pyro spark entry, dry ice fogger for first dance, 4ft LED marquee letters for baby name..."
                    className="w-full px-4 py-2.5 bg-[#0b0c12] rounded-lg border border-[#262938] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
                  />
                </div>

                {/* Submit Actions */}
                <div className="pt-4 border-t border-[#232738] flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={e => handleBookingSubmit(e, true)}
                    className="flex-1 py-3 px-6 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Booking to WhatsApp</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 text-xs sm:text-sm font-bold text-[#090a0f] bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] hover:brightness-110 rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Sparkles className="w-4 h-4 text-[#090a0f]" />
                    <span>Confirm Online Request</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Live Summary & Assurance Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#121520] p-6 rounded-2xl border border-[#2a2d3c] space-y-5">
                <span className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase block">
                  Live Quotation Preview
                </span>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-1 border-b border-[#232637]">
                    <span className="text-neutral-400">Celebration:</span>
                    <span className="font-semibold text-white">{eventType}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-[#232637]">
                    <span className="text-neutral-400">Date:</span>
                    <span className="font-semibold text-white">
                      {eventDate || 'Not selected'}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-[#232637]">
                    <span className="text-neutral-400">Theme:</span>
                    <span className="font-semibold text-[#f3e5ab]">{preferredTheme}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-[#232637]">
                    <span className="text-neutral-400">Selected Tier:</span>
                    <span className="font-semibold text-white">
                      {packages.find(p => p.id === selectedPackageId)?.name || 'Custom Theme'}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-[#232637]">
                    <span className="text-neutral-400">Budget Range:</span>
                    <span className="font-semibold text-[#d4af37]">{estimatedBudget}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0a0c12] border border-[#1e2130] space-y-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2 text-[#d4af37] font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The Yash Guarantee</span>
                  </div>
                  <ul className="space-y-1 text-neutral-400">
                    <li>• Free date reservation hold for 48 hours</li>
                    <li>• Complimentary on-site hall measurement recce</li>
                    <li>• 100% genuine fresh flowers sourced morning of event</li>
                  </ul>
                </div>

                <div className="pt-2 text-center">
                  <span className="text-xs text-neutral-400">
                    Need instant answer? Call us directly:
                  </span>
                  <a
                    href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`}
                    className="mt-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-[#d4af37] hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{businessInfo.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
