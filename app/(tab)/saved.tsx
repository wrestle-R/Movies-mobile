import MovieCard from '@/components/MovieCard';
import AppButton from '@/components/ui/AppButton';
import AppCard from '@/components/ui/AppCard';
import SectionHeader from '@/components/ui/SectionHeader';
import StateView from '@/components/ui/StateView';
import { useAppTheme } from '@/contexts/theme-context';
import { useSavedMovies } from '@/services/savedMovies';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SavedScreen() {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { movies, loading, reload, remove } = useSavedMovies();

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  if (loading) return <StateView type="loading" title="Loading saved movies" />;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bg, paddingHorizontal: theme.spacing.md, paddingTop: insets.top + 10 }]}> 
      <FlatList
        data={movies}
        keyExtractor={(item) => String(item.id)}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
        ListHeaderComponent={<SectionHeader title="Saved" subtitle="Your watchlist stored on this device" />}
        ListEmptyComponent={<StateView type="empty" title="No saved movies" message="Save a movie from Home or Search." />}
        renderItem={({ item }) => (
          <View>
            <MovieCard movie={item} onPress={() => router.push(`/movie/${item.id}`)} />
            <AppCard style={[styles.removeCard, { padding: theme.spacing.sm }]}>
              <Text style={[styles.removeText, { color: theme.colors.textMuted, marginBottom: theme.spacing.xs }]}>{item.title}</Text>
              <AppButton label="Remove" mode="secondary" onPress={() => remove(item.id)} />
            </AppCard>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: { justifyContent: 'space-between' },
  removeCard: { marginBottom: 14, width: 110 },
  removeText: { fontSize: 11 },
});
