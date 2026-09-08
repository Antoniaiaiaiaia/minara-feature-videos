import {useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {flushSync} from 'react-dom';
import {Player,type PlayerRef} from '@remotion/player';
import {Sequence} from 'remotion';
import {TextSwap} from './text-swap';

declare global {interface Window {titleFrame?:number;titleReady?:boolean;setTitleFrame?:(frame:number)=>void}}
const text='Or find your fit.';
function Title(){return <>
  <Sequence from={1} durationInFrames={29}>
    <TextSwap fromText="" toText={text} transition="fly-through" unit="block"
      exitDuration={1} overlap={1} microDelay={0} enterDuration={16}
      fontSize={134} fontWeight={600} fontFamily="Geist" color="#151517"/>
  </Sequence>
  <Sequence from={30} durationInFrames={22}>
    <TextSwap fromText={text} toText="" transition="fly-through" unit="block"
      exitDuration={20} overlap={0} microDelay={0}
      fontSize={134} fontWeight={600} fontFamily="Geist" color="#151517"/>
  </Sequence>
</>}
function Preview(){
 const player=useRef<PlayerRef>(null);
 useEffect(()=>{
  window.setTitleFrame=frame=>flushSync(()=>player.current?.seekTo(Math.max(0,Math.min(230,frame))));
  player.current?.seekTo(window.titleFrame??0);window.titleReady=true;
  return ()=>{window.setTitleFrame=undefined;window.titleReady=false;};
 },[]);
 return <Player ref={player} component={Title} durationInFrames={231} fps={30}
   compositionWidth={1920} compositionHeight={1080} controls={false} clickToPlay={false}
   doubleClickToFullscreen={false} spaceKeyToPlayOrPause={false} style={{width:1920,height:1080}}/>;
}
createRoot(document.getElementById('title')!).render(<Preview/>);
