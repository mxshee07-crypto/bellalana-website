import React from 'react';
import { Bookmark, Sparkles } from 'lucide-react';
import { CategoryInfo } from '../data/storeData.ts';

interface CategoriesSectionProps {
  categories: CategoryInfo[];
  bookmarkedCategoryIds: string[];
  onToggleCategoryBookmark: (categoryId: string) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  bookmarkedCategoryIds,
  onToggleCategoryBookmark,
  onSelectCategory,
}) => {
  return (
    <section id="categories" className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header matching Image 2 */}
      <div className="text-center mb-8 sm:mb-10 space-y-1">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#5D2C3D] font-normal tracking-tight">
          Made just for you
        </h2>
        <p className="text-xs sm:text-sm text-[#8C5367] max-w-md mx-auto">
          Explore our handcrafted heirloom collections, woven with patience and heartfelt care
        </p>
      </div>

      {/* 2x2 Responsive Card Grid matching Image 2 layout */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat) => {
          const isSaved = bookmarkedCategoryIds.includes(cat.id);

          return (
            <div
              key={cat.id}
              className="flex flex-col group cursor-pointer"
              onClick={() => onSelectCategory(cat.id)}
            >
              {/* Card visual container */}
              <div className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FAF0F4] border border-[#F4DBE2] shadow-sm group-hover:shadow-md transition-all duration-300">
                {/* Bookmark button top right (matching Image 2) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCategoryBookmark(cat.id);
                  }}
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-[#6D3446] hover:bg-white hover:text-[#D44C73] transition-all shadow-sm active:scale-90"
                  aria-label={isSaved ? `Remove ${cat.name} from saved` : `Save ${cat.name}`}
                  title={isSaved ? 'Saved category' : 'Save category'}
                >
                  <Bookmark
                    className={`w-4 h-4 transition-transform group-hover:scale-105 ${
                      isSaved ? 'fill-[#D44C73] text-[#D44C73]' : 'text-[#6D3446]'
                    }`}
                  />
                </button>

                {/* Badge if present */}
                {cat.badge && (
                  <span className="absolute top-3 left-3 z-10 bg-white/85 backdrop-blur-sm text-[#5D2C3D] text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
                    {cat.badge}
                  </span>
                )}

                {/* Category Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                />

                {/* Subtle soft gradient scrim on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#5D2C3D]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                  <span className="text-[11px] font-semibold text-white bg-[#5D2C3D]/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#F6C6D3]" />
                    <span>View Collection</span>
                  </span>
                </div>
              </div>

              {/* Title Underneath matching Image 2 typography */}
              <div className="text-center mt-3 space-y-0.5">
                <h3 className="font-luxury text-sm sm:text-base text-[#5D2C3D] font-medium group-hover:text-[#8C3E56] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#9A6577]">{cat.count}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
