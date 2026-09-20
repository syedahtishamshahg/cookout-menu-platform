import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cookout-menu-platform.pages.dev"),
  title: { default: "Cook Out Menu & Prices", template: "%s | Cook Out Menu" },
  description: "Independent Cook Out menu, prices, nutrition, locations and interactive tools.",
  robots: { index: true, follow: true },
  openGraph: { type: "website", title: "Cook Out Menu & Prices", description: "Independent Cook Out menu and price intelligence resource." }
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
