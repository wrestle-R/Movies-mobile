import AppCard from '@/components/ui/AppCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { theme } from '@/constants/theme';
import Constants from 'expo-constants';
import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';

export default function ProfileScreen() {
  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <View style={styles.container}>
      <SectionHeader title="Profile" subtitle="App and account preferences" />
      <AppCard>
        <List.Item
          title="App Version"
          description={appVersion}
          titleStyle={styles.title}
          descriptionStyle={styles.description}
          left={(props) => <List.Icon {...props} icon="information-outline" color={theme.colors.accent} />}
        />
        <List.Item
          title="TMDB"
          description="Movie metadata provider"
          onPress={() => Linking.openURL('https://www.themoviedb.org')}
          titleStyle={styles.title}
          descriptionStyle={styles.description}
          left={(props) => <List.Icon {...props} icon="movie-open-outline" color={theme.colors.accent} />}
        />
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
  },
  title: {
    color: theme.colors.text,
    fontWeight: '700',
  },
  description: {
    color: theme.colors.textMuted,
  },
});
