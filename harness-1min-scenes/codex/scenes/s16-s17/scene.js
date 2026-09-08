/* Six fictional closed trades. No API, account, or reference-image data is used. */
gsap.registerPlugin(CustomEase);
CustomEase.create('minara','M0,0 C0.95,0.03 0,0.98 1,1');
CustomEase.create('entry','M0,0 C0.16,1 0.3,1 1,1');
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const DURATION=7.7;
const trades=[
  {symbol:'BTC',side:'Long',entry:64200,exit:64840,size:.1,pnl:64,lesson:'Keep entry and exit reasons together.'},
  {symbol:'ETH',side:'Long',entry:3180,exit:3140,size:1,pnl:-40,lesson:'Review losses against the original thesis.'},
  {symbol:'BTC',side:'Short',entry:64900,exit:65300,size:.1,pnl:-40,lesson:'Check volatility before sizing a trade.'},
  {symbol:'ETH',side:'Short',entry:3220,exit:3150,size:1,pnl:70,lesson:'Separate timing from the quality of a setup.'},
  {symbol:'SOL',side:'Long',entry:146,exit:152,size:5,pnl:30,lesson:'Compare exits in similar market conditions.'},
  {symbol:'SOL',side:'Long',entry:154,exit:149,size:5,pnl:-25,lesson:'Carry both outcomes into the next analysis.'}
];
const money=n=>'$'+Math.abs(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const pnl=n=>(n<0?'−':'+')+money(n);
$('#cards').innerHTML=trades.map((d,i)=>`<button class="trade-card ${d.pnl>0?'win':'loss'}" data-index="${i}" aria-label="${d.symbol} ${d.side}, ${pnl(d.pnl)}; ${d.lesson}" style="--scan-color:${d.pnl>0?'#0ab56a':'#f75d5f'}">
  <span class="trade-face"><span class="symbol"><img src="assets/logos/${d.symbol.toLowerCase()}.svg" alt=""><span><b>${d.symbol}</b><small>${d.side} · Closed</small></span></span><span class="trade-fields"><span>Entry</span><span>Exit</span><b>${money(d.entry)}</b><b>${money(d.exit)}</b></span><span class="trade-pnl"><small>Realized PnL</small><strong>${pnl(d.pnl)}</strong></span></span>
  <span class="scan-wash"></span><span class="scan"></span><span class="lesson-face"><span class="origin"></span><span><span class="lesson-copy">${d.lesson}</span><span class="lesson-meta">Just now · ${d.symbol} ${d.side.toLowerCase()} · ${d.pnl>0?'Win':'Loss'}</span></span><span class="saved-tick">✓</span></span></button>`).join('');
$('#activity-table').innerHTML='<div class="table-row table-head"><span>Market</span><span>Count</span><span>Activity</span><span>Realized PnL</span></div>'+['BTC','ETH','SOL'].map(symbol=>{const total=trades.filter(d=>d.symbol===symbol).reduce((n,d)=>n+d.pnl,0);return `<div class="table-row"><span>${symbol}</span><span>2</span><span>2 closed trades</span><span class="${total>=0?'positive':'negative'}">${pnl(total)}</span></div>`;}).join('');
$('#ledger-rows').innerHTML=trades.map(d=>`<div class="ledger-row"><span>${d.lesson}</span><span>${d.symbol} · ${pnl(d.pnl)}</span></div>`).join('');
const cards=$$('.trade-card');
const moreLessons=[
  'Record the market conditions at entry.',
  'Review winning exits as carefully as losing exits.',
  'Keep the original risk estimate with each review.',
  'Compare the planned holding period with the actual one.',
  'Separate a strong thesis from a fortunate outcome.',
  'Include fees when reviewing a completed trade.',
  'Note when volatility changed after entry.',
  'Compare similar setups across different sessions.',
  'Track whether an exit followed the original plan.',
  'Keep counterarguments beside the trade thesis.',
  'Distinguish execution quality from market direction.',
  'Review position size alongside the final outcome.',
  'Preserve the context behind a cancelled trade.',
  'Note which assumptions held and which changed.',
  'Compare patient entries with rushed entries.',
  'Keep drawdown context alongside realized returns.',
  'Review repeated patterns across both outcomes.',
  'Record the reason for changing an exit plan.',
  'Include liquidity conditions in the next review.',
  'Separate market noise from thesis-changing events.',
  'Compare the evidence available before each entry.',
  'Keep a record of uncertainty at decision time.',
  'Review the process behind an early exit.',
  'Compare outcomes over a consistent time window.',
  'Keep missed opportunities separate from losses.',
  'Revisit a lesson when new evidence arrives.',
  'Note when a familiar pattern behaved differently.',
  'Include both supporting and conflicting signals.',
  'Carry the review context into the next analysis.',
  'Keep learning from wins and losses together.'
];
$('#cards').insertAdjacentHTML('beforeend',moreLessons.map((lesson,i)=>`<button class="memory-row" data-memory="${i}" style="top:${542+(i+6)*72}px;--scan-color:${i%2?'#f75d5f':'#0ab56a'}"><span class="lesson-face"><span class="origin"></span><span><span class="lesson-copy">${lesson}</span><span class="lesson-meta">Earlier review · ${i%2?'Loss':'Win'}</span></span><span class="saved-tick">✓</span></span></button>`).join(''));
const totalMemories=trades.length+moreLessons.length,maxScroll=(totalMemories-6)*72-2;
$('#cards').style.height=(1080+maxScroll)+'px';
gsap.set('#product-camera',{scale:1,x:0,y:0,transformOrigin:'1100px 540px'});
gsap.set('#cards-viewport',{clipPath:'inset(0px 0px 0px 0px)',scrollTop:0});
gsap.set('.memory-row',{autoAlpha:0});
gsap.set('#history-head,#history-labels',{autoAlpha:0,y:24});
gsap.set('#memory-client',{autoAlpha:0,y:100,scale:.91});
gsap.set('#cursor,#click-ring',{autoAlpha:0});
gsap.set('#cursor',{transformOrigin:'3px 2px'});
gsap.set('.memory-content,aside,.window-top',{autoAlpha:0,y:14});
const tl=gsap.timeline({paused:true});
tl.addLabel('headline',0).to('#history-head,#history-labels',{autoAlpha:1,y:0,duration:.38,stagger:.06,ease:'entry'},1.78)
  .to('#headline-root',{autoAlpha:0,y:-24,duration:.24,ease:'power2.in'},1.82);
cards.forEach((card,i)=>{
  const x=214+(i%2)*759,y=283+Math.floor(i/2)*156,scanAt=2.38+i*.08,liftAt=scanAt+.69,storeAt=4.64+(5-i)*.16;
  const face=card.querySelector('.trade-face'),lesson=card.querySelector('.lesson-face'),scan=card.querySelector('.scan'),wash=card.querySelector('.scan-wash');
  gsap.set(card,{'--w':'733px','--h':'128px',x,y:y+75,z:-70,rotationX:9,autoAlpha:0});
  gsap.set(scan,{x:-290});
  tl.to(card,{x,y,z:0,rotationX:0,autoAlpha:1,duration:.51,ease:'entry'},1.92+Math.floor(i/2)*.13+(i%2)*.04)
    .set(scan,{opacity:1},scanAt).to(scan,{x:745,duration:.68,ease:'power2.inOut'},scanAt)
    .to(wash,{opacity:.13,duration:.2,ease:'power1.in'},scanAt+.28).to(wash,{opacity:0,duration:.3},scanAt+.5)
    .to(scan,{opacity:0,duration:.1},scanAt+.60)
    .to(face,{autoAlpha:0,y:-18,duration:.23,ease:'power2.in'},liftAt)
    .to(card,{y:y-18,z:75,rotationX:-4,backgroundColor:'rgba(23,23,26,0)',borderColor:'rgba(255,255,255,0)',boxShadow:'0 0px 0px 0px rgba(20,20,30,0)',duration:.5,ease:'entry'},liftAt)
    .fromTo(lesson,{autoAlpha:0,y:30,filter:'blur(7px)'},{autoAlpha:1,y:0,filter:'blur(0px)',duration:.4,ease:'entry'},liftAt+.1)
    .to(card,{backgroundColor:'#303032',borderColor:'rgba(255,255,255,.08)',duration:.2},4.65)
    .to(lesson,{color:'#e7e7ea',duration:.17},4.52)
    .to(card,{x:522,y:542+i*72,z:0,rotationX:0,'--w':'1182px','--h':'62px',backgroundColor:'#303032',borderColor:'rgba(255,255,255,0)',duration:.55,ease:'power3.inOut'},storeAt)
    .to(lesson,{color:'#e7e7ea',duration:.2},storeAt+.3)
    .fromTo(card.querySelector('.lesson-copy'),{fontSize:32},{fontSize:23,duration:.45,ease:'entry'},storeAt)
    .to(card.querySelector('.lesson-meta'),{opacity:1,duration:.22},storeAt+.4)
    .to(card.querySelector('.saved-tick'),{opacity:1,duration:.2},storeAt+.6);
});
tl.addLabel('history',2.35).addLabel('scan',2.98).addLabel('lessons',4.24)
  .to('#history-head,#history-labels',{autoAlpha:0,y:-18,duration:.25},3.38)
  .to('#memory-client',{autoAlpha:1,y:0,scale:1,duration:.7,ease:'minara'},4.42)
  .to('.window-top,aside,.memory-content',{autoAlpha:1,y:0,duration:.32,stagger:.07,ease:'entry'},4.72)
  .set('#cards-viewport',{clipPath:'inset(542px 216px 114px 522px)',pointerEvents:'auto'},6.12)
  .set('.memory-row',{autoAlpha:1},6.12)
  .to('#product-camera',{scale:1.28,x:-150,y:-40,duration:1.58,ease:'sine.inOut'},6.12)
  .to('#cards-viewport',{scrollTop:maxScroll,duration:1.46,ease:'power2.in'},6.24)
  .addLabel('memory',6.3).addLabel('more-memories',7.4).set({}, {},DURATION);
window.__timelines={...(window.__timelines||{}),'s16-s17':tl};
let time=0,playing=false,last=0,manual=false,currentTab='notes',frameRequest=0;
function switchTab(tab){
  currentTab=tab;
  $$('.memory-tabs button').forEach(b=>{b.classList.toggle('active',b.dataset.tab===tab);b.setAttribute('aria-selected',String(b.dataset.tab===tab));});
  $$('.tab-panel').forEach(p=>p.hidden=p.id!==tab+'-panel');
  $('#cards').style.visibility=tab==='notes'?'visible':'hidden';
  $('#cards-viewport').style.pointerEvents=tab==='notes'&&time>=6.12?'auto':'none';
}
function sync(t){
  const count=trades.filter((_,i)=>t>=5.19+(5-i)*.16).length;
  $('#count').textContent=t<6.24?count:Math.min(totalMemories,6+Math.ceil($('#cards-viewport').scrollTop/72));
  cards.forEach((c,i)=>c.dataset.saved=String(t>=5.19+(5-i)*.16));
  if(!manual){switchTab('notes');$('#decision-ledger').open=false;}
  $('#time').textContent=t.toFixed(2)+' / 7.70s';$('#scrub').value=t;
  window.S16Title?.seek(Math.round(t*30));
}
function seek(t,keepManual=false){
  pause();if(!keepManual){manual=false;$('#interactive').classList.remove('active');$('#memory-search').value='';$$('.trade-card,.memory-row').forEach(c=>c.hidden=false);$('#lesson-detail').hidden=true;}
  time=Math.max(0,Math.min(DURATION,Number(t)||0));tl.seek(time,false);sync(time);$('#ledger-rows').scrollTop=0;
  const video=$('#flow');if(video.readyState>=1&&Math.abs(video.currentTime-time)>.018)video.currentTime=time;
}
function pause(){playing=false;cancelAnimationFrame(frameRequest);$('#play').textContent='Play';$('#flow').pause();}
function play(){pause();manual=false;$('#interactive').classList.remove('active');$('#lesson-detail').hidden=true;if(time>=DURATION-.01)seek(0);playing=true;last=0;$('#play').textContent='Pause';frameRequest=requestAnimationFrame(tick);}
// The preview clock drives the registered timeline; captures use scene.seek directly.
function tick(now){if(!playing)return;if(last)time=Math.min(DURATION,time+(now-last)/1000*Number($('#speed').value));last=now;tl.seek(time,false);sync(time);const flow=$('#flow');flow.playbackRate=Number($('#speed').value);if(flow.paused){flow.currentTime=time;flow.play().catch(()=>{});}if(time>=DURATION)pause();else frameRequest=requestAnimationFrame(tick);}
$('#play').onclick=()=>playing?pause():play();$('#replay').onclick=()=>{seek(0);play();};$('#scrub').oninput=e=>seek(e.target.value);
$$('[data-time]').forEach(b=>b.onclick=()=>seek(Number(b.dataset.time)));
$('#interactive').onclick=()=>{seek(6.3);manual=true;switchTab('notes');gsap.set('#cursor,#click-ring',{autoAlpha:0});$('#interactive').classList.add('active');$('#review-note').textContent='Explore UI · click memories to inspect their mock source; switch tabs, search, or expand the decision ledger.';};
$$('[data-tab]').forEach(b=>b.onclick=()=>{pause();manual=true;switchTab(b.dataset.tab);});
$('#memory-nav').onclick=()=>{pause();manual=true;switchTab('notes');};
$('#cards-viewport').addEventListener('wheel',()=>{if(time>=6.12){pause();manual=true;}},{passive:true});
$$('.memory-row').forEach(row=>row.onclick=()=>{pause();manual=true;$('#detail-lesson').textContent=moreLessons[Number(row.dataset.memory)];$('#detail-trade').textContent='Illustrative trading review · Mock memory';$('#lesson-detail').hidden=false;$('#close-detail').focus();});
cards.forEach((card,i)=>card.onclick=()=>{
  if(time<5.4){seek(6.3);manual=true;switchTab('notes');return;}
  pause();manual=true;const d=trades[i];$('#detail-lesson').textContent=d.lesson;$('#detail-trade').replaceChildren(...[`${d.symbol} ${d.side}`,`Entry ${money(d.entry)}`,`Exit ${money(d.exit)}`,`PnL ${pnl(d.pnl)}`].map(text=>{const e=document.createElement('span');e.textContent=text;return e;}));$('#lesson-detail').hidden=false;$('#close-detail').focus();
});
$('#close-detail').onclick=()=>{$('#lesson-detail').hidden=true;cards[0].focus();};
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#close-detail').click();if(e.code==='Space'&&!['INPUT','BUTTON','SELECT','SUMMARY'].includes(document.activeElement.tagName)){e.preventDefault();playing?pause():play();}});
$('#memory-search').oninput=e=>{manual=true;switchTab('notes');const q=e.target.value.trim().toLowerCase();cards.forEach((c,i)=>c.hidden=!`${trades[i].lesson} ${trades[i].symbol}`.toLowerCase().includes(q));$$('.memory-row').forEach((c,i)=>c.hidden=!moreLessons[i].toLowerCase().includes(q));$('#cards-viewport').scrollTop=0;};
function resize(){const viewport=$('#viewport');$('#stage').style.transform=`scale(${viewport.clientWidth/1920})`;}
new ResizeObserver(resize).observe($('#viewport'));resize();
window.scene={seek,play,pause,trades,timeline:tl,get time(){return time;},get manual(){return manual;},get currentTab(){return currentTab;},duration:DURATION};
document.fonts.ready.then(()=>seek(Number(new URLSearchParams(location.search).get('t'))||0));
