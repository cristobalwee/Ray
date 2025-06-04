import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import Animated, { 
  FadeIn, 
  FadeInDown 
} from 'react-native-reanimated';

export default function QuoteScreen() {
  const router = useRouter();
  const { colors, typography, spacing, borderRadius } = useTheme();

  const handleContinue = () => {
    router.push('/onboarding/preferences');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View 
        entering={FadeIn.delay(300).duration(1000)} 
        style={styles.quoteContainer}
      >
        <Text style={[styles.quoteText, { 
          color: colors.text,
          ...typography.body,
          fontSize: 24,
          lineHeight: 36,
          fontFamily: 'Merriweather-Italic'
        }]}>
          "I'll give you a programme to follow every night. Very simple programme. For the next thousand nights, before you go to bed every night, read one short story."
        </Text>
        
        <Animated.Text 
          entering={FadeIn.delay(1300).duration(800)}
          style={[styles.authorText, { 
            color: colors.textSecondary,
            ...typography.subheading
          }]}
        >
          Ray Bradbury
        </Animated.Text>
      </Animated.View>

      <Animated.View 
        entering={FadeInDown.delay(2000).duration(600)}
        style={styles.buttonContainer}
      >
        <TouchableOpacity
          style={[styles.button, { 
            backgroundColor: colors.primary,
            borderRadius: borderRadius.md,
          }]}
          onPress={handleContinue}
        >
          <Text style={[styles.buttonText, { 
            color: colors.background,
            ...typography.button
          }]}>
            Continue
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteText: {
    textAlign: 'center',
    marginBottom: 32,
  },
  authorText: {
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 48,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
});