import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, SlideOutDown } from 'react-native-reanimated';
import { Type } from 'lucide-react-native';
import { TEXT_SIZE_OPTIONS } from '@/utils/data';

interface FloatingPillProps {
  colors: any;
  typography: any;
  borderRadius: any;
  scrollProgress: number;
  textSize: number;
  setTextSize: (v: number) => void;
  showTextSizeDropdown: boolean;
  setShowTextSizeDropdown: (v: boolean | ((prev: boolean) => boolean)) => void;
  spacing: any;
}

export default function FloatingPill({
  colors,
  typography,
  borderRadius,
  scrollProgress,
  textSize,
  setTextSize,
  showTextSizeDropdown,
  setShowTextSizeDropdown,
  spacing,
}: FloatingPillProps) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={SlideOutDown.springify().damping(18)}
      style={{ position: 'absolute', bottom: 32, left: 0, right: 0, alignItems: 'center', zIndex: 20 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceElevated, borderRadius: 999, paddingVertical: 10, paddingHorizontal: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 }}>
        {/* Progress bar and percent */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
          <View style={{ width: 80, height: 8, backgroundColor: colors.surface, borderRadius: 4, marginRight: 8, overflow: 'hidden' }}>
            <View style={{ width: `${Math.round(scrollProgress * 100)}%`, height: 8, backgroundColor: colors.primary, borderRadius: 4 }} />
          </View>
          <Text style={{ color: colors.textSecondary, ...typography.caption }}>{`${Math.round(scrollProgress * 100)}% Completed`}</Text>
        </View>
        {/* Text size button */}
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            style={{ backgroundColor: colors.surface, borderRadius: borderRadius.pill, padding: 8 }}
            onPress={() => setShowTextSizeDropdown((v) => !v)}
          >
            <Type size={20} color={colors.text} />
          </TouchableOpacity>
          {showTextSizeDropdown && (
            <View style={{ position: 'absolute', bottom: 48, right: 0, backgroundColor: colors.surfaceElevated, borderRadius: borderRadius.md, paddingVertical: 8, paddingHorizontal: 0, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, elevation: 10, zIndex: 100 }}>
              {TEXT_SIZE_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt.label}
                  style={{ paddingVertical: 8, paddingHorizontal: 24, backgroundColor: textSize === opt.value ? colors.primary : 'transparent', borderRadius: borderRadius.md }}
                  onPress={() => { setTextSize(opt.value); setShowTextSizeDropdown(false); }}
                >
                  <Text style={{ color: textSize === opt.value ? colors.background : colors.text, ...typography.button, fontSize: opt.fontSize }}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );
} 