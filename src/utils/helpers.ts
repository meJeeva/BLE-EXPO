// Helper utilities

export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32;
};

export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return (fahrenheit - 32) * 5/9;
};

export const formatTemperature = (temp: number, unit: 'C' | 'F'): string => {
  const value = unit === 'F' ? celsiusToFahrenheit(temp) : temp;
  return `${value.toFixed(1)}°${unit}`;
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateTime = (date: Date | string): string => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\d{10,15}$/;
  return phoneRegex.test(phone.replace(/[^\d]/g, ''));
};

export const validateName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 60;
};

export const validateAge = (age: number): boolean => {
  return age >= 0 && age <= 120;
};

export const validateHeight = (height: number): boolean => {
  return height >= 20 && height <= 250;
};

export const validateWeight = (weight: number): boolean => {
  return weight >= 1 && weight <= 300;
};
