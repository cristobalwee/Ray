import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { Check, ChevronRight } from 'lucide-react-native';
import { formatDate } from '@/utils/helpers';

export const PreviousReadingItem = ({ reading, onPress }) => {
  const { colors, typography, spacing, borderRadius } = useTheme();
  
  const completedDate = new Date();
  // Subtract days based on the reading day (this is for display purposes only)
  completedDate.setDate(completedDate.getDate() - (reading.day ? 1 : 0));
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { 
        backgroundColor: colors.surface,
        borderRadius: borderRadius.md,
        marginBottom: spacing.md,
      }]}
      activeOpacity={0.7}
    >
      <View style={styles.innerContainer}>
        <Image 
          source={{ uri: reading.imageUrl }} 
          style={[styles.thumbnail, { 
            borderRadius: borderRadius.sm,
            backgroundColor: colors.surfaceElevated,
          }]} 
          resizeMode="cover" 
        />
        
        <View style={styles.contentContainer}>
          <Text style={[styles.title, {
            color: colors.text,
            ...typography.bodySmall,
          }]} numberOfLines={2}>
            {reading.title}
          </Text>
          
          <View style={styles.metaContainer}>
            <Text style={[styles.date, {
              color: colors.textSecondary,
              ...typography.caption,
            }]}>
              {formatDate(completedDate, 'short')}
            </Text>
            
            <View style={[styles.categoryTag, { 
              backgroundColor: colors.accent,
              borderRadius: borderRadius.pill,
              paddingVertical: 2,
              paddingHorizontal: 8,
            }]}>
              <Text style={[styles.categoryText, {
                color: colors.background,
                ...typography.tag,
                fontSize: 10,
              }]}>
                {reading.category}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.rightContainer}>
          {reading.completed ? (
            <View style={[styles.completedIndicator, {
              backgroundColor: colors.success,
              borderRadius: 999,
              padding: 2,
            }]}>
              <Check size={12} color={colors.background} />
            </View>
          ) : (
            <ChevronRight size={18} color={colors.textSecondary} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginBottom: 12,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    marginRight: 8,
  },
  categoryTag: {},
  categoryText: {},
  rightContainer: {
    padding: 8,
  },
  completedIndicator: {},
});