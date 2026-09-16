"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import type { Category } from "@/lib/products";

type Heights = { collapsed: number; expanded: number };

function getHeights(): Heights {
  if (typeof window === "undefined") return { collapsed: 112, expanded: 380 };
  const w = window.innerWidth;
  if (w < 640) return { collapsed: 84, expanded: 260 };
  if (w < 1024) return { collapsed: 96, expanded: 320 };
  return { collapsed: 112, expanded: 380 };
}

export default function CategoryAccordion({
  categories,
}: {
  categories: (Category & { count: number })[];
}) {
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndex = useRef<number | null>(null);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // One-time read of matchMedia, unavailable during SSR — cannot be computed at render time.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(window.matchMedia("(hover: none)").matches);

    // Defensively clear any stale transform state (e.g. left over from HMR during
    // development) before applying the real initial values below.
    gsap.set([...rowRefs.current, ...revealRefs.current, ...imageRefs.current], {
      clearProps: "transform",
    });

    const { collapsed } = getHeights();
    gsap.set(rowRefs.current, { height: collapsed, x: 0 });
    gsap.set(revealRefs.current, { opacity: 0, y: 16, x: 0 });
    gsap.set(imageRefs.current, { scale: 1.1, x: 0 });

    const onResize = () => {
      const heights = getHeights();
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const isActive = activeIndex.current === i;
        gsap.set(row, { height: isActive ? heights.expanded : heights.collapsed });
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const activate = (index: number) => {
    if (activeIndex.current === index) return;
    const prevIndex = activeIndex.current;
    const { collapsed, expanded } = getHeights();

    if (prevIndex !== null) {
      const prevRow = rowRefs.current[prevIndex];
      const prevReveal = revealRefs.current[prevIndex];
      const prevImage = imageRefs.current[prevIndex];
      if (prevRow) gsap.to(prevRow, { height: collapsed, duration: 0.6, ease: "power3.out" });
      if (prevReveal)
        gsap.to(prevReveal, { opacity: 0, y: 16, duration: 0.35, ease: "power2.out" });
      if (prevImage) gsap.to(prevImage, { scale: 1.1, duration: 0.6, ease: "power3.out" });
    }

    const row = rowRefs.current[index];
    const reveal = revealRefs.current[index];
    const image = imageRefs.current[index];
    if (row) gsap.to(row, { height: expanded, duration: 0.6, ease: "power3.out" });
    if (reveal)
      gsap.to(reveal, { opacity: 1, y: 0, duration: 0.5, delay: 0.12, ease: "power3.out" });
    if (image) gsap.to(image, { scale: 1, duration: 0.7, ease: "power3.out" });

    activeIndex.current = index;
  };

  const deactivateAll = () => {
    const index = activeIndex.current;
    if (index === null) return;
    const { collapsed } = getHeights();

    const row = rowRefs.current[index];
    const reveal = revealRefs.current[index];
    const image = imageRefs.current[index];
    if (row) gsap.to(row, { height: collapsed, duration: 0.6, ease: "power3.out" });
    if (reveal) gsap.to(reveal, { opacity: 0, y: 16, duration: 0.35, ease: "power2.out" });
    if (image) gsap.to(image, { scale: 1.1, duration: 0.6, ease: "power3.out" });

    activeIndex.current = null;
  };

  const handleContainerMouseLeave = () => {
    if (isTouch) return;
    leaveTimeout.current = setTimeout(deactivateAll, 220);
  };

  const cancelLeave = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
  };

  const handleRowClick = (e: React.MouseEvent, index: number) => {
    if (isTouch && activeIndex.current !== index) {
      e.preventDefault();
      activate(index);
    }
  };

  return (
    <div
      className="flex flex-col overflow-hidden rounded-[28px] bg-cream ring-1 ring-espresso/10"
      onMouseLeave={handleContainerMouseLeave}
      onMouseEnter={cancelLeave}
    >
      {categories.map((category, i) => (
        <Link
          key={category.slug}
          href={`/shop/${category.slug}`}
          ref={(el) => {
            rowRefs.current[i] = el;
          }}
          onMouseEnter={() => !isTouch && activate(i)}
          onClick={(e) => handleRowClick(e, i)}
          onFocus={() => activate(i)}
          className={`group flex w-full items-stretch overflow-hidden transition-colors duration-300 hover:bg-amber/[0.05] ${
            i > 0 ? "border-t border-espresso/10" : ""
          }`}
          style={{ height: 112 }}
        >
          <div className="flex min-w-0 flex-1 flex-col justify-start p-6 sm:p-8 lg:p-10">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-taupe">
              {category.count} {category.count === 1 ? "Item" : "Items"}
            </span>
            <h3 className="mt-1 font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-espresso">
              {category.name}
            </h3>

            <div
              ref={(el) => {
                revealRefs.current[i] = el;
              }}
              className="mt-4 opacity-0"
            >
              <p className="max-w-md text-sm sm:text-base text-taupe">{category.tagline}</p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-2.5 text-sm font-semibold text-cream transition-colors group-hover:bg-amber">
                Explore
                <span aria-hidden>&#8594;</span>
              </span>
            </div>
          </div>

          <div className="my-3 mr-3 w-24 shrink-0 overflow-hidden rounded-2xl sm:my-4 sm:mr-4 sm:w-36 lg:my-5 lg:mr-6 lg:w-56">
            <div
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              className="relative h-full w-full"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 224px, (min-width: 640px) 144px, 96px"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
