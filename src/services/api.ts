import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../config/api';
import { getToken, clearToken } from '../utils/secureStore';

interface ApiError {
  errorCode: string;
  message: string;
  requestId?: string;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${API_CONFIG.BASE_URL}${API_CONFIG.API_PREFIX}`,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add JWT token
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiError>) => {
        if (error.response?.status === 401) {
          // Clear token on unauthorized
          await clearToken();
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async requestOtp(identifier: string, type: 'phone' | 'email') {
    const url = '/auth/otp/request';
    console.log('OTP Request URL:', `${this.client.defaults.baseURL}${url}`);
    return this.client.post(url, { identifier, type });
  }

  async verifyOtp(identifier: string, otp: string) {
    return this.client.post('/auth/otp/verify', { identifier, otp });
  }

  async getMe() {
    return this.client.get('/me');
  }

  // Bootstrap
  async getBootstrap() {
    return this.client.get('/bootstrap');
  }

  // Household
  async createHousehold(data: any) {
    return this.client.post('/households', data);
  }

  async getMyHousehold() {
    return this.client.get('/households/me');
  }

  // Patients
  async createPatient(data: any) {
    return this.client.post('/patients', data);
  }

  async getPatients() {
    return this.client.get('/patients');
  }

  async updatePatient(id: string, data: any) {
    return this.client.patch(`/patients/${id}`, data);
  }

  // Devices
  async registerDevice(deviceId: string, usageType: string = 'HOME') {
    return this.client.post(`/devices/${deviceId}/register`, { usageType });
  }

  async claimDevice(deviceId: string) {
    return this.client.post(`/devices/${deviceId}/claim`, {});
  }

  async getMyDevices() {
    return this.client.get('/devices/my');
  }

  async getDevice(deviceId: string) {
    return this.client.get(`/devices/${deviceId}`);
  }

  async registerWarranty(deviceId: string, data: any) {
    return this.client.post(`/devices/${deviceId}/warranty`, data);
  }

  async getWarranty(deviceId: string) {
    return this.client.get(`/devices/${deviceId}/warranty`);
  }

  // Sessions
  async createSession(data: any) {
    return this.client.post('/sessions', data);
  }

  async closeSession(sessionId: string) {
    return this.client.post(`/sessions/${sessionId}/close`, {});
  }

  async getSession(sessionId: string) {
    return this.client.get(`/sessions/${sessionId}`);
  }

  async getPatientSessions(patientId: string) {
    return this.client.get(`/patients/${patientId}/sessions`);
  }

  // Vitals
  async ingestMeasurements(data: any) {
    return this.client.post('/ingest/measurements', data);
  }

  async getLatestVitals(patientId: string) {
    return this.client.get(`/patients/${patientId}/latest-vitals`);
  }

  async getVitalsHistory(patientId: string, params?: any) {
    return this.client.get(`/patients/${patientId}/vitals`, { params });
  }
}

export const api = new ApiClient();
