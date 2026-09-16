"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

export default function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.3,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-start">
      <span className="font-heading text-3xl sm:text-4xl font-bold text-espresso">
        {display}
        {suffix}
      </span>
      <span className="mt-1 text-sm text-taupe">{label}</span>
    </div>
  );
}
