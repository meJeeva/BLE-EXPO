// VitalZ Design Tokens

export const Colors = {
  Primary: '#0E5CAD',
  PrimaryDark: '#0A4A8A',
  PrimaryLight: '#E8F1FF',
  Secondary: '#27AE60',
  Background: '#F7F9FC',
  Surface: '#FFFFFF',
  TextPrimary: '#111827',
  TextSecondary: '#6B7280',
  Border: '#E5E7EB',
  Disabled: '#9CA3AF',
  Error: '#E53935',
  Warning: '#F59E0B',
  Info: '#2563EB',

  shadowColor: '#000',
  primaryBackground: '#4A90E2',
  TextWhite: '#ffffff',

  IconBlack: '#000000',
  lightGrey: '#A0AEC0'
};

export const Typography = {
  H1: {
    fontSize: 22,
    fontWeight: '700' as const,
    lineHeight: 28,
  },
  H2: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  Body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  BodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  Caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};
