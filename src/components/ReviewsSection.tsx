import React, { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { Star, MessageSquarePlus, CheckCircle2, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { testimonials, addTestimonial } = useBusiness();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [eventType, setEventType] = useState('Wedding Reception');
  const [location, setLocation] = useState('Pune');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    addTestimonial({
      customerName: name.trim(),
      eventType,
      location: location.trim(),
      rating,
      comment: comment.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setName('');
      setComment('');
    }, 1500);
  };

  return (
    <section id="reviews" className="py-24 bg-[#0d0f16] text-[#f5f5f7] border-t border-[#2a2721]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#2a2721]">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase">
              Client Praise & Trust
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Honest Experiences from Recent Celebrations
            </h2>
            <p className="text-sm text-neutral-400">
              Read verified testimonials from brides, grooms, and host families who trusted Yash Decoration for their milestone memories.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#f3e5ab] bg-[#1a1c26] hover:bg-[#252835] border border-[#d4af37]/30 hover:border-[#d4af37] rounded-md transition-colors cursor-pointer shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#d4af37]" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map(item => (
            <div
              key={item.id}
              className="p-6 rounded-xl bg-[#12151f] border border-[#232635] flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#d4af37]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < item.rating ? 'fill-[#d4af37]' : 'text-neutral-600'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Metadata (Zero-pill format) */}
              <div className="pt-4 border-t border-[#1e212d] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-white">
                    {item.customerName}
                  </span>
                  {item.verified && (
                    <span className="text-[10px] text-emerald-400 font-medium">Verified Client</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                  <span>{item.eventType}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-[#121520] border border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#d4af37] mx-auto" />
                <h3 className="text-xl font-serif font-bold text-white">Thank You for Your Feedback!</h3>
                <p className="text-xs text-neutral-300">Your review has been saved to our community showcase.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-bold text-white">Share Your Experience</h3>
                  <p className="text-xs text-neutral-400">
                    How was your celebration decor with Yash Decoration?
                  </p>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Shraddha & Rohit"
                    className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#2a2d3d] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">Celebration</label>
                    <input
                      type="text"
                      required
                      value={eventType}
                      onChange={e => setEventType(e.target.value)}
                      placeholder="e.g. Wedding Reception"
                      className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#2a2d3d] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1">Venue / City</label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="e.g. Conrad Pune"
                      className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#2a2d3d] text-sm text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-[#d4af37] text-[#d4af37]'
                              : 'text-neutral-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Review Details</label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Tell us about the floral quality, punctuality, and guest feedback..."
                    className="w-full px-3 py-2 bg-[#0b0c12] rounded border border-[#2a2d3d] text-sm text-white focus:outline-none focus:border-[#d4af37] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-[#090a0f] bg-[#d4af37] hover:bg-[#e6ca65] rounded-md transition-colors"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
