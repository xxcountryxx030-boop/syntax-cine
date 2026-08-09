export class Footer {
  private container: HTMLElement;

  constructor() {
    this.container = document.getElementById('app-footer')!;
    this.render();
  }

  private render(): void {
    const year = new Date().getFullYear();

    this.container.innerHTML = `
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="footer-logo">
              <span class="logo-icon">⚡</span>
              <span class="logo-text">SYNTAX</span>
            </div>
            <p class="footer-desc">Plataforma de streaming empresarial con tecnología de vanguardia.</p>
          </div>
          <div class="footer-links">
            <div class="footer-section">
              <h4>Servidores</h4>
              <ul>
                <li>VidLux</li>
                <li>UmPlay</li>
                <li>VidSrc</li>
                <li>VidLink</li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>Soporte</h4>
              <ul>
                <li>Ayuda</li>
                <li>Contacto</li>
                <li>API</li>
                <li>Estado</li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>Legal</h4>
              <ul>
                <li>Términos</li>
                <li>Privacidad</li>
                <li>Licencias</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© ${year} Syntax Cine. Todos los derechos reservados.</p>
          <p class="footer-tech">Desarrollado con TypeScript • Vite • TMDB API</p>
        </div>
      </footer>
    `;
  }
}
