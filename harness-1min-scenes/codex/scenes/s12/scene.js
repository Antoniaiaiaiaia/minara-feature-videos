gsap.registerPlugin(CustomEase);
CustomEase.create('minara','M0,0 C0.95,0.03 0,0.98 1,1');
CustomEase.create('entrance','M0,0 C0.16,1 0.3,1 1,1');
CustomEase.create('swapEnter','M0,0 C0.2,0.6 0.35,1 1,1');
CustomEase.create('swapExit','M0,0 C1,0.65 0.85,1 1,1');

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const DURATION=7.7;
const fmt=n=>'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const up=(base,add,p)=>fmt(base+add*p);

const positions=[
  ['ARB','Long','486.5','0.18','0.19','$90.49','0','+2.06','+$0.0343','Limit / Market','Add'],
  ['KPEPE','Long','21,440','0','0','$76.61','0','+4.40','+$0.4905','Limit / Market','Add'],
  ['UNI','Long','14.9','5.84','6.95','$103.6','0','+16.62','+$0.1895','Limit / Market','Add'],
  ['JTO','Short','144','0.59','0.45','$64.34','6.17','+21.31','-$0.3288','Limit / Market','Add'],
  ['STRK','Long','2,936.3','0.03','0.03','$88.82','0','+0.06','+$0.0172','Limit / Market','Add'],
  ['MORPHO','Short','35.7','2.49','2.53','$90.31','25.63','+1.57','-$0.0171','Limit / Market','Add'],
  ['VVV','Short','5.14','17.28','17.01','$87.41','168.27','+1.40','-$0.0788','Limit / Market','Add'],
  ['ZORA','Long','11,462','0.01','0.01','$95.24','0','+7.91','-$4.3565','Limit / Market','Add']
];
$('#positions').innerHTML=positions.map(r=>`<div class="position-row component"><b>${r[0]} <span style="color:#8a8a92">3x</span></b><span class="side-pill ${r[1]==='Short'?'short':''}">${r[1]}</span>${r.slice(2,10).map((c,i)=>`<span class="${i===5?'gain':''}">${c}</span>`).join('')}<button class="add">${r[10]}</button></div>`).join('');

const strategies=[
  ['CoinFull Prime (Neutral)','Minara Labs','Coin Full','Running'],
  ['Multi-value-profit Tradfi 30, Top 3','Lowes','TradFi 30','Paused'],
  ['MU SKHYNIX SAMSUNG SNDK, long upward trend, daily','You','TradFi 30','Paused'],
  ['Grouped multi-factor momentum long + market gate','Knight','TradFi 30','Paused'],
  ['AI leaders rotation with drawdown control','Minara Labs','TradFi 30','Paused'],
  ['BTC ETH SOL trend basket, weekly rebalance','Minara Labs','Coin Full','Paused']
];
$('#strategy-list').innerHTML=strategies.map((s,i)=>`<article class="strategy-card component" data-card="${i}"><i class="sheen"></i><div class="strategy-name"><span class="dot"></span>${s[0]}</div><div class="creator">${s[1]}</div><div class="universe">${s[2]}</div><div class="status">${s[3]}</div></article>`).join('');

function pathFrom(values,w,h,p=1){
  const shown=Math.max(2,Math.round(2+(values.length-2)*p));
  const slice=values.slice(0,shown),min=Math.min(...values),max=Math.max(...values),range=max-min||1;
  return slice.map((v,i)=>`${i?'L':'M'}${(i/(values.length-1)*w).toFixed(1)},${(h-(v-min)/range*(h-22)-11).toFixed(1)}`).join(' ');
}
function drawChart(svg,values,p=1){
  const w=1080,h=250,d=pathFrom(values,w,h,p),last=d.split(/[ML]/).filter(Boolean).pop()||`0,${h}`;
  const [x,y]=last.split(',').map(Number);
  svg.innerHTML=[0,1,2,3].map(i=>`<line class="gridline" x1="0" x2="${w}" y1="${42+i*50}" y2="${42+i*50}"/>`).join('')+
    `<path class="area" d="${d} L ${x},${h} L 0,${h}Z"/><path class="curve" d="${d}"/>`;
}
function drawLive(p=0){
  const values=[18,22,24,31,29,38,41,47,53,59,66,71,79,88,98];
  const w=500,h=160,d=pathFrom(values,w,h,p);
  $('#live-chart').innerHTML=`<path class="area" d="${d} L ${500*p},${h} L 0,${h}Z"/><path class="curve" d="${d}"/>`;
}
drawChart($('#autopilot-chart'),[44,45,47,48,51,50,54,58,57,61,65,68,72,75,73,78,82,86,91,96,99,105],1);
drawLive(0);
const autoCurve=$('#autopilot-chart .curve');
const autoCurveLength=autoCurve.getTotalLength();
gsap.set(autoCurve,{strokeDasharray:autoCurveLength,strokeDashoffset:autoCurveLength});

