import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { AppColors, AppRadius, AppShadows, AppSpacing } from '../../theme';

interface PocketCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'dark' | 'flat';
}

export const PocketCard: React.FC<PocketCardProps> = ({
  children,
  style,
  variant = 'default',
}) => {
  return (
    <View
      style={[
        styles.base,
        variant === 'default' && styles.defaultCard,
        variant === 'dark' && styles.darkCard,
        variant === 'flat' && styles.flatCard,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: AppRadius.card,
    padding: AppSpacing.xl,
  },
  defaultCard: {
    backgroundColor: AppColors.surface,
    borderWidth: 1,
    borderColor: AppColors.line,
    ...AppShadows.card,
  },
  darkCard: {
    backgroundColor: AppColors.surfaceDark2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    ...AppShadows.pop,
  },
  flatCard: {
    backgroundColor: AppColors.surface,
    borderWidth: 1,
    borderColor: AppColors.line,
  },
});
