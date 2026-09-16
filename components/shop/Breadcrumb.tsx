import Link from "next/link";

export type Crumb = { label: string; href?: string };

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-taupe">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="hover:text-espresso transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-espresso font-medium">{item.label}</span>
          )}
          {i < items.length - 1 && <span className="text-taupe/50">/</span>}
        </span>
      ))}
    </nav>
  );
}
