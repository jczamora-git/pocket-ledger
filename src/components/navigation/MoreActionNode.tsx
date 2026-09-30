import React, { useEffect, useRef } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AppColors, AppShadows } from '../../theme';

interface MoreActionNodeProps {
  isOpen: boolean;
  isSecondaryActive?: boolean;
  onTap: () => void;
}

export const MoreActionNode: React.FC<MoreActionNodeProps> = ({
  isOpen,
  isSecondaryActive = false,
  onTap,
}) => {
  const rotateAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const isActive = isOpen || isSecondaryActive;

  return (
    <Pressable
      testID="more_action_node"
      accessibilityRole="button"
      accessibilityLabel={isOpen ? 'Close tools menu' : 'More tools'}
      onPress={onTap}
      style={({ pressed }) => [
        styles.node,
        isActive ? styles.nodeActive : styles.nodeInactive,
        pressed && styles.nodePressed,
      ]}
    >
      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        <MaterialIcons
          name={isOpen ? 'close' : 'apps'}
          size={22}
          color={isActive ? AppColors.accent : 'rgba(255, 255, 255, 0.75)'}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  node: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.surfaceDark,
  },
  nodeInactive: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.10)',
    ...AppShadows.pop,
  },
  nodeActive: {
    borderWidth: 1.5,
    borderColor: AppColors.accent,
    backgroundColor: AppColors.surfaceDark2,
    ...AppShadows.glow,
  },
  nodePressed: {
    opacity: 0.85,
  },
});
