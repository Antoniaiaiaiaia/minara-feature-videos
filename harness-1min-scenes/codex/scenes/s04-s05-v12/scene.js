const $=s=>document.querySelector(s),DURATION=9.5,W=1920,H=1080;
const marks=window.ASSET_MARKS,clock={t:0},flow=$('#flow'),prompt=$('#prompt'),stage=$('#stage'),viewport=$('#viewport');
let manual=false,selected=null;
const measure=document.createElement('canvas').getContext('2d');
const assets=marks.slice(0,100).map((mark,i)=>{
 const native=Markets.ASSETS.find(a=>a.symbol===(mark.symbol==='GC'?'GOLD':mark.symbol));
 return {price:85.25+i*7.13,changePct:(i%7-2)*.37,volume:2.1e6+i*170000,seed:11+i*7,...native,...mark};
});
const tileColors={NVDA:'#76b900',AAPL:'#e8e8e8',MSFT:'#0078d4',AMZN:'#ff9900',GOOGL:'#4285f4',CL:'#3d4148',GC:'#d5aa39',GOLD:'#d5aa39',META:'#0866ff',TSLA:'#e82127',AMD:'#ed1c24',AVGO:'#cc092f',MU:'#0075a9',PLTR:'#e6e6e6',COIN:'#1652f0',NFLX:'#e50914',RKLB:'#2d3440',ORCL:'#f80000',ADBE:'#eb1000',CRM:'#00a1e0',INTC:'#0071c5',QCOM:'#3253dc',TXN:'#cc0000',AMAT:'#1679b8',LRCX:'#3b4487',KLAC:'#0071bc',ADI:'#155a9c',ANET:'#535f9b',ARM:'#0091bd',TSM:'#d42128',ASML:'#15247c',SHOP:'#95bf47',UBER:'#ececec',ABNB:'#ff385c',HOOD:'#c3f53c',CRWD:'#e01f26',SNOW:'#29b5e8',PANW:'#f05b24',NET:'#f48120',DDOG:'#632ca6',NOW:'#52764a',IBM:'#1261fe',INTU:'#236cff',CSCO:'#049fd9',DELL:'#007db8',HPQ:'#0096d6',HPE:'#00b388',SMCI:'#174b78',WMT:'#0071ce',COST:'#e31837',TGT:'#cc0000',HD:'#f96302',LOW:'#004990',NKE:'#eeeeee',SBUX:'#00754a',MCD:'#ffc72c',KO:'#f40009',PEP:'#005cb4',DIS:'#263b8b',CMCSA:'#353a42',VZ:'#ee0000',T:'#009fdb',TMUS:'#e20074',V:'#163c9c',MA:'#eb001b',AXP:'#006fcf',PYPL:'#003087',JPM:'#216c5c',BAC:'#e31837',C:'#056dae',GS:'#5c9dcc',SNDK:'#e10600',BTC:'#f7931a',ETH:'#627eea',SOL:'#9945ff',XRP:'#24292f',DOGE:'#c2a633',ADA:'#0033ad',AVAX:'#e84142',LINK:'#375bd2',SUI:'#4da2ff',HYPE:'#97fce4',BNB:'#f0b90b',TRX:'#ef0027',DOT:'#e6007a',LTC:'#345d9d',BCH:'#0ac18e',XLM:'#dedede',XMR:'#ff6600',ETC:'#328332',ATOM:'#343558',NEAR:'#eeeeee',APT:'#d9eeeb',ARB:'#285a88',OP:'#ff0420',UNI:'#ff007a',AAVE:'#8d65bd',MKR:'#1aab9b',ICP:'#7744bb',FIL:'#0090ff',HBAR:'#272b30',VET:'#15bdff'};
function logoTile(a){
 const bg=tileColors[a.symbol]||'#343b48',dark=['NVDA','AAPL','AMZN','GC','GOLD','PLTR','HYPE','BNB','HOOD','UBER','NKE','MCD','XLM','NEAR','APT'].includes(a.symbol);
 return `<span class="logo-tile" style="--tile-bg:${bg};--logo-filter:brightness(0)${dark?'':' invert(1)'}"><img src="${window.LOGO_GLYPHS?.[a.symbol]||a.logo}" alt=""></span>`;
}
function marketHTML(a){
 const values=Markets.sparkFor(a),lo=Math.min(...values),hi=Math.max(...values),color=a.changePct>=0?'#0ab56a':'#f75d5f';
 const pts=values.map((v,i)=>`${i*106/(values.length-1)},${34-(v-lo)/(hi-lo||1)*31}`).join(' ');
 return `<div class="card-heading"><div class="asset-name">${logoTile(a)}<span>${a.symbol}</span></div><span class="category">${a.category==='futures'?'Futures':Markets.CATEGORY_LABEL[a.category]}</span></div><div class="metrics"><div><div class="price">${Markets.fmtPrice(a.price)}</div><div class="change" style="color:${color}">${Markets.fmtPct(a.changePct)}</div><div class="volume">Vol ${Markets.fmtCompact(a.volume)}</div></div><svg class="spark" viewBox="0 0 106 36"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5"/></svg></div><div class="signal-overlay"><img src="assets/minara-avatar.png" alt="Minara" class="signal-avatar"><span>Signal</span><i class="signal-check"><svg viewBox="0 0 24 24"><path d="m5 12 4 4 10-10"/></svg></i></div>`;
}
const cards=assets.map((a,i)=>{
 const wrap=document.createElement('div');wrap.className='market-wrap';wrap.dataset.symbol=a.symbol;wrap.dataset.category=a.category;wrap.dataset.col=i%7;
 const amount=100+(i%5)*50;
 wrap.innerHTML=`<div class="market-card" aria-label="${a.symbol}">${marketHTML(a)}<div class="wall-order"><div class="wall-filled"><i><svg viewBox="0 0 24 24"><path d="m5 12 4 4 10-10"/></svg></i><div><b>Order placed</b><small>${a.symbol} · $${amount}</small></div></div></div></div>`;$('#wall').append(wrap);
 const cue=5.02+((i*11)%19)*.045;
 return {a,amount,wrap,tag:wrap.querySelector('.signal-overlay'),metrics:wrap.querySelector('.metrics'),order:wrap.querySelector('.wall-order'),filled:wrap.querySelector('.wall-filled'),col:i%7,row:Math.floor(i/7),signal:i%5!==4,trade:i%5<3,cue,orderCue:cue+.70+((i*3)%5)*.07};
});
function paintWallOrder(c,t,on){
 const placed=on&&c.trade?beat(t,c.orderCue,.44,'back.out(1.8)'):0,reveal=clamp(placed);
 const signal=on&&c.signal?clamp(beat(t,c.cue,.48,'back.out(1.5)')):0;
 c.tag.style.opacity=signal*(1-reveal);c.tag.style.transform=`scale(${.94+.06*signal})`;
 c.metrics.style.opacity=1;c.order.style.opacity=reveal;c.order.style.transform='none';
 c.filled.style.opacity=reveal;c.filled.style.transform=`scale(${.9+.1*placed})`;
 c.wrap.dataset.order=reveal>.99?'filled':'idle';
}
const historyRows=cards.filter(c=>c.trade).slice(0,14);
$('#trade-history').innerHTML=`<div class="history-top"><h2>Trade history</h2><span>All markets <i>⌄</i></span></div><table><thead><tr><th>Symbol</th><th>Side</th><th>Size</th><th>Fill price</th><th>Order value</th><th>Fee</th><th>Status</th><th>Time</th></tr></thead><tbody>${historyRows.map((c,i)=>{
 const quantity=Number((c.amount/c.a.price).toFixed(6)),value=quantity*c.a.price;
 return `<tr data-symbol="${c.a.symbol}"><td><div class="history-symbol">${logoTile(c.a)}<b>${c.a.symbol}</b></div></td><td><span class="history-side">Buy</span></td><td>${quantity.toLocaleString('en-US',{maximumFractionDigits:6})}</td><td>$${Markets.fmtPrice(c.a.price)}</td><td>$${value.toFixed(2)}</td><td>$${(value*.0004).toFixed(2)}</td><td><span class="history-filled">✓ Filled</span></td><td>21:16:${String(15+i).padStart(2,'0')}</td></tr>`;
}).join('')}</tbody></table>`;
const rows=[...$('#trade-history').querySelectorAll('tbody tr')];
function portfolioDraft(t){const text='Build me a better portfolio';return text.slice(0,Math.round(text.length*beat(t,2.62,1.08,'sine.inOut')));}
function syncBackground(t){const target=(7.633+t)%flow.duration;if(Number.isFinite(target)&&Math.abs(flow.currentTime-target)>.045)flow.currentTime=target;}
function update(t){
 const opening=t<2.5,signalWall=t>=4.5,pull=beat(t,0,2.02,'sine.inOut'),retreat=beat(t,1.7,.65,'minara');
 const wallScale=opening?.99-.12*pull-.45*retreat:1;
 gsap.set('#wall',{scale:wallScale,opacity:opening?1-retreat:signalWall?1-beat(t,7.5,.32,'power2.inOut'):0,filter:`blur(${signalWall?0:retreat*3}px)`});
 cards.forEach((c,i)=>{
  const drift=opening?(c.col%2?1:-1)*t*112:-(t-4.5)*53;
  const cx=(c.col-3)*440,cy=(c.row-3)*231-235+(c.col%2?70:0)+drift-540;
  const r2=(cx/1450)**2+(cy/1000)**2,lens=1-.072*Math.min(2,r2),entry=opening?1:beat(t,4.5+c.row*.018,.43,'enter');
  c.wrap.style.transform=`translate(${960+cx-215}px,${540+cy-106+Math.min(1.4,(cx/1350)**2)*50+(1-entry)*370}px) rotateY(${cx/1350*16}deg) rotateX(${-cy/1000*8}deg) scale(${lens})`;
  c.wrap.style.opacity=entry;c.wrap.style.height='212px';paintWallOrder(c,t,signalWall);
 });
 document.querySelectorAll('#title span').forEach((node,i)=>{const intro=beat(t,.03+i*.04,.3,'enter'),out=beat(t,1.5,.32,'power2.in');gsap.set(node,{y:20*(1-intro)-20*out,opacity:intro*(1-out),filter:`blur(${8*(1-intro)+8*out}px)`});});
 const grow=beat(t,2.02,.445,'promptReveal'),exit=beat(t,4.12,.45,'minara');
 gsap.set('#composer',{opacity:t>=2.02&&t<4.65?1:0,pointerEvents:manual?'auto':'none',clipPath:`inset(0 0 ${100*(1-grow)}% 0 round 36px)`,scaleX:.93+.07*grow,x:-1900*exit,rotation:0});
 gsap.set('#composer-tools',{opacity:beat(t,2.35,.3)});gsap.set('#camera',{scale:2.5,x:-845,y:-555});
 if(!manual){prompt.value=portfolioDraft(t);prompt.readOnly=true;}
 gsap.set('#caret',{x:measure.measureText(prompt.value).width,opacity:manual||t>4.05?0:grow});$('#send').disabled=!prompt.value.trim();
 gsap.set('#send',{scale:1-.12*beat(t,4.02,.06)+.12*beat(t,4.08,.14)});
 gsap.set('#edge',{opacity:(opening||signalWall?1:0)*(1-beat(t,7.5,.32))});
 gsap.set('#trade-history',{opacity:beat(t,7.6,.26,'power2.out'),y:20*(1-beat(t,7.6,.3,'enter')),pointerEvents:t>=7.6?'auto':'none'});
 rows.forEach((row,i)=>{const p=beat(t,7.83+i*.075,.22,'enter');row.style.opacity=p;row.style.transform=`translateY(${14*(1-p)}px)`;});
 $('#scrub').value=Math.min(284,Math.round(t*30));$('#time').value=`${t.toFixed(3)} / 9.500s`;
}
const timeline=gsap.timeline({paused:true,onUpdate:()=>update(clock.t),onComplete:()=>{flow.pause();$('#play').textContent='Play';}}).to(clock,{t:DURATION,duration:DURATION,ease:'none'});
function seek(t){manual=false;$('#model-menu').hidden=true;timeline.pause();flow.pause();timeline.time(Math.max(0,Math.min(DURATION,t)));update(clock.t);syncBackground(clock.t);$('#play').textContent='Play';}
function play(){manual=false;if(clock.t>=DURATION-.03)seek(0);flow.playbackRate=Number($('#speed').value);syncBackground(clock.t);flow.play().catch(()=>{});timeline.timeScale(Number($('#speed').value)).play();$('#play').textContent='Pause';}
$('#play').onclick=()=>{if(timeline.paused())play();else{timeline.pause();flow.pause();$('#play').textContent='Play';}};
$('#replay').onclick=()=>{seek(0);play();};$('#scrub').oninput=e=>seek(Number(e.target.value)/30);
$('#speed').onchange=e=>{timeline.timeScale(Number(e.target.value));flow.playbackRate=Number(e.target.value);};
document.querySelectorAll('[data-time]').forEach(b=>b.onclick=()=>seek(Number(b.dataset.time)));
$('#interactive').onclick=()=>{seek(2.65);manual=true;prompt.readOnly=false;prompt.value=selected?`Build a portfolio with ${selected}`:'';update(clock.t);prompt.focus();};
prompt.oninput=()=>{$('#send').disabled=!prompt.value.trim();};
$('#composer').onsubmit=e=>{e.preventDefault();if(!manual||!prompt.value.trim())return;timeline.time(4.02).play();flow.play().catch(()=>{});$('#play').textContent='Pause';prompt.blur();};
prompt.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('#composer').requestSubmit();}};
$('#attach').onclick=()=>{if(manual)$('#file').click();};$('#file').onchange=()=>{$('#file-name').textContent=$('#file').files[0]?.name||'';};
$('#model').onclick=()=>{if(manual){$('#model-menu').hidden=!$('#model-menu').hidden;$('#model').setAttribute('aria-expanded',String(!$('#model-menu').hidden));}};
$('#fullscreen').onclick=()=>document.fullscreenElement?document.exitFullscreen():viewport.requestFullscreen();
function resize(){const full=!!document.fullscreenElement,s=Math.min(viewport.clientWidth/W,viewport.clientHeight/H);stage.style.transform=`${full?'translate(-50%,-50%) ':''}scale(${s})`;stage.style.transformOrigin=full?'center center':'0 0';}
new ResizeObserver(resize).observe(viewport);document.addEventListener('fullscreenchange',resize);
window.scene={seek,play,timeline,duration:DURATION,draftAt:portfolioDraft,get state(){return {t:clock.t,manual,selected};}};
document.fonts.ready.then(()=>{measure.font='400 32px Geist';seek(Number(new URLSearchParams(location.search).get('t')||.5));});flow.addEventListener('loadeddata',()=>syncBackground(clock.t),{once:true});
