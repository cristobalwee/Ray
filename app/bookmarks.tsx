import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bookmark, Book, ArrowLeft } from 'lucide-react-native';
import { PreviousReadingItem } from '@/components/PreviousReadingItem';

interface Reading {
  id: string;
  title: string;
  author: string;
  imageUrl?: string;
}

export default function BookmarksScreen() {
  const { colors, typography, spacing, borderRadius } = useTheme();
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const stored = await AsyncStorage.getItem('bookmarks');
        if (stored) {
          setBookmarks(JSON.parse(stored));
        }
      } catch (e) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  const goToReading = (id: string) => {
    router.push(`/reading/${id}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, marginBottom: 8 }}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={{
            backgroundColor: colors.surfaceElevated, 
            borderRadius: borderRadius.pill, 
            padding: spacing.sm,
          }}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text, ...typography.title }]}>Bookmarks</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {loading ? null : bookmarks.length === 0 ? (
          <View style={[styles.emptyState, { backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.xl }]}> 
            <View style={[styles.iconCircle, { backgroundColor: colors.cardAction, borderRadius: borderRadius.pill }]}> 
              <Bookmark size={32} color={colors.text} />
            </View>
            <View style={{ gap: 4, alignItems: 'center' }}>
              <Text style={[styles.emptyTitle, { color: colors.text, ...typography.headingSmall, }]}>No bookmarks yet</Text>
              <Text style={[styles.emptySubtitle, { color: colors.textSecondary, ...typography.bodySmall, textAlign: 'center' }]}>Bookmarked readings will appear here.</Text>
            </View>
          </View>
        ) : (
          bookmarks.map(reading => (
            <PreviousReadingItem
              key={reading.id}
              reading={reading}
              onPress={() => goToReading(reading.id)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 24,
    paddingBottom: 120,
    paddingHorizontal: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    elevation: 2,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardAuthor: {
    fontSize: 14,
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    gap: 16,
  },
  iconCircle: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {},
  emptySubtitle: {},
  title: {
    paddingTop: 8,
  },
}); 