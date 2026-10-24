export type Priority = "HIGH" | "MEDIUM" | "LOW";
export type IncidentStatus = "RESPONDING" | "DISPATCHED" | "ON SCENE" | "INVESTIGATING" | "CONTAINED" | "SCHEDULED" | "RESOLVED";
export type UnitAgency = "EMS" | "Police" | "Fire & Rescue";
export type UnitStatus = "RESPONDING" | "BUSY" | "AVAILABLE";

export interface Incident {
  id: string;
  code: string;
  title: string;
  priority: Priority;
  status: IncidentStatus;
  location: string;
  description: string;
  reportedAt: string;
  assignedUnits: string[];
  injuries: string;
  roadBlock: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  aiAnalysis?: {
    modelUsed: string;
    inferenceLatency: string;
    confidenceScore: number;
    hazards: string[];
    suggestedApparatus: string[];
    medicalSummary: string;
    icsRecommendedAction: string;
    closestHospitalId?: string;
  };
}

export interface ResponderUnit {
  id: string;
  callSign: string;
  name: string;
  agency: UnitAgency;
  status: UnitStatus;
  currentOrder: string;
  eta: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  batteryOrFuel?: number;
  personnelCount?: number;
  specialty?: string;
}

export interface Hospital {
  id: string;
  code: string;
  name: string;
  level: string;
  status: "ALERTED" | "NORMAL";
  distanceKm: number;
  etaMin: number;
  capacityUtilization: number; // e.g. 86
  openBeds: number;
  totalBeds: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  traumaBayStatus: "Ready" | "Occupied" | "Critical";
  lastAlertSent?: string;
}

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: "1",
    code: "INC-1042",
    title: "Road Accident",
    priority: "HIGH",
    status: "RESPONDING",
    location: "East Gate Road & 4th Ave",
    description: "Multi-vehicle collision with 2 reported injuries. Trapped passenger extricated. Traffic obstruction causing secondary hazard.",
    reportedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    assignedUnits: ["AMB-07", "POL-12", "HOSP-01"],
    injuries: "2 Persons",
    roadBlock: "Partial (2 Lanes)",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    aiAnalysis: {
      modelUsed: "Meta Llama 3.1 70B Neural Core",
      inferenceLatency: "0.28s",
      confidenceScore: 0.98,
      hazards: ["Vehicle fluid leakage", "Traffic choke point", "Spilled glass & metal debris"],
      suggestedApparatus: ["ALS Ambulance", "Traffic Management Cruiser", "Trauma Bay Prep"],
      medicalSummary: "Patient A: Blunt thoracic trauma; Patient B: Cervical spine precaution, alert and oriented.",
      icsRecommendedAction: "Establish outer perimeter at 3rd Ave diversion, route AMB-07 via express corridor to City General."
    }
  },
  {
    id: "2",
    code: "INC-1041",
    title: "Structural Fire",
    priority: "HIGH",
    status: "DISPATCHED",
    location: "Oakland Commercial Complex, 3rd Fl",
    description: "Electrical fire detected in commercial HVAC unit. Smoke spreading to floors 3 and 4. Building evacuation initiated.",
    reportedAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    assignedUnits: ["ENG-04", "LAD-02", "POL-03"],
    injuries: "0 Persons",
    roadBlock: "Severe (Full closure)",
    coordinates: { lat: 37.8044, lng: -122.2712 },
    aiAnalysis: {
      modelUsed: "Meta Llama 3.1 70B Neural Core",
      inferenceLatency: "0.32s",
      confidenceScore: 0.95,
      hazards: ["High voltage HVAC feed", "Toxic smoke accumulation", "Roof ventilation required"],
      suggestedApparatus: ["Pumper Engine", "Aerial Ladder", "Police Perimeter"],
      medicalSummary: "No immediate casualties reported. Inhalation risk standby for evacuees.",
      icsRecommendedAction: "Initiate 2-alarm structural response, establish triage point on south parking lot."
    }
  },
  {
    id: "3",
    code: "INC-1040",
    title: "Medical Emergency",
    priority: "HIGH",
    status: "ON SCENE",
    location: "Metro Central Mall - Food Court",
    description: "Elderly individual collapsed, signs consistent with cardiac arrest. Bystander CPR underway using automated AED.",
    reportedAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    assignedUnits: ["AMB-01"],
    injuries: "1 Persons",
    roadBlock: "None",
    coordinates: { lat: 37.7833, lng: -122.4067 },
    aiAnalysis: {
      modelUsed: "Meta Llama 3.1 70B Neural Core",
      inferenceLatency: "0.19s",
      confidenceScore: 0.99,
      hazards: ["Crowd obstruction", "Pedestrian mall access"],
      suggestedApparatus: ["Mobile Intensive Care Unit (MICU)", "AED Paramedic Team"],
      medicalSummary: "V-Fib cardiac arrest; bystander shock delivered; CPR in cycle 3.",
      icsRecommendedAction: "Direct mall security to open freight bay 2 for rapid gurney egress."
    }
  },
  {
    id: "4",
    code: "INC-1039",
    title: "Traffic Collision",
    priority: "MEDIUM",
    status: "INVESTIGATING",
    location: "South Highway Ex 14",
    description: "Fender bender involving two sedans. No injuries, minor vehicular fluid, traffic slowing due to rubbernecking.",
    reportedAt: new Date(Date.now() - 26 * 60 * 1000).toISOString(),
    assignedUnits: ["POL-08"],
    injuries: "0 Persons",
    roadBlock: "Minor (Shoulder only)",
    coordinates: { lat: 37.7321, lng: -122.4045 },
    aiAnalysis: {
      modelUsed: "Meta Llama 3.1 8B Quick-Triage",
      inferenceLatency: "0.15s",
      confidenceScore: 0.92,
      hazards: ["Highway rubbernecking wave", "Radiator coolant puddle"],
      suggestedApparatus: ["Highway Patrol Cruiser", "Flatbed Tow Service"],
      medicalSummary: "Both drivers refused EMS evaluation; non-injury incident.",
      icsRecommendedAction: "Clear vehicles to emergency turnout, deploy flares."
    }
  },
  {
    id: "5",
    code: "INC-1038",
    title: "Hazardous Material",
    priority: "HIGH",
    status: "CONTAINED",
    location: "Industrial District Warehouse 9",
    description: "Ammonia pressure valve rupture. Automated suppression triggered, isolation perimeter established.",
    reportedAt: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
    assignedUnits: ["HAZ-01"],
    injuries: "0 Persons",
    roadBlock: "Moderate (Zone cordoned)",
    coordinates: { lat: 37.7612, lng: -122.3891 },
    aiAnalysis: {
      modelUsed: "Meta Llama 3.1 70B Neural Core",
      inferenceLatency: "0.29s",
      confidenceScore: 0.97,
      hazards: ["Anhydrous ammonia cloud", "Downwind dispersion risk"],
      suggestedApparatus: ["Level-A Hazmat Unit", "Atmospheric Sniffer Drones"],
      medicalSummary: "Warehouse workers safely evacuated; zero exposure hospitalizations.",
      icsRecommendedAction: "Maintain 300m hot-zone downwind cordon until vapor sensor drops below 25 ppm."
    }
  },
  {
    id: "6",
    code: "INC-1037",
    title: "Road Obstruction",
    priority: "LOW",
    status: "SCHEDULED",
    location: "Pine Hill Parkway & Elm",
    description: "Fallen tree limb blocking eastbound bicycle lane and curbside traffic lane.",
    reportedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    assignedUnits: [],
    injuries: "0 Persons",
    roadBlock: "Partial (Fallen tree branch)",
    coordinates: { lat: 37.7510, lng: -122.4477 },
    aiAnalysis: {
      modelUsed: "Meta Llama 3.1 8B Quick-Triage",
      inferenceLatency: "0.12s",
      confidenceScore: 0.94,
      hazards: ["Low light obstruction for cyclists"],
      suggestedApparatus: ["Public Works Chainsaw Crew"],
      medicalSummary: "No human contact or injury.",
      icsRecommendedAction: "Schedule DPW cleanup for next sector sweep; temporary cones placed."
    }
  }
];

