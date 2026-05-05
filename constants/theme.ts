export type AppTheme = {
  dark: boolean;
  colors: {
    bg: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    accent: string;
    accentSoft: string;
    danger: string;
    border: string;
    cardShadow: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
  };
};

const shared = {
  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 20,
    xl: 28,
  },
  radius: {
    sm: 10,
    md: 14,
    lg: 18,
  },
};

export const darkTheme: AppTheme = {
  dark: true,
  colors: {
    bg: '#090B10',
    surface: '#121620',
    surfaceAlt: '#171C27',
    text: '#F5F7FA',
    textMuted: '#9FA9BA',
    accent: '#D4A641',
    accentSoft: '#3A2E16',
    danger: '#EA5A5A',
    border: '#242B38',
    cardShadow: '#000000',
  },
  ...shared,
};

export const lightTheme: AppTheme = {
  dark: false,
  colors: {
    bg: '#F4F6FA',
    surface: '#FFFFFF',
    surfaceAlt: '#EEF2F8',
    text: '#121620',
    textMuted: '#5D6678',
    accent: '#B8892F',
    accentSoft: '#F7E6BF',
    danger: '#D94B4B',
    border: '#D9E0EB',
    cardShadow: '#BAC5D6',
  },
  ...shared,
};
