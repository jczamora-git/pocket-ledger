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
import { PriorityBadge } from '../../components/common/Badges';
import { CurrencyFormatter, Money } from '../../domain/money';
import {
  sampleAccounts,
  sampleBills,
  sampleBudgets,
  sampleCategories,
  sampleDebts,
  sampleTransactions,
} from '../../data/sample';
import {
  AppColors,
  AppRadius,
  AppSpacing,
  AppTypography,
} from '../../theme';

interface DashboardScreenProps {
  onNavigate?: (route: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const insets = useSafeAreaInsets();

  // Derived available cash (excluding credit card)
  const availableCashCents = sampleAccounts
    .filter((a) => a.type !== 'creditCard')
    .reduce((sum, a) => sum + a.openingBalance.cents, 0);
  const availableCash = Money.fromCentavos(availableCashCents);

  // Inflow & outflow from sample transactions
  const totalInflow = sampleTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount.cents, 0);
  const totalOutflow = sampleTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount.cents, 0);

  // Debts summary
  const iOweCents = sampleDebts
    .filter((d) => d.direction === 'iOwe')
    .reduce((sum, d) => sum + d.remainingAmount.cents, 0);
  const owedToMeCents = sampleDebts
    .filter((d) => d.direction === 'owedToMe')
    .reduce((sum, d) => sum + d.remainingAmount.cents, 0);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: Math.max(insets.top, 16), paddingBottom: 110 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Greeting Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greetingSub}>Welcome back,</Text>
          <Text style={styles.greetingTitle}>Good morning, Jeizi</Text>
        </View>
        <View style={styles.headerIcons}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            style={styles.iconBtn}
          >
            <MaterialIcons name="notifications-none" size={22} color={AppColors.ink} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Settings"
            onPress={() => onNavigate?.('/settings')}
            style={styles.iconBtn}
          >
            <MaterialIcons name="settings" size={22} color={AppColors.ink} />
          </Pressable>
        </View>
      </View>

      {/* 2. Available Cash Hero Card */}
      <View style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <Text style={styles.heroLabel}>Available Cash</Text>
          <View style={styles.secureBadge}>
            <MaterialIcons name="lock-outline" size={12} color="rgba(255, 255, 255, 0.7)" />
            <Text style={styles.secureText}>Local-First</Text>
          </View>
        </View>
        <Text style={styles.heroAmount}>{CurrencyFormatter.format(availableCash)}</Text>
        <View style={styles.heroDivider} />
        <View style={styles.heroFooter}>
          <Text style={styles.netWorthLabel}>Est. Net Worth</Text>
          <Text style={styles.netWorthValue}>
            {CurrencyFormatter.format(
              Money.fromCentavos(availableCashCents + owedToMeCents - iOweCents)
            )}
          </Text>
        </View>
      </View>

      {/* 3. Quick Actions Row */}
      <View style={styles.quickActionsRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add Income"
          style={styles.quickActionItem}
        >
          <View style={[styles.quickActionCircle, { backgroundColor: 'rgba(22, 199, 132, 0.12)' }]}>
            <MaterialIcons name="arrow-downward" size={22} color={AppColors.income} />
          </View>
          <Text style={styles.quickActionText}>Income</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add Expense"
          style={styles.quickActionItem}
        >
          <View style={[styles.quickActionCircle, { backgroundColor: 'rgba(255, 77, 79, 0.12)' }]}>
            <MaterialIcons name="arrow-upward" size={22} color={AppColors.expense} />
          </View>
          <Text style={styles.quickActionText}>Expense</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Transfer"
          style={styles.quickActionItem}
        >
          <View style={[styles.quickActionCircle, { backgroundColor: 'rgba(59, 130, 246, 0.12)' }]}>
            <MaterialIcons name="swap-horiz" size={22} color={AppColors.blue} />
          </View>
          <Text style={styles.quickActionText}>Transfer</Text>
        </Pressable>
      </View>

      {/* 4. Alert Banner */}
      <View style={styles.alertCard}>
        <MaterialIcons name="warning-amber" size={20} color={AppColors.amber} />
        <View style={styles.alertTextCol}>
          <Text style={styles.alertTitle}>Upcoming Due Date</Text>
          <Text style={styles.alertSubtitle}>BDO Credit Card bill is due in 3 days</Text>
        </View>
      </View>

      {/* 5. Spending Activity */}
      <PocketCard style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Monthly Flow</Text>
          <Text style={styles.sectionSubtitle}>October 2026</Text>
        </View>
        <View style={styles.flowRow}>
          <View style={styles.flowCol}>
            <View style={styles.flowLabelRow}>
              <View style={[styles.flowDot, { backgroundColor: AppColors.income }]} />
              <Text style={styles.flowLabel}>Inflow</Text>
            </View>
            <Text style={[styles.flowAmount, { color: AppColors.income }]}>
              +{CurrencyFormatter.format(Money.fromCentavos(totalInflow))}
            </Text>
          </View>
          <View style={styles.flowDivider} />
          <View style={styles.flowCol}>
            <View style={styles.flowLabelRow}>
              <View style={[styles.flowDot, { backgroundColor: AppColors.expense }]} />
              <Text style={styles.flowLabel}>Outflow</Text>
            </View>
            <Text style={[styles.flowAmount, { color: AppColors.expense }]}>
              -{CurrencyFormatter.format(Money.fromCentavos(totalOutflow))}
            </Text>
          </View>
        </View>
      </PocketCard>

      {/* 6. Budgets Preview */}
      <PocketCard style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Budgets</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View all budgets"
            onPress={() => onNavigate?.('/budgets')}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </Pressable>
        </View>
        {sampleBudgets.slice(0, 3).map((b) => {
          const cat = sampleCategories.find((c) => c.id === b.categoryId);
          // Dummy spent from transactions
          const spentCents = sampleTransactions
            .filter((t) => t.categoryId === b.categoryId)
            .reduce((sum, t) => sum + t.amount.cents, 0);
          const ratio = Math.min(spentCents / b.limitAmount.cents, 1);
          const progressColor =
            ratio >= 1.0 ? AppColors.expense : ratio >= 0.8 ? AppColors.amber : AppColors.accent;

          return (
            <View key={b.id} style={styles.budgetItem}>
              <View style={styles.budgetHeader}>
                <Text style={styles.budgetName}>{cat?.name || 'Category'}</Text>
                <Text style={styles.budgetAmounts}>
                  {CurrencyFormatter.formatWhole(Money.fromCentavos(spentCents))} /{' '}
                  {CurrencyFormatter.formatWhole(b.limitAmount)}
                </Text>
              </View>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${Math.round(ratio * 100)}%`, backgroundColor: progressColor },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </PocketCard>

      {/* 7. Upcoming Bills */}
      <PocketCard style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Bills</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View all bills"
            onPress={() => onNavigate?.('/bills')}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </Pressable>
        </View>
        {sampleBills.slice(0, 3).map((bill) => (
          <View key={bill.id} style={styles.billRow}>
            <View style={styles.billIconCircle}>
              <MaterialIcons name="receipt-long" size={18} color={AppColors.ink} />
            </View>
            <View style={styles.billInfo}>
              <Text style={styles.billName} numberOfLines={1}>
                {bill.name}
              </Text>
              <Text style={styles.billDueDate}>
                Due in {Math.round((bill.dueDate.getTime() - Date.now()) / 86400000)} days
              </Text>
            </View>
            <View style={styles.billRight}>
              <Text style={styles.billAmount}>{CurrencyFormatter.format(bill.amount)}</Text>
              <PriorityBadge priority={bill.priority} />
            </View>
          </View>
        ))}
      </PocketCard>

      {/* 8. Debts Summary Card */}
      <PocketCard variant="dark" style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Debts Summary</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View all debts"
            onPress={() => onNavigate?.('/debts')}
          >
            <Text style={[styles.viewAllText, { color: AppColors.accent }]}>Manage</Text>
          </Pressable>
        </View>
        <View style={styles.debtsRow}>
          <View style={styles.debtCol}>
            <Text style={styles.debtLabel}>I Owe</Text>
            <Text style={[styles.debtAmount, { color: AppColors.expense }]}>
              {CurrencyFormatter.format(Money.fromCentavos(iOweCents))}
            </Text>
          </View>
          <View style={[styles.flowDivider, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]} />
          <View style={styles.debtCol}>
            <Text style={styles.debtLabel}>Owed to Me</Text>
            <Text style={[styles.debtAmount, { color: AppColors.income }]}>
              {CurrencyFormatter.format(Money.fromCentavos(owedToMeCents))}
            </Text>
          </View>
        </View>
      </PocketCard>

      {/* 9. Recent Activity */}
      <PocketCard style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View all activity"
            onPress={() => onNavigate?.('/activity')}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </Pressable>
        </View>
        {sampleTransactions.slice(0, 4).map((tx) => {
          const isIncome = tx.type === 'income';
          const isTransfer = tx.type === 'transfer';
          const amountPrefix = isIncome ? '+' : isTransfer ? '' : '-';
          const amountColor = isIncome
            ? AppColors.income
            : isTransfer
            ? AppColors.blue
            : AppColors.ink;

          return (
            <View key={tx.id} style={styles.txRow}>
              <View
                style={[
                  styles.txIconCircle,
                  {
                    backgroundColor: isIncome
                      ? 'rgba(22, 199, 132, 0.12)'
                      : isTransfer
                      ? 'rgba(59, 130, 246, 0.12)'
                      : 'rgba(236, 236, 239, 0.6)',
                  },
                ]}
              >
                <MaterialIcons
                  name={
                    isIncome
                      ? 'arrow-downward'
                      : isTransfer
                      ? 'swap-horiz'
                      : 'shopping-bag'
                  }
                  size={18}
                  color={
                    isIncome
                      ? AppColors.income
                      : isTransfer
                      ? AppColors.blue
                      : AppColors.inkSecondary
                  }
                />
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txMerchant} numberOfLines={1}>
                  {tx.merchant || 'Transaction'}
                </Text>
                <Text style={styles.txDate}>
                  {tx.date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}
                </Text>
              </View>
              <Text style={[styles.txAmount, { color: amountColor }]}>
                {amountPrefix}
                {CurrencyFormatter.format(tx.amount)}
              </Text>
            </View>
          );
        })}
      </PocketCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.bg,
  },
  scrollContent: {
    paddingHorizontal: AppSpacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: AppSpacing.lg,
  },
  greetingSub: {
    ...AppTypography.bodyMedium,
  },
  greetingTitle: {
    ...AppTypography.titleLarge,
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.surface,
    borderWidth: 1,
    borderColor: AppColors.line,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: AppSpacing.sm,
  },
  heroCard: {
    backgroundColor: AppColors.surfaceDark,
    borderRadius: AppRadius.card,
    padding: AppSpacing.xl,
    marginBottom: AppSpacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: AppSpacing.sm,
  },
  heroLabel: {
    ...AppTypography.bodyMedium,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: AppRadius.sm,
  },
  secureText: {
    ...AppTypography.labelSmall,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  heroAmount: {
    ...AppTypography.moneyHero,
    marginBottom: AppSpacing.md,
  },
  heroDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: AppSpacing.sm,
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  netWorthLabel: {
    ...AppTypography.bodyMedium,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  netWorthValue: {
    ...AppTypography.moneyDisplay,
    color: AppColors.accent,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: AppSpacing.lg,
  },
  quickActionItem: {
    alignItems: 'center',
  },
  quickActionCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  quickActionText: {
    ...AppTypography.bodyMedium,
    fontWeight: '500',
    color: AppColors.ink,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    borderRadius: AppRadius.lg,
    padding: AppSpacing.md,
    marginBottom: AppSpacing.lg,
  },
  alertTextCol: {
    marginLeft: AppSpacing.sm,
    flex: 1,
  },
  alertTitle: {
    ...AppTypography.bodyMedium,
    fontWeight: '600',
    color: AppColors.ink,
  },
  alertSubtitle: {
    ...AppTypography.labelMedium,
    color: AppColors.inkSecondary,
    marginTop: 2,
  },
  sectionCard: {
    marginBottom: AppSpacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: AppSpacing.md,
  },
  sectionTitle: {
    ...AppTypography.titleMedium,
  },
  sectionSubtitle: {
    ...AppTypography.bodyMedium,
  },
  viewAllText: {
    ...AppTypography.bodyMedium,
    color: AppColors.accentDeep,
    fontWeight: '600',
  },
  flowRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flowCol: {
    flex: 1,
  },
  flowLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  flowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  flowLabel: {
    ...AppTypography.bodyMedium,
  },
  flowAmount: {
    ...AppTypography.moneyDisplay,
    fontSize: 16,
  },
  flowDivider: {
    width: 1,
    height: 36,
    backgroundColor: AppColors.line,
    marginHorizontal: AppSpacing.md,
  },
  budgetItem: {
    marginBottom: AppSpacing.md,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  budgetName: {
    ...AppTypography.bodyMedium,
    fontWeight: '500',
    color: AppColors.ink,
  },
  budgetAmounts: {
    ...AppTypography.labelMedium,
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
  billRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: AppSpacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.line,
  },
  billIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: AppColors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AppSpacing.md,
  },
  billInfo: {
    flex: 1,
  },
  billName: {
    ...AppTypography.bodyMedium,
    fontWeight: '600',
    color: AppColors.ink,
  },
  billDueDate: {
    ...AppTypography.labelSmall,
    color: AppColors.muted,
    marginTop: 2,
  },
  billRight: {
    alignItems: 'flex-end',
  },
  billAmount: {
    ...AppTypography.moneyDisplay,
    marginBottom: 4,
  },
  debtsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  debtCol: {
    flex: 1,
  },
  debtLabel: {
    ...AppTypography.bodyMedium,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  debtAmount: {
    ...AppTypography.moneyDisplay,
    fontSize: 18,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: AppSpacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.line,
  },
  txIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AppSpacing.md,
  },
  txInfo: {
    flex: 1,
  },
  txMerchant: {
    ...AppTypography.bodyMedium,
    fontWeight: '500',
    color: AppColors.ink,
  },
  txDate: {
    ...AppTypography.labelSmall,
    color: AppColors.muted,
    marginTop: 2,
  },
  txAmount: {
    ...AppTypography.moneyDisplay,
  },
});
