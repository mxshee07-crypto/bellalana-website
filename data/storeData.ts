import { Product, Testimonial, InstagramPost } from '../types/index.ts';

// Actual real photos provided by the user
export const REAL_BAG_IMAGES = {
  mauveFull: '/assets/aistudio/864767899_1130071436229638_41725009372907497_n_d6ed2f44.jpg',
  mauveStrap: '/assets/aistudio/863533800_1201482618981712_1598631907625744370_n_fc460c2a.jpg',
  mauveClasp: '/assets/aistudio/870004339_1610161720587792_3489209959693852503_n_eb33ee1e.jpg',
  mauveZipper: '/assets/aistudio/871074789_1808577733658633_7089901184279857492_n_24d76059.jpg',

  vanillaFull: '/assets/aistudio/865379625_1108014792097878_4774450783327942487_n_8d68a453.jpg',
  vanillaAngle: '/assets/aistudio/866203929_1614041026319645_426413058975872131_n_6885ea5a.jpg',
  vanillaBow: '/assets/aistudio/869557336_1900469400933815_5226131376342096543_n_c4c30527.jpg',
  vanillaSide: '/assets/aistudio/871800640_1165177362687061_3105374066091983968_n_f873bdca.jpg',

  terracottaFull: '/assets/aistudio/866330103_3026442331050663_7858211299296189545_n_1f031739.jpg',
  terracottaStrap: '/assets/aistudio/868149813_1626823062791582_1189774297766230452_n_da7b927e.jpg',
  terracottaPlant: '/assets/aistudio/871794042_1454283126662200_1457688615111992685_n_e0eb7108.jpg',
};

