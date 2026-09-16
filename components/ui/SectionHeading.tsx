"use client";

import { motion } from "motion/react";

export default function SectionHeading({
  eyebrow,
  title,
  script,
  subtitle,
  align = "center",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  script?: string;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  const subtleColor = dark ? "text-cream/70" : "text-taupe";
  const eyebrowColor = dark ? "text-cream/50" : "text-taupe/70";

  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`text-xs font-semibold uppercase tracking-[0.3em] ${eyebrowColor}`}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`font-heading text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.05] ${
          dark ? "text-cream" : "text-espresso"
        }`}
      >
        {title}
        {script && (
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-script text-amber text-[1.4em] leading-none ml-2 normal-case font-normal align-middle"
          >
            {script}
          </motion.span>
        )}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={`max-w-xl text-base sm:text-lg ${subtleColor}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
