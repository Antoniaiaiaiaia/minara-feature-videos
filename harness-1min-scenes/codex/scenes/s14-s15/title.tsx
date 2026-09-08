import React, {useEffect, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {Player, type PlayerRef} from '@remotion/player';
import {Freeze, Sequence, useCurrentFrame} from 'remotion';
import {TextSwap} from './components/snap-cn/text-swap';

declare global {interface Window {setTitleFrame:(frame:number)=>void; titleFrame:number;}}
const headline=new URLSearchParams(window.location.search).get('title')==='autopilot'
  ? 'Autopilot, but under control' : 'Portfolio management, aligned.';
function TitleContent() {
  const text=headline;
  return <div style={{position:'absolute',left:0,top:470,width:1920,height:140}}>
    <Sequence from={0} durationInFrames={39}>
      <TextSwap fromText="" toText={text} exitDuration={1} enterDuration={16} overlap={1} microDelay={0} fontSize={100} fontWeight={400} color="#141416" fontFamily="Geist"/>
    </Sequence>
    <Sequence from={39} durationInFrames={16}>
      <TextSwap fromText={text} toText="" exitDuration={16} overlap={0} microDelay={0} fontSize={100} fontWeight={400} color="#141416" fontFamily="Geist"/>
    </Sequence>
  </div>;
}
function Title() {
  return <Freeze frame={useCurrentFrame()/2}><TitleContent/></Freeze>;
}
function Category({text,index}:{text:string;index:number}) {
  return <Sequence from={109+index*2}>
    <TextSwap className="category-copy" fromText="" toText={text} exitDuration={1} enterDuration={18} overlap={1} microDelay={0} fontSize={88} fontWeight={400} color="var(--label-color)" fontFamily="Geist"/>
  </Sequence>;
}
const players=new Map<string,{player:PlayerRef;frames:number}>();
window.setTitleFrame=frame=>players.forEach(({player,frames})=>player.seekTo(Math.max(0,Math.min(frames-1,frame))));
function Preview({text,index=0}:{text?:string;index?:number}) {
  const ref=useRef<PlayerRef>(null);
  useEffect(()=>{const key=text||'title';if(ref.current)players.set(key,{player:ref.current,frames:355});window.setTitleFrame(window.titleFrame||0);return ()=>{players.delete(key);};},[text]);
  if(text)return <Player ref={ref} component={Category} inputProps={{text,index}} durationInFrames={355} fps={30} compositionWidth={650} compositionHeight={128} controls={false} clickToPlay={false} style={{width:650,height:128}}/>;
  return <Player ref={ref} component={Title} durationInFrames={355} fps={30} compositionWidth={1920} compositionHeight={1080} controls={false} clickToPlay={false} style={{width:1920,height:1080}}/>;
}
document.getElementById('title')!.setAttribute('aria-label',headline);
createRoot(document.getElementById('title')!).render(<Preview/>);
['Spot','Perps','Strategies'].forEach((text,index)=>createRoot(document.getElementById(`category-${text}`)!).render(<Preview text={text} index={index}/>));
