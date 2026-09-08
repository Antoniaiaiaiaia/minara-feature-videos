/* Local product demonstration. One 11.8s seekable clock; no provider/API connections. */
gsap.registerPlugin(CustomEase);
CustomEase.create('minara','M0,0 C0.95,0.03 0,0.98 1,1');
CustomEase.create('entry','M0,0 C0.16,1 0.3,1 1,1');
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const DURATION=11.8, CLICK=6.18, EXPAND=6.30, ENDING=10.5;
const providers=[
  {id:'minara',name:'Minara',icon:'minara-square.png'},
  {id:'openai',name:'OpenAI',icon:'openai.svg'},
  {id:'openrouter',name:'OpenRouter',icon:'openrouter.svg'},
  {id:'anthropic',name:'Anthropic',icon:'claude.svg'},
  {id:'kimi',name:'Kimi',icon:'moonshot.svg'},
  {id:'xai',name:'xAI (Grok)',icon:'xai.svg'},
  {id:'ollama',name:'Ollama Cloud',icon:'ollama.svg'}
];
const reelProviders=[...providers.slice(1),providers[0]];
$('#reel-track').innerHTML=reelProviders.map(p=>`<button class="provider" id="provider-${p.id}" role="radio" aria-label="${p.name}" aria-checked="${p.id==='openai'}" tabindex="${p.id==='openai'?0:-1}" data-provider="${p.id}" data-selected="${p.id==='openai'}">
  <span class="row-content">${p.id==='minara'?'<img class="minara-wordmark" src="assets/minara-logo-light.png" alt="Minara">':`<span class="provider-icon ${p.id}"><img src="assets/providers/${p.icon}" alt=""></span><span class="provider-name">${p.name}</span>`}</span>
</button>`).join('');
const rows=$$('.provider'), hero=$('#provider-minara'), flow=$('#flow');
const PITCH=129, SCROLL_START=2.30, SCROLL_END=5.55;
const reel={position:0,heroOpacity:1,sideOpacity:1};
// Project the same scroll position onto a cylinder in playback and manual mode.
function projectReel(){
  rows.forEach((row,i)=>{
    const distance=i-reel.position/PITCH;
    const angle=distance*.36,visible=Math.abs(distance)<3.5;
    const a=Math.max(-1.57,Math.min(1.57,angle)),c=Math.cos(a);
    gsap.set(row,{x:667,y:310+530*Math.sin(a),z:100+530*(c-1),rotationX:-a*180/Math.PI,
      scale:1.75*(.94+.06*c),
      autoAlpha:visible?Math.exp(-.4*distance*distance)*(row===hero?reel.heroOpacity:reel.sideOpacity):0,
      filter:`blur(${Math.min(2,.35*distance*distance)}px)`,zIndex:Math.round(100*c),
      pointerEvents:visible?'auto':'none'});
  });
}
let time=0,playing=false,last=0,raf=0,manual=false,selected='openai',manualSelection=null;
let manualIndex=0,reelTween=null;
function selectState(id,swept=false){
  selected=id;
  rows.forEach(row=>{const on=row.dataset.provider===id;row.dataset.selected=String(on);row.dataset.swept=String(on&&swept);row.setAttribute('aria-checked',String(on));row.tabIndex=on?0:-1;});
}
gsap.set('#cursor,.click-ring,#brand-logo,#tagline,#ending-root',{autoAlpha:0});
gsap.set('#brand-logo',{xPercent:-50,yPercent:-50,y:40,scale:260*1.75/0.9/720});
const tl=gsap.timeline({paused:true});
tl.addLabel('title',0)
  .fromTo('#headline-root',{autoAlpha:1},{autoAlpha:0,duration:.264,ease:'power2.in'},1.57);
projectReel();
tl.fromTo('#provider-list',{autoAlpha:0,y:24},{autoAlpha:1,y:0,duration:.42,ease:'entry'},1.834)
  .fromTo(reel,{position:0},{position:6*PITCH,duration:SCROLL_END-SCROLL_START,ease:'power2.inOut'},SCROLL_START)
  .fromTo('#cursor',{autoAlpha:0,x:1190,y:640},{autoAlpha:1,x:1040,y:580,duration:.42,ease:'power2.out'},5.65);
tl.addLabel('scroll',SCROLL_START).addLabel('stopped',SCROLL_END)
  .to(reel,{sideOpacity:0,duration:.28,ease:'power2.in'},EXPAND)
  .set(reel,{heroOpacity:0},EXPAND)
  .set('#brand-logo',{autoAlpha:1},EXPAND)
  .to('#brand-logo',{y:0,scale:1,duration:.7,ease:'minara'},EXPAND)
  .to('#brand-logo',{y:-60,duration:.45,ease:'power2.inOut'},7.9)
  .fromTo('#tagline',{y:10,autoAlpha:0},{y:0,autoAlpha:1,duration:.4,ease:'power2.out'},8.1)
  .to('#brand-logo,#tagline',{autoAlpha:0,duration:.16,ease:'power1.inOut'},ENDING)
  .to('#ending-root',{autoAlpha:1,duration:.16,ease:'power1.inOut'},ENDING+.16);
