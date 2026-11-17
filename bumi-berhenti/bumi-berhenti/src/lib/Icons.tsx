import React from 'react';
import {C} from '../constants';

type IP = {x: number; y: number; s?: number; ghost?: boolean; o?: number};
const g = ({x, y, s = 1, o = 1}: IP) => ({transform: `translate(${x} ${y}) scale(${s})`, opacity: o});
const gs = (ghost: boolean | undefined, fill: string) =>
  ghost ? {fill: 'none', stroke: C.red, strokeWidth: 4} : {fill};

export const House: React.FC<IP> = (p) => (
  <g {...g(p)}>
    <rect x={-30} y={-34} width={60} height={34} {...gs(p.ghost, C.navy)} />
    <polygon points="-40,-34 0,-68 40,-34" {...gs(p.ghost, C.red)} />
    {!p.ghost && <rect x={-7} y={-20} width={14} height={20} fill={C.cream} />}
  </g>
);

export const Tree: React.FC<IP> = (p) => (
  <g {...g(p)}>
    <rect x={-5} y={-30} width={10} height={30} {...gs(p.ghost, C.navy)} />
    <circle cx={0} cy={-48} r={24} {...gs(p.ghost, C.teal)} />
  </g>
);

export const Person: React.FC<IP> = (p) => {
  const st = p.ghost ? C.red : C.navy;
  return (
    <g {...g(p)} stroke={st} strokeLinecap="round" fill="none">
      <circle cx={0} cy={-58} r={10} fill={p.ghost ? 'none' : C.navy} strokeWidth={p.ghost ? 4 : 0} />
      <line x1={0} y1={-46} x2={0} y2={-20} strokeWidth={16} />
      <line x1={0} y1={-20} x2={-8} y2={0} strokeWidth={7} />
      <line x1={0} y1={-20} x2={8} y2={0} strokeWidth={7} />
    </g>
  );
};

export const Motor: React.FC<IP> = (p) => {
  const st = p.ghost ? C.red : C.navy;
  return (
    <g {...g(p)} stroke={st} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx={-26} cy={-14} r={13} strokeWidth={5} />
      <circle cx={26} cy={-14} r={13} strokeWidth={5} />
      <polyline points="-26,-14 -4,-34 18,-34 26,-14" strokeWidth={7} />
      <line x1={-12} y1={-42} x2={10} y2={-42} strokeWidth={8} />
    </g>
  );
};
