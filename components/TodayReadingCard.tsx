import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { Check, Clock, ChevronRight } from 'lucide-react-native';
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
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }]}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: reading.imageUrl }} 
            style={[styles.image, { borderRadius: borderRadius.md }]} 
            resizeMode="cover" 
          />
        </View>
        
        <View style={styles.metaContainer}>
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
          
          <View style={styles.titleContainer}>
            <Text style={[styles.title, {
              color: colors.text,
              ...typography.subheading,
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
          
          <View style={styles.actionContainer}>
            <ChevronRight size={20} color={colors.textSecondary} />
          </View>
        </View>
        
        {reading.completed && (
          <View style={[styles.completedOverlay, {
            backgroundColor: 'rgba(18, 18, 18, 0.75)',
            borderRadius: borderRadius.lg,
          }]}>
            <Animated.View
              entering={FadeIn.duration(400)}
              style={styles.completedContent}
            >
              <View style={[styles.checkContainer, {
                backgroundColor: colors.success,
                borderRadius: 999,
                padding: 8,
                marginBottom: 8,
              }]}>
                <Check size={24} color={colors.background} />
              </View>
              <Text style={[styles.completedText, {
                color: colors.text,
                ...typography.subheading,
                marginBottom: 20,
              }]}>
                Completed
              </Text>
              
              <TouchableOpacity
                style={[styles.reReadButton, {
                  backgroundColor: colors.primary,
                  borderRadius: borderRadius.md,
                  paddingVertical: spacing.sm,
                  paddingHorizontal: spacing.lg,
                }]}
                onPress={onPress}
              >
                <Text style={[styles.reReadText, {
                  color: colors.background,
                  ...typography.button,
                }]}>
                  Re-read
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
    marginVertical: 12,
  },
  card: {
    overflow: 'hidden',
  },
  imageContainer: {
    height: 160,
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  metaContainer: {
    padding: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
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
  },
  checkContainer: {},
  completedText: {},
  reReadButton: {},
  reReadText: {},
});