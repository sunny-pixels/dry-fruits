import type { Product } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";
import Button from "@/components/ui/Button";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-[28px] bg-cocoa/[0.04] py-20 text-center">
        <p className="text-taupe">No products found.</p>
        <Button href="/shop" variant="outline">
          Back to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
