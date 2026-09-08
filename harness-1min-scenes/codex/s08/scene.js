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
const FILM_SPEED = .8;
window.sceneDuration = DURATION / FILM_SPEED;
const DEFAULT_PROMPT = 'Build a long-only semiconductor trend strategy.';
const selectedAssets = new Set(['NVDA','AMD','AVGO','MU']);

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
  if(window.sceneReady){wrapText($('#code-lines'));textGroups[0].els=$$('#workspace .swap-ink').filter(el=>!el.closest('#results,#assistant-result,#running'));}
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
['#workspace'].forEach(s=>wrapText($(s)));
const textGroups=[
  {els:$$('#workspace .swap-ink').filter(el=>!el.closest('#results,#assistant-result,#running')),at:4.05},
  {els:$$('#results .swap-ink,#assistant-result .swap-ink'),at:6.25},
  {els:[$('#idea')],at:2.017},
];
function revealTexts(t){
  textGroups.forEach(({els,at},group)=>{
    const progress=(group===1&&(manualRun||manualBacktestComplete))?1:Math.max(0,Math.min(1,(t-at)/.267));
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
gsap.set('#input-scene,#agent-scene,#workspace,#cursor',{autoAlpha:0});
gsap.set('#workspace',{scale:1.3,x:160,y:-65});
tl.to('#title',{x:-2200,filter:'blur(6px)',duration:.30,ease:'power3.in'},1.70)
  .set('#title',{autoAlpha:0},2)
  .fromTo('#input-scene',{autoAlpha:0,scale:.94,y:70},{autoAlpha:1,scale:1,y:0,duration:.28},2)
  .to('#send',{scale:.85,duration:.07},2.357).to('#send',{scale:1,duration:.12},2.427)
  .to('#input-scene',{autoAlpha:0,scale:.9,y:-50,duration:.22,ease:'power3.in'},2.427)
  .set('#agent-scene',{autoAlpha:1},2.467)
  .to('#agent-scene',{autoAlpha:0,scale:1.35,filter:'blur(8px)',duration:.22},3.94)
  .to('#workspace',{autoAlpha:1,duration:.24},4.03)
  .to('#workspace',{scale:1,x:0,y:0,duration:.52,ease:'minara'},5.30)
  .set('#cursor',{autoAlpha:1,x:1290,y:755},6.86)
  .to('#cursor',{x:1120,y:173,duration:.32,ease:'minara'},6.86)
  .to('#run',{scale:.93,duration:.07},7.20).to('#run',{scale:1,duration:.12},7.27)
  .fromTo('#cursor i',{autoAlpha:.6,scale:.5},{autoAlpha:0,scale:1.8,duration:.24},7.21)
  .to('#cursor',{autoAlpha:0,duration:.15},7.45)
  .to({}, {duration:.3},8.4);
window.__timelines={'s08-s09':tl};

let manualTab=null, manualRun=false, manualBacktestComplete=false, manualDeployed=false, ideaText=DEFAULT_PROMPT, scrubMode=false;
const runClock={progress:0};
const runTimeline=gsap.timeline({paused:true,onUpdate:()=>sync(tl.time()),onComplete:()=>{manualRun=false;manualBacktestComplete=true;manualTab='backtest';sync(tl.time());}})
 .to(runClock,{progress:1,duration:1.1 / FILM_SPEED,ease:'none'});
const clamp=p=>Math.max(0,Math.min(1,p));
function label(selector,text){const el=$(selector),ink=el.querySelector('.swap-ink')||el;if(ink.textContent!==text)ink.textContent=text;}
function showTab(tab){
  $('#code-view').hidden=tab!=='code';$('#backtest-view').hidden=tab!=='backtest';
  $('#code-tab').setAttribute('aria-selected',String(tab==='code'));
  $('#backtest-tab').setAttribute('aria-selected',String(tab==='backtest'));
}
function sync(t){
  gsap.set('.ticker-track',{x:-(Math.max(0,t-4.03)*90)%tickerWidth});
  window.titleFrame=Math.round(t*60);window.setTitleFrame?.(window.titleFrame);
  revealTexts(t);
  window.agentFrame=Math.round(Math.max(0,t-2.467)*60);window.setAgentFrame?.(window.agentFrame);
  if(document.activeElement!==$('#idea')) $('#idea').value=ideaText;
  // Reveal the actual source in reading order; clipping retains syntax colors.
  const lines=$$('.code-text');
  const total=lines.reduce((sum,el)=>sum+el.textContent.length,0);
  let remaining=Math.floor(total*Math.max(0,Math.min(1,(t-4.30)/1.32)));
  if(manualTab==='code')remaining=total;
  lines.forEach(el=>{
    const count=Math.max(0,Math.min(el.textContent.length,remaining));
    el.style.clipPath=`inset(0 ${el.textContent.length-count}ch 0 0)`;
    el.parentElement.style.opacity=count>0?'1':'0';
    el.classList.toggle('typing',count>0&&count<el.textContent.length);
    el.style.setProperty('--typed',`${count}ch`);
    remaining-=el.textContent.length;
  });
  const generated=t>=5.62;
  const ready=manualBacktestComplete||manualDeployed||(!manualRun&&t>=6.25);
  const backtestProgress=manualRun?runClock.progress:clamp((t-5.83)/.42);
  const tab=manualRun||manualDeployed?'backtest':manualTab||(t>=5.83?'backtest':'code');
  showTab(tab);
  $('#running').hidden=ready||tab==='code';$('#results').hidden=!ready;
  $('#running progress').value=backtestProgress*100;
  $('.loading-ring').style.transform=`rotate(${backtestProgress*720}deg)`;
  $('#assistant-result').style.display=ready?'block':'none';
  $('.assistant-intro').style.display=ready?'none':'';$('.rule-list').style.display=ready?'none':'';$('#review-code').style.display=ready?'none':'';
  label('.assistant-intro',generated?'Code generated. Running backtest…':'Writing your strategy…');
  label('#generation-status',generated?'✓ Strategy generated':'Generating strategy…');
  const reveal=manualBacktestComplete||manualDeployed?1:clamp((t-6.25)/.50);
  $('#equity-line').style.strokeDasharray=`${curveLength}`;$('#equity-line').style.strokeDashoffset=`${curveLength*(1-reveal)}`;
  const deployed=manualDeployed||(!manualRun&&!manualBacktestComplete&&t>=7.25);
  label('#run',deployed?'Running':ready?'Deploy':!generated?'Generating…':backtestProgress>0?'Backtesting…':'Run backtest');
  $('#run').disabled=deployed||(!ready&&(!generated||manualRun||t>=5.83));
  $('#run').dataset.action=deployed?'running':ready?'deploy':'backtest';
  $('#rerun').disabled=manualRun||!generated;
  label('.status-badge',deployed?'Deployed':'Draft');
  $('.status-badge').classList.toggle('deployed',deployed);
  $('#scrub').value=t / FILM_SPEED;$('#time').textContent=`${(t / FILM_SPEED).toFixed(2)} / ${window.sceneDuration.toFixed(2)}s`;$('#play').textContent=tl.paused()?'Play':'Pause';
  const chapters=$$('#chapters button');const active=chapters.findLast(b=>t>=+b.dataset.time-.3);chapters.forEach(b=>b.classList.toggle('active',b===active));
}
tl.eventCallback('onUpdate',()=>sync(tl.time()));
tl.eventCallback('onComplete',()=>{$('#play').textContent='Replay';$('#flow').pause();});
function fit(){const width=Math.min(innerWidth-36,1600,(innerHeight-244)*16/9);$('#viewport').style.width=`${Math.max(300,width)}px`;$('#viewport').style.height=`${Math.max(300,width)*9/16}px`;$('#stage').style.transform=`scale(${Math.max(300,width)/1920})`;}
addEventListener('resize',fit);fit();
function resetManual(){runTimeline.pause();manualTab=null;manualRun=false;manualBacktestComplete=false;manualDeployed=false;runClock.progress=0;$('#sheet').hidden=true;}
function seek(time){resetManual();tl.pause(Math.max(0,Math.min(DURATION,time)));sync(tl.time());$('#flow').pause();if(Number.isFinite($('#flow').duration))$('#flow').currentTime=tl.time()%$('#flow').duration;}
window.seekScene=time=>seek(time * FILM_SPEED);
$('#scrub').max=window.sceneDuration;
function play(){if(tl.time()>=DURATION-.01)seek(0);manualTab=null;tl.timeScale(FILM_SPEED * +$('#speed').value);tl.play();$('#flow').playbackRate=FILM_SPEED * +$('#speed').value;$('#flow').play().catch(()=>{});$('#play').textContent='Pause';}
$('#play').onclick=()=>{if(tl.paused())play();else{tl.pause();$('#flow').pause();sync(tl.time());}};
$('#restart').onclick=()=>{seek(0);play();};
$('#speed').onchange=()=>{tl.timeScale(FILM_SPEED * +$('#speed').value);$('#flow').playbackRate=FILM_SPEED * +$('#speed').value;};
$('#scrub').oninput=e=>{scrubMode=true;seek(+e.target.value * FILM_SPEED);};$('#scrub').onchange=()=>{scrubMode=false;};
$$('#chapters button').forEach(b=>b.onclick=()=>seek(+b.dataset.time));
$('#idea-form').onsubmit=e=>{e.preventDefault();const text=$('#idea').value.trim();if(!text){$('#idea').focus();return;}ideaText=text;$('.user-message').textContent=text;window.setAgentQuery?.(text);seek(2.407);play();};
$('#idea').onfocus=()=>{tl.pause();$('#flow').pause();$('#idea').value=ideaText;};
$('#idea').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('#idea-form').requestSubmit();}};
function run(){if(manualRun)return;tl.pause();$('#flow').pause();$('#sheet').hidden=true;manualRun=true;manualBacktestComplete=false;manualDeployed=false;manualTab='backtest';runClock.progress=0;sync(tl.time());runTimeline.restart();}
function deploy(){if($('#results').hidden)return;tl.pause();$('#flow').pause();manualDeployed=true;manualTab='backtest';sync(tl.time());}
$('#run').onclick=()=>{const action=$('#run').dataset.action;if(action==='deploy')deploy();else if(action==='backtest')run();};
$('#rerun').onclick=run;
window.toggleSceneAsset=symbol=>{tl.pause();$('#flow').pause();if(selectedAssets.has(symbol)){if(selectedAssets.size===1)return;selectedAssets.delete(symbol);}else selectedAssets.add(symbol);window.setAgentAssets?.([...selectedAssets]);updateCode();sync(tl.time());};
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
