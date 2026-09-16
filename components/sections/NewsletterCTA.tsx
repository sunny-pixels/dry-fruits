"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function NewsletterCTA() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="flex justify-center mb-14">
          <SectionHeading title="Don't Miss Your" script="Bonus" align="center" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[36px] bg-cocoa/[0.06] overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1.4fr_1fr] items-center"
        >
          <div className="relative hidden lg:block aspect-[3/4] h-full">
            <Image
              src="/images/newsletter-1.jpg"
              alt="Bowl of premium dry fruits"
              fill
              sizes="360px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col items-center text-center gap-4 px-8 py-16">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-espresso">
              Get 15% Off
            </h3>
            <p className="max-w-sm text-taupe">
              Leave your email and we&apos;ll send a promo code straight away
              for your first order from our new harvest collection.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full max-w-sm mt-4 flex flex-col gap-3"
            >
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-full bg-cream px-6 py-4 text-sm text-espresso placeholder:text-taupe/60 outline-none border border-espresso/10 focus:border-amber transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-full bg-cream px-6 py-4 text-sm text-espresso placeholder:text-taupe/60 outline-none border border-espresso/10 focus:border-amber transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-full bg-espresso text-cream py-4 text-sm font-semibold hover:bg-cocoa transition-colors"
              >
                Get My Discount
              </motion.button>
            </form>
          </div>

          <div className="relative hidden lg:block aspect-[3/4] h-full">
            <Image
              src="/images/newsletter-2.jpg"
              alt="Jar of premium dry fruits"
              fill
              sizes="360px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
