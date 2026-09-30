import { Money } from './money';

export type AccountType =
  | 'cash'
  | 'ewallet'
  | 'bank'
  | 'savings'
  | 'debitCard'
  | 'creditCard';

export type TransactionType = 'income' | 'expense' | 'transfer';

export type Priority = 'urgent' | 'high' | 'normal' | 'low';

export type BillStatus = 'pending' | 'partiallyPaid' | 'paid' | 'overdue';

export type DebtDirection = 'iOwe' | 'owedToMe';

export interface CategoryModel {
  id: string;
  name: string;
  kind: TransactionType;
  iconName: string;
}

export interface AccountModel {
  id: string;
  name: string;
  type: AccountType;
  institution: string;
  openingBalance: Money;
  creditLimit?: Money;
  isArchived?: boolean;
}

export interface TransactionModel {
  id: string;
  accountId: string;
  categoryId?: string;
  transferAccountId?: string;
  type: TransactionType;
  amount: Money;
  date: Date;
  merchant?: string;
  note?: string;
  isUntracked?: boolean;
}

export interface BillModel {
  id: string;
  name: string;
  amount: Money;
  dueDate: Date;
  priority: Priority;
  status: BillStatus;
  recurringRule?: string;
  note?: string;
  paidAmount?: Money;
}

export interface DebtModel {
  id: string;
  personOrCompany: string;
  direction: DebtDirection;
  originalAmount: Money;
  remainingAmount: Money;
  dueDate: Date;
  priority: Priority;
  interestRate?: number;
  note?: string;
}

export interface BudgetModel {
  id: string;
  categoryId: string;
  month: string; // YYYY-MM
  limitAmount: Money;
  alertPercentage: number;
}
