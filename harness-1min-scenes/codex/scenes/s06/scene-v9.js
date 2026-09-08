/* Fixed local demo. No trading APIs. Source ports: snapcn-motion.js. */
CustomEase.create('minaraEnter','.16,1,.3,1');
CustomEase.create('minaraSnap','M0,0 C0.95,0.03 0,0.98 1,1');
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const tickerGroup=document.createElement('div'),tickerTrack=document.createElement('div');
tickerGroup.className='ticker-group';tickerTrack.className='ticker-track';
while($('.ticker').firstChild)tickerGroup.append($('.ticker').firstChild);
const tickerCopy=tickerGroup.cloneNode(true);tickerCopy.setAttribute('aria-hidden','true');
tickerTrack.append(tickerGroup,tickerCopy,tickerCopy.cloneNode(true));$('.ticker').append(tickerTrack);
const ref=snapcnMotion.answer, textMotion=snapcnMotion.text;
const DURATION=18.65, ORIGINAL_DURATION=223/30;
const cues={intent:1.833,cut:6.88,order:13.35,review:13.65,confirmation:13.7,confirm:15.1,result:15.35,filled:16.35,done:16.6,positionClick:17.75,position:18.0};
const demo=Object.freeze({size:.01,price:77673,leverage:5,fee:.31,equityBefore:18467.87});
const prompt='Long 0.01 BTC at 5x. Ask me to confirm.';
const answer='Ready to open 0.01 BTC long at 5x. Review the order before I execute.';
function words(element,text){
  element.textContent='';
  text.split(' ').forEach((word,i)=>{if(i)element.append(' ');const span=document.createElement('span');span.className='stream-word';span.textContent=word;element.append(span);});
  return Array.from(element.children);
}
const answerWords=words($('#answer-words'),answer);
const sentWords=words($('#sent'),prompt);
const filledWords=words($('#filled-result'),'Filled · 0.01 BTC at $77,673.00 · Long · 5x');
filledWords[0].style.color='#0ab56a';
// Every visible text node uses the SAME text-swap entrance, including tiny UI labels.
const walker=document.createTreeWalker($('#stage'),NodeFilter.SHOW_TEXT);
const nodes=[];while(walker.nextNode())if(walker.currentNode.textContent.trim()&&!walker.currentNode.parentElement.closest('svg,script,style,.title'))nodes.push(walker.currentNode);
for(const node of nodes){const [,leading,content,trailing]=node.textContent.match(/^(\s*)([\s\S]*?)(\s*)$/);const span=document.createElement('span');span.className='swap-text';span.textContent=content;node.replaceWith(leading,span,trailing);}
const textPlan=new Map(), growRecords=[];
const tl=gsap.timeline({paused:true,defaults:{ease:'minaraEnter'}});
gsap.set('.swap-text',{display:'inline-block',autoAlpha:0,scale:textMotion.scale,filter:`blur(${textMotion.blur}px)`,transformOrigin:'50% 50%',textRendering:'geometricPrecision'});
function planText(element,at){
  const atoms=element.matches('.swap-text')?[element]:Array.from(element.querySelectorAll('.swap-text'));
  for(const atom of atoms)textPlan.set(atom,Math.max(textPlan.get(atom)??0,at));
}
function grow(selector,at,duration=.25,stagger=0){
  const elements=typeof selector==='string'?$$(selector):Array.from(selector);
  gsap.set(elements,{autoAlpha:0,y:12,scale:.92,transformOrigin:'0% 0%'});
  elements.forEach((element,i)=>{
    const born=at+i*stagger;tl.to(element,{autoAlpha:1,y:0,scale:1,duration},born);
    planText(element,born+.04);growRecords.push({element,at:born,duration});
  });
}
function surface(selector,at,duration=.3){
  gsap.set(selector,{autoAlpha:0,scaleX:.84,scaleY:.18,transformOrigin:'0% 0%'});
  tl.to(selector,{autoAlpha:1,scaleX:1,scaleY:1,duration},at);
}
function stream(elements,at,rate=42){elements.forEach((element,i)=>planText(element,at+i/rate));}
gsap.set('#camera,#cursor,#confirm-layer,#workflow,#portfolio,#sent,.answer',{autoAlpha:0});
gsap.set('#composer',{y:-240});
gsap.set('#filled-result,.complete,.node-status,.order-submitted,#run-duration',{autoAlpha:0});

