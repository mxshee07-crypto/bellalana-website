import { Product } from '../types/index.ts';

export interface FilterOptions {
  category?: string;
  searchQuery?: string;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  maxPrice?: number;
  inStockOnly?: boolean;
}

export function filterAndSortProducts(
  products: Product[],
  options: FilterOptions
): Product[] {
  let result = [...products];

  // Category filter
  if (options.category && options.category !== 'all') {
    result = result.filter((p) => p.category === options.category);
  }

  // Search filter
  if (options.searchQuery && options.searchQuery.trim() !== '') {
    const q = options.searchQuery.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
    );
  }

  // In-stock filter
  if (options.inStockOnly) {
    result = result.filter((p) => p.inStock);
  }

  // Max price filter
  if (options.maxPrice !== undefined && options.maxPrice > 0) {
    result = result.filter((p) => p.price <= options.maxPrice!);
  }

  // Sort
  if (options.sortBy) {
    switch (options.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Keep original order
        break;
    }
  }

  return result;
}
