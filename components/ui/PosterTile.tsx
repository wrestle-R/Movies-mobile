import { theme } from '@/constants/theme';
import { Movie } from '@/types/movie';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  movie: Movie;
  onPress?: () => void;
};

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export default function PosterTile({ movie, onPress }: Props) {
  const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : null;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {poster ? (
        <Image source={{ uri: poster }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, styles.fallback]}>
          <Text style={styles.fallbackText}>No Poster</Text>
        </View>
      )}
      <Text numberOfLines={2} style={styles.title}>
        {movie.title}
      </Text>
      <Text style={styles.meta}>{movie.release_date?.slice(0, 4) || 'N/A'}  •  {movie.vote_average.toFixed(1)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '31%',
    minWidth: 105,
    marginBottom: theme.spacing.md,
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceAlt,
    marginBottom: 8,
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
  title: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  meta: {
    color: theme.colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
});
