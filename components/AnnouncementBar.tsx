import React from 'react';
import { Heart, Sparkles, Truck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#7A3E53] text-[#FDF4F5] text-xs font-medium py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F6C6D3]" />
          <span>Every piece 100% hand-crocheted with love</span>
        </div>

        <div className="flex-1 text-center flex items-center justify-center gap-2 font-medium tracking-wide">
          <Heart className="w-3.5 h-3.5 fill-[#F6C6D3] text-[#F6C6D3] inline animate-pulse" />
          <span>FREE SHIPPING ON ORDERS OVER $65</span>
          <span className="hidden sm:inline opacity-60">•</span>
          <span className="hidden sm:inline text-[#FCDDE6]">Use code LOVE10 for 10% off</span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Truck className="w-3.5 h-3.5 text-[#F6C6D3]" />
          <span>Artisan Made in Small Batches</span>
        </div>
      </div>
    </div>
  );
};
