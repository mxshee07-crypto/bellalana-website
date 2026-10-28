import React, { useState } from 'react';
import { Star, CheckCircle, Heart, Plus, MessageSquare, Sparkles } from 'lucide-react';
import { Testimonial } from '../types/index.ts';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onAddReview: (review: Omit<Testimonial, 'id' | 'date'>) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onAddReview,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    title: '',
    comment: '',
    productName: 'Tulip Garden Wooden Tote',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    onAddReview({
      name: formData.name,
      location: formData.location || 'Verified Buyer',
      rating: formData.rating,
      title: formData.title || 'Absolutely gorgeous craftsmanship!',
      comment: formData.comment,
      productName: formData.productName,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setFormData({
        name: '',
        location: '',
        rating: 5,
        title: '',
        comment: '',
        productName: 'Tulip Garden Wooden Tote',
      });
    }, 1500);
  };

  return (
    <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header and Aggregate Rating */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCEEF2] text-[#91465D] text-xs font-semibold">
          <Heart className="w-3.5 h-3.5 fill-[#D4829A] text-[#D4829A]" />
          <span>CUSTOMER LOVE</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl text-[#5D2C3D] font-normal tracking-tight">
          Love Letters From Our Community
        </h2>

        <p className="text-sm text-[#7D485B]">
          Read what fellow handmade lovers have to say about our stitching, durable wooden handles, and packaging.
        </p>

        {/* Aggregate Score Bar */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <div className="flex items-center text-[#F5A623]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-sm font-bold text-[#5D2C3D]">4.9 out of 5</span>
          <span className="text-xs text-[#9B6A7A]">• Based on 480+ happy handmade adoptions</span>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F2D7DF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Stars & Date */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-[#F5A623] gap-0.5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] text-[#A67586]">{test.date}</span>
              </div>

              {/* Title & Comment */}
              <h3 className="font-luxury text-base font-semibold text-[#5D2C3D] mb-2 leading-snug">
                "{test.title}"
              </h3>
              <p className="text-xs sm:text-sm text-[#6C3E4F] leading-relaxed mb-6 font-normal">
                {test.comment}
              </p>
            </div>

            {/* Author info */}
            <div className="pt-4 border-t border-[#F8E1E7] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#F2D7DF]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#5D2C3D] flex items-center gap-1">
                    {test.name}
                    {test.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-[#2E7D32] inline" title="Verified Buyer" />
                    )}
                  </h4>
                  <p className="text-[10px] text-[#9A6577]">{test.location}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-medium text-[#8C495E] bg-[#FAF0F3] px-2.5 py-1 rounded-full border border-[#F2D7DF]">
                  {test.productName.split(' ')[0]} {test.productName.split(' ')[1]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action: Write a Review */}
      <div className="text-center">
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 bg-white hover:bg-[#FAF4F5] text-[#7A3E53] border-2 border-[#D793A6] px-6 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all"
        >
          <MessageSquare className="w-4 h-4 text-[#D793A6]" />
          <span>Share Your Bellalana Experience</span>
        </button>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#F2D7DF] relative animate-in fade-in zoom-in-95 duration-200">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-[#EAF7EC] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl text-[#5D2C3D]">Thank you so much! ♡</h3>
                <p className="text-xs text-[#7A495B]">
                  Your review has been shared with the Bellalana studio and community.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-display text-xl text-[#5D2C3D]">Leave a Love Note</h3>
                    <p className="text-xs text-[#8A5365]">Share your experience with your handmade crochet piece</p>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="text-[#9A6275] hover:text-[#5D2C3D] p-1"
                    aria-label="Close review modal"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Star Rating Picker */}
                  <div>
                    <label className="block text-xs font-semibold text-[#5D2C3D] mb-1">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-1 text-[#F5A623]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 hover:scale-110 transition-transform"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= formData.rating ? 'fill-current' : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#5D2C3D] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Maya Lin"
                        className="w-full px-3 py-2 rounded-xl border border-[#F2D7DF] bg-[#FAF4F5] text-xs text-[#5D2C3D] focus:outline-hidden focus:border-[#7A3E53]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5D2C3D] mb-1">
                        City / State
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Portland, OR"
                        className="w-full px-3 py-2 rounded-xl border border-[#F2D7DF] bg-[#FAF4F5] text-xs text-[#5D2C3D] focus:outline-hidden focus:border-[#7A3E53]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5D2C3D] mb-1">
                      Which product did you order?
                    </label>
                    <select
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#F2D7DF] bg-[#FAF4F5] text-xs text-[#5D2C3D] focus:outline-hidden focus:border-[#7A3E53]"
                    >
                      <option value="Tulip Garden Wooden Tote">Tulip Garden Wooden Tote</option>
                      <option value="Daisy Meadow Flap Crossbody">Daisy Meadow Flap Crossbody</option>
                      <option value="Blossom Romance Crochet Bouquet">Blossom Romance Crochet Bouquet</option>
                      <option value="Sweet Pea Heirloom Bunny Plushie">Sweet Pea Heirloom Bunny Plushie</option>
                      <option value="Vanilla Cloud Puff Shoulder Bag">Vanilla Cloud Puff Shoulder Bag</option>
                      <option value="Pastel Bloom Charm Keychains">Pastel Bloom Charm Keychains</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5D2C3D] mb-1">
                      Review Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Most stunning bag in my closet!"
                      className="w-full px-3 py-2 rounded-xl border border-[#F2D7DF] bg-[#FAF4F5] text-xs text-[#5D2C3D] focus:outline-hidden focus:border-[#7A3E53]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5D2C3D] mb-1">
                      Your Review *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Tell us about the texture, handles, stitching, or packaging..."
                      className="w-full px-3 py-2 rounded-xl border border-[#F2D7DF] bg-[#FAF4F5] text-xs text-[#5D2C3D] focus:outline-hidden focus:border-[#7A3E53]"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 rounded-full text-xs font-medium text-[#7A495B] hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#7A3E53] hover:bg-[#622E40] text-white px-6 py-2 rounded-full text-xs font-semibold shadow-xs"
                    >
                      Publish Review
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
