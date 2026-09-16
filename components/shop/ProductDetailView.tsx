"use client";

import { useState, type ReactElement } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { Category, Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import Breadcrumb from "@/components/shop/Breadcrumb";
import VariantSelector from "@/components/shop/VariantSelector";
import QuantityStepper from "@/components/shop/QuantityStepper";
import ProductGrid from "@/components/shop/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";

const trustPoints = [
  { icon: "clock", title: "Freshly Packed", text: "Sealed within 24 hours of dispatch" },
  { icon: "leaf", title: "100% Natural", text: "No preservatives or additives" },
  { icon: "truck", title: "Free Shipping", text: "On orders over ₹999" },
];

const icons: Record<string, ReactElement> = {
  clock: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M5 19c0-4 2-8 6-10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M3 7h11v9H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 10h4l3 3v3h-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
};

export default function ProductDetailView({
  product,
  category,
  related,
}: {
  product: Product;
  category: Category;
  related: Product[];
}) {
  const { addItem } = useCart();
  const [variant, setVariant] = useState(product.variants[0]);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, variant, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Shop", href: "/shop" },
          { label: category.name, href: `/shop/${category.slug}` },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-square rounded-[32px] overflow-hidden bg-taupe/10 lg:sticky lg:top-28 lg:self-start"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
          {product.badge && (
            <span
              className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                product.badge === "Best Seller" ? "bg-espresso text-cream" : "bg-amber text-cream"
              }`}
            >
              {product.badge}
            </span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-taupe">
              {category.name}
            </span>
            <h1 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-espresso">
              {product.name}
            </h1>
          </div>

          <p className="text-taupe">{product.description}</p>

          <div className="font-heading text-3xl font-bold text-espresso">
            {formatPrice(variant.price)}
            {variant.grams > 0 && (
              <span className="ml-2 text-base font-normal text-taupe">/ {variant.label}</span>
            )}
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-espresso">
              {product.variants[0].grams > 0 ? "Select Weight" : "Select Option"}
            </p>
            <VariantSelector variants={product.variants} selected={variant} onSelect={setVariant} />
          </div>

          <div className="flex items-center gap-6">
            <div>
              <p className="mb-3 text-sm font-semibold text-espresso">Quantity</p>
              <QuantityStepper qty={qty} onChange={setQty} />
            </div>
          </div>

          <motion.button
            type="button"
            onClick={handleAdd}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`mt-2 w-full rounded-full px-8 py-4 text-sm font-semibold tracking-wide transition-colors sm:w-auto sm:min-w-[260px] ${
              justAdded ? "bg-cocoa text-cream" : "bg-espresso text-cream hover:bg-cocoa"
            }`}
          >
            {justAdded ? "Added to Cart ✓" : "Add to Cart"}
          </motion.button>

          <div className="mt-4 grid gap-4 border-t border-espresso/10 pt-6 sm:grid-cols-3">
            {trustPoints.map((point) => (
              <div key={point.title} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cocoa/[0.06] text-amber">
                  {icons[point.icon]}
                </span>
                <div>
                  <p className="text-sm font-semibold text-espresso">{point.title}</p>
                  <p className="text-xs text-taupe">{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <div className="mt-24 lg:mt-32">
          <SectionHeading title="You May Also" script="Like" align="left" />
          <div className="mt-10">
            <ProductGrid products={related} />
          </div>
        </div>
      )}
    </>
  );
}