export const INITIAL_UNITS: ResponderUnit[] = [
  {
    id: "u1",
    callSign: "AMB-07",
    name: "Medic 7 ALS",
    agency: "EMS",
    status: "RESPONDING",
    currentOrder: "INC-1042 (East Gate)",
    eta: "4 min",
    coordinates: { lat: 37.7715, lng: -122.4150 },
    batteryOrFuel: 88,
    personnelCount: 2,
    specialty: "Advanced Life Support / Cardiac Monitor"
  },
  {
    id: "u2",
    callSign: "AMB-01",
    name: "MICU Alpha-1",
    agency: "EMS",
    status: "BUSY",
    currentOrder: "INC-1040 (Central Mall)",
    eta: "On Scene",
    coordinates: { lat: 37.7833, lng: -122.4067 },
    batteryOrFuel: 92,
    personnelCount: 3,
    specialty: "Mobile Intensive Care / Critical Care Physician"
  },
  {
    id: "u3",
    callSign: "AMB-03",
    name: "Medic 3 BLS",
    agency: "EMS",
    status: "AVAILABLE",
    currentOrder: "Station 3 Standby",
    eta: "Ready",
    coordinates: { lat: 37.7650, lng: -122.4300 },
    batteryOrFuel: 100,
    personnelCount: 2,
    specialty: "Basic Life Support / Rapid Transport"
  },
  {
    id: "u4",
    callSign: "AMB-09",
    name: "Medic 9 ALS",
    agency: "EMS",
    status: "AVAILABLE",
    currentOrder: "Metro South Depot",
    eta: "Ready",
    coordinates: { lat: 37.7400, lng: -122.4100 },
    batteryOrFuel: 79,
    personnelCount: 2,
    specialty: "Advanced Life Support / Trauma Pack"
  },
  {
    id: "u5",
    callSign: "AMB-11",
    name: "Medic 11 BLS",
    agency: "EMS",
    status: "AVAILABLE",
    currentOrder: "Westside Base",
    eta: "Ready",
    coordinates: { lat: 37.7600, lng: -122.4700 },
    batteryOrFuel: 95,
    personnelCount: 2,
    specialty: "Basic Life Support / Non-Emergent"
  },
  {
    id: "u6",
    callSign: "POL-12",
    name: "Traffic Unit 12",
    agency: "Police",
    status: "RESPONDING",
    currentOrder: "INC-1042 (East Gate)",
    eta: "7 min",
    coordinates: { lat: 37.7780, lng: -122.4250 },
    batteryOrFuel: 84,
    personnelCount: 1,
    specialty: "Traffic Collision Investigation & Diverts"
  },
  {
    id: "u7",
    callSign: "POL-08",
    name: "Highway Patrol 8",
    agency: "Police",
    status: "BUSY",
    currentOrder: "INC-1039 (South Hwy)",
    eta: "On Scene",
    coordinates: { lat: 37.7321, lng: -122.4045 },
    batteryOrFuel: 71,
    personnelCount: 2,
    specialty: "State Highway Interceptor"
  },
  {
    id: "u8",
    callSign: "POL-03",
    name: "Squad 3 Patrol",
    agency: "Police",
    status: "AVAILABLE",
    currentOrder: "Downtown Sector",
    eta: "Ready",
    coordinates: { lat: 37.7900, lng: -122.4000 },
    batteryOrFuel: 90,
    personnelCount: 2,
    specialty: "Urban Sector Patrol & Fast Response"
  },
  {
    id: "u9",
    callSign: "POL-19",
    name: "Tactical Unit 19",
    agency: "Police",
    status: "AVAILABLE",
    currentOrder: "HQ Reserve",
    eta: "Ready",
    coordinates: { lat: 37.7700, lng: -122.3900 },
    batteryOrFuel: 96,
    personnelCount: 4,
    specialty: "SWAT / Active Shooter / Barricade"
  },
  {
    id: "u10",
    callSign: "ENG-04",
    name: "Engine Co. 4",
    agency: "Fire & Rescue",
    status: "BUSY",
    currentOrder: "INC-1041 (Oakland Complex)",
    eta: "On Scene",
    coordinates: { lat: 37.8044, lng: -122.2712 },
    batteryOrFuel: 83,
    personnelCount: 4,
    specialty: "1500 GPM Water Pumper & Foam"
  },
  {
    id: "u11",
    callSign: "LAD-02",
    name: "Ladder 2 Rescue",
    agency: "Fire & Rescue",
    status: "RESPONDING",
    currentOrder: "INC-1041 (Oakland Complex)",
    eta: "3 min",
    coordinates: { lat: 37.8010, lng: -122.2780 },
    batteryOrFuel: 77,
    personnelCount: 4,
    specialty: "105ft Aerial Tiller & Heavy Extrication Jaws"
  },
  {
    id: "u12",
    callSign: "HAZ-01",
    name: "Hazmat Co. 1",
    agency: "Fire & Rescue",
    status: "BUSY",
    currentOrder: "INC-1038 (Warehouse 9)",
    eta: "On Scene",
    coordinates: { lat: 37.7612, lng: -122.3891 },
    batteryOrFuel: 89,
    personnelCount: 3,
    specialty: "Chemical Neutralization & Atmospheric Sensors"
  },
  {
    id: "u13",
    callSign: "AIR-01",
    name: "Medevac Flight 1",
    agency: "EMS",
    status: "AVAILABLE",
    currentOrder: "Helipad Alpha",
    eta: "Ready",
    coordinates: { lat: 37.7120, lng: -122.2150 },
    batteryOrFuel: 100,
    personnelCount: 3,
    specialty: "Critical Care Aeromedical Rotorcraft"
  }
];

