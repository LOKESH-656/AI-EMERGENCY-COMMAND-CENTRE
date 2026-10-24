import assert from "assert";
import { INITIAL_INCIDENTS, INITIAL_UNITS, INITIAL_HOSPITALS } from "../lib/initial-data";
import { CentralizedLLMService } from "../lib/llm";
import { MockNeuralCore } from "../lib/llm/adapters/mock-engine";

async function runVerification() {
  console.log("==========================================================");
  console.log("  AI EMERGENCY COMMAND CENTER - E2E PIPELINE VERIFICATION");
  console.log("==========================================================");

  let passed = 0;
  let failed = 0;

  async function check(name: string, fn: () => void | Promise<void>) {
    try {
      await fn();
      console.log(`  ✓ PASS: ${name}`);
      passed++;
    } catch (err: any) {
      console.error(`  ✗ FAIL: ${name} ->`, err.message);
      failed++;
    }
  }

  // 1. Initial Data Integrity
  await check("Initial Incidents and Apparatus definitions match screenshots", () => {
    assert(INITIAL_INCIDENTS.length >= 6, "Expected at least 6 initial incidents");
    assert(INITIAL_UNITS.length >= 13, "Expected 13 responder units");
    assert(INITIAL_HOSPITALS.length >= 4, "Expected 4 regional trauma hospitals");

    const inc1042 = INITIAL_INCIDENTS.find((i) => i.code === "INC-1042");
    assert(inc1042, "INC-1042 must exist");
    assert.strictEqual(inc1042.title, "Road Accident");
    assert.strictEqual(inc1042.priority, "HIGH");
    assert.strictEqual(inc1042.injuries, "2 Persons");
    assert.strictEqual(inc1042.roadBlock, "Partial (2 Lanes)");

    const hosp1 = INITIAL_HOSPITALS.find((h) => h.code === "HOSP-01");
    assert(hosp1, "HOSP-01 must exist");
    assert.strictEqual(hosp1.capacityUtilization, 86);
    assert.strictEqual(hosp1.openBeds, 16);
  });

  // 2. Llama 3.1 Neural Triage Engine
  await check("Llama 3.1 Neural Core extracts casualties, hazards, and apparatus", async () => {
    const service = new CentralizedLLMService();
    const result = await service.triageEmergency({
      text: "Multi-vehicle collision near East Gate Road and 4th Ave with trapped driver.",
      location: "East Gate Road & 4th Ave, Sector 7",
    });

    assert(result.data.title, "Incident title must be generated");
    assert.strictEqual(result.data.priority, "HIGH");
    assert(result.data.hazards.length > 0, "Hazards list must not be empty");
    assert(result.data.suggestedApparatus.length > 0, "Apparatus list must not be empty");
    assert(result.meta.latencyMs < 1000, `Inference latency (${result.meta.latencyMs}ms) must be under 1s`);
    assert(result.meta.provider, "Provider tag must be present");
  });

  // 3. Vision Multimodal Tokenizer
  await check("Vision Multimodal Tokenizer analyzes scene deformation and fire/smoke", async () => {
    const service = new CentralizedLLMService();
    const vision = await service.analyzeScene();

    assert(vision.data.sceneType, "Scene type must be classified");
    assert(vision.data.vehicleDeformationScore > 0, "Deformation score must be positive");
    assert(vision.data.confidence >= 0.9, "Vision confidence must exceed 90%");
  });

  // 4. Voice Dispatch & Acoustic Stress Filter
  await check("Voice Dispatch filters background acoustics and computes stress level", async () => {
    const service = new CentralizedLLMService();
    const voice = await service.transcribeVoice("car crash");

    assert(voice.data.transcript.length > 20, "Transcript must be realistic length");
    assert(voice.data.stressScore >= 80, "Panicked caller stress score must be high");
    assert(voice.data.backgroundAcoustics.length > 0, "Background noise filter active");
  });

  // 5. ICS Command Sheet Strategy Generation
  await check("FEMA ICS-201/204 strategy generator creates interoperable tactical plan", async () => {
    const service = new CentralizedLLMService();
    const strategy = await service.generateCommandStrategy(
      "Road Accident",
      "East Gate Road & 4th Ave",
      "Multi-vehicle crash with trapped passenger"
    );

    assert(strategy.data.femaIcsForm.includes("ICS-201"), "Must conform to ICS-201 format");
    assert(strategy.data.safetyOfficerDirectives.length >= 3, "Safety directives must be present");
    assert(strategy.data.interoperabilityChannels.length >= 2, "Radio frequencies must be assigned");
  });

  console.log("----------------------------------------------------------");
  console.log(`Results: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log("ALL E2E PIPELINE INTEGRITY TESTS PASSED SUCCESSFULLY! ✓");
  }
}

runVerification();
