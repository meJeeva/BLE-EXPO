import * as SecureStore from 'expo-secure-store';

const APP_MODE_KEY = 'app_mode';

export type AppMode = 'HOME' | 'HOSPITAL' | null;

export const saveAppMode = async (mode: 'HOME' | 'HOSPITAL'): Promise<void> => {
  try {
    await SecureStore.setItemAsync(APP_MODE_KEY, mode);
  } catch (error) {
    console.error('Error saving app mode:', error);
    throw error;
  }
};

export const getAppMode = async (): Promise<AppMode> => {
  try {
    return await SecureStore.getItemAsync(APP_MODE_KEY) as AppMode;
  } catch (error) {
    console.error('Error getting app mode:', error);
    return null;
  }
};

export const clearAppMode = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(APP_MODE_KEY);
  } catch (error) {
    console.error('Error clearing app mode:', error);
  }
};
