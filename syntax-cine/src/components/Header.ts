import { appState } from '../services/appState';

export class Header {
  private container: HTMLElement;
  private searchInput!: HTMLInputElement;

  constructor() {
    this.container = document.getElementById('app-header')!;
    this.render();
    this.bindEvents();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="header-content">
        <div class="logo-section">
          <div class="logo">
            <span class="logo-icon">⚡</span>
            <span class="logo-text">SYNTAX</span>
            <span class="logo-badge">CINE</span>
          </div>
        </div>
        <div class="search-section">
          <div class="search-wrapper">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="search-input" placeholder="Buscar películas..." autocomplete="off">
            <button id="search-btn">Buscar</button>
          </div>
        </div>
        <div class="header-actions">
          <div class="status-indicator">
            <span class="status-dot"></span>
            <span class="status-text">En línea</span>
          </div>
        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    this.searchInput = document.getElementById('search-input') as HTMLInputElement;
    const searchBtn = document.getElementById('search-btn')!;

    searchBtn.addEventListener('click', () => this.handleSearch());
    this.searchInput.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter') this.handleSearch();
    });
  }

  private handleSearch(): void {
    const query = this.searchInput.value.trim();
    if (query) {
      appState.resetPage();
      appState.searchMovies(query);
    }
  }

  clearSearch(): void {
    this.searchInput.value = '';
  }
}
