import type { SecurityConfig } from '../types';

const SECURITY_CONFIG: SecurityConfig = {
  disableRightClick: true,
  disableDevTools: true,
  disableViewSource: true,
  obfuscateApiKey: true
};

function showBlockOverlay(): void {
  const overlay = document.getElementById('block-overlay');
  if (overlay) {
    overlay.classList.add('active');
    setTimeout(() => overlay.classList.remove('active'), 2000);
  }
}

function initRightClickBlock(): void {
  if (!SECURITY_CONFIG.disableRightClick) return;
  document.addEventListener('contextmenu', (e: Event) => {
    e.preventDefault();
  });
}

function initKeyboardBlock(): void {
  if (!SECURITY_CONFIG.disableDevTools) return;

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    const key = e.key;
    const keyCode = e.keyCode;

    if (key === 'F12' || keyCode === 123) {
      e.preventDefault();
      showBlockOverlay();
      return;
    }

    if (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(key)) {
      e.preventDefault();
      showBlockOverlay();
      return;
    }

    if (e.ctrlKey && ['U', 'u'].includes(key)) {
      e.preventDefault();
      showBlockOverlay();
      return;
    }

    if (e.ctrlKey && ['S', 's'].includes(key)) {
      e.preventDefault();
      return;
    }
  });
}

function initDragBlock(): void {
  document.addEventListener('dragstart', (e: Event) => {
    e.preventDefault();
  });
}

function initDevToolsDetection(): void {
  if (!SECURITY_CONFIG.disableDevTools) return;

  let isOpen = false;
  const threshold = 160;

  setInterval(() => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;

    if (widthThreshold || heightThreshold) {
      if (!isOpen) {
        isOpen = true;
        showBlockOverlay();
      }
    } else {
      isOpen = false;
    }
  }, 1000);
}

export function initSecurity(): void {
  initRightClickBlock();
  initKeyboardBlock();
  initDragBlock();
  initDevToolsDetection();
}
