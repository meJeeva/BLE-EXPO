import Constants from 'expo-constants';

// Backend configuration
// const BACKEND_URL = Constants.expoConfig?.extra?.backendUrl || 
//   process.env.EXPO_PUBLIC_BACKEND_URL || 
//   'http://localhost:3000';

const BACKEND_URL = 'http://192.168.29.173:3000';


export const API_CONFIG = {
  BASE_URL: BACKEND_URL,
  API_PREFIX: '/v1',
  TIMEOUT: 30000,
  DEV_OTP: '123456',
};

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.API_PREFIX}${endpoint}`;
};
