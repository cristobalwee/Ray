import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Platform } from 'react-native';
import { useTheme } from '@/components/ThemeProvider';
import { useReadingContext } from '@/components/ReadingProvider';
import { useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { CATEGORIES, TEXT_SIZE_OPTIONS } from '@/utils/data';
import { ArrowLeft, Clock, Type } from 'lucide-react-native';
import { READING_PER_DAY_OPTIONS } from '@/utils/constants';

export default function SettingsScreen() {
  const router = useRouter();
  const { colors, typography, spacing, borderRadius } = useTheme();
  const { 
    selectedCategories,
    readingsPerDay,
    reminderTime,
    textSize,
    notificationsEnabled,
    setSelectedCategories,
    setReadingsPerDay,
    setReminderTime,
    setTextSize,
    setNotificationsEnabled
  } = useReadingContext();

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View 
          entering={FadeIn.duration(600)} 
          style={styles.header}
        >
          <TouchableOpacity
            onPress={handleBack}
            style={[styles.backButton, {
              backgroundColor: colors.surfaceElevated,
              borderRadius: borderRadius.pill,
              padding: spacing.sm,
            }]}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { 
            color: colors.text,
            ...typography.title,
          }]}>
            Settings
          </Text>
        </Animated.View>

        <Animated.View 
          entering={FadeIn.delay(200).duration(600)} 
          style={[styles.section, { marginTop: spacing.xl }]}
        >
          <Text style={[styles.sectionTitle, { 
            color: colors.text,
            ...typography.heading,
            marginBottom: spacing.md
          }]}>
            Notifications
          </Text>
          
          <View style={[styles.settingRow, {
            backgroundColor: colors.surfaceElevated,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            marginBottom: spacing.md,
          }]}>
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { 
                color: colors.text,
                ...typography.subheading,
              }]}>
                Daily Reminders
              </Text>
              <Text style={[styles.settingDescription, { 
                color: colors.textSecondary,
                ...typography.caption,
              }]}>
                Receive a notification for your daily reading
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.text}
            />
          </View>

          {notificationsEnabled && (
            <View style={[styles.reminderSelector, {
              backgroundColor: colors.surfaceElevated,
              borderRadius: borderRadius.md,
              padding: spacing.md,
            }]}>
              <Clock size={24} color={colors.primary} />
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hoursScroll}>
                {Array.from({length: 24}, (_, i) => i).map((hour) => {
                  const displayHour = hour === 0 ? '12 AM' : 
                                      hour < 12 ? `${hour} AM` : 
                                      hour === 12 ? '12 PM' : 
                                      `${hour-12} PM`;
                  return (
                    <TouchableOpacity
                      key={hour}
                      style={[
                        styles.hourOption,
                        { 
                          backgroundColor: reminderTime === hour 
                            ? colors.primary 
                            : 'transparent',
                          borderRadius: borderRadius.sm,
                          marginRight: spacing.sm,
                          paddingVertical: spacing.xs,
                          paddingHorizontal: spacing.sm,
                        }
                      ]}
                      onPress={() => setReminderTime(hour)}
                    >
                      <Text style={[
                        styles.hourText,
                        { 
                          color: reminderTime === hour 
                            ? colors.background 
                            : colors.text,
                          ...typography.tag
                        }
                      ]}>
                        {displayHour}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </Animated.View>

        <Animated.View 
          entering={FadeIn.delay(400).duration(600)} 
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { 
            color: colors.text,
            ...typography.heading,
            marginBottom: spacing.md
          }]}>
            Reading Preferences
          </Text>
          
          <View style={[styles.settingRow, {
            backgroundColor: colors.surfaceElevated,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            marginBottom: spacing.md,
          }]}>
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { 
                color: colors.text,
                ...typography.subheading,
              }]}>
                Readings Per Day
              </Text>
            </View>
            <View style={styles.countSelector}>
              {READING_PER_DAY_OPTIONS.map((count) => (
                <TouchableOpacity
                  key={count}
                  style={[
                    styles.countOption,
                    { 
                      backgroundColor: readingsPerDay === count 
                        ? colors.primary 
                        : colors.surface,
                      borderRadius: borderRadius.md,
                      marginLeft: spacing.xs,
                    }
                  ]}
                  onPress={() => setReadingsPerDay(count)}
                >
                  <Text style={[
                    styles.countText,
                    { 
                      color: readingsPerDay === count 
                        ? colors.background 
                        : colors.text,
                      ...typography.tag
                    }
                  ]}>
                    {count}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={[styles.settingRow, {
            backgroundColor: colors.surfaceElevated,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            marginBottom: spacing.md,
            alignItems: 'flex-start',
          }]}>
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingTitle, { 
                color: colors.text,
                ...typography.subheading,
                marginBottom: spacing.sm,
              }]}>
                Content Categories
              </Text>
            </View>
            <View style={styles.categoriesContainer}>
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    { 
                      backgroundColor: selectedCategories.includes(category) 
                        ? colors.primary 
                        : colors.surface,
                      borderRadius: borderRadius.pill,
                      marginBottom: spacing.xs,
                      marginLeft: spacing.xs,
                    }
                  ]}
                  onPress={() => handleCategoryToggle(category)}
                >
                  <Text style={[
                    styles.categoryText,
                    { 
                      color: selectedCategories.includes(category) 
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
            Appearance
          </Text>
          
          <View style={[styles.settingRow, {
            backgroundColor: colors.surfaceElevated,
            borderRadius: borderRadius.md,
            padding: spacing.md,
          }]}>
            <View style={[styles.settingTextContainer, { flexDirection: 'row', alignItems: 'center' }]}>
              <Type size={20} color={colors.primary} style={{ marginRight: spacing.sm }} />
              <Text style={[styles.settingTitle, { 
                color: colors.text,
                ...typography.subheading,
              }]}>
                Text Size
              </Text>
            </View>
            <View style={styles.textSizeSelector}>
              {TEXT_SIZE_OPTIONS.map((size) => (
                <TouchableOpacity
                  key={size.value}
                  style={[
                    styles.textSizeOption,
                    { 
                      backgroundColor: textSize === size.value 
                        ? colors.primary 
                        : colors.surface,
                      borderRadius: borderRadius.md,
                      marginLeft: spacing.xs,
                      paddingVertical: spacing.xs,
                      paddingHorizontal: spacing.sm,
                    }
                  ]}
                  onPress={() => setTextSize(size.value)}
                >
                  <Text style={[
                    styles.textSizeText,
                    { 
                      color: textSize === size.value 
                        ? colors.background 
                        : colors.text,
                      ...typography.tag,
                      fontSize: size.fontSize,
                    }
                  ]}>
                    {size.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Animated.View>

        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { 
            color: colors.textTertiary,
            ...typography.caption,
          }]}>
            Ray v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 120,
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {},
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    marginBottom: 4,
  },
  settingDescription: {},
  reminderSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hoursScroll: {
    marginLeft: 16,
  },
  hourOption: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  hourText: {},
  countSelector: {
    flexDirection: 'row',
  },
  countOption: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  countText: {},
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 4,
    marginBottom: 4,
  },
  categoryText: {},
  textSizeSelector: {
    flexDirection: 'row',
  },
  textSizeOption: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 4,
  },
  textSizeText: {},
  versionContainer: {
    marginTop: 48,
    alignItems: 'center',
  },
  versionText: {},
});