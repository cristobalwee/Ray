import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { SlideInDown, FadeOut } from 'react-native-reanimated';
import { Check, Home as HomeIcon, Bookmark as BookmarkIcon } from 'lucide-react-native';

function getOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

interface CompletionCardProps {
  reading: any;
  colors: any;
  typography: any;
  router: any;
  bookmarked: boolean;
  toggleBookmark: () => void;
  borderRadius: any;
}

export default function CompletionCard({
  reading,
  colors,
  typography,
  router,
  bookmarked,
  toggleBookmark,
  borderRadius,
}: CompletionCardProps) {
  return (
    <Animated.View
      entering={SlideInDown.springify().damping(18)}
      exiting={FadeOut}
      style={{ marginTop: 32, alignItems: 'center', width: '100%' }}
    >
      <View style={{ backgroundColor: colors.surface, borderRadius: 24, padding: 28, width: '100%', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 16, elevation: 8 }}>
        <View style={{ backgroundColor: colors.cardAction, borderRadius: borderRadius.pill, width: 52, height: 52, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <Check size={28} color={colors.text} />
        </View>
        <View style={{ gap: 4 }}>
          <Text style={{ color: colors.text, ...typography.heading, textAlign: 'center' }}>You're done!</Text>
          <Text style={{ color: colors.textSecondary, ...typography.bodySmall, textAlign: 'center', marginBottom: 24 }}>Congrats on completing your {reading.day ? getOrdinal(reading.day) : ''} reading.</Text>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: colors.cardAction, borderRadius: 12, paddingVertical: 14, alignItems: 'center', width: '100%', marginBottom: 12, flexDirection: 'row', justifyContent: 'center' }}
          onPress={() => router.push('/home')}
        >
          <HomeIcon size={20} color={colors.text} style={{ marginRight: 8 }} />
          <Text style={{ color: colors.text, ...typography.button }}>Go back home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ borderColor: colors.border, borderWidth: 1, borderRadius: 12, paddingVertical: 14, alignItems: 'center', width: '100%', flexDirection: 'row', justifyContent: 'center', opacity: bookmarked ? 0.6 : 1 }}
          onPress={toggleBookmark}
          disabled={bookmarked}
        >
          <BookmarkIcon size={20} color={colors.text} style={{ marginRight: 8 }} />
          <Text style={{ color: colors.text, ...typography.button }}>{bookmarked ? 'Bookmarked' : 'Bookmark this reading'}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
} 