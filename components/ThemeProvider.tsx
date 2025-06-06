import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

// Theme colors
const darkTheme = {
  colors: {
    background: '#121212',
    surface: '#1E1E1E',
    surfaceElevated: '#2A2A2A',
    primary: '#A0D7E7',
    secondary: '#6C757D',
    accent: '#E6A285',
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
      fontFamily: 'Merriweather-Bold',
      fontSize: 28,
      lineHeight: 36,
    },
    heading: {
      fontFamily: 'Merriweather-Bold',
      fontSize: 22,
      lineHeight: 28,
    },
    subheading: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 18,
      lineHeight: 24,
    },
    body: {
      fontFamily: 'Merriweather-Regular',
      fontSize: 16,
      lineHeight: 24,
    },
    bodySmall: {
      fontFamily: 'Merriweather-Regular',
      fontSize: 14,
      lineHeight: 20,
    },
    caption: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      lineHeight: 16,
    },
    button: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      lineHeight: 20,
    },
    tag: {
      fontFamily: 'Inter-Medium',
      fontSize: 12,
      lineHeight: 16,
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    pill: 999,
  },
};

// Create the theme context
const ThemeContext = createContext(darkTheme);

// Provider component
export const ThemeProvider = ({ children }) => {
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