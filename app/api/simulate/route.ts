import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { type } = await req.json();

    if (type === "workflow_step") {
      // Return structured workflow steps
      const steps = [
        {
          step: 1,
          name: "Multimodal Ingestion",
          time: "0.0s",
          description: "Incoming 911 distress call, audio waveform frequency analysis & citizen smartphone photo uploaded.",
          status: "COMPLETED",
        },
        {
          step: 2,
          name: "Llama 3.1 Neural Core Triage",
          time: "0.28s",
          description: "Zero-shot NER extraction: 2 injured victims, trapped occupant, vehicle fluid hazard detected. High Priority assigned.",
          status: "COMPLETED",
        },
        {
          step: 3,
          name: "Multi-Agency Simultaneous Dispatch",
          time: "0.34s",
          description: "Apparatus telemetry queried: AMB-07 dispatched (ETA 4m), POL-12 dispatched (ETA 7m), LAD-02 alerted.",
          status: "COMPLETED",
        },
        {
          step: 4,
          name: "Trauma Hospital Bi-Directional Alert",
          time: "0.41s",
          description: "City General Trauma Center ER receives telemetry; Red Trauma Bay reserved with surgical team staged.",
          status: "COMPLETED",
        },
        {
          step: 5,
          name: "GPS Corridor Routing & Traffic Diversion",
          time: "0.55s",
          description: "Automated road blockage transmitted to municipal traffic grid; signal priority enabled for AMB-07.",
          status: "COMPLETED",
        },
      ];

      return NextResponse.json({ success: true, steps });
    }

    return NextResponse.json({ success: true, message: "Simulation active" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
