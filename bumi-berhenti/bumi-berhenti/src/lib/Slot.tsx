import React from 'react';
import {FONT} from '../constants';
import type {SlotDef} from '../layout';

/** Wadah objek + label. Label menempel (satu wadah), maks. 2 kata, lebar = lebar slot. */
export const Slot: React.FC<{
  s: SlotDef;
  label?: string;
  color: string;
  transform?: string;
  hidden?: boolean;
  labelScale?: number;
  children: React.ReactNode;
}> = ({s, label, color, transform, hidden, labelScale = 1, children}) => {
  if (label && label.trim().split(/\s+/).length > 2) throw new Error(`Label > 2 kata: ${label}`);
  const {box, obj, label: lb} = s;
  return (
    <div
      style={{
        position: 'absolute',
        left: box.x,
        top: box.y,
        width: box.w,
        height: box.h,
        transform,
        visibility: hidden ? 'hidden' : 'visible',
      }}
    >
      <div style={{position: 'absolute', left: 0, top: 0, width: obj.w, height: obj.h}}>{children}</div>
      {label && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: lb.y - box.y,
            width: lb.w,
            height: lb.h,
            lineHeight: `${lb.h}px`,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 60,
            color,
            transform: `scale(${labelScale})`,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
