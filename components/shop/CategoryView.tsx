"use client";

import { useMemo, useState } from "react";
import type { Category, Product } from "@/lib/products";
import Breadcrumb from "@/components/shop/Breadcrumb";
import SortBar, { SortOption } from "@/components/shop/SortBar";
import ProductGrid from "@/components/shop/ProductGrid";

export default function CategoryView({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("featured");

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.variants[0].price - b.variants[0].price);
      case "price-desc":
        return list.sort((a, b) => b.variants[0].price - a.variants[0].price);
      case "name-asc":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [products, sort]);

  return (
    <>
      <Breadcrumb items={[{ label: "Shop", href: "/shop" }, { label: category.name }]} />

      <div className="mt-4 flex flex-col gap-2">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-espresso">
          {category.name}
        </h1>
        <p className="max-w-xl text-taupe">{category.tagline}</p>
      </div>

      <div className="mt-10">
        <SortBar value={sort} onChange={setSort} resultCount={sorted.length} />
      </div>

      <div className="mt-10">
        <ProductGrid products={sorted} />
      </div>
    </>
  );
}
