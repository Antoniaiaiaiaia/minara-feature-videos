import React, {useEffect, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {Player, type PlayerRef} from '@remotion/player';
import {Sequence} from 'remotion';
import {TextSwap, TRANSITION_MOTION, TRANSITION_DEFAULTS} from './components/snap-cn/text-swap';
import {shotBScale, heat, wordBirth} from './components/snap-cn/answer-stream';
import {easings} from './lib/snap-cn-ui';

const TITLE = 'Beyond finance.';
function Title() {
  return <div style={{position:'relative',width:1920,height:1080}}>
    <Sequence from={0} durationInFrames={42} layout="none">
      <TextSwap fromText="" toText={TITLE} transition="fly-through" exitDuration={1} enterDuration={16} overlap={1} microDelay={0} fontFamily="Geist" fontSize={138} fontWeight={600} color="#0a0a0b" />
    </Sequence>
    <Sequence from={42} durationInFrames={13} layout="none">
      <TextSwap fromText={TITLE} toText="" transition="fly-through" exitDuration={13} enterDuration={1} fontFamily="Geist" fontSize={138} fontWeight={600} color="#0a0a0b" />
    </Sequence>
  </div>;
}
function Preview() {
  const ref = useRef<PlayerRef>(null);
  useEffect(() => {
    Object.assign(window, {
      snapAnswer: {shotBScale, heat, wordBirth, easings},
      snapText: {motion:TRANSITION_MOTION['fly-through'],defaults:TRANSITION_DEFAULTS['fly-through']},
      BeyondTitle: {ready:true, seek:(f:number)=>ref.current?.seekTo(Math.min(54, Math.max(0,Math.round(f))))},
    });
  }, []);
  return <Player ref={ref} component={Title} durationInFrames={55} fps={30} compositionWidth={1920} compositionHeight={1080} controls={false} clickToPlay={false} autoPlay={false} style={{width:1920,height:1080}} />;
}
createRoot(document.getElementById('headline-root')!).render(<Preview />);
