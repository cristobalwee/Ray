import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/components/ThemeProvider';
import { CATEGORIES } from '@/utils/data';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useReadingContext } from '@/components/ReadingProvider';
import { Clock } from 'lucide-react-native';
import { READING_PER_DAY_OPTIONS } from '@/utils/constants';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';

export default function PreferencesScreen() {
  const router = useRouter();
  const { colors, typography, spacing, borderRadius } = useTheme();
  const { 
    setSelectedCategories, 
    setReadingsPerDay, 
    setReminderTime,
    initialize
  } = useReadingContext();
  
  const [selectedCats, setSelectedCats] = useState(['Philosophy', 'Literature', 'Poetry']);
  const [readingsCount, setReadingsCount] = useState(1);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date().setHours(21, 0, 0, 0)); // 9:00 PM default
  
  const handleCategoryToggle = (category) => {
    if (selectedCats.includes(category)) {
      setSelectedCats(selectedCats.filter(c => c !== category));
    } else {
      setSelectedCats([...selectedCats, category]);
    }
  };

  const handleTimeChange = (date) => {
    setSelectedTime(date.getTime());
  };

  const handleBegin = () => {
    const time = new Date(selectedTime);
    setSelectedCategories(selectedCats);
    setReadingsPerDay(readingsCount);
    setReminderTime({ hours: time.getHours(), minutes: time.getMinutes() });
    initialize();
    router.replace('/home');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View 
          entering={FadeIn.delay(300).duration(600)} 
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { 
            color: colors.text,
            ...typography.heading,
            marginBottom: spacing.md
          }]}>
            What would you like to read?
          </Text>
          
          <View style={styles.categoriesContainer}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  { 
                    backgroundColor: selectedCats.includes(category) 
                      ? colors.primary 
                      : colors.surfaceElevated,
                    borderRadius: borderRadius.pill,
                    marginRight: spacing.sm,
                    marginBottom: spacing.sm,
                  }
                ]}
                onPress={() => handleCategoryToggle(category)}
              >
                <Text style={[
                  styles.categoryText,
                  { 
                    color: selectedCats.includes(category) 
                      ? colors.background 
                      : colors.text,
                    ...typography.tag
                  }
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeIn.delay(600).duration(600)} 
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { 
            color: colors.text,
            ...typography.heading,
            marginBottom: spacing.md
          }]}>
            Readings per day
          </Text>
          
          <View style={styles.countSelector}>
            {READING_PER_DAY_OPTIONS.map((count) => (
              <TouchableOpacity
                key={count}
                style={[
                  styles.countOption,
                  { 
                    backgroundColor: readingsCount === count 
                      ? colors.primary 
                      : colors.surfaceElevated,
                    borderRadius: borderRadius.md,
                    marginRight: spacing.sm,
                  }
                ]}
                onPress={() => setReadingsCount(count)}
              >
                <Text style={[
                  styles.countText,
                  { 
                    color: readingsCount === count 
                      ? colors.background 
                      : colors.text,
                    ...typography.button
                  }
                ]}>
                  {count}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeIn.delay(900).duration(600)} 
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { 
            color: colors.text,
            ...typography.heading,
            marginBottom: spacing.md
          }]}>
            Daily reminder
          </Text>
          
          <TouchableOpacity
            onPress={() => Platform.OS !== 'web' && setShowTimePicker(true)}
            style={[styles.timeSelector, {
              backgroundColor: colors.surfaceElevated,
              borderRadius: borderRadius.md,
              padding: spacing.md,
              flexDirection: 'row',
              alignItems: 'center',
            }]}
          >
            <Clock size={24} color={colors.primary} style={{ marginRight: spacing.md }} />
            <Text style={[styles.timeText, {
              color: colors.text,
              ...typography.subheading,
            }]}>
              {format(new Date(selectedTime), 'h:mm a')}
            </Text>
          </TouchableOpacity>

          {Platform.OS !== 'web' && (
            <DatePicker
              modal
              open={showTimePicker}
              date={new Date(selectedTime)}
              onConfirm={(date) => {
                setShowTimePicker(false);
                handleTimeChange(date);
              }}
              onCancel={() => {
                setShowTimePicker(false);
              }}
              mode="time"
              minuteInterval={15}
              theme="dark"
            />
          )}
        </Animated.View>
      </ScrollView>

      <Animated.View 
        entering={FadeInDown.delay(1200).duration(600)}
        style={[styles.buttonContainer, { paddingHorizontal: spacing.md }]}
      >
        <TouchableOpacity
          style={[styles.button, { 
            backgroundColor: colors.primary,
            borderRadius: borderRadius.md,
          }]}
          onPress={handleBegin}
          disabled={selectedCats.length === 0}
        >
          <Text style={[styles.buttonText, { 
            color: colors.background,
            ...typography.button
          }]}>
            Begin
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {},
  countSelector: {
    flexDirection: 'row',
  },
  countOption: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  countText: {},
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {},
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {},
});