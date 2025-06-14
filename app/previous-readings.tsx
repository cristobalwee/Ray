import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { useRouter } from 'expo-router';
import { useReadingContext } from '@/components/ReadingProvider';
import { ArrowLeft, Clock } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';

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

export default function PreviousReadingsScreen() {
  const router = useRouter();
  const { colors, typography, spacing, borderRadius } = useTheme();
  const { previousReadings } = useReadingContext() as { previousReadings: Reading[] };
  const insets = useSafeAreaInsets();

  const navigateToReading = (readingId: string) => {
    router.push(`/reading/detail/${readingId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={[styles.backButton, { backgroundColor: colors.surface }]}
        >
          <ArrowLeft size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text, ...typography.title }]}>
          Readings
        </Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeIn.duration(600)}
          style={styles.gridContainer}
        >
          {previousReadings.map((reading) => (
            <TouchableOpacity
              key={reading.id}
              onPress={() => navigateToReading(reading.id)}
              style={[styles.card, { 
                backgroundColor: colors.surface,
                borderRadius: borderRadius.lg,
              }]}
              activeOpacity={0.7}
            >
              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: reading.imageUrl }} 
                  style={[styles.image, { 
                    borderRadius: borderRadius.md,
                    backgroundColor: colors.surfaceElevated,
                  }]} 
                  resizeMode="cover" 
                />
              </View>
              
              <View style={styles.contentContainer}>
                <Text 
                  style={[styles.readingTitle, { 
                    color: colors.text,
                    ...typography.headingSmall,
                  }]} 
                  numberOfLines={2}
                >
                  {reading.title}
                </Text>
                <Text 
                  style={[styles.author, { 
                    color: colors.textSecondary,
                    ...typography.caption,
                  }]}
                  numberOfLines={1}
                >
                  by {reading.author}
                </Text>
                <View style={styles.tagsContainer}>
                  <View style={[styles.categoryTag, { 
                    backgroundColor: colors.accent,
                    borderRadius: borderRadius.pill,
                  }]}>
                    <Text style={[styles.categoryText, { 
                      color: colors.background,
                      ...typography.tag,
                    }]}>
                      {reading.category}
                    </Text>
                  </View>
                  <View style={[styles.timeTag, { 
                    backgroundColor: colors.surfaceElevated,
                    borderRadius: borderRadius.pill,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }]}>
                    <Clock size={12} color={colors.text} style={{ marginRight: 4 }} />
                    <Text style={[styles.timeText, { 
                      color: colors.text,
                      ...typography.tag,
                    }]}>
                      {reading.readingTime} min
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingTop: 8,
  },
  scrollContainer: {
    padding: 24,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: '47%',
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 2/3,
    padding: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 12,
    gap: 8,
  },
  readingTitle: {
    marginBottom: 4,
  },
  author: {
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  categoryText: {
    fontSize: 10,
  },
  timeTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  timeText: {
    fontSize: 10,
  },
}); 