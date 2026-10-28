import React, { useState } from 'react';
import { X, Star, Bookmark, ShoppingBag, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react';
import { Product } from '../types/index.ts';

interface ProductQuickViewModalProps {
  product: Product;
  isBookmarked: boolean;
  onToggleBookmark: (product: Product) => void;
  onAddToCart: (product: Product, color?: string, quantity?: number) => void;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isBookmarked,
  onToggleBookmark,
  onAddToCart,
  onClose,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAdd = () => {
    onAddToCart(product, selectedColor, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#F2D7DF] relative flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#5D2C3D] hover:bg-white shadow-xs"
          aria-label="Close product view"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Gallery & Image */}
        <div className="md:w-1/2 p-6 bg-[#FAF0F4] flex flex-col justify-between">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-inner mb-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#5D2C3D] text-[10px] font-bold px-3 py-1 rounded-full shadow-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 justify-center">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-[#7A3E53] shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Controls */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-[#9A6275]">
              <span>{product.categoryLabel}</span>
              <div className="flex items-center gap-1 text-[#F5A623]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-semibold text-[#5D2C3D]">{product.rating.toFixed(1)}</span>
                <span className="text-[#A8798A]">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h2 className="font-luxury text-2xl text-[#5D2C3D] font-medium leading-tight">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#5D2C3D]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#AA7E8E] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-[#6F3F50] leading-relaxed">
              {product.description}
            </p>

            {/* Color selection if available */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-[#5D2C3D] mb-2">
                  Select Colorway: <span className="text-[#A84964]">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all ${
                        selectedColor === color.name
                          ? 'border-[#7A3E53] bg-[#FCEEF2] font-semibold text-[#5D2C3D]'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/10 inline-block"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specs & Dimensions */}
            <div className="bg-[#FAF4F5] rounded-xl p-3 text-xs space-y-1.5 text-[#6D3446]">
              <p><strong>Dimensions:</strong> {product.dimensions}</p>
              <p><strong>Materials:</strong> {product.materials}</p>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#F8E1E7] space-y-3 mt-4">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#F2D7DF] rounded-full bg-[#FAF4F5] px-2 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[#5D2C3D] hover:bg-white text-sm"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-[#5D2C3D]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[#5D2C3D] hover:bg-white text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAdd}
                className={`flex-1 py-3 px-6 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all ${
                  justAdded
                    ? 'bg-[#2E7D32] text-white'
                    : 'bg-[#D793A6] hover:bg-[#C97C92] text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* Bookmark button */}
              <button
                onClick={() => onToggleBookmark(product)}
                className="w-11 h-11 rounded-full border border-[#F2D7DF] flex items-center justify-center text-[#6D3446] hover:bg-[#FAF4F5]"
                aria-label="Save to bookmarks"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#D4829A] text-[#D4829A]' : ''}`} />
              </button>
            </div>

            {/* Micro assurances */}
            <div className="flex items-center justify-around text-[11px] text-[#8C5367] pt-1">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-[#B3687E]" /> Free US shipping over $65
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#B3687E]" /> 100% Artisan Guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
