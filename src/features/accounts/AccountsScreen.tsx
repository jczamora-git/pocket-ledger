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
import { sampleAccounts } from '../../data/sample';
import { AccountModel, AccountType } from '../../domain/types';
import {
  AppColors,
  AppRadius,
  AppSpacing,
  AppTypography,
} from '../../theme';

interface AccountsScreenProps {
  onBack?: () => void;
}

const getAccountIcon = (type: AccountType): keyof typeof MaterialIcons.glyphMap => {
  switch (type) {
    case 'cash':
      return 'payments';
    case 'ewallet':
      return 'phone-android';
    case 'debitCard':
      return 'credit-card';
    case 'creditCard':
      return 'credit-score';
    case 'savings':
      return 'savings';
    case 'bank':
      return 'account-balance';
    default:
      return 'account-balance-wallet';
  }
};

export const AccountsScreen: React.FC<AccountsScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();

  const totalCashCents = sampleAccounts
    .filter((a) => a.type !== 'creditCard')
    .reduce((sum, a) => sum + a.openingBalance.cents, 0);

  const creditCardAccount = sampleAccounts.find((a) => a.type === 'creditCard');

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      <ScreenHeader
        title="Accounts"
        subtitle="Cash, Banks & Liabilities"
        onBack={onBack}
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 60 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Total Available Cash Banner */}
        <PocketCard variant="dark" style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Available Cash</Text>
          <Text style={styles.totalAmount}>
            {CurrencyFormatter.format(Money.fromCentavos(totalCashCents))}
          </Text>
          <Text style={styles.totalNotice}>
            Excludes credit cards per financial accounting standard
          </Text>
        </PocketCard>

        <Text style={styles.sectionTitle}>Your Accounts</Text>

        {sampleAccounts.map((account) => {
          const isCreditCard = account.type === 'creditCard';

          return (
            <PocketCard key={account.id} style={styles.accountCard}>
              <View style={styles.cardRow}>
                <View
                  style={[
                    styles.iconCircle,
                    isCreditCard && { backgroundColor: 'rgba(255, 77, 79, 0.12)' },
                  ]}
                >
                  <MaterialIcons
                    name={getAccountIcon(account.type)}
                    size={22}
                    color={isCreditCard ? AppColors.expense : AppColors.ink}
                  />
                </View>
                <View style={styles.infoCol}>
                  <Text style={styles.accountName}>{account.name}</Text>
                  <Text style={styles.institutionName}>{account.institution}</Text>
                </View>
                <View style={styles.balanceCol}>
                  <Text style={styles.balanceLabel}>
                    {isCreditCard ? 'Outstanding' : 'Balance'}
                  </Text>
                  <Text
                    style={[
                      styles.balanceAmount,
                      isCreditCard && { color: AppColors.expense },
                    ]}
                  >
                    {CurrencyFormatter.format(account.openingBalance)}
                  </Text>
                </View>
              </View>

              {isCreditCard && account.creditLimit && (
                <View style={styles.creditCardDetail}>
                  <View style={styles.creditDetailRow}>
                    <Text style={styles.creditDetailLabel}>Credit Limit:</Text>
                    <Text style={styles.creditDetailValue}>
                      {CurrencyFormatter.format(account.creditLimit)}
                    </Text>
                  </View>
                  <View style={styles.creditDetailRow}>
                    <Text style={styles.creditDetailLabel}>Available Credit:</Text>
                    <Text style={[styles.creditDetailValue, { color: AppColors.accentDeep }]}>
                      {CurrencyFormatter.format(
                        account.creditLimit.subtract(account.openingBalance)
                      )}
                    </Text>
                  </View>
                </View>
              )}
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
  totalCard: {
    marginBottom: AppSpacing.xl,
  },
  totalLabel: {
    ...AppTypography.bodyMedium,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  totalAmount: {
    ...AppTypography.moneyHero,
    fontSize: 28,
    marginBottom: 6,
  },
  totalNotice: {
    ...AppTypography.labelSmall,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  sectionTitle: {
    ...AppTypography.titleMedium,
    marginBottom: AppSpacing.md,
  },
  accountCard: {
    marginBottom: AppSpacing.md,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AppColors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AppSpacing.md,
  },
  infoCol: {
    flex: 1,
  },
  accountName: {
    ...AppTypography.bodyLarge,
    fontWeight: '600',
    color: AppColors.ink,
  },
  institutionName: {
    ...AppTypography.bodyMedium,
    color: AppColors.muted,
    marginTop: 2,
  },
  balanceCol: {
    alignItems: 'flex-end',
  },
  balanceLabel: {
    ...AppTypography.labelSmall,
    color: AppColors.muted,
    marginBottom: 2,
  },
  balanceAmount: {
    ...AppTypography.moneyDisplay,
    fontSize: 16,
  },
  creditCardDetail: {
    marginTop: AppSpacing.md,
    paddingTop: AppSpacing.sm,
    borderTopWidth: 1,
    borderTopColor: AppColors.line,
  },
  creditDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  creditDetailLabel: {
    ...AppTypography.labelMedium,
    color: AppColors.muted,
  },
  creditDetailValue: {
    ...AppTypography.moneyDisplay,
    fontSize: 13,
  },
});
