// Semua angka tata letak dan waktu yang dipakai bersama.
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION = 2700; // 90 detik

// Geser sinkron (detik). Positif = visual & subtitle lebih lambat
// (pakai bila suara di narasi.mp3 terlambat dibanding SRT).
export const AUDIO_OFFSET = 0;

export const LEAD = 10; // frame: sapuan transisi mulai sebelum kata pertama beat
export const SWEEP = 14; // frame: lama sapuan garis antar beat

export const C = {
  cream: '#F2EBDD',
  navy: '#1F2A44',
  red: '#E4572E',
  yellow: '#F3A712',
  teal: '#3FA7A0',
} as const;

export const FONT = '"Segoe UI", "Helvetica Neue", Arial, sans-serif';

export const MARGIN_X = Math.round(WIDTH * 0.06); // 65
export const MARGIN_Y = Math.round(HEIGHT * 0.06); // 115
export const SUB_H = Math.round(HEIGHT * 0.18); // 346
export const SUB = {
  x: MARGIN_X,
  y: HEIGHT - MARGIN_Y - SUB_H, // 1459
  w: WIDTH - 2 * MARGIN_X,
  h: SUB_H,
};
export const BAND_Y = SUB.y - 20; // pita navy latar subtitle
export const SUB_FONT = 78; // >= 4% tinggi kanvas (76,8)
export const SUB_LINE = 96;
export const SUB_MAX_CHARS = 19; // 19 x 0,6 x 78 = 889 px < 950 px
