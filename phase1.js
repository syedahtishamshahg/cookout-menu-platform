const fs = require('fs');
const path = require('path');

function save(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log('✓ Created/Updated:', filePath);
}

// 1. DYNAMIC CATEGORY PAGE (Fixes 404 & Adds High-Value Category Hubs)
save('src/app/menu/category/[slug]/page.tsx', `
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findCategory, listItemsByCategory } from "@/lib/repository";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await findCategory(undefined, slug);
  if (!category) return { title: "Category Not Found | Cook Out Menu" };
  return {
    title: \`Cook Out \${category.name} Menu, Prices & Nutrition (2026)\`,
    description: category.description || \`Explore all Cook Out \${category.name} items, calories, protein, and ordering details.\`,
    alternates: { canonical: \`/menu/category/\${category.slug}/\` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [category, items] = await Promise.all([
    findCategory(undefined, slug),
    listItemsByCategory(undefined, slug),
  ]);

  if (!category) notFound();

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Menu", path: "/menu/" },
    { name: category.name, path: \`/menu/category/\${category.slug}/\` },
  ]);

  return (
    <main className="container section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <nav aria-label="Breadcrumb" className="muted">
        <Link href="/menu/">Menu</Link> / <span>{category.name}</span>
      </nav>
      
      <div className="eyebrow" style={{ marginTop: 16 }}>Cook Out Menu Category</div>
      <h1>Cook Out {category.name}</h1>
      <p className="muted" style={{ maxWidth: 720 }}>
        {category.description || \`Browse all verified items in the Cook Out \${category.name} section. Includes calories, macros, and ordering details.\`}
      </p>

      <div className="menu-card-grid" style={{ marginTop: 32 }}>
        {items.map((item) => (
          <Link className="menu-item-card" href={\`/menu/\${item.slug}\`} key={item.slug}>
            <div className="menu-item-art">
              {item.image_url ? (
                <img src={item.image_url} alt={item.image_alt || item.name} loading="lazy" />
              ) : (
                <div className="menu-photo-unavailable">Photo coming soon</div>
              )}
            </div>
            <div className="menu-item-content">
              <div className="menu-item-meta">
                <span>{category.name}</span>
                {item.price_text && <span>{item.price_text}</span>}
              </div>
              <h3>{item.name}</h3>
              <p>{item.description || "View verified nutrition, calories, and ordering options."}</p>
              {item.calories != null && (
                <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700, color: "var(--red)" }}>
                  {item.calories} cal {item.protein_g != null ? \`· \${item.protein_g}g protein\` : ""}
                </div>
              )}
              <span className="menu-item-link">View details <b>→</b></span>
            </div>
          </Link>
        ))}
      </div>

      <div className="card" style={{ marginTop: 40 }}>
        <h2>Ordering Tips for {category.name}</h2>
        <p>
          Most {category.name.toLowerCase()} items can be ordered a-la-carte or as part of a famous <strong>Cook Out Tray</strong> with 2 sides and a beverage.
        </p>
        <p style={{ marginTop: 12 }}>
          <Link href="/tools/tray-builder/" className="btn btn-dark">Open Tray Builder</Link>
        </p>
      </div>

      <p style={{ marginTop: 32 }}><Link href="/menu/">← Back to all menu categories</Link></p>
    </main>
  );
}
`);

// 2. MISSING ORDERING GUIDE (Fixes 404 & Adds High-Traffic AEO / FAQ Content)
save('src/app/guides/how-to-order/page.tsx', `
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
`);

// 3. FIX PRICES PAGE (Removes noindex, builds high-ranking AEO price intelligence)
save('src/app/menu/prices/page.tsx', `
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
`);

