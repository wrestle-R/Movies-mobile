import AppButton from '@/components/ui/AppButton';
import AppCard from '@/components/ui/AppCard';
import SectionHeader from '@/components/ui/SectionHeader';
import StateView from '@/components/ui/StateView';
import { useAppTheme } from '@/contexts/theme-context';
import { useSavedMovies } from '@/services/savedMovies';
import { useMovieDetails } from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w780';

export default function MovieDetailsScreen() {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const movieId = Number(id);
  const { data, loading, error, refetch } = useMovieDetails(movieId);
  const { isSaved, toggleSaved } = useSavedMovies();

  if (!movieId) return <StateView type="error" title="Invalid movie" message="Movie ID is missing." actionLabel="Go back" onAction={() => router.back()} />;
  if (loading) return <StateView type="loading" title="Loading details" />;
  if (error || !data) return <StateView type="error" title="Could not load details" message={error ?? 'Unknown error'} actionLabel="Retry" onAction={refetch} />;

  const backdrop = data.backdrop_path ? `${IMAGE_BASE}${data.backdrop_path}` : null;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bg }]}> 
      <ScrollView contentContainerStyle={{ padding: theme.spacing.md, paddingTop: insets.top + 10, paddingBottom: insets.bottom + 110, gap: theme.spacing.md }}>
        {backdrop ? <Image source={{ uri: backdrop }} style={[styles.backdrop, { borderRadius: theme.radius.lg, backgroundColor: theme.colors.surface }]} /> : null}
        <SectionHeader title={data.title} subtitle={data.tagline || 'Movie details'} />

        <AppCard style={{ gap: theme.spacing.xs }}>
          <View style={styles.statRow}><Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>Release</Text><Text style={[styles.statValue, { color: theme.colors.text }]}>{data.release_date || 'N/A'}</Text></View>
          <View style={styles.statRow}><Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>Runtime</Text><Text style={[styles.statValue, { color: theme.colors.text }]}>{data.runtime ? `${data.runtime} min` : 'N/A'}</Text></View>
          <View style={styles.statRow}><Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>Rating</Text><Text style={[styles.statValue, { color: theme.colors.text }]}>{data.vote_average.toFixed(1)} / 10</Text></View>
        </AppCard>

        <AppCard>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: theme.spacing.xs }]}>Overview</Text>
          <Text style={[styles.overview, { color: theme.colors.textMuted }]}>{data.overview || 'No overview available.'}</Text>
        </AppCard>

        <View style={{ gap: theme.spacing.sm }}>
          <AppButton label={isSaved(data.id) ? 'Remove from Saved' : 'Save Movie'} mode={isSaved(data.id) ? 'secondary' : 'primary'} onPress={() => toggleSaved(data)} />
          <AppButton label="Back" mode="secondary" onPress={() => router.back()} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backdrop: { width: '100%', height: 210 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statLabel: { fontSize: 13 },
  statValue: { fontSize: 13, fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  overview: { lineHeight: 20, fontSize: 14 },
});
