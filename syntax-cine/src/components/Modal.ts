import type { MovieDetail, Server } from '../types';
import { SERVERS } from '../config/servers';
import { movieService } from '../services/movieService';
import { appState } from '../services/appState';

export class Modal {
  private overlay: HTMLElement;
  private modal: HTMLElement;
  private backdrop: HTMLImageElement;
  private title: HTMLElement;
  private year: HTMLElement;
  private rating: HTMLElement;
  private runtime: HTMLElement;
  private genres: HTMLElement;
  private description: HTMLElement;
  private serverTabs: HTMLElement;
  private playerContainer: HTMLElement;
  private currentMovieId: number = 0;

  constructor() {
    this.overlay = document.getElementById('modal-overlay')!;
    this.modal = document.getElementById('modal')!;
    this.backdrop = document.getElementById('modal-backdrop') as HTMLImageElement;
    this.title = document.getElementById('modal-title')!;
    this.year = document.getElementById('modal-year')!;
    this.rating = document.getElementById('modal-rating')!;
    this.runtime = document.getElementById('modal-runtime')!;
    this.genres = document.getElementById('modal-genres')!;
    this.description = document.getElementById('modal-desc')!;
    this.serverTabs = document.getElementById('server-tabs')!;
    this.playerContainer = document.getElementById('player-container')!;

    this.bindEvents();
  }

  private bindEvents(): void {
    appState.on('movieSelected', (movie: MovieDetail) => {
      this.open(movie);
    });

    this.overlay.addEventListener('click', (e: MouseEvent) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    const closeBtn = document.getElementById('modal-close');
    closeBtn?.addEventListener('click', () => this.close());

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
        this.close();
      }
    });
  }

  private open(movie: MovieDetail): void {
    this.currentMovieId = movie.id;
    this.populateData(movie);
    this.renderServerTabs();
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.overlay.classList.remove('active');
    this.playerContainer.innerHTML = '<p class="player-placeholder">Selecciona un servidor para reproducir</p>';
    document.body.style.overflow = 'auto';
  }

  private populateData(movie: MovieDetail): void {
    this.backdrop.src = movieService.getBackdropUrl(movie.backdrop_path);
    this.title.textContent = movie.title;
    this.year.textContent = `📅 ${movie.release_date?.substring(0, 4) || 'N/A'}`;
    this.rating.textContent = `⭐ ${movie.vote_average?.toFixed(1)}`;
    this.runtime.textContent = `⏱ ${movie.runtime || 'N/A'} min`;
    this.description.textContent = movie.overview || 'Sin descripción disponible.';

    this.genres.innerHTML = movie.genres
      .map(g => `<span class="genre-tag">${g.name}</span>`)
      .join('');
  }

  private renderServerTabs(): void {
    this.serverTabs.innerHTML = SERVERS.map((server, index) => `
      <button class="server-tab ${index === 0 ? 'active' : ''}" data-server-index="${index}">
        <span class="server-icon">${server.icon}</span>
        <span class="server-name">${server.name}</span>
        ${server.hasLatin ? '<span class="server-badge">LAT</span>' : ''}
      </button>
    `).join('');

    const tabs = this.serverTabs.querySelectorAll('.server-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const serverIndex = parseInt(target.dataset.serverIndex || '0');
        this.loadServer(serverIndex);
      });
    });

    if (SERVERS.length > 0) {
      this.loadServer(0);
    }
  }

  private loadServer(index: number): void {
    const server = SERVERS[index];
    if (!server) return;

    this.serverTabs.querySelectorAll('.server-tab').forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });

    const url = server.url(this.currentMovieId);
    this.playerContainer.innerHTML = `
      <iframe 
        src="${url}" 
        allowfullscreen 
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    `;
  }
}
