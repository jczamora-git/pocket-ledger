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
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { CurrencyFormatter, Money } from '../../domain/money';
import { sampleTransactions } from '../../data/sample';
import {
  AppColors,
  AppSpacing,
  AppTypography,
} from '../../theme';

interface ReportsScreenProps {
  onBack?: () => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();

  const totalIncome = sampleTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount.cents, 0);

  const totalExpense = sampleTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount.cents, 0);

  const netSavings = totalIncome - totalExpense;

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      <ScreenHeader
        title="Reports"
        subtitle="Financial Overview & Analytics"
        onBack={onBack}
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 60 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Net Savings Hero */}
        <PocketCard variant="dark" style={styles.heroCard}>
          <Text style={styles.heroLabel}>Net Savings (This Month)</Text>
          <Text style={styles.heroAmount}>
            {CurrencyFormatter.format(Money.fromCentavos(netSavings))}
          </Text>
          <View style={styles.heroRow}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatLabel}>Income</Text>
              <Text style={[styles.heroStatValue, { color: AppColors.income }]}>
                +{CurrencyFormatter.format(Money.fromCentavos(totalIncome))}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatLabel}>Expenses</Text>
              <Text style={[styles.heroStatValue, { color: AppColors.expense }]}>
                -{CurrencyFormatter.format(Money.fromCentavos(totalExpense))}
              </Text>
            </View>
          </View>
        </PocketCard>

        {/* Cash Flow Distribution */}
        <Text style={styles.sectionTitle}>Category Breakdown</Text>
        <PocketCard style={styles.breakdownCard}>
          <View style={styles.breakdownItem}>
            <View style={styles.catLeft}>
              <View style={[styles.colorIndicator, { backgroundColor: AppColors.income }]} />
              <Text style={styles.catTitle}>Salary & Freelance</Text>
            </View>
            <Text style={styles.catAmount}>₱30,000.00</Text>
          </View>
          <View style={styles.itemDivider} />
          <View style={styles.breakdownItem}>
            <View style={styles.catLeft}>
              <View style={[styles.colorIndicator, { backgroundColor: AppColors.accent }]} />
              <Text style={styles.catTitle}>Utilities</Text>
            </View>
            <Text style={styles.catAmount}>₱850.00</Text>
          </View>
          <View style={styles.itemDivider} />
          <View style={styles.breakdownItem}>
            <View style={styles.catLeft}>
              <View style={[styles.colorIndicator, { backgroundColor: AppColors.blue }]} />
              <Text style={styles.catTitle}>Groceries</Text>
            </View>
            <Text style={styles.catAmount}>₱620.00</Text>
          </View>
          <View style={styles.itemDivider} />
          <View style={styles.breakdownItem}>
            <View style={styles.catLeft}>
              <View style={[styles.colorIndicator, { backgroundColor: AppColors.violet }]} />
              <Text style={styles.catTitle}>Subscriptions</Text>
            </View>
            <Text style={styles.catAmount}>₱449.00</Text>
          </View>
          <View style={styles.itemDivider} />
          <View style={styles.breakdownItem}>
            <View style={styles.catLeft}>
              <View style={[styles.colorIndicator, { backgroundColor: AppColors.amber }]} />
              <Text style={styles.catTitle}>Food & Dining</Text>
            </View>
            <Text style={styles.catAmount}>₱285.00</Text>
          </View>
        </PocketCard>

        {/* Future Reports Placeholder */}
        <PocketCard style={styles.placeholderCard}>
          <View style={styles.placeholderIcon}>
            <MaterialIcons name="insights" size={36} color={AppColors.accent} />
          </View>
          <Text style={styles.placeholderTitle}>Advanced Analytics Coming in Phase 5</Text>
          <Text style={styles.placeholderSubtitle}>
            Full monthly trends, category breakdown charts, and exportable financial statements will be integrated with SQLite persistence.
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
  heroCard: {
    marginBottom: AppSpacing.xl,
  },
  heroLabel: {
    ...AppTypography.bodyMedium,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  heroAmount: {
    ...AppTypography.moneyHero,
    fontSize: 28,
    marginBottom: AppSpacing.md,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: AppSpacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  heroStat: {
    flex: 1,
  },
  heroStatLabel: {
    ...AppTypography.labelSmall,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 2,
  },
  heroStatValue: {
    ...AppTypography.moneyDisplay,
    fontSize: 14,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: AppSpacing.md,
  },
  sectionTitle: {
    ...AppTypography.titleMedium,
    marginBottom: AppSpacing.md,
  },
  breakdownCard: {
    marginBottom: AppSpacing.lg,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: AppSpacing.sm,
  },
  catLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: AppSpacing.md,
  },
  catTitle: {
    ...AppTypography.bodyMedium,
    color: AppColors.ink,
    fontWeight: '500',
  },
  catAmount: {
    ...AppTypography.moneyDisplay,
    fontSize: 14,
  },
  itemDivider: {
    height: 1,
    backgroundColor: AppColors.line,
  },
  placeholderCard: {
    alignItems: 'center',
    padding: AppSpacing.xl,
    backgroundColor: 'rgba(16, 185, 129, 0.04)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  placeholderIcon: {
    marginBottom: AppSpacing.md,
  },
  placeholderTitle: {
    ...AppTypography.titleMedium,
    textAlign: 'center',
    marginBottom: AppSpacing.sm,
  },
  placeholderSubtitle: {
    ...AppTypography.bodyMedium,
    textAlign: 'center',
    color: AppColors.muted,
    lineHeight: 20,
  },
});
