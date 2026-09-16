"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { spotlightProducts } from "@/lib/data";

type Tier = "mobile" | "tablet" | "desktop";

type TierConfig = {
  boxW: number;
  boxH: number;
  nearX: number;
  nearY: number;
  nearScale: number;
  nearBlur: number;
  nearOpacity: number;
  farX: number;
  farY: number;
  farScale: number;
  farBlur: number;
  farOpacity: number;
  showFar: boolean;
};

const TIERS: Record<Tier, TierConfig> = {
  desktop: {
    boxW: 300,
    boxH: 380,
    nearX: 210,
    nearY: -22,
    nearScale: 0.82,
    nearBlur: 2.5,
    nearOpacity: 0.75,
    farX: 360,
    farY: -58,
    farScale: 0.57,
    farBlur: 6,
    farOpacity: 0.4,
    showFar: true,
  },
  tablet: {
    boxW: 230,
    boxH: 300,
    nearX: 152,
    nearY: -16,
    nearScale: 0.78,
    nearBlur: 2.5,
    nearOpacity: 0.7,
    farX: 252,
    farY: -42,
    farScale: 0.54,
    farBlur: 5,
    farOpacity: 0.35,
    showFar: true,
  },
  mobile: {
    boxW: 192,
    boxH: 250,
    nearX: 96,
    nearY: -8,
    nearScale: 0.6,
    nearBlur: 2,
    nearOpacity: 0.5,
    farX: 0,
    farY: 0,
    farScale: 0,
    farBlur: 0,
    farOpacity: 0,
    showFar: false,
  },
};

function getTier(width: number): Tier {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

/** Shortest signed distance from `active` to `i` around a ring of size `n`. */
function ringOffset(i: number, active: number, n: number) {
  let diff = ((i - active) % n) + n;
  diff = diff % n;
  if (diff > n / 2) diff -= n;
  return diff;
}

function itemState(offset: number, tier: TierConfig) {
  const abs = Math.abs(offset);
  const sign = offset > 0 ? 1 : -1;

  if (abs === 0) {
    return { x: 0, y: 0, scale: 1, opacity: 1, blur: 0, brightness: 1, zIndex: 50 };
  }
  if (abs === 1) {
    return {
      x: sign * tier.nearX,
      y: tier.nearY,
      scale: tier.nearScale,
      opacity: tier.nearOpacity,
      blur: tier.nearBlur,
      brightness: 0.92,
      zIndex: 30,
    };
  }
  if (abs === 2 && tier.showFar) {
    return {
      x: sign * tier.farX,
      y: tier.farY,
      scale: tier.farScale,
      opacity: tier.farOpacity,
      blur: tier.farBlur,
      brightness: 0.85,
      zIndex: 10,
    };
  }
  // hidden / behind — parked just past the farthest visible ring so it
  // glides smoothly into view rather than popping in
  const parkX = tier.showFar ? tier.farX : tier.nearX;
  const parkY = tier.showFar ? tier.farY : tier.nearY;
  return {
    x: sign * parkX * 1.05,
    y: parkY - 12,
    scale: 0.32,
    opacity: 0,
    blur: 9,
    brightness: 0.8,
    zIndex: 0,
  };
}

export default function ProductSpotlight() {
  const n = spotlightProducts.length;
  const [index, setIndex] = useState(0);
  const [tier, setTier] = useState<Tier>("desktop");
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const product = spotlightProducts[index];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setTier(getTier(el.getBoundingClientRect().width));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((prev) => (prev + dir + n) % n);
    },
    [n]
  );

  const goTo = (i: number) => setIndex(((i % n) + n) % n);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const config = TIERS[tier];
  const motionTransition = prefersReducedMotion
    ? { type: "tween" as const, duration: 0.15 }
    : { type: "spring" as const, stiffness: 260, damping: 32, mass: 0.9 };

  return (
    <section id="offers" className="py-24 lg:py-32 overflow-hidden">
      <Container className="flex flex-col items-center text-center">
        <SectionHeading title="Meet the Collection" script="favorites" align="center" />

        <div
          ref={containerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured products"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="relative mt-16 sm:mt-20 w-full flex items-center justify-center outline-none"
          style={{ height: config.boxH + 90 }}
        >
          {spotlightProducts.map((item, i) => {
            const offset = ringOffset(i, index, n);
            const state = itemState(offset, config);
            const isActive = offset === 0;

            return (
              <motion.div
                key={item.name}
                aria-hidden={!isActive}
                className="absolute rounded-[28px] sm:rounded-[36px] overflow-hidden ring-4 ring-cream"
                style={{
                  width: config.boxW,
                  height: config.boxH,
                  boxShadow: isActive
                    ? "0 24px 60px rgba(34,12,1,0.22)"
                    : "0 12px 30px rgba(34,12,1,0.12)",
                }}
                initial={false}
                animate={{
                  x: state.x,
                  y: state.y,
                  scale: state.scale,
                  opacity: state.opacity,
                  zIndex: state.zIndex,
                  filter: `blur(${state.blur}px) brightness(${state.brightness})`,
                }}
                transition={{
                  x: motionTransition,
                  y: motionTransition,
                  scale: motionTransition,
                  opacity: { duration: prefersReducedMotion ? 0.15 : 0.4 },
                  filter: { duration: prefersReducedMotion ? 0.15 : 0.5 },
                  zIndex: { duration: 0 },
                }}
              >
                <Image
                  src={item.image}
                  alt={isActive ? item.name : ""}
                  fill
                  priority={i === 0}
                  sizes={`${config.boxW}px`}
                  className="object-cover"
                />
              </motion.div>
            );
          })}

          <button
            onClick={() => go(-1)}
            aria-label="Previous product"
            className="absolute top-1/2 -translate-y-1/2 left-1 sm:left-4 lg:-left-4 z-[60] h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-espresso/20 bg-cream flex items-center justify-center text-espresso hover:bg-espresso hover:text-cream transition-colors"
          >
            <span aria-hidden>&#8592;</span>
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next product"
            className="absolute top-1/2 -translate-y-1/2 right-1 sm:right-4 lg:-right-4 z-[60] h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-espresso/20 bg-cream flex items-center justify-center text-espresso hover:bg-espresso hover:text-cream transition-colors"
          >
            <span aria-hidden>&#8594;</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -14 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.35 }}
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
              onClick={() => goTo(i)}
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
