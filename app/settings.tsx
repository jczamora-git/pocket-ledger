import React from 'react';
import { useRouter } from 'expo-router';
import { SettingsScreen } from '../src/features/settings/SettingsScreen';

export default function SettingsRoute() {
  const router = useRouter();

  return <SettingsScreen onBack={() => router.back()} />;
}
