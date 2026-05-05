import { useAppTheme } from '@/contexts/theme-context';
import { Movie } from '@/types/movie';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  movie: Movie;
  onPress?: () => void;
};

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export default function PosterTile({ movie, onPress }: Props) {
  const { theme } = useAppTheme();
  const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : null;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {poster ? (
        <Image source={{ uri: poster }} style={[styles.poster, { borderRadius: theme.radius.md, backgroundColor: theme.colors.surfaceAlt }]} />
      ) : (
        <View style={[styles.poster, styles.fallback, { borderRadius: theme.radius.md, backgroundColor: theme.colors.surfaceAlt }]}>
          <Text style={[styles.fallbackText, { color: theme.colors.textMuted }]}>No Poster</Text>
        </View>
      )}
      <Text numberOfLines={2} style={[styles.title, { color: theme.colors.text }]}>
        {movie.title}
      </Text>
      <Text style={[styles.meta, { color: theme.colors.textMuted }]}>{movie.release_date?.slice(0, 4) || 'N/A'}  •  {movie.vote_average.toFixed(1)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '31%',
    minWidth: 105,
    marginBottom: 14,
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    marginBottom: 8,
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  meta: {
    fontSize: 12,
    marginTop: 2,
  },
});
