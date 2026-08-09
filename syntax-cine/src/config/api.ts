const encodedKey: number[] = [
  0x64, 0x62, 0x31, 0x61, 0x38, 0x32, 0x66, 0x39,
  0x61, 0x64, 0x63, 0x34, 0x66, 0x30, 0x63, 0x31,
  0x62, 0x66, 0x64, 0x37, 0x66, 0x64, 0x61, 0x36,
  0x34, 0x33, 0x34, 0x38, 0x61, 0x37, 0x32, 0x39
];

function decodeKey(arr: number[]): string {
  return arr.map(b => String.fromCharCode(b)).join('');
}

export const API_KEY: string = decodeKey(encodedKey);
export const API_BASE_URL = 'https://api.themoviedb.org/3';
export const IMG_BASE_URL = 'https://image.tmdb.org/t/p';
export const POSTER_SIZE = '/w500';
export const BACKDROP_SIZE = '/original';
export const PLACEHOLDER_IMG = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450"><rect fill="%23111827" width="300" height="450"/><text fill="%23475569" font-family="sans-serif" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em">Sin Imagen</text></svg>';
