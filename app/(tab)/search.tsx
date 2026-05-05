import MovieCard from '@/components/MovieCard';
import AppInput from '@/components/ui/AppInput';
import SectionHeader from '@/components/ui/SectionHeader';
import StateView from '@/components/ui/StateView';
import { useAppTheme } from '@/contexts/theme-context';
import { useSearchMovies } from '@/services/useFetch';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const trimmedQuery = query.trim();
  const searchTerm = useMemo(() => (trimmedQuery.length > 1 ? trimmedQuery : ''), [trimmedQuery]);
  const { data, loading, error, refetch } = useSearchMovies(searchTerm, 1);
  const movies = data?.results ?? [];

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[styles.container, { backgroundColor: theme.colors.bg }]}>
      <View style={[styles.content, { paddingHorizontal: theme.spacing.md, paddingTop: insets.top + 10 }]}> 
        <SectionHeader title="Search" subtitle="Find films by title" />
        <AppInput
          value={query}
          onChangeText={setQuery}
          placeholder="Type at least 2 characters"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {loading ? <StateView type="loading" title="Searching movies" /> : null}
        {error ? <StateView type="error" title="Search failed" message={error} actionLabel="Retry" onAction={refetch} /> : null}
        {!loading && !error && searchTerm.length > 0 && movies.length === 0 ? <StateView type="empty" title="No results" message="Try another title." /> : null}

        {!loading && !error ? (
          <FlatList
            style={{ marginTop: theme.spacing.md }}
            data={movies}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <MovieCard movie={item} onPress={() => router.push(`/movie/${item.id}`)} />}
            numColumns={3}
            columnWrapperStyle={styles.row}
            contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            showsVerticalScrollIndicator={false}
          />
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  row: { justifyContent: 'space-between' },
});
