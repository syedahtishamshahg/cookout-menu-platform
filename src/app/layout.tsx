import type { Metadata } from "next";
import "./globals.css";
import AIAssistant from "@/components/ai-assistant";
import ThemeToggle from "@/components/theme-toggle";

export const metadata: Metadata = {
  metadataBase: new URL("https://cookout-menu-platform.syedahtishamshahg.workers.dev"),
  title: { default: "Cook Out Menu & Prices | Nutrition, Locations & Tools", template: "%s | Cook Out Menu" },
  description: "Independent, unofficial Cook Out menu resource with nutrition facts, location-aware price information, useful tools and an AI assistant.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Cook Out Menu & Prices",
    description: "Independent Cook Out menu, nutrition, locations and tools.",
    siteName: "Cook Out Menu",
    url: "https://cookout-menu-platform.syedahtishamshahg.workers.dev/",
  },
  twitter: { card: "summary_large_image", title: "Cook Out Menu & Prices", description: "Independent Cook Out menu and nutrition resource." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <ThemeToggle />
        <AIAssistant />
      </body>
    </html>
  );
}