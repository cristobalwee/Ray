import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

// Theme colors
const darkTheme = {
  colors: {
    background: '#151515',
    surface: '#1E1E1E',
    surfaceElevated: '#232323',
    primary: '#222222',
    secondary: '#6C757D',
    brand: '#C6698B',
    accent: '#E6A285',
    cardAction: '#313131',
    text: '#F5F5F5',
    textSecondary: '#BBBBBB',
    textTertiary: '#888888',
    border: '#333333',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    title: {
      fontFamily: 'MartinaPlantijn-Black',
      fontSize: 32,
      lineHeight: 38,
    },
    heading: {
      fontFamily: 'MartinaPlantijn-Black',
      fontSize: 22,
      lineHeight: 28,
    },
    headingSmall: {
      fontFamily: 'MartinaPlantijn-Black',
      fontSize: 18,
      lineHeight: 22,
    },
    subheading: {
      fontFamily: 'Metric-Medium',
      fontSize: 18,
      lineHeight: 22,
    },
    body: {
      fontFamily: 'Metric-Light',
      fontSize: 20,
      lineHeight: 24,
    },
    bodySmall: {
      fontFamily: 'Metric-Light',
      fontSize: 18,
      lineHeight: 20,
    },
    caption: {
      fontFamily: 'Metric-Light',
      fontSize: 16,
      lineHeight: 16,
    },
    button: {
      fontFamily: 'Metric-Medium',
      fontSize: 16,
      lineHeight: 20,
    },
    tag: {
      fontFamily: 'Metric-Regular',
      fontSize: 14,
      lineHeight: 16,
    },
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 24,
    xl: 16,
    pill: 999,
  },
};

// Create the theme context
const ThemeContext = createContext(darkTheme);

// Provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Force dark mode
  const colorScheme = 'dark';
  
  // We're using dark theme only for this app
  return (
    <ThemeContext.Provider value={darkTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export { darkTheme };