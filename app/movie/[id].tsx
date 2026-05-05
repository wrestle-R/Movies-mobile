import AppButton from '@/components/ui/AppButton';
import AppCard from '@/components/ui/AppCard';
import SectionHeader from '@/components/ui/SectionHeader';
import StateView from '@/components/ui/StateView';
import { theme } from '@/constants/theme';
import { useSavedMovies } from '@/services/savedMovies';
import { useMovieDetails } from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w780';

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const movieId = Number(id);

  const { data, loading, error, refetch } = useMovieDetails(movieId);
  const { isSaved, toggleSaved } = useSavedMovies();

  if (!movieId) {
    return <StateView type="error" title="Invalid movie" message="Movie ID is missing." actionLabel="Go back" onAction={() => router.back()} />;
  }

  if (loading) {
    return <StateView type="loading" title="Loading details" />;
  }

  if (error || !data) {
    return <StateView type="error" title="Could not load details" message={error ?? 'Unknown error'} actionLabel="Retry" onAction={refetch} />;
  }

  const backdrop = data.backdrop_path ? `${IMAGE_BASE}${data.backdrop_path}` : null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {backdrop ? <Image source={{ uri: backdrop }} style={styles.backdrop} /> : null}
        <SectionHeader title={data.title} subtitle={data.tagline || 'Movie details'} />

        <AppCard style={styles.statsCard}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Release</Text>
            <Text style={styles.statValue}>{data.release_date || 'N/A'}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Runtime</Text>
            <Text style={styles.statValue}>{data.runtime ? `${data.runtime} min` : 'N/A'}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Rating</Text>
            <Text style={styles.statValue}>{data.vote_average.toFixed(1)} / 10</Text>
          </View>
        </AppCard>

        <AppCard>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overview}>{data.overview || 'No overview available.'}</Text>
        </AppCard>

        <View style={styles.actions}>
          <AppButton
            label={isSaved(data.id) ? 'Remove from Saved' : 'Save Movie'}
            mode={isSaved(data.id) ? 'secondary' : 'primary'}
            onPress={() => toggleSaved(data)}
          />
          <AppButton label="Back" mode="secondary" onPress={() => router.back()} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: 100,
    gap: theme.spacing.md,
  },
  backdrop: {
    width: '100%',
    height: 210,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
  },
  statsCard: {
    gap: theme.spacing.xs,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statLabel: {
    color: theme.colors.textMuted,
    fontSize: 13,
  },
  statValue: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  overview: {
    color: theme.colors.textMuted,
    lineHeight: 20,
    fontSize: 14,
  },
  actions: {
    gap: theme.spacing.sm,
  },
});
