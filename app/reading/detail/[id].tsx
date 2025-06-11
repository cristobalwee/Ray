import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useReadingContext } from '@/components/ReadingProvider';
import { ArrowLeft, Bookmark } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 8 }}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={{ 
            marginRight: 12, 
            backgroundColor: colors.surfaceElevated, 
            borderRadius: borderRadius.pill, 
            padding: spacing.sm,
          }}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {reading.imageUrl && (
          <Image source={{ uri: reading.imageUrl }} style={styles.banner} />
        )}
        <View style={styles.contentWrapper}>
          <View style={{ gap: 12, flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.sm }}>
              <Text style={[styles.title, { color: colors.text, ...typography.title, maxWidth: '80%' }]}>{reading.title}</Text>
              <TouchableOpacity onPress={toggleBookmark} accessibilityLabel={bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}>
                <Bookmark size={28} color={colors.textSecondary} fill={bookmarked ? colors.textSecondary : 'none'} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.author, { color: colors.textSecondary, ...typography.body}]}>by {reading.author}</Text>
            <View style={styles.tagContainer}>
              <View style={[styles.tag, { backgroundColor: colors.accent, borderRadius: borderRadius.pill }]}> 
                <Text style={[styles.tagText, { color: colors.background, ...typography.tag }]}>{reading.category}</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: colors.surface, borderRadius: borderRadius.pill }]}> 
                <Text style={[styles.tagText, { color: colors.text, ...typography.tag }]}>{reading.readingTime} min</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: colors.primary, borderRadius: borderRadius.md }]}
            onPress={() => router.push(`/reading/${reading.id}`)}
          >
            <Text style={[styles.ctaText, { color: colors.text, ...typography.button }]}>Read Now</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: spacing.md }}>
            <Text style={[styles.summary, { color: colors.text, ...typography.subheading }]}>Summary</Text>
            <Text style={[styles.summary, { color: colors.text, ...typography.body }]}>{summary}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  banner: {
    width: '100%',
    height: 220,
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
    paddingVertical: 14,
    alignItems: 'center',
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