import React from 'react';
import { useRouter } from 'expo-router';
import { AccountsScreen } from '../src/features/accounts/AccountsScreen';

export default function AccountsRoute() {
  const router = useRouter();

  return <AccountsScreen onBack={() => router.back()} />;
}
