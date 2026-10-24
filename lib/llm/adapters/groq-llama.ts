import { TriageResult, TriageResultSchema } from "../types";

export class GroqLlamaAdapter {
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.GROQ_API_KEY || "";
    this.model = process.env.GROQ_MODEL || "llama-3.1-70b-versatile";
  }

  isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.length > 5);
  }

  async triageEmergency(input: {
    text?: string;
    transcript?: string;
    location?: string;
  }): Promise<{ result: TriageResult; tokens: { prompt: number; completion: number; total: number } }> {
    const prompt = `You are the Llama 3.1 Neural Core for 911 AI Emergency Command Center.
Analyze the following emergency transmission and return a strictly valid JSON object matching the schema below:
{
  "title": string,
  "priority": "HIGH" | "MEDIUM" | "LOW",
  "status": "RESPONDING" | "DISPATCHED" | "ON SCENE" | "INVESTIGATING" | "CONTAINED" | "SCHEDULED",
  "location": string,
  "description": string,
  "injuries": string (e.g. "2 Persons" or "0 Persons"),
  "roadBlock": string (e.g. "Partial (2 Lanes)" or "None"),
  "casualtiesCount": number,
  "hazards": string[],
  "suggestedApparatus": string[],
  "medicalSummary": string,
  "icsRecommendedAction": string,
  "hospitalPreAlertRequired": boolean,
  "closestHospitalId": "HOSP-01" | "HOSP-02" | "HOSP-03" | "HOSP-04",
  "recommendedUnits": string[]
}

Emergency Caller Transmission:
Text: ${input.text || "N/A"}
Voice Transcript: ${input.transcript || "N/A"}
Reported Location: ${input.location || "N/A"}

Respond ONLY with raw JSON.`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.1,
      }),
    });

    if (!res.ok) {
      throw new Error(`Groq API responded with status ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    const content = data.choices[0].message.content;
    const parsed = JSON.parse(content);
    const validated = TriageResultSchema.parse(parsed);

    return {
      result: validated,
      tokens: {
        prompt: data.usage?.prompt_tokens || 0,
        completion: data.usage?.completion_tokens || 0,
        total: data.usage?.total_tokens || 0,
      },
    };
  }
}
