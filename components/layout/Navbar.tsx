"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/ui/Container";
import { nav } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-cream/80 backdrop-blur-md shadow-[0_1px_0_rgba(34,12,1,0.06)]"
          : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between py-5">
        <a href="#" className="font-heading text-2xl font-bold text-espresso">
          Nutrafi.
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-espresso/80 hover:text-espresso transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#offers"
            className="hidden sm:inline-flex rounded-full bg-espresso text-cream text-sm font-semibold px-6 py-2.5 hover:bg-cocoa transition-colors"
          >
            Shop Now
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden h-11 w-11 rounded-full border border-espresso/15 flex items-center justify-center text-espresso"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-espresso/10 bg-cream/95 backdrop-blur-md"
          >
            <Container className="flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-semibold text-espresso/80 hover:text-espresso transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#offers"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex justify-center rounded-full bg-espresso text-cream text-sm font-semibold px-6 py-3 hover:bg-cocoa transition-colors"
              >
                Shop Now
              </a>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
