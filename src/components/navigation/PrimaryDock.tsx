import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AppColors, AppShadows } from '../../theme';

interface PrimaryDockProps {
  currentIndex: number;
  onSelectTab: (index: number) => void;
}

interface TabItemConfig {
  key: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  activeIcon: keyof typeof MaterialIcons.glyphMap;
  label: string;
}

const TABS: TabItemConfig[] = [
  { key: 'home', icon: 'home', activeIcon: 'home', label: 'Home' },
  { key: 'activity', icon: 'receipt-long', activeIcon: 'receipt-long', label: 'Activity' },
  { key: 'budgets', icon: 'pie-chart', activeIcon: 'pie-chart', label: 'Budgets' },
  { key: 'bills', icon: 'description', activeIcon: 'description', label: 'Bills' },
];

export const PrimaryDock: React.FC<PrimaryDockProps> = ({
  currentIndex,
  onSelectTab,
}) => {
  return (
    <View style={styles.dock}>
      {TABS.map((tab, idx) => {
        const isSelected = currentIndex === idx;
        return (
          <Pressable
            key={tab.key}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isSelected }}
            testID={`dock_tab_${tab.key}`}
            onPress={() => onSelectTab(idx)}
            style={({ pressed }) => [
              styles.item,
              isSelected && styles.itemSelected,
              pressed && styles.itemPressed,
            ]}
          >
            <MaterialIcons
              name={isSelected ? tab.activeIcon : tab.icon}
              size={22}
              color={isSelected ? AppColors.accent : 'rgba(255, 255, 255, 0.55)'}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dock: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: AppColors.surfaceDark,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    ...AppShadows.pop,
  },
  item: {
    width: 48,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  itemSelected: {
    backgroundColor: 'rgba(16, 185, 129, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.35)',
  },
  itemPressed: {
    opacity: 0.8,
  },
});
