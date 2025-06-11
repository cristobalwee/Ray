import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { Check, Clock, ChevronRight, Space } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export const TodayReadingCard = ({ reading, onPress }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View style={[styles.card, { 
        backgroundColor: colors.surfaceElevated,
        borderRadius: borderRadius.lg,
        filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3)) drop-shadow(0 6px 10px rgba(0, 0, 0, 0.15))'
      }]}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: reading.imageUrl }} 
            style={[styles.image, { opacity: 0.3 }]} 
            resizeMode="cover" 
          />
        </View>
        
        <View style={[styles.metaContainer, reading.completed && { opacity: 0.6 }]}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, {
              color: colors.text,
              ...typography.heading,
            }]} numberOfLines={2}>
              {reading.title}
            </Text>
            <Text style={[styles.author, {
              color: colors.textSecondary,
              ...typography.caption,
            }]}>
              by {reading.author}
            </Text>
          </View>
          <View style={styles.tagsContainer}>
            <View style={[styles.categoryTag, { 
              backgroundColor: colors.accent,
              borderRadius: borderRadius.pill,
              paddingVertical: 4,
              paddingHorizontal: 10,
              marginRight: 8,
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
              paddingVertical: 4,
              paddingHorizontal: 10,
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
        </View>
        
        
        {reading.completed && (
          <View style={[styles.completedOverlay, {
            backgroundColor: 'rgba(58, 58, 58, 0.75)',
            borderRadius: borderRadius.lg,
          }]}>
            <Animated.View
              entering={FadeIn.duration(400)}
              style={styles.completedContent}
            >
              <View style={[styles.checkContainer, {
                backgroundColor: colors.primary,
                borderRadius: 999,
                padding: spacing.md,
                marginBottom: 16,
              }]}>
                <Check size={24} color={colors.text} />
              </View>
              <Text style={[styles.completedText, {
                color: colors.text,
                marginBottom: 4,
                ...typography.heading,
              }]}>
                Completed
              </Text>
              <Text style={[styles.completedText, {
                color: colors.text,
                ...typography.caption,
                marginBottom: 20,
              }]}>
                You’re done with your reading today.
              </Text>
              
              <TouchableOpacity
                style={[styles.reReadButton, {
                  backgroundColor: colors.primary,
                  borderRadius: borderRadius.sm,
                  paddingVertical: spacing.md,
                  paddingHorizontal: spacing.lg,
                }]}
                onPress={onPress}
              >
                <Text style={[styles.reReadText, {
                  color: colors.text,
                  ...typography.button,
                }]}>
                  View again
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 24
  },
  card: {
    overflow: 'hidden',
    marginHorizontal: 40
  },
  imageContainer: {
    height: 140,
    width: '80%',
    alignSelf: 'center',
    marginTop: 24
  },
  image: {
    height: '100%',
    width: '100%',
  },
  metaContainer: {
    padding: 24,
    gap: 16
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  categoryTag: {},
  categoryText: {},
  timeTag: {},
  timeText: {},
  titleContainer: {
    marginBottom: 4,
  },
  title: {
    marginBottom: 4,
  },
  author: {},
  actionContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  completedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedContent: {
    alignItems: 'center',
    padding: 24
  },
  checkContainer: {},
  completedText: {
    textAlign: 'center',
  },
  reReadButton: {

  },
  reReadText: {},
});