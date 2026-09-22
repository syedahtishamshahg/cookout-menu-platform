import AIAssistant from "@/components/ai-assistant";

const discovery = [
  ["MENU INDEX","Every category, searchable","/menu/","01"],
  ["PRICE INTELLIGENCE","Location-aware pricing","/menu/prices/","02"],
  ["NUTRITION LAB","Calories, protein & sodium","/nutrition/","03"],
  ["TRAY STUDIO","Build a custom meal","/tools/tray-builder/","04"],
  ["SHAKE LAB","Mix two flavors","/tools/shake-mixer/","05"],
  ["LOCATION FINDER","Explore stores & hours","/locations/","06"],
];

const categories = [
  ["BURGERS","01","/menu/burgers/"],
  ["CHICKEN","02","/menu/chicken/"],
  ["BBQ","03","/menu/bbq/"],
  ["HOT DOGS","04","/menu/hot-dogs/"],
  ["WRAPS","05","/menu/wraps/"],
  ["MILKSHAKES","06","/menu/milkshakes/"],
];

export default function Home() {
  return (
    <div className="new-home">
      <header className="new-header">
        <div className="container new-nav">
          <a className="new-brand" href="/" aria-label="Cook Out Menu">
            <span className="new-brand-symbol">C</span>
            <span>COOK OUT <i>INDEX</i></span>
          </a>
          <nav className="new-navlinks" aria-label="Main navigation">
            <a href="/menu/">Menu</a><a href="/menu/prices/">Prices</a><a href="/nutrition/">Nutrition</a><a href="/locations/">Locations</a><a href="/tools/">Tools</a>
          </nav>
          <div className="new-nav-actions">
            <a className="new-ai-link" href="/ai/">✦ Ask AI</a>
            <a className="new-search-link" href="/search/">⌕</a>
          </div>
        </div>
      </header>

      <main>
        <section className="index-hero">
          <div className="index-grid-lines" />
          <div className="container index-hero-inner">
            <div className="index-hero-copy">
              <div className="index-kicker"><span /> INDEPENDENT MENU INTELLIGENCE · 2026</div>
              <h1>The Cook Out<br /><em>menu, decoded.</em></h1>
              <p>Search the menu. Compare nutrition. Build a tray. Explore prices by location. Then ask AI anything.</p>
              <form className="index-search" action="/search">
                <span>⌕</span><input name="q" placeholder="Search burgers, shakes, calories, prices..." aria-label="Search Cook Out" /><button>SEARCH</button>
              </form>
              <div className="index-hero-links"><a href="/menu/">EXPLORE MENU <b>↗</b></a><a href="/ai/">ASK COOK OUT AI <b>✦</b></a></div>
            </div>
            <div className="index-hero-visual" aria-hidden="true">
              <div className="orbit orbit-a" /><div className="orbit orbit-b" />
              <div className="burger-stack">
                <div className="stack-bun" /><div className="stack-lettuce" /><div className="stack-cheese" /><div className="stack-meat" /><div className="stack-cheese second" /><div className="stack-meat second" /><div className="stack-bun bottom" />
              </div>
              <span className="visual-tag tag-one">MENU<br /><b>90+</b> SIGNALS</span>
              <span className="visual-tag tag-two">AI<br /><b>24/7</b> GUIDE</span>
              <span className="visual-tag tag-three">SOURCE<br /><b>FIRST</b></span>
            </div>
          </div>
          <div className="container hero-ticker"><span>SCROLL TO EXPLORE</span><i /> <span>UNOFFICIAL · INDEPENDENT · SOURCE-AWARE</span></div>
        </section>

        <section className="index-statement">
          <div className="container statement-grid">
            <div><span className="index-label">01 / THE IDEA</span><h2>Not another<br /><em>menu list.</em></h2></div>
            <div className="statement-copy"><p>We are building a practical Cook Out intelligence layer — part menu guide, part nutrition explorer, part price tracker, part AI assistant.</p><p>Information is separated from estimates, location variation is surfaced, and important claims stay tied to sources.</p><a href="/methodology/">READ OUR METHODOLOGY ↗</a></div>
          </div>
        </section>

        <section className="index-discovery">
          <div className="container">
            <div className="index-section-head"><div><span className="index-label">02 / DISCOVER</span><h2>One system.<br /><em>Six ways in.</em></h2></div><a href="/tools/">ALL TOOLS ↗</a></div>
            <div className="discovery-grid">
              {discovery.map(([title,text,href,num]) => <a href={href} className="discovery-card" key={href}><span>{num}</span><div><small>{title}</small><h3>{text}</h3></div><b>↗</b></a>)}
            </div>
          </div>
        </section>

        <section className="index-menu">
          <div className="container">
            <div className="index-section-head"><div><span className="index-label">03 / MENU INDEX</span><h2>Pick a lane.</h2></div><a href="/menu/">FULL MENU ↗</a></div>
            <div className="category-index">
              {categories.map(([name,num,href]) => <a href={href} key={href}><span>{num}</span><strong>{name}</strong><b>↗</b></a>)}
            </div>
          </div>
        </section>

        <section className="ai-feature">
          <div className="container ai-feature-grid">
            <div><span className="index-label light">04 / INTELLIGENCE</span><h2>Ask first.<br /><em>Dig deeper.</em></h2><p>Cook Out Menu AI is designed to answer menu, nutrition, price, tray, shake and site questions using the information we actually publish.</p><div className="ai-feature-pills"><span>MENU</span><span>NUTRITION</span><span>TRAYS</span><span>SHAKES</span><span>PRICES</span></div><a className="ai-feature-btn" href="/ai/">OPEN AI WORKBENCH <b>✦</b></a></div>
            <div className="ai-console"><div className="console-top"><span>CO / AI</span><span>LIVE WORKBENCH</span></div><div className="console-q">“What can I order if I want high protein?”</div><div className="console-line" /><div className="console-answer"><span>AI</span><p>Let’s narrow it down using the nutrition data currently published on this site. I’ll avoid filling gaps with guesses.</p></div><div className="console-input">Ask anything about Cook Out... <b>↑</b></div></div>
          </div>
        </section>

        <section className="index-trust">
          <div className="container trust-strip">
            <div><span>✓</span><strong>INDEPENDENT</strong><small>Not affiliated with Cook Out</small></div>
            <div><span>◉</span><strong>SOURCE-AWARE</strong><small>Facts carry source context</small></div>
            <div><span>⌁</span><strong>LOCATION-FIRST</strong><small>Prices can vary by restaurant</small></div>
            <div><span>✦</span><strong>AI-READY</strong><small>Built for useful answers</small></div>
          </div>
        </section>
      </main>

      <footer className="new-footer">
        <div className="container new-footer-main"><div><a className="new-brand" href="/"><span className="new-brand-symbol">C</span><span>COOK OUT <i>INDEX</i></span></a><p>An independent Cook Out information platform.<br />Useful, source-aware, and built for exploration.</p></div><div><strong>EXPLORE</strong><a href="/menu/">Menu</a><a href="/menu/prices/">Prices</a><a href="/nutrition/">Nutrition</a><a href="/locations/">Locations</a></div><div><strong>TOOLS</strong><a href="/tools/tray-builder/">Tray Builder</a><a href="/tools/shake-mixer/">Shake Mixer</a><a href="/ai/">Ask AI</a><a href="/search/">Search</a></div><div><strong>TRUST</strong><a href="/sources/">Sources</a><a href="/methodology/">Methodology</a><a href="/corrections/">Corrections</a></div></div>
        <div className="container new-footer-bottom"><span>© 2026 COOK OUT INDEX</span><span>INDEPENDENT / UNOFFICIAL RESOURCE</span></div>
      </footer>
    </div>
  );
}
