import { useAppTheme } from '@/contexts/theme-context';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  mode?: 'primary' | 'secondary';
};

export default function AppButton({ label, onPress, disabled, loading, mode = 'primary' }: Props) {
  const { theme } = useAppTheme();
  const isPrimary = mode === 'primary';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        { borderRadius: theme.radius.md, paddingHorizontal: theme.spacing.lg },
        isPrimary ? { backgroundColor: theme.colors.accent } : styles.secondary,
        !isPrimary ? { borderColor: theme.colors.border, backgroundColor: theme.colors.surfaceAlt } : null,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#121212' : theme.colors.text} />
      ) : (
        <Text style={[styles.label, { color: isPrimary ? '#121212' : theme.colors.text }]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
});
