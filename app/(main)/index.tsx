import React from 'react';
import { useRouter } from 'expo-router';
import { DashboardScreen } from '../../src/features/dashboard/DashboardScreen';

export default function IndexRoute() {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route as any);
  };

  return <DashboardScreen onNavigate={handleNavigate} />;
}
