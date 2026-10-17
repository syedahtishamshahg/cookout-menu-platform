import { redirect } from "next/navigation";
import { getAdminFromRequest } from "@/lib/admin-auth";
import { getDatabase } from "@/lib/db";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const metadata = { title: "Cook Out Studio · Admin" };

export default async function Dashboard() {
  const cookieStore = await cookies();
  const request = new Request("https://cookout.local/admin", { headers: { Cookie: cookieStore.toString() } });
  const admin = await getAdminFromRequest(request);
  if (!admin) redirect("/admin/login");

  let stats = { products: 0, categories: 0, nutrition: 0, locations: 0 };
  try {
    const db = getDatabase();
    const count = async (query: string) => {
      const result = await db.prepare(query).all();
      const rows = Array.isArray(result)
        ? result
        : (result as { results?: Array<{ n?: number | string }> } | null)?.results ?? [];
      return Number(rows[0]?.n ?? 0);
    };
    const [products, categories, nutrition, locations] = await Promise.all([
      count("SELECT COUNT(*) AS n FROM menu_items"),
      count("SELECT COUNT(*) AS n FROM menu_categories"),
      count("SELECT COUNT(*) AS n FROM nutrition"),
      count("SELECT COUNT(*) AS n FROM locations"),
    ]);
    stats = { products, categories, nutrition, locations };
  } catch { /* Keep the admin shell usable if a stats query fails. */ }

  const modules = [
    { number: "01", title: "Menu & Products", desc: "Products, categories, images, nutrition and price fields.", href: "/admin/products", icon: "◈", state: "Available", tone: "ember" },
    { number: "02", title: "Editorial Studio", desc: "Write, structure and publish search-focused articles.", href: "/admin/articles", icon: "✳", state: "Available", tone: "gold" },
    { number: "03", title: "SEO Command", desc: "Technical SEO, metadata, schema and index controls.", href: null, icon: "⌁", state: "Build next", tone: "violet" },
    { number: "04", title: "AEO · GEO · AIO", desc: "Answer visibility, entity signals and AI crawler readiness.", href: null, icon: "✦", state: "Build next", tone: "blue" },
    { number: "05", title: "Design & Theme", desc: "Site identity, layout presets, color system and motion.", href: null, icon: "◌", state: "Build next", tone: "pink" },
    { number: "06", title: "Media Library", desc: "Manage image assets, alt text, sources and usage.", href: null, icon: "▧", state: "Build next", tone: "green" },
    { number: "07", title: "Locations & Prices", desc: "Location data, price sources and change history.", href: "/locations/", icon: "⌖", state: "Public view", tone: "gold" },
    { number: "08", title: "Review Queue", desc: "Review records before publishing changes.", href: "/admin/reviews", icon: "✓", state: "Available", tone: "green" },
  ];

  return (
    <main className="studio-shell">
      <aside className="studio-sidebar">
        <a className="studio-brand" href="/admin/dashboard"><span className="studio-brand-mark">CO</span><span>COOK OUT <small>STUDIO / ADMIN</small></span></a>
        <div className="studio-side-label">WORKSPACE</div>
        <a className="studio-side-link active" href="/admin/dashboard"><span>⌂</span> Overview</a>
        <a className="studio-side-link" href="/admin/products"><span>◈</span> Menu & Products</a>
        <a className="studio-side-link" href="/admin/articles"><span>✳</span> Content Studio</a>
        <a className="studio-side-link" href="/admin/reviews"><span>✓</span> Review Queue</a>
        <div className="studio-side-label">GROWTH SYSTEMS</div>
        <span className="studio-side-link disabled"><span>⌁</span> SEO / Schema <i>SOON</i></span>
        <span className="studio-side-link disabled"><span>✦</span> AEO · GEO · AIO <i>SOON</i></span>
        <span className="studio-side-link disabled"><span>◌</span> Design System <i>SOON</i></span>
        <span className="studio-side-link disabled"><span>▧</span> Media Library <i>SOON</i></span>
        <div className="studio-sidebar-bottom"><span className="studio-avatar">{admin.email.slice(0, 1).toUpperCase()}</span><div><strong>Owner account</strong><small>{admin.email}</small></div><form action="/api/admin/auth" method="post"><input type="hidden" name="action" value="logout"/><button aria-label="Log out" title="Log out">↗</button></form></div>
      </aside>
      <section className="studio-main">
        <header className="studio-topbar"><div><span className="studio-breadcrumb">WORKSPACE</span><span className="studio-slash">/</span><strong>Overview</strong></div><div className="studio-top-actions"><span className="studio-live"><i/> PRODUCTION</span><a href="/" target="_blank" rel="noreferrer">View live site ↗</a></div></header>
        <div className="studio-content">
          <div className="studio-welcome"><div><div className="studio-overline"><span/> CONTROL CENTER / 01</div><h1>Make the whole site<br/><em>work harder.</em></h1><p>One workspace for the Cook Out Index experience — content, menu data and the search visibility systems we're building next.</p></div><div className="studio-orb" aria-hidden="true"><div className="studio-orb-core">CO<span>✦</span></div><i/><b/><small>CONTENT · SEARCH · EXPERIENCE</small></div></div>
          <div className="studio-stat-grid">
            <article className="studio-stat"><span>MENU PRODUCTS</span><strong>{stats.products.toString().padStart(2,"0")}</strong><small><i/> Database records</small><b>◈</b></article>
            <article className="studio-stat"><span>CATEGORIES</span><strong>{stats.categories.toString().padStart(2,"0")}</strong><small>Menu structure</small><b>▦</b></article>
            <article className="studio-stat"><span>NUTRITION RECORDS</span><strong>{stats.nutrition.toString().padStart(2,"0")}</strong><small>Source-aware data</small><b>⌁</b></article>
            <article className="studio-stat"><span>LOCATIONS</span><strong>{stats.locations.toString().padStart(2,"0")}</strong><small>Location database</small><b>⌖</b></article>
          </div>
          <div className="studio-section-head"><div><span className="studio-overline">YOUR TOOLKIT</span><h2>Control modules<span>.</span></h2><p>Working areas are linked. Planned systems are clearly marked rather than sending you to empty pages.</p></div><span className="studio-count">08 MODULES / 03 AVAILABLE</span></div>
          <div className="studio-module-grid">{modules.map(m => <article className={`studio-module ${m.tone} ${m.href ? "" : "is-planned"}`} key={m.number}><div className="studio-module-top"><span className="studio-module-icon">{m.icon}</span><span className={m.href ? "studio-state ready" : "studio-state"}>{m.state}</span></div><span className="studio-module-number">{m.number} / MODULE</span><h3>{m.title}</h3><p>{m.desc}</p>{m.href ? <a href={m.href}>Open workspace <b>↗</b></a> : <span className="studio-planned-note">Planned for the next build phase</span>}</article>)}</div>
          <div className="studio-roadmap"><div className="studio-roadmap-icon">✦</div><div><strong>Next build: a real visual site editor</strong><p>We’ll add editable theme settings, image uploads, complete product forms, and SEO/AEO/GEO/AIO reporting as working features—not decorative buttons.</p></div><span>PHASE 02</span></div>
          <footer className="studio-footer"><span>COOK OUT INDEX / STUDIO</span><span>Independent · Source-aware · Owner-controlled</span></footer>
        </div>
      </section>
    </main>
  );
}
