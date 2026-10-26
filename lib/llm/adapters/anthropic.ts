import { CommandSheetStrategy, CommandSheetStrategySchema } from "../types";

export class AnthropicAdapter {
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.ANTHROPIC_API_KEY || "";
    this.model = process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-20241022";
  }

  isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.length > 5);
  }

  async generateCommandStrategy(
    title: string,
    location: string,
    description: string
  ): Promise<{ result: CommandSheetStrategy; tokens: { prompt: number; completion: number; total: number } }> {
    const prompt = `You are a Senior FEMA Incident Commander and ICS-201/204 Tactical Lead for 911 dispatch.
Provide an operational command strategy for Incident: "${title}" at "${location}".
Description: ${description}

Return a valid JSON object matching exactly this schema (no extra keys, no markdown):
{
  "incidentCommanderNotes": string,
  "femaIcsForm": string,
  "operationalPeriod": string,
  "safetyOfficerDirectives": string[],
  "evacuationZoneRadius": string,
  "stagingAreaLocation": string,
  "interoperabilityChannels": string[],
  "hospitalSurgePlan": string
}

Return only raw JSON, no code fences.`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      throw new Error(`Anthropic API error: ${res.status} ${await res.text()}`);
    }

    const data = await res.json();
    const content = data.content?.[0]?.text || "{}";

    // Strip any accidental markdown fences
    const cleaned = content.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    const validated = CommandSheetStrategySchema.parse(parsed);

    return {
      result: validated,
      tokens: {
        prompt: data.usage?.input_tokens || 0,
        completion: data.usage?.output_tokens || 0,
        total: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
      },
    };
  }
}
