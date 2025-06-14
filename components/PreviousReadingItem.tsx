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
        <View style={styles.thumbnailContainer}>
          <Image 
            source={{ uri: reading.imageUrl }} 
            style={[styles.thumbnail, { 
              borderRadius: 4,
              backgroundColor: colors.surfaceElevated,
            }]} 
            resizeMode="cover" 
          />
          <View style={styles.completedIndicator}>
            <View style={{
              backgroundColor: colors.surfaceElevated,
              borderRadius: borderRadius.pill,
              padding: spacing.sm,
            }}>
              <Check size={12} color={colors.text} />
            </View>
          </View>
        </View>
        
        <View style={styles.contentContainer}>          
          <View style={styles.metaContainer}>
            <Text style={[styles.date, {
              color: colors.textSecondary,
              ...typography.caption,
            }]}>
              {formatDate(completedDate)}
            </Text>
            <Text style={[styles.title, {
              color: colors.text,
              ...typography.headingSmall
            }]} numberOfLines={2}>
              {reading.title}
            </Text>
          </View>
        </View>
        
        <View style={styles.rightContainer}>
          <ChevronRight size={20} color={colors.text} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 12,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8
  },
  thumbnail: {
    width: 48,
    height: 64,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 8
  },
  date: {
    marginRight: 8,
  },
  categoryTag: {},
  categoryText: {},
  rightContainer: {
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  thumbnailContainer: {
    position: 'relative',
    width: 48,
    height: 64,
    marginRight: 12,
  },
  completedIndicator: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1000,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});