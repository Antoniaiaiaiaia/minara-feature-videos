const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const DURATION=15,RUN=7.70,PORTFOLIO=9.05,STOP=11.85,NEXT=12.55;
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
// Fixed mock evidence for the strategy selected in the marketplace.
cards[0]={...cards[0],value:'+121.01%',metrics:[['Window Return','+619.08%'],['Max Drawdown','6.74%'],['Sharpe Ratio','4.38']],live:'+24.80%',window:'978d'};
const catalogue=[
 {...cards[0],name:'CoinFull Prime (Neutral)',value:'+111.76%',metrics:[['Window Return','+380.43%'],['Max Drawdown','24.03%'],['Sharpe Ratio','2.02']],live:'+12.60%'},
 cards[1],cards[2],cards[0],
 {...cards[1],name:'Aurora Trend Fusion',metrics:[['Window Return','+208.76%'],['Max Drawdown','10.54%'],['Sharpe Ratio','3.45']],live:'+18.30%'},
 {...cards[2],name:'Major Trend CTA',metrics:[['Window Return','+670.06%'],['Max Drawdown','26.74%'],['Sharpe Ratio','1.57']],live:'+8.20%'}
];
function cardMarkup(c,i,portfolio=false){return `<button class="strategy-card ${portfolio?'portfolio-card':'market-card'}" data-${portfolio?'card':'strategy'}="${i}" aria-label="${portfolio?'Toggle':'View'} ${c.name}" aria-pressed="false"><span class="card-heading"><span class="strategy-icon">${strategyIcon(i%3)}</span><span class="card-name">${c.name}</span></span><span class="card-meta"><img src="${c.logo}" alt=""><span>${c.market}</span><span>${c.period}</span><i></i><span>${c.stars} Stars</span><i></i><span class="publish-state">Published</span></span><span class="card-rule"></span><span class="performance"><span class="main-return"><span>${c.label}</span><strong class="positive">${c.value}</strong></span><svg class="spark" viewBox="0 0 175 68" aria-label="Upward mock strategy curve"><path class="chart-area" d="${c.curve} L175 68 L0 68Z"/><path class="chart-line" d="${c.curve}"/></svg></span><span class="card-metrics" style="grid-template-columns:repeat(${c.metrics.length},1fr)">${c.metrics.map(([label,value])=>`<span class="card-metric"><span>${label}</span><strong class="${value.startsWith('+')?'positive':''}">${value}</strong></span>`).join('')}</span><span class="card-rule lower"></span><span class="card-footer"><span class="card-metric"><span>Window</span><strong>${c.window}</strong></span><span class="card-metric"><span>Share</span><strong>${c.share}</strong></span><span class="card-metric"><span>Subscribers</span>${subscribers(i)}</span></span><i class="sheen"></i></button>`;}
$('#market-cards').innerHTML=catalogue.map((c,i)=>cardMarkup(c,i)).join('');
$('#strategies').innerHTML=cards.map((c,i)=>`<div class="strategy-row">${cardMarkup(c,i,true)}<div class="profits" aria-hidden="true">${'<span class="profit"></span>'.repeat(3)}</div></div>`).join('');
$('#detail-avatars').innerHTML=subscribers(0);
const state={t:0,manual:false,view:'market',selected:cards[0],running:[false,false,true],starts:[Infinity,Infinity,Infinity],changes:[-10,-10,-10],deployed:false};
function selectStrategy(c){
 state.selected=c;$('#detail-name').textContent=c.name;$('.detail-heading p').textContent=`${c.market} · ${c.period} · Published`;
 const metric=label=>c.metrics.find(m=>m[0]===label)?.[1]||'3.07';
 const report=[['Total Return',metric('Window Return'),'total'],['Ann. Return',c.value,'annual'],['Max Drawdown',metric('Max Drawdown'),'drawdown'],['Total Fills','2,861','fills'],['Sharpe Ratio',metric('Sharpe Ratio'),'sharpe'],['Calmar Ratio','4.61','calmar'],['Alpha','+57.97%','alpha'],['Beta','1.40','beta']];
 if(!$('#report-grid').children.length)$('#report-grid').innerHTML=report.map(([label,value,id])=>`<div class="report-metric" id="metric-${id}"><span>${label}</span><strong class="${value.startsWith('+')||id==='sharpe'?'positive':''}">${value}</strong></div>`).join('');
 report.forEach(([,value,id])=>$('#metric-'+id+' strong').textContent=value);
 $('.report-meta').textContent=`${c.market}　${c.period}　Jan 2024 – Sep 2026`;
 $('.live-value').textContent=c.live||'+16.40%';
}
selectStrategy(cards[0]);
function portfolioChoice(c){
 const card=$('[data-card="0"]');card.querySelector('.card-name').textContent=c.name;card.querySelector('.main-return>span').textContent=c.label;card.querySelector('.main-return strong').textContent=c.value;
 const meta=card.querySelectorAll('.card-meta>span');meta[0].textContent=c.market;meta[1].textContent=c.period;meta[2].textContent=`${c.stars} Stars`;card.querySelector('.card-meta img').src=c.logo;
 card.querySelectorAll('.card-metrics .card-metric').forEach((el,i)=>{el.firstElementChild.textContent=c.metrics[i]?.[0]||'Window Return';el.lastElementChild.textContent=c.metrics[i]?.[1]||c.value;});
 state.runningStrategy=c;
}
portfolioChoice(cards[0]);
const gains=[[15,20,150],[25,80,200],[12,45,90]],clamp=v=>Math.max(0,Math.min(1,v)),ease=gsap.parseEase('power2.out');
function paint(t){
 state.t=t;
 if(!state.manual){state.view=t<5?'market':t<PORTFOLIO?'details':'portfolio';state.deployed=t>=RUN;state.running=[t>=RUN&&t<STOP,t>=NEXT,true];state.starts=[9.65,NEXT,9.90];state.changes=[t>=STOP?STOP:RUN,NEXT,-10];}
 for(const view of ['market','details','portfolio'])$('#'+view).inert=state.view!==view;
 $('#navigation').inert=!state.manual&&t<2;
 $('#market-tab').classList.toggle('active',state.view!=='portfolio');$('#portfolio-tab').classList.toggle('active',state.view==='portfolio');
 $('#run').textContent=state.deployed?'Running':'Run';$('#run').classList.toggle('running',state.deployed);$('#run').disabled=state.deployed;
 $('#run-description').textContent=state.deployed?'This strategy is now running in your wallet.':'Start a live run to deploy this strategy to your wallet.';
 $$('.portfolio-card').forEach((card,i)=>{
  const running=state.running[i];card.classList.toggle('running',running);card.style.backgroundColor=running?'#0AB56A':'#1a1a1a';card.style.color=running?'#ffffff':'#e7e7ea';card.style.scale=String(1-.018*Math.sin(Math.PI*clamp((t-state.changes[i])/.2)));
  card.setAttribute('aria-pressed',String(running));card.setAttribute('aria-label',`${running?'Pause':'Run'} ${i===0?state.runningStrategy?.name||cards[0].name:cards[i].name}`);card.querySelector('.publish-state').textContent=running?'Running':'Paused';
  const elapsed=t-state.starts[i]-.12,last=Math.floor(elapsed/.5);
  [...card.nextElementSibling.children].forEach((el,slot)=>{
   const n=last-slot,local=elapsed-n*.5;
   if(!running||n<0||n>=3||!Number.isFinite(local)||local<0||local>=.72){el.style.opacity=0;return;}
   const enter=ease(clamp(local/.22)),leave=ease(clamp((local-.34)/.38));el.textContent=`+$${gains[i][n]}`;el.style.opacity=enter*(1-leave);el.style.transform=`translateY(${(1-enter)*35-leave*86}px) rotateX(${(1-enter)*-78+leave*35}deg)`;
  });
 });
 $('#scrub').value=Math.min(t,DURATION);$('#time').textContent=state.manual?'Interactive demo':`${t.toFixed(2)} / 15.00s`;
 window.titleFrame=Math.round(Math.min(t,2.1)*30);window.setTitleFrame?.(window.titleFrame);
}
const timeline=gsap.timeline({paused:true,defaults:{ease:'minara'}});
timeline.set('#navigation,#market,#details,#portfolio,#cursor',{autoAlpha:0},0)
 .fromTo('#navigation',{x:280,autoAlpha:0},{x:0,autoAlpha:1,duration:.65},1.86)
 .fromTo('#market',{y:36,autoAlpha:0},{y:0,autoAlpha:1,duration:.5},2.12)
 .fromTo('.market-card',{y:60,scaleY:.86,autoAlpha:0},{y:0,scaleY:1,autoAlpha:1,duration:.6,stagger:.065},2.28)
 .fromTo('#market-viewport',{scrollTop:0},{scrollTop:532,duration:1.15,ease:'power2.inOut'},3.38)
 .to('[data-strategy="3"]',{borderColor:'#0ab56a',duration:.25},4.62)
 .to('[data-strategy="3"]',{scale:.975,duration:.07},4.98)
 .to('#market',{autoAlpha:0,scale:.96,duration:.35},5.03)
 .fromTo('#details',{scale:.8,y:42,autoAlpha:0},{scale:.9,y:0,autoAlpha:1,duration:.52},5.05);
