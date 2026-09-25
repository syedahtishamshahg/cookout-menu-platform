"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starters = [
  "What can I order at Cook Out?",
  "How many calories are in the Huge Hamburger?",
  "Build me a high-protein tray",
  "Explain Cook Out prices and why they vary",
];

const menu = [
  "Small Hamburger",
  "Regular Hamburger",
  "Huge Hamburger",
  "Big Double",
  "Char-Grilled Chicken Breast",
  "Hot Crispy Spicy Chicken Breast",
  "Reg BBQ Sandwich",
  "Hot Dog",
  "Cajun Wrap",
  "Ranch Wrap",
  "Honey Mustard Wrap",
  "Chicken Strips (3)",
];

function localAnswer(question: string) {
  const q = question.toLowerCase().trim();

  if (/^(hi|hello|hey|assalam|salam|aoa|good morning|good afternoon|good evening)\b/.test(q)) {
    return "Hello! 👋 I’m your Cook Out Menu AI assistant. I can help you explore the menu, understand nutrition, compare options, build a tray, discuss prices, find site information, or answer general questions.\n\nWhat would you like to know?";
  }

  if (/^(thanks|thank you|thx|shukriya|jazak)/.test(q)) {
    return "You’re very welcome! 😊 If you want, ask me another question about the Cook Out menu, nutrition, trays, shakes, prices or locations.";
  }

  if (q.includes("huge hamburger") && q.includes("calorie")) {
    return "The current nutrition record published in our database lists the **Huge Hamburger at 516 calories**, with **40g protein** and **410mg sodium**.\n\nBecause this is an independent resource, use the restaurant/source information for the latest official details.";
  }

  if (q.includes("burger") || q.includes("hamburger")) {
    return "Here’s what our current published database contains for burger items:\n\n• Small Hamburger\n• Regular Hamburger\n• Huge Hamburger\n• Big Double\n\n### How I can help\nI can compare these by the nutrition data we have, explain what is verified versus unknown, or help you choose based on a goal such as calories or protein.\n\n**Important:** this site is independent and unofficial, and menu availability can vary by restaurant.";
  }

  if (q.includes("protein") && (q.includes("tray") || q.includes("meal") || q.includes("order"))) {
    return "Absolutely — we can build a higher-protein choice around the nutrition records currently published on this site.\n\n### A practical approach\n1. Start with a protein-focused main item.\n2. Add a side you actually want rather than assuming every tray combination is identical.\n3. Check the nutrition page for the exact item data we have.\n4. Treat location-specific menu availability as something to verify with the restaurant.\n\nIf you tell me your **calorie target** and whether you prefer **burger, chicken, BBQ or wrap**, I can structure the choice for you.";
  }

  if (q.includes("protein")) {
    return "Our current database contains nutrition records for 12 menu items. I can explain the available nutrition data, but I won’t invent missing values.\n\nFor a useful answer, ask something specific such as **“How much protein is in the Huge Hamburger?”** or tell me your calorie/protein target and I’ll help you plan around the published data.";
  }

  if (q.includes("calorie") || q.includes("nutrition") || q.includes("sodium")) {
    return "I can help with calories, protein and sodium using the nutrition records currently published on this site.\n\nFor example, the **Huge Hamburger** is listed at **516 calories, 40g protein and 410mg sodium**.\n\nAsk me about a specific item and I’ll give you the data we currently have, while clearly separating verified information from anything we don’t know.";
  }

  if (q.includes("price")) {
    return "Cook Out pricing needs to be handled carefully because prices can vary by restaurant and over time.\n\nOur database currently does **not** claim a single nationwide price as a universal fact. We publish prices only when there is a source/context for them.\n\nIf you tell me a **state/city or restaurant location**, I can explain what information the site currently has and what still needs verification.";
  }

  if (q.includes("menu") || q.includes("items") || q.includes("what can i order")) {
    return "Here’s the current set of menu items represented in our published database:\n\n" + menu.map((x) => "• " + x).join("\n") + "\n\n### Explore further\nYou can ask me to focus on burgers, chicken, BBQ, wraps, hot dogs, nutrition, prices, trays or shakes. I’ll distinguish published data from information that still needs verification.";
  }

  if (q.includes("tray")) {
    return "Let’s build your tray. 🍔\n\nTell me three things:\n**1. Main:** burger, chicken, BBQ, hot dog or wrap\n**2. Preference:** filling, lighter, high-protein, spicy, etc.\n**3. Calories:** optional target\n\nThen I can turn that into a clear meal plan using the information available on this site.";
  }

  if (q.includes("shake")) {
    return "I can help with Cook Out shakes and combinations, but I don’t want to invent flavor availability or nutrition that we haven’t verified.\n\nTell me the flavor or combination you’re interested in, and I’ll work from the published information available on the site.";
  }

  if (q.includes("location") || q.includes("hours") || q.includes("open")) {
    return "I can help you navigate the site's **Locations** and **Hours** sections. For a specific restaurant, give me the **city/state** and I’ll explain what information is available.\n\nHours and availability can change, so the restaurant itself is the final source for same-day confirmation.";
  }

  if (q.includes("who are you") || q.includes("what are you")) {
    return "I’m **Cook Out Menu AI**, the conversational assistant built into this independent Cook Out information platform. I’m designed to help with menu discovery, nutrition, prices, trays, shakes, locations and general questions — while avoiding made-up facts when our published data is incomplete.";
  }

  return "I’m here to help. 😊 I can have a full conversation about the Cook Out information published on this site, and I can also handle general questions when the AI service is available.\n\nTry asking something specific, for example:\n• “What burgers are available?”\n• “Build me a high-protein tray.”\n• “How many calories are in the Huge Hamburger?”\n• “Why do Cook Out prices vary?”\n• “What can I order?”";
}

