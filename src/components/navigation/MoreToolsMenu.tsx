import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AppColors, AppRadius, AppShadows, AppSpacing, AppTypography } from '../../theme';

interface MoreToolsMenuProps {
  isOpen: boolean;
  activeRoute: string;
  onSelectRoute: (route: string) => void;
}

interface MenuItemConfig {
  key: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  route: string;
}

const MENU_ITEMS: MenuItemConfig[] = [
  { key: 'accounts', icon: 'account-balance-wallet', label: 'Accounts', route: '/accounts' },
  { key: 'debts', icon: 'people-outline', label: 'Debts', route: '/debts' },
  { key: 'reports', icon: 'insert-chart-outlined', label: 'Reports', route: '/reports' },
  { key: 'settings', icon: 'settings', label: 'Settings', route: '/settings' },
];

export const MoreToolsMenu: React.FC<MoreToolsMenuProps> = ({
  isOpen,
  activeRoute,
  onSelectRoute,
}) => {
  const anim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen, anim]);

  if (!isOpen) {
    return null;
  }

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 0],
  });

  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1],
  });

  return (
    <Animated.View
      style={[
        styles.menuContainer,
        {
          opacity: anim,
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      {MENU_ITEMS.map((item) => {
        const isActive = activeRoute.startsWith(item.route);
        return (
          <Pressable
            key={item.key}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            testID={`more_tool_${item.key}`}
            onPress={() => onSelectRoute(item.route)}
            style={({ pressed }) => [
              styles.menuItem,
              isActive && styles.menuItemActive,
              pressed && styles.menuItemPressed,
            ]}
          >
            <View
              style={[
                styles.iconCircle,
                isActive ? styles.iconCircleActive : styles.iconCircleInactive,
              ]}
            >
              <MaterialIcons
                name={item.icon}
                size={16}
                color={isActive ? AppColors.accent : 'rgba(255, 255, 255, 0.85)'}
              />
            </View>
            <Text
              style={[
                styles.itemLabel,
                isActive && styles.itemLabelActive,
              ]}
            >
              {item.label}
            </Text>
            {isActive && <View style={styles.activeDot} />}
          </Pressable>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    width: 190,
    paddingVertical: AppSpacing.sm,
    paddingHorizontal: 6,
    backgroundColor: AppColors.surfaceDark,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    ...AppShadows.menu,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: AppRadius.md,
    marginVertical: 1,
  },
  menuItemActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.14)',
  },
  menuItemPressed: {
    opacity: 0.8,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconCircleInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  iconCircleActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.20)',
  },
  itemLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.90)',
  },
  itemLabelActive: {
    color: AppColors.accent,
    fontWeight: '600',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: AppColors.accent,
    marginLeft: 4,
  },
});
