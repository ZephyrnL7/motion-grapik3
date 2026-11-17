import React from 'react';
import {Easing} from 'remotion';

const rad = (d: number) => (d * Math.PI) / 180;

/** Titik di khatulistiwa (tepi bumi) pada sudut `deg`, koordinat lokal svg. */
export const earthPoint = (size: number, deg: number): [number, number] => {
  const c = size / 2;
  const R = size * 0.36;
  return [c + R * Math.cos(rad(deg)), c - R * Math.sin(rad(deg))];
};

type P = {
  size: number;
  angle: number; // derajat, berlawanan jarum jam (ke timur)
  fill: string;
  ink: string;
  land: string;
  dot: string;
  trail?: number; // panjang jejak (derajat)
  ghosts?: number; // jumlah gema titik
  detach?: number; // frame sejak berhenti; undefined = jejak masih menempel
};

const LAND = [
  [20, 0.55, 0.3, 0.18],
  [140, 0.5, 0.34, 0.2],
  [250, 0.58, 0.26, 0.16],
];

export const Earth: React.FC<P> = ({size, angle, fill, ink, land, dot, trail = 0, ghosts = 0, detach}) => {
  const c = size / 2;
  const R = size * 0.36;
  const d = detach === undefined ? 0 : 1800 * Easing.in(Easing.cubic)(Math.min(Math.max(detach, 0) / 24, 1));
  const tx = -Math.sin(rad(angle));
  const ty = -Math.cos(rad(angle));
  const pts: string[] = [];
  for (let k = 0; k <= 14; k++) {
    const [x, y] = earthPoint(size, angle - trail + (trail * k) / 14);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const [dx, dy] = earthPoint(size, angle);
  const r = size * 0.03;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{overflow: 'visible'}}>
      <circle cx={c} cy={c} r={c - 3} fill="none" stroke={ink} strokeWidth={2.5} strokeDasharray="8 12" opacity={0.6} />
      <circle cx={c} cy={c} r={R} fill={fill} stroke={ink} strokeWidth={6} />
      <g transform={`rotate(${-angle} ${c} ${c})`}>
        {[0.33, 0.66].map((k) => (
          <circle key={k} cx={c} cy={c} r={R * k} fill="none" stroke={ink} strokeWidth={2} opacity={0.3} />
        ))}
        {Array.from({length: 12}, (_, k) => (
          <line
            key={k}
            x1={c}
            y1={c}
            x2={c + R * Math.cos(rad(k * 30))}
            y2={c - R * Math.sin(rad(k * 30))}
            stroke={ink}
            strokeWidth={2}
            opacity={0.3}
          />
        ))}
        {LAND.map(([a, rr, rx, ry], k) => (
          <ellipse
            key={k}
            cx={c + R * rr * Math.cos(rad(a))}
            cy={c - R * rr * Math.sin(rad(a))}
            rx={R * rx}
            ry={R * ry}
            fill={land}
          />
        ))}
      </g>
      {trail > 0 && (
        <g transform={`translate(${tx * d} ${ty * d})`}>
          <polyline points={pts.join(' ')} fill="none" stroke={dot} strokeWidth={size * 0.014} strokeLinecap="round" opacity={0.75} />
        </g>
      )}
      {Array.from({length: ghosts}, (_, k) => {
        const [gx, gy] = earthPoint(size, angle - ((k + 1) * trail) / (ghosts + 1));
        const o = d * (1 + k * 0.25);
        return <circle key={k} cx={gx + tx * o} cy={gy + ty * o} r={r} fill={dot} opacity={0.55 - k * 0.15} />;
      })}
      <circle cx={dx} cy={dy} r={r * 1.9} fill="none" stroke={dot} strokeWidth={3} opacity={0.4} />
      <circle cx={dx} cy={dy} r={r} fill={dot} />
    </svg>
  );
};
