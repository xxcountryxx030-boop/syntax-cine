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
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
  media_type?: string;
}

export interface MovieDetail extends Movie {
  runtime: number;
  genres: Genre[];
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  production_companies: ProductionCompany[];
  belongs_to_collection: Collection | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Server {
  id: string;
  name: string;
  icon: string;
  url: (tmdbId: number, type?: MediaType, season?: number, episode?: number) => string;
  isPremium?: boolean;
  hasLatin?: boolean;
}

export type MediaType = 'movie' | 'tv';

export type CategoryType = 'popular' | 'now_playing' | 'upcoming' | 'top_rated' | 'latest';

export interface AppState {
  currentCategory: CategoryType;
  currentPage: number;
  allMovies: Movie[];
  isLoading: boolean;
  selectedMovie: MovieDetail | null;
}

export interface SecurityConfig {
  disableRightClick: boolean;
  disableDevTools: boolean;
  disableViewSource: boolean;
  obfuscateApiKey: boolean;
}
