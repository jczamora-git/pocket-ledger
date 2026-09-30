import { Money } from '../../domain/money';
import {
  AccountModel,
  BillModel,
  BudgetModel,
  CategoryModel,
  DebtModel,
  TransactionModel,
} from '../../domain/types';

const now = new Date();
const daysAgo = (days: number): Date => new Date(now.getTime() - days * 86400000);
const daysFromNow = (days: number): Date => new Date(now.getTime() + days * 86400000);

export const sampleCategories: CategoryModel[] = [
  // Income
  {
    id: 'cat-salary',
    name: 'Salary',
    kind: 'income',
    iconName: 'work-outline',
  },
  {
    id: 'cat-allowance',
    name: 'Allowance',
    kind: 'income',
    iconName: 'card-giftcard',
  },
  {
    id: 'cat-freelance',
    name: 'Freelance',
    kind: 'income',
    iconName: 'create',
  },
  {
    id: 'cat-business',
    name: 'Business',
    kind: 'income',
    iconName: 'storefront',
  },
  // Expense
  {
    id: 'cat-food',
    name: 'Food',
    kind: 'expense',
    iconName: 'restaurant',
  },
  {
    id: 'cat-groceries',
    name: 'Groceries',
    kind: 'expense',
    iconName: 'shopping-cart',
  },
  {
    id: 'cat-utilities',
    name: 'Utilities',
    kind: 'expense',
    iconName: 'bolt',
  },
  {
    id: 'cat-rent',
    name: 'Rent',
    kind: 'expense',
    iconName: 'home',
  },
  {
    id: 'cat-transport',
    name: 'Transport',
    kind: 'expense',
    iconName: 'directions-car',
  },
  {
    id: 'cat-subscriptions',
    name: 'Subscriptions',
    kind: 'expense',
    iconName: 'subscriptions',
  },
  {
    id: 'cat-shopping',
    name: 'Shopping',
    kind: 'expense',
    iconName: 'shopping-bag',
  },
  {
    id: 'cat-healthcare',
    name: 'Healthcare',
    kind: 'expense',
    iconName: 'favorite-border',
  },
  {
    id: 'cat-entertainment',
    name: 'Entertainment',
    kind: 'expense',
    iconName: 'sports-esports',
  },
];

export const sampleAccounts: AccountModel[] = [
  {
    id: 'acc-wallet',
    name: 'Wallet Cash',
    type: 'cash',
    institution: 'Cash',
    openingBalance: Money.fromPesos(1200),
  },
  {
    id: 'acc-gcash',
    name: 'GCash',
    type: 'ewallet',
    institution: 'GCash',
    openingBalance: Money.fromPesos(500),
  },
  {
    id: 'acc-maya',
    name: 'Maya',
    type: 'ewallet',
    institution: 'Maya',
    openingBalance: Money.fromPesos(300),
  },
  {
    id: 'acc-bpi',
    name: 'BPI Debit',
    type: 'debitCard',
    institution: 'Bank of the Philippine Islands',
    openingBalance: Money.fromPesos(8200),
  },
  {
    id: 'acc-ub',
    name: 'UnionBank Savings',
    type: 'savings',
    institution: 'UnionBank',
    openingBalance: Money.fromPesos(18000),
  },
  {
    id: 'acc-bdo',
    name: 'BDO Credit Card',
    type: 'creditCard',
    institution: 'Banco de Oro',
    openingBalance: Money.zero,
    creditLimit: Money.fromPesos(30000),
  },
];

