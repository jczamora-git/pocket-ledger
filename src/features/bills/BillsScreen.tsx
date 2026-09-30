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
import { BillStatusBadge, PriorityBadge } from '../../components/common/Badges';
import { CurrencyFormatter } from '../../domain/money';
import { sampleBills } from '../../data/sample';
import { BillModel, BillStatus } from '../../domain/types';
import {
  AppColors,
  AppRadius,
  AppSpacing,
  AppTypography,
} from '../../theme';

type FilterType = 'all' | BillStatus;

export const BillsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredBills = sampleBills.filter((bill) => {
    if (activeFilter === 'all') return true;
    return bill.status === activeFilter;
  });

  const totalUpcomingCents = sampleBills
    .filter((b) => b.status === 'pending' || b.status === 'partiallyPaid')
    .reduce((sum, b) => sum + b.amount.cents, 0);

  const renderBillCard = ({ item }: { item: BillModel }) => {
    const daysUntilDue = Math.round(
      (item.dueDate.getTime() - Date.now()) / 86400000
    );
    const dueText =
      daysUntilDue < 0
        ? `Overdue by ${Math.abs(daysUntilDue)} days`
        : daysUntilDue === 0
        ? 'Due today'
        : `Due in ${daysUntilDue} days`;

    return (
      <PocketCard style={styles.billCard}>
        <View style={styles.cardTopRow}>
          <View style={styles.billIconCircle}>
            <MaterialIcons name="receipt-long" size={20} color={AppColors.ink} />
          </View>
          <View style={styles.billNameCol}>
            <Text style={styles.billName} numberOfLines={1}>
              {item.name}
            </Text>
            {item.note && (
              <Text style={styles.billNote} numberOfLines={1}>
                {item.note}
              </Text>
            )}
          </View>
          <View style={styles.amountCol}>
            <Text style={styles.billAmount}>{CurrencyFormatter.format(item.amount)}</Text>
            {item.recurringRule && (
              <Text style={styles.recurringRule}>{item.recurringRule}</Text>
            )}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardBottomRow}>
          <View style={styles.dueRow}>
            <MaterialIcons
              name="event"
              size={14}
              color={daysUntilDue <= 2 ? AppColors.expense : AppColors.muted}
            />
            <Text
              style={[
                styles.dueText,
                daysUntilDue <= 2 && { color: AppColors.expense, fontWeight: '600' },
              ]}
            >
              {dueText} ({item.dueDate.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })})
            </Text>
          </View>
          <View style={styles.badgeRow}>
            <PriorityBadge priority={item.priority} />
            <View style={styles.badgeGap} />
            <BillStatusBadge status={item.status} />
          </View>
        </View>
      </PocketCard>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Bills</Text>
          <Text style={styles.headerSubtitle}>Upcoming and recurring obligations</Text>
        </View>
      </View>

      {/* Summary Banner */}
      <View style={styles.summaryContainer}>
        <PocketCard variant="dark" style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Due</Text>
          <Text style={styles.summaryAmount}>
            {CurrencyFormatter.format({ cents: totalUpcomingCents, toDouble: () => totalUpcomingCents / 100 } as any)}
          </Text>
          <Text style={styles.summarySub}>
            {sampleBills.length} registered bills
          </Text>
        </PocketCard>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {(['all', 'pending', 'paid', 'overdue'] as FilterType[]).map((tab) => {
          const isSelected = activeFilter === tab;
          const label =
            tab === 'all'
              ? 'All'
              : tab === 'pending'
              ? 'Pending'
              : tab === 'paid'
              ? 'Paid'
              : 'Overdue';

          return (
            <Pressable
              key={tab}
              accessibilityRole="button"
              accessibilityLabel={`Filter by ${label}`}
              onPress={() => setActiveFilter(tab)}
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

      {/* Bills List */}
      <FlatList
        data={filteredBills}
        keyExtractor={(item) => item.id}
        renderItem={renderBillCard}
        contentContainerStyle={[styles.listContent, { paddingBottom: 110 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="receipt-long" size={48} color={AppColors.faint} />
            <Text style={styles.emptyText}>No bills in this category</Text>
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
    paddingHorizontal: AppSpacing.xl,
    marginBottom: AppSpacing.md,
  },
  headerTitle: {
    ...AppTypography.displayLarge,
    fontSize: 28,
  },
  headerSubtitle: {
    ...AppTypography.bodyMedium,
    marginTop: 2,
  },
  summaryContainer: {
    paddingHorizontal: AppSpacing.xl,
    marginBottom: AppSpacing.md,
  },
  summaryCard: {
    padding: AppSpacing.lg,
  },
  summaryLabel: {
    ...AppTypography.bodyMedium,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  summaryAmount: {
    ...AppTypography.moneyHero,
    fontSize: 28,
    marginBottom: 4,
  },
  summarySub: {
    ...AppTypography.labelSmall,
    color: 'rgba(255, 255, 255, 0.6)',
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
  billCard: {
    marginBottom: AppSpacing.md,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  billIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: AppColors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AppSpacing.md,
  },
  billNameCol: {
    flex: 1,
    minWidth: 0,
  },
  billName: {
    ...AppTypography.bodyLarge,
    fontWeight: '600',
    color: AppColors.ink,
  },
  billNote: {
    ...AppTypography.labelMedium,
    color: AppColors.muted,
    marginTop: 2,
  },
  amountCol: {
    alignItems: 'flex-end',
    marginLeft: AppSpacing.sm,
  },
  billAmount: {
    ...AppTypography.moneyDisplay,
    fontSize: 16,
  },
  recurringRule: {
    ...AppTypography.labelSmall,
    color: AppColors.muted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: AppColors.line,
    marginVertical: AppSpacing.md,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  dueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  dueText: {
    ...AppTypography.bodyMedium,
    fontSize: 12,
    color: AppColors.muted,
    marginLeft: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeGap: {
    width: 6,
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
