export const dynamic = "force-dynamic";

type Message = { role: "user" | "assistant"; content?: unknown };

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

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function answer(question: string) {
  const q = question.toLowerCase();
  if (q.includes("burger") || q.includes("hamburger")) {
    return "The menu database currently includes these burger items:\n\n• Small Hamburger\n• Regular Hamburger\n• Huge Hamburger\n• Big Double\n\nThis is an independent Cook Out information resource. Availability can change, so verify with the restaurant.";
  }
  if (q.includes("price")) {
    return "We do not currently have verified national Cook Out prices in the database. Prices can vary by location. The Prices section will show verified entries as they are added.";
  }
  if (q.includes("protein") || q.includes("calorie") || q.includes("nutrition") || q.includes("sodium")) {
    return "I can help with nutrition. Our current database contains nutrition records for 12 menu items. Try asking for a specific item, such as: “How many calories are in the Huge Hamburger?”";
  }
  if (q.includes("menu") || q.includes("items")) {
    return "I can help you explore the Cook Out menu. Current database items include:\n\n" + menu.map((x) => "• " + x).join("\n") + "\n\nYou can also ask about nutrition, prices, trays, shakes or site navigation.";
  }
  return "I’m working. I can help with Cook Out menu items, nutrition, prices, trays, shakes and site navigation. Try: “What burgers are available?”";
}

export async function GET() {
  return json({ ok: true, service: "cook-out-ai-chat", mode: "safe-fallback" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({})) as { messages?: Message[] };
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const last = String(messages[messages.length - 1]?.content ?? "").trim().slice(0, 1200);
    if (!last) return json({ error: "Please enter a question." }, 400);
    return json({ answer: answer(last), source: "Cook Out Menu database", mode: "safe-fallback" });
  } catch {
    return json({ answer: "The assistant received your message, but could not process it. Please try again.", mode: "safe-fallback" });
  }
}
