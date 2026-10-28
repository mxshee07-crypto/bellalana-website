export interface Product {
  id: string;
  name: string;
  category: 'crochet-bags' | 'flower-bouquets' | 'cute-plushies' | 'little-gifts';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  details: string[];
  dimensions: string;
  materials: string;
  inStock: boolean;
  badge?: 'Bestseller' | 'New' | 'Handmade' | 'Limited Edition';
  colors?: { name: string; hex: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  productName: string;
  verified: boolean;
  avatar: string;
  customerPhoto?: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  commentsCount: number;
  timestamp: string;
  tags: string[];
}
