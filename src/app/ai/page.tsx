import AIAssistant from "@/components/ai-assistant";

export const metadata = {
  title: "Cook Out AI Assistant",
  description: "Ask the Cook Out Menu AI assistant about menu items, nutrition, prices, trays, shakes, locations and site information.",
};

export default function AIPage() {
  return (
    <main className="ai-page">
      <section className="ai-hero">
        <div className="container ai-hero-grid">
          <div>
            <div className="eyebrow"><span className="live-dot" /> Cook Out Intelligence</div>
            <h1>Ask the site.<br /><span>Get a useful answer.</span></h1>
            <p>One assistant for menu discovery, nutrition, meal planning, pricing guidance, shake ideas, locations and everything else we publish.</p>
            <div className="ai-capabilities">
              <span>Menu</span><span>Nutrition</span><span>Prices</span><span>Trays</span><span>Shakes</span><span>Locations</span>
            </div>
            <button className="btn btn-dark" onClick={() => document.getElementById("ai-chat-anchor")?.scrollIntoView({ behavior: "smooth" })}>Start asking →</button>
          </div>
          <div className="ai-hero-art">
            <div className="ai-orbit-large" />
            <div className="ai-core">✦</div>
            <div className="ai-float ai-float-one">“High protein?”</div>
            <div className="ai-float ai-float-two">“Build my tray”</div>
            <div className="ai-float ai-float-three">“Calories?”</div>
          </div>
        </div>
      </section>
      <section className="ai-workbench" id="ai-chat-anchor">
        <div className="container">
          <div className="ai-workbench-head"><span className="kicker">AI WORKBENCH</span><h2>Ask naturally. Explore deeper.</h2><p>The assistant uses our published menu and nutrition database and is designed not to invent missing facts.</p></div>
          <div className="ai-embed"><AIAssistant /></div>
        </div>
      </section>
    </main>
  );
}
