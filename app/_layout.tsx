import { ThemeProvider, useAppTheme } from '@/contexts/theme-context';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';

function RootNavigator() {
  const { theme } = useAppTheme();
  const paperBase = theme.dark ? MD3DarkTheme : MD3LightTheme;

  const paperTheme = {
    ...paperBase,
    colors: {
      ...paperBase.colors,
      primary: theme.colors.accent,
      background: theme.colors.bg,
      surface: theme.colors.surface,
      onSurface: theme.colors.text,
      outline: theme.colors.border,
    },
  };

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.bg } }}>
        <Stack.Screen name="(tab)" />
        <Stack.Screen name="movie/[id]" />
      </Stack>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
