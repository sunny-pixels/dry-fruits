"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import OrderSummary from "@/components/cart/OrderSummary";
import { useCart } from "@/lib/cart-context";

const inputClass =
  "w-full rounded-2xl border border-espresso/15 bg-cream px-5 py-3.5 text-sm text-espresso placeholder:text-taupe/60 outline-none transition-colors focus:border-amber";

function generateOrderNumber() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `RAHULIMPEX-${Date.now().toString().slice(-6)}${rand}`;
}

export default function CheckoutPage() {
  const { items, subtotal, itemCount, clear } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;

    const orderSnapshot = {
      orderNumber: generateOrderNumber(),
      name: String(formData.get("fullName") ?? ""),
      items: items.map((i) => ({
        name: i.name,
        variantLabel: i.variantLabel,
        qty: i.qty,
        price: i.price,
      })),
      itemCount,
      subtotal,
      shipping,
      total: subtotal + shipping,
    };

    try {
      sessionStorage.setItem("rahul-impex-last-order", JSON.stringify(orderSnapshot));
    } catch {
      // ignore
    }

    clear();
    router.push("/checkout/confirmation");
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-32 pb-24 lg:pt-40 lg:pb-32">
          <Container className="flex flex-col items-center gap-6 rounded-[28px] bg-cocoa/[0.04] py-24 text-center">
            <p className="font-heading text-lg font-semibold text-espresso">
              Your cart is empty
            </p>
            <p className="text-sm text-taupe">Add something to your cart before checking out.</p>
            <Button href="/shop" variant="filled">
              Shop Now
            </Button>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <Container>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-espresso">Checkout</h1>

          <form
            onSubmit={handleSubmit}
            className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-5"
            >
              <h2 className="font-heading text-lg font-semibold text-espresso">
                Shipping Details
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <input name="fullName" required placeholder="Full Name" className={inputClass} />
                <input
                  name="phone"
                  required
                  type="tel"
                  placeholder="Phone Number"
                  className={inputClass}
                />
              </div>

              <input name="email" required type="email" placeholder="Email" className={inputClass} />
              <input name="address" required placeholder="Address" className={inputClass} />

              <div className="grid gap-5 sm:grid-cols-3">
                <input name="city" required placeholder="City" className={inputClass} />
                <input name="state" required placeholder="State" className={inputClass} />
                <input name="pin" required placeholder="PIN Code" className={inputClass} />
              </div>

              <p className="mt-2 text-xs text-taupe">
                Payment: Cash on Delivery. This is a demo checkout — no payment is processed.
              </p>
            </motion.div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <OrderSummary subtotal={subtotal} itemCount={itemCount} />
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-5 w-full rounded-full bg-espresso px-8 py-4 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-cocoa disabled:opacity-60"
              >
                {submitting ? "Placing Order…" : "Place Order"}
              </motion.button>
            </div>
          </form>
        </Container>
      </main>
      <Footer />
    </>
  );
}
