"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { features } from "@/lib/data";

const headlineLines = ["TASTE THE FINEST", "DRY FRUITS FROM", "AROUND THE", "WORLD"];

const badgePoints = features.filter((f) => f.title === "100% Natural" || f.title === "Freshly Packed");

function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M6 34C6 18 18 6 34 6c0 16-12 28-28 28Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M8 32C16 24 24 16 32 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Almond({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 4C27 9 31 16 31 23c0 7.5-5 13-11 13S9 30.5 9 23c0-7 4-14 11-19Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M20 9c2 5 2 17 0 23"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function SwooshLines({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 90" fill="none" className={className}>
      <path d="M4 60C28 60 40 40 40 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 68C38 68 50 46 50 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 76C50 76 60 54 60 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-amber/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-[320px] w-[320px] rounded-full bg-taupe/10 blur-3xl" />

      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
        {/* LEFT: copy */}
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.35em] text-taupe"
          >
            Handpicked &middot; Naturally Dried &middot; Delivered Fresh
          </motion.span>

          <h1 className="font-heading text-5xl font-bold uppercase leading-[1.02] text-espresso sm:text-6xl lg:text-[64px]">
            {headlineLines.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: "easeOut" }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="max-w-md text-base text-taupe sm:text-lg"
          >
            Taste the difference with handpicked, naturally dried nuts and
            fruits — sourced fresh and delivered with care to your door.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button href="/shop" variant="accent">
              Shop Fresh Dry Fruits
            </Button>
            <Button href="/shop" variant="soft">
              Browse Categories
            </Button>
          </motion.div>
        </div>

        {/* RIGHT: visual */}
        <div className="relative h-[360px] sm:h-[440px] lg:h-[560px]">
          {/* larger leaves peeking from behind the panel */}
          <Leaf className="absolute -left-4 bottom-6 h-20 w-20 text-cocoa/25 hidden sm:block" />
          <Leaf className="absolute -right-2 top-4 h-24 w-24 rotate-45 text-taupe/25 hidden sm:block" />

          {/* dark asymmetric panel */}
          <div className="absolute inset-y-0 right-0 left-[6%] overflow-hidden rounded-[48px] bg-espresso sm:left-[8%]">
            <div className="absolute -right-10 -top-10 flex h-40 w-40 items-end justify-start rounded-full bg-cream p-7">
              <div className="relative h-16 w-16">
                <Almond className="absolute inset-0 h-14 w-14 text-cocoa/70" />
                <Leaf className="absolute -right-1 -top-1 h-7 w-7 rotate-[35deg] text-amber" />
              </div>
            </div>
          </div>

          <SwooshLines className="absolute left-[2%] top-2 h-20 w-20 text-taupe/40 sm:h-24 sm:w-24" />
          <Leaf className="absolute left-[14%] top-0 h-9 w-9 -rotate-12 text-amber/70" />

          {/* product image, breaking out of the panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="absolute left-0 top-[6%] h-[78%] w-[72%] sm:top-[8%]"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 3.6, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full w-full overflow-hidden rounded-[32px] shadow-[0_30px_60px_rgba(34,12,1,0.35)] ring-4 ring-cream/80"
            >
              <Image
                src="/images/hero.jpg"
                alt="An elegant arrangement of premium dry fruits and nuts"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 80vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* floating badge card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease: "easeOut" }}
            className="absolute bottom-2 right-2 flex items-center gap-3 sm:bottom-6 sm:right-4"
          >
            <div className="flex flex-col gap-2">
              {badgePoints.map((point) => (
                <span
                  key={point.title}
                  className="flex items-center gap-2 rounded-full bg-cream px-3 py-2 text-xs font-semibold text-espresso shadow-[0_8px_20px_rgba(34,12,1,0.15)] sm:px-4 sm:text-sm"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber text-cream">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                      <path
                        d="M5 12.5 10 17l9-10"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {point.title}
                </span>
              ))}
            </div>

            <div className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
              <div className="absolute inset-0 rounded-full bg-amber/80" />
              <div className="absolute inset-[3px] overflow-hidden rounded-full ring-4 ring-cream">
                <Image
                  src="/images/variety-almonds.jpg"
                  alt="Premium almonds"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
