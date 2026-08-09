import './styles/main.css';
import { initSecurity } from './utils/security';
import { appState } from './services/appState';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { MovieGrid } from './components/MovieGrid';
import { Modal } from './components/Modal';
import { Footer } from './components/Footer';

class App {
  private header!: Header;
  private navigation!: Navigation;
  private movieGrid!: MovieGrid;
  private modal!: Modal;
  private footer!: Footer;

  constructor() {
    this.init();
  }

  private init(): void {
    initSecurity();

    document.addEventListener('DOMContentLoaded', () => {
      this.header = new Header();
      this.navigation = new Navigation();
      this.movieGrid = new MovieGrid();
      this.modal = new Modal();
      this.footer = new Footer();

      appState.loadMovies('popular');
    });
  }
}

new App();
