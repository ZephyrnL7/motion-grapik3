import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../constants';
import {bdur, wf} from '../timing';
import {SLOTS} from '../layout';
import {Easing, sp, ramp} from '../lib/anim';
import {BeatShell} from '../lib/BeatShell';
import {SeismoBg} from '../lib/SeismoBg';
import {Slot} from '../lib/Slot';
import {Tree} from '../lib/Icons';

const GY = 720;
const BLD = [
  {x: 90, h: 360},
  {x: 250, h: 250},
  {x: 410, h: 420},
  {x: 570, h: 300},
  {x: 730, h: 380},
];
const TREES = [
  {x: 45, s: 1},
  {x: 230, s: 0.7},
  {x: 895, s: 1},
];
const WIND = [
  {y: 110, v: 26},
  {y: 215, v: 32},
  {y: 320, v: 24},
  {y: 425, v: 30},
  {y: 520, v: 28},
  {y: 610, v: 34},
  {y: 680, v: 22},
];

export const Beat5Dampak: React.FC = () => {
  const f = useCurrentFrame();
  const S = SLOTS.S5;
  const enter = sp(f, 4, {damping: 16, stiffness: 90});
  const bumps = [
    {t: wf(4, 14), a: 26},
    {t: wf(4, 17), a: 22},
    {t: wf(4, 23), a: 18},
  ];
  const calm = 1 - ramp(f, wf(4, 25), wf(4, 28));
  let env = 0;
  for (const b of bumps) if (f >= b.t) env += b.a * Math.exp(-(f - b.t) / 10);
  const sh = (5 * Math.sin(f * 1.9) + env * Math.sin(f * 2.3)) * calm;
  const amp = (10 + 3 * env) * calm * (1 - ramp(f, bdur(4) - 40, bdur(4)));

  const wp = sp(f, wf(4, 10), {damping: 12, stiffness: 50});
  const front = -100 + 740 * wp + (wp > 0.1 ? 12 * Math.sin(f * 0.5) : 0);
  const waveTop = `M -200 340 Q ${front - 300} 230 ${front - 120} 320 Q ${front + 20} 400 ${front} 540`;

  return (
    <BeatShell f={f} bg={C.navy} shake={[sh, sh * 0.5]}>
      <SeismoBg f={f} color={C.cream} amp={amp} opacity={0.2} />
      <Slot
        s={S}
        color={C.cream}
        transform={`translateY(${(1 - enter) * 600}px)`}
        label={f >= wf(4, 6) ? 'Ratusan km/jam' : undefined}
        labelScale={0.6 + 0.4 * sp(f, wf(4, 6), {damping: 10})}
      >
        <svg width={950} height={900} viewBox="0 0 950 900">
          {/* tanah dan kepingan yang terkelupas */}
          <rect x={0} y={GY + 40} width={950} height={140} fill={C.cream} />
          {Array.from({length: 6}, (_, i) => {
            const q = ramp(f, wf(4, 23) + i * 3, wf(4, 23) + i * 3 + 30, Easing.out(Easing.quad));
            return (
              <rect
                key={i}
                x={i * 158 + 2}
                y={GY}
                width={154}
                height={42}
                fill={C.cream}
                transform={`translate(${q * (60 + i * 40)} ${-q * (120 + i * 20)}) rotate(${q * (15 + i * 6) * (i % 2 ? 1 : -1)} ${i * 158 + 79} ${GY + 21})`}
              />
            );
          })}
          {/* gedung: roboh ke timur */}
          {BLD.map((b, i) => {
            const k = sp(f, wf(4, 17) + i * 4, {damping: 9, stiffness: 90});
            return (
              <g key={i} transform={`translate(0 ${20 * k}) rotate(${82 * k} ${b.x + 120} ${GY})`}>
                <rect x={b.x} y={GY - b.h} width={120} height={b.h} fill={C.cream} />
                {Array.from({length: Math.floor(b.h / 70)}, (_, r) => (
                  <line key={r} x1={b.x + 16} x2={b.x + 104} y1={GY - 50 - r * 70} y2={GY - 50 - r * 70} stroke={C.navy} strokeWidth={8} />
                ))}
              </g>
            );
          })}
          {/* pohon: tercabut dan terbang */}
          {TREES.map((t, i) => {
            const t0 = wf(4, 19) + i * 5;
            const q = ramp(f, t0, t0 + 40, Easing.in(Easing.quad));
            const wob = f >= wf(4, 2) && q === 0 ? 5 * Math.sin(f * 0.8 + i) : 0;
            const x = t.x + q * 1100;
            const y = GY - q * 380;
            return (
              <g key={i}>
                {q > 0 && <line x1={x - 220 * q - 40} y1={y - 30} x2={x - 40} y2={y - 30} stroke={C.red} strokeWidth={7} strokeLinecap="round" />}
                <g transform={`rotate(${q * 720 + wob} ${x} ${y})`}>
                  <Tree x={x} y={y} s={t.s} />
                </g>
              </g>
            );
          })}
          {/* gelombang teal naik dari kiri */}
          {wp > 0.001 && (
            <g>
              <path d={`M -200 900 L -200 340 Q ${front - 300} 230 ${front - 120} 320 Q ${front + 20} 400 ${front} 540 L ${front + 30} 720 L ${front} 900 Z`} fill={C.teal} />
              <path d={waveTop} fill="none" stroke={C.cream} strokeWidth={8} strokeLinecap="round" />
            </g>
          )}
          {/* angin: garis tebal ke timur dengan gema ganda */}
          {WIND.map((w, k) => {
            const x = ((f * w.v + k * 190) % 1400) - 450;
            const s = sp(f, 0, {damping: 20, stiffness: 60});
            return (
              <g key={k} transform={`translate(0 ${w.y}) scale(${s} 1)`}>
                <g transform={`translate(${x} 0)`}>
                  <line x1={-260} y1={0} x2={0} y2={0} stroke={C.cream} strokeWidth={14} strokeLinecap="round" />
                  <line x1={-560} y1={0} x2={-380} y2={0} stroke={C.cream} strokeWidth={10} strokeLinecap="round" opacity={0.45} />
                  <line x1={-820} y1={0} x2={-640} y2={0} stroke={C.cream} strokeWidth={8} strokeLinecap="round" opacity={0.25} />
                </g>
              </g>
            );
          })}
        </svg>
      </Slot>
    </BeatShell>
  );
};
