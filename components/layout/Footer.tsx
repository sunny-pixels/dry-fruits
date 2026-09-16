import Container from "@/components/ui/Container";
import { footerInfo, socials } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream">
      <Container className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <p className="font-heading text-2xl font-bold">Nutrafi.</p>
          <p className="mt-4 text-sm text-cream/60 max-w-[220px]">
            Premium dry fruits, handpicked and naturally dried for you.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-4">Store Hours</p>
          <p className="text-sm text-cream/60">Daily: 09:00 – 21:00</p>
        </div>
        <div>
          <p className="font-semibold mb-4">Information</p>
          <ul className="space-y-2">
            {footerInfo.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="text-sm text-cream/60 hover:text-cream transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-4">Follow Us</p>
          <ul className="space-y-2">
            {socials.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="text-sm text-cream/60 hover:text-cream transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-cream/10">
        <Container className="py-5 text-xs text-cream/40">
          © {new Date().getFullYear()} Nutrafi. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
