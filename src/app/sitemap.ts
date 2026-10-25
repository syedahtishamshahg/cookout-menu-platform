import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { menuItems } from "@/lib/menu";

export const dynamic = "force-dynamic";

const staticPaths = [
  "/",
  "/menu/",
  "/shakes/",
  "/nutrition/",
  "/menu/prices/",
  "/hours/",
  "/locations/",
  "/tools/",
  "/tools/tray-builder/",
  "/tools/shake-mixer/",
  "/guides/how-to-order/",
  "/guides/allergens/",
  "/about/",
  "/methodology/",
  "/sources/",
  "/contact/",
  "/privacy/",
  "/terms/",
  "/disclaimer/",
  "/ai/",
  "/search/",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = new Set<string>(staticPaths);

  // Add all 110+ menu item URLs to the sitemap
  for (const item of menuItems) {
    paths.add("/menu/" + item.slug);
  }

  return Array.from(paths).map((path) => ({
    url: SITE_URL + (path === "/" ? "/" : path.endsWith("/") ? path : path + "/"),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1.0 : path.startsWith("/menu/") ? 0.8 : 0.6,
  }));
}