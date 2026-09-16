"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCounter from "@/components/ui/StatCounter";
import { introStats } from "@/lib/data";

export default function IntroSplash() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          align="left"
          title="When You Crave Something"
          script="Wholesome"
        />

        <div className="mt-16 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-12 items-start">
          <div className="flex flex-col gap-10 max-w-md">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-base sm:text-lg text-taupe"
            >
              We curate our everyday range so you can snack smarter on your
              way to work, between meetings, or halfway through a long study
              session — always within reach, always real.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base text-taupe"
            >
              Every batch is graded by hand before it ever reaches a bag —
              size, moisture and color checked one by one, so what lands on
              your counter is the top tier of the harvest, not the average
              of it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-x-6 gap-y-8"
            >
              {introStats.map((stat) => (
                <StatCounter
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </motion.div>
          </div>

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