export const sampleTransactions: TransactionModel[] = [
  {
    id: 'tx-1',
    accountId: 'acc-bpi',
    categoryId: 'cat-salary',
    type: 'income',
    amount: Money.fromPesos(30000),
    date: daysAgo(1),
    merchant: 'Acme Corp',
    note: 'July salary',
  },
  {
    id: 'tx-2',
    accountId: 'acc-bpi',
    categoryId: 'cat-food',
    type: 'expense',
    amount: Money.fromCentavos(28500), // ₱285.00
    date: now,
    merchant: 'Jollibee',
    note: 'Dinner',
  },
  {
    id: 'tx-3',
    accountId: 'acc-bpi',
    categoryId: 'cat-groceries',
    type: 'expense',
    amount: Money.fromCentavos(62000), // ₱620.00
    date: daysAgo(1),
    merchant: 'SM Supermarket',
  },
  {
    id: 'tx-4',
    accountId: 'acc-bpi',
    categoryId: 'cat-subscriptions',
    type: 'expense',
    amount: Money.fromCentavos(44900), // ₱449.00
    date: daysAgo(2),
    merchant: 'Netflix',
  },
  {
    id: 'tx-5',
    accountId: 'acc-bpi',
    categoryId: 'cat-transport',
    type: 'expense',
    amount: Money.fromCentavos(14500), // ₱145.00
    date: daysAgo(3),
    merchant: 'GrabCar',
  },
  {
    id: 'tx-6',
    accountId: 'acc-bpi',
    categoryId: 'cat-utilities',
    type: 'expense',
    amount: Money.fromPesos(850),
    date: daysAgo(4),
    merchant: 'Manila Water',
  },
  {
    id: 'tx-7',
    accountId: 'acc-bpi',
    transferAccountId: 'acc-gcash',
    type: 'transfer',
    amount: Money.fromPesos(2000),
    date: daysAgo(5),
    merchant: 'Transfer to GCash',
  },
];

export const sampleBills: BillModel[] = [
  {
    id: 'bill-water',
    name: 'Water Bill',
    amount: Money.fromPesos(850),
    dueDate: daysFromNow(1),
    priority: 'high',
    status: 'pending',
    recurringRule: 'Monthly',
    note: 'Manila Water',
  },
  {
    id: 'bill-meralco',
    name: 'Electricity',
    amount: Money.fromPesos(2850),
    dueDate: daysFromNow(2),
    priority: 'urgent',
    status: 'pending',
    recurringRule: 'Monthly',
    note: 'Meralco',
  },
  {
    id: 'bill-pldt',
    name: 'Internet',
    amount: Money.fromPesos(1699),
    dueDate: daysFromNow(6),
    priority: 'normal',
    status: 'pending',
    recurringRule: 'Monthly',
    note: 'PLDT Home Fiber',
  },
  {
    id: 'bill-bdo',
    name: 'BDO Credit Card',
    amount: Money.fromPesos(3200),
    dueDate: daysFromNow(3),
    priority: 'urgent',
    status: 'pending',
    recurringRule: 'Monthly',
    note: 'Min. amount due',
  },
  {
    id: 'bill-rent',
    name: 'Rent',
    amount: Money.fromPesos(7000),
    dueDate: daysFromNow(12),
    priority: 'high',
    status: 'pending',
    recurringRule: 'Monthly',
  },
];

export const sampleDebts: DebtModel[] = [
  {
    id: 'debt-kuya',
    personOrCompany: 'Kuya',
    direction: 'iOwe',
    originalAmount: Money.fromPesos(5000),
    remainingAmount: Money.fromPesos(3000),
    dueDate: daysFromNow(5),
    priority: 'high',
    note: 'Borrowed for rent',
  },
  {
    id: 'debt-marco',
    personOrCompany: 'Marco',
    direction: 'owedToMe',
    originalAmount: Money.fromPesos(2500),
    remainingAmount: Money.fromPesos(1000),
    dueDate: daysFromNow(20),
    priority: 'normal',
    note: 'Split for the trip',
  },
  {
    id: 'debt-momo',
    personOrCompany: 'Momo Lending',
    direction: 'iOwe',
    originalAmount: Money.fromPesos(10000),
    remainingAmount: Money.fromPesos(4000),
    interestRate: 0.03,
    dueDate: daysFromNow(9),
    priority: 'urgent',
    note: 'Installment loan',
  },
];

export const sampleBudgets: BudgetModel[] = [
  {
    id: 'bud-food',
    categoryId: 'cat-food',
    month: '2026-10',
    limitAmount: Money.fromPesos(6000),
    alertPercentage: 80,
  },
  {
    id: 'bud-groceries',
    categoryId: 'cat-groceries',
    month: '2026-10',
    limitAmount: Money.fromPesos(5000),
    alertPercentage: 80,
  },
  {
    id: 'bud-transport',
    categoryId: 'cat-transport',
    month: '2026-10',
    limitAmount: Money.fromPesos(2500),
    alertPercentage: 75,
  },
  {
    id: 'bud-shopping',
    categoryId: 'cat-shopping',
    month: '2026-10',
    limitAmount: Money.fromPesos(3000),
    alertPercentage: 75,
  },
  {
    id: 'bud-utilities',
    categoryId: 'cat-utilities',
    month: '2026-10',
    limitAmount: Money.fromPesos(4500),
    alertPercentage: 85,
  },
];
