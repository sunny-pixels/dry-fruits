"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart-context";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const defaultVariant = product.variants[0];

  const handleAdd = () => {
    addItem(product, defaultVariant, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col"
    >
      <Link
        href={`/shop/${product.category}/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-[24px] bg-taupe/10"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
              product.badge === "Best Seller"
                ? "bg-espresso text-cream"
                : "bg-amber text-cream"
            }`}
          >
            {product.badge}
          </span>
        )}

        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          onClick={(e) => {
            e.preventDefault();
            setWishlisted((v) => !v);
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-espresso shadow-sm transition-transform hover:scale-105"
        >
          <svg
            viewBox="0 0 24 24"
            fill={wishlisted ? "currentColor" : "none"}
            className={`h-4 w-4 ${wishlisted ? "text-amber" : "text-espresso"}`}
          >
            <path
              d="M12 20s-7-4.35-9.5-8.5C.8 8.2 2.6 5 6 5c2 0 3.4 1.1 4 2.2C10.6 6.1 12 5 14 5c3.4 0 5.2 3.2 3.5 6.5C19 15.65 12 20 12 20Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <Link href={`/shop/${product.category}/${product.slug}`}>
          <h3 className="font-heading text-base font-semibold leading-snug text-espresso transition-colors group-hover:text-cocoa">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="text-sm text-taupe">
            From <span className="font-semibold text-espresso">{formatPrice(defaultVariant.price)}</span>
            {defaultVariant.grams > 0 && (
              <span className="text-taupe"> / {defaultVariant.label}</span>
            )}
          </div>

          <motion.button
            type="button"
            onClick={handleAdd}
            whileTap={{ scale: 0.94 }}
            aria-label={`Add ${product.name} to cart`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cocoa/[0.06] text-espresso transition-colors hover:bg-espresso hover:text-cream"
          >
            {justAdded ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M5 12.5 10 17l9-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="M16.84,8.082V6.091a4.725,4.725,0,1,0-9.449,0v4.725a.675.675,0,0,0,1.35,0V9.432h5.4V8.082h-5.4V6.091a3.375,3.375,0,0,1,6.75,0v4.691a.675.675,0,1,0,1.35,0V9.433h3.374V21.581H4.017V9.432H6.041V8.082H2.667V21.641a1.289,1.289,0,0,0,1.289,1.29h16.32a1.289,1.289,0,0,0,1.289-1.29V8.082Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
