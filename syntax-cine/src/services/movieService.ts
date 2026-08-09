import { API_KEY, API_BASE_URL } from '../config/api';
import type { Movie, MovieDetail, TMDBResponse, CategoryType } from '../types';

export class MovieService {
  private static instance: MovieService;

  private constructor() {}

  static getInstance(): MovieService {
    if (!MovieService.instance) {
      MovieService.instance = new MovieService();
    }
    return MovieService.instance;
  }

  private async fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', 'es-ES');

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getMoviesByCategory(category: CategoryType, page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchTMDB<TMDBResponse<Movie>>(`/movie/${category}`, {
      page: page.toString()
    });
  }

  async searchMovies(query: string, page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchTMDB<TMDBResponse<Movie>>('/search/movie', {
      query,
      page: page.toString()
    });
  }

  async getMovieDetail(id: number): Promise<MovieDetail> {
    return this.fetchTMDB<MovieDetail>(`/movie/${id}`);
  }

  getPosterUrl(posterPath: string | null, size: string = '/w500'): string {
    if (!posterPath) return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450"><rect fill="%23111827" width="300" height="450"/><text fill="%23475569" font-family="sans-serif" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em">Sin Imagen</text></svg>';
    return `https://image.tmdb.org/t/p${size}${posterPath}`;
  }

  getBackdropUrl(backdropPath: string | null): string {
    if (!backdropPath) return this.getPosterUrl(null);
    return `https://image.tmdb.org/t/p/original${backdropPath}`;
  }
}

export const movieService = MovieService.getInstance();
