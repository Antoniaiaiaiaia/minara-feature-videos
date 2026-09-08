/* S08 + S09: deterministic, local product-animation prototype.
 * Reference metrics are illustrative. This scene does not call a trading API.
 * The original snapcn AgentSteps React component is driven by this GSAP clock.
 */
gsap.registerPlugin(CustomEase);
CustomEase.create('minara', 'M0,0 C0.95,0.03 0,0.98 1,1');
CustomEase.create('enter', '.16,1,.3,1');
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const DURATION = 8.7;
const DEFAULT_PROMPT = 'Build a long-only semiconductor trend strategy.';
const factors = [
  ['Yang-Zhang Volatility (30D)', 'A high-quality 30-day volatility estimate that uses open, high, low, and close to capture both overnight and daily moves.', '.078'],
  ['Return Volatility (30D, inverted)', '30-day daily-return volatility, flipped so calmer names score higher.', '.071', 'returnVolatility'],
  ['Average True Range (12D)', 'Typical daily trading range over 12 days, measured as a percentage of the current price.', '.070', 'atr'],
  ['Realized Volatility (21D)', "How much a name’s daily returns have swung around over the last 21 days.", '.069'],
  ['Realized Volatility (21D, inverted)', 'Last month’s daily-return volatility, flipped so calmer names score higher.', '.069'],
  ['Parkinson Range (inverted)', 'Today’s high-to-low range on a log scale (a volatility proxy), flipped so tighter-range names score higher.', '.068'],
  ['90-Day Tail Risk (inverted)', 'Measures the worst-case daily loss over the past 90 days, flipped so names with milder downside risk score higher.', '.067'],
  ['Volume Trend (Full History)', 'Whether volume has trended up or down over all available history, scaled by its own average.', '.063', 'volumeTrend'],
  ['Value at Risk (5%, 60D)', 'How bad a typical worst-5% day has been over the last 60 days, stated as a positive loss number.', '.062'],
  ['Max Daily Gain (1-Month)', 'The single biggest one-day jump over the past month.', '.061'],
  ['Max Daily Gain (30D, inverted)', 'The biggest one-day jump over the past 30 days, flipped so names without a lottery-like spike score higher.', '.061'],
  ['Max Daily Gain (21D, inverted)', 'The largest daily gain of the last 21 days, flipped so calmer names score higher.', '.060'],
];
const selectedFactors = new Set(['returnVolatility','atr','volumeTrend']);
const selectedAssets = new Set(['NVDA','AMD','AVGO','MU']);
factors.forEach(([name, desc, ic, key], i) => {
  const card = document.createElement('div'); card.className='factor'; card.dataset.key=key || `factor${i}`;
  card.innerHTML=`<h3><svg class="star"><use href="#star-icon"/></svg><span>${name}</span></h3><p>${desc}</p><div class="ic">IC<strong>0${ic}</strong></div>`;
  $('#factor-wall').append(card);
});
const symbols = ('AAL AAOI AAON AAPL ABBV ABNB ABT ACHR ACN ADBE ADI AG AGG AIQ ALAB ALB AMAT AMD AME AMGN AMKR AMZN ANET APH APLD APO APP ARM ASML ASTS ATKR AUR AVGO AXP BA BABA BAC BBAI BE BIDU BILL BILI BLK BNO BOTZ CAT CCJ CEG CEVA CIBR CIEN COIN COHR COP COST CRM CRWD CSCO CVX DELL DIS GOOGL INTC META MSFT MU NFLX NVDA PLTR QQQ SPY TSLA').split(' ');
// Real asset icons already sourced in the project. No screenshot slices.
const logos = new Set('AAPL AMD AMZN AVGO COIN GOOGL META MSFT MU NFLX NVDA PLTR RKLB TSLA'.split(' '));
symbols.forEach(symbol => {
  const cell=document.createElement('button'); cell.className='asset'; cell.dataset.symbol=symbol;cell.setAttribute('aria-pressed','false');
  cell.innerHTML=`${logos.has(symbol)?`<img src="assets/logos/${symbol.toLowerCase()}.${symbol==='AVGO'?'png':'svg'}" alt="">`:`<span class="asset-mark">${symbol.slice(0,2)}</span>`}<span>${symbol}</span>`;
  cell.onclick=()=>{if(selectedAssets.has(symbol)){if(selectedAssets.size===1)return;selectedAssets.delete(symbol);}else selectedAssets.add(symbol); updateCode();sync(tl.time());};
  $('#asset-wall').append(cell);
});

