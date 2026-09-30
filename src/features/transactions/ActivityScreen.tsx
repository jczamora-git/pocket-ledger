import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { PocketCard } from '../../components/cards/PocketCard';
import { CurrencyFormatter, Money } from '../../domain/money';
import {
  sampleCategories,
  sampleTransactions,
} from '../../data/sample';
import { TransactionModel, TransactionType } from '../../domain/types';
import {
  AppColors,
  AppRadius,
  AppSpacing,
  AppTypography,
} from '../../theme';

type FilterType = 'all' | TransactionType;

export const ActivityScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredTransactions = sampleTransactions.filter((tx) => {
    if (activeFilter === 'all') return true;
    return tx.type === activeFilter;
  });

  const totalInflow = sampleTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount.cents, 0);

  const totalOutflow = sampleTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount.cents, 0);

  const renderTransactionItem = ({ item }: { item: TransactionModel }) => {
    const isIncome = item.type === 'income';
    const isTransfer = item.type === 'transfer';
    const amountPrefix = isIncome ? '+' : isTransfer ? '' : '-';
    const amountColor = isIncome
      ? AppColors.income
      : isTransfer
      ? AppColors.blue
      : AppColors.ink;

    const category = sampleCategories.find((c) => c.id === item.categoryId);

    return (
      <View style={styles.txRow}>
        <View
          style={[
            styles.txIconCircle,
            {
              backgroundColor: isIncome
                ? 'rgba(22, 199, 132, 0.12)'
                : isTransfer
                ? 'rgba(59, 130, 246, 0.12)'
                : 'rgba(236, 236, 239, 0.7)',
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
            size={20}
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
            {item.merchant || 'Transaction'}
          </Text>
          <Text style={styles.txCategory} numberOfLines={1}>
            {category?.name || (isTransfer ? 'Account Transfer' : 'General')} •{' '}
            {item.date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}
          </Text>
        </View>
        <View style={styles.txRight}>
          <Text style={[styles.txAmount, { color: amountColor }]}>
            {amountPrefix}
            {CurrencyFormatter.format(item.amount)}
          </Text>
          {item.isUntracked && (
            <View style={styles.untrackedBadge}>
              <Text style={styles.untrackedText}>Untracked</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
        <View style={styles.monthBadge}>
          <MaterialIcons name="calendar-today" size={14} color={AppColors.inkSecondary} />
          <Text style={styles.monthText}>October 2026</Text>
        </View>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryContainer}>
        <PocketCard style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>Total Income</Text>
              <Text style={[styles.summaryAmount, { color: AppColors.income }]}>
                +{CurrencyFormatter.format(Money.fromCentavos(totalInflow))}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>Total Spent</Text>
              <Text style={[styles.summaryAmount, { color: AppColors.expense }]}>
                -{CurrencyFormatter.format(Money.fromCentavos(totalOutflow))}
              </Text>
            </View>
          </View>
        </PocketCard>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {(['all', 'income', 'expense', 'transfer'] as FilterType[]).map((type) => {
          const isSelected = activeFilter === type;
          const label =
            type === 'all'
              ? 'All'
              : type === 'income'
              ? 'Income'
              : type === 'expense'
              ? 'Expense'
              : 'Transfers';

          return (
            <Pressable
              key={type}
              accessibilityRole="button"
              accessibilityLabel={`Filter by ${label}`}
              onPress={() => setActiveFilter(type)}
              style={[
                styles.filterChip,
                isSelected && styles.filterChipSelected,
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  isSelected && styles.filterChipTextSelected,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Transactions List */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransactionItem}
        contentContainerStyle={[styles.listContent, { paddingBottom: 110 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="receipt" size={48} color={AppColors.faint} />
            <Text style={styles.emptyText}>No transactions found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: AppSpacing.xl,
    marginBottom: AppSpacing.md,
  },
  headerTitle: {
    ...AppTypography.displayLarge,
    fontSize: 28,
  },
  monthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    paddingHorizontal: AppSpacing.md,
    paddingVertical: 6,
    borderRadius: AppRadius.sm,
    borderWidth: 1,
    borderColor: AppColors.line,
  },
  monthText: {
    ...AppTypography.bodyMedium,
    fontWeight: '500',
    color: AppColors.inkSecondary,
    marginLeft: 6,
  },
  summaryContainer: {
    paddingHorizontal: AppSpacing.xl,
    marginBottom: AppSpacing.md,
  },
  summaryCard: {
    padding: AppSpacing.lg,
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
    marginBottom: 4,
  },
  summaryAmount: {
    ...AppTypography.moneyDisplay,
    fontSize: 16,
  },
  summaryDivider: {
    width: 1,
    height: 32,
    backgroundColor: AppColors.line,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: AppSpacing.xl,
    marginBottom: AppSpacing.md,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: AppSpacing.md,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: AppColors.surface,
    borderWidth: 1,
    borderColor: AppColors.line,
  },
  filterChipSelected: {
    backgroundColor: AppColors.surfaceDark,
    borderColor: AppColors.surfaceDark,
  },
  filterChipText: {
    ...AppTypography.bodyMedium,
    color: AppColors.inkSecondary,
    fontWeight: '500',
  },
  filterChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: AppSpacing.xl,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: AppSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.line,
    backgroundColor: AppColors.surface,
    paddingHorizontal: AppSpacing.lg,
    borderRadius: AppRadius.lg,
    marginBottom: AppSpacing.sm,
  },
  txIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AppSpacing.md,
  },
  txInfo: {
    flex: 1,
    minWidth: 0,
  },
  txMerchant: {
    ...AppTypography.bodyLarge,
    fontWeight: '600',
    color: AppColors.ink,
  },
  txCategory: {
    ...AppTypography.bodyMedium,
    marginTop: 2,
  },
  txRight: {
    alignItems: 'flex-end',
    marginLeft: AppSpacing.sm,
  },
  txAmount: {
    ...AppTypography.moneyDisplay,
  },
  untrackedBadge: {
    backgroundColor: AppColors.line,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 3,
  },
  untrackedText: {
    ...AppTypography.labelSmall,
    color: AppColors.muted,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: AppSpacing.xxxl,
  },
  emptyText: {
    ...AppTypography.bodyLarge,
    color: AppColors.muted,
    marginTop: AppSpacing.sm,
  },
});
