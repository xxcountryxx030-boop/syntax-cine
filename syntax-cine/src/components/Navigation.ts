import type { CategoryType } from '../types';
import { appState } from '../services/appState';

interface CategoryConfig {
  id: CategoryType;
  label: string;
  icon: string;
}

const CATEGORIES: CategoryConfig[] = [
  { id: 'popular', label: 'Populares', icon: '🔥' },
  { id: 'now_playing', label: 'En Cartelera', icon: '🎬' },
  { id: 'upcoming', label: 'Próximamente', icon: '📅' },
  { id: 'top_rated', label: 'Mejor Valoradas', icon: '⭐' },
  { id: 'latest', label: 'Últimas', icon: '🆕' }
];

export class Navigation {
  private container: HTMLElement;
  private activeCategory: CategoryType = 'popular';

  constructor() {
    this.container = document.getElementById('app-navigation')!;
    this.render();
    this.bindEvents();
  }

  private render(): void {
    this.container.innerHTML = `
      <nav class="nav-tabs">
        ${CATEGORIES.map(cat => `
          <button class="nav-tab ${cat.id === this.activeCategory ? 'active' : ''}" data-category="${cat.id}">
            <span class="nav-icon">${cat.icon}</span>
            <span class="nav-label">${cat.label}</span>
          </button>
        `).join('')}
      </nav>
    `;
  }

  private bindEvents(): void {
    const tabs = this.container.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const category = target.dataset.category as CategoryType;
        this.setActive(category);
      });
    });
  }

  setActive(category: CategoryType): void {
    this.activeCategory = category;
    this.container.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.toggle('active', (tab as HTMLElement).dataset.category === category);
    });

    appState.resetPage();
    appState.loadMovies(category);
  }
}
