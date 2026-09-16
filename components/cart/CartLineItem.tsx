"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { CartItem } from "@/lib/cart-context";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import QuantityStepper from "@/components/shop/QuantityStepper";

export default function CartLineItem({ item }: { item: CartItem }) {
  const { updateQty, removeItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-4 border-b border-espresso/10 py-5 last:border-0"
    >
      <Link
        href={`/shop/${item.category}/${item.slug}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-taupe/10"
      >
        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
      </Link>

      <div className="min-w-0 flex-1">
        <Link
          href={`/shop/${item.category}/${item.slug}`}
          className="font-heading text-sm font-semibold text-espresso hover:text-cocoa transition-colors"
        >
          {item.name}
        </Link>
        <p className="mt-1 text-xs text-taupe">
          {item.variantLabel} · {formatPrice(item.price)} each
        </p>

        <div className="mt-3 flex items-center gap-4">
          <QuantityStepper size="sm" qty={item.qty} onChange={(qty) => updateQty(item.key, qty)} />
          <button
            type="button"
            onClick={() => removeItem(item.key)}
            className="text-xs font-semibold text-taupe underline-offset-2 hover:text-espresso hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <p className="shrink-0 font-heading text-sm font-semibold text-espresso">
        {formatPrice(item.price * item.qty)}
      </p>
    </motion.div>
  );
}
