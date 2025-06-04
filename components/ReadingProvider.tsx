import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { READINGS } from '@/utils/data';
import { startOfDay, isAfter, isBefore, isToday } from 'date-fns';

const STORAGE_KEYS = {
  SELECTED_CATEGORIES: '@Ray:selectedCategories',
  READINGS_PER_DAY: '@Ray:readingsPerDay',
  REMINDER_TIME: '@Ray:reminderTime',
  TEXT_SIZE: '@Ray:textSize',
  NOTIFICATIONS_ENABLED: '@Ray:notificationsEnabled',
  COMPLETED_READINGS: '@Ray:completedReadings',
  CURRENT_DAY: '@Ray:currentDay',
  LAST_OPENED_DATE: '@Ray:lastOpenedDate',
  ONBOARDED: '@Ray:onboarded',
};

// Default context value shape
const defaultContextValue = {
  selectedCategories: ['Philosophy', 'Literature', 'Poetry'],
  readingsPerDay: 1,
  reminderTime: { hours: 21, minutes: 0 }, // 9:00 PM default
  textSize: 1,
  notificationsEnabled: true,
  completedReadings: [],
  currentDay: 1,
  totalDays: 1000,
  todaysReadings: [],
  previousReadings: [],
  onboarded: false,
  
  // Functions
  setSelectedCategories: (categories) => {},
  setReadingsPerDay: (count) => {},
  setReminderTime: (time) => {},
  setTextSize: (size) => {},
  setNotificationsEnabled: (enabled) => {},
  markReadingAsCompleted: (id) => {},
  findReading: (id) => null,
  initialize: () => {},
};

const ReadingContext = createContext(defaultContextValue);

