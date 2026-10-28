import React, { useState } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { CategoriesSection } from './components/CategoriesSection.tsx';
import { ShopSection } from './components/ShopSection.tsx';
import { TestimonialsSection } from './components/TestimonialsSection.tsx';
import { InstagramFeed } from './components/InstagramFeed.tsx';
import { CraftStorySection } from './components/CraftStorySection.tsx';
import { ProductQuickViewModal } from './components/ProductQuickViewModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { WishlistDrawer } from './components/WishlistDrawer.tsx';
import { Footer } from './components/Footer.tsx';
import { PRODUCTS, CATEGORIES, TESTIMONIALS, INSTAGRAM_POSTS } from './data/storeData.ts';
import { Product, CartItem, Testimonial } from './types/index.ts';

export default function App() {
  // Products and Category State
  const [products] = useState<Product[]>(PRODUCTS);
  const [heroProduct, setHeroProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Cart State (Initialized with the signature tote so user immediately sees active cart)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Tulip Garden Wooden Tote
      quantity: 1,
      selectedColor: 'Blush & Tulip Bloom',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Bookmarks / Saved items state (Matching bookmark button in reference images)
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[0].id, PRODUCTS[1].id]);
  const [bookmarkedCategoryIds, setBookmarkedCategoryIds] = useState<string[]>(['crochet-bags']);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Testimonials State
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);

  // Cart handlers
  const handleAddToCart = (product: Product, color?: string, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: color || (product.colors && product.colors[0]?.name),
        },
      ];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, selectedColor);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor === selectedColor) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (productId: string, selectedColor?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor === selectedColor)
      )
    );
  };

  // Wishlist handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleToggleCategoryBookmark = (catId: string) => {
    setBookmarkedCategoryIds((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  // Navigation smoothly scrolls to designated element
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'categories') {
      const el = document.getElementById('categories');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'shop') {
      const el = document.getElementById('shop');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'testimonials') {
      const el = document.getElementById('testimonials');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'instagram') {
      const el = document.getElementById('instagram');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'story') {
      const el = document.getElementById('story');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromGrid = (catId: string) => {
    setSelectedCategory(catId);
    const shopEl = document.getElementById('shop');
    shopEl?.scrollIntoView({ behavior: 'smooth' });
  };

  // Add review handler
  const handleAddReview = (newReviewData: Omit<Testimonial, 'id' | 'date'>) => {
    const newReview: Testimonial = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };
    setTestimonials([newReview, ...testimonials]);
  };

  // Cart total item count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Bookmarked products list
  const bookmarkedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF4F5] text-[#4A2533] selection:bg-[#F3C5D0] selection:text-[#5D2C3D]">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Brand Navbar */}
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => {
          handleNavigate('shop');
        }}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* 3. Hero Section (Strict reproduction of reference Image 1) */}
        <Hero
          heroProduct={heroProduct}
          allProducts={products}
          isBookmarked={wishlistIds.includes(heroProduct.id)}
          onToggleBookmark={handleToggleWishlist}
          onShopClick={() => handleNavigate('shop')}
          onScrollToCategories={() => handleNavigate('categories')}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onSelectHeroProduct={(prod) => setHeroProduct(prod)}
        />

        {/* 4. "Made just for you" Categories Section (Strict reproduction of reference Image 2) */}
        <CategoriesSection
          categories={CATEGORIES}
          bookmarkedCategoryIds={bookmarkedCategoryIds}
          onToggleCategoryBookmark={handleToggleCategoryBookmark}
          onSelectCategory={handleSelectCategoryFromGrid}
        />

        {/* 5. Full Shop Page with filtering, sorting, search, and instant cart additions */}
        <ShopSection
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={(product, color) => handleAddToCart(product, color, 1)}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />

        {/* 6. Slow Craft Values & Artisan Promise */}
        <CraftStorySection />

        {/* 7. Customer Testimonials Section */}
        <TestimonialsSection
          testimonials={testimonials}
          onAddReview={handleAddReview}
        />

        {/* 8. Instagram Feed Section */}
        <InstagramFeed posts={INSTAGRAM_POSTS} />
      </main>

      {/* 9. Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={handleSelectCategoryFromGrid}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => setIsCheckoutOpen(true)}
        onStartShopping={() => handleNavigate('shop')}
      />

      {/* Checkout Modal Flow */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderComplete={() => {
          setCartItems([]);
        }}
      />

      {/* Wishlist / Bookmarks Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        bookmarkedProducts={bookmarkedProducts}
        onRemoveBookmark={handleToggleWishlist}
        onAddToCart={(prod) => handleAddToCart(prod)}
        onQuickView={(prod) => setQuickViewProduct(prod)}
      />

      {/* Product Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickViewModal
          product={quickViewProduct}
          isBookmarked={wishlistIds.includes(quickViewProduct.id)}
          onToggleBookmark={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}

@import "tailwindcss";

body {
  background-color: #FAF4F5;
  color: #4A2533;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.font-display {
  font-family: 'DM Serif Display', Georgia, serif;
}

.font-luxury {
  font-family: 'Playfair Display', Georgia, serif;
}

.font-soft {
  font-family: 'Quicksand', sans-serif;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #FDF1F4;
}
::-webkit-scrollbar-thumb {
  background: #E4A9BB;
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: #CD8398;
}
