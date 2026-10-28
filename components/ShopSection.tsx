import React, { useState, useMemo } from 'react';
import {
  Bookmark,
  ShoppingBag,
  Star,
  Search,
  Eye,
  SlidersHorizontal,
  X,
  Check,
} from 'lucide-react';
import { Product } from '../types/index.ts';
import { filterAndSortProducts } from '../utils/filter.ts';

interface ShopSectionProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null);

  const categoriesList = [
    { id: 'all', label: 'All Handmades' },
    { id: 'crochet-bags', label: 'Crochet Bags' },
    { id: 'flower-bouquets', label: 'Flower Bouquets' },
    { id: 'cute-plushies', label: 'Cute Plushies' },
    { id: 'little-gifts', label: 'Little Gifts' },
  ];

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, {
      category: selectedCategory,
      searchQuery,
      sortBy,
      inStockOnly,
    });
  }, [products, selectedCategory, searchQuery, sortBy, inStockOnly]);

  const handleAddWithFeedback = (product: Product) => {
    onAddToCart(product);
    setAddedNoticeId(product.id);
    setTimeout(() => {
      setAddedNoticeId((current) => (current === product.id ? null : current));
    }, 1800);
  };

  return (
    <section id="shop" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#9B5B71]">
          THE BELLALANA STUDIO
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-[#5D2C3D] font-normal tracking-tight">
          Handbag & Artisan Shop
        </h2>
        <p className="text-sm text-[#7D485B]">
          Every handbag is individually hand-knitted with plush combed cotton, reinforced seams, and timeless charm.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-[#F2D7DF] mb-8 space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {categoriesList.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#7A3E53] text-white shadow-xs'
                    : 'bg-[#FAF0F3] text-[#6D3446] hover:bg-[#F6DEE5]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search, Sort and In-stock bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-3 border-t border-[#F6E1E7]">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A87284]" />
            <input
              type="text"
              placeholder="Search by handbag name, tulip, daisy, material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-full bg-[#FAF4F5] border border-[#F2D7DF] text-xs sm:text-sm text-[#5D2C3D] placeholder-[#AA798A] focus:outline-hidden focus:border-[#7A3E53] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AA798A] hover:text-[#5D2C3D]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort & In-stock toggle */}
          <div className="flex items-center gap-3 justify-end flex-wrap">
            <label className="flex items-center gap-2 text-xs text-[#6D3446] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-[#7A3E53] focus:ring-[#7A3E53] w-4 h-4 accent-[#7A3E53]"
              />
              <span>In-stock only</span>
            </label>

            <div className="flex items-center gap-1.5 text-xs text-[#6D3446]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#9A6275]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF4F5] border border-[#F2D7DF] rounded-full py-1.5 px-3 text-xs text-[#5D2C3D] focus:outline-hidden focus:border-[#7A3E53]"
                aria-label="Sort products by"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Results Count */}
      <div className="flex items-center justify-between mb-6 px-1">
        <p className="text-xs sm:text-sm text-[#7D485B]">
          Showing <span className="font-semibold text-[#5D2C3D]">{filteredProducts.length}</span> handcrafted items
        </p>
        {(searchQuery || selectedCategory !== 'all' || inStockOnly) && (
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('all');
              setInStockOnly(false);
            }}
            className="text-xs text-[#A84867] hover:underline font-medium"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#F2D7DF] max-w-lg mx-auto">
          <p className="font-display text-xl text-[#5D2C3D] mb-2">No matching handcrafted pieces</p>
          <p className="text-xs text-[#7D485B] mb-5">
            We couldn't find any items matching your search criteria. Try a different term or clear filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('all');
              setInStockOnly(false);
            }}
            className="bg-[#7A3E53] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#622E40]"
          >
            Browse All Items
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isBookmarked = wishlistIds.includes(product.id);
            const isJustAdded = addedNoticeId === product.id;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#F2D7DF] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group relative"
              >
                {/* Image container */}
                <div className="relative aspect-[4/5] bg-[#FAF0F4] overflow-hidden">
                  {/* Bookmark Button top right */}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#6D3446] hover:bg-white hover:text-[#D44C73] transition-all shadow-xs active:scale-90"
                    aria-label={isBookmarked ? 'Remove from saved' : 'Save item'}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        isBookmarked ? 'fill-[#D44C73] text-[#D44C73]' : 'text-[#6D3446]'
                      }`}
                    />
                  </button>

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-[#5D2C3D] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      {product.badge}
                    </span>
                  )}

                  {/* Main Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                    onClick={() => onQuickView(product)}
                    loading="lazy"
                  />

                  {/* Quick View Floating Button */}
                  <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => onQuickView(product)}
                      className="flex-1 bg-white/90 hover:bg-white text-[#5D2C3D] py-2 px-3 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Content details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-[11px] text-[#9A6275] mb-1">
                      <span>{product.categoryLabel}</span>
                      <div className="flex items-center gap-1 font-medium text-[#623242]">
                        <Star className="w-3.5 h-3.5 fill-[#F2A900] text-[#F2A900]" />
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-[#A8798A]">({product.reviewCount})</span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3
                      onClick={() => onQuickView(product)}
                      className="font-luxury text-base text-[#5D2C3D] font-medium leading-snug hover:text-[#8E445B] cursor-pointer transition-colors line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-[#7A4B5B] mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Color Swatches if available */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-2.5">
                        <span className="text-[10px] text-[#A8798A]">Colors:</span>
                        {product.colors.map((c, idx) => (
                          <span
                            key={idx}
                            title={c.name}
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs inline-block"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Add to Bag */}
                  <div className="pt-2 border-t border-[#F8E1E7] flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-bold text-[#5D2C3D]">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#AA7E8E] line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddWithFeedback(product)}
                      disabled={!product.inStock}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
                        isJustAdded
                          ? 'bg-[#2E7D32] text-white shadow-xs'
                          : product.inStock
                          ? 'bg-[#E5A1B3] hover:bg-[#D4899E] text-white shadow-xs'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      aria-label={`Add ${product.name} to bag`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{product.inStock ? 'Add' : 'Sold Out'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
