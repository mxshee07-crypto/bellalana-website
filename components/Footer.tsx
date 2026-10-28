import React, { useState } from 'react';
import { Heart, Send, Check, Sparkles, Instagram, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#FAF0F3] border-t border-[#F2D7DF] pt-16 pb-12 text-[#6D3446]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Callout Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#F2D7DF] shadow-xs mb-14 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0F4] text-[#7A3E53] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4829A]" />
            <span>JOIN THE BELLALANA CIRCLE</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl text-[#5D2C3D]">
            Receive 10% Off Your First Handmade Order
          </h3>

          <p className="text-xs sm:text-sm text-[#7D485B] max-w-md mx-auto">
            Get early access to weekly small-batch drops, free crochet patterns, and studio stories.
          </p>

          {subscribed ? (
            <div className="bg-[#EAF7EC] text-[#2E7D32] p-3 rounded-2xl max-w-md mx-auto text-xs font-medium flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Welcome to the family! Use discount code <strong>LOVE10</strong> at checkout.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto gap-2 pt-2">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#FAF4F5] border border-[#F2D7DF] rounded-full px-4 py-2.5 text-xs text-[#5D2C3D] placeholder-[#A67586] focus:outline-hidden focus:border-[#7A3E53]"
              />
              <button
                type="submit"
                className="bg-[#7A3E53] hover:bg-[#622E40] text-white px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <span className="text-[10px] tracking-[0.2em] text-[#9A6275] uppercase font-semibold flex items-center gap-1">
              Handmade With Love <Heart className="w-2.5 h-2.5 fill-[#E298AC] text-[#E298AC] inline" />
            </span>
            <h2 className="font-display text-2xl text-[#5D2C3D]">Bellalana</h2>
            <p className="font-luxury italic text-xs text-[#8C5367]">
              Little stitches, big love.
            </p>
            <p className="text-xs text-[#7A4B5B] leading-relaxed">
              Handcrafted crochet handbags, everlasting flowers, and sweet amigurumi creations made in small batches with premium milk cotton.
            </p>
          </div>

          {/* Shop Links */}
          <div className="space-y-2 text-xs">
            <h3 className="font-semibold text-sm text-[#5D2C3D] mb-3">Shop Collections</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('crochet-bags')}
                  className="hover:text-[#7A3E53] transition-colors"
                >
                  Crochet Bags & Totes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('flower-bouquets')}
                  className="hover:text-[#7A3E53] transition-colors"
                >
                  Everlasting Flower Bouquets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('cute-plushies')}
                  className="hover:text-[#7A3E53] transition-colors"
                >
                  Cute Amigurumi Plushies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('little-gifts')}
                  className="hover:text-[#7A3E53] transition-colors"
                >
                  Keychains & Little Gifts
                </button>
              </li>
            </ul>
          </div>

          {/* Care & Help */}
          <div className="space-y-2 text-xs">
            <h3 className="font-semibold text-sm text-[#5D2C3D] mb-3">Artisan Care & Help</h3>
            <ul className="space-y-2 text-[#7A4B5B]">
              <li>• Spot clean with cold water & mild soap</li>
              <li>• Lay flat in shade to dry</li>
              <li>• Natural beechwood handle maintenance</li>
              <li>• Free shipping threshold: $65+</li>
              <li>• Custom orders: 2-3 week lead time</li>
            </ul>
          </div>

          {/* Studio & Contact */}
          <div className="space-y-2 text-xs">
            <h3 className="font-semibold text-sm text-[#5D2C3D] mb-3">Studio & Social</h3>
            <p className="text-[#7A4B5B] leading-relaxed">
              Have a question or custom design request? We would love to chat!
            </p>
            <div className="pt-1 space-y-1 text-[#5D2C3D] font-medium">
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#9C4D66]" />
                <span>hello@bellalanastudio.com</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-[#9C4D66]" />
                <span>@bellalana.handmade</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#F2D7DF] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9B6A7A] gap-4">
          <p>© {new Date().getFullYear()} Bellalana Studio. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-[#D793A6] text-[#D793A6]" />
            <span>for handmade lovers everywhere</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
