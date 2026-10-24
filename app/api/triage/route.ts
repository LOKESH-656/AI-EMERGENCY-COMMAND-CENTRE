import { NextResponse } from "next/server";
import { llmService } from "@/lib/llm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, transcript, location, imageBase64 } = body;

    // Run Llama 3.1 Neural Triage
    const triage = await llmService.triageEmergency({
      text,
      transcript,
      location,
      hasImage: Boolean(imageBase64),
    });

    let sceneVision = null;
    if (imageBase64) {
      sceneVision = await llmService.analyzeScene(imageBase64);
    }

    const newIncident = {
      id: "inc-" + Date.now(),
      code: "INC-" + Math.floor(1043 + Math.random() * 50),
      title: triage.data.title,
      priority: triage.data.priority,
      status: triage.data.status,
      location: triage.data.location,
      description: triage.data.description,
      reportedAt: new Date().toISOString(),
      assignedUnits: triage.data.recommendedUnits,
      injuries: triage.data.injuries,
      roadBlock: triage.data.roadBlock,
      coordinates: {
        lat: 37.7749 + (Math.random() - 0.5) * 0.05,
        lng: -122.4194 + (Math.random() - 0.5) * 0.05,
      },
      aiAnalysis: {
        modelUsed: `${triage.meta.model} (${triage.meta.provider})`,
        inferenceLatency: `${(triage.meta.latencyMs / 1000).toFixed(2)}s`,
        confidenceScore: 0.97,
        hazards: triage.data.hazards,
        suggestedApparatus: triage.data.suggestedApparatus,
        medicalSummary: triage.data.medicalSummary,
        icsRecommendedAction: triage.data.icsRecommendedAction,
      },
      sceneVision: sceneVision?.data || null,
    };

    return NextResponse.json({
      success: true,
      incident: newIncident,
      triageMeta: triage.meta,
      visionMeta: sceneVision?.meta || null,
    });
  } catch (error: any) {
    console.error("Triage error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process emergency triage" },
      { status: 500 }
    );
  }
}
