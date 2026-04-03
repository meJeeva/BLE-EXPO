// Demo mode utilities for generating fake vitals data

export interface DemoVitals {
  spo2: number;
  heartRate: number;
  hrv: number;
  respiratoryRate: number;
  temperature: number; // in Celsius
  timestamp: Date;
}

const randomInRange = (min: number, max: number, decimals: number = 0): number => {
  const value = Math.random() * (max - min) + min;
  return decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.floor(value);
};

export const generateDemoVitals = (): DemoVitals => {
  return {
    spo2: randomInRange(95, 100),
    heartRate: randomInRange(60, 100),
    hrv: randomInRange(20, 100),
    respiratoryRate: randomInRange(12, 20),
    temperature: randomInRange(36.1, 37.2, 1),
    timestamp: new Date(),
  };
};

export const generateDemoVitalsHistory = (count: number = 10): DemoVitals[] => {
  const history: DemoVitals[] = [];
  const now = new Date();
  
  for (let i = count - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000); // hourly readings
    history.push({
      spo2: randomInRange(95, 100),
      heartRate: randomInRange(60, 100),
      hrv: randomInRange(20, 100),
      respiratoryRate: randomInRange(12, 20),
      temperature: randomInRange(36.1, 37.2, 1),
      timestamp,
    });
  }
  
  return history;
};

export const generateDemoSession = () => {
  return {
    id: `demo_session_${Date.now()}`,
    startTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    endTime: new Date(),
    vitals: generateDemoVitals(),
    duration: 300, // 5 minutes in seconds
  };
};
