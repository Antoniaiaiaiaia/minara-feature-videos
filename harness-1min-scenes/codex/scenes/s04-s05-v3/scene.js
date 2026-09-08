const $=s=>document.querySelector(s),DURATION=12.5,W=1920,H=1080,ORDER_START=6.5;
const marks=window.ASSET_MARKS,clock={t:0},flow=$('#flow'),prompt=$('#prompt'),stage=$('#stage'),viewport=$('#viewport');
let manual=false,selected=null,lastTime=0,soundEnabled=true,manualOrder=false;
const measure=document.createElement('canvas').getContext('2d');
const assets=marks.slice(0,100).map((mark,i)=>{
 const native=Markets.ASSETS.find(a=>a.symbol===(mark.symbol==='GC'?'GOLD':mark.symbol));
 return {price:85.25+i*7.13,changePct:(i%7-2)*.37,volume:2.1e6+i*170000,seed:11+i*7,...native,...mark};
});
function marketHTML(a){
 const values=Markets.sparkFor(a),lo=Math.min(...values),hi=Math.max(...values),color=a.changePct>=0?'#0ab56a':'#f75d5f';
 const pts=values.map((v,i)=>`${i*106/(values.length-1)},${34-(v-lo)/(hi-lo||1)*31}`).join(' ');
 return `<div class="card-heading"><div class="asset-name"><img src="${a.logo}" alt=""><span>${a.symbol}</span></div><span class="category">${a.category==='futures'?'Futures':Markets.CATEGORY_LABEL[a.category]}</span></div><div class="metrics"><div><div class="price">${Markets.fmtPrice(a.price)}</div><div class="change" style="color:${color}">${Markets.fmtPct(a.changePct)}</div><div class="volume">Vol ${Markets.fmtCompact(a.volume)}</div></div><svg class="spark" viewBox="0 0 106 36"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5"/></svg></div><div class="signal-overlay"><img src="assets/minara-avatar.png" alt="Minara" class="signal-avatar"><span>Signal</span><i class="signal-check"><svg viewBox="0 0 24 24"><path d="m5 12 4 4 10-10"/></svg></i></div>`;
}
const cards=assets.map((a,i)=>{
 const wrap=document.createElement('div');wrap.className='market-wrap';wrap.dataset.symbol=a.symbol;wrap.dataset.category=a.category;wrap.dataset.col=i%7;
 wrap.innerHTML=`<button class="market-card" aria-label="Explore ${a.symbol}">${marketHTML(a)}</button>`;$('#wall').append(wrap);
 wrap.firstElementChild.onclick=()=>{selected=a.symbol;$('#interactive').click();};
 return {wrap,tag:wrap.querySelector('.signal-overlay'),col:i%7,row:Math.floor(i/7),signal:i%6===0||['BTC','AAPL','CL','NVDA'].includes(a.symbol),cue:5.02+(i%5)*.105};
});
// Reuse Minara's confirmation fields and native market UI; values stay local.
const orders=['NVDA','CL','BTC','GOLD','SNDK','HOOD'].map((symbol,i)=>{
 const a=Markets.ASSETS.find(a=>a.symbol===symbol)||{symbol,price:98.34,changePct:.86,seed:99};
 const mark=marks.find(m=>m.symbol===(symbol==='GOLD'?'GC':symbol));
 return {...a,logo:mark?.logo||'sndk-clear.svg',quantity:[2,5,.01,.1,.2,5][i],name:['NVIDIA Corporation','Crude Oil','Bitcoin','Gold','SanDisk Corporation','Robinhood Markets'][i]};
});
$('#execution').innerHTML=`<article class="order-card"><div class="order-content"><div class="order-heading"><img id="trade-logo" alt=""><div><h2 id="trade-symbol"></h2><p id="trade-name"></p></div><span id="trade-category"></span></div><div class="order-price"><span>Market price</span><strong id="trade-price"></strong></div><div class="order-line"><span>Quantity</span><strong id="order-quantity"></strong></div><div class="order-line"><span>Estimated amount</span><strong id="order-amount"></strong></div><button id="confirm-order">Buy</button></div><div id="order-success" role="status"><div id="order-check"><svg viewBox="0 0 64 64"><path d="m17 33 10 10 22-24"/></svg></div><strong>Order placed</strong><span id="order-status"></span></div></article><div id="trade-cursor"><svg viewBox="0 0 32 40"><path d="M3 2 27 24l-11 1 6 11-6 3-6-12-7 8Z"/></svg><i></i></div>`;
let activeOrder=-1;
function showOrder(index){
 if(index===activeOrder)return;activeOrder=index;const a=orders[index];
 $('#trade-symbol').textContent=a.symbol;$('#trade-name').textContent=a.name;$('#trade-logo').src=a.logo;
 $('#trade-category').textContent=a.category==='crypto'?'Crypto':a.symbol==='CL'||a.symbol==='GOLD'?'Futures':'Stock';
 $('#trade-price').textContent='$'+Markets.fmtPrice(a.price);$('#order-quantity').textContent=a.quantity+' '+a.symbol;
 $('#order-amount').textContent='$'+(a.price*a.quantity).toFixed(2);$('#confirm-order').textContent='Buy '+a.symbol;
 $('#order-status').textContent=a.quantity+' '+a.symbol+' · Market order';
}
function paintOrder(local){
 const index=Math.min(5,Math.max(0,Math.floor(local))),phase=local-index;showOrder(index);
 const enter=beat(phase,0,.2,'enter'),exit=beat(phase,.74,.26,'power3.in'),success=beat(phase,.42,.22,'back.out(1.8)');
 gsap.set('.order-card',{x:-1820*exit,y:70*(1-enter)-35*exit,scale:.94+.06*enter,rotation:-7*exit,opacity:enter*(1-exit)});
 gsap.set('.order-content',{opacity:1-.92*clamp(success)});
 gsap.set('#order-success',{opacity:clamp(success),y:12*(1-clamp(success))});
 gsap.set('#order-check',{scale:.5+.5*success});
 $('#confirm-order').disabled=phase>=.42;
 gsap.set('#confirm-order',{scale:1-.035*beat(phase,.3,.05)+.035*beat(phase,.35,.09)});
 const cursor=beat(phase,.05,.22,'power2.out');
 gsap.set('#trade-cursor',{x:1060-70*cursor,y:775-70*cursor,opacity:phase>.08&&phase<.43?enter:0});
 gsap.set('#trade-cursor i',{opacity:phase>=.3&&phase<.43?1:0,scale:1+beat(phase,.3,.13)*1.5});
}
$('#confirm-order').onclick=()=>{timeline.time(ORDER_START+activeOrder+.3);play();};
function portfolioDraft(t){const text='Build me a better portfolio';return text.slice(0,Math.round(text.length*beat(t,2.62,1.08,'sine.inOut')));}
function syncBackground(t){const target=(7.633+t)%flow.duration;if(Number.isFinite(target)&&Math.abs(flow.currentTime-target)>.045)flow.currentTime=target;}
function update(t){
 const opening=t<2.5,signalWall=t>=4.5&&t<6.5,pull=beat(t,0,2.02,'sine.inOut'),retreat=beat(t,1.7,.65,'minara');
 const wallScale=opening?.99-.12*pull-.45*retreat:1;
 gsap.set('#wall',{scale:wallScale,opacity:opening?1-retreat:signalWall?1-beat(t,6.13,.32,'power2.in'):0,filter:`blur(${signalWall?beat(t,6.13,.32)*5:retreat*3}px)`});
 cards.forEach((c,i)=>{
  const drift=opening?(c.col%2?1:-1)*t*112:-(t-4.5)*53;
  const cx=(c.col-3)*440,cy=(c.row-3)*231-235+(c.col%2?70:0)+drift-540;
  const r2=(cx/1450)**2+(cy/1000)**2,lens=1-.072*Math.min(2,r2),entry=opening?1:beat(t,4.5+c.row*.018,.43,'enter');
  c.wrap.style.transform=`translate(${960+cx-215}px,${540+cy-106+Math.min(1.4,(cx/1350)**2)*50+(1-entry)*370}px) rotateY(${cx/1350*16}deg) rotateX(${-cy/1000*8}deg) scale(${lens})`;
  c.wrap.style.opacity=entry;c.wrap.style.height='212px';c.tag.style.opacity=signalWall&&c.signal?clamp(beat(t,c.cue,.26,'back.out(1.5)')):0;
  c.tag.style.transform=`scale(${.94+.06*beat(t,c.cue,.26,'back.out(1.5)')})`;
 });
 document.querySelectorAll('#title span').forEach((node,i)=>{const intro=beat(t,.03+i*.04,.3,'enter'),out=beat(t,1.5,.32,'power2.in');gsap.set(node,{y:20*(1-intro)-20*out,opacity:intro*(1-out),filter:`blur(${8*(1-intro)+8*out}px)`});});
 const grow=beat(t,2.02,.445,'promptReveal'),exit=beat(t,4.12,.45,'minara');
 gsap.set('#composer',{opacity:t>=2.02&&t<4.65?1:0,pointerEvents:manual?'auto':'none',clipPath:`inset(0 0 ${100*(1-grow)}% 0 round 36px)`,scaleX:.93+.07*grow,x:-1900*exit,rotation:-3*exit});
 gsap.set('#composer-tools',{opacity:beat(t,2.35,.3)});gsap.set('#camera',{scale:1,x:0,y:0});
 if(!manual){prompt.value=portfolioDraft(t);prompt.readOnly=true;}
 gsap.set('#caret',{x:measure.measureText(prompt.value).width,opacity:manual||t>4.05?0:grow});$('#send').disabled=!prompt.value.trim();
 gsap.set('#send',{scale:1-.12*beat(t,4.02,.06)+.12*beat(t,4.08,.14)});
 gsap.set('#execution',{opacity:t>=ORDER_START?1:0,pointerEvents:t>=ORDER_START?'auto':'none'});
 gsap.set('#edge',{opacity:opening||signalWall?1:0});if(t>=ORDER_START)paintOrder(t-ORDER_START);
 if(!timeline.paused()&&soundEnabled&&lastTime<5.02&&t>=5.02&&t-lastTime<.2){const audio=$('#signal-sound');audio.currentTime=0;audio.play().catch(()=>{});}
 lastTime=t;$('#scrub').value=Math.min(374,Math.round(t*30));$('#time').value=`${t.toFixed(3)} / 12.500s`;
}
const timeline=gsap.timeline({paused:true,onUpdate:()=>update(clock.t),onComplete:()=>{flow.pause();$('#play').textContent='Play';}}).to(clock,{t:DURATION,duration:DURATION,ease:'none'});
function seek(t){manual=false;manualOrder=false;$('#model-menu').hidden=true;timeline.pause();flow.pause();$('#signal-sound').pause();timeline.time(Math.max(0,Math.min(DURATION,t)));update(clock.t);syncBackground(clock.t);$('#play').textContent='Play';}
function play(){manual=false;if(clock.t>=DURATION-.03)seek(0);flow.playbackRate=Number($('#speed').value);syncBackground(clock.t);flow.play().catch(()=>{});timeline.timeScale(Number($('#speed').value)).play();$('#play').textContent='Pause';}
$('#play').onclick=()=>{if(timeline.paused())play();else{timeline.pause();flow.pause();$('#play').textContent='Play';}};
$('#replay').onclick=()=>{seek(0);play();};$('#scrub').oninput=e=>seek(Number(e.target.value)/30);
$('#speed').onchange=e=>{timeline.timeScale(Number(e.target.value));flow.playbackRate=Number(e.target.value);};
document.querySelectorAll('[data-time]').forEach(b=>b.onclick=()=>seek(Number(b.dataset.time)));
$('#sound').onclick=()=>{soundEnabled=!soundEnabled;$('#sound').textContent=soundEnabled?'Sound on':'Sound off';$('#signal-sound').muted=!soundEnabled;};
$('#interactive').onclick=()=>{seek(2.65);manual=true;prompt.readOnly=false;prompt.value=selected?`Build a portfolio with ${selected}`:'';update(clock.t);prompt.focus();};
prompt.oninput=()=>{$('#send').disabled=!prompt.value.trim();};
$('#composer').onsubmit=e=>{e.preventDefault();if(!manual||!prompt.value.trim())return;timeline.time(4.02).play();flow.play().catch(()=>{});$('#play').textContent='Pause';prompt.blur();};
prompt.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('#composer').requestSubmit();}};
$('#attach').onclick=()=>{if(manual)$('#file').click();};$('#file').onchange=()=>{$('#file-name').textContent=$('#file').files[0]?.name||'';};
$('#model').onclick=()=>{if(manual){$('#model-menu').hidden=!$('#model-menu').hidden;$('#model').setAttribute('aria-expanded',String(!$('#model-menu').hidden));}};
$('#fullscreen').onclick=()=>document.fullscreenElement?document.exitFullscreen():viewport.requestFullscreen();
function resize(){const full=!!document.fullscreenElement,s=Math.min(viewport.clientWidth/W,viewport.clientHeight/H);stage.style.transform=`${full?'translate(-50%,-50%) ':''}scale(${s})`;stage.style.transformOrigin=full?'center center':'0 0';}
new ResizeObserver(resize).observe(viewport);document.addEventListener('fullscreenchange',resize);
window.scene={seek,play,timeline,duration:DURATION,draftAt:portfolioDraft,orders,get state(){return {t:clock.t,manual,selected,activeOrder};}};
document.fonts.ready.then(()=>{measure.font='400 32px Geist';seek(Number(new URLSearchParams(location.search).get('t')||.5));});flow.addEventListener('loadeddata',()=>syncBackground(clock.t),{once:true});
