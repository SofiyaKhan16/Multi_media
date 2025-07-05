// CSS Utilities Export
// This file can be used to export any CSS-related utilities or constants

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a'
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  }
};

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem'
};

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem'
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
};

// CSS class name generators
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Responsive utilities
export const responsive = {
  sm: (styles) => `@media (min-width: ${breakpoints.sm}) { ${styles} }`,
  md: (styles) => `@media (min-width: ${breakpoints.md}) { ${styles} }`,
  lg: (styles) => `@media (min-width: ${breakpoints.lg}) { ${styles} }`,
  xl: (styles) => `@media (min-width: ${breakpoints.xl}) { ${styles} }`,
  '2xl': (styles) => `@media (min-width: ${breakpoints['2xl']}) { ${styles} }`
};

// Animation utilities
export const animations = {
  fadeIn: 'fadeIn 0.3s ease-in-out',
  fadeOut: 'fadeOut 0.3s ease-in-out',
  slideInUp: 'slideInUp 0.4s ease-out',
  slideInDown: 'slideInDown 0.4s ease-out',
  slideInLeft: 'slideInLeft 0.4s ease-out',
  slideInRight: 'slideInRight 0.4s ease-out',
  scaleIn: 'scaleIn 0.3s ease-out',
  scaleOut: 'scaleOut 0.3s ease-out'
};

// Theme utilities
export const theme = {
  isDark: () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  isLight: () => !window.matchMedia('(prefers-color-scheme: dark)').matches,
  isReducedMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  isHighContrast: () => window.matchMedia('(prefers-contrast: high)').matches
};
