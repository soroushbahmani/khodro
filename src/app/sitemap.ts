import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/tools/", "/requirements/", "/prd/", "/demo/", "/wireframe/", "/kit/", "/credits/"].map((p) => ({ url: SITE_URL + p, lastModified: new Date("2026-11-16") }));
}
