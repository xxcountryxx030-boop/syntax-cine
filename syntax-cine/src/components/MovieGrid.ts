import type { Movie } from '../types';
import { MovieCard } from './MovieCard';
import { appState } from '../services/appState';

export class MovieGrid {
  private container: HTMLElement;
  private noResults: HTMLElement;
  private loadMoreContainer: HTMLElement;
  private loadMoreBtn: HTMLElement;

  constructor() {
    this.container = document.getElementById('movies-container')!;
    this.noResults = document.getElementById('no-results')!;
    this.loadMoreContainer = document.getElementById('load-more-container')!;
    this.loadMoreBtn = document.getElementById('load-more-btn')!;

    this.bindEvents();
  }

  private bindEvents(): void {
    appState.on('loading', (isLoading: boolean) => {
      if (isLoading) {
        this.showLoading();
      }
    });

    appState.on('moviesLoaded', (data: { movies: Movie[]; hasMore: boolean }) => {
      this.renderMovies(data.movies);
      this.toggleLoadMore(data.hasMore);
    });

    appState.on('error', () => {
      this.showError();
    });

    this.loadMoreBtn.addEventListener('click', () => {
      appState.loadMoreMovies();
    });
  }

  private renderMovies(movies: Movie[]): void {
    if (!movies || movies.length === 0) {
      this.container.innerHTML = '';
      this.noResults.style.display = 'block';
      return;
    }

    this.noResults.style.display = 'none';
    this.container.innerHTML = '';

    const fragment = document.createDocumentFragment();

    movies.forEach((movie, index) => {
      const card = new MovieCard(movie, index);
      fragment.appendChild(card.render());
    });

    this.container.appendChild(fragment);
  }

  private showLoading(): void {
    this.container.innerHTML = `
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Cargando películas...</p>
      </div>
    `;
  }

  private showError(): void {
    this.container.innerHTML = `
      <div class="error-state">
        <div class="error-icon">⚠️</div>
        <p>Error al cargar películas</p>
        <button class="retry-btn" onclick="location.reload()">Reintentar</button>
      </div>
    `;
  }

  private toggleLoadMore(show: boolean): void {
    this.loadMoreContainer.style.display = show ? 'block' : 'none';
  }
}
