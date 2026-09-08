import React, {useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {Player,type PlayerRef} from '@remotion/player';
import {Sequence} from 'remotion';
import {TextSwap,TRANSITION_MOTION,TRANSITION_DEFAULTS} from '../s16-s17-beyond-finance/title/components/snap-cn/text-swap';
import {shotBScale,wordBirth,heat} from '../s16-s17-beyond-finance/title/components/snap-cn/answer-stream';
function Opening(){return <><Sequence from={0} durationInFrames={42} layout="none"><TextSwap fromText="" toText="Beyond finance." transition="fly-through" exitDuration={1} enterDuration={16} overlap={1} microDelay={0} fontFamily="Geist" fontSize={138} fontWeight={400} color="#0a0a0b"/></Sequence><Sequence from={42} durationInFrames={13} layout="none"><TextSwap fromText="Beyond finance." toText="" transition="fly-through" exitDuration={13} enterDuration={1} fontFamily="Geist" fontSize={138} fontWeight={400} color="#0a0a0b"/></Sequence></>;}
function Computer(){return <TextSwap fromText="" toText="Computer use." transition="fly-through" exitDuration={1} enterDuration={23} overlap={1} microDelay={0} fontFamily="Geist" fontSize={86} fontWeight={600} color="#15171a"/>;}
function Preview({heading=false}:{heading?:boolean}){const ref=useRef<PlayerRef>(null);useEffect(()=>{Object.assign(window,{snapAnswer:{shotBScale,wordBirth,heat},snapText:{motion:TRANSITION_MOTION['fly-through'],defaults:TRANSITION_DEFAULTS['fly-through']},[heading?'ComputerTitle':'BeyondTitle']:{ready:true,seek:(frame:number)=>ref.current?.seekTo(Math.max(0,Math.min(heading?209:54,Math.round(frame))))}});},[]);return <Player ref={ref} component={heading?Computer:Opening} durationInFrames={heading?210:55} fps={30} compositionWidth={1920} compositionHeight={heading?200:1080} controls={false} clickToPlay={false} autoPlay={false} style={{width:1920,height:heading?200:1080}}/>;}
createRoot(document.getElementById('headline-root')!).render(<Preview/>);
createRoot(document.getElementById('computer-heading')!).render(<Preview heading/>);
