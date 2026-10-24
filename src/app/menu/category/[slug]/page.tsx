import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findCategory, listItemsByCategory, type CategoryItemRow } from "@/lib/repository";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await findCategory(undefined, slug);
  if (!category) return { title: "Category Not Found | Cook Out Menu" };
  return {
    title: `Cook Out ${category.name} Menu, Prices & Nutrition (2026)`,
    description: category.description || `Explore all Cook Out ${category.name} items, calories, protein, and ordering details.`,
    alternates: { canonical: `/menu/category/${category.slug}/` },
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
    { name: category.name, path: `/menu/category/${category.slug}/` },
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
        {category.description || `Browse all verified items in the Cook Out ${category.name} section. Includes calories, macros, and ordering details.`}
      </p>

      <div className="menu-card-grid" style={{ marginTop: 32 }}>
        {items.map((item: CategoryItemRow) => (
          <Link className="menu-item-card" href={`/menu/${item.slug}`} key={item.slug}>
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
                  {item.calories} cal {item.protein_g != null ? `· ${item.protein_g}g protein` : ""}
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