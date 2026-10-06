import type { MetadataRoute } from "next";

const SITE = "https://cookout-menu-platform.syedahtishamshahg.workers.dev";

const staticPaths = ["/","/menu/","/menu/prices/","/nutrition/","/locations/","/hours/","/tools/","/tools/tray-builder/","/tools/shake-mixer/","/about/","/methodology/","/sources/","/contact/","/privacy/","/terms/","/disclaimer/","/ai/","/search/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPaths.map((path) => ({ url: SITE + path }));
}
