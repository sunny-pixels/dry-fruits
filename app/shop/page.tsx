import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CategoryAccordion from "@/components/shop/CategoryAccordion";
import ProductGrid from "@/components/shop/ProductGrid";
import { categories, getProductsByCategory, getBestSellers } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop | Rahul Impex",
  description: "Browse premium dry fruits, nuts, dates, berries and gift boxes at Rahul Impex.",
};

export default function ShopPage() {
  const bestSellers = getBestSellers(8);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <Container className="flex flex-col items-center text-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-taupe">
            The Full Harvest
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-espresso">
            Shop Rahul Impex
          </h1>
          <p className="max-w-xl text-taupe text-base sm:text-lg">
            Handpicked nuts, dates, berries and gifting hampers — sourced fresh and packed with
            care. Pick a category to start browsing.
          </p>
        </Container>

        <Container className="mt-16">
          <CategoryAccordion
            categories={categories.map((category) => ({
              ...category,
              count: getProductsByCategory(category.slug).length,
            }))}
          />
        </Container>

        <Container className="mt-24 lg:mt-32">
          <SectionHeading
            eyebrow="Handpicked for You"
            title="Best"
            script="Sellers"
            subtitle="The Rahul Impex favorites our customers keep coming back for."
          />
          <div className="mt-14">
            <ProductGrid products={bestSellers} />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
