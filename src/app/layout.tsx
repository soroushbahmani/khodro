import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { brand } from "@/data/site";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/seo";
import { Header, Footer } from "@/components/Chrome";
import Providers from "@/components/Providers";
import Assistant from "@/components/Assistant";
import { BottomNav, ScrollProgress } from "@/components/Client";
import { cn } from "@/lib/utils";


const vazir = localFont({
  src: "../fonts/Vazirmatn.woff2",
  variable: "--font-vazir",
  display: "swap",
  weight: "100 900",
});

const DESC = "کارشناسی و بازدید تخصصی خودرو، خرید غیابی و خدمات VIP؛ با گزارش شفاف و نمره‌ی ۰ تا ۱۰۰. ایجنت هوشمند خودروگرافی در دایرکت اینستاگرام پاسخ می‌دهد.";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} | ${brand.tagline}`, template: `%s | ${SITE_NAME}` },
  description: DESC,
  applicationName: SITE_NAME,
  keywords: ["کارشناسی خودرو", "خرید غیابی خودرو", "خدمات VIP خودرو", "خودروگرافی", "khodrography", "بازدید خودرو", "نمره خودرو"],
  authors: [{ name: "مجید باقرزاده" }],
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  icons: { icon: [{ url: "/icon.png" }, { url: "/icon-192.png", sizes: "192x192" }], apple: "/apple-touch-icon.png" },
  appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
  openGraph: { type: "website", locale: "fa_IR", siteName: SITE_NAME, url: "/", title: `${SITE_NAME} | ${brand.tagline}`, description: DESC, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: `${SITE_NAME} | ${brand.tagline}`, description: DESC, images: [OG_IMAGE.url] },
  robots: { index: true, follow: true },
  other: { "instagram:handle": brand.handle },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  alternateName: "khodrography",
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  logo: `${SITE_URL}/brand/avatar.jpg`,
  description: DESC,
  sameAs: [brand.instagram],
  areaServed: "IR",
  serviceType: ["کارشناسی خودرو", "خرید غیابی خودرو", "خدمات VIP خودرو", "مشاوره فروش خودرو"],
};
export const viewport: Viewport = { themeColor: "#0d1015", viewportFit: "cover", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={cn("font-sans", vazir.variable)} suppressHydrationWarning>
      <body className="antialiased pb-24 md:pb-0">
        <Providers>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-50 focus:bg-yellow focus:text-ink focus:px-3 focus:py-2 focus:rounded">پرش به محتوا</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BottomNav />
        <Assistant />
        </Providers>
      </body>
    </html>
  );
}
