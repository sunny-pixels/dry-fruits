"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryImages } from "@/lib/data";

export default function GalleryCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-cocoa/[0.04]">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <SectionHeading
            align="left"
            title="The Rahul Impex"
            script="Life"
            subtitle="A glimpse into our sourcing, packing and everyday snacking moments."
          />
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll gallery left"
              className="h-12 w-12 rounded-full border border-espresso/20 flex items-center justify-center hover:bg-espresso hover:text-cream transition-colors"
            >
              &#8592;
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll gallery right"
              className="h-12 w-12 rounded-full border border-espresso/20 flex items-center justify-center hover:bg-espresso hover:text-cream transition-colors"
            >
              &#8594;
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-14 flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.08 }}
              className="relative shrink-0 snap-start w-[70vw] sm:w-[320px] aspect-[4/5] rounded-[28px] overflow-hidden bg-taupe/10"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 640px) 320px, 70vw"
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
