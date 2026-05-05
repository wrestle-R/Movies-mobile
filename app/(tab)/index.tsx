import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import SectionHeader from '@/components/ui/SectionHeader';
import StateView from '@/components/ui/StateView';
import { theme } from '@/constants/theme';
import { usePopularMovies } from '@/services/useFetch';
import brandIcon from '@/assets/branding/icon.png';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { data, loading, error, refetch } = usePopularMovies(1);

  if (loading) {
    return <StateView type="loading" title="Loading movies" message="Fetching today’s popular titles." />;
  }

  if (error) {
    return <StateView type="error" title="Could not load movies" message={error} actionLabel="Try again" onAction={refetch} />;
  }

  const movies = data?.results ?? [];

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MovieCard movie={item} onPress={() => router.push(`/movie/${item.id}`)} />}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={loading}
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            <View style={styles.brandRow}>
              <Image source={brandIcon} style={styles.brandIcon} />
              <View>
                <Text style={styles.brandName}>Cinemans</Text>
                <Text style={styles.brandTag}>Dark cinema companion</Text>
              </View>
            </View>
            <SearchBar placeholder="Search movies" onPress={() => router.push('/search')} />
            <SectionHeader title="Popular now" subtitle="Handpicked from TMDB trending audience" />
          </View>
        }
        ListEmptyComponent={<StateView type="empty" title="No movies found" message="Try refreshing in a moment." />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  listContent: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  headerWrap: {
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  brandIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },
  brandName: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  brandTag: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
});
