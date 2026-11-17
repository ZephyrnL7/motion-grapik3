import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../constants';
import {wf} from '../timing';
import {SLOTS} from '../layout';
import {Easing, sp, ramp, clamp} from '../lib/anim';
import {BeatShell} from '../lib/BeatShell';
import {SeismoBg} from '../lib/SeismoBg';
import {Slot} from '../lib/Slot';
import {Earth} from '../lib/Earth';
import {House, Tree} from '../lib/Icons';

const CX = 450; // pusat bus / bumi di dalam slot 900 x 900
const CY = 425;
const R = 760 * 0.36;
const THROW = [
  {a: 100, k: 'house', d: 0},
  {a: 88, k: 'tree', d: 6},
  {a: 76, k: 'house', d: 12},
];

export const Beat3Inti: React.FC = () => {
  const f = useCurrentFrame();
  const S = SLOTS.S3;
  const Fb = wf(2, 5); // "ngerem"
  const Mf = wf(2, 16); // "Bedanya" -> bus mengecil jadi bumi
  const Tt = wf(2, 17);
  const enter = sp(f, 0, {damping: 15, stiffness: 90});
  const bx = -820 + 920 * enter;
  const jolt = sp(f, Fb, {damping: 6, stiffness: 140});
  const lean = 34 * jolt;
  const dx = 18 * jolt;
  const t = clamp(f - Fb, 0, 14);
  const road = 40 * Math.min(f, Fb) + 40 * (t - (t * t) / 28);
  const lineLen = 150 * (f < Fb ? 1 : Math.max(0, 1 - (f - Fb) / 6));
  const p = sp(f, Mf, {damping: 18, stiffness: 80});
  const busS = 1 - 0.88 * p;
  const earthS = 0.12 + 0.88 * p;
  const cx = bx + dx + 350;

  return (
    <BeatShell f={f} bg={C.cream}>
      <SeismoBg f={f} color={C.navy} amp={8} opacity={0.12} />
      <Slot s={S} color={C.navy} label={f >= wf(2, 7) ? 'Inersia' : undefined} labelScale={0.6 + 0.4 * sp(f, wf(2, 7), {damping: 10})}>
        <svg width={900} height={900} viewBox="0 0 900 900" style={{position: 'absolute', left: 0, top: 0}}>
          {p < 0.6 && (
            <g opacity={1 - p / 0.6}>
              <rect x={0} y={598} width={900} height={62} fill={C.navy} />
              {Array.from({length: 8}, (_, k) => (
                <rect key={k} x={((k * 130 - road) % 1040 + 1040) % 1040 - 100} y={626} width={70} height={8} fill={C.yellow} />
              ))}
            </g>
          )}
          {p < 0.985 && (
            <g transform={`translate(${cx} ${CY}) rotate(${p * 300}) scale(${busS}) translate(-350 -125)`}>
              {[30, 90, 150, 210].map((y) => (
                <line key={y} x1={-20 - lineLen} y1={y} x2={-20} y2={y} stroke={C.red} strokeWidth={8} strokeLinecap="round" opacity={lineLen > 1 ? 0.85 : 0} />
              ))}
              <g transform={`rotate(${3 * jolt} 350 250)`}>
                <rect x={0} y={0} width={700} height={250} fill={C.yellow} stroke={C.navy} strokeWidth={8} />
                {[0, 1, 2, 3].map((k) => (
                  <rect key={k} x={40 + k * 150} y={40} width={120} height={80} fill={C.cream} stroke={C.navy} strokeWidth={5} />
                ))}
                {[0, 1, 2].map((k) => {
                  const px = 100 + k * 150;
                  return (
                    <g key={k}>
                      {[0.66, 0.33].map((m, j) => (
                        <g key={j} transform={`rotate(${lean * m} ${px} 170)`} opacity={0.4 - j * 0.15}>
                          <circle cx={px} cy={70} r={22} fill="none" stroke={C.red} strokeWidth={4} />
                          <line x1={px} y1={96} x2={px} y2={160} stroke={C.red} strokeWidth={4} />
                        </g>
                      ))}
                      <g transform={`rotate(${lean} ${px} 170)`}>
                        <circle cx={px} cy={70} r={22} fill={C.navy} />
                        <line x1={px} y1={96} x2={px} y2={160} stroke={C.navy} strokeWidth={22} strokeLinecap="round" />
                      </g>
                    </g>
                  );
                })}
                <rect x={600} y={140} width={60} height={110} fill={C.cream} stroke={C.navy} strokeWidth={5} />
                {[150, 550].map((wx) => (
                  <g key={wx}>
                    <circle cx={wx} cy={250} r={48} fill={C.navy} />
                    <circle cx={wx} cy={250} r={18} fill={C.cream} />
                  </g>
                ))}
              </g>
            </g>
          )}
        </svg>
        {p > 0.02 && (
          <div style={{position: 'absolute', left: CX - 380, top: CY - 380, width: 760, height: 760, transform: `scale(${earthS})`}}>
            <Earth size={760} angle={f * 0.6} fill={C.navy} ink={C.cream} land={C.teal} dot={C.red} />
          </div>
        )}
        {p > 0.9 && (
          <svg width={900} height={900} viewBox="0 0 900 900" style={{position: 'absolute', left: 0, top: 0, overflow: 'hidden'}}>
            {THROW.map((it, i) => {
              const q = ramp(f, Tt + it.d, Tt + it.d + 36, Easing.in(Easing.quad));
              const x0 = CX + (R + 4) * Math.cos((it.a * Math.PI) / 180);
              const y0 = CY - (R + 4) * Math.sin((it.a * Math.PI) / 180);
              const x = x0 + q * 1000;
              const y = y0 - q * 60;
              const Icon = it.k === 'house' ? House : Tree;
              return (
                <g key={i}>
                  {q > 0 && (
                    <>
                      <line x1={x - 160 * q - 40} y1={y - 22} x2={x - 50} y2={y - 22} stroke={C.red} strokeWidth={7} strokeLinecap="round" />
                      <Icon x={x - 60 * q} y={y} s={0.9} ghost o={0.5} />
                    </>
                  )}
                  <Icon x={x} y={y} s={0.9} />
                </g>
              );
            })}
          </svg>
        )}
      </Slot>
    </BeatShell>
  );
};
