import React from 'react';
import {Composition} from 'remotion';
import {Bumi} from './Bumi';
import {DURATION, FPS, HEIGHT, WIDTH} from './constants';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Bumi"
    component={Bumi}
    durationInFrames={DURATION}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
