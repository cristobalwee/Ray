import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { darkTheme } from './ThemeProvider';

const { colors, typography, borderRadius, spacing } = darkTheme;

const BaseToast = ({ text1, text2, type }: any) => {
  const backgroundColor =
    type === 'success'
      ? colors.success
      : type === 'error'
      ? colors.error
      : colors.surfaceElevated;
  return (
    <SafeAreaView edges={['top']} style={{ width: '100%' }}>
      <View style={styles.toastContainer}> 
        <View style={styles.toastContent}>
          <Text style={[styles.text1, { color: colors.text }]}>{text1}</Text>
          {!!text2 && <Text style={[styles.text2, { color: colors.textSecondary }]}>{text2}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
};

export const toastConfig = {
  success: (props: any) => <BaseToast {...props} type="success" />,
  error: (props: any) => <BaseToast {...props} type="error" />,
  info: (props: any) => <BaseToast {...props} type="info" />,
};

const styles = StyleSheet.create({
  toastContainer: {
    marginHorizontal: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  toastContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.surfaceElevated,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  text1: {
    ...typography.body,
    color: colors.text,
    marginBottom: 2,
  },
  text2: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});

export default toastConfig; 