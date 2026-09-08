const $=s=>document.querySelector(s),DURATION=233/30,W=1920,H=1080;
const marks=window.ASSET_MARKS,table=buildArcTable(5.2),clock={t:0};
const assets=marks.slice(0,50).map((mark,i)=>({...Markets.ASSETS.find(a=>a.symbol===(mark.symbol==='GC'?'GOLD':mark.symbol)),...mark,seed:11+i*7}));
assets.forEach((a,i)=>{if(a.price===undefined)Object.assign(a,{price:85.25+i*7.13,changePct:(i%7-2)*.37,volume:2.1e6+i*170000});});
const flow=$('#flow'),prompt=$('#prompt'),stage=$('#stage'),viewport=$('#viewport');
let manual=false,selected=null;
const measure=document.createElement('canvas').getContext('2d');measure.font='400 32px Geist';
const logo=a=>a.logo;
const orbit=marks.map((asset,i)=>{
 const node=document.createElement('div');node.className='orbit-logo';
 node.dataset.symbol=asset.symbol;node.dataset.category=asset.category;
 node.innerHTML=`<img src="${logo(asset)}" alt="${asset.symbol}">`;$('#orbit').append(node);return node;
});
function marketHTML(a,hasSignal){
 const values=Markets.sparkFor(a),lo=Math.min(...values),hi=Math.max(...values),up=a.changePct>=0,color=up?'#0ab56a':'#f75d5f';
 const pts=values.map((v,i)=>`${i*106/(values.length-1)},${34-(v-lo)/(hi-lo||1)*31}`).join(' ');
 return `<div class="card-heading"><div class="asset-name"><img src="${logo(a)}" alt=""><span>${a.symbol}</span></div><span class="category">${a.category==='futures'?'Futures':Markets.CATEGORY_LABEL[a.category]}</span></div><div class="metrics"><div><div class="price">${Markets.fmtPrice(a.price)}</div><div class="change" style="color:${color}">${Markets.fmtPct(a.changePct)}</div><div class="volume">Vol ${a.volume?Markets.fmtCompact(a.volume):'—'}</div></div><svg class="spark" viewBox="0 0 106 36"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/></svg></div>${hasSignal?'<div class="signal-overlay"><img src="assets/minara-avatar.png" alt="Minara" class="signal-avatar"><span>Signal</span><i class="signal-check"><svg viewBox="0 0 24 24"><path d="m5 12 4 4 10-10"/></svg></i></div>':''}`;
}
// A full overscan field keeps large cards entering both frame edges as it rises.
const cards=assets.map((a,i)=>{
 const col=i%7,row=Math.floor(i/7);
 const signal=a.signal===true||a.symbol==='BTC'||['AAPL','CL','AVGO','AMAT','ORCL','QCOM'].includes(a.symbol);
 const wrap=document.createElement('div');wrap.className='market-wrap';
 wrap.dataset.symbol=a.symbol;wrap.dataset.category=a.category;
 wrap.innerHTML=`<button class="market-card" aria-label="Explore ${a.symbol}" tabindex="-1">${marketHTML(a,signal)}</button>`;
 $('#wall').append(wrap);
 const card=wrap.firstElementChild;card.addEventListener('click',()=>{if(!manual)return;selected=a.symbol;document.querySelectorAll('.market-card').forEach(c=>c.classList.remove('selected'));card.classList.add('selected');$('#interactive').textContent=`Ask about ${a.symbol}`;});
 return {wrap,card,col,row,a,signal,tag:wrap.querySelector('.signal-overlay'),cue:5.8+((i*7)%13)*.095};
});
function syncBackground(t){const target=(7.633+t)%flow.duration;if(Number.isFinite(target)&&Math.abs(flow.currentTime-target)>.045)flow.currentTime=target;}
function update(t){
 const converge=beat(t,1.22,.94,'minara'),radius=1220*(1-converge);
 const orbitVisible=t<2.2;
 gsap.set('#orbit',{opacity:orbitVisible?1:0});
 orbit.forEach((node,i)=>{
  // Freeze each logo's rank at contraction onset; erase from outer tail inward.
  const s=(i/marks.length+Math.min(t,1.22)*.062)%1,n=arcToN(s,table),p=spiral(n,radius,5.2),r=Math.hypot(p.x,p.y);
  const scale=(.48+.52*Math.sqrt(1-n))*(1-converge);
  const center=clamp((1220*(1-n)-120)/180),fade=beat(t,0,.25,'power2.out')*center*(1-beat(t,1.22+s*.38,.12,'power2.inOut'));
  node.style.transform=`translate(${960+p.x-75}px,${540+p.y-75}px) rotate(${Math.sin(n*12+t*.6)*12}deg) scale(${scale})`;node.style.opacity=fade;
 });
 document.querySelectorAll('#title span').forEach((node,i)=>{
  const intro=beat(t,.07+i*.07,.42,'enter'),out=beat(t,1.6+i*.025,.28,'power2.in');
  gsap.set(node,{y:30*(1-intro)-34*out,opacity:intro*(1-out),filter:`blur(${12*(1-intro)+10*out}px)`});
 });
 const grow=beat(t,2.02,.445,'promptReveal'),widen=.93+.07*beat(t,2.02,.2,'promptReveal');
 const fly=beat(t,5.18,.48,'power3.in');
 gsap.set('#composer',{opacity:t>=2.02&&t<5.68?1:0,pointerEvents:manual&&t>=2.02&&t<5.68?'auto':'none',x:-1900*fly,scaleX:widen,clipPath:`inset(0 0 ${(1-grow)*100}% 0 round 36px)`,rotation:-3*fly});
 gsap.set('#composer-tools',{opacity:beat(t,2.41,.3)});
 if(!manual){prompt.value=draftAt(t);prompt.readOnly=true;}
 const textWidth=measure.measureText(prompt.value).width;
 gsap.set('#caret',{x:textWidth,opacity:manual?0:grow*(t<5.15?1:0)});
 $('#send').disabled=prompt.value.trim().length===0;
 const zoom=t>=2.92&&t<5.03?1.65:1;
 const camX=zoom===1?0:W*.573-zoom*(430+36+textWidth);
 const camY=zoom===1?0:H*.4881-zoom*(386+29+23);
 gsap.set('#camera',{scale:zoom,x:camX,y:camY});
 gsap.set('#send',{scale:1-.13*beat(t,5.08,.067)+.13*beat(t,5.147,.25,'power2.out')});
 const wallOn=t>=5.28;
 gsap.set('#wall',{opacity:wallOn?1:0});gsap.set('#edge',{opacity:wallOn?1:0});
 const scroll=-122*beat(t,5.28,DURATION-5.28,'sine.inOut');
 const heights=[-190,-75,-190,-95,-230,-110,-210];
 cards.forEach((c,i)=>{
  const signal=c.signal?beat(t,c.cue,.26,'back.out(1.5)'):0,p=clamp(signal);
  const h=212,y=heights[c.col]+h/2+scroll;heights[c.col]+=h+24;
  const enter=beat(t,5.28+c.row*.042+Math.abs(c.col-3)*.035,.62,'enter');
  const cx=(c.col-3)*454,cy=y-540,r2=(cx/1200)**2+(cy/850)**2;
  const lens=1-.085*Math.min(1.8,r2),pull=1-.028*Math.min(1.8,r2);
  c.wrap.style.transform=`translate(${960+cx*pull-215}px,${540+cy*pull-h/2+(1-enter)*450}px) rotateY(${cx/1200*14}deg) rotateX(${-cy/850*7}deg) scale(${lens})`;c.wrap.style.opacity=wallOn?enter*(1-.08*Math.min(2,r2)):0;
  c.wrap.style.height=h+'px';
  c.card.style.height='114px';
  c.card.tabIndex=manual&&wallOn?0:-1;
  if(c.tag){c.tag.style.opacity=p;c.tag.style.transform=`scale(${.94+.06*signal})`;c.tag.style.transformOrigin='center';}
 });
 $('#scrub').value=Math.min(232,Math.round(t*30));$('#time').value=`${t.toFixed(3)} / 7.767s`;
}
const timeline=gsap.timeline({paused:true,onUpdate:()=>update(clock.t),onComplete:()=>{flow.pause();$('#play').textContent='Play';}}).to(clock,{t:DURATION,duration:DURATION,ease:'none'});
function seek(t){manual=false;$('#model-menu').hidden=true;timeline.pause();flow.pause();timeline.time(Math.max(0,Math.min(DURATION,t)));update(clock.t);syncBackground(clock.t);$('#play').textContent='Play';}
function play(){manual=false;if(clock.t>=DURATION-.03)seek(0);flow.playbackRate=Number($('#speed').value);syncBackground(clock.t);flow.play().catch(()=>{});timeline.timeScale(Number($('#speed').value)).play();$('#play').textContent='Pause';}
$('#play').onclick=()=>{if(timeline.paused())play();else{timeline.pause();flow.pause();$('#play').textContent='Play';}};
$('#replay').onclick=()=>{seek(0);play();};
$('#scrub').oninput=e=>seek(Number(e.target.value)/30);
$('#speed').onchange=e=>{timeline.timeScale(Number(e.target.value));flow.playbackRate=Number(e.target.value);};
document.querySelectorAll('[data-time]').forEach(b=>b.onclick=()=>seek(Number(b.dataset.time)));
$('#interactive').onclick=()=>{seek(2.83);manual=true;prompt.readOnly=false;prompt.value=selected?`how to build position for ${selected}`:'';update(clock.t);prompt.focus();$('#interactive').textContent='Try the input';};
prompt.oninput=()=>{$('#send').disabled=!prompt.value.trim();};
$('#composer').onsubmit=e=>{e.preventDefault();if(!manual||!prompt.value.trim())return;const value=prompt.value;timeline.pause();clock.t=5.1;manual=true;update(clock.t);prompt.value=value;timeline.time(5.1).play();flow.play().catch(()=>{});$('#play').textContent='Pause';prompt.blur();};
prompt.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('#composer').requestSubmit();}};
$('#attach').onclick=()=>{if(manual)$('#file').click();};
$('#file').onchange=()=>{$('#file-name').textContent=$('#file').files[0]?.name||'';};
$('#model').onclick=()=>{if(!manual)return;$('#model-menu').hidden=!$('#model-menu').hidden;$('#model').setAttribute('aria-expanded',String(!$('#model-menu').hidden));};
$('#fullscreen').onclick=()=>document.fullscreenElement?document.exitFullscreen():viewport.requestFullscreen();
function resize(){const full=!!document.fullscreenElement,s=Math.min(viewport.clientWidth/W,viewport.clientHeight/H);stage.style.transform=`${full?'translate(-50%,-50%) ':''}scale(${s})`;stage.style.transformOrigin=full?'center center':'0 0';}
new ResizeObserver(resize).observe(viewport);document.addEventListener('fullscreenchange',resize);
window.scene={seek,play,timeline,duration:DURATION,draftAt,get state(){return {t:clock.t,manual,selected};}};
document.fonts.ready.then(()=>{measure.font='400 32px Geist';seek(Number(new URLSearchParams(location.search).get('t')||1.05));});
flow.addEventListener('loadeddata',()=>syncBackground(clock.t),{once:true});
