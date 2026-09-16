"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function IntroSplash() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          align="left"
          title="When You Crave Something"
          script="Wholesome"
          subtitle="If your afternoon needs a lift, nothing beats a handful of real, naturally sweet dry fruit — no sugar rush, no guilt."
        />

        <div className="mt-16 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-12 items-center">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-base sm:text-lg text-taupe max-w-md"
          >
            We curate our everyday range so you can snack smarter on your way
            to work, between meetings, or halfway through a long study
            session — always within reach, always real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative aspect-[4/5] sm:aspect-[16/10] rounded-[32px] overflow-hidden bg-taupe/10"
          >
            <Image
              src="/images/story-pour.jpg"
              alt="Dry fruits and nuts captured mid-pour"
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