export interface CategoryInfo {
  id: 'crochet-bags' | 'flower-bouquets' | 'cute-plushies' | 'little-gifts';
  name: string;
  tagline: string;
  count: string;
  image: string;
  colorBg: string;
  badge?: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'flower-bouquets',
    name: 'Flower Bouquets',
    tagline: 'Everlasting blooms crocheted with soft milk cotton',
    count: '12 designs',
    image: '/assets/cropped/flower-bouquet.jpg',
    colorBg: '#FCEEF1',
    badge: 'Popular Gift',
  },
  {
    id: 'crochet-bags',
    name: 'Crochet Bags',
    tagline: 'Artisan everyday totes, shoulder bags & braided handles',
    count: '18 styles',
    image: REAL_BAG_IMAGES.mauveFull,
    colorBg: '#FAF0F4',
    badge: 'Bestseller',
  },
  {
    id: 'cute-plushies',
    name: 'Cute Plushies',
    tagline: 'Soft heirloom amigurumi bunnies & forest friends',
    count: '9 friends',
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80',
    colorBg: '#FFF2F5',
    badge: 'Limited Edition',
  },
  {
    id: 'little-gifts',
    name: 'Little Gifts',
    tagline: 'Custom strap charms, bow details & mini keychains',
    count: '15 charms',
    image: REAL_BAG_IMAGES.vanillaAngle,
    colorBg: '#FDF4F6',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'dusky-mauve-fringe-tote',
    name: 'Dusky Mauve Fringe Handcrafted Bag',
    category: 'crochet-bags',
    categoryLabel: 'Crochet Bags',
    price: 88.0,
    originalPrice: 105.0,
    rating: 5.0,
    reviewCount: 74,
    image: REAL_BAG_IMAGES.mauveFull,
    gallery: [
      REAL_BAG_IMAGES.mauveFull,
      REAL_BAG_IMAGES.mauveStrap,
      REAL_BAG_IMAGES.mauveClasp,
      REAL_BAG_IMAGES.mauveZipper,
    ],
    description:
      'Our signature handcrafted chunky knit shoulder bag in an elegant dusky mauve tone. Features hand-knotted fringe tassels, delicate bow tie accents, a secure metal zipper top, and sturdy double braided shoulder handles with gold-tone hardware clasps.',
    details: [
      '100% Chunky milk cotton yarn for soft yet resilient structure',
      'Dual braided handles and removable long crossbody strap',
      'Smooth metal zipper closure to keep all your belongings secure',
      'Polished gold-tone swivel lobster clasps',
      'Signature hand-tied bows and cascading tassel fringe details',
    ],
    dimensions: '11" W x 8.5" H x 4" D (Handle drop: 7.5", Crossbody strap: 42")',
    materials: 'Chunky Combed Cotton Yarn, Gold-Tone Alloy Hardware, Metal Zipper',
    inStock: true,
    badge: 'Bestseller',
    colors: [
      { name: 'Dusky Mauve', hex: '#D2A3B0' },
      { name: 'Vanilla Butter Cream', hex: '#FAF3DD' },
      { name: 'Terracotta Rose', hex: '#C66D77' },
    ],
  },
  {
    id: 'butter-vanilla-ribbon-bag',
    name: 'Butter Vanilla Ribbon Shoulder Bag',
    category: 'crochet-bags',
    categoryLabel: 'Crochet Bags',
    price: 82.0,
    originalPrice: 95.0,
    rating: 4.9,
    reviewCount: 56,
    image: REAL_BAG_IMAGES.vanillaFull,
    gallery: [
      REAL_BAG_IMAGES.vanillaFull,
      REAL_BAG_IMAGES.vanillaAngle,
      REAL_BAG_IMAGES.vanillaBow,
      REAL_BAG_IMAGES.vanillaSide,
    ],
    description:
      'A warm, dreamy butter-cream knit bag that brings warmth to every outfit. Handcrafted with ultra-chunky knit stitches, charming front ribbon bow ties, and a thick braided shoulder strap with custom gold clip rings.',
    details: [
      'Hypoallergenic premium cotton yarn with cloud-soft handfeel',
      'Hand-braided thick shoulder strap that sits comfortably without digging in',
      'Delicate front and side ribbon bow knots',
      'Reinforced bottom structure to prevent sagging',
      'Easily holds iPhone Pro Max, makeup pouch, sunglasses, and keys',
    ],
    dimensions: '10.5" W x 8" H x 3.8" D (Strap drop: 11")',
    materials: 'Premium Soft Cotton Blend, Brass Hardware',
    inStock: true,
    badge: 'Bestseller',
    colors: [
      { name: 'Vanilla Butter Cream', hex: '#FAF3DD' },
      { name: 'Dusky Mauve', hex: '#D2A3B0' },
    ],
  },
  {
    id: 'terracotta-rose-garden-crossbody',
    name: 'Terracotta Rose Garden Crossbody',
    category: 'crochet-bags',
    categoryLabel: 'Crochet Bags',
    price: 85.0,
    originalPrice: 98.0,
    rating: 5.0,
    reviewCount: 62,
    image: REAL_BAG_IMAGES.terracottaFull,
    gallery: [
      REAL_BAG_IMAGES.terracottaFull,
      REAL_BAG_IMAGES.terracottaStrap,
      REAL_BAG_IMAGES.terracottaPlant,
    ],
    description:
      'A rich, romantic terracotta rose handcrafted bag. Knitted in a tight textured weave that holds its pristine silhouette, complete with an elegant corner bow and a long hand-plaited braided crossbody strap.',
    details: [
      'Deep, earthy terracotta rose colorway that pairs with neutrals and florals',
      'Generous 46" hand-braided crossbody strap for hands-free wear',
      'Corner ribbon bow detail hand-stitched into the upper trim',
      'Heavyweight cotton construction holds its rectangular shape',
    ],
    dimensions: '10.8" W x 7.8" H x 3.5" D (Crossbody drop: 22")',
    materials: 'High-Density Combed Cotton Yarn, Gold Carabiner Clips',
    inStock: true,
    badge: 'New',
    colors: [
      { name: 'Terracotta Rose', hex: '#C66D77' },
      { name: 'Dusky Mauve', hex: '#D2A3B0' },
    ],
  },
  {
    id: 'petal-mauve-zip-clutch',
    name: 'Petal Mauve Top-Zip Artisan Clutch',
    category: 'crochet-bags',
    categoryLabel: 'Crochet Bags',
    price: 68.0,
    originalPrice: 80.0,
    rating: 4.9,
    reviewCount: 39,
    image: REAL_BAG_IMAGES.mauveStrap,
    gallery: [
      REAL_BAG_IMAGES.mauveStrap,
      REAL_BAG_IMAGES.mauveClasp,
      REAL_BAG_IMAGES.mauveFull,
    ],
    description:
      'A compact and versatile clutch with dual hand-braided handles and an optional shoulder strap. Features an easy-glide top zipper, side ribbon bows, and our signature artisan stitch texture.',
    details: [
      'Top metal zipper with matching yarn pull tab',
      'Dual braided handles for handheld or forearm carry',
      'Side gold O-rings for attaching crossbody strap or charms',
      '100% handcrafted in small studio batches',
    ],
    dimensions: '9.5" W x 7" H x 3.2" D',
    materials: 'Combed Cotton, Metal Zipper, Gold Hardware',
    inStock: true,
    badge: 'Handmade',
    colors: [
      { name: 'Dusky Mauve', hex: '#D2A3B0' },
    ],
  },
  {
    id: 'butter-cream-braided-satchel',
    name: 'Butter Cream Braided Satchel',
    category: 'crochet-bags',
    categoryLabel: 'Crochet Bags',
    price: 78.0,
    originalPrice: 90.0,
    rating: 5.0,
    reviewCount: 48,
    image: REAL_BAG_IMAGES.vanillaBow,
    gallery: [
      REAL_BAG_IMAGES.vanillaBow,
      REAL_BAG_IMAGES.vanillaSide,
      REAL_BAG_IMAGES.vanillaAngle,
    ],
    description:
      'Classic artisan satchel silhouette in rich butter cream. Detailed with twin bow ties and a wide braided strap designed to distribute weight evenly for comfortable all-day wear.',
    details: [
      'Wide braided shoulder strap prevents slipping',
      'Twin side tassel bows with gentle hanging ties',
      'Sturdy structured base',
    ],
    dimensions: '11" W x 8" H x 3.5" D',
    materials: 'Chunky Cotton Yarn',
    inStock: true,
    badge: 'Limited Edition',
  },
  {
    id: 'blossom-romance-bouquet',
    name: 'Blossom Romance Crochet Bouquet',
    category: 'flower-bouquets',
    categoryLabel: 'Flower Bouquets',
    price: 48.0,
    originalPrice: 56.0,
    rating: 5.0,
    reviewCount: 94,
    image: '/assets/cropped/flower-bouquet.jpg',
    gallery: [
      '/assets/cropped/flower-bouquet.jpg',
    ],
    description:
      'Everlasting flowers that never wilt. Features 7 hand-crocheted stems including garden roses, morning daisies, bell orchids, and tender green eucalyptus sprigs, lovingly wrapped in Korean matte blush waterproof paper with a satin bow.',
    details: [
      '7 individually hand-knitted floral stems on bendable florist wire',
      'Includes custom calligraphed gift card with your personal note',
      'Wrapped in signature blush pink paper with organza ribbon',
      'Guaranteed to preserve beauty forever without water or sunlight',
    ],
    dimensions: '14" Tall x 9" Wide bundle',
    materials: 'Milk Cotton Yarn, Floral Craft Wire, Satin Ribbon',
    inStock: true,
    badge: 'Handmade',
    colors: [
      { name: 'Blush & Sunlight', hex: '#FCE3E9' },
      { name: 'Pastel Lilac Dream', hex: '#EBE2F5' },
    ],
  },
  {
    id: 'sweet-pea-bunny-plushie',
    name: 'Sweet Pea Heirloom Bunny Plushie',
    category: 'cute-plushies',
    categoryLabel: 'Cute Plushies',
    price: 42.0,
    originalPrice: 50.0,
    rating: 4.9,
    reviewCount: 53,
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80',
    ],
    description:
      'An amigurumi treasure destined to become a beloved heirloom. Hand-crocheted in the softest baby-friendly milk cotton, with gentle floppy ears, hand-embroidered sweet features, and a hand-tied cream satin bow.',
    details: [
      'Child-safe embroidered safety eyes & rosy blushed cheeks',
      'Filled with hypoallergenic cloud-soft microfiber polyfill',
      'Floppy poseable ears lined with subtle soft texture',
      'Arrives in a stamped Bellalana linen keepsake drawstring bag',
    ],
    dimensions: '10.5" Standing (7.5" Sitting)',
    materials: 'Ultra-soft Milk Cotton, Hypoallergenic Fiberfill, Silk Ribbon',
    inStock: true,
    badge: 'Limited Edition',
    colors: [
      { name: 'Powder Pink', hex: '#F6D2DC' },
      { name: 'Cream Buttercup', hex: '#FFF5DC' },
    ],
  },
  {
    id: 'pastel-flower-keychains',
    name: 'Artisan Bag Charms & Swivel Clips',
    category: 'little-gifts',
    categoryLabel: 'Little Gifts',
    price: 24.0,
    originalPrice: 30.0,
    rating: 4.8,
    reviewCount: 77,
    image: REAL_BAG_IMAGES.mauveClasp,
    gallery: [
      REAL_BAG_IMAGES.mauveClasp,
      REAL_BAG_IMAGES.vanillaAngle,
    ],
    description:
      'Handcrafted chunky bow charms and 18K gold-plated swivel clasps to customize your Bellalana bags or keys. Easy clip-on design with matching milk cotton knit accents.',
    details: [
      'Custom color-matched knit ribbon bow charm',
      'Heavy-duty 18K gold-tone swivel lobster clasps',
      'Compatible with all Bellalana shoulder bags and crossbody straps',
    ],
    dimensions: '4" total drop with clasp',
    materials: 'Milk Cotton, Gold-plated Alloy',
    inStock: true,
    badge: 'Popular Gift',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Clara Montrose',
    location: 'Charleston, SC',
    rating: 5,
    date: '3 days ago',
    title: 'The Dusky Mauve bag is sheer artisan perfection!',
    comment:
      'I was blown away by the weight and feel of the chunky knit cotton. The tassels and braided handles are so beautifully made, and the zipper keeps everything safe. Strangers literally stop me on the street to ask where I got it! Came wrapped in a linen dust bag with dried lavender.',
    productName: 'Dusky Mauve Fringe Handcrafted Bag',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'rev-2',
    name: 'Emilia Vance',
    location: 'Austin, TX',
    rating: 5,
    date: '1 week ago',
    title: 'The Butter Vanilla colorway is a dream ♡',
    comment:
      'The braided strap rests so comfortably on my shoulder, never slips off, and the front bow ties are the sweetest touch. It easily holds my phone, cardholder, and lip balm with room to spare. 100% worth every penny.',
    productName: 'Butter Vanilla Ribbon Shoulder Bag',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'rev-3',
    name: 'Sophia Liang',
    location: 'Seattle, WA',
    rating: 5,
    date: '2 weeks ago',
    title: 'Terracotta Rose has the most gorgeous earthy tone',
    comment:
      'I got the Terracotta Rose Crossbody and the color is even richer in person than photos can show. The braided crossbody strap is super sturdy and does not stretch out under weight. The craftsmanship is world-class.',
    productName: 'Terracotta Rose Garden Crossbody',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'rev-4',
    name: 'Hannah Brooks',
    location: 'Brooklyn, NY',
    rating: 5,
    date: '3 weeks ago',
    title: 'The zipper and hardware feel so high-end',
    comment:
      'Most knit bags don’t have zippers, so finding one with this level of finishing and gold hardware clasps was such a pleasant surprise. Bellalana is now my go-to for gifts and my own collection!',
    productName: 'Petal Mauve Top-Zip Artisan Clutch',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    imageUrl: REAL_BAG_IMAGES.mauveFull,
    caption: 'Dusky Mauve resting on the stand after final ribbon assembly ✨ Every fringe tassel is individually knotted by hand. Which colorway is your favorite? 🌸🧵 #bellalana #handmadebag #chunkycrochet',
    likes: 1840,
    commentsCount: 94,
    timestamp: '2 hours ago',
    tags: ['#crochetbag', '#bellalana', '#handmadewithlove', '#mauvebag'],
  },
  {
    id: 'ig-2',
    imageUrl: REAL_BAG_IMAGES.vanillaFull,
    caption: 'Soft butter yellow in the morning light ☀️ Chunky braided shoulder strap with custom side bows. Fresh batch dropping this Friday! 💛🧶 #vanillabag #crochetstyle #slowcraft',
    likes: 2420,
    commentsCount: 156,
    timestamp: 'Yesterday',
    tags: ['#buttercream', '#artisanbag', '#cottonknit', '#handmadepurse'],
  },
  {
    id: 'ig-3',
    imageUrl: REAL_BAG_IMAGES.terracottaFull,
    caption: 'Earthy Terracotta Rose sitting pretty with our studio plants 🪴 Weaving memories row by row. What strap length do you prefer? 🌿 #terracottarose #botanicalcraft #crochetcrossbody',
    likes: 3120,
    commentsCount: 188,
    timestamp: '3 days ago',
    tags: ['#crossbodybag', '#earthyaesthetic', '#bellalanastudio', '#handmadegift'],
  },
  {
    id: 'ig-4',
    imageUrl: REAL_BAG_IMAGES.mauveStrap,
    caption: 'A closer look at the double braided handle craft and top zipper finishing. Pure tactile joy! 🤍 #detailsmatter #craftsmanship #handstitched',
    likes: 2190,
    commentsCount: 112,
    timestamp: '5 days ago',
    tags: ['#baghardware', '#zippertop', '#braidedhandle', '#artisancraft'],
  },
  {
    id: 'ig-5',
    imageUrl: REAL_BAG_IMAGES.vanillaAngle,
    caption: 'Gold hardware ring clasps meet chunky milk cotton texture ✨ Loving how this butter cream custom piece came together! 💌 #customorder #handmadewithlove',
    likes: 2890,
    commentsCount: 142,
    timestamp: '1 week ago',
    tags: ['#goldhardware', '#yellowbag', '#crochetpattern', '#bellalanahandmade'],
  },
  {
    id: 'ig-6',
    imageUrl: REAL_BAG_IMAGES.terracottaStrap,
    caption: 'Full 46-inch braided crossbody strap draping gracefully. Sturdy, stretchy, and soft on your shoulder all day long 💕 #crossbodystrap #terracotta #knitwear',
    likes: 2540,
    commentsCount: 130,
    timestamp: '2 weeks ago',
    tags: ['#chunkyknit', '#terracottabag', '#slowfashion', '#bellalana'],
  },
];