const escapeHTML = s => s.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function codeSource(){
  return [
    '// Semiconductor Trend',
    '// Long-only · daily evaluation',
    'export const strategy = {',
    `  universe: [${[...selectedAssets].map(x=>`"${x}"`).join(', ')}],`,
    '  interval: "1d",',
    '  factors: {',
    '    volumeTrend: "Volume Trend (Full History)",',
    '    returnVolatility: "Return Volatility (30D, inverted)",',
    '    atr: "Average True Range (12D)",',
    '  },',
    '  entry: "volumeTrend > 0",',
    '  rankBy: "returnVolatility",',
    '  direction: "long",',
    '  risk: { stopLossATR: 2, maxPositionPct: 25 },',
    '  rebalance: "daily",',
    '};',
  ];
}
function updateCode(){
  $('#code-lines').innerHTML=codeSource().map((line,i)=>{
    let body=escapeHTML(line);
    if(line.startsWith('//')) body=`<span class="comment">${body}</span>`;
    else body=body.replace(/(&quot;.*?&quot;)/g,'<span class="str">$1</span>').replace(/\b(export|const)\b/g,'<span class="keyword">$1</span>');
    return `<div class="code-line"><span class="line-no">${i+1}</span><span class="code-text" data-line="${i}">${body}</span></div>`;
  }).join('');
  $('.rule-list b').textContent=[...selectedAssets].join(' · ');
  if(window.sceneReady){wrapText($('#code-lines'));textGroups[2].els=$$('#workspace .swap-ink').filter(el=>!el.closest('#results,#assistant-result,#running'));}
}
updateCode();

const tickerGroup=$('.ticker-group');
for(let i=0;i<2;i++){const copy=tickerGroup.cloneNode(true);copy.setAttribute('aria-hidden','true');$('.ticker-track').append(copy);}
let tickerWidth=1;

// Actual text-swap motion targets/easing come from the vendored component.
// Wrapping text nodes preserves the reference UI's geometry and native controls.
function wrapText(root){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];
  while(walker.nextNode()){const n=walker.currentNode;if(n.textContent.trim()&&!n.parentElement.closest('svg,textarea,.swap-ink,script,style'))nodes.push(n);}
  nodes.forEach(n=>{const span=document.createElement('span');span.className='swap-ink';n.replaceWith(span);span.append(n);});
}
['#factor-scene','#asset-scene','#workspace'].forEach(s=>wrapText($(s)));
const textGroups=[
  {els:$$('#factor-scene .swap-ink'),at:3.887},
  {els:$$('#asset-scene .swap-ink'),at:4.627},
  {els:$$('#workspace .swap-ink').filter(el=>!el.closest('#results,#assistant-result,#running')),at:5.2935},
  {els:$$('#results .swap-ink,#assistant-result .swap-ink'),at:8.04},
  {els:[$('#idea')],at:2.017},
];
function revealTexts(t){
  textGroups.forEach(({els,at},group)=>{
    const progress=group===3&&(manualRun||manualTab==='backtest')?1:Math.max(0,Math.min(1,(t-at)/.267));
    const pose=window.textSwapPose(progress);
    els.forEach(el=>{if(el.dataset.swapProgress===String(progress))return;el.dataset.swapProgress=String(progress);el.style.opacity=pose.opacity;el.style.transform=`scale(${pose.scale})`;el.style.filter=pose.blur>.01?`blur(${pose.blur}px)`:'none';});
  });
}

// A fixed illustrated series; no inference of real semiconductor performance.
const equity=[10000,10000,9900,9770,10020,9540,9690,9380,9310,8990,8990,9200,9090,8990,9290,9050,9300,9630,9520,9550,9560,9560,9560,9800,10000,10530,10400,11080,11540,11540,11540,11440,11440,11440,11850,11900,11700,11240,11120,10850,10750,10900,10550,10100,10500,10190,9990,9970,10300,10850,11400,11400,11400,11100,11100,11100,11330,11800,11300,11750,12500,12500,12800,13320,12940,13300,13080,13231];
const benchmark=[10000,11100,10700,10500,10200,10300,10100,10400,10500,10600,11100,11150,10700,11000,11400,11100,11300,10600,10200,10100,10400,10400,10100,9900,10300,9980,10200,10100,9500,9050,9900,9800,10500,11400,11700,12500,13200,12900,13300,13000,13000,12700,13000,12900,12500,12100,12400,12200,12000,12400,11700,12200,11900,12000,11000,10700,11500,12100,11800,11511];
const chartPath = values=>values.map((v,i)=>`${i?'L':'M'}${76+i/(values.length-1)*840},${270-(v-8000)/6000*244}`).join(' ');
$('#equity-line').setAttribute('d',chartPath(equity));$('#benchmark-line').setAttribute('d',chartPath(benchmark));
$('#chart-grid').innerHTML=[8000,9000,10000,11000,12000,13000,14000].map(v=>{const y=270-(v-8000)/6000*244;return `<line x1="76" x2="916" y1="${y}" y2="${y}"/><text x="61" y="${y+5}" text-anchor="end">${v.toLocaleString('en-US')}</text>`}).join('')+['Dec','2026','Feb','Mar','Apr','May','Jun','Jul','Aug'].map((m,i)=>`<text x="${100+i*99}" y="306">${m}</text>`).join('');
const curveLength=$('#equity-line').getTotalLength();

