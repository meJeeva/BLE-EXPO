import { create } from 'zustand';
import { api } from '../services/api';
import { saveToken, clearToken, saveUserData, getUserData } from '../utils/secureStore';
import { initDatabase, clearCache } from '../utils/database';
import * as ScreenCapture from 'expo-screen-capture';
import { getAppMode, clearAppMode } from '../utils/mode';

interface User {
  id: string;
  identifier: string;
  [key: string]: any;
}

interface BootstrapData {
  onboardingState: {
    hasHousehold: boolean;
    hasAnyPatient: boolean;
    hasClaimedDevice: boolean;
  };
  household?: any;
  patients?: any[];
  devices?: any[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  bootstrapData: BootstrapData | null;
  appMode: 'HOME' | 'HOSPITAL' | null;
  
  // Actions
  initialize: () => Promise<void>;
  setAppMode: (mode: 'HOME' | 'HOSPITAL') => void;
  requestOtp: (identifier: string, type: 'phone' | 'email') => Promise<void>;
  verifyOtp: (identifier: string, otp: string) => Promise<void>;
  fetchBootstrap: () => Promise<BootstrapData>;
  logout: () => Promise<void>;
  updateBootstrap: (data: Partial<BootstrapData>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  bootstrapData: null,
  appMode: null,

  initialize: async () => {
    try {
      // Initialize database
      await initDatabase();
      
      // Get app mode
      const mode = await getAppMode();
      console.log('mode',mode)
      set({ appMode: mode });

      // Check for existing session
      const userData = await getUserData();
      console.log('userData',userData)
      if (userData) {
        set({ user: userData, isAuthenticated: true, isLoading: false });
        // Only fetch bootstrap for HOME mode
        if (mode === 'HOME') {
          try {
            const bootstrap = await get().fetchBootstrap();
            console.log('bootstrap',bootstrap)
            set({ bootstrapData: bootstrap });
          } catch (error) {
            console.error('Error fetching bootstrap on init:', error);
          }
        }
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ isLoading: false });
    }
  },

  setAppMode: (mode: 'HOME' | 'HOSPITAL') => {
    set({ appMode: mode });
  },

  requestOtp: async (identifier: string, type: 'phone' | 'email') => {
    try {
      await api.requestOtp(identifier, type);
    } catch (error: any) {
      console.error('Error requesting OTP:', error);
      throw new Error(error.response?.data?.message || 'Failed to send OTP');
    }
  },

  verifyOtp: async (identifier: string, otp: string) => {
    try {
      const response = await api.verifyOtp(identifier, otp);
      const { token, user } = response.data;
      
      // Save token and user data
      await saveToken(token);
      await saveUserData(user);
      
      set({ user, isAuthenticated: true });
      
      // Only fetch bootstrap for HOME mode
      const mode = get().appMode;
      if (mode === 'HOME') {
        const bootstrap = await get().fetchBootstrap();
        set({ bootstrapData: bootstrap });
      }
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      throw new Error(error.response?.data?.message || 'Invalid OTP');
    }
  },

  fetchBootstrap: async () => {
    try {
      const response = await api.getBootstrap();
      const bootstrap = response.data;
      console.log('bootstrap',bootstrap)
      set({ bootstrapData: bootstrap });
      return bootstrap;
    } catch (error: any) {
      console.error('Error fetching bootstrap:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      // Clear all stored data
      await clearToken();
      await clearAppMode();
      await clearCache();
      
      // Allow screenshots again after logout - TEMPORARILY DISABLED FOR DEBUG
      try {
        // await ScreenCapture.allowScreenCaptureAsync();
        console.log('🐛 Debug: Screenshot blocking disabled for development');
      } catch (error) {
        console.error('Error allowing screen capture:', error);
      }
      
      // Clear state
      set({ 
        user: null, 
        isAuthenticated: false, 
        bootstrapData: null,
        appMode: null 
      });
    } catch (error) {
      console.error('Error during logout:', error);
      // Still clear state even if cleanup fails
      set({ 
        user: null, 
        isAuthenticated: false, 
        bootstrapData: null,
        appMode: null 
      });
    }
  },

  updateBootstrap: (data: Partial<BootstrapData>) => {
    const current = get().bootstrapData;
    set({ 
      bootstrapData: current ? { ...current, ...data } : null 
    });
  },
}));
