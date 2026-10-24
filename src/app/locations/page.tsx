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