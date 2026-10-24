const fs = require('fs');
const path = require('path');

function save(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log('✓ Fixed:', filePath);
}

// 1. FIX STRUCTURED DATA (Adds missing faqJsonLd)
save('src/lib/structured-data.ts', `
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((x, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: x.name,
      item: absoluteUrl(x.path),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((x) => ({
      "@type": "Question",
      name: x.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: x.answer,
      },
    })),
  };
}
`);

// 2. FIX REPOSITORY (Adds missing findCategory and listItemsByCategory)
save('src/lib/repository.ts', `
import { getDatabase } from "@/lib/db";

export type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
};

export type MenuRow = {
  id: string;
  category_id: string;
  category_name: string;
  category_slug: string;
  name: string;
  slug: string;
  description: string | null;
  status: string;
  last_checked: string | null;
  image_url: string | null;
  image_alt: string | null;
  price_text: string | null;
};

export type NutritionRow = {
  menu_item_id: string;
  serving_size: string | null;
  calories: number | null;
  total_fat_g: number | null;
  saturated_fat_g: number | null;
  cholesterol_mg: number | null;
  sodium_mg: number | null;
  carbs_g: number | null;
  sugar_g: number | null;
  protein_g: number | null;
  verified_at: string | null;
  captured_at: string | null;
};

export type CategoryItemRow = MenuRow & {
  calories: number | null;
  protein_g: number | null;
  sodium_mg: number | null;
  verified_at: string | null;
};

const MENU_SELECT = "SELECT mi.id,mi.category_id,mc.name AS category_name,mc.slug AS category_slug,mi.name,mi.slug,mi.description,mi.status,mi.last_checked,mi.image_url,mi.image_alt,mi.price_text FROM menu_items mi JOIN menu_categories mc ON mc.id=mi.category_id";
const NUTRITION_SELECT = "n.menu_item_id,n.serving_size,n.calories,n.total_fat_g,n.saturated_fat_g,n.cholesterol_mg,n.sodium_mg,n.carbs_g,n.sugar_g,n.protein_g,n.verified_at,n.captured_at";

export async function listCategories(env?: Record<string, unknown>): Promise<CategoryRow[]> {
  const db = getDatabase(env);
  const result = await db.prepare("SELECT id,name,slug,description,sort_order FROM menu_categories ORDER BY sort_order ASC").all() as { results?: CategoryRow[] };
  return result.results ?? [];
}

export async function findCategory(env: Record<string, unknown> | undefined, slug: string): Promise<CategoryRow | null> {
  const db = getDatabase(env);
  const result = await db.prepare("SELECT id,name,slug,description,sort_order FROM menu_categories WHERE slug = ?").bind(slug).all() as { results?: CategoryRow[] };
  return result.results?.[0] ?? null;
}

export async function listMenuItems(env?: Record<string, unknown>): Promise<MenuRow[]> {
  const db = getDatabase(env);
  const result = await db.prepare(MENU_SELECT + " WHERE mi.status != 'archived' ORDER BY mc.sort_order ASC,mi.name ASC").all() as { results?: MenuRow[] };
  return result.results ?? [];
}

export async function listItemsByCategory(env: Record<string, unknown> | undefined, slug: string): Promise<CategoryItemRow[]> {
  const db = getDatabase(env);
  const result = await db.prepare("SELECT mi.id,mi.category_id,mc.name AS category_name,mc.slug AS category_slug,mi.name,mi.slug,mi.description,mi.status,mi.last_checked,mi.image_url,mi.image_alt,mi.price_text,n.calories,n.protein_g,n.sodium_mg,n.verified_at FROM menu_items mi JOIN menu_categories mc ON mc.id=mi.category_id LEFT JOIN nutrition n ON n.id = (SELECT id FROM nutrition WHERE menu_item_id = mi.id ORDER BY verified_at DESC LIMIT 1) WHERE mc.slug = ? AND mi.status != 'archived' ORDER BY mi.name ASC").bind(slug).all() as { results?: CategoryItemRow[] };
  return result.results ?? [];
}

export async function findMenuItem(env: Record<string, unknown> | undefined, slug: string): Promise<MenuRow | null> {
  const db = getDatabase(env);
  const result = await db.prepare(MENU_SELECT + " WHERE mi.slug = ? AND mi.status != 'archived'").bind(slug).all() as { results?: MenuRow[] };
  return result.results?.[0] ?? null;
}

export async function getNutritionForItem(env: Record<string, unknown> | undefined, menuItemId: string): Promise<NutritionRow | null> {
  const db = getDatabase(env);
  const result = await db.prepare("SELECT " + NUTRITION_SELECT + " FROM nutrition n WHERE n.menu_item_id = ? ORDER BY n.verified_at DESC LIMIT 1").bind(menuItemId).all() as { results?: NutritionRow[] };
  return result.results?.[0] ?? null;
}

export async function listNutrition(env?: Record<string, unknown>): Promise<(MenuRow & NutritionRow)[]> {
  const db = getDatabase(env);
  const result = await db.prepare("SELECT mi.id,mi.category_id,mc.name AS category_name,mc.slug AS category_slug,mi.name,mi.slug,mi.description,mi.status,mi.last_checked,mi.image_url,mi.image_alt,mi.price_text," + NUTRITION_SELECT + " FROM menu_items mi JOIN menu_categories mc ON mc.id=mi.category_id JOIN nutrition n ON n.menu_item_id=mi.id WHERE mi.status != 'archived' ORDER BY mc.sort_order ASC,mi.name ASC").all() as { results?: ((MenuRow & NutritionRow)[]) };
  return result.results ?? [];
}
`);

// 3. FIX CATEGORY PAGE (Explicit typing for items)
save('src/app/menu/category/[slug]/page.tsx', `
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
        {items.map((item: CategoryItemRow) => (
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