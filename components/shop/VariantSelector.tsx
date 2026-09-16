"use client";

import type { Variant } from "@/lib/products";

export default function VariantSelector({
  variants,
  selected,
  onSelect,
}: {
  variants: Variant[];
  selected: Variant;
  onSelect: (variant: Variant) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {variants.map((variant) => {
        const isActive = variant.label === selected.label;
        return (
          <button
            key={variant.label}
            type="button"
            onClick={() => onSelect(variant)}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
              isActive
                ? "border-espresso bg-espresso text-cream"
                : "border-espresso/20 text-espresso hover:border-espresso/50"
            }`}
          >
            {variant.label}
          </button>
        );
      })}
    </div>
  );
}
