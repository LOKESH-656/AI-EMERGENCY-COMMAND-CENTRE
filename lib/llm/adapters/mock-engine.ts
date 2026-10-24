import { TriageResult, SceneAnalysisResult, VoiceDispatchResult, CommandSheetStrategy } from "../types";

export class MockNeuralCore {
  static async triageEmergency(input: {
    text?: string;
    transcript?: string;
    location?: string;
    hasImage?: boolean;
  }): Promise<TriageResult> {
    // Simulate ultra-fast Llama 3.1 neural inference (180ms)
    await new Promise((r) => setTimeout(r, 180));

    const combined = `${input.text || ""} ${input.transcript || ""} ${input.location || ""}`.toLowerCase();

    if (combined.includes("fire") || combined.includes("smoke") || combined.includes("flame") || combined.includes("warehouse")) {
      return {
        title: "Structural Fire",
        priority: "HIGH",
        status: "DISPATCHED",
        location: input.location || "Oakland Commercial Complex, 3rd Fl",
        description: input.text || "Active structural fire with heavy smoke condition spreading to upper floors.",
        injuries: "0 Persons",
        roadBlock: "Severe (Full closure)",
        casualtiesCount: 0,
        hazards: ["High heat radiation", "Heavy smoke inhalation risk", "Structural integrity degradation"],
        suggestedApparatus: ["Engine Co. 4", "Ladder 2 Rescue", "Police Perimeter"],
        medicalSummary: "No human burn casualties confirmed yet; EMS staging on southwest quadrant.",
        icsRecommendedAction: "Assign 2-in-2-out attack team, establish 200m hot-zone cordon.",
        hospitalPreAlertRequired: true,
        closestHospitalId: "HOSP-01",
        recommendedUnits: ["ENG-04", "LAD-02", "POL-03"],
      };
    }

    if (combined.includes("heart") || combined.includes("cardiac") || combined.includes("collapse") || combined.includes("cpr") || combined.includes("unconscious")) {
      return {
        title: "Medical Emergency (Cardiac)",
        priority: "HIGH",
        status: "ON SCENE",
        location: input.location || "Metro Central Mall - Food Court",
        description: input.text || "Sudden cardiac collapse. Bystander chest compressions underway with automated AED.",
        injuries: "1 Persons",
        roadBlock: "None",
        casualtiesCount: 1,
        hazards: ["Pedestrian congestion in commercial atrium", "Restricted vehicle access to mall inner concourse"],
        suggestedApparatus: ["MICU Alpha-1", "Advanced Life Support (ALS)"],
        medicalSummary: "Adult male, pulseless, non-breathing; AED recommended shock delivered.",
        icsRecommendedAction: "Direct security to hold Service Elevator 4 for stretcher transfer to ambulance bay.",
        hospitalPreAlertRequired: true,
        closestHospitalId: "HOSP-03",
        recommendedUnits: ["AMB-01"],
      };
    }

    // Default to vehicle collision or dynamic report
    return {
      title: "Road Accident (Multi-Vehicle)",
      priority: "HIGH",
      status: "RESPONDING",
      location: input.location || "East Gate Road & 4th Ave, Sector 7",
      description: input.text || "Multi-vehicle collision with severe entrapment and fuel spill detected.",
      injuries: "2 Persons",
      roadBlock: "Partial (2 Lanes)",
      casualtiesCount: 2,
      hazards: ["Flammable petroleum pool", "Airbag deployment powder", "Downed communication cables"],
      suggestedApparatus: ["Medic 7 ALS", "Traffic Unit 12", "Ladder 2 Rescue"],
      medicalSummary: "Patient 1: Trapped driver with pelvic contusion; Patient 2: Concussed passenger, GCS 13.",
      icsRecommendedAction: "Deploy jaws of life on driver B-pillar, redirect westbound traffic to 5th Ave.",
      hospitalPreAlertRequired: true,
      closestHospitalId: "HOSP-01",
      recommendedUnits: ["AMB-07", "POL-12", "LAD-02"],
    };
  }