tl.to('.title',{x:-2050,duration:.28,ease:'power3.inOut'},1.48);
tl.set('#camera',{autoAlpha:1},1.68);
surface('.client',1.68,.38);
grow('.topbar > *',1.89,.24,.017);grow('.traffic i',1.95,.2,.025);
$$('.ticker-group').forEach(group=>grow(group.children,2.04,.25,.045));
// prompt-send: pinned top edge unrolls; content keeps its real dimensions.
CustomEase.create('promptUnroll','.3,0,.35,1');
CustomEase.create('promptChip','.2,0,.25,1');
gsap.set('#composer',{autoAlpha:0,scale:1,clipPath:'inset(0 0 100% 0 round 24px)'});
tl.set('#composer',{autoAlpha:1},1.858);
tl.fromTo('#composer',{clipPath:'inset(0 0 99% 0 round 24px)',scaleX:.93},{clipPath:'inset(0 0 0% 0 round 24px)',scaleX:1,duration:.445,ease:'promptUnroll'},1.858);
gsap.set('#intent',{autoAlpha:0});
tl.to('#intent',{autoAlpha:1,duration:.3,ease:'none'},2.25);
grow('.composer-footer > *',2.378,.59,.1);grow('#send .icon',2.25,.3);
gsap.set('#send',{transformOrigin:'50% 50%'});
tl.to('#send',{scale:.87,duration:.067,ease:'none'},6.491);
tl.to('#send',{scale:1,duration:.25,ease:'none'},6.558);
// Team discussion lands on this same order card before the client shell returns.
tl.set('#composer',{y:0,height:130,scale:1},cues.order);



surface('.order-inline',12.2,.38);

grow('.order-inline h3',12.38,.22);
grow('.order-inline .kv',12.5,.2,.07);grow('.order-inline .kv > *',12.53,.18,.035);
grow('#review',12.85,.22);