export default function AIAssistant({ embedded = false }: { embedded?: boolean }) {
  const [open, setOpen] = useState(embedded);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! 👋 I’m Cook Out Menu AI. Ask me anything about the menu, nutrition, prices, trays, shakes, locations or this website. I’ll give you a useful answer and clearly flag information that still needs verification.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  async function send(text = input) {
    const question = text.trim();
    if (!question || busy) return;

    const userMessage: Message = { role: "user", content: question };
    const history = [...messages, userMessage];

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setBusy(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-12) }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || typeof data.answer !== "string" || !data.answer.trim()) {
        throw new Error("AI response unavailable");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.answer.trim() },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: localAnswer(question) },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function clearChat() {
    setMessages([
      {
        role: "assistant",
        content:
          "Chat cleared. 👋 I’m ready for your next question about Cook Out, nutrition, prices, trays, shakes, locations or the website.",
      },
    ]);
  }

  return (
    <>
      {open && (
        <aside className={"ai-panel " + (embedded ? "ai-panel-embedded" : "")} aria-label="Cook Out Menu AI">
          <div className="ai-panel-head">
            <div className="ai-brand">
              <span className="ai-orb">✦</span>
              <div>
                <strong>Cook Out Menu AI</strong>
                <small><span className="ai-status-dot" /> Smart assistant · source-aware</small>
              </div>
            </div>
            <div className="ai-head-actions">
              <button type="button" onClick={clearChat} aria-label="Clear chat" title="Clear chat">↻</button>
              {!embedded && <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant">×</button>}
            </div>
          </div>

          <div className="ai-chat-intro">
            <div className="ai-intro-badge">AI</div>
            <div>
              <strong>What can I help you with?</strong>
              <span>Ask naturally — no special commands needed.</span>
            </div>
          </div>

          <div className="ai-messages">
            {messages.map((message, index) => (
              <div className={"ai-message-row " + message.role} key={index}>
                <span className="ai-avatar">{message.role === "assistant" ? "✦" : "You"}</span>
                <div className={"ai-message " + message.role}>{message.content}</div>
              </div>
            ))}
            {busy && (
              <div className="ai-message-row assistant">
                <span className="ai-avatar">✦</span>
                <div className="ai-message assistant ai-typing"><i /><i /><i /><span>Thinking…</span></div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {messages.length === 1 && (
            <div className="ai-starters">
              <div className="ai-starters-label">Try asking</div>
              <div className="ai-starters-row">
                {starters.map((starter) => (
                  <button type="button" key={starter} onClick={() => send(starter)}>{starter}</button>
                ))}
              </div>
            </div>
          )}

          <form
            className="ai-input"
            onSubmit={(event) => {
              event.preventDefault();
              void send();
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask anything about Cook Out…"
              aria-label="Ask Cook Out Menu AI"
              disabled={busy}
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send question">↑</button>
          </form>

          <div className="ai-disclaimer">
            Independent & unofficial · AI may make mistakes · Verify important restaurant details
          </div>
        </aside>
      )}

      {!embedded && (
        <button type="button" className={"ai-launcher " + (open ? "active" : "")} onClick={() => setOpen((value) => !value)} aria-label="Open Cook Out Menu AI">
          <span className="ai-launcher-icon">✦</span>
          <span><b>Ask AI</b><small>Smart menu assistant</small></span>
        </button>
      )}
    </>
  );
}
