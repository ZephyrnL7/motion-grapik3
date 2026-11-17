import {Easing, interpolate, spring} from 'remotion';
import {FPS} from '../constants';

type Cfg = {damping?: number; stiffness?: number; mass?: number};

/** spring 0..1 yang mulai di frame `start` (0 sebelum itu). */
export const sp = (f: number, start: number, cfg: Cfg = {damping: 14}) =>
  f < start ? 0 : spring({frame: f - start, fps: FPS, config: cfg});

/** Rampa linear/ber-easing 0..1 dari frame a ke b (di-clamp). */
export const ramp = (f: number, a: number, b: number, easing?: (t: number) => number) =>
  interpolate(f, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing});

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
export {Easing};
