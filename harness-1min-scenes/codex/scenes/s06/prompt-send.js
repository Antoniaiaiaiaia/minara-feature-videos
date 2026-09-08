/* @snapcn/prompt-send: source timing and cameraFor equations, mapped to the
 * measured Minara composer. Original registry: assets/prompt-send.reference.json. */
const promptMeasure=document.createElement('canvas').getContext('2d');
function promptSendFrame(time,interactive){
  const now=time-1.833, input=document.querySelector('#intent');
  const text='Long 0.01 BTC at 5x. Ask me to confirm.';
  const u=clamp01((now-.915)/3.025), progress=(1-Math.cos(Math.PI*u))/2;
  const count=Math.round(text.length*progress);
  if(!interactive)input.value=text.slice(0,count);
  // Measure in scene space before applying the shot; no copied reference pixels.
  gsap.set('#camera',{scale:1,x:0,y:0,transformOrigin:'0 0',filter:'none'});
  const stage=document.querySelector('#stage').getBoundingClientRect();
  const unit=1920/stage.width, line=input.getBoundingClientRect();
  const send=document.querySelector('#send');
  const sendParent=send.offsetParent.getBoundingClientRect();
  promptMeasure.font=getComputedStyle(input).font;
  const width=promptMeasure.measureText(text).width;
  const x=(line.x-stage.x)*unit, y=(line.y+line.height/2-stage.y)*unit;
  // Camera targets layout geometry, never the button's animated press bounds.
  const sx=(sendParent.x-stage.x)*unit+send.offsetLeft+send.offsetWidth/2;
  const sy=(sendParent.y-stage.y)*unit+send.offsetTop+send.offsetHeight/2;
  let scale=1,tx=0,ty=0;
  if(!interactive&&now>=4.008){
    scale=1.44;tx=.5305*1920-scale*sx;ty=.5261*1080-scale*sy;
  }else if(!interactive&&now>=1.975){
    scale=2.327;tx=.573*1920-scale*(x+width*progress);ty=.4881*1080-scale*y;
  }
  gsap.set('#camera',{scale,x:tx,y:ty,transformOrigin:'0 0'});
  const anchor=count===0?.742:Math.min(now,Math.max(.742,.915+3.025*Math.acos(1-2*Math.max(0,count-.5)/text.length)/Math.PI));
  const caret=document.querySelector('#typing-caret');
  caret.hidden=interactive||now<.742;
  gsap.set(caret,{left:28+promptMeasure.measureText(text.slice(0,count)).width,opacity:Math.floor((now-anchor)/.474)%2===0?1:0});
  const bloom=document.querySelector('#send-bloom');
  const glow=gsap.parseEase('power1.out')(clamp01((now-4.878)/.3));
  const sweep=gsap.parseEase('power1.out')(clamp01((now-4.878)/1.1));
  gsap.set(bloom,{opacity:interactive?0:glow,background:`radial-gradient(80% 170% at ${16+sweep*66}% 96%,#8a8a9270 0%,transparent 66%)`});
}
