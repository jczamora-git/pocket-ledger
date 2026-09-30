import React from 'react';
import { useRouter } from 'expo-router';
import { ReportsScreen } from '../src/features/reports/ReportsScreen';

export default function ReportsRoute() {
  const router = useRouter();

  return <ReportsScreen onBack={() => router.back()} />;
}
