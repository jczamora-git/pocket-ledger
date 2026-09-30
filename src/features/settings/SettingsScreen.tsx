import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { PocketCard } from '../../components/cards/PocketCard';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import {
  AppColors,
  AppRadius,
  AppSpacing,
  AppTypography,
} from '../../theme';

interface SettingsScreenProps {
  onBack?: () => void;
}

interface SettingRowProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle?: string;
  value?: string;
  onPress?: () => void;
  badge?: string;
}

const SettingRow: React.FC<SettingRowProps> = ({
  icon,
  title,
  subtitle,
  value,
  onPress,
  badge,
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={styles.iconCircle}>
        <MaterialIcons name={icon} size={20} color={AppColors.ink} />
      </View>
      <View style={styles.rowInfo}>
        <View style={styles.titleRow}>
          <Text style={styles.rowTitle}>{title}</Text>
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        {subtitle && <Text style={styles.rowSubtitle}>{subtitle}</Text>}
      </View>
      {value ? (
        <Text style={styles.rowValue}>{value}</Text>
      ) : (
        <MaterialIcons name="chevron-right" size={20} color={AppColors.muted} />
      )}
    </Pressable>
  );
};

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      <ScreenHeader
        title="Settings"
        subtitle="App Preferences & Privacy"
        onBack={onBack}
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 60 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Security & Authentication */}
        <Text style={styles.sectionHeader}>Security & Privacy</Text>
        <PocketCard style={styles.card}>
          <SettingRow
            icon="lock-outline"
            title="App Lock / PIN"
            subtitle="Require PIN to access application"
            badge="Phase 4"
          />
          <View style={styles.divider} />
          <SettingRow
            icon="fingerprint"
            title="Biometric Unlock"
            subtitle="Unlock with Fingerprint or Face ID"
            badge="Phase 4"
          />
          <View style={styles.divider} />
          <SettingRow
            icon="timer"
            title="Auto-Lock Timer"
            value="Immediately"
          />
        </PocketCard>

        {/* Backup & Persistence */}
        <Text style={styles.sectionHeader}>Local Data & Backup</Text>
        <PocketCard style={styles.card}>
          <SettingRow
            icon="cloud-off"
            title="Offline Database"
            subtitle="expo-sqlite local-first storage"
            badge="Phase 2"
          />
          <View style={styles.divider} />
          <SettingRow
            icon="file-download"
            title="Export Encrypted Backup"
            subtitle="Export full database as JSON/archive"
            badge="Phase 4"
          />
          <View style={styles.divider} />
          <SettingRow
            icon="file-upload"
            title="Restore from Backup"
            subtitle="Import encrypted backup archive"
            badge="Phase 4"
          />
        </PocketCard>

        {/* Preferences */}
        <Text style={styles.sectionHeader}>Preferences</Text>
        <PocketCard style={styles.card}>
          <SettingRow
            icon="payments"
            title="Currency Standard"
            value="PHP (₱) Centavos"
          />
          <View style={styles.divider} />
          <SettingRow
            icon="calendar-month"
            title="Budget Cycle"
            value="Monthly (1st-31st)"
          />
          <View style={styles.divider} />
          <SettingRow
            icon="notifications-active"
            title="Bill Reminders"
            subtitle="On-device local notifications"
            badge="Phase 4"
          />
        </PocketCard>

        {/* About Card */}
        <PocketCard style={styles.aboutCard}>
          <View style={styles.aboutIcon}>
            <MaterialIcons name="verified-user" size={32} color={AppColors.accent} />
          </View>
          <Text style={styles.appName}>Pocket Ledger</Text>
          <Text style={styles.appVersion}>Version 1.0.0 (Phase 1 UI Shell)</Text>
          <Text style={styles.appDescription}>
            Private, local-first personal finance tracker. Zero tracking, zero ads, zero cloud telemetry.
          </Text>
        </PocketCard>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.bg,
  },
  scrollContent: {
    paddingHorizontal: AppSpacing.xl,
  },
  sectionHeader: {
    ...AppTypography.labelMedium,
    color: AppColors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: AppSpacing.md,
    marginBottom: AppSpacing.sm,
    marginLeft: 4,
  },
  card: {
    padding: 0,
    marginBottom: AppSpacing.md,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: AppSpacing.lg,
    paddingVertical: AppSpacing.md,
  },
  rowPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: AppColors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AppSpacing.md,
  },
  rowInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTitle: {
    ...AppTypography.bodyLarge,
    fontWeight: '600',
    color: AppColors.ink,
  },
  badge: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  badgeText: {
    ...AppTypography.labelSmall,
    color: AppColors.accentDeep,
    fontSize: 9,
  },
  rowSubtitle: {
    ...AppTypography.labelMedium,
    color: AppColors.muted,
    marginTop: 2,
  },
  rowValue: {
    ...AppTypography.bodyMedium,
    color: AppColors.inkSecondary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: AppColors.line,
    marginLeft: 68,
  },
  aboutCard: {
    alignItems: 'center',
    padding: AppSpacing.xl,
    marginTop: AppSpacing.md,
    backgroundColor: 'rgba(23, 25, 29, 0.03)',
    borderWidth: 1,
    borderColor: AppColors.line,
  },
  aboutIcon: {
    marginBottom: AppSpacing.sm,
  },
  appName: {
    ...AppTypography.titleMedium,
    fontWeight: '700',
  },
  appVersion: {
    ...AppTypography.labelSmall,
    color: AppColors.muted,
    marginVertical: 4,
  },
  appDescription: {
    ...AppTypography.bodyMedium,
    textAlign: 'center',
    color: AppColors.inkSecondary,
    marginTop: 6,
    lineHeight: 18,
  },
});