for(const [target,at] of [['#metric-sharpe',5.65],['#metric-drawdown',6.24],['#live-proof',6.88]]){
 timeline.to(target,{outlineColor:'#0ab56a',backgroundColor:'#153428',scale:1.025,duration:.23},at).to(target,{outlineColor:'transparent',backgroundColor:target==='#live-proof'?'#1a1a1a':'#050505',scale:1,duration:.3},at+.52);
}
timeline.to('#run',{scale:.97,duration:.07},RUN).to('#run',{scale:1,duration:.22},RUN+.07)
 .to('#details',{autoAlpha:0,scale:.86,duration:.32},PORTFOLIO)
 .set('#portfolio',{autoAlpha:1},PORTFOLIO+.02);
$$('.portfolio-card').forEach((el,i)=>{
 const at=PORTFOLIO+.12+i*.12;
 timeline.fromTo(el,{autoAlpha:0,y:44,scaleY:.7,scaleX:.96},{autoAlpha:1,y:0,scaleY:1,scaleX:1,duration:.65},at);
 timeline.fromTo(el.querySelector('.sheen'),{x:0,opacity:0},{x:800,opacity:1,duration:.85,ease:'power2.inOut'},at+.08).to(el.querySelector('.sheen'),{opacity:0,duration:.1},at+.82);
});
$$('.market-card .sheen').forEach((el,i)=>timeline.fromTo(el,{x:0,opacity:0},{x:800,opacity:1,duration:.86,ease:'power2.inOut'},2.4+i*.07).to(el,{opacity:0,duration:.1},3.15+i*.07));
timeline.set('#cursor',{autoAlpha:1,x:1380,y:470},2.5)
 .to('#cursor',{x:1500,y:765,duration:.6,ease:'power2.inOut'},2.68)
 .to('#cursor',{x:432,y:540,duration:.45,ease:'power2.inOut'},4.50)
 .to('#cursor',{x:375,y:527,duration:.42,ease:'power2.inOut'},5.25)
 .to('#cursor',{x:816,y:430,duration:.36,ease:'power2.inOut'},5.88)
 .to('#cursor',{x:1410,y:468,duration:.36,ease:'power2.inOut'},6.5)
 .to('#cursor',{x:1430,y:821,duration:.45,ease:'power2.inOut'},7.22)
 .to('#cursor',{x:1195,y:99,duration:.58,ease:'power2.inOut'},8.42)
 .to('#cursor',{x:580,y:1000,duration:.55,ease:'power2.inOut'},9.18)
 .to('#cursor',{x:432,y:540,duration:.44,ease:'power2.inOut'},11.34)
 .to('#cursor',{x:960,y:540,duration:.47,ease:'power2.inOut'},12.03)
 .to('#cursor',{x:1080,y:995,duration:.45,ease:'power2.inOut'},12.73)
 .to('#cursor',{autoAlpha:0,duration:.25},13.45);
