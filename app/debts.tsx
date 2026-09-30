import React from 'react';
import { useRouter } from 'expo-router';
import { DebtsScreen } from '../src/features/debts/DebtsScreen';

export default function DebtsRoute() {
  const router = useRouter();

  return <DebtsScreen onBack={() => router.back()} />;
}