const tl=gsap.timeline({paused:true,defaults:{ease:'enter'}});
gsap.set('#input-scene,#agent-scene,#factor-scene,#asset-scene,#workspace,#cursor',{autoAlpha:0});
gsap.set('#workspace',{scale:1.3,x:160,y:-65});

tl.to('#title',{x:-2200,filter:'blur(6px)',duration:.30,ease:'power3.in'},1.70)
  .set('#title',{autoAlpha:0},2.0000)
  .fromTo('#input-scene',{autoAlpha:0,scale:.94,y:70},{autoAlpha:1,scale:1,y:0,duration:.28},2.0000)
  .to('#send',{scale:.85,duration:.07},2.3570).to('#send',{scale:1,duration:.12},2.4270)
  .to('#input-scene',{autoAlpha:0,scale:.9,y:-50,duration:.22,ease:'power3.in'},2.4270)
  .set('#agent-scene',{autoAlpha:1},2.4670)
  .to('#agent-scene',{autoAlpha:0,scale:1.45,filter:'blur(8px)',duration:.18},3.7870)
  .fromTo('#factor-scene',{autoAlpha:0,scale:1.07,y:150,rotation:-3},{autoAlpha:1,scale:1,y:0,rotation:0,duration:.34,ease:'minara'},3.8470)
  .to('#factor-scene',{y:-57,duration:.57,ease:'sine.inOut'},4.1970)
  .to('#factor-scene',{autoAlpha:0,scale:.86,y:-130,filter:'blur(9px)',duration:.24,ease:'power3.in'},4.5270)
  .fromTo('#asset-scene',{autoAlpha:0,y:160,scale:1.13},{autoAlpha:1,y:0,scale:1,duration:.30,ease:'minara'},4.5970)
  .to('#asset-scene',{y:-78,duration:.5,ease:'sine.inOut'},4.8870)
  .to('#asset-scene',{autoAlpha:0,scale:.92,filter:'blur(5px)',duration:.3},5.2070)
  .to('#workspace',{autoAlpha:1,duration:.24},5.2835)
  .to('#workspace',{scale:1,x:0,y:0,duration:.65,ease:'minara'},6.7000)
  .set('#cursor',{autoAlpha:1,x:1290,y:755},7.3500)
  .to('#cursor',{x:1120,y:173,duration:.27,ease:'minara'},7.3500)
  .to('#run',{scale:.93,duration:.07},7.6200).to('#run',{scale:1,duration:.12},7.6900)
  .fromTo('#cursor i',{autoAlpha:.6,scale:.5},{autoAlpha:0,scale:1.8,duration:.24},7.6300)
  .to('#cursor',{autoAlpha:0,duration:.15},7.8500)
  .to({}, {duration:.3},8.4000);
window.__timelines={'s08-s09':tl};

let manualTab=null, manualRun=false, ideaText=DEFAULT_PROMPT, scrubMode=false;
const runClock={progress:0};
const runTimeline=gsap.timeline({paused:true,onUpdate:()=>renderRun(runClock.progress),onComplete:()=>{manualRun=false;manualTab='backtest';renderRun(1);}})
 .to(runClock,{progress:1,duration:1.45,ease:'none'});
