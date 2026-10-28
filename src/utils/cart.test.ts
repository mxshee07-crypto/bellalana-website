import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSubtotal,
  calculateShipping,
  calculateDiscount,
  calculateTotal,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_RATE,
} from './cart.ts';
import { Product, CartItem } from '../types/index.ts';

const mockProductA: Product = {
  id: 'prod-1',
  name: 'Tulip Tote',
  category: 'crochet-bags',
  categoryLabel: 'Crochet Bags',
  price: 50.0,
  rating: 5,
  reviewCount: 10,
  image: '/img1.jpg',
  gallery: ['/img1.jpg'],
  description: 'Nice bag',
  details: ['Handmade'],
  dimensions: '10x10',
  materials: 'Cotton',
  inStock: true,
};

const mockProductB: Product = {
  id: 'prod-2',
  name: 'Daisy Purse',
  category: 'crochet-bags',
  categoryLabel: 'Crochet Bags',
  price: 25.0,
  rating: 4.8,
  reviewCount: 5,
  image: '/img2.jpg',
  gallery: ['/img2.jpg'],
  description: 'Daisy purse',
  details: ['Handmade'],
  dimensions: '8x8',
  materials: 'Cotton',
  inStock: true,
};

test('calculateSubtotal sums up correctly', () => {
  const items: CartItem[] = [
    { product: mockProductA, quantity: 2 }, // 100
    { product: mockProductB, quantity: 1 }, // 25
  ];
  assert.equal(calculateSubtotal(items), 125.0);
});

test('calculateSubtotal returns 0 for empty cart', () => {
  assert.equal(calculateSubtotal([]), 0);
});

test('calculateShipping applies standard shipping under threshold', () => {
  assert.equal(calculateShipping(50), STANDARD_SHIPPING_RATE);
});

test('calculateShipping gives free shipping at or above threshold', () => {
  assert.equal(calculateShipping(FREE_SHIPPING_THRESHOLD), 0);
  assert.equal(calculateShipping(100), 0);
  assert.equal(calculateShipping(0), 0);
});

test('calculateDiscount applies 10% coupon correctly', () => {
  const res = calculateDiscount(100, 'LOVE10');
  assert.equal(res.valid, true);
  assert.equal(res.amount, 10.0);

  const resLower = calculateDiscount(100, 'love10');
  assert.equal(resLower.valid, true);
  assert.equal(resLower.amount, 10.0);
});

test('calculateDiscount rejects invalid coupon', () => {
  const res = calculateDiscount(100, 'INVALIDCODE');
  assert.equal(res.valid, false);
  assert.equal(res.amount, 0);
});

test('calculateTotal computes subtotal + shipping - discount accurately', () => {
  // $100 subtotal, $0 shipping, $10 discount => $90
  assert.equal(calculateTotal(100, 0, 10), 90);
  // $50 subtotal, $5.99 shipping, $5 discount => $50.99
  assert.equal(calculateTotal(50, 5.99, 5), 50.99);
});
