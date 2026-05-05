import brandIcon from '@/assets/branding/icon.png';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import SectionHeader from '@/components/ui/SectionHeader';
import StateView from '@/components/ui/StateView';
import { useAppTheme } from '@/contexts/theme-context';
import { usePopularMovies } from '@/services/useFetch';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { data, loading, error, refetch } = usePopularMovies(1);

  if (loading) return <StateView type="loading" title="Loading movies" message="Fetching today’s popular titles." />;
  if (error) return <StateView type="error" title="Could not load movies" message={error} actionLabel="Try again" onAction={refetch} />;

  const movies = data?.results ?? [];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bg }]}> 
      <FlatList
        data={movies}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MovieCard movie={item} onPress={() => router.push(`/movie/${item.id}`)} />}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingHorizontal: theme.spacing.md, paddingBottom: insets.bottom + 110 }}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={loading}
        ListHeaderComponent={
          <View style={{ paddingTop: insets.top + 10, paddingBottom: theme.spacing.md }}>
            <View style={[styles.brandRow, { gap: theme.spacing.sm, marginBottom: theme.spacing.md }]}> 
              <Image source={brandIcon} style={styles.brandIcon} />
              <View>
                <Text style={[styles.brandName, { color: theme.colors.text }]}>Cinemans</Text>
                <Text style={[styles.brandTag, { color: theme.colors.textMuted }]}>{theme.dark ? 'Dark cinema companion' : 'Light cinema companion'}</Text>
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
  container: { flex: 1 },
  row: { justifyContent: 'space-between' },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  brandIcon: { width: 44, height: 44, borderRadius: 12 },
  brandName: { fontSize: 24, fontWeight: '800' },
  brandTag: { fontSize: 12, marginTop: 2 },
});
