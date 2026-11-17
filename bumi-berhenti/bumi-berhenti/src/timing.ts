import {AUDIO_OFFSET, DURATION, FPS, LEAD, SUB_MAX_CHARS, SWEEP} from './constants';
import {CUES} from './captions';

export const toFrame = (sec: number) => Math.max(0, Math.round((sec + AUDIO_OFFSET) * FPS));

export type Word = {text: string; start: number; end: number; sf: number; ef: number};

const letters = (w: string) => Math.max(1, w.replace(/[^\p{L}\p{N}]/gu, '').length);

// Waktu tiap kata: dibagi proporsional jumlah huruf di dalam frasa SRT-nya.
export const WORDS: Word[] = CUES.flatMap((cue) => {
  const toks = cue.text.split(/\s+/).filter(Boolean);
  const total = toks.reduce((a, t) => a + letters(t), 0);
  const dur = cue.end - cue.start;
  let acc = cue.start;
  return toks.map((t) => {
    const s = acc;
    acc += (dur * letters(t)) / total;
    return {text: t, start: s, end: acc, sf: toFrame(s), ef: toFrame(acc)};
  });
});

// Jumlah kata narasi per beat (Hook, Masalah, Inti, Contoh, Dampak, Penutup).
export const BEAT_WORDS = [18, 26, 20, 33, 31, 23];
if (BEAT_WORDS.reduce((a, b) => a + b, 0) !== WORDS.length) {
  throw new Error('BEAT_WORDS tidak cocok dengan jumlah kata di captions.ts');
}

// Durasi minimal = kata terakhir + 1 detik.
export const MIN_FRAMES = WORDS[WORDS.length - 1].ef + FPS;
if (MIN_FRAMES > DURATION) {
  throw new Error(`DURATION (${DURATION}) kurang dari minimal ${MIN_FRAMES} frame`);
}

const firsts: number[] = [];
{
  let s = 0;
  for (const n of BEAT_WORDS) {
    firsts.push(s);
    s += n;
  }
}

export const BEATS = firsts
  .map((gi, i) => ({gi, from: i === 0 ? 0 : Math.max(0, WORDS[gi].sf - LEAD)}))
  .map((b, i, a) => {
    const end = i === a.length - 1 ? DURATION : a[i + 1].from;
    // beat sebelumnya bertahan selama sapuan transisi beat berikutnya
    return {...b, end, duration: end - b.from + (i === a.length - 1 ? 0 : SWEEP)};
  });

/** Frame lokal (di dalam Sequence beat) saat kata ke-w di beat itu mulai diucapkan. */
export const wf = (beat: number, w: number) => WORDS[BEATS[beat].gi + w].sf - BEATS[beat].from;
/** Panjang beat (frame) tanpa sapuan. */
export const bdur = (beat: number) => BEATS[beat].end - BEATS[beat].from;

// ---- Halaman subtitle: maksimal 2 baris, dibungkus manual (bukan oleh browser)
export type Page = {from: number; to: number; lines: Word[][]};

const wrap = (ws: Word[]): Word[][] | null => {
  const lines: Word[][] = [[]];
  let len = 0;
  for (const w of ws) {
    const l = w.text.length;
    const cur = lines[lines.length - 1];
    if (cur.length === 0) {
      cur.push(w);
      len = l;
    } else if (len + 1 + l <= SUB_MAX_CHARS) {
      cur.push(w);
      len += 1 + l;
    } else {
      lines.push([w]);
      len = l;
      if (lines.length > 2) return null;
    }
  }
  return lines;
};

export const PAGES: Page[] = (() => {
  const out: Word[][] = [];
  let cur: Word[] = [];
  for (const w of WORDS) {
    if (cur.length > 0 && !wrap([...cur, w])) {
      out.push(cur);
      cur = [w];
    } else {
      cur = [...cur, w];
    }
    if (/[.?!]$/.test(w.text)) {
      out.push(cur);
      cur = [];
    }
  }
  if (cur.length) out.push(cur);
  return out.map((ws, i) => ({
    from: ws[0].sf,
    to: i < out.length - 1 ? out[i + 1][0].sf : ws[ws.length - 1].ef + Math.round(FPS / 2),
    lines: wrap(ws) as Word[][],
  }));
})();
