import { useCallback, useEffect, useRef, useState } from 'react';
import type { DiscoverOptions, SearchOptions } from './api';
import { movieApi } from './api';

interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  video: boolean;
  original_language: string;
  genre_ids: number[];
}

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface UseFetchState {
  data: MovieResponse | null;
  loading: boolean;
  error: string | null;
}

type FetchMethod = 
  | { type: 'search'; options: SearchOptions | string; page?: number }
  | { type: 'discover'; options?: DiscoverOptions }
  | { type: 'popular'; page?: number }
  | { type: 'trending'; timeWindow?: 'day' | 'week' }
  | { type: 'details'; movieId: number };

export const useMovieFetch = (method?: FetchMethod | (() => FetchMethod)) => {
  const [state, setState] = useState<UseFetchState>({
    data: null,
    loading: false,
    error: null,
  });
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(false);

  const fetchMovies = useCallback(async (fetchMethod: FetchMethod) => {
    // Only proceed if component is mounted
    if (!isMountedRef.current) return;

    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();
    
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      let response;

      switch (fetchMethod.type) {
        case 'search':
          response = await movieApi.searchMovies(fetchMethod.options, fetchMethod.page);
          break;
        case 'discover':
          response = await movieApi.discoverMovies(fetchMethod.options);
          break;
        case 'popular':
          response = await movieApi.getPopularMovies(fetchMethod.page);
          break;
        case 'trending':
          response = await movieApi.getTrendingMovies(fetchMethod.timeWindow);
          break;
        case 'details':
          response = await movieApi.getMovieDetails(fetchMethod.movieId);
          response = {
            page: 1,
            results: [response],
            total_pages: 1,
            total_results: 1,
          };
          break;
        default:
          throw new Error('Invalid fetch method');
      }

      // Only update state if component is still mounted and request wasn't aborted
      if (isMountedRef.current && !abortControllerRef.current?.signal.aborted) {
        setState({
          data: response,
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      // Don't update state if component is unmounted or request was aborted
      if (isMountedRef.current && !abortControllerRef.current?.signal.aborted) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred',
        });
      }
    }
  }, []);

  // Handle mounting and API calls properly
  useEffect(() => {
    isMountedRef.current = true;
    
    // Small delay to ensure component is fully mounted
    const timeoutId = setTimeout(() => {
      if (isMountedRef.current) {
        let fetchMethod: FetchMethod;
        
        if (typeof method === 'function') {
          fetchMethod = method();
        } else if (method) {
          fetchMethod = method;
        } else {
          fetchMethod = { type: 'popular', page: 1 };
        }
        
        fetchMovies(fetchMethod);
      }
    }, 100);

    // Cleanup function
    return () => {
      isMountedRef.current = false;
      clearTimeout(timeoutId);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []); // Empty dependency array

  const refetch = useCallback(() => {
    let fetchMethod: FetchMethod;
    
    if (typeof method === 'function') {
      fetchMethod = method();
    } else if (method) {
      fetchMethod = method;
    } else {
      fetchMethod = { type: 'popular', page: 1 };
    }
    
    fetchMovies(fetchMethod);
  }, [method, fetchMovies]);

  const searchMovies = useCallback((options: SearchOptions | string, page?: number) => {
    fetchMovies({ type: 'search', options, page });
  }, [fetchMovies]);

  const discoverMovies = useCallback((options?: DiscoverOptions) => {
    fetchMovies({ type: 'discover', options });
  }, [fetchMovies]);

  const getPopularMovies = useCallback((page?: number) => {
    fetchMovies({ type: 'popular', page });
  }, [fetchMovies]);

  const getTrendingMovies = useCallback((timeWindow?: 'day' | 'week') => {
    fetchMovies({ type: 'trending', timeWindow });
  }, [fetchMovies]);

  const getMovieDetails = useCallback((movieId: number) => {
    fetchMovies({ type: 'details', movieId });
  }, [fetchMovies]);

  return {
    ...state,
    refetch,
    searchMovies,
    discoverMovies,
    getPopularMovies,
    getTrendingMovies,
    getMovieDetails,
  };
};

// Convenience hooks for specific use cases
export const useSearchMovies = (options?: SearchOptions | string, page?: number) => {
  return useMovieFetch(options ? { type: 'search', options, page } : undefined);
};

export const useDiscoverMovies = (options?: DiscoverOptions) => {
  return useMovieFetch(options ? { type: 'discover', options } : undefined);
};

export const usePopularMovies = (page?: number) => {
  return useMovieFetch({ type: 'popular', page });
};

export const useTrendingMovies = (timeWindow?: 'day' | 'week') => {
  return useMovieFetch({ type: 'trending', timeWindow });
};

export const useMovieDetails = (movieId?: number) => {
  return useMovieFetch(movieId ? { type: 'details', movieId } : undefined);
};

// Simple function for popular movies (memoized to prevent re-renders)
export const fetchMovies = (options: { query?: string } = {}) => {
  if (options.query === "") {
    return { type: 'popular' as const, page: 1 };
  }
  return { type: 'search' as const, options: options.query || "", page: 1 };
};