const titleSamples=Array.from({length:18},()=>'<div class="title-sample">Autopilot</div>').join('');
$('.title-shutter').innerHTML=titleSamples;
function textSwap(t){
  const enter=gsap.parseEase('swapEnter'),exit=gsap.parseEase('swapExit');
  const p=enter(Math.max(0,Math.min(1,t/.55)));
  gsap.set('.title-in',{opacity:t<1.15?p:0,scale:.82+.18*p,filter:`blur(${9*(1-p)}px)`});
  const sp=enter(Math.max(0,Math.min(1,(t-.68)/.55)));
  gsap.set('.title-sub',{opacity:t<1.72?sp:0,scale:.9+.1*sp,y:145,filter:`blur(${7*(1-sp)}px)`});
  $('.title-shutter').style.opacity=t>=1.16&&t<1.72?1:0;
  $$('.title-sample').forEach((e,i)=>{
    const local=(t-1.16)*30-i/18,q=exit(Math.max(0,Math.min(1,local/20)));
    const scale=1/(1-(1-1/12)*Math.min(q,.9999));
    e.style.transform=`scale(${scale})`;
    e.style.opacity=(1-exit(Math.max(0,Math.min(1,(local-14.4)/5.6))))/18;
    e.style.filter=`blur(${.5*q}px)`;
  });
}

function pulseClick(x,y,at,tl){
  tl.set('#cursor',{autoAlpha:1,x,y},at)
    .to('#cursor',{scale:.86,duration:.08,ease:'power2.out'},at)
    .set('#click-ring',{autoAlpha:.75,x,y,scale:.2},at)
    .to('#click-ring',{autoAlpha:0,scale:1.2,duration:.34,ease:'power2.out'},at)
    .to('#cursor',{scale:1,duration:.14,ease:'power2.out'},at+.1);
}

const autopilotParts=['.top-tabs','.metric','.wallet','.wallet-head','.balances','.running-strip','.summary-grid>div','.section-title','.chart-wrap','.positions-head','.position-row'];
const strategyParts=['.portfolio-head','.portfolio-tabs','.strategy-columns','.strategy-card','#drawer header','.drawer-label','#drawer-equity','.drawer-metrics>div','.live-head','.live-chart','.drawer-tabs','.empty-state','#run-btn','.secondary'];
gsap.set('#client',{opacity:0,y:820,scale:1.05});
gsap.set('#menu,.workspace,#autopilot-board,#strategy-board,#drawer,#cursor,#click-ring',{autoAlpha:0});
gsap.set(autopilotParts.join(','),{autoAlpha:0,y:24,scale:.975});
gsap.set(strategyParts.join(','),{autoAlpha:0,y:24,scale:.975});
gsap.set('.strategy-card',{scaleY:.74,transformOrigin:'left center'});
gsap.set('.sheen',{xPercent:-130});
gsap.set('#drawer',{x:520});

const tl=gsap.timeline({paused:true});
tl.to('#client',{opacity:1,y:0,scale:1,duration:.74,ease:'minara'},1.05)
  .to('#title',{autoAlpha:0,duration:.36,ease:'power2.inOut'},1.58)
  .to('.workspace',{autoAlpha:1,duration:.16},1.62)
  .to('#menu',{autoAlpha:1,y:0,duration:.32,ease:'entrance'},1.72);
pulseClick(455,72,2.02,tl);
tl.to('#menu',{autoAlpha:0,y:-10,duration:.2},2.16)
  .set('#autopilot-board',{autoAlpha:1},2.16)
  .to(autopilotParts.join(','),{autoAlpha:1,y:0,scale:1,duration:.44,ease:'entrance',stagger:{each:.055,from:'start'}},2.18)
  .to(autoCurve,{strokeDashoffset:0,duration:1.05,ease:'power2.out'},2.65);
tl.to('#autopilot-board',{autoAlpha:0,x:-92,scale:.985,duration:.48,ease:'power2.inOut'},3.82)
  .set('#strategy-board',{autoAlpha:1,x:92},3.96)
  .to('#strategy-board',{x:0,duration:.48,ease:'minara'},3.96)
  .to('#drawer',{autoAlpha:1,x:0,duration:.52,ease:'minara'},4.13)
  .to(strategyParts.join(','),{autoAlpha:1,y:0,scale:1,duration:.38,ease:'entrance',stagger:{each:.045,from:'start'}},4.18)
  .to('.strategy-card',{scaleY:1,duration:.34,ease:'entrance',stagger:.07},4.22)
  .to('.sheen',{xPercent:130,duration:.42,ease:'power2.inOut',stagger:.07},4.28);
