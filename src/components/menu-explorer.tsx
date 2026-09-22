"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Item = {
  slug: string;
  name: string;
  description?: string | null;
  category_name?: string | null;
  last_checked?: string | null;
};

export default function MenuExplorer({ items }: { items: Item[] }) {
  const categories = Array.from(new Set(items.map((item) => item.category_name || "Other")));
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "All" || (item.category_name || "Other") === category;
      const haystack = item.name + " " + (item.description || "") + " " + (item.category_name || "");
      return matchesCategory && (!q || haystack.toLowerCase().includes(q));
    });
  }, [items, query, category]);

  return (
    <section className="menu-explorer">
      <div className="container">
        <div className="menu-toolbar">
          <label className="menu-search">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search burgers, chicken, wraps..." aria-label="Search menu" />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button>}
          </label>
          <div className="menu-filters" aria-label="Menu categories">
            <button className={category === "All" ? "active" : ""} onClick={() => setCategory("All")}>All</button>
            {categories.map((name) => (
              <button key={name} className={category === name ? "active" : ""} onClick={() => setCategory(name)}>{name}</button>
            ))}
          </div>
        </div>

        <div className="menu-results-head">
          <div><div className="kicker">Browse the menu</div><h2>{category === "All" ? "Everything published" : category}</h2></div>
          <span className="result-count">{filtered.length} {filtered.length === 1 ? "item" : "items"}</span>
        </div>

        {filtered.length > 0 ? (
          <div className="menu-card-grid">
            {filtered.map((item) => (
              <Link className="menu-item-card" href={"/menu/" + item.slug} key={item.slug}>
                <div className="menu-item-art" aria-hidden="true"><span>{(item.category_name || "Menu").slice(0, 1).toUpperCase()}</span></div>
                <div className="menu-item-content">
                  <div className="menu-item-meta"><span>{item.category_name || "Menu"}</span>{item.last_checked && <span>Checked {item.last_checked}</span>}</div>
                  <h3>{item.name}</h3>
                  <p>{item.description || "Explore this item for available details, nutrition and sources."}</p>
                  <span className="menu-item-link">View details <b>→</b></span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="menu-empty">
            <div className="menu-empty-icon">⌕</div><h3>No menu items found</h3>
            <p>Try a different search or category. We only show items currently published in our source-backed database.</p>
            <button className="btn btn-dark" onClick={() => { setQuery(""); setCategory("All"); }}>Reset filters</button>
          </div>
        )}

        <div className="menu-disclaimer">
          <strong>Pricing note</strong>
          <span>We do not invent a national price. When verified location-specific pricing is available, it will be shown with its source and verification date.</span>
        </div>
      </div>
    </section>
  );
}
