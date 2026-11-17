import React from 'react';
import {random, useCurrentFrame} from 'remotion';
import {C, FONT, WIDTH} from '../constants';
import {wf} from '../timing';
import {SLOTS, T6} from '../layout';
import {Easing, sp, ramp} from '../lib/anim';
import {BeatShell} from '../lib/BeatShell';
import {SeismoBg} from '../lib/SeismoBg';
import {Slot} from '../lib/Slot';
import {Earth} from '../lib/Earth';

const STARS = Array.from({length: 36}, (_, i) => ({
  x: random(`sx${i}`) * WIDTH,
  y: 120 + random(`sy${i}`) * 1250,
  r: 2 + random(`sr${i}`) * 3,
  v: 0.25 + random(`sv${i}`) * 0.5,
  c: random(`sc${i}`) > 0.8 ? C.yellow : C.cream,
}));
const SKY = [
  {x: 0, w: 90, h: 140},
  {x: 90, w: 70, h: 200},
  {x: 160, w: 110, h: 120},
  {x: 270, w: 80, h: 170},
  {x: 350, w: 100, h: 110},
  {x: 560, w: 90, h: 160},
  {x: 650, w: 70, h: 210},
  {x: 720, w: 110, h: 130},
  {x: 830, w: 120, h: 180},
];

export const Beat6Penutup: React.FC = () => {
  const f = useCurrentFrame();
  const E = SLOTS.S6E;
  const B = SLOTS.S6B;
  const Zs = wf(5, 8); // "kita tenang": kamera meninggalkan bumi
  const Bs = Zs + 16;
  const eIn = sp(f, 4, {damping: 12, stiffness: 90});
  const ex = ramp(f, Zs, Zs + 16, Easing.in(Easing.cubic));
  const earthOn = f < Zs + 17;
  const z = sp(f, Bs, {damping: 20, stiffness: 60});
  const iris = ramp(f, Bs, Bs + 22) * 1300;
  const tt = ramp(f, wf(5, 20), wf(5, 20) + 50, Easing.out(Easing.cubic));
  const sunY = 260 + f * 0.03;

  const steam = (s: number, dx: number) => {
    const pts: string[] = [];
    for (let y = 490; y >= 330; y -= 10) {
      const x = 478 + s * 14 + dx + 14 * Math.sin(y / 16 - f * 0.18 + s) + (490 - y) * 0.3;
      pts.push(`${x.toFixed(1)},${y}`);
    }
    return pts.join(' ');
  };

  return (
    <BeatShell f={f} bg={C.navy}>
      <SeismoBg f={f} color={C.cream} amp={0} opacity={0.18} />
      <svg width={WIDTH} height={1430} style={{position: 'absolute', left: 0, top: 0}}>
        {STARS.map((s, i) => (
          <circle key={i} cx={(s.x + f * s.v) % WIDTH} cy={s.y} r={s.r} fill={s.c} opacity={0.8} />
        ))}
      </svg>
      <Slot
        s={E}
        color={C.cream}
        hidden={!earthOn || f < 4}
        transform={`translateY(${-ex * 1300}px) scale(${(0.2 + 0.8 * eIn) * (1 + ex * 0.6)})`}
        label={f >= wf(5, 2) ? 'Terus berputar' : undefined}
        labelScale={0.6 + 0.4 * sp(f, wf(5, 2), {damping: 10})}
      >
        <Earth size={800} angle={40 + f * 0.5} fill={C.cream} ink={C.navy} land={C.teal} dot={C.red} trail={18} ghosts={1} />
      </Slot>
      <Slot s={B} color={C.cream} hidden={f < Bs} transform={`scale(${1.9 - 0.9 * z})`}>
        <div style={{width: 950, height: 860, clipPath: `circle(${iris}px at 475px 430px)`}}>
          <svg width={950} height={860} viewBox="0 0 950 860">
            <rect x={0} y={0} width={950} height={860} fill={C.cream} />
            <circle cx={700} cy={sunY} r={120} fill={C.yellow} />
            {SKY.map((b, i) => (
              <rect key={i} x={b.x} y={560 - b.h} width={b.w} height={b.h} fill={C.navy} />
            ))}
            {[430, 470, 510].map((y, k) => (
              <line key={y} x1={0} x2={950} y1={y} y2={y} stroke={C.red} strokeWidth={3} strokeDasharray="90 60" strokeDashoffset={-f * (6 + k * 2)} opacity={0.55} />
            ))}
            {/* gema ganda anak (ikut melaju) */}
            {[18, 36].map((d, i) => (
              <g key={d} opacity={0.35 - i * 0.17} stroke={C.red} strokeWidth={4} fill="none">
                <circle cx={330 - d} cy={450} r={50} />
                <rect x={285 - d} y={520} width={90} height={200} />
              </g>
            ))}
            <rect x={285} y={520} width={90} height={200} fill={C.teal} />
            <line x1={375} y1={590} x2={455} y2={545} stroke={C.teal} strokeWidth={24} strokeLinecap="round" />
            <circle cx={330} cy={450} r={50} fill={C.cream} stroke={C.navy} strokeWidth={8} />
            <path d="M280 448 A50 50 0 0 1 380 448 Z" fill={C.navy} />
            <line x1={308} y1={470} x2={322} y2={470} stroke={C.navy} strokeWidth={5} strokeLinecap="round" />
            <line x1={338} y1={470} x2={352} y2={470} stroke={C.navy} strokeWidth={5} strokeLinecap="round" />
            <rect x={445} y={500} width={64} height={54} fill={C.yellow} stroke={C.navy} strokeWidth={6} />
            {[0, 1, 2].map((s) => (
              <g key={s} fill="none" stroke={C.navy} strokeLinecap="round">
                <polyline points={steam(s, -32)} strokeWidth={4} opacity={0.12} />
                <polyline points={steam(s, -16)} strokeWidth={5} opacity={0.25} />
                <polyline points={steam(s, 0)} strokeWidth={6} opacity={0.5} />
              </g>
            ))}
            <rect x={0} y={560} width={950} height={16} fill={C.navy} />
            {Array.from({length: 19}, (_, k) => (
              <line key={k} x1={25 + k * 50} x2={25 + k * 50} y1={576} y2={720} stroke={C.navy} strokeWidth={8} />
            ))}
            <rect x={0} y={720} width={950} height={140} fill={C.navy} />
            <rect x={3} y={3} width={944} height={854} fill="none" stroke={C.red} strokeWidth={6} />
          </svg>
        </div>
      </Slot>
      {f >= wf(5, 20) && (
        <div
          style={{
            position: 'absolute',
            left: T6.x,
            top: T6.y,
            width: T6.w,
            height: T6.h,
            clipPath: `inset(0 ${(1 - tt) * 100}% 0 0)`,
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 96,
            lineHeight: '110px',
            textAlign: 'center',
            color: C.cream,
            whiteSpace: 'nowrap',
          }}
        >
          <div>Kita lagi ngebut</div>
          <div>sekarang</div>
        </div>
      )}
    </BeatShell>
  );
};
