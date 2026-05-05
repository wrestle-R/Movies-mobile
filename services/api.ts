import { MovieDetails, MovieListResponse } from '@/types/movie';
import Constants from 'expo-constants';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const EXTRA_CONFIG = Constants.expoConfig?.extra as
  | {
      movieApiKey?: string;
    }
  | undefined;

const API_KEY =
  process.env.EXPO_PUBLIC_MOVIE_API_KEY ||
  process.env.TMDB_API_KEY ||
  EXTRA_CONFIG?.movieApiKey ||
  '';

export class AppApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'AppApiError';
    this.status = status;
  }
}

export interface SearchOptions {
  query?: string;
  page?: number;
  include_adult?: boolean;
  language?: string;
}

class MovieApiService {
  private async request<T>(path: string): Promise<T> {
    if (!API_KEY) {
      throw new AppApiError('Missing movie API key. Set EXPO_PUBLIC_MOVIE_API_KEY in .env.', 500);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (!response.ok) {
        let message = 'Request failed. Please try again.';
        if (response.status === 401) message = 'API authentication failed. Check TMDB key.';
        if (response.status === 404) message = 'Movie not found.';
        if (response.status === 429) message = 'Too many requests. Please wait and retry.';
        throw new AppApiError(message, response.status);
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new AppApiError('Request timed out. Check your internet connection.');
      }
      if (error instanceof AppApiError) {
        throw error;
      }
      throw new AppApiError('Network error. Please try again.');
    } finally {
      clearTimeout(timeout);
    }
  }

  async getPopularMovies(page = 1): Promise<MovieListResponse> {
    return this.request<MovieListResponse>(`/movie/popular?page=${page}&language=en-US`);
  }

  async searchMovies({ query = '', page = 1, include_adult = false, language = 'en-US' }: SearchOptions): Promise<MovieListResponse> {
    const q = query.trim();
    if (!q) {
      return this.getPopularMovies(page);
    }

    const params = new URLSearchParams({
      query: q,
      page: String(page),
      include_adult: String(include_adult),
      language,
    });

    return this.request<MovieListResponse>(`/search/movie?${params.toString()}`);
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.request<MovieDetails>(`/movie/${movieId}?language=en-US`);
  }
}

export const movieApi = new MovieApiService();
