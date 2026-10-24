import { NextResponse } from "next/server";
import { INITIAL_HOSPITALS } from "@/lib/initial-data";

let serverHospitals = [...INITIAL_HOSPITALS];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: serverHospitals,
    count: serverHospitals.length,
  });
}

export async function POST(req: Request) {
  try {
    const { hospitalId, customMessage } = await req.json();
    serverHospitals = serverHospitals.map((h) => {
      if (h.id === hospitalId || h.code === hospitalId) {
        const openBeds = Math.max(0, h.openBeds - 1);
        return {
          ...h,
          status: "ALERTED" as const,
          openBeds,
          capacityUtilization: Math.min(100, Math.round(((h.totalBeds - openBeds) / h.totalBeds) * 100)),
          lastAlertSent: customMessage || `Emergency Pre-arrival alert triggered at ${new Date().toLocaleTimeString()}`,
        };
      }
      return h;
    });

    return NextResponse.json({ success: true, data: serverHospitals });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
