import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { listMenuItems, listNutrition } from "@/lib/repository";

export const dynamic = "force-dynamic";

type Message = { role: "user" | "assistant"; content: string };

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 1200) : "";
}

function localAnswer(question: string, items: Awaited<ReturnType<typeof listMenuItems>>, nutrition: Awaited<ReturnType<typeof listNutrition>>) {
  const q = question.toLowerCase();

  if (q.includes("burger")) {
    const burgers = items.filter((item) => item.category_name.toLowerCase().includes("burger"));
    if (burgers.length) return "Here are the burger items currently in our database:\n\n" + burgers.map((item) => "• " + item.name).join("\n") + "\n\nThis is an independent resource, so verify current availability with the restaurant.";
  }

  if (q.includes("protein") || q.includes("calorie") || q.includes("calories") || q.includes("sodium")) {
    const rows = nutrition.slice(0, 12).map((item) => `• ${item.name}: ${item.calories ?? "?"} cal | ${item.protein_g ?? "?"}g protein | ${item.sodium_mg ?? "?"}mg sodium`);
    return "Here is the nutrition data currently available in our database:\n\n" + rows.join("\n");
  }

  if (q.includes("price")) {
    return "Our current database does not contain verified national Cook Out prices. Prices can vary by location. Check the Prices section for verified entries as they are added.";
  }

  return "I can help with menu items, nutrition, prices, trays, shakes, locations and site navigation. Try asking: “What burgers are available?” or “Which items have the most protein?”";
}

export async function POST(request: Request) {
  let items: Awaited<ReturnType<typeof listMenuItems>> = [];
  let nutrition: Awaited<ReturnType<typeof listNutrition>> = [];

  try {
    const body = (await request.json()) as { messages?: Message[] };
    const messages = Array.isArray(body.messages) ? body.messages.slice(-8) : [];
    const last = clean(messages[messages.length - 1]?.content);

    if (!last) return NextResponse.json({ error: "Please enter a question." }, { status: 400 });

    const { env } = await getCloudflareContext({ async: true });
    const runtimeEnv = env as unknown as Record<string, unknown>;

    try {
      [items, nutrition] = await Promise.all([
        listMenuItems(runtimeEnv),
        listNutrition(runtimeEnv),
      ]);
    } catch {
      return NextResponse.json({ answer: "I’m online, but the menu database is temporarily unavailable. Please try again in a moment." });
    }

    const ai = runtimeEnv.AI as { run: (model: string, input: unknown) => Promise<unknown> } | undefined;
    if (!ai?.run) return NextResponse.json({ answer: localAnswer(last, items, nutrition) });

    const menuContext = items.map((item) =>
      `- ${item.name} | category: ${item.category_name} | description: ${item.description ?? "not provided"}`
    ).join("\n");

    const nutritionContext = nutrition.map((item) =>
      `- ${item.name}: ${item.calories ?? "?"} cal, ${item.protein_g ?? "?"}g protein, ${item.sodium_mg ?? "?"}mg sodium; verified: ${item.verified_at ?? "unknown"}`
    ).join("\n");

    const system = `You are Cook Out Menu AI, an independent information assistant for an unofficial Cook Out menu website.
Use only the supplied database for factual menu and nutrition claims. Never invent prices, locations, hours, allergens, nutrition or official policies. Prices vary by location and there are no verified national prices in the current database. Clearly say when information is unavailable. You are not affiliated with Cook Out.

MENU DATABASE:
${menuContext}

NUTRITION DATABASE:
${nutritionContext}`;

    try {
      const result = await ai.run("@cf/meta/llama-3.2-1b-instruct", {
        messages: [
          { role: "system", content: system },
          ...messages.map((m) => ({ role: m.role, content: clean(m.content) })),
        ],
        max_tokens: 450,
        temperature: 0.25,
      });

      const response = typeof result === "string"
        ? result
        : (result as { response?: string; choices?: Array<{ message?: { content?: string } }> })?.response
          ?? (result as { choices?: Array<{ message?: { content?: string } }> })?.choices?.[0]?.message?.content;

      return NextResponse.json({ answer: response || localAnswer(last, items, nutrition) });
    } catch {
      return NextResponse.json({ answer: localAnswer(last, items, nutrition) });
    }
  } catch {
    return NextResponse.json({ answer: "The assistant could not process that request. Please try again." });
  }
}
