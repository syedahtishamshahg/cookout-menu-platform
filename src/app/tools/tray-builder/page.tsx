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