tl.fromTo('#click-ring',{scale:.25,autoAlpha:.42},{scale:2.5,autoAlpha:0,duration:.65,ease:'back.out(1.15)',immediateRender:false},CLICK)
  .fromTo('#click-ring-echo',{scale:.4,autoAlpha:.2},{scale:3.1,autoAlpha:0,duration:.72,ease:'power3.out',immediateRender:false},CLICK+.1)
  .to('#cursor',{autoAlpha:0,duration:.2},6.48);

tl.addLabel('logo',7.0).addLabel('ending',ENDING).to({}, {duration:1.3},ENDING);
window.__timelines={...(window.__timelines||{}),'s18-s19':tl};

function syncState(){
  if(!manual){
    selectState(time>=CLICK?'minara':'openai');
    rows.forEach(row=>row.dataset.hover=String(row===hero&&time>=6.1));
  }
  $('#time').textContent=time.toFixed(2)+' / '+DURATION.toFixed(2)+'s';$('#scrub').value=time;
  return Promise.all([window.S18Title?.seek(Math.min(54,Math.round(time*30))),window.S18Ending?.seek(54)]);
}
function stopManual(){
  reelTween?.kill();reelTween=null;
  manualSelection?.kill();manualSelection=null;
  gsap.set('.row-content',{x:0});
  manual=false;$('#interactive').classList.remove('active');
  $('#note').textContent='11.80 seconds · 1920 × 1080 · 30 fps. Wheel → Minara logo + General Financial Intelligence → minara.ai. Local preview.';
}
function pause(){playing=false;last=0;cancelAnimationFrame(raf);$('#play').textContent='Play';flow.pause();}
function draw(){tl.seek(time,true);projectReel();return syncState();}
async function seek(value){
  pause();stopManual();time=Math.max(0,Math.min(DURATION,Number(value)||0));
  tl.seek(0,true);await draw();
  if(flow.readyState>=1&&Math.abs(flow.currentTime-time)>.016)flow.currentTime=time;
}
function tick(now){
  if(!playing)return;
  if(last)time=Math.min(DURATION,time+(now-last)/1000*Number($('#speed').value));last=now;draw();
  if(time>=DURATION)pause();else raf=requestAnimationFrame(tick);
}
async function play(){
  if(playing)return;
  if(manual||time>=DURATION-.01)await seek(0);
  playing=true;last=0;$('#play').textContent='Pause';flow.playbackRate=Number($('#speed').value);flow.currentTime=time;
  flow.play().catch(()=>{});raf=requestAnimationFrame(tick);
}
async function tryUI(){
  await seek(2.30);manual=true;manualIndex=0;selectState('openai');
  gsap.set('#cursor,.click-ring',{autoAlpha:0});gsap.set('.row-content',{x:0});
  rows.forEach(row=>row.dataset.hover='false');$('#interactive').classList.add('active');
  $('#note').textContent='Try the UI · Scroll or use arrow keys to roll through providers. Click, Enter or Space selects. Selection is local to this preview.';
}
function rollTo(index){
  manualIndex=Math.max(0,Math.min(rows.length-1,index));
  reelTween?.kill();reelTween=gsap.to(reel,{position:manualIndex*PITCH,duration:.45,ease:'power2.out',onUpdate:projectReel});
}
$('#provider-list').addEventListener('wheel',e=>{
  if(!manual)return;e.preventDefault();if(reelTween?.isActive()||!e.deltaY)return;
  rollTo(manualIndex+Math.sign(e.deltaY));
},{passive:false});
function manualHover(row,on){
  if(manual)row.dataset.hover=String(on);
}
async function choose(row){
  if(!manual)await tryUI();
  manualSelection?.kill();
  rollTo(rows.indexOf(row));
  selectState(row.dataset.provider,true);
  if(row===hero){await seek(CLICK);play();}
}
rows.forEach((row,i)=>{
  row.addEventListener('pointerenter',()=>manualHover(row,true));row.addEventListener('pointerleave',()=>manualHover(row,false));
  row.addEventListener('focus',()=>manualHover(row,true));row.addEventListener('blur',()=>manualHover(row,false));
  row.addEventListener('click',()=>choose(row));
  row.addEventListener('keydown',e=>{
    const direction={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[e.key];
    if(!direction||!manual)return;e.preventDefault();const index=(i+direction+rows.length)%rows.length;
    rollTo(index);rows[index].focus({preventScroll:true});
  });
});
$('#interactive').onclick=tryUI;$('#play').onclick=()=>playing?pause():play();$('#replay').onclick=async()=>{await seek(0);play();};
$('#scrub').oninput=e=>seek(e.target.value);$('#speed').onchange=()=>flow.playbackRate=Number($('#speed').value);
$$('[data-time]').forEach(b=>b.onclick=()=>seek(b.dataset.time));
document.addEventListener('keydown',e=>{if(e.code==='Space'&&!['BUTTON','INPUT','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();playing?pause():play();}});
function resize(){$('#stage').style.transform=`scale(${$('#viewport').clientWidth/1920})`;}
new ResizeObserver(resize).observe($('#viewport'));resize();
tl.eventCallback('onUpdate',projectReel);
window.scene={seek,play,pause,tryUI,timeline:tl,providers,duration:DURATION,get reelPosition(){return reel.position;},get selected(){return selected;},get manual(){return manual;},get time(){return time;}};
document.fonts.ready.then(()=>seek(Number(new URLSearchParams(location.search).get('t'))||0));
