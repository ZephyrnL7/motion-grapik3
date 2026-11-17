import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, HEIGHT, SWEEP, WIDTH} from '../constants';
import {Easing, ramp} from './anim';

const SLANT = 140;

/** Latar satu beat + sapuan garis miring (oranye) ke timur saat beat mulai. */
export const BeatShell: React.FC<{
  f: number;
  bg: string;
  first?: boolean;
  shake?: [number, number];
  children: React.ReactNode;
}> = ({f, bg, first, shake = [0, 0], children}) => {
  const p = first ? 1 : ramp(f, 0, SWEEP, Easing.out(Easing.cubic));
  const X = p * (WIDTH + SLANT);
  const poly = (o: number) =>
    p >= 1 ? undefined : `polygon(0px 0px, ${X + o + SLANT}px 0px, ${X + o}px ${HEIGHT}px, 0px ${HEIGHT}px)`;
  return (
    <>
      {p < 1 && <AbsoluteFill style={{background: C.red, clipPath: poly(26)}} />}
      <AbsoluteFill style={{clipPath: poly(0)}}>
        <AbsoluteFill style={{background: bg}} />
        <AbsoluteFill style={{transform: `translate(${shake[0]}px, ${shake[1]}px)`}}>{children}</AbsoluteFill>
      </AbsoluteFill>
    </>
  );
};
