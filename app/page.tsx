import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import IntroSplash from "@/components/sections/IntroSplash";
import VarietyGrid from "@/components/sections/VarietyGrid";
import ProductSpotlight from "@/components/sections/ProductSpotlight";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import GalleryCarousel from "@/components/sections/GalleryCarousel";
import Locations from "@/components/sections/Locations";
import NewsletterCTA from "@/components/sections/NewsletterCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <IntroSplash />
        <VarietyGrid />
        <ProductSpotlight />
        <WhyChooseUs />
        <GalleryCarousel />
        <Locations />
        <NewsletterCTA />
      </main>
      <Footer />
    </>
  );
}