tl.to('#review',{scale:.95,duration:.07},cues.review);tl.to('#review',{scale:1,duration:.12},13.72);
tl.to('#confirm-layer',{autoAlpha:1,duration:.17},cues.confirmation);
surface('.dialog',13.71,.28);
grow('.dialog h2',13.8,.2);grow('.dialog p',13.85,.2);
grow('.confirm-rows > div',13.89,.22,.045);grow('.confirm-rows > div > *',13.92,.19,.023);
grow('.confirm-actions > button',14.06,.21,.055);
// Confirmation resolves by ~14.65; click at 16.7.
tl.to('#confirm',{scale:.96,duration:.09},cues.confirm);tl.to('#confirm',{scale:1,duration:.14},15.19);
tl.to('#confirm-layer',{autoAlpha:0,duration:.18},15.27);tl.to('#chat',{autoAlpha:0,duration:.16},15.3);
tl.to('#workflow',{autoAlpha:1,duration:.45},cues.result);
grow('#workflow h1',15.37,.28);grow('#workflow .subtitle',15.43,.25);
grow('.run-meta > *',15.46,.24,.035);
surface('.result',15.52,.3);grow('.result h3',15.6,.22);grow('#pending-result',15.68,.22);
surface('.workflow-canvas',15.59,.34);grow('.canvas-tools',15.75,.2);grow('.canvas-tools > *',15.79,.16,.035);
// Upstream card stagger, then 4-frame delay before its content fills.
for(let i=1;i<=4;i++){
  const born=15.67+(i-1)*ref.cardGap;surface(`.node-${i}`,born,.22);
  grow(`.node-${i} > .icon:not(.node-status), .node-${i} b, .node-${i} .node-kind`,born+ref.fillDelay,.18,.015);
  grow(`.node-${i} small`,born+ref.fillDelay+.04,.2);
  tl.to(`.node-${i}`,{borderColor:'#0ab56a66',duration:.2},born+.26);
  grow(`.node-${i} .node-status`,born+.31,.16);
  if(i<4){const edge=$(`#edge-${i}`),length=edge.getTotalLength();gsap.set(edge,{autoAlpha:0,strokeDasharray:length,strokeDashoffset:length});tl.to(edge,{autoAlpha:1,strokeDashoffset:0,duration:.2,ease:'power2.inOut'},born+.23);tl.set(edge,{strokeDasharray:'6 8'},born+.44);}
}
gsap.set('.edges > path:first-child',{autoAlpha:0});
tl.to('#pending-result',{autoAlpha:0,duration:.12},cues.filled);
tl.set('#filled-result',{autoAlpha:1},cues.filled);stream(filledWords,16.36,60);
grow('.order-submitted',16.54,.22);grow('.order-submitted > *',16.57,.2,.025);
grow('#open-position',16.67,.25);grow('#open-position > .icon',16.8,.18);
tl.to('#open-position',{scale:.96,duration:.08},cues.positionClick);tl.to('#open-position',{scale:1,duration:.13},17.83);
tl.to('#workflow',{autoAlpha:0,duration:.16},17.92);tl.set('#portfolio',{autoAlpha:1},cues.position);
surface('.sidebar',18.0,.31);grow('.nav',18.08,.23,.044);grow('.nav .icon',18.14,.2,.044);
surface('.wallet-select',18.01,.28);planText($('.wallet-select'),18.1);
grow('.wallet-controls > *',18.07,.23,.045);grow('.equity',18.12,.26);grow('.available',18.18,.24);
grow('.portfolio-tabs > *',18.22,.23,.04);grow('.position-tabs',18.27,.2);grow('.position-tabs > *',18.31,.2,.04);
grow('.positions',18.33,.24);grow('.positions th',18.37,.2,.022);grow('#position-row > td',18.49,.22,.028);
grow('.receipt',18.76,.24);grow('.receipt > *',18.79,.2,.035);grow('.view-run',18.93,.23);
planText($('#sent'),13.35);planText($('.agent-name'),13.35);planText($('#answer-words'),13.35);
addResearchMotion();
// Dynamic labels retain their animated wrapper when their text changes.
planText($('#tab-title'),2.02);planText($('#run-state'),15.57);
for(const [element,at] of textPlan)tl.to(element,{autoAlpha:1,scale:1,filter:'blur(0px)',duration:textMotion.duration,ease:textMotion.ease},at);
for(const [selector,at] of [['#tab-title .swap-text',cues.result],['#tab-title .swap-text',cues.position],['#run-state .swap-text',cues.done]])tl.fromTo(selector,{autoAlpha:0,scale:textMotion.scale,filter:`blur(${textMotion.blur}px)`},{autoAlpha:1,scale:1,filter:'blur(0px)',duration:textMotion.duration,ease:textMotion.ease,immediateRender:false},at);
// Only a camera cut is instantaneous; content always uses a growth or text-swap track.
tl.to('.client',{x:-2050,duration:1,ease:'power3.inOut'},19.95);
tl.to({}, {duration:.01},DURATION+2.3-.01);window.__timelines={'s06-s07':tl};
const anchors=[[0,0],[1.833,1.833],[2.2,6.88],[2.55,13.35],[2.72,13.7],[3.8,15.1],[4.0,15.35],[5.7,17.75],[5.93,18.0],[ORIGINAL_DURATION,19.95]];
function mapTime(t,reverse=false){const pairs=reverse?anchors.map(([a,b])=>[b,a]):anchors;for(let i=1;i<pairs.length;i++)if(t<=pairs[i][0]){const[a,b]=pairs[i-1],[c,d]=pairs[i];return b+(d-b)*Math.max(0,(t-a)/(c-a));}return pairs.at(-1)[1];}
let mode='growth',interactive=false,driver=null,approved=false,step='title';
const playhead={time:0},flow=$('#flow');
const pointerCues=[{selector:'#send',start:5.875,click:6.491,end:6.88},{selector:'#review',start:13.38,click:13.65,end:13.72},{selector:'#confirm',start:14.79,click:15.1,end:15.35},{selector:'#open-position',start:17.47,click:17.75,end:17.95}];
function duration(){return mode==='original'?ORIGINAL_DURATION:DURATION;}
// Port of the supplied TextBuild x-axis: each word pushes the centered layout.
// 1.8x source speed keeps the existing title slot; pause after "opportunity".
CustomEase.create('textBuild','.2,.8,.2,1');
const titleWords=$$('.title-word'),pushDuration=13/30/1.8;
const titleStarts=[.05,.05+pushDuration,.05+pushDuration*2+.25,.05+pushDuration*3+.25];
let titlePositions;
function titleBuildAt(t){
  if(!titlePositions){
    const sizes=titleWords.map(word=>word.offsetWidth),gap=22;
    titlePositions=sizes.map((_,i)=>{
      let left=-(sizes.slice(0,i+1).reduce((a,b)=>a+b,0)+gap*i)/2;
      return sizes.slice(0,i+1).map(size=>{const center=left+size/2;left+=size+gap;return center;});
    });
  }
  titleWords.forEach((word,j)=>{
    const start=titleStarts[j],dur=pushDuration;
    const p=gsap.parseEase('textBuild')(clamp01((t-start)/dur));
    let x=titlePositions[j][j]+88*(1-p),y=0,blur=3.5*(1-p);
    if(t>start+dur){
      for(let w=j+1;w<titleWords.length;w++){
        if(t>=titleStarts[w]+pushDuration)x=titlePositions[w][j];
        else if(t>=titleStarts[w]){
          const u=clamp01((t-titleStarts[w])/pushDuration);
          x=titlePositions[w-1][j]+(titlePositions[w][j]-titlePositions[w-1][j])*gsap.parseEase('textBuild')(u);
          blur=.8*(1-Math.abs(2*u-1));break;
        }else{x=titlePositions[w-1][j];break;}
      }
    }
    gsap.set(word,{xPercent:-50,yPercent:-50,x,y,opacity:p,scale:.992+.008*p,filter:`blur(${blur}px)`,force3D:false});
  });
}
function cameraAt(t){
  if(t<cues.cut){promptSendFrame(t,interactive);}
  else gsap.set('#camera',{scale:1,x:0,y:0,transformOrigin:'50% 50%',filter:'none'});
}
function pointerAt(t){const cue=pointerCues.find(c=>t>=c.start&&t<c.end);if(!cue||interactive){gsap.set('#cursor',{autoAlpha:0});return;}const stage=$('#stage').getBoundingClientRect(),target=$(cue.selector).getBoundingClientRect(),scale=1920/stage.width;const x=(target.x+target.width/2-stage.x)*scale-3,y=(target.y+target.height/2-stage.y)*scale-2,progress=gsap.parseEase(cue.selector==='#send'?'minaraEnter':'minaraSnap')(clamp01((t-cue.start)/(cue.selector==='#send'?.42:cue.click-cue.start)));gsap.set('#cursor',{autoAlpha:1,x:x+(1-progress)*(cue.selector==='#send'?1920*.86-x:85),y:y+(1-progress)*(cue.selector==='#send'?1080*1.02-y:62)});const click=clamp01((t-cue.click)/.25);gsap.set('#ring',{autoAlpha:t>=cue.click?1-click:0,scale:.6+click*1.1});}
function setLabel(selector,text){const e=$(selector+' .swap-text')||$(selector);e.textContent=text;}
function sync(t){const c=t<1.8?t:t+2.3;tl.pause(c);titleBuildAt(c);gsap.set(tickerTrack,{x:-(Math.max(0,c-2.9)*34%tickerGroup.offsetWidth)});cameraAt(c);gsap.set('#camera',{autoAlpha:t<1.8?0:1});setLabel('#tab-title',c>=cues.position?'Portfolio':c>=cues.result?'BTC market order':c>=cues.order?'Trading research team':'Chat');$('#tab-icon').setAttribute('href',c>=cues.position?'#i-wallet':c>=cues.result?'#i-grid':'#i-chat');setLabel('#run-state',c>=cues.done?'✓ Done':'Running');$('#run-state').classList.toggle('done',c>=cues.done);if(!interactive&&c>=cues.cut)$('#intent').value='';if(interactive||c>=cues.cut)$('#typing-caret').hidden=true;$('#send-bloom').hidden=c>=cues.cut;step=c<cues.intent?'title':c<cues.cut?'intent':c<cues.order?'research':c<cues.confirmation?'order':c<cues.result?'confirmation':c<cues.position?'result':'position';pointerAt(c);if(Number.isFinite(flow.duration)&&!flow.seeking&&Math.abs(flow.currentTime-t)>.06)flow.currentTime=t%flow.duration;window.parent.postMessage({type:'s0607-status',time:t,duration:duration(),step,playing:!!driver?.isActive(),interactive},'*');}
function pause(){driver?.kill();driver=null;sync(playhead.time);}
function seek(t){driver?.kill();driver=null;playhead.time=Math.max(0,Math.min(duration(),Number(t)||0));sync(playhead.time);}
function play(until=duration()){driver?.kill();if(playhead.time>=duration()-.001)playhead.time=0;driver=gsap.to(playhead,{time:until,duration:Math.max(.01,until-playhead.time),ease:'none',onUpdate:()=>sync(playhead.time),onComplete:()=>{driver=null;sync(playhead.time);}});}
function at(t){return t<4.1?Math.min(t,1.8):t-2.3;}
function interactiveStart(){pause();interactive=true;approved=false;seek(at(5.8));$('#intent').value=prompt;$('#intent').focus();}
$('#composer').addEventListener('submit',event=>{event.preventDefault();if(!interactive)return;if($('#intent').value.trim()!==prompt){$('#input-error').textContent='This preview supports the preset order. Restore the prompt to continue.';return;}$('#input-error').textContent='';approved=false;seek(at(6.88));play(at(13.6));});
$('#review').onclick=()=>{if(!interactive||step!=='order')return;seek(at(13.7));play(at(15.0));};
$('#cancel').onclick=()=>{if(!interactive||approved)return;seek(at(13.6));$('#review').focus();};
$('#confirm').onclick=()=>{if(!interactive||approved||step!=='confirmation')return;approved=true;seek(at(15.1));play(at(19));};
$('#open-position').onclick=()=>{if(!interactive||!approved||step!=='result')return;seek(at(18.0));play(at(19.7));};
$('#view-run').onclick=()=>{if(!interactive||!approved)return;seek(at(19));};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&interactive&&step==='confirmation'&&!approved)$('#cancel').click();});
window.addEventListener('message',event=>{if(event.source!==window.parent)return;const d=event.data;if(d?.type!=='s0607-control')return;if(d.action==='interactive')return interactiveStart();if(d.action==='play'){interactive=false;play();}if(d.action==='pause')pause();if(d.action==='seek'){interactive=false;seek(d.time);}if(d.action==='restart'){interactive=false;seek(0);play();}if(d.action==='mode'){interactive=false;mode=d.mode==='original'?'original':'growth';seek(0);}});
function resize(){const scale=Math.min(innerWidth/1920,innerHeight/1080);$('#stage').style.transform=`translate(${(innerWidth-1920*scale)/2}px,${(innerHeight-1080*scale)/2}px) scale(${scale})`;}
addEventListener('resize',resize);resize();window.scene={tl,demo,cues,pointerCues,growRecords,textPlan,duration,seek,play,pause,interactiveStart,mapTime,get state(){return{approved,step,interactive,time:playhead.time,mode};}};
document.fonts.ready.then(()=>{sync(0);window.parent.postMessage({type:'s0607-ready'},'*');});flow.addEventListener('loadeddata',()=>sync(playhead.time));
