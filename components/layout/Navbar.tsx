"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/ui/Container";
import { nav } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

function CartButton({ itemCount, onClick }: { itemCount: number; onClick?: () => void }) {
  return (
    <Link
      href="/cart"
      onClick={onClick}
      aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-espresso/15 text-espresso transition-colors hover:bg-cocoa/[0.06]"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
        <path
          d="M16.84,8.082V6.091a4.725,4.725,0,1,0-9.449,0v4.725a.675.675,0,0,0,1.35,0V9.432h5.4V8.082h-5.4V6.091a3.375,3.375,0,0,1,6.75,0v4.691a.675.675,0,1,0,1.35,0V9.433h3.374V21.581H4.017V9.432H6.041V8.082H2.667V21.641a1.289,1.289,0,0,0,1.289,1.29h16.32a1.289,1.289,0,0,0,1.289-1.29V8.082Z"
          fill="currentColor"
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber text-[10px] font-bold text-cream">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

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
        <Link href="/" className="font-heading text-2xl font-bold text-espresso">
          Nutrafi.
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold text-espresso/80 hover:text-espresso transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <CartButton itemCount={itemCount} />
          <Link
            href="/shop"
            className="hidden sm:inline-flex rounded-full bg-espresso text-cream text-sm font-semibold px-6 py-2.5 hover:bg-cocoa transition-colors"
          >
            Shop Now
          </Link>
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
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-semibold text-espresso/80 hover:text-espresso transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex justify-center rounded-full bg-espresso text-cream text-sm font-semibold px-6 py-3 hover:bg-cocoa transition-colors"
              >
                Shop Now
              </Link>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