function showTab(tab){
  $('#code-view').hidden=tab!=='code';$('#backtest-view').hidden=tab!=='backtest';
  $('#code-tab').setAttribute('aria-selected',String(tab==='code'));
  $('#backtest-tab').setAttribute('aria-selected',String(tab==='backtest'));
}
function renderRun(p){
  showTab('backtest');$('#running').hidden=p>=1;$('#results').hidden=p<1;
  $('#running progress').value=p*100;$('.loading-ring').style.transform=`rotate(${p*720}deg)`;
  $('#run').disabled=p<1;$('#run').textContent=p<1?'Running…':'Run';$('#rerun').disabled=p<1;
  $('#assistant-result').style.display=p>=1?'block':'none';
  if(p>=1){$('.assistant-intro').style.display='none';$('.rule-list').style.display='none';$('#review-code').style.display='none';}
  $('#equity-line').style.strokeDasharray=`${curveLength}`;
  $('#equity-line').style.strokeDashoffset='0';
}
function sync(t){
  gsap.set('.ticker-track',{x:-(Math.max(0,t-5.2835)*90)%tickerWidth});
  window.titleFrame=Math.round(t*60);window.setTitleFrame?.(window.titleFrame);
  revealTexts(t);
  window.agentFrame=Math.round(Math.max(0,t-2.467)*60);window.setAgentFrame?.(window.agentFrame);
  if(document.activeElement!==$('#idea')) $('#idea').value=ideaText;
  $$('.factor').forEach(el=>{const selected=selectedFactors.has(el.dataset.key)&&t>=4.157;el.classList.toggle('selected',selected);el.style.opacity=t>=4.267&&!selected?'.42':'1';});
  $$('.asset').forEach(el=>{const selected=selectedAssets.has(el.dataset.symbol)&&t>=4.897;el.classList.toggle('selected',selected);el.setAttribute('aria-pressed',String(selected));el.style.opacity=t>=5.007&&!selected?'.35':'1';});
  // Reveal the actual source in reading order; clipping retains syntax colors.
  const lines=$$('.code-text');
  const total=lines.reduce((sum,el)=>sum+el.textContent.length,0);
  let remaining=Math.floor(total*Math.max(0,Math.min(1,(t-5.4835)/1.4865)));
  if(manualTab==='code')remaining=total;
  lines.forEach(el=>{
    const count=Math.max(0,Math.min(el.textContent.length,remaining));
    el.style.clipPath=`inset(0 ${el.textContent.length-count}ch 0 0)`;
    el.parentElement.style.opacity=count>0?'1':'0';
    el.classList.toggle('typing',count>0&&count<el.textContent.length);
    el.style.setProperty('--typed',`${count}ch`);
    remaining-=el.textContent.length;
  });
  if(!manualRun){
    const tab=manualTab||(t>=7.64?'backtest':'code');showTab(tab);
    const done=t>=8.04 || manualTab==='backtest';
    $('#running').hidden=done||tab==='code';$('#results').hidden=!done;$('#run').disabled=false;$('#run').textContent='Run';$('#rerun').disabled=false;
    $('#running progress').value=Math.max(0,(t-7.64)/.4)*100;
    $('.loading-ring').style.transform=`rotate(${t*600}deg)`;
    $('#assistant-result').style.display=done?'block':'none';
    $('.assistant-intro').style.display=done?'none':'';$('.rule-list').style.display=done?'none':'';$('#review-code').style.display=done?'none':'';
    const reveal=Math.min(1,Math.max(0,(t-8.04)/.43));
    $('#equity-line').style.strokeDasharray=`${curveLength}`;$('#equity-line').style.strokeDashoffset=manualTab==='backtest'?'0':`${curveLength*(1-reveal)}`;
  }
  $('#scrub').value=t;$('#time').textContent=`${t.toFixed(2)} / 8.70s`;$('#play').textContent=tl.paused()?'Play':'Pause';
  const chapters=$$('#chapters button');const active=chapters.findLast(b=>t>=+b.dataset.time-.3);chapters.forEach(b=>b.classList.toggle('active',b===active));
}
tl.eventCallback('onUpdate',()=>sync(tl.time()));
tl.eventCallback('onComplete',()=>{$('#play').textContent='Replay';$('#flow').pause();});
function fit(){const width=Math.min(innerWidth-36,1600,(innerHeight-244)*16/9);$('#viewport').style.width=`${Math.max(300,width)}px`;$('#viewport').style.height=`${Math.max(300,width)*9/16}px`;$('#stage').style.transform=`scale(${Math.max(300,width)/1920})`;}
addEventListener('resize',fit);fit();
function resetManual(){manualTab=null;manualRun=false;runTimeline.pause(0);$('#sheet').hidden=true;}
function seek(time){resetManual();tl.pause(Math.max(0,Math.min(DURATION,time)));sync(tl.time());$('#flow').pause();if(Number.isFinite($('#flow').duration))$('#flow').currentTime=tl.time()%$('#flow').duration;}
window.seekScene=seek;
function play(){if(tl.time()>=DURATION-.01)seek(0);manualTab=null;tl.timeScale(+$('#speed').value);tl.play();$('#flow').playbackRate=+$('#speed').value;$('#flow').play().catch(()=>{});$('#play').textContent='Pause';}
$('#play').onclick=()=>{if(tl.paused())play();else{tl.pause();$('#flow').pause();sync(tl.time());}};
$('#restart').onclick=()=>{seek(0);play();};
$('#speed').onchange=()=>{tl.timeScale(+$('#speed').value);$('#flow').playbackRate=+$('#speed').value;};
$('#scrub').oninput=e=>{scrubMode=true;seek(+e.target.value);};$('#scrub').onchange=()=>{scrubMode=false;};
$$('#chapters button').forEach(b=>b.onclick=()=>seek(+b.dataset.time));
$('#idea-form').onsubmit=e=>{e.preventDefault();const text=$('#idea').value.trim();if(!text){$('#idea').focus();return;}ideaText=text;$('.user-message').textContent=text;window.setAgentQuery?.(text);seek(2.407);play();};
$('#idea').onfocus=()=>{tl.pause();$('#flow').pause();$('#idea').value=ideaText;};
$('#idea').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('#idea-form').requestSubmit();}};
function run(){if(manualRun)return;tl.pause();$('#flow').pause();$('#sheet').hidden=true;manualRun=true;manualTab='backtest';runClock.progress=0;renderRun(0);runTimeline.restart();sync(tl.time());}
$('#run').onclick=run;$('#rerun').onclick=run;
function manualView(tab){if(manualRun)return;tl.pause();manualTab=tab;sync(tl.time());}
$('#code-tab').onclick=()=>manualView('code');$('#backtest-tab').onclick=()=>manualView('backtest');$('#review-code').onclick=()=>manualView('code');
function sheet(title,html){tl.pause();$('#flow').pause();$('#sheet-title').textContent=title;$('#sheet-content').innerHTML=html;$('#sheet').hidden=false;$('#sheet-close').focus();}
$('#sheet-close').onclick=()=>{$('#sheet').hidden=true;$('#rules-toggle').focus();};
$('#sheet').onclick=e=>{if(e.target===$('#sheet'))$('#sheet-close').click();};
addEventListener('keydown',e=>{if(e.key==='Escape')$('#sheet-close').click();});
$('#rules-toggle').onclick=()=>sheet('Strategy rules',`<p>Universe: ${[...selectedAssets].join(', ')}.</p><p>Enter long when volume trend is positive. Rank eligible assets by inverted 30-day return volatility.</p><p>Rebalance daily. Allocate up to 25% per position, with a stop at 2 × 12-day ATR.</p>`);
$('#paper-tab').onclick=()=>sheet('Paper trading','<p>Paper trading is available after a strategy has been tested. This local preview does not connect to a trading account.</p>');
$('#trades-toggle').onclick=()=>sheet('Backtest trades','<p>The reference contains 46 trades (20 wins, 26 losses). Individual trade records were not supplied.</p><p>The displayed curve and metrics are illustrative reference data.</p>');
$('#settings-toggle').onclick=()=>sheet('Backtest settings','<label>Initial balance <input value="$10,000" readonly aria-label="Initial balance"></label><label>Position limit <input value="25%" readonly aria-label="Position limit"></label><label>Direction <input value="Long only" readonly aria-label="Direction"></label><p>Fixed preview settings.</p>');
$('#symbol-select').onclick=()=>sheet('Strategy universe',`<p>${[...selectedAssets].join(' · ')}</p><p>Four semiconductor stocks selected for the strategy. The metrics in this preview reproduce the supplied UI reference.</p>`);
$('#interval-select').onclick=()=>sheet('Evaluation interval','<p>1 day. The strategy evaluates entry, ranking and risk rules at the close of each daily bar.</p>');
$('#period-toggle').onclick=()=>sheet('Backtest period','<p>November 20, 2025 → August 22, 2026.</p><p>This is the date range in the supplied reference.</p>');
$('#followup-form').onsubmit=e=>{e.preventDefault();const text=$('#followup').value.trim();if(!text)return;sheet('Strategy change',`<p>${escapeHTML(text)}</p><p>This preview demonstrates the supplied semiconductor strategy. Live AI generation is not connected.</p>`);};
$('#download').onclick=()=>{const csv='point,equity\n'+equity.map((v,i)=>`${i},${v}`).join('\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));const a=document.createElement('a');a.href=url;a.download='illustrative-equity.csv';a.click();URL.revokeObjectURL(url);};
document.fonts.ready.then(()=>{tickerWidth=tickerGroup.offsetWidth;seek(+(new URLSearchParams(location.search).get('t')||.4));window.sceneReady=true;});
