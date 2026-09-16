import { formatPrice } from "@/lib/format";

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_FEE = 79;

export default function OrderSummary({
  subtotal,
  itemCount,
}: {
  subtotal: number;
  itemCount: number;
}) {
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  return (
    <div className="rounded-[28px] bg-cocoa/[0.04] p-6 sm:p-8">
      <h3 className="font-heading text-lg font-semibold text-espresso">Order Summary</h3>

      <div className="mt-5 flex flex-col gap-3 text-sm">
        <div className="flex justify-between text-taupe">
          <span>
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-medium text-espresso">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-taupe">
          <span>Shipping</span>
          <span className="font-medium text-espresso">
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-taupe">
            Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping.
          </p>
        )}
      </div>

      <div className="mt-5 flex justify-between border-t border-espresso/10 pt-5">
        <span className="font-heading font-semibold text-espresso">Total</span>
        <span className="font-heading text-lg font-bold text-espresso">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
