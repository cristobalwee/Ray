import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import {
  Merriweather_400Regular,
  Merriweather_700Bold,
  Merriweather_400Regular_Italic,
} from '@expo-google-fonts/merriweather';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { ThemeProvider } from '@/components/ThemeProvider';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ReadingProvider } from '@/components/ReadingProvider';
import Toast from 'react-native-toast-message';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Merriweather-Regular': Merriweather_400Regular,
    'Merriweather-Bold': Merriweather_700Bold,
    'Merriweather-Italic': Merriweather_400Regular_Italic,
    'MartinaPlantijn-Black': require('../assets/fonts/MartinaPlantijn-Black.ttf'),
    'Metric-Light': require('../assets/fonts/Metric-Light.ttf'),
    'Metric-Regular': require('../assets/fonts/Metric-Regular.ttf'),
    'Metric-Medium': require('../assets/fonts/Metric-Medium.ttf'),
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <ReadingProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ animation: 'fade' }} />
          <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
          <Stack.Screen name="home" options={{ animation: 'fade' }} />
          <Stack.Screen name="settings" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="bookmarks" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="reading/preview/[id]" options={{ 
            animation: 'slide_from_bottom',
            presentation: 'modal',
          }} />
          <Stack.Screen name="reading/[id]" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="reading/detail/[id]" options={{ animation: 'slide_from_right' }} />
        </Stack>
        <StatusBar style="light" />
        <Toast />
      </ReadingProvider>
    </ThemeProvider>
  );
}