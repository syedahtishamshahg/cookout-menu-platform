"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const starters = [
  "What should I order if I want high protein?",
  "What are the lowest-calorie items?",
  "Help me build a tray.",
  "What do you know about Cook Out prices?",
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi — I’m Cook Out Menu AI. Ask me about menu items, nutrition, prices, trays, shakes, locations or how to use this site." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, open]);

  async function send(text = input) {
    const question = text.trim();
    if (!question || busy) return;
    const next = [...messages, { role: "user" as const, content: question }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((current) => [...current, {
        role: "assistant",
        content: data.answer || data.error || "I could not answer that right now.",
      }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "The assistant is temporarily unavailable. Please try again." }]);
    } finally {
      setBusy(false);
    }
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
            <button onClick={() => setOpen(false)} aria-label="Close assistant">×</button>
          </div>

          <div className="ai-messages">
            {messages.map((message, index) => (
              <div className={"ai-message " + message.role} key={index}>
                {message.content}
              </div>
            ))}
            {busy && <div className="ai-message assistant ai-typing"><i /><i /><i /></div>}
            <div ref={endRef} />
          </div>

          {messages.length === 1 && (
            <div className="ai-starters">
              {starters.map((starter) => <button key={starter} onClick={() => send(starter)}>{starter}</button>)}
            </div>
          )}

          <form className="ai-input" onSubmit={(e) => { e.preventDefault(); void send(); }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about Cook Out..." aria-label="Ask Cook Out Menu AI" />
            <button disabled={busy || !input.trim()} aria-label="Send question">↑</button>
          </form>
          <div className="ai-disclaimer">Unofficial resource • AI can make mistakes • Verify important details with the restaurant.</div>
        </aside>
      )}

      <button className={"ai-launcher " + (open ? "active" : "")} onClick={() => setOpen((v) => !v)} aria-label="Open Cook Out Menu AI">
        <span className="ai-launcher-icon">✦</span>
        <span><b>Ask AI</b><small>Menu assistant</small></span>
      </button>
    </>
  );
}
