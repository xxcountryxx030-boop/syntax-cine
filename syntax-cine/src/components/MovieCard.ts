import type { Movie } from '../types';
import { movieService } from '../services/movieService';
import { appState } from '../services/appState';

export class MovieCard {
  private movie: Movie;
  private element: HTMLElement;

  constructor(movie: Movie, index: number) {
    this.movie = movie;
    this.element = this.createElement(index);
    this.bindEvents();
  }

  private createElement(index: number): HTMLElement {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.style.animationDelay = `${index * 0.04}s`;

    const posterUrl = movieService.getPosterUrl(this.movie.poster_path);
    const rating = this.movie.vote_average?.toFixed(1) || 'N/A';
    const year = this.movie.release_date?.substring(0, 4) || 'N/A';

    card.innerHTML = `
      <div class="poster-wrap">
        <img src="${posterUrl}" alt="${this.movie.title}" loading="lazy">
        <div class="play-overlay">
          <div class="play-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div class="card-badge">⭐ ${rating}</div>
      </div>
      <div class="card-info">
        <h3 class="card-title">${this.movie.title}</h3>
        <div class="card-meta">
          <span class="card-rating">★ ${rating}</span>
          <span class="card-year">${year}</span>
        </div>
      </div>
    `;

    return card;
  }

  private bindEvents(): void {
    this.element.addEventListener('click', () => {
      appState.selectMovie(this.movie.id);
    });
  }

  render(): HTMLElement {
    return this.element;
  }
}