export const ReadingProvider = ({ children }) => {
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategoriesState] = useState(defaultContextValue.selectedCategories);
  const [readingsPerDay, setReadingsPerDayState] = useState(defaultContextValue.readingsPerDay);
  const [reminderTime, setReminderTimeState] = useState(defaultContextValue.reminderTime);
  const [textSize, setTextSizeState] = useState(defaultContextValue.textSize);
  const [notificationsEnabled, setNotificationsEnabledState] = useState(defaultContextValue.notificationsEnabled);
  const [completedReadings, setCompletedReadings] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [onboarded, setOnboarded] = useState(false);
  const [lastOpenedDate, setLastOpenedDate] = useState(null);
  
  const totalDays = 1000;
  
  // Load saved state on app start
  useEffect(() => {
    const loadSavedState = async () => {
      try {
        if (!isMounted.current) return;
        
        const savedOnboarded = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDED);
        const isOnboarded = savedOnboarded === 'true';
        if (isMounted.current) setOnboarded(isOnboarded);
        
        // Only load other preferences if onboarded
        if (isOnboarded) {
          const [
            savedCategories,
            savedReadingsPerDay,
            savedReminderTime,
            savedTextSize,
            savedNotificationsEnabled,
            savedCompletedReadings,
            savedCurrentDay,
            savedLastOpenedDate
          ] = await Promise.all([
            AsyncStorage.getItem(STORAGE_KEYS.SELECTED_CATEGORIES),
            AsyncStorage.getItem(STORAGE_KEYS.READINGS_PER_DAY),
            AsyncStorage.getItem(STORAGE_KEYS.REMINDER_TIME),
            AsyncStorage.getItem(STORAGE_KEYS.TEXT_SIZE),
            AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED),
            AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_READINGS),
            AsyncStorage.getItem(STORAGE_KEYS.CURRENT_DAY),
            AsyncStorage.getItem(STORAGE_KEYS.LAST_OPENED_DATE)
          ]);

          if (!isMounted.current) return;

          if (savedCategories) setSelectedCategoriesState(JSON.parse(savedCategories));
          if (savedReadingsPerDay) setReadingsPerDayState(Number(savedReadingsPerDay));
          if (savedReminderTime) setReminderTimeState(JSON.parse(savedReminderTime));
          if (savedTextSize) setTextSizeState(Number(savedTextSize));
          if (savedNotificationsEnabled !== null) setNotificationsEnabledState(JSON.parse(savedNotificationsEnabled));
          if (savedCompletedReadings) setCompletedReadings(JSON.parse(savedCompletedReadings));
          if (savedCurrentDay) setCurrentDay(Number(savedCurrentDay));
          
          const today = startOfDay(new Date());
          if (savedLastOpenedDate) {
            const lastOpened = new Date(savedLastOpenedDate);
            if (!isToday(lastOpened)) {
              if (isMounted.current) {
                setCurrentDay(prev => prev + 1);
                await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_DAY, String(currentDay + 1));
              }
            }
            if (isMounted.current) {
              setLastOpenedDate(today);
              await AsyncStorage.setItem(STORAGE_KEYS.LAST_OPENED_DATE, today.toISOString());
            }
          } else {
            if (isMounted.current) {
              setLastOpenedDate(today);
              await AsyncStorage.setItem(STORAGE_KEYS.LAST_OPENED_DATE, today.toISOString());
            }
          }
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    };
    
    loadSavedState();

    return () => {
      isMounted.current = false;
    };
  }, []);
  
  // Setters with AsyncStorage persistence
  const setSelectedCategories = async (categories) => {
    if (!isMounted.current) return;
    setSelectedCategoriesState(categories);
    await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_CATEGORIES, JSON.stringify(categories));
  };
  
  const setReadingsPerDay = async (count) => {
    if (!isMounted.current) return;
    setReadingsPerDayState(count);
    await AsyncStorage.setItem(STORAGE_KEYS.READINGS_PER_DAY, String(count));
  };
  
  const setReminderTime = async (time) => {
    if (!isMounted.current) return;
    setReminderTimeState(time);
    await AsyncStorage.setItem(STORAGE_KEYS.REMINDER_TIME, JSON.stringify(time));
  };
  
  const setTextSize = async (size) => {
    if (!isMounted.current) return;
    setTextSizeState(size);
    await AsyncStorage.setItem(STORAGE_KEYS.TEXT_SIZE, String(size));
  };
  
  const setNotificationsEnabled = async (enabled) => {
    if (!isMounted.current) return;
    setNotificationsEnabledState(enabled);
    await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED, JSON.stringify(enabled));
  };
  
  const markReadingAsCompleted = async (id) => {
    if (!isMounted.current) return;
    if (!completedReadings.includes(id)) {
      const newCompletedReadings = [...completedReadings, id];
      setCompletedReadings(newCompletedReadings);
      await AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_READINGS, JSON.stringify(newCompletedReadings));
    }
  };
  
  const initialize = async () => {
    if (!isMounted.current) return;
    if (!onboarded) {
      setOnboarded(true);
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDED, JSON.stringify(true));
      
      const today = startOfDay(new Date());
      setLastOpenedDate(today);
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_OPENED_DATE, today.toISOString());
    }
  };
  
  // Helper to find a reading by ID
  const findReading = (id) => {
    return READINGS.find(reading => reading.id === id);
  };
  
  // Filter readings by selected categories
  const filteredReadings = READINGS.filter(reading => 
    selectedCategories.includes(reading.category)
  );
  
  // Get today's readings
  const todaysReadings = Array.from({ length: readingsPerDay }, (_, i) => {
    const index = ((currentDay - 1) * readingsPerDay) + i;
    if (index < filteredReadings.length) {
      const reading = filteredReadings[index];
      return {
        ...reading,
        completed: completedReadings.includes(reading.id),
      };
    }
    return null;
  }).filter(Boolean);
  
  // Get previous readings (last 7 days)
  const previousReadingIndices = [];
  for (let day = currentDay - 1; day > Math.max(0, currentDay - 8); day--) {
    for (let i = 0; i < readingsPerDay; i++) {
      previousReadingIndices.push((day - 1) * readingsPerDay + i);
    }
  }
  
  const previousReadings = previousReadingIndices
    .map(index => {
      if (index >= 0 && index < filteredReadings.length) {
        const reading = filteredReadings[index];
        return {
          ...reading,
          completed: completedReadings.includes(reading.id),
          day: Math.floor(index / readingsPerDay) + 1,
        };
      }
      return null;
    })
    .filter(Boolean);

  if (isLoading) {
    return null;
  }
  
  return (
    <ReadingContext.Provider
      value={{
        selectedCategories,
        readingsPerDay,
        reminderTime,
        textSize,
        notificationsEnabled,
        completedReadings,
        currentDay,
        totalDays,
        todaysReadings,
        previousReadings,
        onboarded,
        
        setSelectedCategories,
        setReadingsPerDay,
        setReminderTime,
        setTextSize,
        setNotificationsEnabled,
        markReadingAsCompleted,
        findReading,
        initialize,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
};

export const useReadingContext = () => useContext(ReadingContext);