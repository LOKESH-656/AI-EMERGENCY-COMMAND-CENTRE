import { NextResponse } from "next/server";
import { INITIAL_UNITS } from "@/lib/initial-data";

let serverUnits = [...INITIAL_UNITS];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: serverUnits,
    count: serverUnits.length,
  });
}

export async function PATCH(req: Request) {
  try {
    const { unitId, status, currentOrder, eta } = await req.json();
    serverUnits = serverUnits.map((u) => {
      if (u.id === unitId || u.callSign === unitId) {
        return {
          ...u,
          status: status || u.status,
          currentOrder: currentOrder || u.currentOrder,
          eta: eta || u.eta,
        };
      }
      return u;
    });
    return NextResponse.json({ success: true, data: serverUnits });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
