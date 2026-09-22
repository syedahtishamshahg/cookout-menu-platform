import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { listMenuItems, listNutrition } from "@/lib/repository";

export const dynamic = "force-dynamic";

type Message = { role: "user" | "assistant"; content: string };

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 1200) : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: Message[] };
    const messages = Array.isArray(body.messages) ? body.messages.slice(-8) : [];
    const last = clean(messages[messages.length - 1]?.content);

    if (!last) return NextResponse.json({ error: "Please enter a question." }, { status: 400 });
    if (last.length > 1200) return NextResponse.json({ error: "Please keep the question under 1200 characters." }, { status: 400 });

    const ctx = getCloudflareContext();
    const env = ctx.env as unknown as Record<string, unknown>;
    const ai = env.AI as { run: (model: string, input: unknown) => Promise<unknown> } | undefined;

    const [items, nutrition] = await Promise.all([
      listMenuItems(env),
      listNutrition(env),
    ]);

    const menuContext = items.map((item) =>
      `- ${item.name} | category: ${item.category_name} | description: ${item.description ?? "not provided"}`
    ).join("\n");

    const nutritionContext = nutrition.map((item) =>
      `- ${item.name}: ${item.calories ?? "?"} cal, ${item.protein_g ?? "?"}g protein, ${item.sodium_mg ?? "?"}mg sodium; verified: ${item.verified_at ?? "unknown"}`
    ).join("\n");

    const system = `You are Cook Out Menu AI, an independent information assistant for an unofficial Cook Out menu website.
Rules:
1. Answer clearly and briefly.
2. Use the supplied database context for menu and nutrition facts.
3. Never invent prices, store locations, hours, nutrition, allergens, or official policies.
4. Prices vary by location and our current database does not contain verified national prices. Say that when pricing is requested.
5. Clearly distinguish database facts from general guidance.
6. You are not affiliated with Cook Out.
7. If the requested fact is unavailable, say so and suggest the relevant site section.
8. You can help with menu discovery, nutrition comparisons, meal ideas, tray planning, shake ideas, price questions, locations, ordering guidance, and site navigation.
MENU DATABASE:
${menuContext}
NUTRITION DATABASE:
${nutritionContext}`;

    if (!ai?.run) {
      return NextResponse.json({
        answer: "Cook Out Menu AI is in local knowledge mode right now. I can still help you browse the menu and verified nutrition data, but live AI generation is not connected yet.",
      });
    }

    const prompt = [
      { role: "system", content: system },
      ...messages.map((m) => ({ role: m.role, content: clean(m.content) })),
    ];

    const result = await ai.run("@cf/meta/llama-3.2-1b-instruct", {
      messages: prompt,
      max_tokens: 450,
      temperature: 0.25,
    });

    const response = typeof result === "string"
      ? result
      : (result as { response?: string; choices?: Array<{ message?: { content?: string } }> })?.response
        ?? (result as { choices?: Array<{ message?: { content?: string } }> })?.choices?.[0]?.message?.content;

    return NextResponse.json({
      answer: response || "I could not generate an answer right now. Try asking about a menu item, nutrition, prices, trays, shakes, or locations.",
    });
  } catch {
    return NextResponse.json(
      { error: "The assistant is temporarily unavailable. Please try again." },
      { status: 503 }
    );
  }
}
