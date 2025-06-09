import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { useRouter } from 'expo-router';
import { useReadingContext } from '@/components/ReadingProvider';
import { TodayReadingCard } from '@/components/TodayReadingCard';
import { PreviousReadingItem } from '@/components/PreviousReadingItem';
import { formatDate } from '@/utils/helpers';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { Book, Settings, Bookmark } from 'lucide-react-native';
import { type FC } from 'react';

// Reading type matches the shape from ReadingProvider and utils/data
type Reading = {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  imageUrl?: string;
  readingTime?: number;
  completed?: boolean;
  day?: number;
};

const HomeScreen: FC = () => {
  const router = useRouter();
  const { colors, typography, spacing, borderRadius } = useTheme();
  const { 
    currentDay, 
    totalDays,
    todaysReadings,
    previousReadings,
  }: {
    currentDay: number;
    totalDays: number;
    todaysReadings: Reading[];
    previousReadings: Reading[];
  } = useReadingContext();

  const navigateToReading = (readingId: string) => {
    router.push(`/reading/detail/${readingId}`);
  };

  const navigateToSettings = () => {
    router.push('/settings');
  };

  const navigateToBookmarks = () => {
    router.push({ pathname: '/bookmarks' });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeIn.duration(600)}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={[typography.title, styles.appTitle, { color: colors.text }]}>
              Ray<Text style={{ color: '#C6698B' }}>.</Text>
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <TouchableOpacity onPress={navigateToBookmarks} style={{ marginRight: 12 }}>
                <Bookmark size={24} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={navigateToSettings}>
                <Settings size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(300).duration(600)}
          style={styles.dateSection}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center', gap: 12 }}>
            <Text style={{ color: colors.textSecondary, ...typography.body }}>
              Let's dive in.
            </Text>
            <Text style={[styles.dateText, { color: colors.text, ...typography.title }]}>
              {formatDate(new Date())}
            </Text>
          </View>
          <View style={[styles.dayPill, { 
            backgroundColor: colors.surfaceElevated,
            borderRadius: 8,
            paddingVertical: spacing.md,
            paddingHorizontal: spacing.lg,
          }]}>
            <Text style={[styles.dayText, { 
              color: colors.text,
              ...typography.caption
            }]}>
              Day {currentDay} / {totalDays}
            </Text>
          </View>
        </Animated.View>

        {todaysReadings.map((reading, index) => (
          <Animated.View 
            key={reading.id}
            entering={FadeInUp.delay(600 + (index * 200)).duration(600)}
          >
            <TodayReadingCard 
              reading={reading} 
              onPress={() => navigateToReading(reading.id)} 
            />
          </Animated.View>
        ))}

        <Animated.View 
          entering={FadeInUp.delay(900).duration(600)}
          style={[styles.previousSection, { marginTop: spacing.xl }]}
        >
          <Text style={[styles.previousTitle, { 
            color: colors.text,
            ...typography.subheading,
            marginBottom: spacing.md
          }]}>
            Previous Readings
          </Text>

          {previousReadings.length > 0 ? (
            previousReadings.map((reading, index) => (
              <Animated.View 
                key={reading.id}
                entering={FadeInUp.delay(1000 + (index * 100)).duration(600)}
              >
                <PreviousReadingItem 
                  reading={reading} 
                  onPress={() => navigateToReading(reading.id)} 
                />
              </Animated.View>
            ))
          ) : (
            <Animated.View 
              entering={FadeInUp.delay(1000).duration(600)}
              style={[styles.emptyState, {
                backgroundColor: colors.surfaceElevated,
                borderRadius: borderRadius.md,
                padding: spacing.xl,
                gap: spacing.sm
              }]}
            >
              <View style={[styles.iconCircle, {
                backgroundColor: colors.cardAction,
                borderRadius: 999,
              }]}>
                <Book size={32} color={colors.text} />
              </View>
              <Text style={[styles.emptyTitle, {
                color: colors.text,
                ...typography.heading,
                marginTop: spacing.lg,
                marginBottom: spacing.xs,
              }]}>
                Nothing yet
              </Text>
              <Text style={[styles.emptySubtitle, {
                color: colors.textSecondary,
                ...typography.caption,
                textAlign: 'center',
              }]}>
                Read your first daily to see it here.
              </Text>
            </Animated.View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 60,
    paddingBottom: 120,
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36,
  },
  appTitle: {
    fontSize: 24
  },
  dateSection: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  dateText: {},
  dayPill: {},
  dayText: {},
  previousSection: {
    marginTop: 32,
  },
  previousTitle: {
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  iconCircle: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {},
  emptySubtitle: {
    maxWidth: 200,
  },
});

export default HomeScreen;