import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AppColors, AppSpacing, AppTypography } from '../../theme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  onBack,
  rightAction,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftRow}>
        {onBack && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={onBack}
            style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
          >
            <MaterialIcons name="arrow-back" size={24} color={AppColors.ink} />
          </Pressable>
        )}
        <View style={styles.titleCol}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightAction && <View style={styles.rightAction}>{rightAction}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: AppSpacing.xl,
    paddingVertical: AppSpacing.md,
    backgroundColor: AppColors.bg,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backBtn: {
    marginRight: AppSpacing.md,
    padding: AppSpacing.xs,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.6,
  },
  titleCol: {
    flex: 1,
  },
  title: {
    ...AppTypography.titleLarge,
  },
  subtitle: {
    ...AppTypography.bodyMedium,
    marginTop: 2,
  },
  rightAction: {
    marginLeft: AppSpacing.md,
  },
});
