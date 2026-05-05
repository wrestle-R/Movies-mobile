import MovieCard from '@/components/MovieCard';
import AppButton from '@/components/ui/AppButton';
import AppCard from '@/components/ui/AppCard';
import SectionHeader from '@/components/ui/SectionHeader';
import StateView from '@/components/ui/StateView';
import { theme } from '@/constants/theme';
import { useSavedMovies } from '@/services/savedMovies';
import { router } from 'expo-router';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function SavedScreen() {
  const { movies, loading, reload, remove } = useSavedMovies();

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  if (loading) {
    return <StateView type="loading" title="Loading saved movies" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => String(item.id)}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<SectionHeader title="Saved" subtitle="Your watchlist stored on this device" />}
        ListEmptyComponent={<StateView type="empty" title="No saved movies" message="Save a movie from Home or Search." />}
        renderItem={({ item }) => (
          <View>
            <MovieCard movie={item} onPress={() => router.push(`/movie/${item.id}`)} />
            <AppCard style={styles.removeCard}>
              <Text style={styles.removeText}>{item.title}</Text>
              <AppButton label="Remove" mode="secondary" onPress={() => remove(item.id)} />
            </AppCard>
          </View>
        )}
      />
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
  listContent: {
    paddingBottom: 120,
  },
  row: {
    justifyContent: 'space-between',
  },
  removeCard: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.sm,
    width: 110,
  },
  removeText: {
    color: theme.colors.textMuted,
    fontSize: 11,
    marginBottom: theme.spacing.xs,
  },
});
