/* S10/S11: local review only, no account requests; GSAP timeline is seekable. */
gsap.registerPlugin(CustomEase);
CustomEase.create('minara','M0,0 C0.95,0.03 0,0.98 1,1');
CustomEase.create('entrance','M0,0 C0.16,1 0.3,1 1,1');
// @snapcn/text-swap fly-through defaults, adapted from the saved registry source.
CustomEase.create('swapEnter','M0,0 C0.2,0.6 0.35,1 1,1');
const $=s=>document.querySelector(s),duration=7.7;
// Reuse S08's manually redrawn reference series; no screenshot pixels.
const studioEquity=[10000,10000,9900,9770,10020,9540,9690,9380,9310,8990,8990,9200,9090,8990,9290,9050,9300,9630,9520,9550,9560,9560,9560,9800,10000,10530,10400,11080,11540,11540,11540,11440,11440,11440,11850,11900,11700,11240,11120,10850,10750,10900,10550,10100,10500,10190,9990,9970,10300,10850,11400,11400,11400,11100,11100,11100,11330,11800,11300,11750,12500,12500,12800,13320,12940,13300,13080,13231];
const studioBenchmark=[10000,11100,10700,10500,10200,10300,10100,10400,10500,10600,11100,11150,10700,11000,11400,11100,11300,10600,10200,10100,10400,10400,10100,9900,10300,9980,10200,10100,9500,9050,9900,9800,10500,11400,11700,12500,13200,12900,13300,13000,13000,12700,13000,12900,12500,12100,12400,12200,12000,12400,11700,12200,11900,12000,11000,10700,11500,12100,11800,11511];
const studioPath=data=>data.map((v,i)=>`${i?'L':'M'}${76+i/(data.length-1)*840},${222-(v-8000)/6000*204}`).join(' ');
$('#studio-profit').setAttribute('d',studioPath(studioEquity));$('#studio-drawdown').setAttribute('d',studioPath(studioEquity));$('#studio-benchmark').setAttribute('d',studioPath(studioBenchmark));
$('#studio-grid').innerHTML=[8000,9000,10000,11000,12000,13000,14000].map(v=>{const y=222-(v-8000)/6000*204;return `<line x1="76" x2="916" y1="${y}" y2="${y}"/><text x="61" y="${y+5}" text-anchor="end">${v.toLocaleString('en-US')}</text>`;}).join('')+['Dec','2026','Feb','Mar','Apr','May','Jun','Jul','Aug'].map((m,i)=>`<text x="${100+i*99}" y="250">${m}</text>`).join('');
$('#studio-runs').innerHTML=[['+7.02%','4.75%','1.21','46','582eaa660c55'],['+2.83%','5.08%','0.56','48','4df30c40dfd7'],['+32.31%','16.50%','1.59','46','']].map(s=>`<div class="studio-run-result"><p><span>◉</span> GOOGL · 1h · 2025-11-20 ~ 2026-08-21</p><div class="assistant-stat-grid"><div>Return<b class="up">${s[0]}</b></div><div>Max drawdown<b>${s[1]}</b></div><div>Win rate<b>—</b></div><div>Sharpe<b>${s[2]}</b></div><div>Trades<b>${s[3]}</b></div><div>Profit factor<b>—</b></div></div>${s[4]?`<div class="assistant-complete">⊙　Backtest complete <span>${s[4]}</span></div>`:''}</div>`).join('');
function showProductTab(studio){$('#studio-content').hidden=!studio;$('#market-content').hidden=studio;$('.windowbar span').textContent=studio?'Strategies':'Marketplace';$('#studio-tab').classList.toggle('selected',studio);$('#market-tab').classList.toggle('selected',!studio);}
document.title='S10 + S11 · v2  · test page';
$('#note').textContent='v2 ·  → Background →  →  /  →  → Running / Confetti Burst。UI All DOM / SVG；title TextSwap 。test pageawaiting confirmation； MP4 。';
const strategies=[
 ['CoinFull Prime (Neutral)','Coin Full',168,'Minara Labs',111.76,7008,28.71,2.02,2074,20],
 ['Multi-value-profit Tradfi 30, Top 3','TradFi 30',174,'Lowes',79.51,380.43,24.03,1.85,978,30],
 ['Major Trend CTA 1.0','Coin 30',50,'Minara Labs',74.05,670.06,26.74,1.57,1344,20],
 ['Grouped Multi-Factor Momentum Long + Market Trend Gate for Lower…','TradFi 30',82,'Knight',60.24,606.16,20.96,2,1511,20],
 ['Earnings Momentum Long + Enhanced Trend Gate, Tradfi 30, Top 5 Equal…','TradFi 30',88,'Knight',57.85,437.07,22.63,1.66,1342,20],
 ['Long top-5 liquidity stock','TradFi 30',52,'MrTokenAI',53.33,505.07,22.67,1.79,1537,20],
 ['Long low-KZ (unconstrained) firms','TradFi 30',41,'MrTokenAI',42.23,339.11,23.34,1.34,1532,20],
 ['5 day momentum stock','TradFi 30',69,'MrTokenAI',41.31,327.32,16.11,2.01,1532,20],
 ['Drawdown-managed multi-factor long-short, Tradfi 30','TradFi 30',28,'Anglespoised',338.42,12085.93,21.74,3.06,1186,20],
 ['3-Day Fixed Basket Long/Short Strategy: ZEC & HYPE vs. XRP & SUI','Coin 50',164,'LFE',375.91,492.40,25.06,3.85,416,20],
 ["Barren Wuffet’s Secretary",'Coin Full',13,'BW Capital',135.76,139.96,6.74,4.38,372,5],
 ['Aurora Trend Fusion','Coin 30',54,'Fiddy',158.38,208.76,10.54,3.45,433,20]
];
const universe='<svg class="universe" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="#f5f5f5"/><ellipse cx="15" cy="20" rx="7" ry="14" fill="#1a1a1a"/><ellipse cx="21" cy="20" rx="7" ry="14" fill="#1a1a1a" stroke="#f5f5f5" stroke-width="2"/><ellipse cx="27" cy="20" rx="6" ry="14" fill="#1a1a1a" stroke="#f5f5f5" stroke-width="2"/></svg>';
// Manually reconstructed sparkline geometry; fixed reference values, no random returns.
const curves=[ [3,4,3,6,5,5,6,6,5,7,5,6,7,6,7,5,7,8,7,9,7,10,9,13,11,13,12,16,14,20,16,23,19,28,24,36,29,47,40,59,49,63,56,70,65,69,64,76], [2,3,4,6,5,7,8,9,8,10,10,12,9,12,11,13,16,14,18,16,15,20,18,23,20,28,21,32,28,32,31,38,41,36,42,48,40,51,58,53,66,61,70,65,76,69,74,77], [3,5,7,6,10,9,12,8,14,16,12,19,17,23,20,17,24,21,28,26,31,28,25,31,29,37,33,44,34,38,31,48,40,43,51,46,58,53,62,48,66,56,53,71,65,61,58,78] ];
function chart(i){const a=curves[i%3],points=a.map((v,j)=>`${(j*215/(a.length-1)).toFixed(1)},${88-v}`).join(' ');return `<svg class="spark" viewBox="0 0 215 92" role="img" aria-label="Historical return curve"><polygon points="0,92 ${points} 215,92" fill="#50af70" fill-opacity=".17"/><polyline points="${points}" fill="none" stroke="#0ab56a" stroke-width="1.7" stroke-linejoin="round"/></svg>`;}
function card(i,hero=false){const s=strategies[i],official=s[3]==='Minara Labs';return `<article class="strategy" data-strategy="${i}" aria-label="${s[0]}"><div class="card-heading" role="button" tabindex="0" aria-label="View ${s[0]}">${universe}<h2>${s[0]}</h2></div><div class="meta"><span class="asset-icons"><img src="assets/logos/${s[1].startsWith('Coin')?'btc':'nvda'}.svg" alt=""><img src="assets/logos/eth.svg" alt=""><img src="assets/logos/sol.svg" alt=""></span>${s[1]}<span class="divider">|</span>${s[2]} Stars<span class="divider">|</span><span>◉ ${s[3]}</span><span class="badge ${official?'':'community'}">✓</span></div><div class="performance"><div><span class="label">Annualized Return</span><strong class="annual">+${s[4].toFixed(2)}%</strong></div>${chart(i)}</div><div class="stats"><div><span class="label">Window Return</span><strong class="positive">+${s[5].toFixed(2)}%</strong></div><div class="risk-stat"><span class="label">Max Drawdown</span><strong class="muted">${s[6].toFixed(2)}%</strong></div><div><span class="label">Sharpe Ratio</span><strong>${s[7].toFixed(2)}</strong></div></div><div class="bottom-stats"><div><span class="label">Window</span><strong>${s[8]}d</strong></div><div><span class="label">Share</span><strong>${s[9]}%</strong></div><div><span class="label">Subscribers</span><div class="avatars"><span>B</span><span>◉</span><span>U</span><span>99+</span></div></div></div><div class="actions"><button class="star" aria-label="Star ${s[0]}" aria-pressed="true">★</button><button class="run" ${hero?'id="hero-run"':''}>Run</button></div></article>`;}
$('#cards').innerHTML=Array.from({length:20},(_,i)=>`<div class="card-wrap" data-i="${i}">${card(i%strategies.length)}</div>`).join('');
$('#hero').innerHTML=card(0,true);
const heroOriginal=$('#hero').firstElementChild;
// Local vector confetti: fixed trajectories share the same seek clock as the UI.
const confetti=document.createElement('div');
confetti.id='confetti';confetti.setAttribute('aria-hidden','true');
Object.assign(confetti.style,{position:'absolute',inset:'0',pointerEvents:'none'});
const ribbons=Array.from({length:120},(_,i)=>{
 const e=document.createElement('i');
 Object.assign(e.style,{position:'absolute',left:'0',top:'0',width:`${12+i%5*3}px`,height:`${30+i%7*5}px`,borderRadius:i%4===0?'40% 5%':'2px',background:['#0AB56A','#FAC800','#007BE5','#F75D5F','#e7e7ea'][i%5],opacity:0});
 confetti.append(e);return e;
});
$('#stage').insertBefore(confetti,$('#hero'));
let feedbackDriver=null;
function runFeedback(elapsed){
 const button=$('#hero-run'),running=elapsed>=0;
 button.textContent=running?'Running':'Run';button.disabled=running;
 const stage=$('#stage').getBoundingClientRect(),b=$('#hero').getBoundingClientRect(),scale=stage.width/1920;
 ribbons.forEach((e,i)=>{
  const t=Math.max(0,elapsed-(i%5)*.008),angle=i*2.3999632297,flight=gsap.parseEase('power2.out')(Math.min(1,t/.58)),radius=(530+(i%11)*57)*flight;
  const x=(b.left+b.width*.5-stage.left)/scale+Math.cos(angle)*radius;
  const y=(b.top+b.height*.5-stage.top)/scale+Math.sin(angle)*radius*.72+170*t*t;
  e.style.opacity=running&&t>0?Math.max(0,1-Math.max(0,(t-.34)/.20)):0;
  e.style.transform=`translate(${x}px,${y}px) rotate(${i*29+t*(360+i*5)}deg) rotateY(${i*11+t*520}deg)`;
 });
}
const wrappers=[...document.querySelectorAll('.card-wrap')];
const grid=i=>({x:163+(i%3)*531,y:420+Math.floor(i/3)*530,scale:1,rotation:0,rotationX:0,rotationY:0,z:0});
gsap.set('#client',{opacity:0,y:950,scale:1.06,x:0});
gsap.set('#world,#hero,#cursor,#click-ring',{autoAlpha:0});
gsap.set('#world',{clipPath:'inset(410px 130px 85px 130px)'});
gsap.set('#hero',{scale:1.38,rotationY:0});
gsap.set('#wash',{backgroundColor:'#0f0f11',opacity:0});
wrappers.forEach((e,i)=>gsap.set(e,grid(i)));
const tl=gsap.timeline({paused:true});
tl.to('#client',{opacity:1,y:0,duration:1,ease:'minara'},1.15)
 .set('#cursor',{autoAlpha:1,x:600,y:410},1.8)
 .to('#cursor',{x:943,y:207,duration:.5,ease:'minara'},1.8)
 .to('#client',{x:0,scale:1,duration:.72,ease:'minara'},2.24)
 .set('#world',{autoAlpha:1},2.50)
 .fromTo('#cards',{y:80,opacity:0},{y:0,opacity:1,duration:.48,ease:'entrance'},2.5)
 .to('#cursor',{autoAlpha:0,duration:.2},2.6)
 .set('#world',{clipPath:'inset(0px 0px 0px 0px)'},3.05)
 .to('#client',{opacity:0,scale:.97,duration:.38,ease:'power2.inOut'},3.08)
 .to('#wash',{opacity:.96,duration:.5,ease:'power2.inOut'},3.12)
 .to(wrappers.slice(1),{autoAlpha:0,duration:.16,ease:'power2.out'},3.05)
 .set(wrappers[0],{zIndex:2},3.05)
 .to(wrappers[0],{x:710,y:289,scale:1.08,duration:.52,ease:'minara'},3.05);