  static async analyzeSceneVision(fileName?: string): Promise<SceneAnalysisResult> {
    await new Promise((r) => setTimeout(r, 220));
    return {
      sceneType: "Multi-vehicle intersection collision with heavy mechanical impact",
      severity: "HIGH",
      damageAssessment: "Driver-side intrusion on Sedan A exceeding 35cm; rollover risk for adjacent SUV.",
      vehicleDeformationScore: 7.8,
      smokeDensity: "Light White",
      firePresent: false,
      hazardousPlacardDetected: "UN 1203 (Gasoline Flammable Liquid)",
      entrapmentDetected: true,
      suggestedPerimeterRadiusMeters: 75,
      confidence: 0.96,
    };
  }

  static async transcribeVoiceDispatch(simulatedScenario?: string): Promise<VoiceDispatchResult> {
    await new Promise((r) => setTimeout(r, 150));
    const scenario = simulatedScenario || "car crash";

    if (scenario.includes("fire")) {
      return {
        transcript: "Emergency! There is black smoke pouring out of the 3rd floor HVAC vent at Oakland Commercial! The alarms are blaring, people are running out down the stairs!",
        callerEmotionalState: "PANICKED",
        stressScore: 89,
        backgroundAcoustics: ["fire alarm chime", "rushing footsteps", "reverberant hall echoes"],
        urgencyLevel: "HIGH",
        extractedKeyDetails: ["3rd floor HVAC", "active black smoke", "evacuation in progress"],
      };
    }

    if (scenario.includes("medical") || scenario.includes("collapse")) {
      return {
        transcript: "Someone just collapsed in the food court! He's not breathing, an off-duty nurse started chest compressions and we just grabbed the wall AED defibrillator!",
        callerEmotionalState: "DISTRESSED",
        stressScore: 92,
        backgroundAcoustics: ["AED synthetic voice prompts", "crowd murmuring", "shopping mall ambiance"],
        urgencyLevel: "IMMEDIATE_LIFE_THREAT",
        extractedKeyDetails: ["unresponsive adult", "bystander CPR ongoing", "AED attached"],
      };
    }

    return {
      transcript: "Dispatch, this is a 911 witness. Two cars just smashed at East Gate Road and 4th Avenue! One car is crushed against a traffic light pole. The driver is stuck inside!",
      callerEmotionalState: "PANICKED",
      stressScore: 85,
      backgroundAcoustics: ["car horns", "shattering glass", "passing engine revs"],
      urgencyLevel: "IMMEDIATE_LIFE_THREAT",
      extractedKeyDetails: ["2 vehicles involved", "driver entrapped against pole", "East Gate & 4th intersection"],
    };
  }

  static async generateCommandStrategy(incidentTitle: string, location: string): Promise<CommandSheetStrategy> {
    await new Promise((r) => setTimeout(r, 200));
    return {
      incidentCommanderNotes: `Incident ${incidentTitle} at ${location}. Unified Command established with EMS Division Chief and Police Tactical Lead. Priority focus on life-safety preservation and rapid extrication corridor.`,
      femaIcsForm: "ICS-201 Incident Briefing / ICS-204 Assignment List",
      operationalPeriod: "00:00 - 02:00 Tactical Surge",
      safetyOfficerDirectives: [
        "Full PPE Level B mandatory within 50-meter hot zone",
        "Continuous atmospheric volatile gas monitoring",
        "Maintain secondary water line charged during extrication cuts",
      ],
      evacuationZoneRadius: "150 meters",
      stagingAreaLocation: "Sector 7 North Parking Structure, Level 1",
      interoperabilityChannels: ["TAC-FIRE-04", "EMS-TRAUMA-02", "POLICE-DISPATCH-9"],
      hospitalSurgePlan: "City General Trauma Center notified for code red trauma activation; back-up diverts set to Metro Emergency.",
    };
  }
}
