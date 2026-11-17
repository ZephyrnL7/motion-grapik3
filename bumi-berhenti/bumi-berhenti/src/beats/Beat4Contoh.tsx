import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../constants';
import {wf} from '../timing';
import {SLOTS} from '../layout';
import {sp, ramp} from '../lib/anim';
import {BeatShell} from '../lib/BeatShell';
import {SeismoBg} from '../lib/SeismoBg';
import {Slot} from '../lib/Slot';
import {House, Motor, Person} from '../lib/Icons';

const PERIOD = 60;
const ICONS = [
  {Icon: House, w: 14, off: 0},
  {Icon: Motor, w: 15, off: 20},
  {Icon: Person, w: 17, off: 40},
];

/** Satu ikon bergeser ke timur dengan gema ganda; kembali ke awal tiap PERIOD frame. */
const Mover: React.FC<{
  f: number;
  start: number;
  x0: number;
  x1: number;
  y: number;
  off: number;
  Icon: React.FC<{x: number; y: number; s?: number; ghost?: boolean; o?: number}>;
}> = ({f, start, x0, x1, y, off, Icon}) => {
  if (f < start) return null;
  const q = Math.pow((((f - start + off) % PERIOD) + PERIOD) % PERIOD / PERIOD, 1.4);
  const x = x0 + q * (x1 - x0);
  return (
    <g>
      <line x1={x - 120 * q - 30} y1={y - 24} x2={x - 40} y2={y - 24} stroke={C.red} strokeWidth={6} strokeLinecap="round" />
      <Icon x={x - 50 * q} y={y} ghost o={0.5} />
      <Icon x={x - 100 * q} y={y} ghost o={0.25} />
      <Icon x={x} y={y} />
    </g>
  );
};

const Arrow: React.FC<{x0: number; x1: number; y: number; k: number}> = ({x0, x1, y, k}) => (
  <g transform={`translate(${x0} ${y}) scale(${k} 1)`}>
    <line x1={0} y1={0} x2={x1 - x0 - 30} y2={0} stroke={C.red} strokeWidth={14} strokeLinecap="round" />
    <polygon points={`${x1 - x0 - 34},-26 ${x1 - x0 + 6},0 ${x1 - x0 - 34},26`} fill={C.red} />
  </g>
);

export const Beat4Contoh: React.FC = () => {
  const f = useCurrentFrame();
  const A = SLOTS.S4A;
  const B = SLOTS.S4B;
  const inA = sp(f, 6, {damping: 16, stiffness: 90});
  const inB = sp(f, wf(3, 24), {damping: 16, stiffness: 90});
  const eq = ramp(f, wf(3, 4), wf(3, 4) + 14);
  const pulse = sp(f, wf(3, 1), {damping: 8});
  const arrA = sp(f, wf(3, 8), {damping: 18});
  const arrB = sp(f, wf(3, 26), {damping: 18});

  return (
    <BeatShell f={f} bg={C.cream}>
      <SeismoBg f={f} color={C.navy} amp={8} opacity={0.12} />
      <Slot
        s={A}
        color={C.navy}
        transform={`translateX(${-(1 - inA) * 700}px)`}
        label={f >= wf(3, 10) ? '460 m/detik' : undefined}
        labelScale={0.6 + 0.4 * sp(f, wf(3, 10), {damping: 10})}
      >
        <svg width={550} height={700} viewBox="0 0 550 700">
          <path
            d="M110 140 L250 90 L380 120 L470 210 L500 330 L440 470 L330 560 L220 540 L120 450 L80 300 Z"
            fill={C.navy}
            fillOpacity={0.15}
            stroke={C.navy}
            strokeWidth={6}
            strokeLinejoin="round"
          />
          <line x1={0} y1={350} x2={550 * eq} y2={350} stroke={C.red} strokeWidth={4} strokeDasharray="14 10" />
          <Arrow x0={110} x1={500} y={200} k={arrA} />
          {ICONS.map((it, i) => (
            <Mover key={i} f={f} start={wf(3, it.w)} x0={130} x1={520} y={335} off={it.off} Icon={it.Icon} />
          ))}
          <circle cx={93} cy={350} r={16 + 14 * (1 - pulse) * 0} fill={C.red} />
          <circle cx={93} cy={350} r={16 + 22 * pulse} fill="none" stroke={C.red} strokeWidth={4} opacity={Math.max(0, 1 - pulse * 0.6)} />
          <text x={110} y={420} fontFamily="Segoe UI, Arial, sans-serif" fontWeight={800} fontSize={40} fill={C.navy}>
            Pontianak
          </text>
        </svg>
      </Slot>
      {f >= wf(3, 24) && (
        <Slot
          s={B}
          color={C.navy}
          transform={`translateX(${(1 - inB) * 500}px)`}
          label={f >= wf(3, 25) ? 'Jakarta' : undefined}
          labelScale={0.6 + 0.4 * sp(f, wf(3, 25), {damping: 10})}
        >
          <svg width={310} height={700} viewBox="0 0 310 700">
            <line x1={0} y1={350} x2={310} y2={350} stroke={C.red} strokeWidth={4} strokeDasharray="14 10" />
            <polygon
              points="20,470 80,440 170,445 260,430 295,455 250,490 130,500 40,500"
              fill={C.navy}
              fillOpacity={0.15}
              stroke={C.navy}
              strokeWidth={6}
              strokeLinejoin="round"
            />
            <Arrow x0={70} x1={250} y={300} k={arrB} />
            <Mover f={f} start={wf(3, 26)} x0={70} x1={250} y={435} off={0} Icon={House} />
            <circle cx={70} cy={470} r={16} fill={C.yellow} stroke={C.navy} strokeWidth={5} />
          </svg>
        </Slot>
      )}
    </BeatShell>
  );
};
