import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Share,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useReadingContext } from '@/components/ReadingProvider';
import Animated, { 
  FadeIn, 
  FadeOut, 
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  SlideInDown,
  SlideOutDown
} from 'react-native-reanimated';
import { ArrowLeft, Share2, Minus, Plus, Type, Check, Bookmark as BookmarkIcon, Home as HomeIcon } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { TEXT_SIZE_OPTIONS } from '@/utils/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FloatingPill from '@/components/FloatingPill';
import CompletionCard from '@/components/CompletionCard';

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

// Utility to get ordinal suffix
function getOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function ReadingScreen() {
  const router = useRouter();
  const { colors, typography, spacing, borderRadius } = useTheme();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const { 
    findReading, 
    markReadingAsCompleted,
    textSize: globalTextSize,
  } = useReadingContext();
  
  const reading = findReading(id as string) as Reading | null;
  const [showControls, setShowControls] = useState(true);
  const [textSize, setTextSize] = useState(globalTextSize);
  const scrollRef = useRef<ScrollView>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTextSizeDropdown, setShowTextSizeDropdown] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(reading ? reading.completed : false);
  const [showCompletionCard, setShowCompletionCard] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  
  const controlsOpacity = useSharedValue(1);
  
  useEffect(() => {
    const hideTimer = setTimeout(() => {
      if (showControls) {
        controlsOpacity.value = withTiming(0, { duration: 500 });
        setShowControls(false);
      }
    }, 3000);
    
    return () => clearTimeout(hideTimer);
  }, [showControls]);
  
  useEffect(() => {
    const checkBookmarked = async () => {
      if (!reading) return;
      const stored = await AsyncStorage.getItem('bookmarks');
      if (stored) {
        const arr = JSON.parse(stored);
        setBookmarked(arr.some((r: any) => r.id === reading.id));
      }
    };
    checkBookmarked();
  }, [reading?.id]);
  
  const toggleControls = () => {
    if (showControls) {
      controlsOpacity.value = withTiming(0, { duration: 500 });
    } else {
      controlsOpacity.value = withTiming(1, { duration: 300 });
    }
    setShowControls(!showControls);
  };
  
  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      opacity: controlsOpacity.value,
    };
  });
  
  const animatedFooterStyle = useAnimatedStyle(() => {
    return {
      opacity: controlsOpacity.value,
    };
  });
  
  const handleScroll = (event: any) => {
    if (!reading) return;
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const progress = contentOffset.y / (contentSize.height - layoutMeasurement.height);
    setScrollProgress(Math.min(Math.max(progress, 0), 1));
    // Auto-complete logic
    if (!hasCompleted && progress > 0.98) {
      setHasCompleted(true);
      markReadingAsCompleted(reading.id);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setTimeout(() => setShowCompletionCard(true), 400); // allow pill to animate out first
    }
  };
  
  const handleBack = () => {
    router.back();
  };
  
  const handleShare = async () => {
    if (!reading) return;
    try {
      await Share.share({
        message: `I'm reading "${reading.title}" by ${reading.author} in the Ray app.`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleBookmark = async () => {
    if (!reading) return;
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
      {/* Top left floating back button */}
      <View style={{ position: 'absolute', top: insets.top, left: 16, zIndex: 10 }}>
        <TouchableOpacity
          style={{ backgroundColor: colors.surfaceElevated, borderRadius: borderRadius.pill, padding: spacing.sm, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 }}
          onPress={handleBack}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, { paddingTop: insets.top + 96, paddingBottom: insets.bottom + 64 }]}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        scrollEnabled={true}
        bounces={true}
      >
        <View style={styles.contentWrapper}>
          <Text style={[styles.title, { color: colors.text, ...typography.title, fontSize: 32 * textSize, lineHeight: 36 * textSize }]}> {reading.title} </Text>
          <Text style={[styles.author, { color: colors.textSecondary, ...typography.subheading, marginBottom: spacing.xl, fontSize: 22 * textSize, lineHeight: 24 * textSize }]}>by {reading.author}</Text>
          <Text style={[styles.content, { color: colors.text, ...typography.body, fontSize: 22 * textSize, lineHeight: 24 * textSize }]}>{reading.content}</Text>
          {showCompletionCard && (
            <CompletionCard
              reading={reading}
              colors={colors}
              typography={typography}
              router={router}
              bookmarked={bookmarked}
              toggleBookmark={toggleBookmark}
              borderRadius={borderRadius}
            />
          )}
        </View>
      </ScrollView>
      {!showCompletionCard && (
        <FloatingPill
          colors={colors}
          typography={typography}
          borderRadius={borderRadius}
          scrollProgress={scrollProgress}
          textSize={textSize}
          setTextSize={setTextSize}
          showTextSizeDropdown={showTextSizeDropdown}
          setShowTextSizeDropdown={setShowTextSizeDropdown}
          spacing={spacing}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  contentWrapper: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
  },
  author: {
    textAlign: 'center',
  },
  content: {},
  errorText: {
    textAlign: 'center',
    marginTop: 40,
  },
  backLink: {
    textAlign: 'center',
    marginTop: 16,
    padding: 8,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
  },
  backButton: {},
  textControls: {
    flexDirection: 'row',
  },
  textSizeButton: {
    marginLeft: 8,
  },
  shareButton: {
    marginLeft: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 16,
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
  },
  progressBarContainer: {
    height: 6,
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  completeContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  completeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  completeButtonText: {},
});