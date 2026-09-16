"use client";

export default function QuantityStepper({
  qty,
  onChange,
  min = 1,
  max = 20,
  size = "md",
}: {
  qty: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const dims = size === "sm" ? "h-8 w-8 text-sm" : "h-10 w-10 text-base";

  return (
    <div className="inline-flex items-center rounded-full border border-espresso/15">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, qty - 1))}
        disabled={qty <= min}
        className={`${dims} flex items-center justify-center rounded-full text-espresso transition-colors hover:bg-cocoa/[0.06] disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-semibold text-espresso">{qty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, qty + 1))}
        disabled={qty >= max}
        className={`${dims} flex items-center justify-center rounded-full text-espresso transition-colors hover:bg-cocoa/[0.06] disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        +
      </button>
    </div>
  );
}
