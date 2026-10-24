export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://cookout-menu-platform.syedahtishamshahg.workers.dev";
export const SITE_NAME = "Cook Out Menu";
export const SITE_DESCRIPTION =
  "Independent, unofficial Cook Out menu, nutrition, prices, locations and practical tools.";

export function absoluteUrl(path: string) {
  const base = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function webPageJsonLd(name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url: absoluteUrl(path),
    description,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };
}