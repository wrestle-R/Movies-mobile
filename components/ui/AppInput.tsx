import { theme } from '@/constants/theme';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { IconButton } from 'react-native-paper';

type Props = TextInputProps & {
  icon?: string;
};

export default function AppInput({ icon = 'magnify', style, ...props }: Props) {
  return (
    <View style={styles.wrapper}>
      <IconButton icon={icon} size={18} iconColor={theme.colors.textMuted} style={styles.icon} />
      <TextInput
        {...props}
        placeholderTextColor={theme.colors.textMuted}
        style={[styles.input, style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    minHeight: 48,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: theme.spacing.sm,
  },
  icon: {
    margin: 0,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 15,
    paddingRight: theme.spacing.sm,
  },
});
