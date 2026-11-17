import React from 'react';
import {AbsoluteFill, Sequence, staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import {C, FONT} from './constants';
import {BEATS} from './timing';
import {Subtitle} from './lib/Subtitle';
import {Beat1Hook} from './beats/Beat1Hook';
import {Beat2Masalah} from './beats/Beat2Masalah';
import {Beat3Inti} from './beats/Beat3Inti';
import {Beat4Contoh} from './beats/Beat4Contoh';
import {Beat5Dampak} from './beats/Beat5Dampak';
import {Beat6Penutup} from './beats/Beat6Penutup';

const COMPONENTS = [Beat1Hook, Beat2Masalah, Beat3Inti, Beat4Contoh, Beat5Dampak, Beat6Penutup];

export const Bumi: React.FC = () => (
  <AbsoluteFill style={{background: C.navy, fontFamily: FONT}}>
    {BEATS.map((b, i) => {
      const Beat = COMPONENTS[i];
      return (
        <Sequence key={i} from={b.from} durationInFrames={b.duration} name={`Beat ${i + 1}`}>
          <Beat />
        </Sequence>
      );
    })}
    <Subtitle />
    <Audio src={staticFile('narasi.mp3')} />
  </AbsoluteFill>
);
