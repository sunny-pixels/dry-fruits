"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { varieties } from "@/lib/data";

export default function VarietyGrid() {
  return (
    <section id="variety" className="py-24 lg:py-32 bg-cocoa/[0.04]">
      <Container>
        <SectionHeading
          eyebrow="Our Range"
          title="Choose Your Favorite"
          script="freshness"
          subtitle="Six everyday staples, sourced at their peak and packed to keep every bit of crunch and flavor intact."
        />

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8">
          {varieties.map((item, i) => {
            const offset = i % 3 === 1 ? "sm:-translate-y-6" : "";
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className={`group relative ${offset}`}
              >
                <div className="relative aspect-square rounded-[28px] overflow-hidden bg-taupe/10 shadow-[0_8px_30px_rgba(34,12,1,0.08)] transition-shadow duration-300 group-hover:shadow-[0_16px_40px_rgba(34,12,1,0.16)]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-espresso/0 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <p className="text-cream font-heading font-semibold text-lg sm:text-xl leading-tight">
                      {item.name}
                    </p>
                    <p className="text-cream/70 text-xs sm:text-sm">{item.tag}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
