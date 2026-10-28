import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, Check, Truck } from 'lucide-react';
import { CartItem } from '../types/index.ts';
import {
  calculateSubtotal,
  calculateShipping,
  calculateDiscount,
  calculateTotal,
  FREE_SHIPPING_THRESHOLD,
  formatCurrency,
} from '../utils/cart.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  onRemoveItem: (productId: string, selectedColor?: string) => void;
  onCheckout: () => void;
  onStartShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onStartShopping,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    amount: number;
    message: string;
  } | null>(null);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = calculateSubtotal(items);
  const baseShipping = calculateShipping(subtotal);
  
  const discountInfo = appliedCoupon ? calculateDiscount(subtotal, appliedCoupon.code) : { amount: 0, valid: false, message: '', code: '' };
  const effectiveShipping = appliedCoupon?.code === 'FREESHIP' ? 0 : baseShipping;
  const total = calculateTotal(subtotal, effectiveShipping, discountInfo.amount);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const res = calculateDiscount(subtotal, couponCode);
    if (res.valid) {
      setAppliedCoupon({
        code: res.code,
        amount: res.amount,
        message: res.message,
      });
      setCouponCode('');
    } else {
      setCouponError(res.message || 'Invalid code');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#F2D7DF] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#F8E1E7] flex items-center justify-between bg-[#FAF4F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#7A3E53]" />
              <h2 className="font-display text-lg text-[#5D2C3D]">Your Shopping Bag</h2>
              <span className="text-xs bg-[#F5C7D3] text-[#5D2C3D] font-bold px-2 py-0.5 rounded-full">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#9A6275] hover:text-[#5D2C3D] hover:bg-[#FCEEF2]"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-[#FFF7F9] border-b border-[#F8E1E7]">
            <div className="flex items-center justify-between text-xs font-semibold mb-1 text-[#5D2C3D]">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#D4829A]" />
                {amountNeededForFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-[#A84964]">{formatCurrency(amountNeededForFreeShipping)}</strong> more for <strong>Free Shipping!</strong>
                  </span>
                ) : (
                  <span className="text-[#2E7D32] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> You unlocked Free Shipping!
                  </span>
                )}
              </div>
              <span className="text-[10px] text-[#9A6577]">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-[#F3D7DF] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#D793A6] to-[#8C495E] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F8E1E7]">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF0F3] text-[#9A6275] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 text-[#D793A6]" />
                </div>
                <h3 className="font-display text-xl text-[#5D2C3D]">Your bag is currently empty</h3>
                <p className="text-xs text-[#7A4B5B] max-w-xs mx-auto">
                  Explore our handcrafted totes, floral bouquets, and amigurumi plushies made with love.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onStartShopping();
                  }}
                  className="bg-[#7A3E53] hover:bg-[#622E40] text-white text-xs font-semibold px-6 py-2.5 rounded-full shadow-xs"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedColor || 'default'}-${idx}`} className="py-4 flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#F2D7DF] bg-[#FAF0F4]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-luxury text-sm font-semibold text-[#5D2C3D] leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                          className="text-[#B37E90] hover:text-[#D44C73] p-0.5"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {item.selectedColor && (
                        <p className="text-[11px] text-[#9A6275] mt-0.5">
                          Color: <span className="font-medium">{item.selectedColor}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#F2D7DF] rounded-full bg-[#FAF4F5] px-2 py-0.5">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedColor)
                          }
                          className="w-5 h-5 flex items-center justify-center text-xs text-[#5D2C3D] font-bold"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-[#5D2C3D]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedColor)
                          }
                          className="w-5 h-5 flex items-center justify-center text-xs text-[#5D2C3D] font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#5D2C3D]">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with promo code and Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#F8E1E7] bg-[#FAF4F5] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A87284]" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. LOVE10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-full border border-[#F2D7DF] bg-white text-xs text-[#5D2C3D] focus:outline-hidden focus:border-[#7A3E53]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-full bg-white border border-[#D793A6] text-xs font-semibold text-[#7A3E53] hover:bg-[#FDF4F6]"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-red-600 pl-2">{couponError}</p>}
                {appliedCoupon && (
                  <p className="text-[11px] text-green-700 font-medium pl-2 flex items-center gap-1">
                    <Check className="w-3 h-3" /> {appliedCoupon.message} ({appliedCoupon.code})
                  </p>
                )}
              </form>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6F3F50]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#5D2C3D]">{formatCurrency(subtotal)}</span>
                </div>
                {discountInfo.amount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{formatCurrency(discountInfo.amount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{effectiveShipping === 0 ? 'FREE' : formatCurrency(effectiveShipping)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#5D2C3D] pt-2 border-t border-[#EED0D8]">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full bg-[#7A3E53] hover:bg-[#622E40] text-white py-3 px-6 rounded-full text-xs font-semibold tracking-wider flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all"
              >
                <span>CHECKOUT • {formatCurrency(total)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#9B6A7A]">
                Secure checkout • Complies with handmade artisan standard
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
