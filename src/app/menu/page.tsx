import { listMenuItems } from "@/lib/repository";
import MenuExplorer from "@/components/menu-explorer";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Cook Out Menu",
  description: "Explore independent Cook Out menu information with source-aware nutrition details and location-aware pricing guidance.",
};

export default async function Menu() {
  const items = await listMenuItems();
  return (
    <main>
      <section className="menu-hero">
        <div className="container menu-hero-inner">
          <div>
            <div className="eyebrow"><span className="live-dot" /> Menu Explorer</div>
            <h1>Cook Out menu, <span>made simple.</span></h1>
            <p>Explore the menu by category, search for a favorite, and open each item for nutrition and source details. Prices can vary by location.</p>
            <div className="menu-stats">
              <span><strong>{items.length}</strong> published items</span>
              <span><strong>5</strong> menu categories</span>
              <span><strong>Source-aware</strong> information</span>
            </div>
          </div>
          <div className="menu-hero-note">
            <span className="menu-note-icon">✓</span>
            <div>
              <strong>Independent resource</strong>
              <p>We are not the official Cook Out website. Published facts are tied to available sources and verification status.</p>
            </div>
          </div>
        </div>
      </section>
      <MenuExplorer items={items} />
    </main>
  );
}
