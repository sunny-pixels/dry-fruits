"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";

type OrderSnapshot = {
  orderNumber: string;
  name: string;
  items: { name: string; variantLabel: string; qty: number; price: number }[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
};

export default function ConfirmationPage() {
  const [order, setOrder] = useState<OrderSnapshot | null | undefined>(undefined);

  useEffect(() => {
    // One-time read of browser storage, unavailable during SSR — cannot be computed at render time.
    try {
      const raw = sessionStorage.getItem("rahul-impex-last-order");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrder(raw ? JSON.parse(raw) : null);
    } catch {
      setOrder(null);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <Container className="flex flex-col items-center text-center">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-amber/12 text-amber"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9">
              <path
                d="M5 12.5 10 17l9-10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 font-heading text-3xl sm:text-4xl font-bold text-espresso"
          >
            {order?.name ? `Thank you, ${order.name.split(" ")[0]}!` : "Thank you for your order!"}
          </motion.h1>

          {order ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-4 flex flex-col items-center gap-1"
            >
              <p className="text-taupe">
                Order <span className="font-semibold text-espresso">{order.orderNumber}</span> has
                been placed.
              </p>
              <p className="text-sm text-taupe">
                We&apos;ll send delivery updates to your email and phone.
              </p>
            </motion.div>
          ) : (
            <p className="mt-4 text-taupe">Your order has been placed successfully.</p>
          )}

          {order && order.items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-10 w-full max-w-md rounded-[28px] bg-cocoa/[0.04] p-6 text-left sm:p-8"
            >
              <p className="font-heading text-sm font-semibold text-espresso">Order Summary</p>
              <div className="mt-4 flex flex-col gap-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-taupe">
                      {item.name} ({item.variantLabel}) × {item.qty}
                    </span>
                    <span className="font-medium text-espresso">
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between border-t border-espresso/10 pt-4">
                <span className="font-heading font-semibold text-espresso">Total</span>
                <span className="font-heading font-bold text-espresso">
                  {formatPrice(order.total)}
                </span>
              </div>
            </motion.div>
          )}

          <div className="mt-10">
            <Button href="/shop" variant="filled">
              Continue Shopping
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
