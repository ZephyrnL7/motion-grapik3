import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../constants';
import {wf} from '../timing';
import {SLOTS} from '../layout';
import {sp, ramp} from '../lib/anim';
import {BeatShell} from '../lib/BeatShell';
import {SeismoBg} from '../lib/SeismoBg';
import {Slot} from '../lib/Slot';

const gy = (x: number) => 640 - 110 * Math.sin((Math.PI * x) / 950); // permukaan tanah
const BUILD = [
  {x: 520, w: 70, h: 150},
  {x: 640, w: 70, h: 210},
  {x: 760, w: 70, h: 120},
  {x: 880, w: 60, h: 170},
];
const AIR = [
  {y: 170, v: 16},
  {y: 290, v: 13},
  {y: 410, v: 19},
];

export const Beat2Masalah: React.FC = () => {
  const f = useCurrentFrame();
  const S = SLOTS.S2;
  const enter = sp(f, 0, {damping: 16, stiffness: 90});
  const fast = 1 + 0.8 * ramp(f, wf(1, 17), wf(1, 17) + 10);
  const airIn = sp(f, wf(1, 10), {damping: 14});
  const seaIn = sp(f, wf(1, 11), {damping: 14});
  const bldIn = sp(f, wf(1, 13), {damping: 14});
  const swap = wf(1, 17);
  const label = f < wf(1, 6) ? undefined : f < swap ? 'Tanah diam' : 'Isi ngebut';

  const ground: string[] = [];
  const seaTop: string[] = [];
  const seaBot: string[] = [];
  for (let x = 0; x <= 950; x += 25) ground.push(`${x},${gy(x).toFixed(1)}`);
  for (let x = 0; x <= 400; x += 20) {
    seaTop.push(`${x},${(gy(x) - 46 + 8 * Math.sin(x / 28 - f * 0.3 * fast)).toFixed(1)}`);
    seaBot.unshift(`${x},${gy(x).toFixed(1)}`);
  }

  return (
    <BeatShell f={f} bg={C.cream}>
      <SeismoBg f={f} color={C.navy} amp={8} opacity={0.12} />
      <Slot
        s={S}
        color={C.navy}
        transform={`translateY(${(1 - enter) * 500}px)`}
        label={label}
        labelScale={f < swap ? 1 : 0.8 + 0.2 * sp(f, swap, {damping: 10})}
      >
        <svg width={950} height={860} viewBox="0 0 950 860">
          {/* tanah: diam, abu-abu (navy pudar), tanpa jejak */}
          <polygon points={`${ground.join(' ')} 950,860 0,860`} fill={C.navy} opacity={0.35} />
          <polyline points={ground.join(' ')} fill="none" stroke={C.navy} strokeWidth={10} />
          {/* laut */}
          <g transform={`translate(0 ${gy(200)}) scale(1 ${seaIn}) translate(0 ${-gy(200)})`}>
            <polygon points={[...seaTop, ...seaBot].join(' ')} fill={C.teal} />
            {[545, 562].map((y, k) => (
              <line
                key={y}
                x1={0}
                x2={400}
                y1={y}
                y2={y}
                stroke={C.cream}
                strokeWidth={5}
                strokeDasharray="60 40"
                strokeDashoffset={-f * (8 + k * 3) * fast}
              />
            ))}
          </g>
          {/* gedung: diam, tapi gema ganda merayap ke timur */}
          {BUILD.map((b, i) => {
            const base = gy(b.x + b.w / 2) + 10;
            return (
              <g key={i} transform={`translate(0 ${base}) scale(1 ${bldIn}) translate(0 ${-base})`}>
                {[0, 1].map((kk) => {
                  const o = (f * 3 * fast + kk * 30) % 60;
                  return (
                    <rect
                      key={kk}
                      x={b.x - o}
                      y={base - b.h - 10}
                      width={b.w}
                      height={b.h + 10}
                      fill="none"
                      stroke={C.red}
                      strokeWidth={4}
                      opacity={0.6 * (1 - o / 60)}
                    />
                  );
                })}
                <rect x={b.x} y={base - b.h - 10} width={b.w} height={b.h + 10} fill={C.navy} />
              </g>
            );
          })}
          {/* udara: panah teal ke timur dengan gema ganda */}
          {AIR.map((a, k) => {
            const x = ((f * a.v * fast + k * 420) % 1350) - 350;
            return (
              <g key={k} transform={`translate(0 ${a.y}) scale(${airIn} 1)`}>
                <g transform={`translate(${x} 0)`}>
                  <line x1={-200} y1={0} x2={0} y2={0} stroke={C.teal} strokeWidth={12} strokeLinecap="round" />
                  <polygon points="0,-22 38,0 0,22" fill={C.teal} />
                  <line x1={-420} y1={0} x2={-240} y2={0} stroke={C.teal} strokeWidth={10} strokeLinecap="round" opacity={0.5} />
                  <line x1={-640} y1={0} x2={-460} y2={0} stroke={C.teal} strokeWidth={8} strokeLinecap="round" opacity={0.25} />
                </g>
              </g>
            );
          })}
        </svg>
      </Slot>
    </BeatShell>
  );
};
