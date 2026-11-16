import type { Metadata } from "next";

export const SITE_URL = "https://khodrografi.vercel.app";
export const SITE_NAME = "خودروگرافی";
export const OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630, alt: "خودروگرافی — قبل از خرید، خودرو را بخوان" };

export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "fa_IR", siteName: SITE_NAME, url: path, title: `${title} | ${SITE_NAME}`, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE_NAME}`, description, images: [OG_IMAGE.url] },
  };
}
