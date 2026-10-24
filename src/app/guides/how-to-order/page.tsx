import Link from "next/link";
import type { Metadata } from "next";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "How to Order at Cook Out (Drive-Thru & Tray Guide 2026)",
  description: "Complete guide on how to order at Cook Out like a local. Master the Cook Out Tray, burger styles, side upgrades, and milkshake mixing.",
  alternates: { canonical: "/guides/how-to-order/" },
};

const faqs = [
  {
    question: "What comes in a standard Cook Out Tray?",
    answer: "A standard Cook Out Tray includes 1 Main (Big Double Burger, BBQ Sandwich, 2 Hot Dogs, or Chicken Strips), 2 Sides (e.g. Cajun fries, hushpuppies, onion rings, corndog, or quesadilla), and 1 regular drink or Cheerwine float.",
  },
  {
    question: "Can you swap your tray drink for a milkshake?",
    answer: "Yes. You can upgrade your tray drink to any of the 40+ fresh-made milkshake flavors for a small additional charge (usually around $1.50 - $2.00 depending on location).",
  },
  {
    question: "What does 'Cook Out Style' mean?",
    answer: "Cook Out Style means your burger or hot dog comes topped with homemade Southern chili, creamy coleslaw, yellow mustard, and freshly diced onions.",
  },
  {
    question: "Can you get two of the same side on a tray?",
    answer: "Yes! You can 'double up' on sides, such as getting double Cajun fries, double hushpuppies, or double onion rings.",
  },
];

export default function HowToOrder() {
  return (
    <main className="container section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <div className="eyebrow">Drive-Thru Masterclass</div>
      <h1>How to Order at Cook Out: The Complete Guide</h1>
      <p style={{ maxWidth: 740 }}>
        The double drive-thru lines at Cook Out move at lightning speed. If you are ordering for the first time, this guide explains how the Tray formula works, how to order burger styles, and how to get maximum value.
      </p>

      <div className="card" style={{ marginTop: 28 }}>
        <h2>The Golden Rule: Always Order the Cook Out Tray</h2>
        <p>
          Buying items individually (a-la-carte) can add up quickly. The <strong>Cook Out Tray</strong> is widely considered the best value meal in American fast food:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 16 }}>
          <div style={{ background: "var(--paper)", padding: 16, borderRadius: 12 }}>
            <strong>1. Choose 1 Main</strong>
            <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>Big Double Burger, 2 Hot Dogs, BBQ Sandwich, Chicken Strips, or Quesadilla.</p>
          </div>
          <div style={{ background: "var(--paper)", padding: 16, borderRadius: 12 }}>
            <strong>2. Choose 2 Sides</strong>
            <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>Fries (regular or Cajun), Hushpuppies, Onion Rings, Corn Dog, Wrap, or Quesadilla.</p>
          </div>
          <div style={{ background: "var(--paper)", padding: 16, borderRadius: 12 }}>
            <strong>3. Choose 1 Drink</strong>
            <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>Freshly brewed Sweet Tea, Cheerwine Float, soda, or upgrade to a shake.</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h2>Burger Styles Decoded</h2>
        <p>Rather than naming toppings one by one, tell the speaker box your preferred style:</p>
        <ul style={{ lineHeight: 1.8, marginTop: 10 }}>
          <li><strong>Cook Out Style:</strong> Southern chili, creamy coleslaw, mustard, and diced onions.</li>
          <li><strong>Out West Style:</strong> Smoky BBQ sauce, crispy bacon, grilled onions, and cheddar cheese.</li>
          <li><strong>Cheddar Style:</strong> Creamy cheddar cheese sauce, bacon, and grilled onions.</li>
          <li><strong>Steak Style:</strong> A.1. steak sauce, grilled onions, crisp lettuce, and fresh tomato.</li>
        </ul>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq) => (
          <div key={faq.question} style={{ marginTop: 16, borderTop: "1px solid var(--line)", paddingTop: 14 }}>
            <h3 style={{ fontSize: 18 }}>{faq.question}</h3>
            <p className="muted" style={{ marginTop: 4 }}>{faq.answer}</p>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 32 }}>
        <Link href="/tools/tray-builder/" className="btn btn-dark">Open Tray Builder Tool →</Link>
        {" "}
        <Link href="/nutrition/" className="btn btn-light" style={{ marginLeft: 8 }}>View Nutrition Table</Link>
      </p>
    </main>
  );
}