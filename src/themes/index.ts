import { ThemeConfig } from '../types';

export const defaultTheme: ThemeConfig = {
  primaryColor: '#3b82f6',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  borderColor: '#d1d5db',
  errorColor: '#ef4444',
  successColor: '#10b981',
  borderRadius: '0.5rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

export const darkTheme: ThemeConfig = {
  primaryColor: '#60a5fa',
  backgroundColor: '#1f2937',
  textColor: '#f9fafb',
  borderColor: '#374151',
  errorColor: '#f87171',
  successColor: '#34d399',
  borderRadius: '0.5rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
};

export const createTheme = (overrides: Partial<ThemeConfig> = {}): ThemeConfig => {
  return {
    ...defaultTheme,
    ...overrides,
  };
}; 