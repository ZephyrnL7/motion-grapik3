import React from 'react';
import {useCurrentFrame} from 'remotion';
import {BAND_Y, C, FONT, HEIGHT, SUB, SUB_FONT, SUB_LINE, WIDTH} from '../constants';
import {PAGES} from '../timing';

/** Subtitle per kata: pita navy tetap + maks. 2 baris, baris dipasang manual. */
export const Subtitle: React.FC = () => {
  const f = useCurrentFrame();
  const page = PAGES.find((p) => f >= p.from && f < p.to);
  return (
    <>
      <div style={{position: 'absolute', left: 0, top: BAND_Y, width: WIDTH, height: HEIGHT - BAND_Y, background: C.navy}} />
      <div style={{position: 'absolute', left: 0, top: BAND_Y, width: WIDTH, height: 8, background: C.red}} />
      {page?.lines.map((ln, li) => (
        <div
          key={li}
          style={{
            position: 'absolute',
            left: SUB.x,
            top: SUB.y + (SUB.h - page.lines.length * SUB_LINE) / 2 + li * SUB_LINE,
            width: SUB.w,
            height: SUB_LINE,
            lineHeight: `${SUB_LINE}px`,
            fontSize: SUB_FONT,
            fontWeight: 800,
            fontFamily: FONT,
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          {ln.map((w, wi) => {
            const active = f >= w.sf && f < w.ef;
            const done = f >= w.ef;
            return (
              <span key={wi} style={{color: active ? C.yellow : C.cream, opacity: done || active ? 1 : 0.5}}>
                {w.text}
                {wi < ln.length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </div>
      ))}
    </>
  );
};
