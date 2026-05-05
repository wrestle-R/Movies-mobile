import AppInput from '@/components/ui/AppInput';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = {
  placeholder: string;
  onPress: () => void;
};

export default function SearchBar({ placeholder, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.disabledInputWrap} pointerEvents="none">
        <AppInput placeholder={placeholder} value="" editable={false} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  disabledInputWrap: {
    width: '100%',
  },
});
