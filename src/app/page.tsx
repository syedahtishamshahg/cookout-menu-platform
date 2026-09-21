const tools = [
  { title: "Explore Menu", text: "Browse categories, items and source-backed details.", href: "/menu/", icon: "🍔", tone: "warm" },
  { title: "Prices", text: "See price information only when it can be verified.", href: "/menu/prices/", icon: "$", tone: "green" },
  { title: "Tray Builder", text: "Build a tray and preview your meal combination.", href: "/tools/tray-builder/", icon: "▣", tone: "red" },
  { title: "Shake Mixer", text: "Create a two-flavor shake combination.", href: "/tools/shake-mixer/", icon: "🥤", tone: "purple" },
  { title: "Nutrition", text: "Compare calories, protein and sodium.", href: "/nutrition/", icon: "◔", tone: "blue" },
  { title: "Locations", text: "Explore the location directory as it grows.", href: "/locations/", icon: "⌖", tone: "orange" },
];

const categories = [
  ["Burgers", "/menu/burgers/"],
  ["Chicken", "/menu/chicken/"],
  ["BBQ", "/menu/bbq/"],
  ["Hot Dogs", "/menu/hot-dogs/"],
  ["Wraps", "/menu/wraps/"],
  ["Milkshakes", "/menu/milkshakes/"],
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="container nav">
          <a className="brand" href="/" aria-label="Cook Out Menu home">
            <span className="brand-mark">CO</span>
            <span>Cook Out <em>Menu</em></span>
          </a>
          <nav className="navlinks" aria-label="Main navigation">
            <a href="/menu/">Menu</a>
            <a href="/menu/prices/">Prices</a>
            <a href="/nutrition/">Nutrition</a>
            <a href="/locations/">Locations</a>
            <a href="/tools/tray-builder/">Tools</a>
          </nav>
          <a className="nav-search" href="/search/" aria-label="Search">⌕ <span>Search</span></a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <div className="eyebrow"><span className="live-dot" /> Independent &amp; unofficial information resource</div>
              <h1>Cook Out menu.<br /><span>Made easier to explore.</span></h1>
              <p className="hero-lede">Menus, nutrition, prices, locations and interactive tools — organized in one clean place.</p>
              <form className="search search-hero" action="/search">
                <span className="search-icon">⌕</span>
                <input name="q" placeholder="Search menu, nutrition, shakes..." aria-label="Search Cook Out" />
                <button className="btn btn-dark" type="submit">Search</button>
              </form>
              <div className="hero-links">
                <a href="/menu/">Browse the menu →</a>
                <a href="/tools/tray-builder/">Build a tray →</a>
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-card-top"><span>QUICK LOOK</span><span className="verified-pill">● Source-aware</span></div>
              <div className="hero-food">
                <div className="food-orbit orbit-one" />
                <div className="food-orbit orbit-two" />
                <div className="burger-art" aria-hidden="true"><span className="bun-top" /><span className="patty" /><span className="cheese" /><span className="patty patty-two" /><span className="bun-bottom" /></div>
              </div>
              <div className="hero-card-bottom"><strong>Explore what you need</strong><span>Menu · Nutrition · Tools</span></div>
            </div>
          </div>
        </section>

        <section className="section quick-section">
          <div className="container">
            <div className="section-heading"><div><span className="kicker">START HERE</span><h2>Everything in one place.</h2></div><a className="text-link" href="/menu/">View all →</a></div>
            <div className="tool-grid">
              {tools.map((tool) => (
                <a className={"tool-card " + tool.tone} href={tool.href} key={tool.href}>
                  <div className="tool-icon">{tool.icon}</div>
                  <div><h3>{tool.title}</h3><p>{tool.text}</p></div>
                  <span className="arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section category-section">
          <div className="container">
            <div className="section-heading"><div><span className="kicker">MENU</span><h2>What are you craving?</h2></div><a className="text-link" href="/menu/">Full menu →</a></div>
            <div className="category-grid">
              {categories.map(([name, href]) => <a className="category-card" href={href} key={href}><span>{name}</span><b>→</b></a>)}
            </div>
          </div>
        </section>

        <section className="trust-section">
          <div className="container trust-grid">
            <div><span className="kicker">WHY THIS SITE</span><h2>Useful information without pretending to be official.</h2></div>
            <div className="trust-copy">
              <p>Cook Out Menu is an independent information project. We separate sourced data from estimates and show verification details where available.</p>
              <div className="trust-points"><span>✓ Source-aware data</span><span>✓ Location price caution</span><span>✓ Independent disclosure</span></div>
              <a className="btn btn-light" href="/methodology/">How we handle data →</a>
            </div>
          </div>
        </section>

        <section className="section final-cta">
          <div className="container cta-box">
            <div><span className="kicker">READY?</span><h2>Find your next Cook Out meal.</h2><p>Start with the menu or build a tray.</p></div>
            <div className="cta-actions"><a className="btn btn-dark" href="/menu/">Explore Menu</a><a className="btn btn-outline" href="/tools/tray-builder/">Build a Tray</a></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div><a className="brand" href="/"><span className="brand-mark">CO</span><span>Cook Out <em>Menu</em></span></a><p>Independent / unofficial information resource.</p></div>
          <div><strong>Explore</strong><a href="/menu/">Menu</a><a href="/nutrition/">Nutrition</a><a href="/locations/">Locations</a></div>
          <div><strong>Tools</strong><a href="/tools/tray-builder/">Tray Builder</a><a href="/tools/shake-mixer/">Shake Mixer</a><a href="/search/">Search</a></div>
          <div><strong>Trust</strong><a href="/sources/">Sources</a><a href="/methodology/">Methodology</a><a href="/corrections/">Corrections</a></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Cook Out Menu</span><span>Prices and availability can vary by location.</span></div>
      </footer>
    </>
  );
}
