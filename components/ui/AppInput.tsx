import { useAppTheme } from '@/contexts/theme-context';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { IconButton } from 'react-native-paper';

type Props = TextInputProps & {
  icon?: string;
};

export default function AppInput({ icon = 'magnify', style, ...props }: Props) {
  const { theme } = useAppTheme();
  return (
    <View
      style={[
        styles.wrapper,
        {
          borderRadius: theme.radius.md,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
        },
      ]}
    >
      <IconButton icon={icon} size={18} iconColor={theme.colors.textMuted} style={styles.icon} />
      <TextInput
        {...props}
        placeholderTextColor={theme.colors.textMuted}
        style={[styles.input, { color: theme.colors.text }, style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    minHeight: 48,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  icon: {
    margin: 0,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingRight: 10,
  },
});
