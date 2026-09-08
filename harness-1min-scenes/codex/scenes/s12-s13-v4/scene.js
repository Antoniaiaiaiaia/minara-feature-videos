const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const DURATION=7.7,TAB=2.55,RUN=4.12,STOP=6.00,NEXT=6.32;
gsap.registerPlugin(CustomEase);CustomEase.create('minara','0.16,1,0.3,1');
const cards=[
 {name:'Adaptive Trend Follower',market:'SOLUSDT',period:'4H',stars:6,logo:'../s12-s13-v2/assets/logos/sol.svg',label:'Ann. Return',value:'+17.35%',metrics:[['Window Return','+63.37%'],['Max Drawdown','33.71%'],['Sharpe Ratio','0.61']],window:'1709d',share:'20%',curve:'M0 57 L13 54 L24 54 L34 45 L48 43 L58 40 L68 40 L79 28 L91 25 L103 25 L117 19 L132 18 L142 10 L159 8 L175 3'},
 {name:'Gold Mine Momentum',market:'GOLD-USDC',period:'1H',stars:9,logo:'../s04-s05/assets/logos/gold.svg',label:'Window Return',value:'+136.05%',metrics:[['Max Drawdown','17.75%'],['Sharpe Ratio','3.07']],window:'198d',share:'20%',curve:'M0 57 L14 56 L26 50 L37 49 L49 46 L62 35 L76 35 L88 31 L99 26 L112 25 L124 15 L139 14 L154 8 L175 3'},
 {name:'Memory Top 4 Trend Rotation, Daily Risk Control to Reduce...',market:'TradFi 30',period:'1D',stars:4,logo:'../s12-s13-v2/assets/logos/nvda.svg',label:'Ann. Return',value:'+712.85%',metrics:[['Window Return','+715.42%'],['Max Drawdown','27.51%'],['Sharpe Ratio','3.79']],window:'366d',share:'15%',curve:'M0 57 L15 52 L28 52 L43 47 L54 41 L70 40 L84 34 L95 29 L111 28 L125 19 L137 17 L152 8 L175 3'}
];
const strategyIcon=i=>i===2?'<svg viewBox="0 0 40 40"><ellipse cx="13" cy="20" rx="8" ry="16"/><ellipse cx="20" cy="20" rx="8" ry="16"/><ellipse cx="27" cy="20" rx="8" ry="16"/></svg>':'<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" stroke-width="7"/><path d="m20 14 6 6-6 6-6-6Z" fill="currentColor" stroke="none"/></svg>';
const avatarPalette=[['#e8dacb','#d5a17e','#352c30','#587367'],['#d3dfed','#a97550','#232426','#6985a6'],['#e9d6d1','#f0c5a6','#6c4538','#b67d72'],['#dce2cf','#8c5c40','#222525','#9585aa'],['#d9d4e7','#e9b48e','#ba8957','#718896'],['#e6ddc9','#b47c56','#312c28','#a18553']];
const subscribers=i=>`<span class="subscriber-stack" aria-label="Four mock subscribers">${Array.from({length:4},(_,n)=>{
 const [bg,skin,hair,shirt]=avatarPalette[(i*2+n)%avatarPalette.length];
 return `<svg class="subscriber-avatar" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" fill="${bg}"/><path d="M3 40Q3 28 15 27H25Q37 28 37 40" fill="${shirt}"/><path d="M17 23H23V30H17Z" fill="${skin}"/><ellipse cx="20" cy="17" rx="8" ry="10" fill="${skin}"/><path d="M12 19Q7 7 17 5Q30 2 29 18L26 14L24 9Q19 16 12 14Z" fill="${hair}"/><path d="M16 18h1m6 0h1" stroke="#332c2c" stroke-width="1.5" stroke-linecap="round"/><path d="M18 23q2 2 4 0" fill="none" stroke="#855448" stroke-linecap="round"/></svg>`;
 }).join('')}</span>`;
$('#strategies').innerHTML=cards.map((c,i)=>`<div class="strategy-row"><button class="strategy-card" data-card="${i}" aria-label="Run ${c.name}" aria-pressed="false"><span class="card-heading"><span class="strategy-icon">${strategyIcon(i)}</span><span class="card-name">${c.name}</span></span><span class="card-meta"><img src="${c.logo}" alt=""><span>${c.market}</span><span>${c.period}</span><i></i><span>${c.stars} Stars</span><i></i><span class="publish-state">Published</span></span><span class="card-rule"></span><span class="performance"><span class="main-return"><span>${c.label}</span><strong class="positive">${c.value}</strong></span><svg class="spark" viewBox="0 0 175 68" aria-label="Upward mock strategy curve"><path class="chart-area" d="${c.curve} L175 68 L0 68Z"/><path class="chart-line" d="${c.curve}"/></svg></span><span class="card-metrics" style="grid-template-columns:repeat(${c.metrics.length},1fr)">${c.metrics.map(([label,value])=>`<span class="card-metric"><span>${label}</span><strong class="${value.startsWith('+')?'positive':''}">${value}</strong></span>`).join('')}</span><span class="card-rule lower"></span><span class="card-footer"><span class="card-metric"><span>Window</span><strong>${c.window}</strong></span><span class="card-metric"><span>Share</span><strong>${c.share}</strong></span><span class="card-metric"><span>Subscribers</span>${subscribers(i)}</span></span><i class="sheen"></i></button><div class="profits" aria-hidden="true">${'<span class="profit"></span>'.repeat(3)}</div></div>`).join('');
const cardEls=$$('.strategy-card'),profitEls=$$('.profits').map(e=>[...e.children]);
const title=mountAutopilotTitle($('#title'));
const state={t:0,manual:false,runStarts:[RUN,NEXT,Infinity],stopTimes:[STOP,Infinity,Infinity]};
const ease=gsap.parseEase('power2.out'),clamp=v=>Math.max(0,Math.min(1,v));
const green=gsap.utils.interpolate('#1a1a1a','#0AB56A'),white=gsap.utils.interpolate('#e7e7ea','#ffffff');
const gains=[[15,20,150],[25,80,200],[15,20,150]];
function paint(t){
 state.t=t;
 cardEls.forEach((card,i)=>{
  const age=t-state.runStarts[i],running=age>=0&&t<state.stopTimes[i],p=ease(clamp(age/.30))*(1-ease(clamp((t-state.stopTimes[i])/.28)));
  card.style.backgroundColor=green(p);card.style.color=white(p);
  const changedAt=t>=state.stopTimes[i]?state.stopTimes[i]:state.runStarts[i];
  card.style.scale=String(1-.018*Math.sin(Math.PI*clamp((t-changedAt)/.20)));
  card.classList.toggle('running',running);card.setAttribute('aria-pressed',String(running));
  card.disabled=t<TAB+.35;card.setAttribute('aria-label',`${running?'Stop':'Run'} ${cards[i].name}`);
  const elapsed=age-.12,last=Math.floor(elapsed/.50);
  profitEls[i].forEach((el,slot)=>{
   const n=last-slot,local=elapsed-n*.50;
   if(!running||n<0||n>=gains[i].length||!Number.isFinite(local)||local<0||local>=.72){el.style.opacity=0;return;}
   const enter=ease(clamp(local/.22)),leave=ease(clamp((local-.34)/.38));
   el.textContent=`+$${gains[i][n]}`;el.style.opacity=enter*(1-leave);
   el.style.transform=`translateY(${(1-enter)*35-leave*86}px) rotateX(${(1-enter)*-78+leave*35}deg)`;
  });
 });
 $('#scrub').value=Math.min(DURATION,t);$('#time').textContent=state.manual?'Interactive demo':`${t.toFixed(2)} / 7.70s`;
}
const timeline=gsap.timeline({paused:true,defaults:{ease:'minara'}});
timeline.fromTo('#title',{autoAlpha:1},{autoAlpha:0,duration:.20},1.36);
timeline.fromTo('#concept',{autoAlpha:0},{autoAlpha:1,duration:.01},1.60);
timeline.fromTo('.tabs>*',{x:1750,autoAlpha:1},{x:0,duration:.65,stagger:.055},1.60);
timeline.to('.tabs>span',{autoAlpha:0,duration:.20},TAB+.01);
timeline.to('#autopilot',{x:()=>960-($('#autopilot').offsetLeft+$('#autopilot').offsetWidth/2),y:-320,duration:.62},TAB+.02);
timeline.fromTo('#autopilot',{scale:1},{scale:.96,duration:.075},TAB-.05).to('#autopilot',{scale:1,duration:.20},TAB+.025);
cardEls.forEach((el,i)=>{
 const t=TAB+.35+i*.18;
 timeline.fromTo(el,{autoAlpha:0,y:40,scaleX:.94,scaleY:.62},{autoAlpha:1,y:0,scaleX:1,scaleY:1,duration:.62},t);
 timeline.fromTo(el.querySelector('.sheen'),{x:0,opacity:0},{x:800,opacity:1,duration:.86,ease:'power2.inOut'},t+.10);
 timeline.to(el.querySelector('.sheen'),{opacity:0,duration:.12},t+.87);
});
timeline.to({}, {duration:DURATION},0);
timeline.set('#cursor',{autoAlpha:0},0).set('#cursor',{x:1240,y:628,autoAlpha:1},2.18);
timeline.to('#cursor',{x:960,y:480,duration:.30,ease:'power2.inOut'},2.20);
timeline.to('#cursor',{x:510,y:780,duration:.60,ease:'power2.inOut'},2.86);
timeline.to('#cursor',{x:432,y:662,duration:.35,ease:'power2.inOut'},3.72);
timeline.to('#cursor',{x:520,y:1020,duration:.44,ease:'power2.inOut'},4.28);
timeline.to('#cursor',{x:432,y:662,duration:.30,ease:'power2.inOut'},5.64);
timeline.to('#cursor',{x:960,y:662,duration:.24,ease:'power2.inOut'},6.04);
timeline.to('#cursor',{x:1055,y:1020,duration:.28,ease:'power2.inOut'},6.43).to('#cursor',{autoAlpha:0,duration:.20},6.65);
for(const t of [TAB,RUN,STOP,NEXT]){
 timeline.fromTo('#cursor i',{scale:.2,opacity:.65},{scale:1.45,opacity:0,duration:.33,ease:'power2.out'},t);
 timeline.to('#cursor svg',{scale:.85,duration:.065},t).to('#cursor svg',{scale:1,duration:.16},t+.065);
}
timeline.eventCallback('onUpdate',()=>{title.seek(Math.min(timeline.time(),1.68));paint(timeline.time());$('#autopilot').setAttribute('aria-expanded',String(timeline.time()>=TAB));});
timeline.eventCallback('onComplete',()=>{$('#play').textContent='▶';$('#flow').pause();});
let liveTween=null,segment=null;
function stop(){liveTween?.kill();segment?.kill();liveTween=null;segment=null;timeline.pause();$('#flow').pause();$('#play').textContent='▶';}
function fit(){$('#stage').style.transform=`scale(${$('#viewport').clientWidth/1920})`;}
window.addEventListener('resize',fit);fit();
function background(t){const v=$('#flow');v.pause();if(Number.isFinite(v.duration))v.currentTime=t%v.duration;}
function seek(t){
 stop();state.manual=false;state.runStarts=[RUN,NEXT,Infinity];state.stopTimes=[STOP,Infinity,Infinity];$('#stage').classList.remove('manual');$('#interactive').classList.remove('active');
 t=clamp(Number(t)/DURATION)*DURATION;timeline.seek(t);title.seek(Math.min(t,1.68));paint(t);background(t);
}
function play(){
 const start=state.manual||state.t>=DURATION-.01?0:state.t;seek(start);
 timeline.timeScale(Number($('#speed').value)).play();$('#flow').playbackRate=Number($('#speed').value);$('#flow').play().catch(()=>{});$('#play').textContent='Ⅱ';
}
function manual(){
 stop();state.manual=true;state.runStarts=[Infinity,Infinity,Infinity];state.stopTimes=[Infinity,Infinity,Infinity];$('#stage').classList.add('manual');$('#interactive').classList.add('active');
 timeline.seek(2.43);title.seek(1.68);paint(2.43);background(2.43);
}
$('#autopilot').addEventListener('click',()=>{
 manual();segment=timeline.tweenTo(4.08,{duration:1.40,ease:'none',onComplete:()=>paint(4.08)});
});
cardEls.forEach((card,i)=>card.addEventListener('click',()=>{
 segment?.kill();segment=null;timeline.pause();
 if(!state.manual){stop();state.manual=true;state.runStarts=state.runStarts.map(t=>t<=state.t?t:Infinity);state.stopTimes=state.stopTimes.map(t=>t<=state.t?t:Infinity);$('#stage').classList.add('manual');$('#interactive').classList.add('active');}
 if(state.t>=state.runStarts[i]&&state.t<state.stopTimes[i])state.stopTimes[i]=state.t;
 else{state.runStarts[i]=state.t;state.stopTimes[i]=Infinity;}
 paint(state.t);
 if(!liveTween){
  const base=state.t,clock={value:0};
  // Manual review advances independently; each activation emits exactly three gains.
  liveTween=gsap.to(clock,{value:1,duration:1,repeat:-1,ease:'none',onUpdate:()=>paint(base+liveTween.totalTime())});
 }
}));
$('#play').addEventListener('click',()=>timeline.isActive()||liveTween||segment?.isActive()?stop():play());
$('#replay').addEventListener('click',()=>{seek(0);play();});$('#interactive').addEventListener('click',manual);
$('#scrub').addEventListener('input',e=>seek(e.target.value));$('#speed').addEventListener('change',()=>{timeline.timeScale(Number($('#speed').value));$('#flow').playbackRate=Number($('#speed').value);});
$$('[data-time]').forEach(b=>b.addEventListener('click',()=>seek(b.dataset.time)));
window.__timelines={'s12-s13-v4':timeline};window.scene={seek,play,manual,state,timeline,duration:DURATION,cards};
seek(0);document.fonts.ready.then(()=>seek(0));
