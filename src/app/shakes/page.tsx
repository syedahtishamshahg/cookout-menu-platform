import Link from "next/link";
import type { Metadata } from "next";
import { menuItems } from "@/lib/menu";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Cook Out Milkshake Flavors (Complete 40+ Menu & Calories 2026)",
  description: "Explore the complete official list of all 40+ Cook Out fancy milkshake flavors, seasonal specials (Fresh Watermelon), calories, and secret mixing combinations.",
  alternates: { canonical: "/shakes/" },
};

const shakeFaqs = [
  {
    question: "How many milkshake flavors does Cook Out have?",
    answer: "Cook Out famously serves over 40 distinct handcrafted milkshake flavors year-round, along with rotating seasonal favorites like Fresh Watermelon in July/August and Fresh Eggnog in December.",
  },
  {
    question: "Can you mix two milkshake flavors at Cook Out?",
    answer: "Yes! Cook Out happily lets customers mix and match any two flavors (like Peanut Butter and Banana, or Oreo and Mint) at no extra cost.",
  },
  {
    question: "How much does a Cook Out milkshake cost in 2026?",
    answer: "An individual 16oz Cook Out Fancy Milkshake typically costs between $3.99 and $4.69 depending on location. Upgrading your tray drink to a milkshake usually costs around $1.75 to $2.00.",
  },
  {
    question: "What is the most popular Cook Out milkshake?",
    answer: "The Oreo Milkshake, Banana Pudding Milkshake (made with real Nilla wafers), and Reese's Cup Milkshake consistently rank as Cook Out's most popular flavors.",
  },
];

export default function ShakesPage() {
  const shakes = menuItems.filter((item) => item.category === "Milkshakes");

  return (
    <main className="container section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(shakeFaqs)) }} />

      <nav aria-label="Breadcrumb" className="muted">
        <Link href="/">Home</Link> / <Link href="/menu/">Menu</Link> / <span>Milkshakes</span>
      </nav>

      <div className="eyebrow" style={{ marginTop: 16 }}>The 40+ Fancy Milkshake Bible</div>
      <h1>Official Cook Out Milkshake Flavors & Calories</h1>
      <p style={{ maxWidth: 760, fontSize: 17, lineHeight: 1.7 }} className="muted">
        Cook Out is legendary across the Southeast for its hand-spun, thick milkshakes made with real dairy soft-serve, fresh fruit chunks, and crushed brand-name candy bars.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginTop: 32 }}>
        {shakes.map((shake) => (
          <div key={shake.slug} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span className="kicker">40+ FANCY SHAKE</span>
                {shake.price_text && <span style={{ fontSize: 13, fontWeight: 700 }}>{shake.price_text}</span>}
              </div>
              <h2 style={{ fontSize: 20, margin: "8px 0" }}>{shake.name}</h2>
              <p className="muted" style={{ fontSize: 13, lineHeight: 1.6 }}>{shake.description}</p>
            </div>
            {shake.nutrition && (
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700 }}>
                <span style={{ color: "var(--red)" }}>{shake.nutrition.calories} Calories</span>
                <span>{shake.nutrition.protein_g}g Protein</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 40, padding: 32 }}>
        <h2>Secret Menu: Popular Milkshake Flavor Combos</h2>
        <p className="muted" style={{ marginTop: 8 }}>
          Cook Out allows you to combine any two flavors at the speaker box. Here are customer-favorite combinations:
        </p>
        <ul style={{ lineHeight: 2, marginTop: 12, paddingLeft: 20 }}>
          <li><strong>Oreo + Peanut Butter:</strong> Tastes like a chocolate-peanut butter dessert bar.</li>
          <li><strong>Banana Pudding + Strawberry:</strong> Creamy banana wafer base layered with fresh strawberries.</li>
          <li><strong>Caramel + Heath Toffee:</strong> Rich buttery crunch for caramel lovers.</li>
          <li><strong>Chocolate + Mint:</strong> Classic cooling peppermint chocolate chip flavor.</li>
        </ul>
      </div>

      <div className="card" style={{ marginTop: 24, padding: 32 }}>
        <h2>Milkshake Frequently Asked Questions</h2>
        {shakeFaqs.map((faq) => (
          <div key={faq.question} style={{ marginTop: 16, borderTop: "1px solid var(--line)", paddingTop: 14 }}>
            <h3 style={{ fontSize: 18 }}>{faq.question}</h3>
            <p className="muted" style={{ marginTop: 4 }}>{faq.answer}</p>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 32 }}>
        <Link href="/tools/shake-mixer/" className="btn btn-dark">Open Interactive Shake Mixer →</Link>
        {" "}
        <Link href="/menu/" className="btn btn-light" style={{ marginLeft: 8 }}>View Full Menu</Link>
      </p>
    </main>
  );
}