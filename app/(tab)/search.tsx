import MovieCard from '@/components/MovieCard';
import AppInput from '@/components/ui/AppInput';
import SectionHeader from '@/components/ui/SectionHeader';
import StateView from '@/components/ui/StateView';
import { theme } from '@/constants/theme';
import { useSearchMovies } from '@/services/useFetch';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const trimmedQuery = query.trim();
  const searchTerm = useMemo(() => (trimmedQuery.length > 1 ? trimmedQuery : ''), [trimmedQuery]);
  const { data, loading, error, refetch } = useSearchMovies(searchTerm, 1);

  const movies = data?.results ?? [];

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <View style={styles.content}>
        <SectionHeader
          title="Search"
          subtitle="Find films by title"
        />
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
        {!loading && !error && searchTerm.length > 0 && movies.length === 0 ? (
          <StateView type="empty" title="No results" message="Try another title." />
        ) : null}

        {!loading && !error ? (
          <FlatList
            style={styles.list}
            data={movies}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <MovieCard movie={item} onPress={() => router.push(`/movie/${item.id}`)} />}
            numColumns={3}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
  },
  list: {
    marginTop: theme.spacing.md,
  },
  row: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: 110,
  },
});
