import { NextResponse } from "next/server";
import { INITIAL_INCIDENTS } from "@/lib/initial-data";

// In-memory persistent cache for server-side
let serverIncidents = [...INITIAL_INCIDENTS];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: serverIncidents,
    count: serverIncidents.length,
  });
}

export async function POST(req: Request) {
  try {
    const newIncident = await req.json();
    serverIncidents = [newIncident, ...serverIncidents];
    return NextResponse.json({ success: true, data: newIncident });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