// Five columns / four staggered rows. Each row has its own lateral travel;
// the parent translates upward. The original focused DOM card lands at center.
const wall=i=>{const slot=i===0?12:i===12?0:i,row=Math.floor(slot/5),col=slot%5;return {row,x:-5+col*410+(row%2?205:0)-250,y:-50+row*390-251};};
wrappers.forEach((e,i)=>{
 const p=wall(i),at=3.78+p.row*.055+(i%5)*.018;
 if(i!==0)tl.set(e,{x:p.x,y:p.y+24,scale:.48,z:0,rotation:0,rotationX:0,rotationY:0},3.7)
   .to(e,{autoAlpha:1,y:p.y,scale:.72,duration:.45,ease:'entrance'},at);
 else tl.to(e,{x:p.x,y:p.y,scale:.72,duration:.53,ease:'minara'},3.82);
 tl.to(e,{x:p.x+(p.row%2?-145:145),duration:1.48,ease:'power1.inOut'},4.35);
 if(i!==0)tl.to(e,{autoAlpha:0,scale:.64,duration:.42,ease:'power2.inOut'},5.83+Math.abs(p.row-2)*.035);
});
tl.to('#cards',{y:-190,duration:1.64,ease:'power1.inOut'},4.19)
 .to(wrappers[0],{x:710,y:458,scale:1.38,duration:.62,ease:'minara'},5.86)
 .to('#wash',{opacity:0,duration:.6,ease:'power2.inOut'},5.96)
 // Identical pose handoff to the interactive card; no change in pixels or text.
 .set(wrappers[0],{autoAlpha:0},6.48)
 .set('#hero',{autoAlpha:1},6.48)
 .set('#cursor',{autoAlpha:1,x:1335,y:870},6.51)
 .to('#cursor',{x:1000,y:807,duration:.59,ease:'minara'},6.51)
 .to('#hero-run',{scale:.975,backgroundColor:'#398852',duration:.10,ease:'power2.out'},7.1)
 .set('#click-ring',{autoAlpha:.7,x:1000,y:807,scale:.2},7.1)
 .to('#click-ring',{autoAlpha:0,scale:1.15,duration:.4,ease:'power2.out'},7.1)
 .to('#hero-run',{scale:1,backgroundColor:'#50af70',duration:.16},7.27)
 .to('#cursor',{x:1006,y:812,duration:.3,ease:'power2.out'},7.32)
 .to({}, {duration:.08},7.62);
