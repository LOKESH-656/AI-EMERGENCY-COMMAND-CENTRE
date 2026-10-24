import { NextResponse } from "next/server";
import { llmService } from "@/lib/llm";

export async function POST(req: Request) {
  try {
    const { title, location, description } = await req.json();
    const strategy = await llmService.generateCommandStrategy(
      title || "Emergency Incident",
      location || "Metro Sector",
      description || "General multi-agency tactical deployment required."
    );

    return NextResponse.json({
      success: true,
      strategy: strategy.data,
      meta: strategy.meta,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