pulseClick(1218,790,6.36,tl);
tl.to('#run-btn',{scale:.965,backgroundColor:'#078c52',duration:.1,ease:'power2.out'},6.36)
  .to('#run-btn',{scale:1,backgroundColor:'#0ab56a',duration:.15},6.5);

const playhead={t:0};
let driver=null,interactive=false;
function sync(t){
  tl.seek(t,false);textSwap(t);
  const v=$('#flow');
  if(v.readyState>=2&&!v.seeking&&Math.abs(v.currentTime-(t%v.duration))>.08)v.currentTime=t%v.duration;
  if(t<6.36){
    $('#balance-big').textContent=fmt(1078.34);
    $('#wallet-total').textContent=fmt(1078.34);
    $('#equity-main').textContent=fmt(1078.34);
    $('#drawer-equity').textContent='—';
    $('#drawer-pnl').textContent='-$6.04';
    $('#drawer-pnl').style.color='#f75d5f';
    $('#drawer-unrealized').textContent='— —';
    $('#drawer-unrealized').style.color='';
    $('#drawer-24h').textContent='— —';
    $('#drawer-24h').style.color='';
    $('#no-curve').style.opacity=1;drawLive(0);
  }else{
    const p=Math.max(0,Math.min(1,(t-6.36)/1.1)),flip=Math.floor(p*11)%2;
    const y=flip?-9:0;
    ['#balance-big','#wallet-total','#equity-main','#drawer-equity'].forEach((s,i)=>{
      const e=$(s);e.textContent=up(1078.34,23.82,p);e.style.transform=`translateY(${y}px)`;e.style.opacity=flip ? .82 : 1;
    });
    $('#run-status').textContent='Running';
    $('#drawer-pnl').textContent='+$17.78';$('#drawer-pnl').style.color='#0ab56a';
    $('#drawer-unrealized').textContent='+$12.48';$('#drawer-unrealized').style.color='#0ab56a';
    $('#drawer-24h').textContent='+$4.13';$('#drawer-24h').style.color='#0ab56a';
    $('#runtime').textContent='21 hours';
    $('#no-curve').style.opacity=0;drawLive(p);
  }
  $('#scrub').value=t;$('#time').value=`${t.toFixed(2)} / 7.70s`;
}
function pause(){driver?.kill();driver=null;$('#play').textContent=''}
function seek(t,keepInteractive=false){pause();if(!keepInteractive)interactive=false;playhead.t=Math.max(0,Math.min(DURATION,Number(t)||0));sync(playhead.t)}
function go(t){seek(t,true)}
function play(){if(playhead.t>=DURATION-.02)seek(0);pause();driver=gsap.to(playhead,{t:DURATION,duration:DURATION-playhead.t,ease:'none',onUpdate:()=>sync(playhead.t),onComplete:pause});$('#play').textContent=''}
function interactiveStart(){seek(2.18);interactive=true;gsap.set('#cursor',{autoAlpha:0})}

$('#play').onclick=()=>driver?pause():play();
$('#replay').onclick=()=>{seek(0);play()};
$('#interactive').onclick=interactiveStart;
$('#scrub').oninput=e=>seek(+e.target.value);
$('#more-btn').onclick=()=>interactive&&gsap.to('#menu',{autoAlpha:1,duration:.18});
$('#menu .autopilot').onclick=()=>interactive&&go(2.18);
$('#autopilot-tab').onclick=()=>interactive&&go(2.18);
$('.running-strip').onclick=()=>interactive&&go(4.8);
$$('.strategy-card').forEach(card=>card.onclick=()=>interactive&&go(4.8));
$('#run-btn').onclick=()=>interactive&&go(6.36);
[[.45,'title'],[2.05,' Autopilot'],[2.72,'board'],[4.12,'Wallet Strategies'],[4.92,''],[6.36,' Run'],[7.28,' / ']].forEach(([t,label])=>{const b=document.createElement('button');b.textContent=label;b.onclick=()=>seek(t);$('#chapters').append(b)});
function resize(){const w=Math.min(innerWidth-40,1600,(innerHeight-253)*16/9),h=w*9/16;$('#viewport').style.width=w+'px';$('#viewport').style.height=h+'px';$('#stage').style.transform=`scale(${w/1920})`}
addEventListener('resize',resize);resize();$('#flow').addEventListener('loadeddata',()=>sync(playhead.t));
window.scene={seek,play,pause,duration:()=>DURATION,get state(){return {time:playhead.t,interactive,playing:!!driver,run:$('#run-status').textContent,balance:$('#balance-big').textContent}}};
window.__timelines={'s12-s13':tl};
sync(0);
