import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions, Platform } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useReadingContext } from '@/components/ReadingProvider';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react-native';

export default function ReadingPreviewScreen() {
  const router = useRouter();
  const { colors, typography, spacing, borderRadius } = useTheme();
  const { width, height } = useWindowDimensions();
  const { id } = useLocalSearchParams();
  const { findReading } = useReadingContext();
  
  const reading = findReading(id as string);

  const handleBack = () => {
    router.back();
  };

  const handleStartReading = () => {
    router.push(`/reading/${id}`);
  };

  if (!reading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>Reading not found</Text>
        <TouchableOpacity onPress={handleBack}>
          <Text style={[styles.backLink, { color: colors.primary }]}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View 
        entering={FadeIn.duration(300)}
        style={styles.content}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            style={[styles.backButton, {
              backgroundColor: colors.surfaceElevated,
              borderRadius: borderRadius.pill,
              padding: spacing.sm,
            }]}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: reading.imageUrl }} 
            style={[styles.image, { borderRadius: borderRadius.lg }]} 
            resizeMode="cover" 
          />
        </View>

        <View style={[styles.metaContainer, { marginTop: spacing.xl }]}>
          <Text style={[styles.title, {
            color: colors.text,
            ...typography.title,
            marginBottom: spacing.sm,
          }]}>
            {reading.title}
          </Text>

          <Text style={[styles.author, {
            color: colors.textSecondary,
            ...typography.subheading,
            marginBottom: spacing.lg,
          }]}>
            by {reading.author}
          </Text>

          <View style={styles.tagsContainer}>
            <View style={[styles.categoryTag, { 
              backgroundColor: colors.accent,
              borderRadius: borderRadius.pill,
              paddingVertical: spacing.xs,
              paddingHorizontal: spacing.md,
              marginRight: spacing.sm,
            }]}>
              <Text style={[styles.categoryText, {
                color: colors.background,
                ...typography.tag,
              }]}>
                {reading.category}
              </Text>
            </View>

            <View style={[styles.timeTag, { 
              backgroundColor: colors.surface,
              borderRadius: borderRadius.pill,
              paddingVertical: spacing.xs,
              paddingHorizontal: spacing.md,
              flexDirection: 'row',
              alignItems: 'center',
            }]}>
              <Clock size={12} color={colors.text} style={{ marginRight: 4 }} />
              <Text style={[styles.timeText, {
                color: colors.text,
                ...typography.tag,
              }]}>
                ~{reading.readingTime} min
              </Text>
            </View>
          </View>

          <Text style={[styles.preview, {
            color: colors.textSecondary,
            ...typography.body,
            marginTop: spacing.xl,
          }]} numberOfLines={6}>
            {reading.content}
          </Text>
        </View>
      </Animated.View>

      <Animated.View 
        entering={FadeIn.delay(300).duration(300)}
        style={[styles.footer, {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          paddingBottom: Platform.OS === 'ios' ? 34 : spacing.md,
        }]}
      >
        <TouchableOpacity
          style={[styles.startButton, {
            backgroundColor: colors.primary,
            borderRadius: borderRadius.md,
            paddingVertical: spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }]}
          onPress={handleStartReading}
        >
          <BookOpen size={20} color={colors.background} style={{ marginRight: spacing.sm }} />
          <Text style={[styles.startButtonText, {
            color: colors.background,
            ...typography.button,
          }]}>
            Start Reading
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 300,
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  metaContainer: {
    padding: 24,
  },
  title: {
    textAlign: 'center',
  },
  author: {
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  categoryTag: {},
  categoryText: {},
  timeTag: {},
  timeText: {},
  preview: {},
  footer: {
    padding: 24,
    borderTopWidth: 1,
  },
  startButton: {},
  startButtonText: {},
  errorText: {
    textAlign: 'center',
    marginTop: 40,
  },
  backLink: {
    textAlign: 'center',
    marginTop: 16,
    padding: 8,
  },
});