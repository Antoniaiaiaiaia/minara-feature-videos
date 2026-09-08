/* Fresh S12/S13 composition. All state and data are local, fixed demonstrations. */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const DURATION=7.7,RUN=6.02;
gsap.registerPlugin(CustomEase);
CustomEase.create('minara','0.16,1,0.3,1');
CustomEase.create('camera','0.87,0,0.13,1');
const icon=name=>ICONS[name]||'',asset=name=>`assets/logos/${name}.svg`;
const strategies=[
 {name:'CoinFull Prime (Neutral)',creator:'Minara Labs',universe:'Coin Full',coins:['btc','eth','sol'],pnl:1248,percent:11.11,seed:0,running:true},
 {name:'Multi-value-profit Tradfi 30, Top 3',creator:'Lowes',universe:'TradFi 30',coins:['nvda','tsla'],pnl:312,percent:6.24,seed:1},
 {name:'MU SKHYNIX SAMSUNG SNDK, long upward trend, daily',creator:'You',universe:'TradFi 30',coins:['mu','nvda'],pnl:286.4,percent:5.73,seed:2},
 {name:'Multi-factor momentum · daily',creator:'Knight',universe:'TradFi 30',coins:['tsla','nvda'],pnl:194.8,percent:3.90,seed:3}
];
const positions=[['btc','BTC','0.045','61,420','63,850','$2,873.25','+$109.35','+$0.032'],['eth','ETH','0.80','2,480','2,618','$2,094.40','+$110.40','+$0.024'],['sol','SOL','12.0','139.20','147.85','$1,774.20','+$103.80','+$0.018']];
function icons(){ $$('[data-icon]').forEach(e=>e.innerHTML=icon(e.dataset.icon)); }
$('#side-nav').innerHTML=[['House','Office'],['ChartNoAxesCombined','Markets'],['MessageSquare','Chat'],['CodeXml','Coding'],['ChartCandlestick','Strategies'],['Wallet','Portfolio'],['LayoutGrid','More']].map(([i,n])=>`<button data-nav="${n}" class="${n==='Strategies'?'selected':''}">${icon(i)}${n}</button>`).join('');
$('#metrics').innerHTML=[['Total equity','$12,480.00',''],['30D P&L','+$1,248.00','+11.11%'],['Unrealized P&L','+$384.60','+3.08%'],['Active Strategies','1','']].map(([label,value,change],i)=>`<div class="metric grow"><label>${label}</label><strong class="${i===1||i===2?'positive':''}">${value}<small>${change}</small></strong></div>`).join('');
$('#wallet-list').innerHTML=['manual trading','Default Lighter','tutorial'].map((n,i)=>`<button class="wallet-item other-wallet"><span class="wallet-name"><i class="status-dot"></i><img src="${asset('hype')}" alt="">${n}</span><span class="wallet-value">Total Value<b>${i?'$0.00':'$2,560.00'}</b></span></button>`).join('');
$('#positions-table').innerHTML=`<div class="table-line header">${['Symbol','Side','Size','Entry','Mark','Position Value','Unrealized PnL','Funding','TP/SL'].map(x=>`<span>${x}</span>`).join('')}</div>`+positions.map(p=>`<div class="table-line"><span class="symbol"><img src="${asset(p[0])}" alt="">${p[1]} <small class="muted">3x</small></span><span><b class="side-label">Long</b></span>${p.slice(2).map((x,i)=>`<span class="${i===4?'positive':''}">${x}</span>`).join('')}<span>Add</span></div>`).join('');
function points(seed=0,n=35,width=450,height=120){
 // Fixed positive increments: every chart climbs without a single declining segment.
 let v=0;const a=Array.from({length:n},(_,i)=>(v+=.18+Math.pow((Math.sin(i*.63+seed)+1)/2,3)*8+((i+seed*3)%17===0?6:0)));
 return a.map((x,i)=>[i/(n-1)*width,height-(x-a[0])/(a[n-1]-a[0])*(height-12)]);
}
const pathD=p=>p.map(([x,y],i)=>`${i?'L':'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
function spark(seed){const p=points(seed,24,100,39);return `<svg viewBox="0 0 103 45" aria-label="Upward strategy curve"><path class="chart-line" d="${pathD(p)}" stroke-width="1.7"/></svg>`;}
function chart(){const p=points(4,62,986,134).map(([x,y])=>[x+60,y+5]);return `<svg viewBox="0 0 1060 185" aria-label="PnL increases from 5600 to 12480"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#0AB56A" stop-opacity=".23"/><stop offset="1" stop-color="#0AB56A" stop-opacity=".03"/></linearGradient><clipPath id="dashboard-reveal"><rect id="dashboard-clip" x="58" y="0" width="990" height="159"/></clipPath></defs>${[20,62,105,148].map((y,i)=>`<line class="chart-grid" x1="60" x2="1046" y1="${y}" y2="${y}"/><text class="chart-label" text-anchor="end" x="47" y="${y+4}">${['$12,500','$10,000','$7,500','$5,000'][i]}</text>`).join('')}<g clip-path="url(#dashboard-reveal)"><path d="${pathD(p)} L1046,150 L60,150Z" fill="url(#area)"/><path class="chart-line" d="${pathD(p)}"/></g>${['08-09','08-13','08-17','08-21','08-25','08-29','09-01','09-05'].map((x,i)=>`<text class="chart-label" x="${60+i*139}" y="178" text-anchor="${i===7?'end':'start'}">${x}</text>`).join('')}</svg>`;}
$('#autopilot-chart').innerHTML=chart();
const tableHead=()=>`<div class="strategy-columns strategy-table-head"><span>Strategy</span><span>Creator</span><span>Universe</span><span>Performance</span><span>Total PnL</span></div>`;
const card=(s,i)=>`<button class="strategy-columns strategy-card" data-strategy="${i}" aria-label="Open ${s.name}"><span class="strategy-name"><i class="status-dot" style="background:${s.running?'#0AB56A':'#777'}"></i><span>${s.name}</span></span><span class="creator">${i===0||i===2?'<img src="assets/avatar.png" alt="">':`<span class="creator-avatar">${s.creator[0]}</span>`}${s.creator}</span><span class="universe"><span class="token-stack">${s.coins.slice(0,2).map(x=>`<img src="${asset(x)}" alt="">`).join('')}</span>${s.universe}</span><span class="performance">${spark(s.seed)}</span><span class="strategy-return">+$${s.pnl.toFixed(2)}<small>+${s.percent.toFixed(2)}%</small></span><i class="card-sheen"></i></button>`;
$('#strategy-list').innerHTML=`<div class="group-heading">Running <small id="running-count">1</small></div>${tableHead()}<div id="running-list">${card(strategies[0],0)}</div><div class="group-heading">Paused <small id="paused-count">3</small></div>${tableHead()}<div id="paused-list">${strategies.slice(1).map((s,i)=>card(s,i+1)).join('')}</div>`;
const livePoints=points(6,42,497,110).map(([x,y])=>[x+18,y+14]);
$('#live-chart').innerHTML=`<svg viewBox="0 0 533 169" preserveAspectRatio="none" aria-label="Strategy equity increases after Run"><defs><linearGradient id="live-area" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#0AB56A" stop-opacity=".18"/><stop offset="1" stop-color="#0AB56A" stop-opacity=".015"/></linearGradient><clipPath id="live-reveal"><rect id="live-clip" width="0" height="137"/></clipPath></defs>${[40,84,128].map(y=>`<line class="chart-grid" x1="18" x2="515" y1="${y}" y2="${y}"/>`).join('')}<g clip-path="url(#live-reveal)"><path d="${pathD(livePoints)} L515,134 L18,134Z" fill="url(#live-area)"/><path class="chart-line" id="live-path" d="${pathD(livePoints)}"/></g><circle id="live-tip" r="3.5" fill="#0AB56A" cx="18" cy="124"/><text class="chart-label" x="18" y="153">09:00</text><text class="chart-label" x="266.5" y="153" text-anchor="middle">12:00</text><text class="chart-label" x="515" y="153" text-anchor="end">Now</text></svg>`;
function makeRoll(el,value){el.innerHTML=[...value].map(c=>`<span class="digit ${c==='$'?'currency':/\d/.test(c)?'':'punctuation'}"><span class="digit-strip"><span class="digit-face">${c}</span><span class="digit-face">${c}</span></span></span>`).join('');}
const money=v=>v.toLocaleString('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2});
makeRoll($('#wallet-balance'),money(12480));makeRoll($('#strategy-equity'),money(5312));
const walletValues=[12480,12492.48,12516.80,12550.42,12591.19,12641.73,12704.80,12748.32,12840.68];
function roll(el,values,progress){
 const segment=Math.min(values.length-1,Math.max(0,progress)*(values.length-1)),i=Math.floor(segment),p=gsap.parseEase('power2.inOut')(segment-i),a=money(values[i]),b=money(values[Math.min(i+1,values.length-1)]);
 [...el.children].forEach((d,n)=>{const strip=d.firstElementChild,faces=strip.children,changed=a[n]!==b[n];faces[0].textContent=a[n];faces[1].textContent=b[n];strip.style.transform=`translateY(-${changed?p*1.08:0}em)`;faces[0].style.transform=`rotateX(${changed?p*32:0}deg)`;faces[1].style.transform=`rotateX(${changed?(p-1)*32:0}deg)`;});
 el.setAttribute('aria-label',money(values[i]));el.dataset.value=String(values[i]);
}
icons();
const title=window.mountAutopilotTitle?window.mountAutopilotTitle($('#title')):null;
const state={t:0,manual:false,selected:1,playing:false};
const timeline=gsap.timeline({paused:true,defaults:{ease:'minara'}});
timeline.fromTo('#title',{autoAlpha:1,y:0},{autoAlpha:0,y:-45,duration:.3,ease:'power2.in'},1.36);
timeline.fromTo('#product',{autoAlpha:0,y:150,scale:.92,rotationX:5},{autoAlpha:1,y:0,scale:1,rotationX:0,duration:.7},1.35);
timeline.fromTo('#dashboard',{autoAlpha:0},{autoAlpha:1,duration:.01},1.97);
$$('.grow').forEach((el,i)=>{const start=2.0+Math.min(i*.09,.78);timeline.fromTo(el,{autoAlpha:0,y:24,scaleY:.9},{autoAlpha:1,y:0,scaleY:1,duration:.55,transformOrigin:'50% 0'},start);});
timeline.fromTo('.other-wallet',{autoAlpha:0,y:14},{autoAlpha:1,y:0,duration:.45,stagger:.09},2.40);
timeline.fromTo('#dashboard-clip',{attr:{width:0}},{attr:{width:990},duration:.75,ease:'power2.inOut'},2.68);
timeline.fromTo('.table-line:not(.header)',{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.35,stagger:.075},2.9);
timeline.to('#autopilot-page',{autoAlpha:0,duration:.12},3.82);
timeline.fromTo('#portfolio-page',{autoAlpha:0},{autoAlpha:1,duration:.1},3.83);
timeline.fromTo('.portfolio-heading',{autoAlpha:0,y:25},{autoAlpha:1,y:0,duration:.5},3.84);
timeline.fromTo('.portfolio-tabs',{autoAlpha:0,y:15},{autoAlpha:1,y:0,duration:.4},3.96);
timeline.fromTo('.group-heading,.strategy-table-head,.explore',{autoAlpha:0,y:12},{autoAlpha:1,y:0,duration:.4,stagger:.04},4.12);
$$('.strategy-card').forEach((el,i)=>{const start=4.20+i*.18;timeline.fromTo(el,{autoAlpha:0,y:29,scaleY:.55},{autoAlpha:1,y:0,scaleY:1,duration:.56},start);timeline.fromTo(el.querySelector('.card-sheen'),{x:0,opacity:0},{x:1900,opacity:1,duration:.78,ease:'power2.inOut'},start+.06);timeline.to(el.querySelector('.card-sheen'),{opacity:0,duration:.1},start+.80);});
timeline.fromTo('#drawer-shade',{autoAlpha:0},{autoAlpha:1,duration:.35},5.34);
timeline.fromTo('#drawer',{x:590,autoAlpha:0},{x:0,autoAlpha:1,duration:.50},5.34);
timeline.fromTo('.drawer-header,.drawer-equity,.live-section,.drawer-positions,.drawer-footer',{y:14,autoAlpha:0},{y:0,autoAlpha:1,duration:.42,stagger:.04},5.36);
timeline.fromTo('#run',{scale:1},{scale:.955,duration:.09,ease:'power2.in'},RUN-.07).to('#run',{scale:1,duration:.18},RUN+.02);
timeline.to({}, {duration:DURATION},0);
const pointerKeys=[
 [1.65,690,308],[1.92,513,184],[2.01,513,184],[2.5,637,270],
 [3.44,572,324],[3.79,480,439],[3.91,480,439],[4.52,999,570],
 [5.16,710,670],[5.33,710,670],[5.65,1431,869],[5.98,1421,957],
 [6.12,1421,957],[6.55,1610,993]
];
timeline.set('#cursor',{autoAlpha:0},0).set('#cursor',{autoAlpha:1,x:pointerKeys[0][1],y:pointerKeys[0][2]},pointerKeys[0][0]);
pointerKeys.slice(1).forEach(([t,x,y],i)=>timeline.to('#cursor',{x,y,duration:t-pointerKeys[i][0],ease:'power2.inOut'},pointerKeys[i][0]));
timeline.to('#cursor',{autoAlpha:0,duration:.25},6.42);
for(const t of [1.97,3.82,5.34,RUN]){timeline.fromTo('#cursor>span',{scale:.2,opacity:.9},{scale:1.5,opacity:0,duration:.3,ease:'power2.out'},t);timeline.to('#cursor svg',{scale:.85,duration:.07},t).to('#cursor svg',{scale:1,duration:.15},t+.07);}
let lastRunning=null;
function update(){
 const t=timeline.time();state.t=t;
 title?.seek(Math.min(t,1.68));
 const inWallet=t>=3.83,running=t>=RUN+.1,p=Math.max(0,Math.min(1,(t-RUN-.09)/(DURATION-RUN-.15)));
 $('#autopilot-tab').classList.toggle('selected',t>=1.97);$('#welcome-tab').classList.toggle('selected',t<1.97);
 $('#page-name').textContent=inWallet?'Portfolio':'Strategies';
 $$('#side-nav button').forEach(b=>b.classList.toggle('selected',b.dataset.nav===(inWallet?'Portfolio':'Strategies')));
 roll($('#wallet-balance'),walletValues,p);roll($('#strategy-equity'),walletValues.map(v=>v-7168),p);
 $('#live-clip').setAttribute('width',String(18+p*497));
 const at=p*(livePoints.length-1),i=Math.floor(at),next=Math.min(i+1,livePoints.length-1),mix=at-i;
 $('#live-tip').setAttribute('cx',livePoints[i][0]+(livePoints[next][0]-livePoints[i][0])*mix);$('#live-tip').setAttribute('cy',livePoints[i][1]+(livePoints[next][1]-livePoints[i][1])*mix);$('#live-tip').style.opacity=String(running?1:0);
 $('#live-pnl').innerHTML=`+${money(312+(walletValues.at(-1)-12480)*p)} <small>+${((312+(walletValues.at(-1)-12480)*p)/50).toFixed(2)}%</small>`;
 $('#live-unrealized').textContent='+'+money(84.6+148.1*p);$('#live-day').textContent='+'+money(64.2+127.83*p);
 if(running!==lastRunning){
  lastRunning=running;$('#strategy-status').textContent=running?'Running':'Paused';$('#run').innerHTML=running?icon('Check')+'Running':'Run';$('#run').classList.toggle('running',running);$('#run').disabled=running;$('#position-count').textContent=running?'(2)':'(0)';$('#running-count').textContent=running?'2':'1';$('#paused-count').textContent=running?'2':'3';
  $('#live-positions').innerHTML=running?['nvda','tsla'].map((x,i)=>`<div class="live-position"><span><img src="${asset(x)}" alt="">${x.toUpperCase()}</span><span>Long 3x</span><span>+$${i?'78.42':'154.28'}</span></div>`).join(''):'<p>This run has no open positions.</p>';
  const chosen=$(`[data-strategy="${state.selected}"]`);
  if(state.selected>0){chosen.querySelector('.status-dot').style.background=running?'#0AB56A':'#777';if(running)$('#running-list').append(chosen);else $('#paused-list').prepend(chosen);}
 }
 $('#time').textContent=`${t.toFixed(2)} / 7.70s`;$('#scrub').value=t;$('#play').textContent=timeline.paused()?'▶':'Ⅱ';
}
timeline.eventCallback('onUpdate',update);timeline.eventCallback('onComplete',()=>{timeline.pause();update();});
// Scaling is outside the composition, so all camera and pointer coordinates remain 1920×1080.
function resizeStage(){$('#stage').style.transform=`scale(${$('#viewport').clientWidth/1920})`;}
window.addEventListener('resize',resizeStage);resizeStage();
function syncBackground(t){const video=$('#flow');if(Number.isFinite(video.duration)){video.pause();video.currentTime=t%video.duration;}}
function seek(t){timeline.pause();timeline.seek(Math.max(0,Math.min(DURATION,Number(t)||0)));update();syncBackground(state.t);}
let segmentTween=null;
function playTo(from,to){segmentTween?.kill();timeline.pause();timeline.seek(from);segmentTween=timeline.tweenTo(to,{ease:'none',duration:(to-from)/Number($('#speed').value),onUpdate:update,onComplete:()=>{timeline.pause();update();}});}
function manual(){segmentTween?.kill();state.manual=true;$('#stage').classList.add('manual');$('#interactive').classList.add('active');seek(1.91);}
function play(){segmentTween?.kill();state.manual=false;$('#stage').classList.remove('manual');$('#interactive').classList.remove('active');if(state.t>=DURATION-.01)timeline.seek(0);timeline.timeScale(Number($('#speed').value));timeline.play();$('#flow').playbackRate=Number($('#speed').value);$('#flow').play().catch(()=>{});update();}
$('#play').addEventListener('click',()=>{if(!timeline.paused()||segmentTween?.isActive()){segmentTween?.kill();timeline.pause();$('#flow').pause();update();}else play();});
$('#replay').addEventListener('click',()=>{seek(0);play();});$('#speed').addEventListener('change',()=>{timeline.timeScale(Number($('#speed').value));$('#flow').playbackRate=Number($('#speed').value);});$('#scrub').addEventListener('input',e=>{segmentTween?.kill();seek(e.target.value);});
$$('[data-time]').forEach(b=>b.addEventListener('click',()=>{segmentTween?.kill();state.manual=false;$('#stage').classList.remove('manual');seek(b.dataset.time);}));
$('#interactive').addEventListener('click',manual);
function onProduct(selector,fn){$$(selector).forEach(b=>b.addEventListener('click',()=>{if(!state.manual){state.manual=true;$('#stage').classList.add('manual');$('#interactive').classList.add('active');}fn(b);}));}
onProduct('#autopilot-tab',()=>playTo(1.97,3.56));
onProduct('#open-wallet,#wallet-heading-link,[data-nav="Portfolio"],#strategies-tab',()=>playTo(3.83,5.24));
onProduct('[data-nav="Strategies"]',()=>seek(3.56));
onProduct('.strategy-card',b=>{state.selected=Number(b.dataset.strategy);$('#drawer-name').textContent=strategies[state.selected].name;playTo(5.34,5.89);});
onProduct('#run',()=>{if(!$('#run').disabled)playTo(RUN-.07,DURATION);});
onProduct('#close-drawer',()=>seek(5.24));
onProduct('#strategy-details',()=>{$('#live-positions').innerHTML='<p>Daily rebalance · TradFi 30 · 3 positions<br><br>Allocation: $5,000.00 · Max leverage: 3×</p>';});
onProduct('.periods button',b=>{[...b.parentElement.children].forEach(x=>x.classList.toggle('chosen',x===b));});
window.__timelines={'s12-s13-v2':timeline};window.scene={seek,play,manual,state,timeline,duration:DURATION,strategies,points};
seek(0);
document.fonts.ready.then(()=>{seek(0);});
