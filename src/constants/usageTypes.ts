export const USAGE_TYPES = [
  {
    id: 'HOME',
    title: 'Home / Individual',
    subtitle: 'For personal or family use at home',
    icon: 'home-outline',
    iconColor: '#4A90E2',
    bgColor: '#E8F1FF',
  },
  {
    id: 'HOSPITAL',
    title: 'Hospital / Clinic / Government',
    subtitle: 'For professional healthcare use',
    icon: 'business-outline',
    iconColor: '#F5A623',
    bgColor: '#FFF3E6',
  },
] as const;

export type UsageType = {
  id: 'HOME' | 'HOSPITAL';  
  title: string;
  subtitle: string;
  icon: string;
  iconColor: string;
  bgColor: string;
};

export type UsageTypeFromArray = typeof USAGE_TYPES[number];
