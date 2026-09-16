"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-amber/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-[320px] w-[320px] rounded-full bg-taupe/10 blur-3xl" />

      <Container className="relative flex flex-col items-center text-center gap-8">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.35em] text-taupe"
        >
          Handpicked &middot; Naturally Dried &middot; Delivered Fresh
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold uppercase leading-[1.02] text-espresso max-w-4xl"
        >
          Premium Dry Fruits
          <span className="block font-script text-amber text-[1.3em] normal-case font-normal leading-none mt-2">
            Harvest edition
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-xl text-lg text-taupe"
        >
          Taste the difference of handpicked, naturally dried nuts and fruits
          — sourced fresh, roasted with care, and delivered straight to your
          door.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button href="#variety" variant="filled">
            Shop the Collection
          </Button>
          <Button href="#offers" variant="outline">
            Get 15% Off
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="relative mt-8 w-full max-w-5xl aspect-[16/9] rounded-[32px] overflow-hidden bg-taupe/10"
        >
          <Image
            src="/images/hero.jpg"
            alt="An elegant arrangement of premium dry fruits and nuts"
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 via-transparent to-transparent" />
        </motion.div>
      </Container>
    </section>
  );
}
