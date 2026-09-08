import React, {useRef, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player, type PlayerRef} from '@remotion/player';
import {Sequence} from 'remotion';
import {AgentSteps} from './agent-steps';
import {TRANSITION_EASINGS, TRANSITION_MOTION} from './text-swap';
import {TextBuild} from './text-build';

declare global {
  interface Window { setAgentFrame?: (frame: number) => void; agentFrame?: number; setAgentQuery?: (text: string) => void; setAgentAssets?: (assets:string[])=>void; toggleSceneAsset?: (symbol:string)=>void; setTitleFrame?: (frame:number)=>void; titleFrame?:number; textSwapPose: (progress:number)=>{opacity:number;scale:number;blur:number}; }
}
window.textSwapPose = progress => {
  const p=TRANSITION_EASINGS['fly-through'].enter(Math.max(0,Math.min(1,progress)));
  const motion=TRANSITION_MOTION['fly-through'];
  return {opacity:p,scale:motion.enterScale+(1-motion.enterScale)*p,blur:motion.enterBlur*(1-p)};
};
function Title(){return <Sequence from={0}><div style={{position:'absolute',inset:0,transform:'scale(1.9722222222)'}}><TextBuild text={'Or\nBuild into\na strategy'} axis="x" holdDuration={22} fontSize={72} fontFamily="Geist" color="#ffffff" gap={16}/></div></Sequence>}
function TitlePreview(){
  const player=useRef<PlayerRef>(null);
  useEffect(()=>{window.setTitleFrame=frame=>player.current?.seekTo(Math.max(0,Math.min(119,frame)));window.setTitleFrame(window.titleFrame??0);},[]);
  return <Player ref={player} component={Title} durationInFrames={120} fps={60} compositionWidth={1920} compositionHeight={1080} controls={false} clickToPlay={false} style={{width:1920,height:1080}}/>;
}
function Preview() {
  const player = useRef<PlayerRef>(null);
  const [query,setQuery] = useState('Build a long-only semiconductor trend strategy.');
  const [assets,setAssets] = useState(['NVDA','AMD','AVGO','MU']);
  useEffect(() => {
    window.setAgentFrame = frame => player.current?.seekTo(Math.max(0, Math.min(119, frame)));
    window.setAgentFrame(window.agentFrame ?? 0);
    window.setAgentQuery = setQuery;
    window.setAgentAssets = setAssets;
  }, []);
  return <Player ref={player} component={AgentSteps} durationInFrames={120} fps={60}
    compositionWidth={1920} compositionHeight={1080} controls={false} clickToPlay={false}
    style={{width:1920,height:1080}} inputProps={{
      query,
      steps:[
        {running:'Selecting strategy rules…',done:'Long-only trend',hold:.38,tokens:[{label:'Volume trend'},{label:'Low volatility'},{label:'ATR stop'}]},
        {running:'Selecting semiconductor assets…',done:'Universe',hold:.42,tokens:['NVDA','AMD','AVGO','MU'].map(symbol=>({label:symbol,icon:`assets/logos/${symbol.toLowerCase()}.${symbol==='AVGO'?'png':'svg'}`,selected:assets.includes(symbol),onClick:()=>window.toggleSceneAsset?.(symbol)}))},
        {running:'Writing strategy code…',done:'Strategy generated'},
      ],
      result:'Strategy generated.',queryHold:.12,finalHold:2,
      fontFamily:'Geist',paperColor:'transparent',glowRadius:0,pillColor:'#242426',
      inkColor:'#e7e7ea',stepColor:'#b6b6bb',accentColor:'#0AB56A',centerY:.54,mode:'dark',
    }}/>
}
createRoot(document.getElementById('agent-root')!).render(<Preview/>);
createRoot(document.getElementById('title')!).render(<TitlePreview/>);
