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
  variant?: "filled" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold tracking-wide transition-colors";
  const styles =
    variant === "filled"
      ? "bg-espresso text-cream hover:bg-cocoa"
      : "border border-espresso/30 text-espresso hover:border-espresso";

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
