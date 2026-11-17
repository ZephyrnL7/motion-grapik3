import React from 'react';
import {HEIGHT, WIDTH} from '../constants';

/** Latar garis seismograf: gelombang bergeser ke timur (kanan). amp = tegangan. */
export const SeismoBg: React.FC<{f: number; color: string; amp: number; speed?: number; opacity?: number}> = ({
  f,
  color,
  amp,
  speed = 3,
  opacity = 0.3,
}) => (
  <svg width={WIDTH} height={HEIGHT} style={{position: 'absolute', left: 0, top: 0}}>
    {Array.from({length: 9}, (_, k) => {
      const y0 = 110 + k * 150;
      const pts: string[] = [];
      for (let x = -20; x <= WIDTH + 20; x += 20) {
        const a = (x - f * speed * (1 + k * 0.12)) * 0.011 + k * 1.3;
        const n = Math.sin(a) * 0.6 + Math.sin(a * 2.3 + k) * 0.3 + Math.sin(a * 5.1 + k * 1.7) * 0.1;
        pts.push(`${x},${(y0 + amp * n).toFixed(1)}`);
      }
      return (
        <polyline key={k} points={pts.join(' ')} fill="none" stroke={color} strokeWidth={k % 3 === 0 ? 4 : 2.5} opacity={opacity} />
      );
    })}
  </svg>
);
