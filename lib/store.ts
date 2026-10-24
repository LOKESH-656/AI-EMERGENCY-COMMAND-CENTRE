"use client";

import { useState, useEffect } from "react";
import { Incident, ResponderUnit, Hospital, INITIAL_INCIDENTS, INITIAL_UNITS, INITIAL_HOSPITALS } from "./initial-data";

const STORAGE_KEY_INCIDENTS = "agy_emergency_incidents_v1";
const STORAGE_KEY_UNITS = "agy_emergency_units_v1";
const STORAGE_KEY_HOSPITALS = "agy_emergency_hospitals_v1";

export function useCommandCenterStore() {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [units, setUnits] = useState<ResponderUnit[]>(INITIAL_UNITS);
  const [hospitals, setHospitals] = useState<Hospital[]>(INITIAL_HOSPITALS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  // Initialize from localStorage or fallback
  useEffect(() => {
    try {
      const storedInc = localStorage.getItem(STORAGE_KEY_INCIDENTS);
      const storedUnits = localStorage.getItem(STORAGE_KEY_UNITS);
      const storedHosp = localStorage.getItem(STORAGE_KEY_HOSPITALS);

      if (storedInc) setIncidents(JSON.parse(storedInc));
      if (storedUnits) setUnits(JSON.parse(storedUnits));
      if (storedHosp) setHospitals(JSON.parse(storedHosp));
    } catch (e) {
      console.warn("Storage sync error:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  const saveIncidents = (updated: Incident[]) => {
    setIncidents(updated);
    try {
      localStorage.setItem(STORAGE_KEY_INCIDENTS, JSON.stringify(updated));
    } catch {}
  };

  const saveUnits = (updated: ResponderUnit[]) => {
    setUnits(updated);
    try {
      localStorage.setItem(STORAGE_KEY_UNITS, JSON.stringify(updated));
    } catch {}
  };

  const saveHospitals = (updated: Hospital[]) => {
    setHospitals(updated);
    try {
      localStorage.setItem(STORAGE_KEY_HOSPITALS, JSON.stringify(updated));
    } catch {}
  };

  // Toggle unit status
  const toggleUnitStatus = (unitId: string) => {
    const updated = units.map((u) => {
      if (u.id === unitId) {
        const nextStatus: Record<string, "AVAILABLE" | "RESPONDING" | "BUSY"> = {
          AVAILABLE: "RESPONDING",
          RESPONDING: "BUSY",
          BUSY: "AVAILABLE",
        };
        const newStatus = nextStatus[u.status] || "AVAILABLE";
        const newEta = newStatus === "AVAILABLE" ? "Ready" : newStatus === "RESPONDING" ? "5 min" : "On Scene";
        const newOrder = newStatus === "AVAILABLE" ? "Sector Patrol" : u.currentOrder;
        return { ...u, status: newStatus, eta: newEta, currentOrder: newOrder };
      }
      return u;
    });
    saveUnits(updated);
  };

  // Notify Unit
  const notifyUnit = (unitId: string, message: string) => {
    console.log(`Alert sent to Unit ${unitId}: ${message}`);
    // You could show a toast or dispatch a tactical chime
  };

  // Send Hospital Alert
  const sendHospitalAlert = (hospitalId: string, customMessage?: string) => {
    const updated = hospitals.map((h) => {
      if (h.id === hospitalId) {
        return {
          ...h,
          status: "ALERTED" as const,
          lastAlertSent: customMessage || `Trauma Code Red • Incoming casualty ETA ${h.etaMin}m`,
          openBeds: Math.max(0, h.openBeds - 1),
          capacityUtilization: Math.min(100, Math.round(((h.totalBeds - (h.openBeds - 1)) / h.totalBeds) * 100)),
        };
      }
      return h;
    });
    saveHospitals(updated);
  };

  // Add new incident from AI triage
  const addIncident = (newInc: Incident) => {
    const updated = [newInc, ...incidents];
    saveIncidents(updated);

    // Auto-update units assigned
    if (newInc.assignedUnits && newInc.assignedUnits.length > 0) {
      const updatedUnits = units.map((u) => {
        if (newInc.assignedUnits.includes(u.callSign)) {
          return {
            ...u,
            status: "RESPONDING" as const,
            currentOrder: `${newInc.code} (${newInc.location.split("&")[0].trim()})`,
            eta: "3 min",
          };
        }
        return u;
      });
      saveUnits(updatedUnits);
    }
  };

  // Reset to initial demo state
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY_INCIDENTS);
    localStorage.removeItem(STORAGE_KEY_UNITS);
    localStorage.removeItem(STORAGE_KEY_HOSPITALS);
    setIncidents(INITIAL_INCIDENTS);
    setUnits(INITIAL_UNITS);
    setHospitals(INITIAL_HOSPITALS);
  };

  return {
    incidents,
    units,
    hospitals,
    isLoaded,
    selectedIncident,
    setSelectedIncident,
    toggleUnitStatus,
    notifyUnit,
    sendHospitalAlert,
    addIncident,
    resetDemoData,
  };
}
