import { useAppTheme } from '@/contexts/theme-context';
import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

export default function AppCard({ children, style, ...props }: PropsWithChildren<ViewProps>) {
  const { theme } = useAppTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.lg,
          borderColor: theme.colors.border,
          padding: theme.spacing.md,
          shadowColor: theme.colors.cardShadow,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
});
