// Automated End-to-End Verification Test Script for AI Emergency Command Center
const assert = require("assert");

async function runTests() {
  console.log("==================================================");
  console.log("  AI EMERGENCY COMMAND CENTER - TEST PIPELINE");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  function test(name, fn) {
    try {
      fn();
      console.log(`  ✓ PASS: ${name}`);
      passed++;
    } catch (e) {
      console.error(`  ✗ FAIL: ${name}`, e.message);
      failed++;
    }
  }

  async function testAsync(name, fn) {
    try {
      await fn();
      console.log(`  ✓ PASS: ${name}`);
      passed++;
    } catch (e) {
      console.error(`  ✗ FAIL: ${name}`, e.message);
      failed++;
    }
  }

  // 1. Initial Data Integrity Test
  test("Initial Incidents and Apparatus definitions are present", () => {
    const data = require("../lib/initial-data.ts");
    assert(data.INITIAL_INCIDENTS.length >= 6, "Expected at least 6 initial incidents");
    assert(data.INITIAL_UNITS.length >= 13, "Expected at least 13 responder units");
    assert(data.INITIAL_HOSPITALS.length >= 4, "Expected 4 regional trauma hospitals");

    // Check INC-1042 exact screenshot details
    const inc1042 = data.INITIAL_INCIDENTS.find((i) => i.code === "INC-1042");
    assert(inc1042, "INC-1042 must be present");
    assert.strictEqual(inc1042.title, "Road Accident");
    assert.strictEqual(inc1042.priority, "HIGH");
    assert.strictEqual(inc1042.injuries, "2 Persons");
    assert.strictEqual(inc1042.roadBlock, "Partial (2 Lanes)");

    // Check Hospital HOSP-01
    const hosp1 = data.INITIAL_HOSPITALS.find((h) => h.code === "HOSP-01");
    assert(hosp1, "HOSP-01 must be present");
    assert.strictEqual(hosp1.capacityUtilization, 86);
    assert.strictEqual(hosp1.openBeds, 16);
  });

  // 2. Mock Neural Core Triage Test
  await testAsync("Mock Neural Core generates valid structured triage payload", async () => {
    const { MockNeuralCore } = require("../lib/llm/adapters/mock-engine.ts");
    const result = await MockNeuralCore.triageEmergency({
      text: "Multi-vehicle pileup with 2 trapped injuries near East Gate",
      location: "East Gate Road & 4th Ave",
    });

    assert(result.title, "Title should be generated");
    assert.strictEqual(result.priority, "HIGH");
    assert(result.hazards.length > 0, "Hazards should be detected");
    assert(result.suggestedApparatus.length > 0, "Apparatus should be recommended");
  });

  // 3. Centralized LLM Service Fallback Test
  await testAsync("Centralized LLM service successfully falls back without API keys", async () => {
    const { CentralizedLLMService } = require("../lib/llm/index.ts");
    const service = new CentralizedLLMService();
    const triage = await service.triageEmergency({
      text: "Commercial warehouse fire with hazardous ammonia smoke",
    });

    assert(triage.data, "Data object should exist");
    assert(triage.meta, "Meta object should exist");
    assert(triage.meta.latencyMs < 1000, "Sub-second triage latency verified");
    assert.strictEqual(triage.meta.provider, "mock-neural-core");
  });

  // 4. Voice Dispatch & Acoustic Stress Analysis Test
  await testAsync("Voice dispatch simulation yields realistic emotional stress scores", async () => {
    const { MockNeuralCore } = require("../lib/llm/adapters/mock-engine.ts");
    const voiceResult = await MockNeuralCore.transcribeVoiceDispatch("car crash");

    assert(voiceResult.transcript.length > 10, "Transcript should not be empty");
    assert(voiceResult.stressScore >= 80, "High stress score expected for emergency call");
    assert(voiceResult.backgroundAcoustics.length > 0, "Acoustic background filtered");
  });

  // 5. ICS Command Sheet Strategy Generation Test
  await testAsync("ICS-201/204 command strategy produces standard FEMA protocols", async () => {
    const { MockNeuralCore } = require("../lib/llm/adapters/mock-engine.ts");
    const strat = await MockNeuralCore.generateCommandStrategy("Structural Fire", "Oakland Complex");

    assert(strat.femaIcsForm.includes("ICS-201"), "ICS Form header should match");
    assert(strat.safetyOfficerDirectives.length >= 3, "Safety directives required");
    assert(strat.interoperabilityChannels.length >= 2, "Radio frequencies specified");
  });

  console.log("--------------------------------------------------");
  console.log(`Results: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log("ALL PIPELINE INTEGRITY TESTS PASSED SUCCESSFULLY!");
  }
}

runTests();
