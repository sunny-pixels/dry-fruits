"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

export default function Button({
  children,
  href = "#",
  variant = "filled",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: "filled" | "outline" | "accent" | "soft";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold tracking-wide transition-all duration-300";
  const styles = {
    filled: "bg-espresso text-cream hover:bg-cocoa hover:shadow-[0_12px_28px_rgba(34,12,1,0.22)]",
    outline:
      "border border-espresso/30 text-espresso hover:border-espresso hover:shadow-[0_12px_28px_rgba(34,12,1,0.1)]",
    accent: "bg-amber text-cream hover:bg-amber-light hover:shadow-[0_12px_28px_rgba(221,118,31,0.35)]",
    soft: "bg-cocoa/[0.06] text-espresso hover:bg-cocoa/[0.1] hover:shadow-[0_12px_28px_rgba(34,12,1,0.1)]",
  }[variant];

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  );
}
