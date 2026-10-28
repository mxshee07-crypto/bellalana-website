import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, ShieldCheck, Heart, Sparkles, Gift } from 'lucide-react';
import { CartItem } from '../types/index.ts';
import { calculateSubtotal, calculateShipping, formatCurrency } from '../utils/cart.ts';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    giftNote: '',
    paymentMethod: 'card',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrder = `BL-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setIsSubmitting(false);
      setStep('success');
      onOrderComplete();
    }, 1200);
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#F2D7DF] relative my-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#9A6275] hover:text-[#5D2C3D] p-1.5"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-bold tracking-widest text-[#9C4D66] uppercase">
                BELLALANA CHECKOUT
              </span>
              <h2 className="font-display text-2xl text-[#5D2C3D]">Complete Your Order</h2>
              <p className="text-xs text-[#7A4B5B] mt-1">
                Your order will be packed by hand in our studio with dried botanical sprigs.
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              {/* Contact */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#5D2C3D]">Contact Information</label>
                <input
                  type="email"
                  required
                  placeholder="Email address for tracking updates"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#F2D7DF] bg-[#FAF4F5] text-xs text-[#5D2C3D] focus:outline-hidden focus:border-[#7A3E53]"
                />
              </div>

              {/* Shipping Address */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#5D2C3D]">Shipping Address</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F2D7DF] bg-[#FAF4F5] text-xs text-[#5D2C3D] focus:outline-hidden focus:border-[#7A3E53]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F2D7DF] bg-[#FAF4F5] text-xs text-[#5D2C3D] focus:outline-hidden focus:border-[#7A3E53]"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Street address (e.g. 124 Magnolia St)"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#F2D7DF] bg-[#FAF4F5] text-xs text-[#5D2C3D] focus:outline-hidden focus:border-[#7A3E53]"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F2D7DF] bg-[#FAF4F5] text-xs text-[#5D2C3D] focus:outline-hidden focus:border-[#7A3E53]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F2D7DF] bg-[#FAF4F5] text-xs text-[#5D2C3D] focus:outline-hidden focus:border-[#7A3E53]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Zip code"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F2D7DF] bg-[#FAF4F5] text-xs text-[#5D2C3D] focus:outline-hidden focus:border-[#7A3E53]"
                  />
                </div>
              </div>

              {/* Gift Note */}
              <div>
                <label className="text-xs font-semibold text-[#5D2C3D] flex items-center gap-1.5 mb-1">
                  <Gift className="w-3.5 h-3.5 text-[#D4829A]" />
                  <span>Complimentary Calligraphed Gift Note (Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Happy Birthday to my favorite sister!"
                  value={formData.giftNote}
                  onChange={(e) => setFormData({ ...formData, giftNote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#F2D7DF] bg-[#FAF4F5] text-xs text-[#5D2C3D] focus:outline-hidden focus:border-[#7A3E53]"
                />
              </div>

              {/* Payment Method Demo */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#5D2C3D]">Payment Method</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#7A3E53] bg-[#FAF0F3] cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="accent-[#7A3E53]"
                    />
                    <CreditCard className="w-4 h-4 text-[#7A3E53]" />
                    <span className="font-medium text-[#5D2C3D]">Credit / Debit Card</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-200 bg-white cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'apple'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'apple' })}
                      className="accent-[#7A3E53]"
                    />
                    <span className="font-medium text-[#5D2C3D]">Apple Pay / Google Pay</span>
                  </label>
                </div>
              </div>

              {/* Order total preview */}
              <div className="bg-[#FAF4F5] p-3 rounded-xl flex items-center justify-between text-xs text-[#5D2C3D]">
                <div>
                  <span className="font-semibold">Items: {items.length}</span>
                  <span className="text-[#9A6275] ml-2">
                    (Shipping: {shipping === 0 ? 'FREE' : formatCurrency(shipping)})
                  </span>
                </div>
                <div className="text-sm font-bold text-[#7A3E53]">
                  Total: {formatCurrency(total)}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7A3E53] hover:bg-[#622E40] text-white py-3 rounded-full text-xs font-semibold tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>PLACE ORDER • {formatCurrency(total)}</span>
                    <Heart className="w-3.5 h-3.5 fill-white" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8C5367]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>256-Bit SSL Encrypted Artisan Checkout</span>
              </div>
            </form>
          </div>
        ) : (
          /* Order Confirmation Celebration Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-[#EAF7EC] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-9 h-9" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#9C4D66]">
              ORDER CONFIRMED
            </span>

            <h2 className="font-display text-3xl text-[#5D2C3D]">
              Thank you, {formData.firstName || 'Friend'}! ♡
            </h2>

            <p className="text-xs text-[#7A4B5B] max-w-sm mx-auto leading-relaxed">
              Your order <strong className="text-[#5D2C3D]">{orderNumber}</strong> has been received by the Bellalana studio! We are beginning to select your yarns and will send email tracking shortly.
            </p>

            <div className="bg-[#FAF0F3] p-4 rounded-2xl max-w-sm mx-auto text-left text-xs text-[#5D2C3D] space-y-1">
              <p><strong>Order Ref:</strong> {orderNumber}</p>
              <p><strong>Recipient:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Delivery:</strong> {formData.address}, {formData.city} {formData.state}</p>
              <p><strong>Packaging:</strong> Stamped Bellalana linen dust bag + dried lavender</p>
            </div>

            <button
              onClick={handleClose}
              className="bg-[#7A3E53] hover:bg-[#622E40] text-white text-xs font-semibold px-8 py-3 rounded-full shadow-xs"
            >
              Continue Browsing Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
