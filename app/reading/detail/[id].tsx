import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useReadingContext } from '@/components/ReadingProvider';
import { BookOpenText, Bookmark, Clock, X, ChevronRight } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

export default function ReadingDetailScreen() {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { findReading } = useReadingContext();
  const reading = findReading(id as string) as unknown as Reading | undefined;
  const [bookmarked, setBookmarked] = useState(false);
  const insets = useSafeAreaInsets();

  // Early return if not found
  if (!reading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}> 
        <Text style={[styles.errorText, { color: colors.text }]}>Reading not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backLink, { color: colors.primary }]}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  useEffect(() => {
    const checkBookmarked = async () => {
      const stored = await AsyncStorage.getItem('bookmarks');
      if (stored) {
        const arr = JSON.parse(stored);
        setBookmarked(arr.some((r: any) => r.id === reading.id));
      }
    };
    checkBookmarked();
  }, [reading.id]);

  const toggleBookmark = async () => {
    const stored = await AsyncStorage.getItem('bookmarks');
    let arr = stored ? JSON.parse(stored) : [];
    if (bookmarked) {
      arr = arr.filter((r: any) => r.id !== reading.id);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(arr));
      setBookmarked(false);
      Toast.show({ type: 'success', text1: 'Removed from bookmarks.' });
    } else {
      arr.push({ id: reading.id, title: reading.title, author: reading.author, imageUrl: reading.imageUrl });
      await AsyncStorage.setItem('bookmarks', JSON.stringify(arr));
      setBookmarked(true);
      Toast.show({ type: 'success', text1: 'Bookmarked!' });
    }
  };

  // Get summary: first 2-3 sentences
  const summary = reading.content.split(/(?<=[.!?])\s+/).slice(0, 3).join(' ');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={[styles.imageContainer, { paddingTop: 24 + insets.top, paddingHorizontal: 36, paddingBottom: 36 }]}>
          {reading.imageUrl && (
            <Image source={{ uri: reading.imageUrl }} style={styles.banner} />
          )}
        </View>
        <View style={styles.contentWrapper}>
          <View style={{ gap: 12, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.sm }}>
              <Text style={[styles.title, { color: colors.text, ...typography.title, maxWidth: '80%' }]}>{reading.title}</Text>
              <TouchableOpacity onPress={toggleBookmark} accessibilityLabel={bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}>
                <Bookmark size={28} color={bookmarked ? colors.brand : colors.textSecondary} fill={bookmarked ? colors.brand : 'none'} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.author, { color: colors.textSecondary, ...typography.body}]}>by {reading.author}</Text>
            <View style={styles.tagContainer}>
              <View style={[styles.tag, { backgroundColor: colors.accent, borderRadius: borderRadius.pill }]}> 
                <Text style={[styles.tagText, { color: colors.background, ...typography.tag }]}>{reading.category}</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: colors.surface, borderRadius: borderRadius.pill, flexDirection: 'row', alignItems: 'center', gap: 6 }]}> 
                <Clock size={14} color={colors.text} />
                <Text style={[styles.tagText, { color: colors.text, ...typography.tag }]}>{reading.readingTime} min</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: colors.primary, borderRadius: borderRadius.md }]}
            onPress={() => router.push(`/reading/${reading.id}`)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cardAction, borderRadius: borderRadius.pill, padding: 12 }}>
                <BookOpenText size={20} color={colors.text} />
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 4 }}>
                <Text style={[styles.ctaText, { color: colors.textSecondary, ...typography.caption }]}>Ready to dive in?</Text>
                <Text style={[styles.ctaText, { color: colors.text, ...typography.headingSmall, fontSize: 20, lineHeight: 24 }]}>Start reading</Text>
              </View>
            </View>
            <ChevronRight size={20} color={colors.text} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: spacing.md }}>
            <Text style={[styles.summary, { color: colors.text, ...typography.subheading }]}>Summary</Text>
            <Text style={[styles.summary, { color: colors.text, ...typography.body }]}>{summary}</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity 
        onPress={() => router.back()} 
        style={{ 
          marginRight: 12, 
          backgroundColor: colors.text, 
          borderRadius: borderRadius.pill, 
          padding: 12,
          position: 'absolute',
          top: insets.top,
          right: 12
        }}
      >
        <X size={20} color={colors.background} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#232323',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  banner: {
    height: 180,
    width: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  contentWrapper: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
    marginTop: -8
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8
  },
  tag: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tagText: {
    fontSize: 12,
  },
  ctaButton: {
    marginTop: 8,
    marginBottom: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 12
  },
  ctaText: {
    fontSize: 18,
    fontWeight: '600',
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
  },
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