"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const starters = [
  "What burgers are available?",
  "How many calories are in the Huge Hamburger?",
  "Help me build a tray.",
  "What do you know about Cook Out prices?",
];

const menu = [
  "Small Hamburger", "Regular Hamburger", "Huge Hamburger", "Big Double",
  "Char-Grilled Chicken Breast", "Hot Crispy Spicy Chicken Breast",
  "Reg BBQ Sandwich", "Hot Dog", "Cajun Wrap", "Ranch Wrap",
  "Honey Mustard Wrap", "Chicken Strips (3)",
];

function answer(question: string) {
  const q = question.toLowerCase();

  if (q.includes("huge hamburger") && q.includes("calorie")) {
    return "The current nutrition record for the Huge Hamburger is 516 calories, 40g protein, and 410mg sodium.";
  }
  if (q.includes("burger") || q.includes("hamburger")) {
    return "The current database includes:\n\n• Small Hamburger\n• Regular Hamburger\n• Huge Hamburger\n• Big Double\n\nThis is an independent Cook Out information resource. Verify availability with the restaurant.";
  }
  if (q.includes("protein")) {
    return "Our current database contains nutrition records for 12 menu items. Ask about a specific item and I can give you the nutrition data we currently have.";
  }
  if (q.includes("calorie") || q.includes("nutrition") || q.includes("sodium")) {
    return "I can help with nutrition. Ask about a specific menu item, for example: “How many calories are in the Huge Hamburger?”";
  }
  if (q.includes("price")) {
    return "We do not currently have verified national Cook Out prices in the database. Prices can vary by location, so we will only publish prices when they have a source.";
  }
  if (q.includes("menu") || q.includes("items")) {
    return "Current database items include:\n\n" + menu.map((x) => "• " + x).join("\n") + "\n\nYou can also ask about nutrition, prices, trays, shakes or site navigation.";
  }
  if (q.includes("tray")) {
    return "Tray Builder is one of the site's tools. Tell me what main item you want, and I can help you think through a tray combination.";
  }
  if (q.includes("shake")) {
    return "I can help with Cook Out shake information. Ask about a shake flavor or combination once its verified data is available.";
  }
  return "I can help with Cook Out menu items, nutrition, prices, trays, shakes and site navigation. Try: “What burgers are available?”";
}

export default function AIAssistant({ embedded = false }: { embedded?: boolean }) {
  const [open, setOpen] = useState(embedded);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi — I’m Cook Out Menu AI. Ask me about menu items, nutrition, prices, trays, shakes, locations or how to use this site." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, open]);

  function send(text = input) {
    const question = text.trim();
    if (!question || busy) return;
    const next = [...messages, { role: "user" as const, content: question }];
    setMessages(next);
    setInput("");
    setBusy(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { role: "assistant", content: answer(question) }]);
      setBusy(false);
    }, 250);
  }

  return (
    <>
      {open && (
        <aside className="ai-panel" aria-label="Cook Out Menu AI">
          <div className="ai-panel-head">
            <div>
              <span className="ai-orb">✦</span>
              <div><strong>Cook Out Menu AI</strong><small>Source-aware assistant</small></div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant">×</button>
          </div>
          <div className="ai-messages">
            {messages.map((message, index) => (
              <div className={"ai-message " + message.role} key={index}>{message.content}</div>
            ))}
            {busy && <div className="ai-message assistant ai-typing"><i /><i /><i /></div>}
            <div ref={endRef} />
          </div>
          {messages.length === 1 && (
            <div className="ai-starters">
              {starters.map((starter) => <button type="button" key={starter} onClick={() => send(starter)}>{starter}</button>)}
            </div>
          )}
          <form className="ai-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about Cook Out..." aria-label="Ask Cook Out Menu AI" />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send question">↑</button>
          </form>
          <div className="ai-disclaimer">Unofficial resource • AI can make mistakes • Verify important details with the restaurant.</div>
        </aside>
      )}
      {!embedded && (
        <button type="button" className={"ai-launcher " + (open ? "active" : "")} onClick={() => setOpen((v) => !v)} aria-label="Open Cook Out Menu AI">
          <span className="ai-launcher-icon">✦</span>
          <span><b>Ask AI</b><small>Menu assistant</small></span>
        </button>
      )}
    </>
  );
}
