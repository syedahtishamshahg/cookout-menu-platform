import Link from "next/link";
import type { Metadata } from "next";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Cook Out Menu Prices (2026 Benchmark & Tray Price Guide)",
  description: "Comprehensive Cook Out price guide. Learn current Tray pricing benchmarks ($7.39 - $8.99), burger costs, milkshake upgrade prices, and why prices vary by location.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/menu/prices/" },
};

const priceFaqs = [
  {
    question: "How much does a Cook Out Tray cost in 2026?",
    answer: "Cook Out Trays generally range between $7.39 and $8.99 across most verified locations in North Carolina, South Carolina, Virginia, and Georgia. Prices vary slightly depending on real estate, local taxes, and whether ordering in-store versus delivery apps.",
  },
  {
    question: "Why does Cook Out not publish one national price?",
    answer: "Cook Out is a privately owned chain that keeps drive-thru prices low by minimizing national corporate overhead and marketing fees. Each regional distribution network adjusts pricing locally.",
  },
  {
    question: "How much is a milkshake upgrade on a Tray?",
    answer: "Upgrading your Tray beverage to one of Cook Out's 40+ handcrafted thick milkshakes usually adds between $1.50 and $2.20 to the total tray price.",
  },
];

export default function PricesPage() {
  return (
    <main className="container section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(priceFaqs) }} />
      <div className="eyebrow">Price Intelligence</div>
      <h1>Cook Out Menu Prices & Tray Value Index</h1>
      <p style={{ maxWidth: 740 }}>
        Unlike aggregator websites that fabricate uniform national prices, we document verified regional price benchmarks and store observations across the Southeast.
      </p>

      <div className="grid" style={{ marginTop: 28 }}>
        <div className="card">
          <span className="kicker">SIGNATURE VALUE</span>
          <h2 style={{ marginTop: 8 }}>Cook Out Tray</h2>
          <strong style={{ fontSize: 32, display: "block", color: "var(--red)", margin: "8px 0" }}>$7.39 – $8.99*</strong>
          <p className="muted" style={{ fontSize: 13 }}>
            Includes 1 Main, 2 full-size Sides, and 1 Regular Drink. Unmatched value in modern fast food.
          </p>
        </div>

        <div className="card">
          <span className="kicker">LEGENDARY DESSERT</span>
          <h2 style={{ marginTop: 8 }}>40+ Milkshakes</h2>
          <strong style={{ fontSize: 32, display: "block", color: "var(--red)", margin: "8px 0" }}>$3.99 – $4.69*</strong>
          <p className="muted" style={{ fontSize: 13 }}>
            Made with real ice cream and fresh toppings. Tray upgrade available for approx +$1.75.
          </p>
        </div>

        <div className="card">
          <span className="kicker">A-LA-CARTE</span>
          <h2 style={{ marginTop: 8 }}>Burgers & BBQ</h2>
          <strong style={{ fontSize: 32, display: "block", color: "var(--red)", margin: "8px 0" }}>$2.49 – $5.29*</strong>
          <p className="muted" style={{ fontSize: 13 }}>
            From Small Burgers to the Huge Hamburger and North Carolina Style Pulled Pork BBQ.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 28 }}>
        <h2>Why Prices Vary Across Locations</h2>
        <p>
          When comparing Cook Out prices across North Carolina, South Carolina, Virginia, Georgia, Tennessee, and Alabama, several factors create differences:
        </p>
        <ul style={{ lineHeight: 1.8, marginTop: 12 }}>
          <li><strong>Delivery App Markup:</strong> Third-party delivery platforms frequently inflate menu item prices by 15% to 30% above the direct drive-thru board price.</li>
          <li><strong>In-Store Drive-Thru is Cheapest:</strong> You will always receive the lowest price by ordering directly at the restaurant window.</li>
          <li><strong>Regional Distribution:</strong> Cook Out operates its own meat processing facilities in North Carolina, meaning stores closer to regional supply hubs often have the sharpest price points.</li>
        </ul>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h2>Pricing Frequently Asked Questions</h2>
        {priceFaqs.map((faq) => (
          <div key={faq.question} style={{ marginTop: 16, borderTop: "1px solid var(--line)", paddingTop: 14 }}>
            <h3 style={{ fontSize: 18 }}>{faq.question}</h3>
            <p className="muted" style={{ marginTop: 4 }}>{faq.answer}</p>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 32 }}>
        <Link href="/tools/tray-builder/" className="btn btn-dark">Calculate Tray Calories & Value →</Link>
        {" "}
        <Link href="/sources/" className="btn btn-light" style={{ marginLeft: 8 }}>Review Verification Sources</Link>
      </p>
    </main>
  );
}