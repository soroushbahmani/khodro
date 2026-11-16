import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { brand } from "@/data/site";
import { Header, Footer } from "@/components/Chrome";
import { BottomNav, ScrollProgress } from "@/components/Client";

const vazir = localFont({
  src: "../fonts/Vazirmatn.woff2",
  variable: "--font-vazir",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: { default: `${brand.name} | ${brand.tagline}`, template: `%s | ${brand.name}` },
  description: brand.description,
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "خودروگرافی", statusBarStyle: "black-translucent" },
  openGraph: { title: brand.name, description: brand.description, locale: "fa_IR", type: "website" },
};
export const viewport: Viewport = { themeColor: "#0d1015", viewportFit: "cover", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="antialiased pb-24 md:pb-0">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-50 focus:bg-yellow focus:text-ink focus:px-3 focus:py-2 focus:rounded">پرش به محتوا</a>
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
