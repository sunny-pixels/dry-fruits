export type Variant = {
  label: string;
  grams: number;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  category: string;
  name: string;
  description: string;
  image: string;
  badge?: "Best Seller" | "New";
  variants: Variant[];
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
};

/** Scales a per-100g price into 250g / 500g / 1kg tiers with a small bulk discount at 1kg. */
function weightVariants(base100: number): Variant[] {
  const round10 = (n: number) => Math.round(n / 10) * 10;
  return [
    { label: "250g", grams: 250, price: round10(base100 * 2.5) },
    { label: "500g", grams: 500, price: round10(base100 * 5) },
    { label: "1kg", grams: 1000, price: round10(base100 * 10 * 0.95) },
  ];
}

export const categories: Category[] = [
  {
    slug: "nuts-dry-fruits",
    name: "Nuts & Dry Fruits",
    tagline: "The everyday staples — almonds, cashews, pistachios and more",
    image: "/images/shop/nuts-dry-fruits/mixed-dry-fruits.jpg",
  },
  {
    slug: "berries",
    name: "Berries",
    tagline: "Tangy, antioxidant-rich dried berries",
    image: "/images/shop/berries/blueberries.jpg",
  },
  {
    slug: "dates",
    name: "Dates",
    tagline: "Soft, caramel-sweet dates from Ajwa to Medjool",
    image: "/images/shop/dates/medjool-dates.jpg",
  },
  {
    slug: "exclusives",
    name: "Nutrafi Exclusives",
    tagline: "Curated mixes, saffron and wellness essentials",
    image: "/images/shop/exclusives/pancharattan-mix.jpg",
  },
  {
    slug: "gift-boxes",
    name: "Gift Boxes",
    tagline: "Premium hampers for every celebration",
    image: "/images/shop/gift-boxes/royal-box.jpg",
  },
  {
    slug: "seeds",
    name: "Seeds & More",
    tagline: "Nutrient-dense seeds for everyday wellness",
    image: "/images/shop/seeds/pumpkin-seeds.jpg",
  },
];

