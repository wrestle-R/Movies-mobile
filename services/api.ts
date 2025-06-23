const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.EXPO_PUBLIC_MOVIE_API_KEY;

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
}

interface DiscoverOptions {
  page?: number;
  language?: string;
  sort_by?: string;
  include_adult?: boolean;
  include_video?: boolean;
  primary_release_year?: number;
  vote_average_gte?: number;
  vote_average_lte?: number;
  vote_count_gte?: number;
  with_genres?: string;
  with_companies?: string;
  with_keywords?: string;
  release_date_gte?: string;
  release_date_lte?: string;
  region?: string;
}

interface SearchOptions {
  query?: string;
  page?: number;
  language?: string;
  include_adult?: boolean;
  primary_release_year?: string;
  region?: string;
  year?: string;
  // Additional discover options when no query
  sort_by?: string;
  vote_average_gte?: number;
  vote_average_lte?: number;
  vote_count_gte?: number;
  with_genres?: string;
  with_companies?: string;
  with_keywords?: string;
  release_date_gte?: string;
  release_date_lte?: string;
}

class MovieApiService {
  private requestCount = 0;
  private lastRequestTime = 0;
  private readonly REQUEST_LIMIT = 40; // TMDB allows 40 requests per 10 seconds
  private readonly TIME_WINDOW = 10000; // 10 seconds

  private async checkRateLimit() {
    const now = Date.now();
    
    // Reset counter if time window has passed
    if (now - this.lastRequestTime > this.TIME_WINDOW) {
      this.requestCount = 0;
      this.lastRequestTime = now;
    }
    
    // Check if we're hitting rate limit
    if (this.requestCount >= this.REQUEST_LIMIT) {
      const waitTime = this.TIME_WINDOW - (now - this.lastRequestTime);
      throw new Error(`Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`);
    }
    
    this.requestCount++;
  }

  private getHeaders() {
    if (!API_KEY) {
      throw new Error('API Key is missing. Please check your environment variables.');
    }
    
    return {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`
    };
  }

  private async makeRequest(endpoint: string, options: ApiOptions = {}) {
    await this.checkRateLimit();
    
    const { method = 'GET', body } = options;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const config: RequestInit = {
      method,
      headers: this.getHeaders(),
      signal: controller.signal,
    };

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        }
        throw new Error(`API Error: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`);
      }
      
      return await response.json();
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timed out. Please check your connection.');
      }
      
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication check
  async checkAuthentication() {
    return this.makeRequest('/authentication');
  }

  // Search movies or discover if no query provided
  async searchMovies(options: SearchOptions | string = {}, page: number = 1) {
    // Handle legacy string parameter
    if (typeof options === 'string') {
      const query = options;
      const params = new URLSearchParams({
        query: encodeURIComponent(query),
        page: String(page),
        include_adult: 'false',
        language: 'en-US'
      });
      return this.makeRequest(`/search/movie?${params.toString()}`);
    }

    const { query, ...searchOptions } = options;

    // If query is provided, use search endpoint
    if (query && query.trim()) {
      const params = new URLSearchParams();
      params.append('query', encodeURIComponent(query.trim()));
      params.append('include_adult', String(searchOptions.include_adult ?? false));
      params.append('language', searchOptions.language ?? 'en-US');
      params.append('page', String(searchOptions.page ?? 1));
      
      if (searchOptions.primary_release_year) {
        params.append('primary_release_year', searchOptions.primary_release_year);
      }
      if (searchOptions.region) {
        params.append('region', searchOptions.region);
      }
      if (searchOptions.year) {
        params.append('year', searchOptions.year);
      }

      return this.makeRequest(`/search/movie?${params.toString()}`);
    }

    // If no query, use discover endpoint with filters
    const params = new URLSearchParams();
    params.append('include_adult', String(searchOptions.include_adult ?? false));
    params.append('language', searchOptions.language ?? 'en-US');
    params.append('page', String(searchOptions.page ?? 1));
    params.append('sort_by', searchOptions.sort_by ?? 'popularity.desc');
    
    // Add discover-specific parameters
    if (searchOptions.primary_release_year) {
      params.append('primary_release_year', searchOptions.primary_release_year);
    }
    if (searchOptions.vote_average_gte !== undefined) {
      params.append('vote_average.gte', String(searchOptions.vote_average_gte));
    }
    if (searchOptions.vote_average_lte !== undefined) {
      params.append('vote_average.lte', String(searchOptions.vote_average_lte));
    }
    if (searchOptions.vote_count_gte !== undefined) {
      params.append('vote_count.gte', String(searchOptions.vote_count_gte));
    }
    if (searchOptions.with_genres) {
      params.append('with_genres', searchOptions.with_genres);
    }
    if (searchOptions.with_companies) {
      params.append('with_companies', searchOptions.with_companies);
    }
    if (searchOptions.with_keywords) {
      params.append('with_keywords', searchOptions.with_keywords);
    }
    if (searchOptions.release_date_gte) {
      params.append('release_date.gte', searchOptions.release_date_gte);
    }
    if (searchOptions.release_date_lte) {
      params.append('release_date.lte', searchOptions.release_date_lte);
    }
    if (searchOptions.region) {
      params.append('region', searchOptions.region);
    }

    return this.makeRequest(`/discover/movie?${params.toString()}`);
  }

  // Get popular movies
  async getPopularMovies(page: number = 1) {
    return this.makeRequest(`/movie/popular?page=${page}`);
  }

  // Get movie details
  async getMovieDetails(movieId: number) {
    return this.makeRequest(`/movie/${movieId}`);
  }

  // Get trending movies
  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week') {
    return this.makeRequest(`/trending/movie/${timeWindow}`);
  }

  // Discover movies with filtering options
  async discoverMovies(options: DiscoverOptions = {}) {
    const params = new URLSearchParams();
    
    // Set defaults
    params.append('include_adult', String(options.include_adult ?? false));
    params.append('include_video', String(options.include_video ?? false));
    params.append('language', options.language ?? 'en-US');
    params.append('page', String(options.page ?? 1));
    params.append('sort_by', options.sort_by ?? 'popularity.desc');
    
    // Add optional parameters
    if (options.primary_release_year) {
      params.append('primary_release_year', String(options.primary_release_year));
    }
    if (options.vote_average_gte !== undefined) {
      params.append('vote_average.gte', String(options.vote_average_gte));
    }
    if (options.vote_average_lte !== undefined) {
      params.append('vote_average.lte', String(options.vote_average_lte));
    }
    if (options.vote_count_gte !== undefined) {
      params.append('vote_count.gte', String(options.vote_count_gte));
    }
    if (options.with_genres) {
      params.append('with_genres', options.with_genres);
    }
    if (options.with_companies) {
      params.append('with_companies', options.with_companies);
    }
    if (options.with_keywords) {
      params.append('with_keywords', options.with_keywords);
    }
    if (options.release_date_gte) {
      params.append('release_date.gte', options.release_date_gte);
    }
    if (options.release_date_lte) {
      params.append('release_date.lte', options.release_date_lte);
    }
    if (options.region) {
      params.append('region', options.region);
    }

    return this.makeRequest(`/discover/movie?${params.toString()}`);
  }
}

// Export interfaces for use in other files
export type { DiscoverOptions, SearchOptions };

export const movieApi = new MovieApiService();