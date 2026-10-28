import React from 'react';
import { Sparkles, Feather, ShieldCheck, Gift, Heart } from 'lucide-react';

export const CraftStorySection: React.FC = () => {
  const pillars = [
    {
      icon: Feather,
      title: '100% Combed Milk Cotton',
      description: 'Hypoallergenic, ultra-soft yarns chosen specifically to prevent pilling and hold structural form over years of daily wear.',
    },
    {
      icon: Sparkles,
      title: '14+ Hours of Artisan Care',
      description: 'Every bag is crafted stitch-by-stitch by experienced fiber artists without industrial machinery or mass production.',
    },
    {
      icon: ShieldCheck,
      title: 'Natural Solid Beechwood',
      description: 'Hand-carved and hand-polished arched wooden handles finished with non-toxic botanical wax for smooth ergonomic grip.',
    },
    {
      icon: Gift,
      title: 'Complimentary Keepsake Giftbox',
      description: 'Arrives in our signature blush presentation box with a stamped cotton linen dust bag, dried lavender, and personal card.',
    },
  ];

  return (
    <section id="story" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-[#FFF5F7] via-[#FAF0F3] to-[#FCEEF2] rounded-3xl p-8 sm:p-12 border border-[#F2D7DF] relative overflow-hidden">
        {/* Decorative background embellishments */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FADDE5] rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[#7A3E53] text-xs font-semibold shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-[#D4829A] text-[#D4829A]" />
            <span>THE ARTISAN PROMISE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl text-[#5D2C3D] font-normal tracking-tight">
            Slow Crafting In A Fast World
          </h2>

          <p className="text-sm text-[#7D485B] leading-relaxed">
            Bellalana was born from a simple belief: everyday accessories should spark joy, feel wondrous to touch, and carry the warmth of human hands. We create pieces you will cherish for decades.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-xs rounded-2xl p-6 border border-[#F2D7DF] shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#FAF0F4] text-[#7A3E53] flex items-center justify-center mb-4 shadow-inner">
                  <Icon className="w-5 h-5 text-[#9C4D66]" />
                </div>
                <h3 className="font-luxury text-base font-semibold text-[#5D2C3D] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#7A4B5B] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
