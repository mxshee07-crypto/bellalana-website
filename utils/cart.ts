import { CartItem } from '../types/index.ts';

export const FREE_SHIPPING_THRESHOLD = 65;
export const STANDARD_SHIPPING_RATE = 5.99;

export function calculateSubtotal(items: CartItem[]): number {
  const sum = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
  return Math.round(sum * 100) / 100;
}

export function calculateShipping(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_RATE;
}

export interface DiscountResult {
  amount: number;
  valid: boolean;
  message: string;
  code: string;
}

export function calculateDiscount(subtotal: number, rawCode: string): DiscountResult {
  const code = rawCode.trim().toUpperCase();
  if (!code) {
    return { amount: 0, valid: false, message: '', code: '' };
  }

  if (code === 'LOVE10' || code === 'STITCH10') {
    const discount = Math.round(subtotal * 0.1 * 100) / 100;
    return {
      amount: discount,
      valid: true,
      message: '10% discount applied!',
      code,
    };
  }

  if (code === 'FREESHIP') {
    return {
      amount: subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD ? STANDARD_SHIPPING_RATE : 0,
      valid: true,
      message: 'Free shipping promo applied!',
      code,
    };
  }

  if (code === 'BELLAVIP20') {
    const discount = Math.round(subtotal * 0.2 * 100) / 100;
    return {
      amount: discount,
      valid: true,
      message: 'VIP 20% discount applied!',
      code,
    };
  }

  return {
    amount: 0,
    valid: false,
    message: 'Invalid promo code. Try LOVE10',
    code,
  };
}

export function calculateTotal(
  subtotal: number,
  shipping: number,
  discount: number
): number {
  const total = Math.max(0, subtotal + shipping - discount);
  return Math.round(total * 100) / 100;
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
