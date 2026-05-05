import { useAppTheme } from '@/contexts/theme-context';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import AppButton from './AppButton';

type Props = {
  type: 'loading' | 'error' | 'empty';
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function StateView({ type, title, message, actionLabel, onAction }: Props) {
  const { theme } = useAppTheme();
  return (
    <View style={[styles.container, { paddingHorizontal: theme.spacing.xl, gap: theme.spacing.sm }] }>
      {type === 'loading' ? <ActivityIndicator size="large" color={theme.colors.accent} /> : null}
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      {message ? <Text style={[styles.message, { color: theme.colors.textMuted, marginBottom: theme.spacing.sm }]}>{message}</Text> : null}
      {actionLabel && onAction ? <AppButton label={actionLabel} onPress={onAction} mode="secondary" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
  },
});
