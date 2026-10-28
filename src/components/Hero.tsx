import React, { useState } from 'react';
import { Bookmark, ArrowDown, Sparkles, Heart } from 'lucide-react';
import { Product } from '../types/index.ts';

interface HeroProps {
  heroProduct: Product;
  allProducts: Product[];
  isBookmarked: boolean;
  onToggleBookmark: (product: Product) => void;
  onShopClick: () => void;
  onScrollToCategories: () => void;
  onQuickView: (product: Product) => void;
  onSelectHeroProduct: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({
  heroProduct,
  allProducts,
  isBookmarked,
  onToggleBookmark,
  onShopClick,
  onScrollToCategories,
  onQuickView,
  onSelectHeroProduct,
}) => {
  // Real bag options to switch between in the hero
  const featuredBags = allProducts.slice(0, 3);

  return (
    <section id="hero" className="pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Container card matching the reference mobile/desktop card format */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#F4DCE3] relative overflow-hidden transition-all hover:shadow-md">
        {/* Subtle decorative background gradient circles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#FDEEF2] rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#FBE9EE] rounded-full blur-3xl opacity-70 pointer-events-none" />

        {/* Top Text Header from reference image 1 */}
        <div className="text-center relative z-10 space-y-2 mb-8">
          <p className="text-xs sm:text-sm tracking-[0.2em] font-semibold text-[#A26277] uppercase flex items-center justify-center gap-1.5">
            <span>HANDMADE WITH LOVE</span>
            <Heart className="w-3.5 h-3.5 fill-[#D4829A] text-[#D4829A] inline" />
          </p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#5D2C3D] font-normal tracking-tight">
            Bellalana
          </h1>

          <p className="font-luxury italic text-base sm:text-lg text-[#8C5367] font-medium">
            Little stitches, big love.
          </p>

          {/* Colorway Switcher */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {featuredBags.map((bag) => (
              <button
                key={bag.id}
                onClick={() => onSelectHeroProduct(bag)}
                className={`text-[11px] px-3 py-1 rounded-full border transition-all ${
                  heroProduct.id === bag.id
                    ? 'border-[#7A3E53] bg-[#FCEEF2] text-[#5D2C3D] font-bold shadow-xs'
                    : 'border-[#F2D7DF] bg-white text-[#7A4B5B] hover:bg-[#FAF4F5]'
                }`}
              >
                {bag.name.replace(' Handcrafted Bag', '').replace(' Shoulder Bag', '').replace(' Garden Crossbody', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Product Showcase Hero Card matching reference */}
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FAF0F4] border border-[#F2D7DF] shadow-inner group">
            {/* Bookmark button in top right of card (matching ChatGPT screenshot) */}
            <button
              onClick={() => onToggleBookmark(heroProduct)}
              className="absolute top-4 right-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#6A3245] hover:bg-white hover:text-[#D44C73] transition-all shadow-sm active:scale-90"
              aria-label={isBookmarked ? 'Remove from saved' : 'Save to wishlist'}
              title={isBookmarked ? 'Saved to bookmarks' : 'Save to bookmarks'}
            >
              <Bookmark
                className={`w-5 h-5 transition-transform group-hover:scale-105 ${
                  isBookmarked ? 'fill-[#D44C73] text-[#D44C73]' : 'text-[#6A3245]'
                }`}
              />
            </button>

            {/* Artisan Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-white/85 backdrop-blur-md text-[#5D2C3D] text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4829A]" />
              <span>100% Hand-Crocheted</span>
            </div>

            {/* Bag Image display (Real Handmade Bag) */}
            <div
              className="w-full h-80 sm:h-96 md:h-[430px] cursor-pointer relative overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#FFF5F7] to-[#FCEEF2]"
              onClick={() => onQuickView(heroProduct)}
            >
              <img
                src={heroProduct.image}
                alt={heroProduct.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />

              {/* Gentle hover overlay prompt */}
              <div className="absolute inset-0 bg-[#5D2C3D]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                <span className="bg-white/90 backdrop-blur-sm text-[#5D2C3D] text-xs font-semibold px-4 py-2 rounded-full shadow-md">
                  Click to View All Angles & Details
                </span>
              </div>
            </div>
          </div>

          {/* Product quick info pill */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2 px-2">
            <div>
              <h2 className="font-display text-lg sm:text-xl text-[#5D2C3D]">
                {heroProduct.name}
              </h2>
              <p className="text-xs text-[#8C5367]">
                Braided Straps • Top Zipper Closure • Ribbon Bows & Tassels • Chunky Milk Cotton
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#5D2C3D]">
                ${heroProduct.price.toFixed(2)}
              </span>
              {heroProduct.originalPrice && (
                <span className="text-xs text-[#9B6A7A] line-through">
                  ${heroProduct.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Primary Action Button: "SHOP THE COLLECTION ♡" matching reference screenshot */}
          <div className="mt-7 flex flex-col items-center justify-center space-y-5">
            <button
              onClick={onShopClick}
              className="w-full sm:w-auto min-w-[280px] bg-[#D793A6] hover:bg-[#C97C92] active:bg-[#B66980] text-[#FFFFFF] text-sm sm:text-base font-semibold tracking-wider py-3.5 px-8 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 uppercase group"
            >
              <span>SHOP THE COLLECTION</span>
              <Heart className="w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform" />
            </button>

            {/* Scroll Down Arrow Button matching the circle ↓ in image 1 */}
            <button
              onClick={onScrollToCategories}
              className="w-11 h-11 rounded-full bg-[#8E5B6E] hover:bg-[#724354] text-white flex items-center justify-center shadow-md transition-all hover:translate-y-0.5 active:scale-95"
              aria-label="Scroll down to explore categories"
              title="Explore categories"
            >
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
