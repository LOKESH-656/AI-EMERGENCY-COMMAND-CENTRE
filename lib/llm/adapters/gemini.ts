import { SceneAnalysisResult, SceneAnalysisSchema } from "../types";

export class GeminiAdapter {
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || "";
    this.model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  }

  isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.length > 5);
  }

  async analyzeSceneVision(imageBase64?: string, mimeType = "image/jpeg"): Promise<{
    result: SceneAnalysisResult;
    tokens: { prompt: number; completion: number; total: number };
  }> {
    const prompt = `You are the Computer Vision Neural Core for the 911 AI Emergency Command Center.
Analyze this emergency drone or witness photograph. Return a strictly valid JSON object matching this schema:
{
  "sceneType": string,
  "severity": "CRITICAL" | "HIGH" | "MODERATE" | "LOW",
  "damageAssessment": string,
  "vehicleDeformationScore": number (0 to 10),
  "smokeDensity": "None" | "Light White" | "Moderate Gray" | "Heavy Black Toxic",
  "firePresent": boolean,
  "hazardousPlacardDetected": string,
  "entrapmentDetected": boolean,
  "suggestedPerimeterRadiusMeters": number,
  "confidence": number (between 0.0 and 1.0)
}
Return only raw JSON.`;

    const contents: any[] = [];
    const parts: any[] = [{ text: prompt }];

    if (imageBase64) {
      parts.push({
        inline_data: {
          mime_type: mimeType,
          data: imageBase64,
        },
      });
    }

    contents.push({ parts });

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.2,
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.status} ${await res.text()}`);
    }

    const data = await res.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(candidate || "{}");
    const validated = SceneAnalysisSchema.parse(parsed);

    return {
      result: validated,
      tokens: {
        prompt: data.usageMetadata?.promptTokenCount || 0,
        completion: data.usageMetadata?.candidatesTokenCount || 0,
        total: data.usageMetadata?.totalTokenCount || 0,
      },
    };
  }
}
