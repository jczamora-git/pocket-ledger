import React, { useState } from 'react';
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
import { PriorityBadge } from '../../components/common/Badges';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { CurrencyFormatter } from '../../domain/money';
import { sampleDebts } from '../../data/sample';
import { DebtDirection, DebtModel } from '../../domain/types';
import {
  AppColors,
  AppSpacing,
  AppTypography,
} from '../../theme';

interface DebtsScreenProps {
  onBack?: () => void;
}

export const DebtsScreen: React.FC<DebtsScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const [activeDirection, setActiveDirection] = useState<DebtDirection>('iOwe');

  const filteredDebts = sampleDebts.filter((d) => d.direction === activeDirection);

  const totalOwedCents = sampleDebts
    .filter((d) => d.direction === 'iOwe')
    .reduce((sum, d) => sum + d.remainingAmount.cents, 0);

  const totalReceivableCents = sampleDebts
    .filter((d) => d.direction === 'owedToMe')
    .reduce((sum, d) => sum + d.remainingAmount.cents, 0);

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      <ScreenHeader
        title="Debts"
        subtitle="Peer Obligations & Receivables"
        onBack={onBack}
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 60 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Debts Summary Overview */}
        <PocketCard variant="dark" style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>I Owe (Liabilities)</Text>
              <Text style={[styles.summaryAmount, { color: AppColors.expense }]}>
                {CurrencyFormatter.format({ cents: totalOwedCents, toDouble: () => totalOwedCents / 100 } as any)}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>Owed to Me (Assets)</Text>
              <Text style={[styles.summaryAmount, { color: AppColors.income }]}>
                {CurrencyFormatter.format({ cents: totalReceivableCents, toDouble: () => totalReceivableCents / 100 } as any)}
              </Text>
            </View>
          </View>
        </PocketCard>

        {/* Direction Switcher */}
        <View style={styles.tabRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View debts I owe"
            onPress={() => setActiveDirection('iOwe')}
            style={[
              styles.tabBtn,
              activeDirection === 'iOwe' && styles.tabBtnActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeDirection === 'iOwe' && styles.tabTextActive,
              ]}
            >
              I Owe
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View debts owed to me"
            onPress={() => setActiveDirection('owedToMe')}
            style={[
              styles.tabBtn,
              activeDirection === 'owedToMe' && styles.tabBtnActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeDirection === 'owedToMe' && styles.tabTextActive,
              ]}
            >
              Owed to Me
            </Text>
          </Pressable>
        </View>

        {/* Debt Cards */}
        {filteredDebts.map((debt) => {
          const paidCents = debt.originalAmount.cents - debt.remainingAmount.cents;
          const ratio = Math.min(paidCents / debt.originalAmount.cents, 1);
          const percent = Math.round(ratio * 100);

          return (
            <PocketCard key={debt.id} style={styles.debtCard}>
              <View style={styles.cardHeader}>
                <View style={styles.personRow}>
                  <View style={styles.personCircle}>
                    <MaterialIcons name="person-outline" size={20} color={AppColors.ink} />
                  </View>
                  <View>
                    <Text style={styles.personName}>{debt.personOrCompany}</Text>
                    {debt.note && (
                      <Text style={styles.debtNote}>{debt.note}</Text>
                    )}
                  </View>
                </View>
                <PriorityBadge priority={debt.priority} />
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressLabel}>
                    Repaid {percent}%
                  </Text>
                  <Text style={styles.progressAmount}>
                    {CurrencyFormatter.format(debt.remainingAmount)} remaining
                  </Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${percent}%`,
                        backgroundColor:
                          activeDirection === 'iOwe' ? AppColors.expense : AppColors.income,
                      },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.originalAmount}>
                  Original: {CurrencyFormatter.format(debt.originalAmount)}
                </Text>
                <Text style={styles.dueDateText}>
                  Due {debt.dueDate.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}
                </Text>
              </View>
            </PocketCard>
          );
        })}
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
  summaryCard: {
    marginBottom: AppSpacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryCol: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    ...AppTypography.labelMedium,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  summaryAmount: {
    ...AppTypography.moneyDisplay,
    fontSize: 18,
    fontWeight: '700',
  },
  summaryDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: AppColors.surface,
    padding: 4,
    borderRadius: 14,
    marginBottom: AppSpacing.lg,
    borderWidth: 1,
    borderColor: AppColors.line,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: AppColors.surfaceDark,
  },
  tabText: {
    ...AppTypography.bodyMedium,
    fontWeight: '500',
    color: AppColors.inkSecondary,
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  debtCard: {
    marginBottom: AppSpacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: AppSpacing.md,
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  personCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AppSpacing.md,
  },
  personName: {
    ...AppTypography.bodyLarge,
    fontWeight: '600',
    color: AppColors.ink,
  },
  debtNote: {
    ...AppTypography.labelMedium,
    color: AppColors.muted,
    marginTop: 2,
  },
  progressContainer: {
    marginBottom: AppSpacing.md,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    ...AppTypography.labelMedium,
    color: AppColors.muted,
  },
  progressAmount: {
    ...AppTypography.moneyDisplay,
    fontSize: 14,
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: AppColors.line,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  originalAmount: {
    ...AppTypography.labelMedium,
    color: AppColors.muted,
  },
  dueDateText: {
    ...AppTypography.labelSmall,
    color: AppColors.muted,
  },
});
