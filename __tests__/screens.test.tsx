import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { DashboardScreen } from '../src/features/dashboard/DashboardScreen';
import { ActivityScreen } from '../src/features/transactions/ActivityScreen';
import { BudgetsScreen } from '../src/features/budgets/BudgetsScreen';
import { BillsScreen } from '../src/features/bills/BillsScreen';
import { AccountsScreen } from '../src/features/accounts/AccountsScreen';
import { DebtsScreen } from '../src/features/debts/DebtsScreen';
import { ReportsScreen } from '../src/features/reports/ReportsScreen';
import { SettingsScreen } from '../src/features/settings/SettingsScreen';

// Mock safe-area insets
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 20, bottom: 20, left: 0, right: 0 }),
}));

// Mock vector icons to avoid async font loading during tests
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    MaterialIcons: ({ name, ...props }: any) => <Text {...props}>{name}</Text>,
  };
});

describe('Screen Smoke Tests', () => {
  test('DashboardScreen renders without crashing', () => {
    let renderer: TestRenderer.ReactTestRenderer;
    act(() => {
      renderer = TestRenderer.create(<DashboardScreen />);
    });
    expect(renderer!.toJSON()).toBeTruthy();
  });

  test('ActivityScreen renders without crashing', () => {
    let renderer: TestRenderer.ReactTestRenderer;
    act(() => {
      renderer = TestRenderer.create(<ActivityScreen />);
    });
    expect(renderer!.toJSON()).toBeTruthy();
  });

  test('BudgetsScreen renders without crashing', () => {
    let renderer: TestRenderer.ReactTestRenderer;
    act(() => {
      renderer = TestRenderer.create(<BudgetsScreen />);
    });
    expect(renderer!.toJSON()).toBeTruthy();
  });

  test('BillsScreen renders without crashing', () => {
    let renderer: TestRenderer.ReactTestRenderer;
    act(() => {
      renderer = TestRenderer.create(<BillsScreen />);
    });
    expect(renderer!.toJSON()).toBeTruthy();
  });

  test('AccountsScreen renders without crashing', () => {
    let renderer: TestRenderer.ReactTestRenderer;
    act(() => {
      renderer = TestRenderer.create(<AccountsScreen />);
    });
    expect(renderer!.toJSON()).toBeTruthy();
  });

  test('DebtsScreen renders without crashing', () => {
    let renderer: TestRenderer.ReactTestRenderer;
    act(() => {
      renderer = TestRenderer.create(<DebtsScreen />);
    });
    expect(renderer!.toJSON()).toBeTruthy();
  });

  test('ReportsScreen renders without crashing', () => {
    let renderer: TestRenderer.ReactTestRenderer;
    act(() => {
      renderer = TestRenderer.create(<ReportsScreen />);
    });
    expect(renderer!.toJSON()).toBeTruthy();
  });

  test('SettingsScreen renders without crashing', () => {
    let renderer: TestRenderer.ReactTestRenderer;
    act(() => {
      renderer = TestRenderer.create(<SettingsScreen />);
    });
    expect(renderer!.toJSON()).toBeTruthy();
  });
});