export const INITIAL_HOSPITALS: Hospital[] = [
  {
    id: "h1",
    code: "HOSP-01",
    name: "City General Trauma Center",
    level: "Level 1",
    status: "ALERTED",
    distanceKm: 3.1,
    etaMin: 6,
    capacityUtilization: 86,
    openBeds: 16,
    totalBeds: 120,
    coordinates: { lat: 37.7558, lng: -122.4048 },
    traumaBayStatus: "Ready",
    lastAlertSent: "INC-1042 (2 casualties incoming, ETA 6m)"
  },
  {
    id: "h2",
    code: "HOSP-02",
    name: "St. Jude Memorial Hospital",
    level: "Level 2",
    status: "NORMAL",
    distanceKm: 4.8,
    etaMin: 11,
    capacityUtilization: 94,
    openBeds: 5,
    totalBeds: 90,
    coordinates: { lat: 37.7850, lng: -122.4350 },
    traumaBayStatus: "Critical"
  },
  {
    id: "h3",
    code: "HOSP-03",
    name: "Metro Emergency Hospital",
    level: "Level 1",
    status: "ALERTED",
    distanceKm: 2.4,
    etaMin: 5,
    capacityUtilization: 68,
    openBeds: 34,
    totalBeds: 110,
    coordinates: { lat: 37.7800, lng: -122.4120 },
    traumaBayStatus: "Ready",
    lastAlertSent: "INC-1040 (Cardiac arrest resuscitation bay prepped)"
  },
  {
    id: "h4",
    code: "HOSP-04",
    name: "Northside Pediatric & Acute",
    level: "Level 3",
    status: "NORMAL",
    distanceKm: 6.2,
    etaMin: 15,
    capacityUtilization: 55,
    openBeds: 36,
    totalBeds: 80,
    coordinates: { lat: 37.8020, lng: -122.4280 },
    traumaBayStatus: "Ready"
  }
];
