import type { Movie, MovieDetail, CategoryType } from '../types';
import { movieService } from '../services/movieService';

export class AppState {
  private static instance: AppState;

  currentCategory: CategoryType = 'popular';
  currentPage: number = 1;
  allMovies: Movie[] = [];
  isLoading: boolean = false;
  selectedMovie: MovieDetail | null = null;

  private listeners: Map<string, Function[]> = new Map();

  private constructor() {}

  static getInstance(): AppState {
    if (!AppState.instance) {
      AppState.instance = new AppState();
    }
    return AppState.instance;
  }

  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  emit(event: string, data?: unknown): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(cb => cb(data));
    }
  }

  async loadMovies(category: CategoryType, append: boolean = false): Promise<void> {
    this.isLoading = true;
    this.currentCategory = category;
    this.emit('loading', true);

    try {
      const response = await movieService.getMoviesByCategory(category, this.currentPage);

      if (append) {
        this.allMovies = [...this.allMovies, ...response.results];
      } else {
        this.allMovies = response.results;
      }

      this.emit('moviesLoaded', {
        movies: this.allMovies,
        hasMore: response.page < response.total_pages
      });
    } catch (error) {
      this.emit('error', error);
    } finally {
      this.isLoading = false;
      this.emit('loading', false);
    }
  }

  async loadMoreMovies(): Promise<void> {
    this.currentPage++;
    await this.loadMovies(this.currentCategory, true);
  }

  async searchMovies(query: string): Promise<void> {
    this.isLoading = true;
    this.emit('loading', true);

    try {
      const response = await movieService.searchMovies(query);
      this.allMovies = response.results;
      this.emit('moviesLoaded', { movies: this.allMovies, hasMore: false });
    } catch (error) {
      this.emit('error', error);
    } finally {
      this.isLoading = false;
      this.emit('loading', false);
    }
  }

  async selectMovie(id: number): Promise<void> {
    try {
      const movie = await movieService.getMovieDetail(id);
      this.selectedMovie = movie;
      this.emit('movieSelected', movie);
    } catch (error) {
      this.emit('error', error);
    }
  }

  resetPage(): void {
    this.currentPage = 1;
  }
}

export const appState = AppState.getInstance();
