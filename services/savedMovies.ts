import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '@/types/movie';
import { useCallback, useEffect, useState } from 'react';

const KEY = 'saved_movies_v1';

async function readSavedMovies() {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [] as Movie[];
  return JSON.parse(raw) as Movie[];
}

async function writeSavedMovies(movies: Movie[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(movies));
}

export function useSavedMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await readSavedMovies();
      setMovies(list);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const isSaved = useCallback((movieId: number) => movies.some((m) => m.id === movieId), [movies]);

  const toggleSaved = useCallback(
    async (movie: Movie) => {
      const next = isSaved(movie.id)
        ? movies.filter((m) => m.id !== movie.id)
        : [movie, ...movies];
      setMovies(next);
      await writeSavedMovies(next);
    },
    [isSaved, movies]
  );

  const remove = useCallback(
    async (movieId: number) => {
      const next = movies.filter((m) => m.id !== movieId);
      setMovies(next);
      await writeSavedMovies(next);
    },
    [movies]
  );

  return { movies, loading, isSaved, toggleSaved, remove, reload: load };
}
