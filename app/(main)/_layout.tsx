import React from 'react';
import { Tabs, usePathname, useRouter } from 'expo-router';
import { NavShell } from '../../src/components/navigation';

export default function MainTabsLayout() {
  const pathname = usePathname();
  const router = useRouter();

  let currentIndex = 0;
  if (pathname.includes('/activity')) {
    currentIndex = 1;
  } else if (pathname.includes('/budgets')) {
    currentIndex = 2;
  } else if (pathname.includes('/bills')) {
    currentIndex = 3;
  }

  const handleSelectTab = (index: number) => {
    switch (index) {
      case 0:
        router.navigate('/');
        break;
      case 1:
        router.navigate('/activity');
        break;
      case 2:
        router.navigate('/budgets');
        break;
      case 3:
        router.navigate('/bills');
        break;
    }
  };

  const handleSelectRoute = (route: string) => {
    router.push(route as any);
  };

  return (
    <NavShell
      currentIndex={currentIndex}
      activeRoute={pathname}
      onSelectTab={handleSelectTab}
      onSelectRoute={handleSelectRoute}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="activity" options={{ title: 'Activity' }} />
        <Tabs.Screen name="budgets" options={{ title: 'Budgets' }} />
        <Tabs.Screen name="bills" options={{ title: 'Bills' }} />
      </Tabs>
    </NavShell>
  );
}
