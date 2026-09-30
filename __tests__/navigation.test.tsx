import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { Text } from 'react-native';
import { PrimaryDock } from '../src/components/navigation/PrimaryDock';
import { MoreActionNode } from '../src/components/navigation/MoreActionNode';
import { MoreToolsMenu } from '../src/components/navigation/MoreToolsMenu';
import { NavShell } from '../src/components/navigation/NavShell';

// Mock safe-area insets
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 20, bottom: 20, left: 0, right: 0 }),
}));

// Mock expo-blur
jest.mock('expo-blur', () => ({
  BlurView: ({ children, style }: any) => {
    const { View } = require('react-native');
    return <View style={style}>{children}</View>;
  },
}));

// Mock vector icons to avoid async font loading during tests
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    MaterialIcons: ({ name, ...props }: any) => <Text {...props}>{name}</Text>,
  };
});

describe('PrimaryDock Navigation', () => {
  test('renders exactly four icon-only tabs with accessibility attributes', () => {
    const onSelectTab = jest.fn();
    let renderer: TestRenderer.ReactTestRenderer;

    act(() => {
      renderer = TestRenderer.create(
        <PrimaryDock currentIndex={0} onSelectTab={onSelectTab} />
      );
    });

    const root = renderer!.root;

    // Verify 4 tabs exist by testID
    const homeTab = root.findByProps({ testID: 'dock_tab_home' });
    const activityTab = root.findByProps({ testID: 'dock_tab_activity' });
    const budgetsTab = root.findByProps({ testID: 'dock_tab_budgets' });
    const billsTab = root.findByProps({ testID: 'dock_tab_bills' });

    expect(homeTab).toBeTruthy();
    expect(activityTab).toBeTruthy();
    expect(budgetsTab).toBeTruthy();
    expect(billsTab).toBeTruthy();

    // Verify accessibility attributes
    expect(homeTab.props.accessibilityRole).toBe('button');
    expect(homeTab.props.accessibilityLabel).toBe('Home');
    expect(activityTab.props.accessibilityRole).toBe('button');
    expect(activityTab.props.accessibilityLabel).toBe('Activity');

    // Verify clicking a tab calls onSelectTab
    act(() => {
      activityTab.props.onPress();
    });
    expect(onSelectTab).toHaveBeenCalledWith(1);

    act(() => {
      budgetsTab.props.onPress();
    });
    expect(onSelectTab).toHaveBeenCalledWith(2);

    act(() => {
      billsTab.props.onPress();
    });
    expect(onSelectTab).toHaveBeenCalledWith(3);
  });
});

describe('More Action Node & Tools Menu', () => {
  test('MoreActionNode is accessible and triggers onTap', () => {
    const onTap = jest.fn();
    let renderer: TestRenderer.ReactTestRenderer;

    act(() => {
      renderer = TestRenderer.create(
        <MoreActionNode isOpen={false} onTap={onTap} />
      );
    });

    const node = renderer!.root.findByProps({ testID: 'more_action_node' });
    expect(node.props.accessibilityRole).toBe('button');
    expect(node.props.accessibilityLabel).toBe('More tools');

    act(() => {
      node.props.onPress();
    });
    expect(onTap).toHaveBeenCalledTimes(1);
  });

  test('MoreToolsMenu renders all four secondary tools with visible labels', () => {
    const onSelectRoute = jest.fn();
    let renderer: TestRenderer.ReactTestRenderer;

    act(() => {
      renderer = TestRenderer.create(
        <MoreToolsMenu
          isOpen={true}
          activeRoute="/accounts"
          onSelectRoute={onSelectRoute}
        />
      );
    });

    const root = renderer!.root;

    // Check all four tools exist
    const accountsItem = root.findByProps({ testID: 'more_tool_accounts' });
    const debtsItem = root.findByProps({ testID: 'more_tool_debts' });
    const reportsItem = root.findByProps({ testID: 'more_tool_reports' });
    const settingsItem = root.findByProps({ testID: 'more_tool_settings' });

    expect(accountsItem).toBeTruthy();
    expect(debtsItem).toBeTruthy();
    expect(reportsItem).toBeTruthy();
    expect(settingsItem).toBeTruthy();

    expect(accountsItem.props.accessibilityRole).toBe('button');

    act(() => {
      debtsItem.props.onPress();
    });
    expect(onSelectRoute).toHaveBeenCalledWith('/debts');
  });

  test('MoreToolsMenu returns null when closed', () => {
    let renderer: TestRenderer.ReactTestRenderer;

    act(() => {
      renderer = TestRenderer.create(
        <MoreToolsMenu
          isOpen={false}
          activeRoute="/"
          onSelectRoute={jest.fn()}
        />
      );
    });

    expect(renderer!.toJSON()).toBeNull();
  });
});

describe('NavShell Full Integration', () => {
  test('renders children, primary dock, More button, and NO quick-action FAB', () => {
    let renderer: TestRenderer.ReactTestRenderer;

    act(() => {
      renderer = TestRenderer.create(
        <NavShell
          currentIndex={0}
          activeRoute="/"
          onSelectTab={jest.fn()}
          onSelectRoute={jest.fn()}
        >
          <Text>Test Screen Content</Text>
        </NavShell>
      );
    });

    const root = renderer!.root;

    // Primary dock rendered
    expect(root.findByProps({ testID: 'dock_tab_home' })).toBeTruthy();

    // More action node rendered
    expect(root.findByProps({ testID: 'more_action_node' })).toBeTruthy();

    // No quick-action FAB exists
    expect(root.findAllByProps({ testID: 'quick_action_fab' })).toHaveLength(0);
    expect(root.findAllByProps({ testID: 'fab' })).toHaveLength(0);
  });

  test('tapping More opens tools menu, backdrop appears, tapping backdrop closes menu', () => {
    let renderer: TestRenderer.ReactTestRenderer;

    act(() => {
      renderer = TestRenderer.create(
        <NavShell
          currentIndex={0}
          activeRoute="/"
          onSelectTab={jest.fn()}
          onSelectRoute={jest.fn()}
        >
          <Text>Screen Body</Text>
        </NavShell>
      );
    });

    const root = renderer!.root;

    // Initially closed: backdrop not present
    expect(root.findAllByProps({ testID: 'more_backdrop' })).toHaveLength(0);

    // Press More button to open
    const moreBtn = root.findByProps({ testID: 'more_action_node' });
    act(() => {
      moreBtn.props.onPress();
    });

    // Backdrop now exists
    const backdrop = root.findByProps({ testID: 'more_backdrop' });
    expect(backdrop).toBeTruthy();

    // Tools menu options exist
    expect(root.findByProps({ testID: 'more_tool_accounts' })).toBeTruthy();
    expect(root.findByProps({ testID: 'more_tool_debts' })).toBeTruthy();
    expect(root.findByProps({ testID: 'more_tool_reports' })).toBeTruthy();
    expect(root.findByProps({ testID: 'more_tool_settings' })).toBeTruthy();

    // Tapping backdrop closes More menu
    act(() => {
      backdrop.props.onPress();
    });
    expect(root.findAllByProps({ testID: 'more_backdrop' })).toHaveLength(0);
  });
});