const clamp=n=>Math.max(0,Math.min(1,n)),swapEnter=gsap.parseEase('swapEnter');
const textGroups=[...document.querySelectorAll('#cards h2,#cards .meta,#cards .label,#cards strong,#market-content h1')],heroText=[...document.querySelectorAll('#hero h2,#hero .meta,#hero .label,#hero strong')];
function textSwap(t){window.titleFrame=Math.round(t*30);window.setTitleFrame?.(window.titleFrame);for(const [elements,start] of [[textGroups,2.5],[heroText,5.22]]){const q=swapEnter(clamp((t-start)/(16/30)));for(const e of elements){e.style.opacity=q;e.style.transform=`scale(${.82+.18*q})`;e.style.filter=`blur(${9*(1-q)}px)`;}}}
let interactive=false,driver=null,time=0,step='title';const playhead={t:0};
function sync(t){time=t;tl.seek(t,false);showProductTab(t<2.25);textSwap(t);runFeedback(t-7.1);if(t>=1.8&&t<2.8){const s=$('#stage').getBoundingClientRect(),a=$('#studio-tab').getBoundingClientRect(),b=$('#market-tab').getBoundingClientRect(),q=gsap.parseEase('minara')(clamp((t-1.8)/.5)),scale=s.width/1920;gsap.set('#cursor',{x:((a.x+a.width/2)*(1-q)+(b.x+b.width/2)*q-s.x)/scale,y:((b.y+b.height*.67)-s.y)/scale});}step=t<1.45?'title':t<2.5?'tabs':t<3.05?'browse':t<3.78?'focus':t<5.86?'wall':t<7.1?'review':'run';$('#studio-tab').classList.toggle('selected',t<2.25);$('#market-tab').classList.toggle('selected',t>=2.25);$('#scrub').value=t;$('#time').value=`${t.toFixed(2)} / 7.70s`;const v=$('#flow');if(v.readyState>=2&&!v.seeking&&Math.abs(v.currentTime-t)>.06)v.currentTime=t;}
function pause(){driver?.kill();driver=null;feedbackDriver?.kill();feedbackDriver=null;$('#play').textContent='';}
function seek(t){pause();interactive=false;$('#hero').replaceChildren(heroOriginal);heroOriginal.querySelector('.run').classList.remove('pressed');heroOriginal.querySelector('.run').removeAttribute('aria-pressed');$('#interaction-note').hidden=true;resetFilter();playhead.t=Math.max(0,Math.min(duration,Number(t)||0));sync(playhead.t);}
function play(){if(interactive)seek(0);if(time>=duration-.02)seek(0);pause();driver=gsap.to(playhead,{t:duration,duration:duration-time,ease:'none',onUpdate:()=>sync(playhead.t),onComplete:pause});$('#play').textContent='';}
function interactiveStart(){seek(2.99);interactive=true;gsap.set('#cursor',{autoAlpha:0});$('#interaction-note').hidden=false;$('#market-tab').focus();}
function resetFilter(){wrappers.forEach(e=>e.style.display='');$('#search').value='';for(const s of document.querySelectorAll('.filters select'))s.selectedIndex=0;}
function applyFilter(){if(!interactive)return;const query=$('#search').value.toLowerCase(),cat=$('#category').value,asset=$('#asset').value,style=$('#style').value,dir=$('#direction').value,official=$('#creator').value==='official',risk=$('#risk').value;let matches=strategies.map((s,i)=>({s,i})).filter(({s})=>s[0].toLowerCase().includes(query)&&(cat==='all'||s[1].includes(cat))&&(asset==='all'||s[1].includes(asset))&&(style==='all'||s[0].includes(style))&&(dir==='all'||s[0].includes(dir))&&(!official||s[3]==='Minara Labs')&&(risk==='all'||s[6]<+risk));if($('#sort').value==='return')matches.sort((a,b)=>b.s[4]-a.s[4]);if($('#sort').value==='risk')matches.sort((a,b)=>a.s[6]-b.s[6]);wrappers.forEach(e=>e.style.display='none');matches.forEach(({i},j)=>{wrappers[i].style.display='';gsap.set(wrappers[i],grid(j));});}
function inspect(i){if(!interactive)return;$('#hero').innerHTML=card(i,true);gsap.set('#world,#client',{autoAlpha:0});gsap.set('#hero',{autoAlpha:1,scale:1.38,rotationY:0});gsap.set('#cursor',{autoAlpha:0});step='review';}
document.addEventListener('click',e=>{if(!interactive)return;const cardEl=e.target.closest('.strategy');if(!cardEl)return;const i=+cardEl.dataset.strategy;if(e.target.closest('.star')){const b=e.target.closest('button'),active=b.getAttribute('aria-pressed')==='true';b.setAttribute('aria-pressed',String(!active));b.textContent=active?'☆':'★';return;}if(e.target.closest('.run')){if(!e.target.closest('#hero'))return inspect(i);const b=e.target.closest('button');b.classList.add('pressed');b.setAttribute('aria-pressed','true');step='run';runFeedback(0);const feedback={elapsed:0};feedbackDriver=gsap.to(feedback,{elapsed:.65,duration:.65,ease:'none',onUpdate:()=>runFeedback(feedback.elapsed),onComplete:()=>{b.classList.remove('pressed');feedbackDriver=null;}});$('#interaction-note').textContent='Running · localStatus。Esc 。';return;}inspect(i);});
document.addEventListener('keydown',e=>{if(interactive&&e.key==='Enter'&&e.target.matches('.card-heading'))inspect(+e.target.closest('.strategy').dataset.strategy);if(interactive&&e.key==='Escape')interactiveStart();if(e.target.matches('input,select,button'))return;if(e.code==='Space'){e.preventDefault();driver?pause():play();}if(e.key==='ArrowRight')seek(time+1/30);if(e.key==='ArrowLeft')seek(time-1/30);});
$('#market-tab').onclick=()=>{if(interactive){gsap.set('#world',{autoAlpha:1});showProductTab(false);applyFilter();}};
$('#studio-tab').onclick=()=>{if(interactive){gsap.set('#world',{autoAlpha:0});showProductTab(true);}};
$('#search').oninput=applyFilter;document.querySelectorAll('.filters select').forEach(e=>e.onchange=applyFilter);
$('#play').onclick=()=>driver?pause():play();$('#replay').onclick=()=>{seek(0);play();};$('#interactive').onclick=interactiveStart;$('#scrub').oninput=e=>seek(+e.target.value);
[[.65,'Title'],[2.18,'Studio → Marketplace'],[2.99,''],[3.64,''],[4.85,' ↑'],[6.52,''],[7.3,' Run']].forEach(([t,label])=>{const b=document.createElement('button');b.textContent=label;b.onclick=()=>seek(t);$('#chapters').append(b);});
function resize(){const w=Math.min(innerWidth-40,1600,(innerHeight-253)*16/9),h=w*9/16;$('#viewport').style.width=w+'px';$('#viewport').style.height=h+'px';$('#stage').style.transform=`scale(${w/1920})`;}
addEventListener('resize',resize);resize();$('#flow').addEventListener('loadeddata',()=>sync(time));
window.scene={seek,play,pause,interactiveStart,tl,strategies,get state(){return {time,step,interactive,playing:!!driver};}};window.__timelines={'s10-s11':tl};sync(0);
