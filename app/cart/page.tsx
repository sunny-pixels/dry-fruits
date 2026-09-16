"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CartLineItem from "@/components/cart/CartLineItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, subtotal, itemCount } = useCart();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <Container>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-espresso">Your Cart</h1>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-14 flex flex-col items-center gap-6 rounded-[28px] bg-cocoa/[0.04] py-24 text-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream text-espresso">
                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                  <path
                    d="M16.84,8.082V6.091a4.725,4.725,0,1,0-9.449,0v4.725a.675.675,0,0,0,1.35,0V9.432h5.4V8.082h-5.4V6.091a3.375,3.375,0,0,1,6.75,0v4.691a.675.675,0,1,0,1.35,0V9.433h3.374V21.581H4.017V9.432H6.041V8.082H2.667V21.641a1.289,1.289,0,0,0,1.289,1.29h16.32a1.289,1.289,0,0,0,1.289-1.29V8.082Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <div>
                <p className="font-heading text-lg font-semibold text-espresso">
                  Your cart is empty
                </p>
                <p className="mt-1 text-sm text-taupe">
                  Looks like you haven&apos;t added anything yet.
                </p>
              </div>
              <Button href="/shop" variant="filled">
                Shop Now
              </Button>
            </motion.div>
          ) : (
            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              <div>
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <CartLineItem key={item.key} item={item} />
                  ))}
                </AnimatePresence>

                <Link
                  href="/shop"
                  className="mt-6 inline-block text-sm font-semibold text-espresso underline-offset-2 hover:underline"
                >
                  ← Continue Shopping
                </Link>
              </div>

              <div className="lg:sticky lg:top-28 lg:self-start">
                <OrderSummary subtotal={subtotal} itemCount={itemCount} />
                <Button href="/checkout" variant="filled" className="mt-5 w-full">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
