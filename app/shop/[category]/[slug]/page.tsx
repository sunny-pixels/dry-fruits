import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import ProductDetailView from "@/components/shop/ProductDetailView";
import {
  products,
  getCategoryBySlug,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Rahul Impex`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categorySlug, slug } = await params;
  const product = getProductBySlug(slug);
  const category = getCategoryBySlug(categorySlug);

  if (!product || !category || product.category !== categorySlug) notFound();

  const related = getRelatedProducts(product);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <Container>
          <ProductDetailView product={product} category={category} related={related} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
