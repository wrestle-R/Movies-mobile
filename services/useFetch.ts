import { movieApi } from '@/services/api';
import { MovieDetails, MovieListResponse } from '@/types/movie';
import { useCallback, useEffect, useState } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useAsyncTask<T>(task: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const run = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const result = await task();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error';
      setState({ data: null, loading: false, error: message });
    }
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { ...state, refetch: run };
}

export function usePopularMovies(page = 1) {
  return useAsyncTask<MovieListResponse>(() => movieApi.getPopularMovies(page), [page]);
}

export function useSearchMovies(query: string, page = 1) {
  return useAsyncTask<MovieListResponse>(() => movieApi.searchMovies({ query, page }), [query, page]);
}

export function useMovieDetails(movieId: number) {
  return useAsyncTask<MovieDetails>(() => movieApi.getMovieDetails(movieId), [movieId]);
}