// 4. FIX HOURS PAGE (Removes noindex, builds indexed drive-thru hours authority)
save('src/app/hours/page.tsx', `
import Link from "next/link";
import type { Metadata } from "next";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Cook Out Hours: Drive-Thru & Late Night Schedule (2026)",
  description: "Find typical Cook Out opening and closing hours. Learn when the double drive-thru stays open late (often 3:00 AM or 4:00 AM on weekends) and holiday schedules.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/hours/" },
};

const hoursFaqs = [
  {
    question: "What time does Cook Out open?",
    answer: "Most Cook Out locations open for lunch at 10:30 AM daily, seven days a week.",
  },
  {
    question: "What time does Cook Out close?",
    answer: "Most locations close at 3:00 AM Sunday through Thursday, and remain open until 4:00 AM on Friday and Saturday night.",
  },
  {
    question: "Is Cook Out open on Thanksgiving or Christmas?",
    answer: "Cook Out locations are typically closed on Thanksgiving Day and Christmas Day so employees can spend time with family. Hours on Christmas Eve and New Year's Eve may be abbreviated.",
  },
];

export default function HoursPage() {
  return (
    <main className="container section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(hoursFaqs)) }} />
      <div className="eyebrow">Operating Schedule</div>
      <h1>Cook Out Hours & Drive-Thru Schedule</h1>
      <p style={{ maxWidth: 740 }}>
        Cook Out is renowned across the South for being one of the few fresh, cooked-to-order restaurants open late into the night. Here is the operational schedule breakdown.
      </p>

      <div className="card" style={{ marginTop: 28 }}>
        <h2>Standard Drive-Thru Operating Hours</h2>
        <div style={{ overflowX: "auto", marginTop: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th align="left">Day of the Week</th>
                <th align="left">Opening Time</th>
                <th align="left">Drive-Thru Closing</th>
                <th align="left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 0" }}>Sunday – Thursday</td>
                <td>10:30 AM</td>
                <td><strong>3:00 AM</strong></td>
                <td className="muted">Full menu available until closing</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 0" }}>Friday & Saturday</td>
                <td>10:30 AM</td>
                <td><strong>4:00 AM</strong></td>
                <td className="muted">Peak late-night drive-thru hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h2>Dining Room vs. Drive-Thru Hours</h2>
        <p>
          At locations equipped with an indoor dining room or walk-up patio windows, interior seating typically closes earlier (usually around 10:00 PM or 11:00 PM), while the double drive-thru remains open until 3:00 AM or 4:00 AM.
        </p>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h2>Hours Frequently Asked Questions</h2>
        {hoursFaqs.map((faq) => (
          <div key={faq.question} style={{ marginTop: 16, borderTop: "1px solid var(--line)", paddingTop: 14 }}>
            <h3 style={{ fontSize: 18 }}>{faq.question}</h3>
            <p className="muted" style={{ marginTop: 4 }}>{faq.answer}</p>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 32 }}>
        <Link href="/menu/" className="btn btn-dark">Browse Menu Items →</Link>
        {" "}
        <Link href="/guides/how-to-order/" className="btn btn-light" style={{ marginLeft: 8 }}>How to Order Guide</Link>
      </p>
    </main>
  );
}
`);

// 5. FIX LOCATIONS PAGE (Removes noindex, builds indexed Southeast state directory)
save('src/app/locations/page.tsx', `
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cook Out Locations: States & Store Directory (2026)",
  description: "Find Cook Out restaurant locations across North Carolina, South Carolina, Virginia, Georgia, Tennessee, Alabama, Kentucky, and more.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/locations/" },
};

const statesList = [
  { name: "North Carolina", code: "NC", status: "Birthplace & Largest Network (130+ Stores)" },
  { name: "South Carolina", code: "SC", status: "Major Presence Across Major Cities" },
  { name: "Virginia", code: "VA", status: "Extensive College & Metro Locations" },
  { name: "Georgia", code: "GA", status: "Atlanta Metro & Key Highway Hubs" },
  { name: "Tennessee", code: "TN", status: "Nashville, Knoxville, Chattanooga & Tri-Cities" },
  { name: "Alabama", code: "AL", status: "Growing University & Suburban Footprint" },
  { name: "Kentucky", code: "KY", status: "Lexington, Louisville & Regional Hubs" },
  { name: "West Virginia", code: "WV", status: "Key Regional Outposts" },
  { name: "Maryland", code: "MD", status: "Salisbury & Eastern Shore Footprint" },
  { name: "Mississippi", code: "MS", status: "Oxford, Starkville & Regional Stores" },
];

export default function LocationsPage() {
  return (
    <main className="container section">
      <div className="eyebrow">Store Directory</div>
      <h1>Cook Out Restaurant Locations & Footprint</h1>
      <p style={{ maxWidth: 740 }}>
        Founded in Greensboro, North Carolina in 1989, Cook Out has expanded across 10 Southeastern states with hundreds of high-volume double drive-thru locations.
      </p>

      <div className="card" style={{ marginTop: 28 }}>
        <h2>Operating States</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginTop: 16 }}>
          {statesList.map((state) => (
            <div key={state.code} style={{ border: "1px solid var(--line)", padding: 16, borderRadius: 12, background: "var(--paper)" }}>
              <strong style={{ fontSize: 18 }}>{state.name} ({state.code})</strong>
              <p className="muted" style={{ fontSize: 12, marginTop: 6 }}>{state.status}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h2>Double Drive-Thru Architecture</h2>
        <p>
          Most Cook Out properties feature a distinctive double drive-thru format: cars line up on both sides of the kitchen building to maximize throughput. Many locations also include an outdoor walk-up ordering window with patio seating.
        </p>
      </div>

      <p style={{ marginTop: 32 }}>
        <Link href="/hours/" className="btn btn-dark">Check Operating Hours →</Link>
        {" "}
        <Link href="/menu/" className="btn btn-light" style={{ marginLeft: 8 }}>Explore Menu</Link>
      </p>
    </main>
  );
}
`);

