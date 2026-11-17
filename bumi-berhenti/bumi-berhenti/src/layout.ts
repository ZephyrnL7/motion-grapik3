import {HEIGHT, MARGIN_X, MARGIN_Y, SUB, WIDTH} from './constants';

export type Box = {x: number; y: number; w: number; h: number};
export type SlotDef = {box: Box; obj: Box; label: Box};

const LABEL_H = 90;
const GAP = 10;

/** Slot = objek (x,y,w,objH) + label tepat di bawahnya, dalam satu wadah. */
export const slot = (x: number, y: number, w: number, objH: number): SlotDef => ({
  box: {x, y, w, h: objH + GAP + LABEL_H},
  obj: {x, y, w, h: objH},
  label: {x, y: y + objH + GAP, w, h: LABEL_H},
});

export const SLOTS = {
  S1: slot(90, 215, 900, 900), // beat 1: bumi
  S2: slot(65, 215, 950, 860), // beat 2: penampang bumi
  S3: slot(90, 215, 900, 900), // beat 3: bus -> bumi
  S4A: slot(65, 315, 550, 700), // beat 4: Kalimantan / Pontianak
  S4B: slot(705, 315, 310, 700), // beat 4: Jakarta
  S5: slot(65, 215, 950, 900), // beat 5: kota
  S6E: slot(140, 215, 800, 800), // beat 6: bumi tenang
  S6B: slot(65, 215, 950, 860), // beat 6: balkon (tanpa label, diganti judul)
};
export const T6: Box = {x: 65, y: 1095, w: 950, h: 240}; // teks penutup beat 6

/** Momen yang tampil bersamaan. Maks. 2 kotak; slot berdampingan wajib berjarak >= 8% lebar. */
export const MOMENTS: {name: string; boxes: Box[]}[] = [
  {name: 'B1 hook: bumi + label', boxes: [SLOTS.S1.box]},
  {name: 'B2 masalah: penampang + label', boxes: [SLOTS.S2.box]},
  {name: 'B3 inti: bus -> bumi (satu wadah)', boxes: [SLOTS.S3.box]},
  {name: 'B4 contoh: Pontianak + Jakarta', boxes: [SLOTS.S4A.box, SLOTS.S4B.box]},
  {name: 'B5 dampak: kota + label', boxes: [SLOTS.S5.box]},
  {name: 'B6a penutup: bumi + label', boxes: [SLOTS.S6E.box]},
  {name: 'B6b penutup: balkon + judul', boxes: [SLOTS.S6B.obj, T6]},
];

const inter = (a: Box, b: Box) =>
  a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

export const checkLayout = (): string[] => {
  const errs: string[] = [];
  const gapMin = WIDTH * 0.08;
  for (const m of MOMENTS) {
    if (m.boxes.length > 2) errs.push(`${m.name}: lebih dari 2 objek`);
    m.boxes.forEach((b, i) => {
      if (b.x < MARGIN_X || b.x + b.w > WIDTH - MARGIN_X || b.y < MARGIN_Y || b.y + b.h > HEIGHT - MARGIN_Y)
        errs.push(`${m.name}: kotak ${i} keluar margin aman`);
      if (inter(b, SUB)) errs.push(`${m.name}: kotak ${i} menimpa zona subtitle`);
      m.boxes.slice(i + 1).forEach((c, j) => {
        if (inter(b, c)) errs.push(`${m.name}: kotak ${i} dan ${i + 1 + j} tumpang tindih`);
        else if (b.y < c.y + c.h && c.y < b.y + b.h) {
          const gap = Math.max(c.x - (b.x + b.w), b.x - (c.x + c.w));
          if (gap < gapMin) errs.push(`${m.name}: jarak horizontal ${gap}px < ${gapMin}px`);
        }
      });
    });
  }
  return errs;
};
