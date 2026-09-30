import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Priority, BillStatus } from '../../domain/types';
import { AppColors, AppRadius, AppSpacing, AppTypography } from '../../theme';

interface PriorityBadgeProps {
  priority: Priority;
}

const priorityConfig: Record<Priority, { label: string; color: string; bg: string }> = {
  urgent: { label: 'Urgent', color: AppColors.expense, bg: 'rgba(255, 77, 79, 0.12)' },
  high: { label: 'High', color: AppColors.amber, bg: 'rgba(245, 158, 11, 0.12)' },
  normal: { label: 'Normal', color: AppColors.blue, bg: 'rgba(59, 130, 246, 0.12)' },
  low: { label: 'Low', color: AppColors.muted, bg: 'rgba(142, 142, 147, 0.12)' },
};

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const config = priorityConfig[priority] || priorityConfig.normal;
  return (
    <View style={[styles.badge, { backgroundColor: config.bg, borderColor: `${config.color}30` }]}>
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
    </View>
  );
};

interface BillStatusBadgeProps {
  status: BillStatus;
}

const statusConfig: Record<BillStatus, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: AppColors.amber, bg: 'rgba(245, 158, 11, 0.12)' },
  partiallyPaid: { label: 'Partial', color: AppColors.blue, bg: 'rgba(59, 130, 246, 0.12)' },
  paid: { label: 'Paid', color: AppColors.income, bg: 'rgba(22, 199, 132, 0.12)' },
  overdue: { label: 'Overdue', color: AppColors.expense, bg: 'rgba(255, 77, 79, 0.12)' },
};

export const BillStatusBadge: React.FC<BillStatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <View style={[styles.badge, { backgroundColor: config.bg, borderColor: `${config.color}30` }]}>
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: AppSpacing.sm,
    paddingVertical: 3,
    borderRadius: AppRadius.sm,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  label: {
    ...AppTypography.labelSmall,
    textTransform: 'uppercase',
  },
});