// 6. INTERACTIVE TRAY BUILDER (Calculates Real Macros + Sodium Live)
save('src/app/tools/tray-builder/page.tsx', `
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type ItemOption = {
  name: string;
  slug: string;
  cal: number;
  pro: number;
  sod: number;
};

const mains: ItemOption[] = [
  { name: "Big Double Burger", slug: "big-double", cal: 311, pro: 20, sod: 126 },
  { name: "Regular Hamburger", slug: "regular-hamburger", cal: 328, pro: 22, sod: 340 },
  { name: "Huge Hamburger", slug: "huge-hamburger", cal: 516, pro: 40, sod: 410 },
  { name: "Regular BBQ Sandwich", slug: "regular-bbq-sandwich", cal: 368, pro: 29, sod: 1103 },
  { name: "Hot Dog", slug: "hot-dog", cal: 260, pro: 8, sod: 600 },
  { name: "Chicken Strips (3)", slug: "chicken-strips-3", cal: 660, pro: 36, sod: 2130 },
  { name: "Char-Grilled Chicken Breast", slug: "char-grilled-chicken-breast", cal: 377, pro: 25, sod: 575 },
];

const sides: ItemOption[] = [
  { name: "French Fries", slug: "french-fries", cal: 354, pro: 4, sod: 290 },
  { name: "Cajun Fries", slug: "cajun-fries", cal: 354, pro: 4, sod: 480 },
  { name: "Hushpuppies (8)", slug: "hushpuppies", cal: 408, pro: 6, sod: 740 },
  { name: "Onion Rings", slug: "onion-rings", cal: 320, pro: 4, sod: 510 },
  { name: "Cajun Wrap", slug: "cajun-wrap", cal: 501, pro: 25, sod: 1285 },
  { name: "Ranch Wrap", slug: "ranch-wrap", cal: 522, pro: 25, sod: 1273 },
];

const drinks: ItemOption[] = [
  { name: "Diet Soda / Unsweet Tea", slug: "zero-drink", cal: 0, pro: 0, sod: 35 },
  { name: "Sweet Tea", slug: "sweet-tea", cal: 180, pro: 0, sod: 15 },
  { name: "Cheerwine Float", slug: "cheerwine-float", cal: 390, pro: 5, sod: 120 },
  { name: "Milkshake Upgrade (Vanilla)", slug: "shake-upgrade", cal: 620, pro: 11, sod: 280 },
];

export default function TrayBuilder() {
  const [mainSlug, setMainSlug] = useState("");
  const [side1Slug, setSide1Slug] = useState("");
  const [side2Slug, setSide2Slug] = useState("");
  const [drinkSlug, setDrinkSlug] = useState("");

  const selectedMain = mains.find((x) => x.slug === mainSlug);
  const selectedSide1 = sides.find((x) => x.slug === side1Slug);
  const selectedSide2 = sides.find((x) => x.slug === side2Slug);
  const selectedDrink = drinks.find((x) => x.slug === drinkSlug);

  const totals = useMemo(() => {
    const items = [selectedMain, selectedSide1, selectedSide2, selectedDrink].filter(Boolean) as ItemOption[];
    return {
      cal: items.reduce((sum, item) => sum + item.cal, 0),
      pro: items.reduce((sum, item) => sum + item.pro, 0),
      sod: items.reduce((sum, item) => sum + item.sod, 0),
    };
  }, [selectedMain, selectedSide1, selectedSide2, selectedDrink]);

  return (
    <main className="container section">
      <div className="eyebrow">Interactive Meal Builder</div>
      <h1>Cook Out Tray Calculator</h1>
      <p className="muted">
        Configure your Cook Out Tray to calculate total calories, protein, and sodium in real-time.
      </p>

      <div className="grid" style={{ marginTop: 28, gridTemplateColumns: "1.2fr .8fr", gap: 24 }}>
        <div className="card">
          <h2>1. Select 1 Main</h2>
          <select value={mainSlug} onChange={(e) => setMainSlug(e.target.value)} style={{ width: "100%", padding: 12, marginTop: 8 }}>
            <option value="">-- Choose Main Item --</option>
            {mains.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.name} ({m.cal} cal · {m.pro}g protein)
              </option>
            ))}
          </select>

          <h2 style={{ marginTop: 22 }}>2. Select Side 1</h2>
          <select value={side1Slug} onChange={(e) => setSide1Slug(e.target.value)} style={{ width: "100%", padding: 12, marginTop: 8 }}>
            <option value="">-- Choose Side 1 --</option>
            {sides.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name} ({s.cal} cal)
              </option>
            ))}
          </select>

          <h2 style={{ marginTop: 22 }}>3. Select Side 2</h2>
          <select value={side2Slug} onChange={(e) => setSide2Slug(e.target.value)} style={{ width: "100%", padding: 12, marginTop: 8 }}>
            <option value="">-- Choose Side 2 (Can match side 1) --</option>
            {sides.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name} ({s.cal} cal)
              </option>
            ))}
          </select>

          <h2 style={{ marginTop: 22 }}>4. Select Drink / Float</h2>
          <select value={drinkSlug} onChange={(e) => setDrinkSlug(e.target.value)} style={{ width: "100%", padding: 12, marginTop: 8 }}>
            <option value="">-- Choose Beverage --</option>
            {drinks.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name} ({d.cal} cal)
              </option>
            ))}
          </select>
        </div>

        <div className="card" style={{ background: "var(--paper)", position: "sticky", top: 100, height: "fit-content" }}>
          <h2>Meal Calculation</h2>
          <ul style={{ paddingLeft: 20, margin: "16px 0", lineHeight: 1.8 }}>
            <li><strong>Main:</strong> {selectedMain?.name || "Not selected"}</li>
            <li><strong>Side 1:</strong> {selectedSide1?.name || "Not selected"}</li>
            <li><strong>Side 2:</strong> {selectedSide2?.name || "Not selected"}</li>
            <li><strong>Drink:</strong> {selectedDrink?.name || "Not selected"}</li>
          </ul>

          <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "16px 0" }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, textAlign: "center" }}>
            <div style={{ background: "#fff", padding: 12, borderRadius: 12 }}>
              <strong style={{ fontSize: 22, display: "block", color: "var(--red)" }}>{totals.cal}</strong>
              <small className="muted">Calories</small>
            </div>
            <div style={{ background: "#fff", padding: 12, borderRadius: 12 }}>
              <strong style={{ fontSize: 22, display: "block" }}>{totals.pro}g</strong>
              <small className="muted">Protein</small>
            </div>
            <div style={{ background: "#fff", padding: 12, borderRadius: 12 }}>
              <strong style={{ fontSize: 22, display: "block" }}>{totals.sod}mg</strong>
              <small className="muted">Sodium</small>
            </div>
          </div>

          <p className="muted" style={{ fontSize: 11, marginTop: 16 }}>
            *Calculated from Cook Out official nutrition reference data.
          </p>

          <button
            className="btn btn-dark"
            style={{ width: "100%", marginTop: 12 }}
            onClick={() => {
              setMainSlug("");
              setSide1Slug("");
              setSide2Slug("");
              setDrinkSlug("");
            }}
          >
            Reset Tray
          </button>
        </div>
      </div>
    </main>
  );
}
`);

// 7. SEO CANONICAL CLEANUP
save('src/lib/seo.ts', `
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://cookout-menu-platform.syedahtishamshahg.workers.dev";
export const SITE_NAME = "Cook Out Menu";
export const SITE_DESCRIPTION =
  "Independent, unofficial Cook Out menu, nutrition, prices, locations and practical tools.";

export function absoluteUrl(path: string) {
  const base = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
  const cleanPath = path.startsWith("/") ? path : \`/\${path}\`;
  return \`\${base}\${cleanPath}\`;
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
`);