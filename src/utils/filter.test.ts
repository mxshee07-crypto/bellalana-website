import test from 'node:test';
import assert from 'node:assert/strict';
import { filterAndSortProducts } from './filter.ts';
import { Product } from '../types/index.ts';

const testProducts: Product[] = [
  {
    id: '1',
    name: 'Strawberry Handbag',
    category: 'crochet-bags',
    categoryLabel: 'Crochet Bags',
    price: 60,
    rating: 4.9,
    reviewCount: 12,
    image: '',
    gallery: [],
    description: 'Sweet strawberry knit bag',
    details: [],
    dimensions: '',
    materials: '',
    inStock: true,
  },
  {
    id: '2',
    name: 'Rose Bouquet',
    category: 'flower-bouquets',
    categoryLabel: 'Flower Bouquets',
    price: 45,
    rating: 5.0,
    reviewCount: 30,
    image: '',
    gallery: [],
    description: 'Lovely bouquet of crochet roses',
    details: [],
    dimensions: '',
    materials: '',
    inStock: true,
  },
  {
    id: '3',
    name: 'Daisy Keychain',
    category: 'little-gifts',
    categoryLabel: 'Little Gifts',
    price: 15,
    rating: 4.5,
    reviewCount: 8,
    image: '',
    gallery: [],
    description: 'Mini floral charm',
    details: [],
    dimensions: '',
    materials: '',
    inStock: false,
  },
];

test('filterAndSortProducts filters by category', () => {
  const result = filterAndSortProducts(testProducts, { category: 'crochet-bags' });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, '1');
});

test('filterAndSortProducts filters by search query', () => {
  const result = filterAndSortProducts(testProducts, { searchQuery: 'rose' });
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'Rose Bouquet');
});

test('filterAndSortProducts filters by inStockOnly', () => {
  const result = filterAndSortProducts(testProducts, { inStockOnly: true });
  assert.equal(result.length, 2);
  assert.ok(!result.some((p) => p.id === '3'));
});

test('filterAndSortProducts sorts by price-asc and price-desc', () => {
  const asc = filterAndSortProducts(testProducts, { sortBy: 'price-asc' });
  assert.equal(asc[0].price, 15);
  assert.equal(asc[2].price, 60);

  const desc = filterAndSortProducts(testProducts, { sortBy: 'price-desc' });
  assert.equal(desc[0].price, 60);
  assert.equal(desc[2].price, 15);
});