for(const at of [5,RUN,PORTFOLIO,STOP,NEXT])timeline.fromTo('#cursor i',{scale:.2,opacity:.65},{scale:1.45,opacity:0,duration:.33,ease:'power2.out'},at).to('#cursor svg',{scale:.85,duration:.065},at).to('#cursor svg',{scale:1,duration:.16},at+.065);
timeline.to({}, {duration:DURATION},0).eventCallback('onUpdate',()=>paint(timeline.time())).eventCallback('onComplete',()=>{$('#play').textContent='▶';$('#flow').pause();});
let liveTween=null;
function stop(){liveTween?.kill();liveTween=null;timeline.pause();$('#flow').pause();$('#play').textContent='▶';}
function background(t){const v=$('#flow');v.pause();if(Number.isFinite(v.duration))v.currentTime=t%v.duration;}
function resetFilters(){$('#search').value='';$('#sort').value='featured';$$('.market-card').forEach(c=>{c.hidden=false;c.style.order='';});$('.market-count').textContent='6 strategies';}
function seek(t){
 stop();state.manual=false;$('#stage').classList.remove('manual');$('#interactive').classList.remove('active');resetFilters();gsap.set('#title',{autoAlpha:1});
 if(state.runningStrategy!==cards[0])portfolioChoice(cards[0]);
 if(state.selected!==cards[0]){selectStrategy(cards[0]);}
 t=Math.max(0,Math.min(DURATION,Number(t)||0));timeline.seek(t);paint(t);background(t);
}
function play(){const start=state.manual||state.t>=DURATION-.01?0:state.t;seek(start);timeline.timeScale(Number($('#speed').value)).play();$('#flow').playbackRate=Number($('#speed').value);$('#flow').play().catch(()=>{});$('#play').textContent='Ⅱ';}
function manualView(view,reset=false){
 if(!state.manual){seek(4.7);state.manual=true;state.running=[false,false,true];state.starts=[Infinity,Infinity,Infinity];state.changes=[-10,-10,-10];state.deployed=false;state.runningStrategy=null;}
 stop();state.view=view;$('#stage').classList.add('manual');$('#interactive').classList.add('active');
 gsap.set('#title',{autoAlpha:0});gsap.set('#navigation',{autoAlpha:1,x:0});
 for(const name of ['market','details','portfolio'])gsap.set('#'+name,{autoAlpha:name===view?1:0,x:0,y:0,scale:name==='details'?.9:1});
 gsap.set('.market-card,.portfolio-card',{autoAlpha:1,x:0,y:0,scaleX:1,scaleY:1});gsap.set('.sheen',{opacity:0});
 if(reset){resetFilters();$('#market-viewport').scrollTop=0;}
 paint(state.t);
}
function manualClock(){if(liveTween)return;const base=state.t,clock={t:0};liveTween=gsap.to(clock,{t:4,duration:4,ease:'none',onUpdate:()=>paint(base+clock.t),onComplete:()=>{liveTween=null;}});}
$('#interactive').onclick=()=>{seek(0);manualView('market',true);};
$('#market-tab').onclick=()=>manualView('market');$('#portfolio-tab').onclick=()=>{manualView('portfolio');state.starts=state.running.map(r=>r?state.t:Infinity);manualClock();};$('#back').onclick=()=>manualView('market');
$('#market-cards').onclick=e=>{const card=e.target.closest('[data-strategy]');if(!card)return;manualView('details');selectStrategy(catalogue[+card.dataset.strategy]);state.deployed=state.selected===state.runningStrategy&&state.running[0];paint(state.t);};
$('#run').onclick=()=>{if(!state.manual)manualView('details');state.deployed=true;portfolioChoice(state.selected);state.running[0]=true;state.changes[0]=state.t;paint(state.t);};
$('#strategies').onclick=e=>{const card=e.target.closest('[data-card]');if(!card)return;if(!state.manual)manualView('portfolio');const i=+card.dataset.card;state.running[i]=!state.running[i];state.changes[i]=state.t;state.starts[i]=state.running[i]?state.t:Infinity;paint(state.t);manualClock();};
function filter(){if(!state.manual)manualView('market');const q=$('#search').value.toLowerCase(),sort=$('#sort').value;
 const order=catalogue.map((c,i)=>({c,i}));if(sort!=='featured'){const name=sort==='sharpe'?'Sharpe Ratio':'Max Drawdown';order.sort((a,b)=>{const metric=c=>parseFloat(c.metrics.find(m=>m[0]===name)?.[1]||0);return (metric(a.c)-metric(b.c))*(sort==='sharpe'?-1:1);});}
 let count=0;order.forEach(({c,i},index)=>{const el=$(`[data-strategy="${i}"]`);el.hidden=!c.name.toLowerCase().includes(q);el.style.order=index;if(!el.hidden)count++;});$('.market-count').textContent=`${count} strategies`;$('#market-viewport').scrollTop=0;
}
$('#search').oninput=filter;$('#sort').onchange=filter;
$('#play').onclick=()=>timeline.isActive()||liveTween?stop():play();$('#replay').onclick=()=>{seek(0);play();};$('#scrub').oninput=e=>seek(e.target.value);$('#speed').onchange=()=>{timeline.timeScale(Number($('#speed').value));$('#flow').playbackRate=Number($('#speed').value);};$$('[data-time]').forEach(b=>b.onclick=()=>seek(b.dataset.time));
function fit(){$('#stage').style.transform=`scale(${$('#viewport').clientWidth/1920})`;}
addEventListener('resize',fit);fit();window.scene={seek,play,pause:stop,manualView,state,timeline,duration:DURATION,catalogue};window.__timelines={'s10-s13-v5':timeline};seek(0);document.fonts.ready.then(()=>seek(0));
