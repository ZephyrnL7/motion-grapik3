import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../constants';
import {wf} from '../timing';
import {SLOTS} from '../layout';
import {sp, ramp} from '../lib/anim';
import {BeatShell} from '../lib/BeatShell';
import {SeismoBg} from '../lib/SeismoBg';
import {Slot} from '../lib/Slot';
import {Earth, earthPoint} from '../lib/Earth';

const OMEGA = 2.6; // derajat per frame
const FREEZE_DEG = -60; // posisi titik saat bumi berhenti

export const Beat1Hook: React.FC = () => {
  const f = useCurrentFrame();
  const S = SLOTS.S1;
  const F = wf(0, 15); // bumi membeku tepat setelah kata "mendadak"
  const tf = f - F;
  const frozen = f >= F;
  const angle = FREEZE_DEG - OMEGA * F + OMEGA * Math.min(f, F);
  const eIn = sp(f, 6, {damping: 12, stiffness: 90});
  const showLabel = f >= wf(0, 6);
  const lab = sp(f, wf(0, 6), {damping: 10});
  const sh = frozen ? 16 * Math.exp(-tf / 7) * Math.sin(tf * 2.1) : 0;
  const amp = 6 + (frozen ? 60 * Math.exp(-tf / 9) : 0);
  const [px, py] = earthPoint(900, FREEZE_DEG);
  const pr = ramp(tf, 0, 20);

  return (
    <BeatShell f={f} bg={C.navy} first shake={[sh, sh * 0.4]}>
      <SeismoBg f={f} color={C.cream} amp={amp} opacity={0.22} />
      <Slot
        s={S}
        color={C.yellow}
        hidden={f < 6}
        transform={`scale(${0.2 + 0.8 * eIn})`}
        label={showLabel ? '1.600 km/jam' : undefined}
        labelScale={0.6 + 0.4 * lab}
      >
        <Earth
          size={900}
          angle={angle}
          fill={C.cream}
          ink={C.navy}
          land={C.teal}
          dot={C.red}
          trail={70}
          ghosts={3}
          detach={frozen ? tf : undefined}
        />
        {frozen && pr < 1 && (
          <svg width={900} height={900} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
            <circle cx={px} cy={py} r={pr * 240} fill="none" stroke={C.yellow} strokeWidth={14 * (1 - pr)} />
          </svg>
        )}
      </Slot>
    </BeatShell>
  );
};