export const products: Product[] = [
  // Nuts & Dry Fruits
  {
    id: "n1",
    slug: "premium-jumbo-almond",
    category: "nuts-dry-fruits",
    name: "Premium Jumbo Almond",
    description:
      "Extra-large California almonds with a firm bite and clean, buttery finish — our best-selling everyday almond.",
    image: "/images/shop/nuts-dry-fruits/premium-jumbo-almond.jpg",
    badge: "Best Seller",
    variants: weightVariants(148),
  },
  {
    id: "n2",
    slug: "mamra-almond",
    category: "nuts-dry-fruits",
    name: "Mamra Almond (Organic)",
    description:
      "A rare, oil-rich heirloom variety prized in Ayurveda — denser, sweeter and more nutrient-packed than regular almonds.",
    image: "/images/shop/nuts-dry-fruits/mamra-almond.jpg",
    badge: "Best Seller",
    variants: weightVariants(470),
  },
  {
    id: "n3",
    slug: "cashew-nuts-jumbo",
    category: "nuts-dry-fruits",
    name: "Cashew Nuts (Kaju) Jumbo",
    description:
      "Large, whole W240-grade cashews with a naturally sweet, creamy finish — slow dried to lock in the crunch.",
    image: "/images/shop/nuts-dry-fruits/cashew-nuts-jumbo.jpg",
    variants: weightVariants(168),
  },
  {
    id: "n4",
    slug: "pista-akbari",
    category: "nuts-dry-fruits",
    name: "Top-Quality Pista Akbari",
    description:
      "Sun-cracked Akbari pistachios with a deep, earthy flavor and a satisfying snap in every shell.",
    image: "/images/shop/nuts-dry-fruits/pista-akbari.jpg",
    variants: weightVariants(244),
  },
  {
    id: "n5",
    slug: "walnut-kernels",
    category: "nuts-dry-fruits",
    name: "Premium Walnut Kernels",
    description:
      "Butter-soft halves and quarters, cracked fresh for maximum flavor and none of the bitterness of older stock.",
    image: "/images/shop/nuts-dry-fruits/walnut-kernels.jpg",
    variants: weightVariants(230),
  },
  {
    id: "n6",
    slug: "black-raisins",
    category: "nuts-dry-fruits",
    name: "Premium Black Raisins",
    description:
      "Deeply sweet, seedless black raisins sun-dried the traditional way — no added sugar, just concentrated grape goodness.",
    image: "/images/shop/nuts-dry-fruits/black-raisins.jpg",
    variants: weightVariants(75),
  },
  {
    id: "n7",
    slug: "golden-dried-apricots",
    category: "nuts-dry-fruits",
    name: "Golden Sun-Dried Apricots",
    description:
      "Plump, tangy-sweet apricots with a soft chew and a bright golden color from natural sun drying.",
    image: "/images/shop/nuts-dry-fruits/golden-dried-apricots.jpg",
    badge: "New",
    variants: weightVariants(108),
  },
  {
    id: "n8",
    slug: "brazil-nuts",
    category: "nuts-dry-fruits",
    name: "Exquisite Brazil Nuts",
    description:
      "Large, mild and creamy — one of the richest natural sources of selenium, straight from the Amazon basin.",
    image: "/images/shop/nuts-dry-fruits/brazil-nuts.jpg",
    variants: weightVariants(410),
  },
  {
    id: "n9",
    slug: "hazelnuts",
    category: "nuts-dry-fruits",
    name: "Premium Hazelnuts",
    description:
      "Whole roasted hazelnuts with a toasty aroma and rounded, nutty sweetness — perfect for snacking or baking.",
    image: "/images/shop/nuts-dry-fruits/hazelnuts.jpg",
    variants: weightVariants(290),
  },
  {
    id: "n10",
    slug: "mixed-dry-fruits",
    category: "nuts-dry-fruits",
    name: "Rich Assortment of Mixed Dry Fruits",
    description:
      "A generous hand-blended mix of almonds, cashews, pistachios and raisins — one bag, every craving covered.",
    image: "/images/shop/nuts-dry-fruits/mixed-dry-fruits.jpg",
    variants: weightVariants(85),
  },
  {
    id: "n11",
    slug: "anjeer-super-jumbo",
    category: "nuts-dry-fruits",
    name: "Anjeer (Figs) Super Jumbo",
    description:
      "Soft, naturally sweet super-jumbo figs with a delicate seed crunch — dried without any added sugar.",
    image: "/images/shop/nuts-dry-fruits/anjeer-super-jumbo.jpg",
    variants: weightVariants(270),
  },

  // Dates
  {
    id: "d1",
    slug: "ajwa-dates",
    category: "dates",
    name: "Premium Ajwa Dates",
    description:
      "The revered dates of Madinah — soft, dark and subtly smoky, with a rich, dense sweetness.",
    image: "/images/shop/dates/ajwa-dates.jpg",
    variants: weightVariants(175),
  },
  {
    id: "d2",
    slug: "medjool-dates",
    category: "dates",
    name: "Premium Medjool Dates",
    description:
      "Soft, caramel-sweet and naturally rich in fiber. Hand-sorted for size, these jumbo Medjools are as close to nature's candy as it gets.",
    image: "/images/shop/dates/medjool-dates.jpg",
    badge: "Best Seller",
    variants: weightVariants(190),
  },
  {
    id: "d3",
    slug: "mabroom-dates",
    category: "dates",
    name: "Finest Mabroom Dates",
    description:
      "Long, slender dates with a firmer bite and a rich, toffee-like sweetness — a favorite for gifting.",
    image: "/images/shop/dates/mabroom-dates.jpg",
    variants: weightVariants(158),
  },
  {
    id: "d4",
    slug: "safawi-dates",
    category: "dates",
    name: "Safawi Sweet Delight",
    description:
      "Small, dark and dense with a deep molasses sweetness — a Madinah classic prized for its rich flavor.",
    image: "/images/shop/dates/safawi-dates.jpg",
    variants: weightVariants(110),
  },
  {
    id: "d5",
    slug: "arabian-seedless-dates",
    category: "dates",
    name: "Arabian Seedless Dates",
    description:
      "Soft, ready-to-eat seedless dates — no pitting required, just pure natural sweetness in every bite.",
    image: "/images/shop/dates/arabian-seedless-dates.jpg",
    variants: weightVariants(38),
  },
  {
    id: "d6",
    slug: "premium-dry-dates",
    category: "dates",
    name: "Premium Dry Dates (Chuara)",
    description:
      "Firm, naturally dried dates with a mild, wholesome sweetness — an everyday staple for snacking and cooking.",
    image: "/images/shop/dates/premium-dry-dates.jpg",
    variants: weightVariants(46),
  },

  // Berries
  {
    id: "b1",
    slug: "strawberries",
    category: "berries",
    name: "Strawberries - Berry Bliss",
    description:
      "Tangy-sweet dried strawberries with a soft, chewy bite — a bright, fruity addition to any snack bowl.",
    image: "/images/shop/berries/strawberries.jpg",
    variants: weightVariants(134),
  },
  {
    id: "b2",
    slug: "blueberries",
    category: "berries",
    name: "Blueberries - Health Boost",
    description:
      "Naturally sweet, antioxidant-rich dried blueberries — a favorite for smoothie bowls, oats and everyday snacking.",
    image: "/images/shop/berries/blueberries.jpg",
    badge: "Best Seller",
    variants: weightVariants(235),
  },
  {
    id: "b3",
    slug: "cranberries",
    category: "berries",
    name: "Premium Cranberries",
    description:
      "Tart, chewy dried cranberries with a natural tang — perfect straight from the bag or tossed into a salad.",
    image: "/images/shop/berries/cranberries.jpg",
    variants: weightVariants(99),
  },
  {
    id: "b4",
    slug: "blackberry-plum",
    category: "berries",
    name: "Blackberry Plum",
    description:
      "Deeply fruity and slightly tart, this dried blackberry-plum blend is a distinctive, antioxidant-rich treat.",
    image: "/images/shop/berries/blackberry-plum.jpg",
    variants: weightVariants(93),
  },

  // Nutrafi Exclusives
  {
    id: "e1",
    slug: "pancharattan-mix",
    category: "exclusives",
    name: "Pancharattan Mix",
    description:
      "Five premium dry fruits hand-blended into one power-packed mix — a wholesome grab for busy days.",
    image: "/images/shop/exclusives/pancharattan-mix.jpg",
    badge: "Best Seller",
    variants: weightVariants(164),
  },
  {
    id: "e2",
    slug: "wholesome-muesli",
    category: "exclusives",
    name: "Wholesome Muesli",
    description:
      "Rolled oats, nuts and dried fruit blended for a hearty, fibre-rich start to the morning.",
    image: "/images/shop/exclusives/wholesome-muesli.png",
    variants: weightVariants(114),
  },
  {
    id: "e3",
    slug: "breakfast-mix",
    category: "exclusives",
    name: "Nutritious Breakfast Mix",
    description:
      "A protein-and-fibre-rich blend of nuts, seeds and dried fruit designed to keep you full till lunch.",
    image: "/images/shop/exclusives/breakfast-mix.jpg",
    variants: weightVariants(107),
  },
  {
    id: "e4",
    slug: "protein-booster",
    category: "exclusives",
    name: "Protein Booster Mix",
    description:
      "A dense blend of nuts and roasted seeds built for post-workout recovery and sustained energy.",
    image: "/images/shop/exclusives/protein-booster.jpg",
    variants: weightVariants(112),
  },
  {
    id: "e5",
    slug: "kashmiri-saffron",
    category: "exclusives",
    name: "Kashmiri Saffron (Kesar)",
    description:
      "Deep crimson, intensely aromatic saffron threads hand-picked from the valleys of Kashmir.",
    image: "/images/shop/exclusives/kashmiri-saffron.jpg",
    badge: "New",
    variants: [
      { label: "1g", grams: 1, price: 440 },
      { label: "2g", grams: 2, price: 850 },
      { label: "5g", grams: 5, price: 2050 },
    ],
  },
  {
    id: "e6",
    slug: "pure-shilajit",
    category: "exclusives",
    name: "Pure Shilajit (100% Natural)",
    description:
      "Raw Himalayan shilajit resin, purified and lab-tested — a traditional daily wellness essential.",
    image: "/images/shop/exclusives/pure-shilajit.jpg",
    variants: [
      { label: "15g", grams: 15, price: 1499 },
      { label: "30g", grams: 30, price: 2799 },
      { label: "50g", grams: 50, price: 4299 },
    ],
  },

  // Gift Boxes
  {
    id: "g1",
    slug: "luxury-purple-gift-box",
    category: "gift-boxes",
    name: "Luxury Purple Gift Box",
    description:
      "An opulent purple hamper of hand-selected nuts and dried fruit, finished with a satin ribbon.",
    image: "/images/shop/gift-boxes/luxury-purple-gift-box.jpg",
    badge: "Best Seller",
    variants: [{ label: "1 Box", grams: 0, price: 1899 }],
  },
  {
    id: "g2",
    slug: "elegant-collection",
    category: "gift-boxes",
    name: "Elegant Collection",
    description:
      "A refined assortment of premium nuts and dates in an understated, gift-ready box.",
    image: "/images/shop/gift-boxes/elegant-collection.jpg",
    variants: [{ label: "1 Box", grams: 0, price: 1499 }],
  },
  {
    id: "g3",
    slug: "bottled-collection",
    category: "gift-boxes",
    name: "Bottled Collection",
    description:
      "Individually bottled dry fruits arranged in a keepsake tray — as beautiful to display as it is to gift.",
    image: "/images/shop/gift-boxes/bottled-collection.jpg",
    variants: [{ label: "1 Box", grams: 0, price: 1299 }],
  },
  {
    id: "g4",
    slug: "royal-box",
    category: "gift-boxes",
    name: "Royal Box",
    description:
      "Our most decadent hamper — jumbo almonds, Mamra, Medjool dates and saffron in a regal presentation box.",
    image: "/images/shop/gift-boxes/royal-box.jpg",
    badge: "Best Seller",
    variants: [{ label: "1 Box", grams: 0, price: 2499 }],
  },
  {
    id: "g5",
    slug: "delight-collection",
    category: "gift-boxes",
    name: "Delight Collection",
    description:
      "A cheerful, colourful mix of dry fruits and nuts — an easy everyday gifting favourite.",
    image: "/images/shop/gift-boxes/delight-collection.jpg",
    variants: [{ label: "1 Box", grams: 0, price: 999 }],
  },
  {
    id: "g6",
    slug: "luxe-hampers",
    category: "gift-boxes",
    name: "Luxe Hampers",
    description:
      "A generously sized hamper layered with assorted nuts, dates and dried fruit for larger celebrations.",
    image: "/images/shop/gift-boxes/luxe-hampers.jpg",
    variants: [{ label: "1 Box", grams: 0, price: 2199 }],
  },
  {
    id: "g7",
    slug: "goodness-box",
    category: "gift-boxes",
    name: "Goodness Box",
    description:
      "A compact, thoughtfully priced box of everyday dry fruits — simple, wholesome gifting.",
    image: "/images/shop/gift-boxes/goodness-box.jpg",
    variants: [{ label: "1 Box", grams: 0, price: 799 }],
  },
  {
    id: "g8",
    slug: "signature-box",
    category: "gift-boxes",
    name: "Signature Box",
    description:
      "The flagship Nutrafi hamper — our finest nuts, dates and saffron, curated for the most special occasions.",
    image: "/images/shop/gift-boxes/signature-box.jpg",
    badge: "New",
    variants: [{ label: "1 Box", grams: 0, price: 2999 }],
  },
  {
    id: "g9",
    slug: "classic-choice",
    category: "gift-boxes",
    name: "Classic Choice",
    description:
      "A timeless, no-fuss selection of premium dry fruits in clean, minimal packaging.",
    image: "/images/shop/gift-boxes/classic-choice.jpg",
    variants: [{ label: "1 Box", grams: 0, price: 699 }],
  },

  // Seeds & More
  {
    id: "s1",
    slug: "pumpkin-seeds",
    category: "seeds",
    name: "Pumpkin Seeds",
    description:
      "Crisp, nutty pumpkin seeds (pepitas) — a magnesium-rich snack or salad topper.",
    image: "/images/shop/seeds/pumpkin-seeds.jpg",
    variants: weightVariants(120),
  },
  {
    id: "s2",
    slug: "sunflower-seeds",
    category: "seeds",
    name: "Sunflower Seeds",
    description:
      "Lightly roasted, shelled sunflower seeds with a mild, nutty crunch — great for snacking or baking.",
    image: "/images/shop/seeds/sunflower-seeds.jpg",
    variants: weightVariants(90),
  },
  {
    id: "s3",
    slug: "chia-seeds",
    category: "seeds",
    name: "Chia Seeds",
    description:
      "Tiny, fibre-packed chia seeds that swell into a gel — perfect for puddings, smoothies and overnight oats.",
    image: "/images/shop/seeds/chia-seeds.jpg",
    badge: "Best Seller",
    variants: weightVariants(110),
  },
  {
    id: "s4",
    slug: "flax-seeds",
    category: "seeds",
    name: "Flax Seeds",
    description:
      "Omega-3-rich flax seeds with a subtle nutty flavour — best ground fresh and stirred into your morning bowl.",
    image: "/images/shop/seeds/flax-seeds.jpg",
    variants: weightVariants(80),
  },
  {
    id: "s5",
    slug: "watermelon-seeds",
    category: "seeds",
    name: "Roasted Watermelon Seeds (Magaz)",
    description:
      "Lightly roasted and salted watermelon seeds — a protein-rich, satisfyingly crunchy snack.",
    image: "/images/shop/seeds/watermelon-seeds.jpg",
    variants: weightVariants(140),
  },
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count);
}

export function getBestSellers(count = 6): Product[] {
  const featured = products.filter((p) => p.badge === "Best Seller");
  if (featured.length >= count) return featured.slice(0, count);
  const rest = products.filter((p) => p.badge !== "Best Seller");
  return [...featured, ...rest].slice(0, count);
}
