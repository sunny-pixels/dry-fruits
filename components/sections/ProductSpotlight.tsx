"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { spotlightProducts } from "@/lib/data";

export default function ProductSpotlight() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const product = spotlightProducts[index];

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + spotlightProducts.length) % spotlightProducts.length);
  };

  return (
    <section id="offers" className="py-24 lg:py-32">
      <Container className="flex flex-col items-center text-center">
        <SectionHeading title="Meet the Collection" script="favorites" align="center" />

        <div className="relative mt-14 w-full max-w-md">
          <div className="relative aspect-[4/5] rounded-[36px] overflow-hidden bg-taupe/10 shadow-[0_20px_60px_rgba(34,12,1,0.15)]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={product.name}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 60 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 640px) 480px, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-16">
            <button
              onClick={() => go(-1)}
              aria-label="Previous product"
              className="h-12 w-12 rounded-full border border-espresso/20 bg-cream flex items-center justify-center text-espresso hover:bg-espresso hover:text-cream transition-colors"
            >
              &#8592;
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-16">
            <button
              onClick={() => go(1)}
              aria-label="Next product"
              className="h-12 w-12 rounded-full border border-espresso/20 bg-cream flex items-center justify-center text-espresso hover:bg-espresso hover:text-cream transition-colors"
            >
              &#8594;
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={product.name + "-text"}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="mt-8 max-w-lg"
          >
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-espresso">
              {product.name}
            </h3>
            <p className="mt-3 text-taupe">{product.description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex gap-2">
          {spotlightProducts.map((p, i) => (
            <button
              key={p.name}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Go to ${p.name}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-amber" : "w-2 bg-taupe/30"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
