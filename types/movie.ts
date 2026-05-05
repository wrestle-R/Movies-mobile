export interface Movie {
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
  genre_ids?: number[];
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  status: string;
  tagline: string | null;
  genres: { id: number; name: string }[];
  homepage: string | null;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
