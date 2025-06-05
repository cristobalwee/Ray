import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bookmark, Book, ArrowLeft } from 'lucide-react-native';

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
        <Text style={[styles.title, { color: colors.primary, ...typography.title }]}>Bookmarks</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {loading ? null : bookmarks.length === 0 ? (
          <View style={[styles.emptyState, { backgroundColor: colors.surfaceElevated, borderRadius: borderRadius.lg, padding: spacing.xl }]}> 
            <View style={[styles.iconCircle, { backgroundColor: colors.surface, borderRadius: 999 }]}> 
              <Bookmark size={32} color={colors.primary} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.text, ...typography.subheading, marginTop: spacing.lg, marginBottom: spacing.xs }]}>No bookmarks yet</Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary, ...typography.caption, textAlign: 'center' }]}>Bookmarked readings will appear here.</Text>
          </View>
        ) : (
          bookmarks.map(reading => (
            <TouchableOpacity key={reading.id} style={[styles.card, { backgroundColor: colors.surface, borderRadius: borderRadius.md }]} onPress={() => goToReading(reading.id)}>
              {reading.imageUrl && (
                <Image source={{ uri: reading.imageUrl }} style={styles.image} />
              )}
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: colors.text, ...typography.heading }]}>{reading.title}</Text>
                <Text style={[styles.cardAuthor, { color: colors.textSecondary, ...typography.caption }]}>{reading.author}</Text>
              </View>
            </TouchableOpacity>
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
    paddingTop: 60,
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
    fontSize: 28,
    fontWeight: 'bold',
  },
}); 