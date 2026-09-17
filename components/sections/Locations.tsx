"use client";

import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { stores } from "@/lib/data";

export default function Locations() {
  return (
    <section id="visit" className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          align="left"
          title="Visit Our"
          script="Stores"
          subtitle="Stop by any time — pick your nearest store on the map and swing in for a fresh scoop."
        />

        <div className="mt-14 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-heading text-xl font-semibold text-espresso mb-6">
              Our Stores
            </p>
            <ul className="space-y-6">
              {stores.map((store) => (
                <li key={store.name} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 h-8 w-8 rounded-full bg-cocoa/10 flex items-center justify-center text-amber">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path
                        d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                      <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.7" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-espresso">{store.name}</p>
                    <p className="text-sm text-taupe">{store.address}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] sm:aspect-[16/10] rounded-[28px] overflow-hidden bg-taupe/10"
          >
            <iframe
              title="Rahul Impex store locations map"
              src="https://maps.google.com/maps?q=Bengaluru&z=12&output=embed"
              className="absolute inset-0 h-full w-full border-0 grayscale-[15%]"
              loading="lazy"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
