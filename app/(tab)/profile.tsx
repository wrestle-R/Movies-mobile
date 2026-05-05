import AppCard from '@/components/ui/AppCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { useAppTheme } from '@/contexts/theme-context';
import Constants from 'expo-constants';
import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { List, Switch } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { theme, toggleTheme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bg, paddingHorizontal: theme.spacing.md, paddingTop: insets.top + 10 }]}> 
      <SectionHeader title="Profile" subtitle="App and account preferences" />
      <AppCard>
        <List.Item
          title="App Version"
          description={appVersion}
          titleStyle={[styles.title, { color: theme.colors.text }]}
          descriptionStyle={[styles.description, { color: theme.colors.textMuted }]}
          left={(props) => <List.Icon {...props} icon="information-outline" color={theme.colors.accent} />}
        />
        <List.Item
          title="Dark Mode"
          description={theme.dark ? 'Enabled' : 'Disabled'}
          titleStyle={[styles.title, { color: theme.colors.text }]}
          descriptionStyle={[styles.description, { color: theme.colors.textMuted }]}
          left={(props) => <List.Icon {...props} icon="theme-light-dark" color={theme.colors.accent} />}
          right={() => <Switch value={theme.dark} onValueChange={toggleTheme} color={theme.colors.accent} />}
        />
        <List.Item
          title="TMDB"
          description="Movie metadata provider"
          onPress={() => Linking.openURL('https://www.themoviedb.org')}
          titleStyle={[styles.title, { color: theme.colors.text }]}
          descriptionStyle={[styles.description, { color: theme.colors.textMuted }]}
          left={(props) => <List.Icon {...props} icon="movie-open-outline" color={theme.colors.accent} />}
        />
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontWeight: '700' },
  description: {},
});
