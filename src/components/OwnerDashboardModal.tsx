import React, { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import {
  DecorationPackage,
  GalleryItem,
  BookingRequest,
  BusinessInfo,
} from '../types';
import {
  X,
  Settings,
  Phone,
  MessageCircle,
  Package,
  Image as ImageIcon,
  CalendarCheck,
  Plus,
  Trash2,
  Edit2,
  Save,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface OwnerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerDashboardModal: React.FC<OwnerDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    businessInfo,
    updateBusinessInfo,
    packages,
    updatePackage,
    addPackage,
    deletePackage,
    gallery,
    addGalleryItem,
    deleteGalleryItem,
    bookings,
    updateBookingStatus,
    deleteBooking,
    resetAllToDefaults,
  } = useBusiness();

  const [activeTab, setActiveTab] = useState<'bookings' | 'settings' | 'packages' | 'gallery'>('bookings');

  // Business Settings State
  const [infoForm, setInfoForm] = useState<BusinessInfo>(businessInfo);
  const [infoSavedAlert, setInfoSavedAlert] = useState(false);

  // Package Editing State
  const [editingPkg, setEditingPkg] = useState<DecorationPackage | null>(null);
  const [newPkgMode, setNewPkgMode] = useState(false);
  const [pkgInclusionsText, setPkgInclusionsText] = useState('');

  // Gallery Add State
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<GalleryItem['category']>('wedding');
  const [newPhotoDesc, setNewPhotoDesc] = useState('');

  // Booking Filter
  const [bookingFilter, setBookingFilter] = useState<string>('all');

  if (!isOpen) return null;

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessInfo(infoForm);
    setInfoSavedAlert(true);
    setTimeout(() => setInfoSavedAlert(false), 2500);
  };

  const handleStartEditPackage = (pkg: DecorationPackage) => {
    setEditingPkg(pkg);
    setPkgInclusionsText(pkg.includedServices.join('\n'));
    setNewPkgMode(false);
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg) return;

    const inclusions = pkgInclusionsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const updated: DecorationPackage = {
      ...editingPkg,
      includedServices: inclusions,
    };

    if (newPkgMode) {
      addPackage(updated);
    } else {
      updatePackage(updated);
    }

    setEditingPkg(null);
    setNewPkgMode(false);
  };

  const handleAddNewPackage = () => {
    const blank: DecorationPackage = {
      id: `pkg_${Date.now()}`,
      name: 'New Custom Package',
      tier: 'premium',
      price: 25000,
      originalPrice: 30000,
      description: 'Package description details',
      recommendedFor: 'Venues up to 100 guests',
      includedServices: ['Custom floral backdrop', 'Organic balloon setup', 'Setup and dismantle'],
      isPopular: false,
    };
    setEditingPkg(blank);
    setPkgInclusionsText(blank.includedServices.join('\n'));
    setNewPkgMode(true);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim() || !newPhotoUrl.trim()) return;

    addGalleryItem({
      id: `photo_${Date.now()}`,
      title: newPhotoTitle.trim(),
      category: newPhotoCategory,
      image: newPhotoUrl.trim(),
      description: newPhotoDesc.trim() || 'Custom decorative setup by Yash Decoration.',
      eventDate: 'Recent Celebration',
    });

    setNewPhotoTitle('');
    setNewPhotoUrl('');
    setNewPhotoDesc('');
  };

  const exportBookingsToCSV = () => {
    if (bookings.length === 0) return;
    const headers = [
      'Booking Code',
      'Customer Name',
      'Phone',
      'Event Type',
      'Event Date',
      'Time Slot',
      'Venue',
      'Theme',
      'Budget',
      'Status',
      'Created At',
    ];
    const rows = bookings.map(b => [
      b.bookingCode,
      `"${b.customerName.replace(/"/g, '""')}"`,
      b.phone,
      `"${b.eventType}"`,
      b.eventDate,
      `"${b.eventTime}"`,
      `"${b.venueLocation.replace(/"/g, '""')}"`,
      `"${b.preferredTheme}"`,
      `"${b.estimatedBudget}"`,
      b.status,
      b.createdAt,
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Yash_Decoration_Bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookings =
    bookingFilter === 'all' ? bookings : bookings.filter(b => b.status === bookingFilter);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative max-w-5xl w-full bg-[#11131c] border border-[#d4af37]/40 rounded-2xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#161925] border-b border-[#252838] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                Yash Decoration — Owner Management Portal
              </h3>
              <p className="text-xs text-neutral-400">
                Manage contact details, WhatsApp phone number, package prices, and client bookings.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-full bg-black/40 hover:bg-black/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 bg-[#131622] border-b border-[#252838] flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Client Inquiries ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Business & WhatsApp Info</span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'packages'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Packages & Pricing ({packages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery Showcase ({gallery.length})</span>
          </button>
        </div>

        {/* Tab Body (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-neutral-400">Filter Status:</span>
                  {['all', 'new', 'contacted', 'confirmed', 'completed'].map(st => (
                    <button
                      key={st}
                      onClick={() => setBookingFilter(st)}
                      className={`px-3 py-1 rounded text-[11px] font-medium capitalize transition-colors ${
                        bookingFilter === st
                          ? 'bg-[#d4af37] text-[#090a0f] font-bold'
                          : 'bg-[#1b1e2a] text-neutral-300 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <button
                  onClick={exportBookingsToCSV}
                  disabled={bookings.length === 0}
                  className="px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white bg-[#1a1e2b] hover:bg-[#252b3d] border border-[#2d3345] rounded-md transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Download CSV</span>
                </button>
              </div>

              {filteredBookings.length === 0 ? (
                <div className="p-12 text-center text-neutral-400 text-sm bg-[#0b0c12] rounded-xl border border-[#202330]">
                  No bookings found matching this filter.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBookings.map(b => (
                    <div
                      key={b.id}
                      className="p-5 rounded-xl bg-[#141724] border border-[#25293a] hover:border-[#d4af37]/40 transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#202434] pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#d4af37]">
                            {b.bookingCode}
                          </span>
                          <span className="text-sm font-semibold text-white">
                            {b.customerName}
                          </span>
                        </div>

                        {/* Status Selector */}
                        <div className="flex items-center gap-2">
                          <label className="text-[11px] text-neutral-400">Status:</label>
                          <select
                            value={b.status}
                            onChange={e =>
                              updateBookingStatus(b.id, e.target.value as BookingRequest['status'])
                            }
                            className={`text-xs px-2.5 py-1 rounded font-semibold focus:outline-none ${
                              b.status === 'new'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : b.status === 'confirmed'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : b.status === 'contacted'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                                : 'bg-neutral-700 text-neutral-300'
                            }`}
                          >
                            <option value="new" className="bg-[#141724] text-white">
                              New
                            </option>
                            <option value="contacted" className="bg-[#141724] text-white">
                              Contacted
                            </option>
                            <option value="confirmed" className="bg-[#141724] text-white">
                              Confirmed
                            </option>
                            <option value="completed" className="bg-[#141724] text-white">
                              Completed
                            </option>
                            <option value="cancelled" className="bg-[#141724] text-white">
                              Cancelled
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-neutral-300">
                        <div>
                          <strong className="text-neutral-400 block">Phone:</strong>
                          <span>{b.phone}</span>
                        </div>
                        <div>
                          <strong className="text-neutral-400 block">Event & Date:</strong>
                          <span>
                            {b.eventType} ({b.eventDate})
                          </span>
                        </div>
                        <div>
                          <strong className="text-neutral-400 block">Venue:</strong>
                          <span className="truncate block">{b.venueLocation}</span>
                        </div>
                        <div>
                          <strong className="text-neutral-400 block">Budget:</strong>
                          <span className="text-[#d4af37] font-semibold">{b.estimatedBudget}</span>
                        </div>
                      </div>

                      {b.specialRequirements && (
                        <div className="p-2.5 rounded bg-[#0b0d14] text-xs text-neutral-300">
                          <strong className="text-neutral-400">Client Note:</strong>{' '}
                          {b.specialRequirements}
                        </div>
                      )}

                      {/* Direct Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#1e2230]">
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${b.customerName}! Thank you for your decoration inquiry (${b.bookingCode}) with Yash Decoration. We would love to discuss the setup for ${b.eventDate}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-[11px] font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded flex items-center gap-1.5"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp Client</span>
                          </a>

                          <a
                            href={`tel:${b.phone.replace(/\s+/g, '')}`}
                            className="px-3 py-1 text-[11px] font-semibold text-neutral-200 hover:text-white bg-[#1e2332] rounded flex items-center gap-1.5"
                          >
                            <Phone className="w-3 h-3 text-[#d4af37]" />
                            <span>Call Client</span>
                          </a>
                        </div>

                        <button
                          onClick={() => deleteBooking(b.id)}
                          className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                          title="Delete booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BUSINESS & WHATSAPP SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveInfo} className="space-y-6">
              {infoSavedAlert && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Business information updated and saved successfully!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={infoForm.name}
                    onChange={e => setInfoForm({ ...infoForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={infoForm.tagline}
                    onChange={e => setInfoForm({ ...infoForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Display Phone Number (Click to Call)
                  </label>
                  <input
                    type="text"
                    value={infoForm.phone}
                    onChange={e => setInfoForm({ ...infoForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    WhatsApp Number (Digits only, including country code e.g. 919822054321)
                  </label>
                  <input
                    type="text"
                    value={infoForm.whatsapp}
                    onChange={e => setInfoForm({ ...infoForm, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={infoForm.email}
                    onChange={e => setInfoForm({ ...infoForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    value={infoForm.openingHours}
                    onChange={e => setInfoForm({ ...infoForm, openingHours: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Physical Shop Address
                  </label>
                  <input
                    type="text"
                    value={infoForm.address}
                    onChange={e => setInfoForm({ ...infoForm, address: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    City & State
                  </label>
                  <input
                    type="text"
                    value={`${infoForm.city}, ${infoForm.state}`}
                    onChange={e => {
                      const [city, state] = e.target.value.split(',');
                      setInfoForm({
                        ...infoForm,
                        city: city?.trim() || infoForm.city,
                        state: state?.trim() || infoForm.state,
                      });
                    }}
                    className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Currency Symbol
                  </label>
                  <input
                    type="text"
                    value={infoForm.currency}
                    onChange={e => setInfoForm({ ...infoForm, currency: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#252838]">
                <button
                  type="button"
                  onClick={resetAllToDefaults}
                  className="px-4 py-2 text-xs text-red-400 hover:text-red-300 bg-red-950/20 border border-red-900/40 rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All to Defaults</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-[#090a0f] bg-gradient-to-r from-[#d4af37] to-[#e6ca65] rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#090a0f]" />
                  <span>Save Contact Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: PACKAGES & PRICING */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              {editingPkg ? (
                /* Editing Package Form */
                <form onSubmit={handleSavePackage} className="p-6 rounded-xl bg-[#141724] border border-[#d4af37]/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-serif font-bold text-white">
                      {newPkgMode ? 'Add New Package' : `Edit Package: ${editingPkg.name}`}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingPkg(null)}
                      className="text-xs text-neutral-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">Package Name</label>
                      <input
                        type="text"
                        required
                        value={editingPkg.name}
                        onChange={e => setEditingPkg({ ...editingPkg, name: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">Tier</label>
                      <select
                        value={editingPkg.tier}
                        onChange={e =>
                          setEditingPkg({
                            ...editingPkg,
                            tier: e.target.value as DecorationPackage['tier'],
                          })
                        }
                        className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-sm text-white"
                      >
                        <option value="basic">Basic</option>
                        <option value="premium">Premium</option>
                        <option value="luxury">Luxury</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">Offer Price (₹)</label>
                      <input
                        type="number"
                        required
                        value={editingPkg.price}
                        onChange={e =>
                          setEditingPkg({ ...editingPkg, price: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">Original Price (₹)</label>
                      <input
                        type="number"
                        value={editingPkg.originalPrice}
                        onChange={e =>
                          setEditingPkg({ ...editingPkg, originalPrice: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-sm text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs text-neutral-300 mb-1">Description</label>
                      <input
                        type="text"
                        value={editingPkg.description}
                        onChange={e =>
                          setEditingPkg({ ...editingPkg, description: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-sm text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs text-neutral-300 mb-1">Recommended For</label>
                      <input
                        type="text"
                        value={editingPkg.recommendedFor}
                        onChange={e =>
                          setEditingPkg({ ...editingPkg, recommendedFor: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-sm text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs text-neutral-300 mb-1">
                        Included Services (One item per line)
                      </label>
                      <textarea
                        rows={5}
                        value={pkgInclusionsText}
                        onChange={e => setPkgInclusionsText(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingPkg(null)}
                      className="px-4 py-2 text-xs text-neutral-300 bg-[#1b1e2a] rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-[#090a0f] bg-[#d4af37] rounded"
                    >
                      Save Package
                    </button>
                  </div>
                </form>
              ) : (
                /* List of Packages */
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-400">
                      Edit pricing and included items for customer packages.
                    </span>
                    <button
                      onClick={handleAddNewPackage}
                      className="px-3 py-1.5 text-xs font-semibold text-[#090a0f] bg-[#d4af37] hover:bg-[#e6ca65] rounded flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Package</span>
                    </button>
                  </div>

                  {packages.map(pkg => (
                    <div
                      key={pkg.id}
                      className="p-5 rounded-xl bg-[#141724] border border-[#25293a] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-serif font-bold text-white">{pkg.name}</span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-[#1e2332] text-[#f3e5ab] uppercase font-mono">
                            {pkg.tier}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-1">{pkg.description}</p>
                        <div className="mt-2 text-sm font-bold text-[#d4af37] tabular-nums">
                          {businessInfo.currency}
                          {pkg.price.toLocaleString()}
                          {pkg.originalPrice > pkg.price && (
                            <span className="text-xs text-neutral-500 line-through ml-2">
                              {businessInfo.currency}
                              {pkg.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStartEditPackage(pkg)}
                          className="px-3 py-1.5 text-xs text-neutral-200 hover:text-white bg-[#1e2332] hover:bg-[#282f42] rounded flex items-center gap-1"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>Edit</span>
                        </button>
                        {packages.length > 1 && (
                          <button
                            onClick={() => deletePackage(pkg.id)}
                            className="p-1.5 text-neutral-500 hover:text-red-400"
                            title="Delete package"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: GALLERY MANAGER */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Add New Photo Form */}
              <form onSubmit={handleAddPhoto} className="p-5 rounded-xl bg-[#141724] border border-[#25293a] space-y-4">
                <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider block">
                  Add New Photo to Gallery
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={newPhotoTitle}
                      onChange={e => setNewPhotoTitle(e.target.value)}
                      placeholder="e.g. Lavender Mandap with Fairy Canopy"
                      className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">Category</label>
                    <select
                      value={newPhotoCategory}
                      onChange={e =>
                        setNewPhotoCategory(e.target.value as GalleryItem['category'])
                      }
                      className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-xs text-white"
                    >
                      <option value="wedding">Wedding</option>
                      <option value="birthday">Birthday</option>
                      <option value="balloon">Balloon</option>
                      <option value="haldi_mehndi">Haldi Mehndi</option>
                      <option value="baby_shower">Baby Shower</option>
                      <option value="engagement">Engagement</option>
                      <option value="stage">Stage & Mandap</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">Image URL</label>
                    <input
                      type="url"
                      required
                      value={newPhotoUrl}
                      onChange={e => setNewPhotoUrl(e.target.value)}
                      placeholder="https://... or image path"
                      className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Description</label>
                  <input
                    type="text"
                    value={newPhotoDesc}
                    onChange={e => setNewPhotoDesc(e.target.value)}
                    placeholder="Short summary of flowers, lights, and venue..."
                    className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#252838] text-xs text-white"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-[#090a0f] bg-[#d4af37] hover:bg-[#e6ca65] rounded flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Live Showcase</span>
                  </button>
                </div>
              </form>

              {/* Photos List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {gallery.map(item => (
                  <div
                    key={item.id}
                    className="relative group rounded-lg overflow-hidden bg-[#141724] border border-[#25293a]"
                  >
                    <div className="aspect-[4/3] bg-neutral-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2.5 space-y-1">
                      <h5 className="text-xs font-bold text-white truncate">{item.title}</h5>
                      <span className="text-[10px] text-[#d4af37] uppercase">{item.category}</span>
                    </div>

                    <button
                      onClick={() => deleteGalleryItem(item.id)}
                      className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-red-950 text-neutral-300 hover:text-red-400 rounded transition-colors"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
