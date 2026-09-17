import type { Metadata } from "next";
import { Jost, Nunito, Alex_Brush } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import ScrollToTop from "@/components/layout/ScrollToTop";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Rahul Impex | Premium Dry Fruits",
  description:
    "Handpicked, naturally dried, premium quality nuts and dry fruits — sourced with care, packed fresh, delivered to your door.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${nunito.variable} ${alexBrush.variable}`}
    >
      <body className="min-h-full flex flex-col bg-cream text-espresso font-body antialiased">
        <ScrollToTop />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
