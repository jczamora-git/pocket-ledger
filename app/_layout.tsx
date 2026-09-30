import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppColors } from '../src/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: AppColors.bg },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen
          name="accounts"
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="debts"
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="reports"
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
