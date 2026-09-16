"use client";

export type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export default function SortBar({
  value,
  onChange,
  resultCount,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
  resultCount: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-espresso/10 pb-5">
      <p className="text-sm text-taupe">
        {resultCount} {resultCount === 1 ? "product" : "products"}
      </p>
      <label className="flex items-center gap-2 text-sm text-taupe">
        Sort by
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="rounded-full border border-espresso/15 bg-cream px-4 py-2 text-sm font-semibold text-espresso outline-none transition-colors focus:border-amber"
        >
          {OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
