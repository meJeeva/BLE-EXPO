import { create } from 'zustand';
import { api } from '../services/api';
import { cacheVitalsData, getCachedVitalsData } from '../utils/database';
import { generateDemoVitals, generateDemoVitalsHistory } from '../utils/demoMode';

interface Patient {
  id: string;
  full_name: string;
  relationship: string;
  gender: string;
  dob?: string;
  age_years?: number;
  phone?: string;
  height_cm?: number;
  weight_kg?: number;
  notes?: string;
}

interface Vitals {
  spo2?: number;
  heartRate?: number;
  hrv?: number;
  respiratoryRate?: number;
  temperature?: number; // Celsius from backend
  timestamp?: string;
}

interface AppState {
  // Current patient
  currentPatient: Patient | null;
  patients: Patient[];
  
  // Vitals data
  latestVitals: Vitals | null;
  vitalsHistory: any[];
  sessions: any[];
  
  // UI state
  temperatureUnit: 'C' | 'F';
  vitalsViewMode: 'log' | 'chart';
  isDemoMode: boolean;
  
  // Loading states
  isLoadingVitals: boolean;
  isLoadingPatients: boolean;
  
  // Actions
  setCurrentPatient: (patient: Patient | null) => void;
  fetchPatients: () => Promise<void>;
  fetchLatestVitals: (patientId: string) => Promise<void>;
  fetchVitalsHistory: (patientId: string) => Promise<void>;
  fetchSessions: (patientId: string) => Promise<void>;
  toggleTemperatureUnit: () => void;
  setVitalsViewMode: (mode: 'log' | 'chart') => void;
  toggleDemoMode: () => void;
  refreshPatientData: (patientId: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentPatient: null,
  patients: [],
  latestVitals: null,
  vitalsHistory: [],
  sessions: [],
  temperatureUnit: 'C',
  vitalsViewMode: 'log',
  isDemoMode: false,
  isLoadingVitals: false,
  isLoadingPatients: false,

  setCurrentPatient: (patient: Patient | null) => {
    set({ currentPatient: patient });
    if (patient) {
      // Refresh data for this patient
      get().refreshPatientData(patient.id);
    }
  },

  fetchPatients: async () => {
    set({ isLoadingPatients: true });
    try {
      const response = await api.getPatients();
      set({ patients: response.data });
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      set({ isLoadingPatients: false });
    }
  },

  fetchLatestVitals: async (patientId: string) => {
    set({ isLoadingVitals: true });
    try {
      if (get().isDemoMode) {
        // Use demo data
        const demoVitals = generateDemoVitals();
        set({ latestVitals: demoVitals });
      } else {
        const response = await api.getLatestVitals(patientId);
        const vitals = response.data;
        set({ latestVitals: vitals });
        // Cache for offline
        await cacheVitalsData(patientId, vitals);
      }
    } catch (error) {
      console.error('Error fetching latest vitals:', error);
      // Try to load from cache
      const cached = await getCachedVitalsData(patientId);
      if (cached) {
        set({ latestVitals: cached });
      }
    } finally {
      set({ isLoadingVitals: false });
    }
  },

  fetchVitalsHistory: async (patientId: string) => {
    try {
      if (get().isDemoMode) {
        // Use demo history data
        const demoHistory = generateDemoVitalsHistory(20);
        set({ vitalsHistory: demoHistory });
      } else {
        const response = await api.getVitalsHistory(patientId);
        set({ vitalsHistory: response.data });
      }
    } catch (error) {
      console.error('Error fetching vitals history:', error);
    }
  },

  fetchSessions: async (patientId: string) => {
    try {
      if (get().isDemoMode) {
        // Demo sessions
        set({ sessions: [] });
      } else {
        const response = await api.getPatientSessions(patientId);
        set({ sessions: response.data });
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  },

  toggleTemperatureUnit: () => {
    set((state) => ({ temperatureUnit: state.temperatureUnit === 'C' ? 'F' : 'C' }));
  },

  setVitalsViewMode: (mode: 'log' | 'chart') => {
    set({ vitalsViewMode: mode });
  },

  toggleDemoMode: () => {
    set((state) => ({ isDemoMode: !state.isDemoMode }));
  },

  refreshPatientData: async (patientId: string) => {
    await Promise.all([
      get().fetchLatestVitals(patientId),
      get().fetchVitalsHistory(patientId),
      get().fetchSessions(patientId),
    ]);
  },
}));
