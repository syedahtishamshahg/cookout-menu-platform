import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDatabase();
    const result = await db.prepare("SELECT 1 AS ok").all();
    return NextResponse.json({ ok: true, database: "connected", result });
  } catch {
    return NextResponse.json(
      { ok: false, database: "unavailable" },
      { status: 503 }
    );
  }
}
