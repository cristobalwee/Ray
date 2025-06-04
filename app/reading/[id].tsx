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
  withTiming
} from 'react-native-reanimated';
import { ArrowLeft, Share2, Minus, Plus } from 'lucide-react-native';

export default function ReadingScreen() {
  const router = useRouter();
  const { colors, typography, spacing, borderRadius } = useTheme();
  const { width, height } = useWindowDimensions();
  const { id } = useLocalSearchParams();
  const { 
    findReading, 
    markReadingAsCompleted,
    textSize: globalTextSize,
  } = useReadingContext();
  
  const reading = findReading(id as string);
  const [showControls, setShowControls] = useState(true);
  const [textSize, setTextSize] = useState(globalTextSize);
  const scrollRef = useRef<ScrollView>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
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
  
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const progress = contentOffset.y / (contentSize.height - layoutMeasurement.height);
    setScrollProgress(Math.min(Math.max(progress, 0), 1));
  };
  
  const handleBack = () => {
    router.back();
  };
  
  const handleIncreaseTextSize = () => {
    setTextSize(prev => Math.min(prev + 0.1, 1.5));
  };
  
  const handleDecreaseTextSize = () => {
    setTextSize(prev => Math.max(prev - 0.1, 0.8));
  };
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `I'm reading "${reading.title}" by ${reading.author} in the Ray app.`,
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleComplete = () => {
    markReadingAsCompleted(reading.id);
    router.back();
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
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer, 
          { paddingTop: height * 0.08, paddingBottom: height * 0.12 }
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        scrollEnabled={true}
        bounces={true}
      >
        <TouchableOpacity 
          activeOpacity={1}
          onPress={toggleControls}
          style={styles.contentWrapper}
        >
          <Animated.View entering={FadeIn.duration(800)}>
            <Text style={[styles.title, { 
              color: colors.text,
              ...typography.title,
              marginBottom: spacing.md,
              fontSize: 28 * textSize,
            }]}>
              {reading.title}
            </Text>
            
            <Text style={[styles.author, { 
              color: colors.textSecondary,
              ...typography.subheading,
              marginBottom: spacing.xl,
            }]}>
              by {reading.author}
            </Text>
            
            <Text style={[styles.content, { 
              color: colors.text,
              ...typography.body,
              fontSize: 16 * textSize,
              lineHeight: 28 * textSize,
            }]}>
              {reading.content}
            </Text>
            
            {reading.completed ? null : (
              <View style={[styles.completeContainer, { marginTop: spacing.xxl }]}>
                <TouchableOpacity
                  style={[styles.completeButton, { 
                    backgroundColor: colors.primary,
                    borderRadius: borderRadius.md,
                    paddingVertical: spacing.md,
                    paddingHorizontal: spacing.xl,
                  }]}
                  onPress={handleComplete}
                >
                  <Text style={[styles.completeButtonText, { 
                    color: colors.background,
                    ...typography.button,
                  }]}>
                    Mark as Completed
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        </TouchableOpacity>
      </ScrollView>

      <Animated.View 
        style={[styles.header, animatedHeaderStyle]}
        pointerEvents={showControls ? 'auto' : 'none'}
      >
        <TouchableOpacity
          style={[styles.backButton, { 
            backgroundColor: colors.surfaceElevated,
            borderRadius: borderRadius.pill,
            padding: spacing.sm,
          }]}
          onPress={handleBack}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View style={styles.textControls}>
          <TouchableOpacity
            style={[styles.textSizeButton, { 
              backgroundColor: colors.surfaceElevated,
              borderRadius: borderRadius.pill,
              padding: spacing.sm,
              marginLeft: spacing.sm,
            }]}
            onPress={handleDecreaseTextSize}
          >
            <Minus size={20} color={colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.textSizeButton, { 
              backgroundColor: colors.surfaceElevated,
              borderRadius: borderRadius.pill,
              padding: spacing.sm,
              marginLeft: spacing.sm,
            }]}
            onPress={handleIncreaseTextSize}
          >
            <Plus size={20} color={colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.shareButton, { 
              backgroundColor: colors.surfaceElevated,
              borderRadius: borderRadius.pill,
              padding: spacing.sm,
              marginLeft: spacing.sm,
            }]}
            onPress={handleShare}
          >
            <Share2 size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      <Animated.View 
        style={[styles.footer, animatedFooterStyle]}
        pointerEvents={showControls ? 'auto' : 'none'}
      >
        <View style={[styles.progressBarContainer, { 
          backgroundColor: colors.surfaceElevated,
          borderRadius: borderRadius.pill,
        }]}>
          <View style={[styles.progressBar, { 
            backgroundColor: colors.primary,
            borderRadius: borderRadius.pill,
            width: `${scrollProgress * 100}%`,
          }]} />
        </View>
      </Animated.View>
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