import React, { useState } from 'react';
import { ShoppingBag, Bookmark, Search, Menu, X, Heart } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'shop', label: 'Shop Bags' },
    { id: 'categories', label: 'Made Just For You' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'story', label: 'Our Story' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF4F5]/95 backdrop-blur-md border-b border-[#F2D7DE] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#6D3446] hover:text-[#4A2030] hover:bg-[#FCEEF1] rounded-full transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Navigation Links (Left) */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.slice(0, 3).map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm tracking-wide transition-colors font-medium py-1 ${
                  activeSection === link.id
                    ? 'text-[#7A3E53] border-b-2 border-[#7A3E53]'
                    : 'text-[#6B4B57] hover:text-[#7A3E53]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Center Brand Identity (Matches screenshot branding) */}
          <div className="flex flex-col items-center justify-center cursor-pointer select-none text-center" onClick={() => handleNavClick('hero')}>
            <span className="text-[10px] tracking-[0.25em] text-[#9A6275] uppercase font-semibold flex items-center gap-1">
              Handmade With Love <Heart className="w-2.5 h-2.5 fill-[#E298AC] text-[#E298AC] inline" />
            </span>
            <span className="font-display text-2xl sm:text-3xl text-[#5D2C3D] tracking-tight font-normal leading-tight">
              Bellalana
            </span>
            <span className="text-[11px] text-[#8C5367] tracking-wider italic font-luxury -mt-0.5">
              Little stitches, big love.
            </span>
          </div>

          {/* Desktop Navigation Links (Right) + Action Buttons */}
          <div className="flex items-center space-x-4">
            <nav className="hidden lg:flex items-center space-x-7 mr-3">
              {navLinks.slice(3).map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm tracking-wide transition-colors font-medium py-1 ${
                    activeSection === link.id
                      ? 'text-[#7A3E53] border-b-2 border-[#7A3E53]'
                      : 'text-[#6B4B57] hover:text-[#7A3E53]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-[#6D3446] hover:text-[#4A2030] hover:bg-[#F8E1E7] rounded-full transition-colors relative"
              aria-label="Search Collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist / Bookmarks (Matching the bookmark badge in the ChatGPT design) */}
            <button
              onClick={onOpenWishlist}
              className="p-2.5 text-[#6D3446] hover:text-[#4A2030] hover:bg-[#F8E1E7] rounded-full transition-colors relative"
              aria-label="View Saved Items"
            >
              <Bookmark className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D98299] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-[#7A3E53] hover:bg-[#622E40] text-white px-4 py-2.5 rounded-full shadow-sm hover:shadow transition-all group"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#F6C6D3] text-[#5D2C3D] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold tracking-wider hidden sm:inline">
                BAG {cartCount > 0 ? `(${cartCount})` : ''}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#F2D7DE] bg-[#FAF4F5] px-6 py-5 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#F9E3E9] text-[#7A3E53] font-semibold'
                    : 'text-[#6B4B57] hover:bg-[#FDEEF1]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#F2D7DE] flex items-center justify-around">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWishlist();
              }}
              className="flex items-center gap-2 text-sm text-[#6D3446] font-medium"
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved Items ({wishlistCount})</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center gap-2 text-sm text-[#6D3446] font-medium"
            >
              <Search className="w-4 h-4" />
              <span>Search Bags</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
