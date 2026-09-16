"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Category } from "@/lib/products";

export default function CategoryCard({
  category,
  count,
}: {
  category: Category;
  count: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/shop/${category.slug}`}
        className="group relative block aspect-[4/5] overflow-hidden rounded-[28px] bg-taupe/10"
      >
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
          <span className="text-xs font-semibold uppercase tracking-wide text-cream/60">
            {count} {count === 1 ? "item" : "items"}
          </span>
          <h3 className="font-heading text-xl font-bold text-cream">{category.name}</h3>
          <p className="text-sm text-cream/75">{category.tagline}</p>
        </div>

        <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-espresso opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          &#8594;
        </span>
      </Link>
    </motion.div>
  );
}
