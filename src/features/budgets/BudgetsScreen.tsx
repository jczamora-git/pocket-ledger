import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { PocketCard } from '../../components/cards/PocketCard';
import { CurrencyFormatter, Money } from '../../domain/money';
import {
  sampleBudgets,
  sampleCategories,
  sampleTransactions,
} from '../../data/sample';
import {
  AppColors,
  AppSpacing,
  AppTypography,
} from '../../theme';

export const BudgetsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const totalBudgetLimit = sampleBudgets.reduce(
    (sum, b) => sum + b.limitAmount.cents,
    0
  );

  const totalSpent = sampleBudgets.reduce((sum, b) => {
    const spent = sampleTransactions
      .filter((t) => t.categoryId === b.categoryId)
      .reduce((s, t) => s + t.amount.cents, 0);
    return sum + spent;
  }, 0);

  const overallRatio = totalBudgetLimit > 0 ? totalSpent / totalBudgetLimit : 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: Math.max(insets.top, 16), paddingBottom: 110 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Budgets</Text>
          <Text style={styles.headerSubtitle}>Monthly category spending limits</Text>
        </View>
        <View style={styles.monthBadge}>
          <MaterialIcons name="calendar-today" size={14} color={AppColors.inkSecondary} />
          <Text style={styles.monthText}>Oct 2026</Text>
        </View>
      </View>

      {/* Overall Budget Overview Card */}
      <PocketCard variant="dark" style={styles.overviewCard}>
        <Text style={styles.overviewLabel}>Total Budget Spent</Text>
        <View style={styles.overviewAmountRow}>
          <Text style={styles.overviewSpent}>
            {CurrencyFormatter.format(Money.fromCentavos(totalSpent))}
          </Text>
          <Text style={styles.overviewTotal}>
            / {CurrencyFormatter.format(Money.fromCentavos(totalBudgetLimit))}
          </Text>
        </View>
        <View style={styles.overviewProgressBarBg}>
          <View
            style={[
              styles.overviewProgressBarFill,
              { width: `${Math.min(Math.round(overallRatio * 100), 100)}%` },
            ]}
          />
        </View>
        <View style={styles.overviewFooter}>
          <Text style={styles.overviewRemaining}>
            Remaining:{' '}
            {CurrencyFormatter.format(
              Money.fromCentavos(Math.max(totalBudgetLimit - totalSpent, 0))
            )}
          </Text>
          <Text style={styles.overviewPercent}>{Math.round(overallRatio * 100)}% used</Text>
        </View>
      </PocketCard>

      {/* Category Budget Cards */}
      <Text style={styles.sectionTitle}>Category Budgets</Text>
      {sampleBudgets.map((b) => {
        const cat = sampleCategories.find((c) => c.id === b.categoryId);
        const spentCents = sampleTransactions
          .filter((t) => t.categoryId === b.categoryId)
          .reduce((sum, t) => sum + t.amount.cents, 0);

        const ratio = spentCents / b.limitAmount.cents;
        const percent = Math.round(ratio * 100);
        const progressColor =
          ratio >= 1.0 ? AppColors.expense : ratio >= 0.8 ? AppColors.amber : AppColors.accent;

        const remainingCents = Math.max(b.limitAmount.cents - spentCents, 0);

        return (
          <PocketCard key={b.id} style={styles.budgetCard}>
            <View style={styles.cardHeader}>
              <View style={styles.catRow}>
                <View style={styles.catIconCircle}>
                  <MaterialIcons name="local-offer" size={18} color={AppColors.ink} />
                </View>
                <View>
                  <Text style={styles.catName}>{cat?.name || 'Category'}</Text>
                  <Text style={styles.catSub}>Alert at {b.alertPercentage}%</Text>
                </View>
              </View>
              <View style={styles.percentBadge}>
                <Text style={[styles.percentText, { color: progressColor }]}>{percent}%</Text>
              </View>
            </View>

            {/* Progress bar */}
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${Math.min(percent, 100)}%`,
                    backgroundColor: progressColor,
                  },
                ]}
              />
            </View>

            {/* Spent & Remaining Row */}
            <View style={styles.amountsRow}>
              <View>
                <Text style={styles.amountLabel}>Spent</Text>
                <Text style={styles.spentValue}>
                  {CurrencyFormatter.format(Money.fromCentavos(spentCents))}
                </Text>
              </View>
              <View style={styles.amountsRight}>
                <Text style={styles.amountLabel}>Remaining of {CurrencyFormatter.formatWhole(b.limitAmount)}</Text>
                <Text style={[styles.remainingValue, { color: progressColor }]}>
                  {CurrencyFormatter.format(Money.fromCentavos(remainingCents))}
                </Text>
              </View>
            </View>
          </PocketCard>
        );
      })}
    </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: AppSpacing.lg,
  },
  headerTitle: {
    ...AppTypography.displayLarge,
    fontSize: 28,
  },
  headerSubtitle: {
    ...AppTypography.bodyMedium,
    marginTop: 2,
  },
  monthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    paddingHorizontal: AppSpacing.md,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.line,
  },
  monthText: {
    ...AppTypography.bodyMedium,
    fontWeight: '500',
    color: AppColors.inkSecondary,
    marginLeft: 6,
  },
  overviewCard: {
    marginBottom: AppSpacing.xl,
  },
  overviewLabel: {
    ...AppTypography.bodyMedium,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  overviewAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: AppSpacing.md,
  },
  overviewSpent: {
    ...AppTypography.moneyDisplay,
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  overviewTotal: {
    ...AppTypography.moneyDisplay,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    marginLeft: 6,
  },
  overviewProgressBarBg: {
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
    marginBottom: AppSpacing.sm,
  },
  overviewProgressBarFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: AppColors.accent,
  },
  overviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewRemaining: {
    ...AppTypography.labelMedium,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  overviewPercent: {
    ...AppTypography.labelMedium,
    color: AppColors.accent,
    fontWeight: '600',
  },
  sectionTitle: {
    ...AppTypography.titleMedium,
    marginBottom: AppSpacing.md,
  },
  budgetCard: {
    marginBottom: AppSpacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: AppSpacing.md,
  },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  catIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: AppColors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AppSpacing.md,
  },
  catName: {
    ...AppTypography.bodyLarge,
    fontWeight: '600',
    color: AppColors.ink,
  },
  catSub: {
    ...AppTypography.labelSmall,
    color: AppColors.muted,
    marginTop: 2,
  },
  percentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: AppColors.bg,
  },
  percentText: {
    ...AppTypography.labelMedium,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: AppColors.line,
    overflow: 'hidden',
    marginBottom: AppSpacing.md,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  amountsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountLabel: {
    ...AppTypography.labelSmall,
    color: AppColors.muted,
    marginBottom: 2,
  },
  spentValue: {
    ...AppTypography.moneyDisplay,
  },
  amountsRight: {
    alignItems: 'flex-end',
  },
  remainingValue: {
    ...AppTypography.moneyDisplay,
    fontWeight: '700',
  },
});
