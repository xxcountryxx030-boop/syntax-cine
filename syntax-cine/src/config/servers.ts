import type { Server } from '../types';

export const SERVERS: Server[] = [
  {
    id: 'vidlux',
    name: 'VidLux',
    icon: '⚡',
    url: (tmdbId) => `https://vidlux.xyz/embed/movie/${tmdbId}`,
    hasLatin: true
  },
  {
    id: 'umplay',
    name: 'UmPlay',
    icon: '▶️',
    url: (tmdbId) => `https://unlimplay.com/play/embed/movie/${tmdbId}`,
    hasLatin: true
  },
  {
    id: 'vidsrc',
    name: 'VidSrc',
    icon: '🎬',
    url: (tmdbId) => `https://vidsrc.to/embed/movie/${tmdbId}`,
    hasLatin: true
  },
  {
    id: 'vidsrc-cc',
    name: 'VidSrc CC',
    icon: '🎞️',
    url: (tmdbId) => `https://vidsrc.cc/v3/embed/movie/${tmdbId}`,
    hasLatin: true
  },
  {
    id: 'vidlink',
    name: 'VidLink',
    icon: '🔗',
    url: (tmdbId) => `https://vidlink.pro/movie/${tmdbId}`,
    hasLatin: true
  },
  {
    id: 'embedmaster',
    name: 'EmbedMaster',
    icon: '🎥',
    url: (tmdbId) => `https://embedmaster.link/movie/${tmdbId}`,
    hasLatin: false
  },
  {
    id: 'yapgrid',
    name: 'YapGrid',
    icon: '📺',
    url: (tmdbId) => `https://yapgrid.com/embed/movie/${tmdbId}`,
    hasLatin: true
  },
  {
    id: 'ezvid',
    name: 'EZVid',
    icon: '🎞️',
    url: (tmdbId) => `https://ezvidapi.com/embed/movie/${tmdbId}`,
    hasLatin: false
  }
];
