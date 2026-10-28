import React from 'react';
import { X, Bookmark, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types/index.ts';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedProducts: Product[];
  onRemoveBookmark: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedProducts,
  onRemoveBookmark,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#F2D7DF] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#F8E1E7] flex items-center justify-between bg-[#FAF4F5]">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 fill-[#D4829A] text-[#D4829A]" />
              <h2 className="font-display text-lg text-[#5D2C3D]">Saved Treasures</h2>
              <span className="text-xs bg-[#F5C7D3] text-[#5D2C3D] font-bold px-2 py-0.5 rounded-full">
                {bookmarkedProducts.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#9A6275] hover:text-[#5D2C3D] hover:bg-[#FCEEF2]"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F8E1E7]">
            {bookmarkedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF0F3] text-[#9A6275] flex items-center justify-center mx-auto">
                  <Bookmark className="w-8 h-8 text-[#D793A6]" />
                </div>
                <h3 className="font-display text-xl text-[#5D2C3D]">No saved items yet</h3>
                <p className="text-xs text-[#7A4B5B] max-w-xs mx-auto">
                  Click the bookmark ribbon on any handbag or bouquet card to save it for later.
                </p>
              </div>
            ) : (
              bookmarkedProducts.map((prod) => (
                <div key={prod.id} className="py-4 flex gap-4">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    onClick={() => {
                      onClose();
                      onQuickView(prod);
                    }}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#F2D7DF] bg-[#FAF0F4] cursor-pointer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4
                          onClick={() => {
                            onClose();
                            onQuickView(prod);
                          }}
                          className="font-luxury text-sm font-semibold text-[#5D2C3D] leading-tight cursor-pointer hover:text-[#8E445B]"
                        >
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => onRemoveBookmark(prod)}
                          className="text-[#B37E90] hover:text-[#D44C73] p-0.5"
                          aria-label={`Remove ${prod.name} from saved`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#9A6275]">{prod.categoryLabel}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-bold text-[#5D2C3D]">
                        ${prod.price.toFixed(2)}
                      </span>

                      <button
                        onClick={() => {
                          onAddToCart(prod);
                          onRemoveBookmark(prod);
                        }}
                        className="px-3 py-1 bg-[#D793A6] hover:bg-[#C97C92] text-white rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {bookmarkedProducts.length > 0 && (
            <div className="p-4 border-t border-[#F8E1E7] bg-[#FAF4F5]">
              <button
                onClick={() => {
                  bookmarkedProducts.forEach((p) => onAddToCart(p));
                  onClose();
                }}
                className="w-full bg-[#7A3E53] hover:bg-[#622E40] text-white py-3 rounded-full text-xs font-semibold tracking-wider flex items-center justify-center gap-2"
              >
                <span>ADD ALL TO BAG</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
