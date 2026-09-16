"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { features } from "@/lib/data";

const icons: Record<string, ReactElement> = {
  clock: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M5 19c0-4 2-8 6-10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
      <path
        d="M12 20s-7-4.35-9.5-8.5C.8 8.2 2.6 5 6 5c2 0 3.4 1.1 4 2.2C10.6 6.1 12 5 14 5c3.4 0 5.2 3.2 3.5 6.5C19 15.65 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32">
      <Container className="grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-taupe/10 order-2 lg:order-1"
        >
          <Image
            src="/images/why-choose-us.jpg"
            alt="Hand holding a scoop of premium mixed nuts"
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="order-1 lg:order-2 flex flex-col gap-10">
          <SectionHeading
            align="left"
            title="Why Choose"
            script="Nutrafi."
            subtitle="We obsess over freshness and sourcing, so every bag tastes exactly the way real dry fruit should."
          />

          <div className="flex flex-col gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex gap-5"
              >
                <div className="shrink-0 h-12 w-12 rounded-xl bg-cocoa text-cream flex items-center justify-center">
                  {icons[feature.icon]}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-espresso">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-taupe text-sm sm:text-base">{feature.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
