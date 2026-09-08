/* Public FY2026 research, local interaction. No account connection. */
gsap.registerPlugin(CustomEase);
CustomEase.create('minaraEnter','.16,1,.3,1');
CustomEase.create('minaraCamera','.87,0,.13,1');
CustomEase.create('textSwapEnter','.2,.6,.35,1');
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const DURATION=7.7, QUERY='2026 NVIDIA earnings';
const CUES={titleEnd:55/30,type:1.98,typed:2.62,commit:2.86,cut:3.08,card:4.12,click:5.35,ppt:5.43,pptDone:6.38};
// Reassign 0.92s of the ending hold to typing, the send move and generation.
// Keep the existing template timelines intact; all controls use preview time.
const TIMING=[[0,0],[CUES.titleEnd,CUES.titleEnd],[CUES.typed,3.05],[CUES.cut,3.74],[CUES.card,5.04],[6.52,7.44],[DURATION,DURATION]];
function retime(t,inverse=false){
  const from=inverse?1:0,to=1-from;
  for(let i=1;i<TIMING.length;i++)if(t<=TIMING[i][from]){
    const a=TIMING[i-1],b=TIMING[i];return a[to]+(b[to]-a[to])*Math.max(0,(t-a[from])/(b[from]-a[from]));
  }
  return DURATION;
}
const ICONS={bot:'M12 3v3m-2-3h4M5 8h14v12H5Z M2 12v4m20-4v4M9 12v2m6-2v2m-6 3h6',search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',bell:'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',home:'m3 10 9-8 9 8v11h-6v-8H9v8H3Z',chart:'M4 3v18h17M8 16v-6m5 6V5m5 11v-4',chat:'M21 15a3 3 0 0 1-3 3H8l-5 4V5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3Z',code:'m8 5-6 7 6 7m8-14 6 7-6 7m-3-16-2 18',candles:'M5 3v4m0 9v5m-2-14h4v9H3ZM12 3v9m0 5v4m-2-9h4v5h-4Zm9-9v3m0 8v7m-2-15h4v8h-4Z',wallet:'M20 8H4V4h15v4M3 8v12h18V8Zm12 5h6v3h-6Z',grid:'M3 3h7v7H3Zm11 0h7v7h-7ZM3 14h7v7H3Zm11 0h7v7h-7Z',display:'M3 3h18v14H3Zm5 18h8m-4-4v4m-5-9 3-3 3 3 4-5',arrow:'M12 20V4m-7 7 7-7 7 7',plus:'M12 4v16M4 12h16',chevron:'m7 10 5 5 5-5',mic:'M9 4a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0ZM5 10v2a7 7 0 0 0 14 0v-2m-7 9v3m-4 0h8',file:'M14 2H4v20h16V8Zm0 0v6h6M8 12h8m-8 4h8',link:'m10 13 4-4M8 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 1 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0',clipboard:'M9 3H4v19h16V3h-5M9 2h6v4H9Z',slide:'M3 4h18v16H3Zm3 4h6m-6 4h12m-6 4h6',align:'M3 4h18M3 9h13M3 14h18M3 19h13'};
$$('[data-icon]').forEach(el=>el.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[el.dataset.icon]||ICONS.file}"/></svg>`);
const ANSWER='NVIDIA generated $215.9B in FY2026 revenue, up 65%, with Data Center at $193.7B. I’ve prepared the earnings summary and presentation.';
$('#answer').replaceChildren(...ANSWER.split(' ').flatMap((word,i)=>{const span=document.createElement('span');span.className='stream-word';span.textContent=word;return i?[' ',span]:[span];}));
const answerWords=$$('.stream-word');
// Reuse S08's seamless, frame-driven ticker; duplicated groups stay off the accessibility tree.
const tickerGroup=$('.ticker-group');
for(let i=0;i<2;i++){const copy=tickerGroup.cloneNode(true);copy.setAttribute('aria-hidden','true');$('.ticker-track').append(copy);}
let tickerWidth=1;
const slideHTML=[
  `<h2>FY2026 earnings</h2><p class="slide-subtitle">Fiscal year ended January 25, 2026</p><div class="slide-metrics"><div><small>Revenue</small><strong>$215.9B</strong><em>+65% year over year</em></div><div><small>Data Center revenue</small><strong>$193.7B</strong><em>+68% year over year</em></div><div><small>GAAP net income</small><strong>$120.1B</strong><em>+65% year over year</em></div></div><div class="slide-bottom-grid"><div><h3>Revenue, $ billions</h3><div class="revenue-row"><span>FY2025</span><i style="width:60.5%"></i><b>130.5</b></div><div class="revenue-row"><span>FY2026</span><i></i><b>215.9</b></div></div><div><h3>AI infrastructure drives growth.</h3><p>Data Center contributed 90% of annual revenue as Blackwell demand expanded.</p></div></div>`,
  `<h2>Growth drivers</h2><p class="slide-subtitle">The financial story behind the results</p><div class="insight-list"><div><small>01</small><strong>Data Center sets the pace.</strong><p>Revenue reached $193.7B, up 68% from FY2025.</p></div><div><small>02</small><strong>Blackwell demand scales.</strong><p>Accelerated computing and AI infrastructure investment support growth.</p></div><div><small>03</small><strong>Strong finish to the year.</strong><p>Fourth-quarter revenue reached $68.1B, up 73% year over year.</p></div></div>`,
  `<h2>What to watch</h2><p class="slide-subtitle">Key risks and the next reporting period</p><div class="insight-list"><div><small>01</small><strong>Export restrictions</strong><p>China market access remains a constraint on Data Center sales.</p></div><div><small>02</small><strong>Margins and product transitions</strong><p>Track system ramps, product mix and the cost of scaling supply.</p></div><div><small>03</small><strong>Demand concentration</strong><p>Monitor hyperscaler spending and the durability of AI investment.</p></div></div>`
];
let selectedSlide=0;
function selectSlide(index){selectedSlide=index;$('#slide-content').innerHTML=slideHTML[index];$$('[data-slide]').forEach(e=>e.classList.toggle('active',+e.dataset.slide===index));$('#slide-page').textContent=`0${index+1} / 03`;$('#slide-status').textContent=`Slide ${index+1} of 3`;}
selectSlide(0);
const tl=gsap.timeline({paused:true,defaults:{ease:'minaraEnter'}});
gsap.set('#camera,#ppt,#cursor,#click-ring,#conversation',{autoAlpha:0});
gsap.set('#client',{scale:.94,y:60});
gsap.set('#artifact,.artifact-content,.document-icon,#source,#sent-prompt,.assistant-name,#research-progress',{autoAlpha:0});
tl.set('#camera',{autoAlpha:1},CUES.titleEnd);
tl.to('#client',{scale:1,y:0,duration:.42},CUES.titleEnd);
tl.fromTo('#composer',{clipPath:'inset(0 0 100% 0 round 23px)'},{clipPath:'inset(0 0 0% 0 round 23px)',duration:.34},CUES.titleEnd);
tl.to('#send',{scale:.93,duration:3/30,ease:'none'},CUES.commit);
tl.to('#send',{scale:1,duration:5/30,ease:'none'},CUES.commit+3/30);
tl.to('#greeting',{autoAlpha:0,y:-20,duration:.26},CUES.cut);
tl.to('#conversation',{autoAlpha:1,duration:.2},3.18);
tl.to('#composer',{top:735,height:115,duration:.72,ease:'minaraCamera'},CUES.cut);
tl.to('#query',{height:36,fontSize:21,duration:.35},CUES.cut);
tl.to('#sent-prompt',{autoAlpha:1,duration:.18},3.22);
tl.to('.assistant-name',{autoAlpha:1,duration:.17},3.25);
tl.to('#research-progress',{autoAlpha:1,duration:.17},3.37);
// Registry card timing: empty surface first, then content four frames later.
tl.fromTo('#artifact',{autoAlpha:0,y:14,scaleY:.86},{autoAlpha:1,y:0,scaleY:1,duration:.24},CUES.card);
tl.to('.document-icon,.artifact-content',{autoAlpha:1,duration:.2,stagger:3.5/30},CUES.card+4/30);
tl.to('#source',{autoAlpha:1,duration:.2},4.55);
tl.to('#artifact',{scale:.985,duration:.07},CUES.click);
tl.to('#artifact',{scale:1,duration:.12},CUES.click+.07);
// A continuous document-to-window transform, triggered by the document click.
// The first white surface occupies exactly the card's untransformed bounds.
tl.set('#ppt',{autoAlpha:1,x:469,y:474,scaleX:960/1700,scaleY:215/945,borderRadius:15},CUES.ppt);
tl.to('#ppt',{x:0,y:0,scaleX:1,scaleY:1,duration:.8,ease:'minaraCamera'},CUES.ppt);
tl.to('#client',{autoAlpha:0,scale:.94,y:22,duration:.52},CUES.ppt);
gsap.set('.ppt-titlebar,.ppt-tabs,.ppt-ribbon,#slide-thumbs,.notes,.ppt-status',{autoAlpha:0});
tl.to('.ppt-titlebar,.ppt-tabs,.ppt-ribbon,#slide-thumbs,.notes,.ppt-status',{autoAlpha:1,duration:.28,stagger:.033},5.82);
gsap.set('#slide',{autoAlpha:0,y:17});
tl.to('#slide',{autoAlpha:1,y:0,duration:.35},5.94);
tl.to({}, {duration:.01},DURATION-.01);

let interactive=false,step='title',driver=null,speed=1,lastTitleFrame=-1;
const playhead={time:0},flow=$('#flow');
const clamp=v=>Math.max(0,Math.min(1,v));
// Focus the whole question input, using its original layout before it moves.
const input=$('#composer');let inputX=input.offsetWidth/2,inputY=input.offsetHeight/2;
for(let el=input;el&&el!==$('#camera');el=el.offsetParent){inputX+=el.offsetLeft+el.clientLeft;inputY+=el.offsetTop+el.clientTop;}
function cameraAt(t){
  const scale=t<CUES.typed
    ?1+.55*gsap.parseEase('minaraEnter')(clamp((t-CUES.type)/.18))
    :window.snapAnswer.shotBScale(t*30,CUES.typed*30,.18*30,1.55,0,1);
  const p=(scale-1)/.55;
  // Begin returning on the final character; land at 1× before Send is pressed.
  gsap.set('#camera',{x:(960-inputX*1.55)*p,y:(540-inputY*1.55)*p,scale,transformOrigin:'0 0',filter:'none'});
}
const canvas=document.createElement('canvas'),measure=canvas.getContext('2d');
function typingAt(t){
  if(interactive&&t<CUES.cut)return;
  const count=Math.round(QUERY.length*Math.sin(clamp((t-CUES.type)/(CUES.typed-CUES.type))*Math.PI/2));
  $('#query').value=t<CUES.cut?QUERY.slice(0,count):'';
  $('#query').placeholder=t<CUES.cut?'Ask anything, or type /command':'Ask a follow-up';
  $('#typing-caret').hidden=t<CUES.type||t>=CUES.commit||interactive;
  measure.font='29px Geist';gsap.set('#typing-caret',{x:measure.measureText(QUERY.slice(0,count)).width-count*.4});
}
function streamAt(t){
  const motion=window.snapAnswer;
  answerWords.forEach((el,i)=>{
    const born=motion.wordBirth(i,3.47*30,34/30),cool=motion.heat(t*30,born,.23*30);
    el.style.opacity=t*30>=born?'1':'0';
    // The original hot-to-cooled stream, in the client's monochrome text palette.
    const v=Math.round(255+(231-255)*cool);el.style.color=`rgb(${v},${v},${Math.min(255,v+3)})`;
  });
}
function pointerAt(t){
  const cue=t>=2.68&&t<CUES.cut?{target:'#send',start:2.68,click:CUES.commit}:t>=4.84&&t<5.6?{target:'#artifact',start:4.84,click:CUES.click}:null;
  if(!cue||interactive){gsap.set('#cursor,#click-ring',{autoAlpha:0});return;}
  const rect=$(cue.target).getBoundingClientRect(),stage=$('#stage').getBoundingClientRect(),scale=1920/stage.width;
  const x=(rect.left+rect.width*(cue.target==='#artifact'?.71:.5)-stage.left)*scale,y=(rect.top+rect.height*(cue.target==='#artifact'?.51:.5)-stage.top)*scale;
  const p=gsap.parseEase('minaraEnter')(clamp((t-cue.start)/(cue.click-cue.start)));
  gsap.set('#cursor',{x:x+(1-p)*125,y:y+(1-p)*108,autoAlpha:1,scale:t>=cue.click&&t<cue.click+.1?.88:1});
  const click=clamp((t-cue.click)/.27);gsap.set('#click-ring',{x:x-26,y:y-26,autoAlpha:t>=cue.click?1-click:0,scale:.5+click});
}
function sync(previewTime){
  if(!window.snapAnswer)return;
  const t=retime(previewTime,true);
  tl.pause(t);cameraAt(t);typingAt(t);streamAt(t);
  gsap.set('.ticker-track',{x:-(Math.max(0,previewTime-CUES.titleEnd)*90)%tickerWidth});
  const f=Math.min(54,Math.round(t*30));if(f!==lastTitleFrame){window.BeyondTitle.seek(f);lastTitleFrame=f;}
  gsap.set('#headline-root',{autoAlpha:t<CUES.titleEnd?1:0});
  // Product headings retain their real layout and use the installed text-swap targets.
  const text=window.snapText;
  for(const [selector,start] of [['#greeting h1',CUES.titleEnd],['#slide-content h2',5.98]]){
    const p=gsap.parseEase('textSwapEnter')(clamp((t-start)/(text.defaults.enterDuration/30)));
    gsap.set(selector,{opacity:p,scale:text.motion.enterScale+(1-text.motion.enterScale)*p,filter:`blur(${text.motion.enterBlur*(1-p)}px)`,transformOrigin:'0 50%'});
  }
  $('#research-progress>span:nth-child(2)').textContent=t<4.7?'Reading NVIDIA FY2026 results':'Read NVIDIA FY2026 results';
  $('.done-mark').style.visibility=t>=4.7?'visible':'hidden';
  pointerAt(t);step=t<CUES.titleEnd?'title':t<CUES.cut?'input':t<CUES.card?'stream':t<CUES.ppt?'summary':'ppt';
  $('#artifact').disabled=t<4.7;
  $('#scrub').value=previewTime;$('#time').textContent=`${previewTime.toFixed(2)} / 7.70s`;$('#play').textContent=driver?'Pause':'Play';
  if(Number.isFinite(flow.duration)&&!flow.seeking&&Math.abs(flow.currentTime-previewTime)>.06)flow.currentTime=previewTime%flow.duration;
}
function pause(){driver?.kill();driver=null;sync(playhead.time);}
function seek(t){driver?.kill();driver=null;playhead.time=Math.max(0,Math.min(DURATION,Number(t)||0));sync(playhead.time);}
function play(until=DURATION){driver?.kill();if(playhead.time>=DURATION-.001)playhead.time=0;driver=gsap.to(playhead,{time:until,duration:Math.max(.01,until-playhead.time)/speed,ease:'none',onUpdate:()=>sync(playhead.time),onComplete:()=>{driver=null;sync(playhead.time);}});}
function tryInteraction(){pause();interactive=true;selectSlide(0);seek(retime(2.52));$('#query').value=QUERY;$('#query').focus();$('#review-note').textContent='Local demo: edit the NVIDIA FY2026 query → Send → click the summary → browse slides or download the editable PPTX.';}
$('#composer').addEventListener('submit',event=>{event.preventDefault();if(!interactive){interactive=true;pause();}const value=$('#query').value.trim();if(!/(nvidia|)/i.test(value)||!/(2026|FY26)/i.test(value)){$('#input-error').textContent='This preview supports NVIDIA FY2026 earnings. Include NVIDIA and 2026.';return;}$('#input-error').textContent='';$('#sent-prompt').textContent=value;seek(retime(CUES.typed));play(retime(4.98));});
$('#artifact').onclick=()=>{interactive=true;pause();selectSlide(0);seek(retime(CUES.click));play(DURATION);};
$('#close-ppt').onclick=()=>{interactive=true;seek(retime(4.98));};
$$('[data-slide]').forEach(button=>button.onclick=()=>{pause();selectSlide(+button.dataset.slide);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&step==='ppt')$('#close-ppt').click();if(step==='ppt'&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){e.preventDefault();pause();selectSlide(Math.max(0,Math.min(2,selectedSlide+(e.key==='ArrowRight'?1:-1))));}if(e.key==='Enter'&&(e.metaKey||e.ctrlKey)&&document.activeElement===$('#query'))$('#composer').requestSubmit();});
$('#play').onclick=()=>{if(driver)pause();else{interactive=false;play();}};
$('#replay').onclick=()=>{interactive=false;selectSlide(0);$('#sent-prompt').textContent=QUERY;$('#input-error').textContent='';seek(0);play();};
$('#scrub').oninput=event=>{interactive=false;selectSlide(0);$('#sent-prompt').textContent=QUERY;seek(event.target.value);};
$('#speed').onchange=event=>{const playing=!!driver;pause();speed=+event.target.value;if(playing)play();};
$$('[data-time]').forEach(button=>button.onclick=()=>{interactive=false;selectSlide(0);seek(retime(+button.dataset.time));});
$('#interactive').onclick=tryInteraction;
function resize(){const rect=$('#viewport').getBoundingClientRect();$('#stage').style.transform=`scale(${rect.width/1920})`;}
addEventListener('resize',resize);resize();
window.scene={duration:DURATION,cues:CUES,retime,seek,play,pause,tryInteraction,selectSlide,tl,get state(){return{time:playhead.time,step,interactive,selectedSlide};}};
async function ready(){await document.fonts.ready;if(!window.BeyondTitle?.ready){requestAnimationFrame(ready);return;}tickerWidth=tickerGroup.offsetWidth;sync(0);window.scene.ready=true;}
ready();flow.addEventListener('loadeddata',()=>sync(playhead.time));
