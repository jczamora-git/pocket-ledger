import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { PrimaryDock } from './PrimaryDock';
import { MoreActionNode } from './MoreActionNode';
import { MoreToolsMenu } from './MoreToolsMenu';
import { AppColors } from '../../theme';

interface NavShellProps {
  currentIndex: number;
  activeRoute: string;
  onSelectTab: (index: number) => void;
  onSelectRoute: (route: string) => void;
  children: React.ReactNode;
}

export const NavShell: React.FC<NavShellProps> = ({
  currentIndex,
  activeRoute,
  onSelectTab,
  onSelectRoute,
  children,
}) => {
  const insets = useSafeAreaInsets();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const isSecondaryActive =
    activeRoute.startsWith('/accounts') ||
    activeRoute.startsWith('/debts') ||
    activeRoute.startsWith('/reports') ||
    activeRoute.startsWith('/settings');

  const handleCloseMore = () => {
    setIsMoreOpen(false);
  };

  const handleToggleMore = () => {
    setIsMoreOpen((prev) => !prev);
  };

  const handleSelectTab = (index: number) => {
    handleCloseMore();
    onSelectTab(index);
  };

  const handleSelectRoute = (route: string) => {
    handleCloseMore();
    onSelectRoute(route);
  };

  const bottomPadding = Math.max(insets.bottom, 12);

  return (
    <View style={styles.root}>
      {/* LAYER 1: Screen content */}
      <View style={styles.content}>{children}</View>

      {/* LAYER 2: Primary floating dock (below blur layer) */}
      <View
        pointerEvents={isMoreOpen ? 'none' : 'box-none'}
        style={[styles.floatingDockRow, { bottom: bottomPadding }]}
      >
        <View style={styles.dockWidthContainer}>
          <PrimaryDock
            currentIndex={currentIndex}
            onSelectTab={handleSelectTab}
          />
          {/* Spacer matching MoreActionNode (54x54) so alignment matches LAYER 4 exactly */}
          <View style={styles.nodeSpacer} />
        </View>
      </View>

      {/* LAYER 3: Full-screen More backdrop blur + dim overlay */}
      {isMoreOpen && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close tools menu backdrop"
          testID="more_backdrop"
          onPress={handleCloseMore}
          style={StyleSheet.absoluteFill}
        >
          <BlurView
            intensity={30}
            tint="dark"
            style={StyleSheet.absoluteFill}
          >
            <View style={styles.backdropDim} />
          </BlurView>
        </Pressable>
      )}

      {/* LAYER 4: More Action Node & Tools Menu (above blur layer) */}
      <View
        pointerEvents="box-none"
        style={[styles.floatingDockRow, { bottom: bottomPadding }]}
      >
        <View style={styles.dockWidthContainerRight}>
          <View style={styles.moreColumn}>
            <MoreToolsMenu
              isOpen={isMoreOpen}
              activeRoute={activeRoute}
              onSelectRoute={handleSelectRoute}
            />
            <View style={styles.menuNodeGap} />
            <MoreActionNode
              isOpen={isMoreOpen}
              isSecondaryActive={isSecondaryActive}
              onTap={handleToggleMore}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppColors.bg,
  },
  content: {
    flex: 1,
  },
  floatingDockRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dockWidthContainer: {
    width: 280,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  dockWidthContainerRight: {
    width: 280,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  nodeSpacer: {
    width: 54,
    height: 54,
  },
  moreColumn: {
    alignItems: 'flex-end',
  },
  menuNodeGap: {
    height: 10,
  },
  backdropDim: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
});
