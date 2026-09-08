/* S16/S17 v2: local document windows and editable browser forms. */
gsap.registerPlugin(CustomEase);
CustomEase.create('minaraEnter','.16,1,.3,1');
CustomEase.create('minaraCamera','.87,0,.13,1');
CustomEase.create('textSwapEnter','.2,.6,.35,1');
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const DURATION=24.1,CUES={titleEnd:55/30,click:2.2,ppt:2.32,excel:3.82,charts:5.27,exit:6.77,browser:7.37,scan:8.47,single:9.62,grid:13.37,many:14.67,summary:19.1,scroll:20.6};
const clamp=v=>Math.max(0,Math.min(1,v));
const ICONS={bot:'M12 3v3m-2-3h4M5 8h14v12H5Z M2 12v4m20-4v4M9 12v2m6-2v2m-6 3h6',search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',bell:'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',home:'m3 10 9-8 9 8v11h-6v-8H9v8H3Z',chart:'M4 3v18h17M8 16v-6m5 6V5m5 11v-4',chat:'M21 15a3 3 0 0 1-3 3H8l-5 4V5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3Z',code:'m8 5-6 7 6 7m8-14 6 7-6 7m-3-16-2 18',candles:'M5 3v4m0 9v5m-2-14h4v9H3ZM12 3v9m0 5v4m-2-9h4v5h-4Zm9-9v3m0 8v7m-2-15h4v8h-4Z',wallet:'M20 8H4V4h15v4M3 8v12h18V8Zm12 5h6v3h-6Z',grid:'M3 3h7v7H3Zm11 0h7v7h-7ZM3 14h7v7H3Zm11 0h7v7h-7Z',display:'M3 3h18v14H3Zm5 18h8m-4-4v4m-5-9 3-3 3 3 4-5',arrow:'M12 20V4m-7 7 7-7 7 7',plus:'M12 4v16M4 12h16',chevron:'m7 10 5 5 5-5',mic:'M9 4a3 3 0 0 1 6 0v8a3 3 0 0 1-6 0ZM5 10v2a7 7 0 0 0 14 0v-2m-7 9v3m-4 0h8',file:'M14 2H4v20h16V8Zm0 0v6h6M8 12h8m-8 4h8',link:'m10 13 4-4M8 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 1 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0',clipboard:'M9 3H4v19h16V3h-5M9 2h6v4H9Z',slide:'M3 4h18v16H3Zm3 4h6m-6 4h12m-6 4h6',align:'M3 4h18M3 9h13M3 14h18M3 19h13'};
$$('[data-icon]').forEach(el=>el.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[el.dataset.icon]||ICONS.file}"/></svg>`);

const slideHTML=[
  `<h2>FY2026 earnings</h2><p class="slide-subtitle">Fiscal year ended January 25, 2026</p><div class="slide-metrics"><div><small>Revenue</small><strong>$215.9B</strong><em>+65% year over year</em></div><div><small>Data Center revenue</small><strong>$193.7B</strong><em>+68% year over year</em></div><div><small>GAAP net income</small><strong>$120.1B</strong><em>+65% year over year</em></div></div><div class="slide-bottom-grid"><div><h3>Revenue, $ billions</h3><div class="revenue-row"><span>FY2025</span><i style="width:60.5%"></i><b>130.5</b></div><div class="revenue-row"><span>FY2026</span><i></i><b>215.9</b></div></div><div><h3>AI infrastructure drives growth.</h3><p>Data Center contributed 90% of annual revenue as Blackwell demand expanded.</p></div></div>`,
  `<h2>Growth drivers</h2><p class="slide-subtitle">The financial story behind the results</p><div class="insight-list"><div><small>01</small><strong>Data Center sets the pace.</strong><p>Revenue reached $193.7B, up 68% from FY2025.</p></div><div><small>02</small><strong>Blackwell demand scales.</strong><p>Accelerated computing and AI infrastructure investment support growth.</p></div><div><small>03</small><strong>Strong finish to the year.</strong><p>Fourth-quarter revenue reached $68.1B, up 73% year over year.</p></div></div>`,
  `<h2>What to watch</h2><p class="slide-subtitle">Key risks and the next reporting period</p><div class="insight-list"><div><small>01</small><strong>Export restrictions</strong><p>China market access remains a constraint on Data Center sales.</p></div><div><small>02</small><strong>Margins and product transitions</strong><p>Track system ramps, product mix and the cost of scaling supply.</p></div><div><small>03</small><strong>Demand concentration</strong><p>Monitor hyperscaler spending and the durability of AI investment.</p></div></div>`
];
let selectedSlide=0;
function selectSlide(index){selectedSlide=index;$('#slide-content').innerHTML=slideHTML[index];$$('[data-slide]').forEach(e=>e.classList.toggle('active',+e.dataset.slide===index));$('#slide-page').textContent=`0${index+1} / 03`;$('#slide-status').textContent=`Slide ${index+1} of 3`;}
selectSlide(0);


const tickerGroup=$('.ticker-group');
for(let i=0;i<2;i++){const group=tickerGroup.cloneNode(true);group.setAttribute('aria-hidden','true');$('.ticker-track').append(group);}
let tickerWidth=1;
const sheetRows=[['NVIDIA — Financial results','','','',''],['Fiscal year ended January 25, 2026','','','',''],['Metric','Period','USD millions','YoY growth','Source'],['Revenue','FY2026','215938','65%','NVIDIA IR'],['Data Center revenue','FY2026','193737','68%','NVIDIA IR'],['GAAP net income','FY2026','120067','65%','NVIDIA IR'],['Revenue','Q4 FY2026','68100','73%','NVIDIA IR'],['','','','',''],['All amounts in USD millions.','','','',''],['Source: NVIDIA FY2026 financial results','','','','']];
$('#financial-table').innerHTML='<thead><tr><th></th>'+['A','B','C','D','E','F'].map(x=>`<th>${x}</th>`).join('')+'</tr></thead><tbody>'+Array.from({length:14},(_,i)=>`<tr class="${i===0?'sheet-title':i===2?'sheet-head':''}"><th>${i+1}</th>${Array.from({length:6},(_,j)=>`<td ${j===2&&i>=3&&i<=6?'contenteditable="true" inputmode="decimal" aria-label="'+sheetRows[i][0]+' '+sheetRows[i][1]+'"':''} class="${i===3&&j===2?'selected-cell':''}" data-cell="${String.fromCharCode(65+j)}${i+1}">${sheetRows[i]?.[j]||''}</td>`).join('')}</tr>`).join('')+'</tbody>';
$('#financial-table').addEventListener('focusin',e=>{if(!e.target.dataset.cell)return;$$('.selected-cell').forEach(x=>x.classList.remove('selected-cell'));e.target.classList.add('selected-cell');$('#cell-name').textContent=e.target.dataset.cell;$('#cell-formula').textContent=e.target.textContent;});
$('#financial-table').addEventListener('input',e=>$('#cell-formula').textContent=e.target.textContent);
const people=[['Alex Chen','alex@example.com','Northstar','Research lead'],['Jordan Lee','jordan@example.com','Meridian','Analyst'],['Taylor Morgan','taylor@example.com','Atlas','Product lead'],['Sam Rivera','sam@example.com','Fieldwork','Founder'],['Casey Park','casey@example.com','Horizon','Data scientist'],['Riley Kim','riley@example.com','Common Ground','Engineer']];
const fields=['Full name','Work email','Company','Role'];
const arrow='<path d="M3 2v27l7-7 5 11 5-2-5-11h10Z"/>';
$('#browser-grid').innerHTML=people.map((_,i)=>`<section class="browser-window" data-browser="${i}" aria-label="Browser registration ${i+1}"><div class="chrome-tabs"><span class="traffic"><i></i><i></i><i></i></span><div class="chrome-tab"><i class="tab-dot"></i>Briefing registration<span>×</span></div><span class="chrome-plus">＋</span></div><div class="chrome-toolbar"><button type="button" data-reset="${i}" aria-label="Reset registration">‹</button><span>›</span><button type="button" data-reset="${i}" aria-label="Reload registration">↻</button><div class="omnibox"><span>⊜</span><b>briefing.example</b><span>/ register</span><span style="margin-left:auto">☆</span></div><span class="profile-dot">A</span><span>⋮</span></div><div class="browser-body"><aside class="briefing-sidebar"><span class="briefing-brand">THE BRIEFING</span><h2>Ideas worth<br>your time.</h2><p>Research, perspectives and a conversation about what comes next.</p><div class="briefing-details">AI infrastructure &amp; the next wave<small>Online briefing · Registration</small></div></aside><form class="registration" data-form="${i}"><span class="form-eyebrow">RESERVE YOUR PLACE</span><h3>Join the conversation.</h3><p>Tell us a little about yourself.</p><div class="fields">${fields.map((label,j)=>`<label class="form-field">${label}<input aria-label="${label}" name="${['name','email','company','role'][j]}" type="${j===1?'email':'text'}" required autocomplete="off" spellcheck="false"></label>`).join('')}</div><div class="form-actions"><span>All fields required</span><button class="submit-registration" type="submit"><span>Register</span><span>↗</span></button></div><div class="form-status" role="status" aria-live="polite"></div></form></div><div class="scan-light"></div><div class="scan-line"></div><svg class="form-cursor" viewBox="0 0 28 36">${arrow}</svg><div class="form-click"></div></section>`).join('');
const browsers=$$('.browser-window'),forms=$$('.registration');
$('#registration-results tbody').innerHTML=people.map((_,i)=>fields.map((field,j)=>`<tr>${j===0?`<th rowspan="4" scope="rowgroup"><small>0${i+1}</small><span data-result-name="${i}"></span><em>Briefing registration</em></th>`:''}<td>${field}</td><td data-result-value="${i}-${j}"></td><td><span class="result-saved">✓ Saved</span></td></tr>`).join('')).join('');
const resultValues=$$('[data-result-value]'),resultNames=$$('[data-result-name]');
function syncResults(){forms.forEach((form,i)=>{const inputs=[...form.querySelectorAll('input')];resultNames[i].textContent=inputs[0].value;inputs.forEach((input,j)=>resultValues[i*4+j].textContent=input.value);});}
$('#results-scroll').addEventListener('wheel',()=>{if(driver)pause();},{passive:true});
function submitForm(form){form.querySelector('.submit-registration').classList.add('saved-form');form.querySelector('.submit-registration>span').textContent='Registered';form.querySelector('.form-status').textContent='✓  Your registration is saved.';}
function resetForm(form){form.reset();form.querySelector('.submit-registration').classList.remove('saved-form');form.querySelector('.submit-registration>span').textContent='Register';form.querySelector('.form-status').textContent='';}
forms.forEach(form=>{form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;interactive=true;pause();submitForm(form);});form.addEventListener('pointerdown',()=>{if(!interactive){interactive=true;pause();}});form.addEventListener('keydown',()=>{if(!interactive){interactive=true;pause();}});});
$$('[data-reset]').forEach(b=>b.onclick=()=>{interactive=true;pause();resetForm(forms[+b.dataset.reset]);});
const tl=gsap.timeline({paused:true,defaults:{ease:'minaraEnter'}});
gsap.set('#client,#ppt,#excel,#charts,#browser-scene,#computer-heading,#cursor,#click-ring,.form-cursor,.form-click,#results-window',{autoAlpha:0});
gsap.set('#client',{y:48,scale:.95});
tl.to('#client',{autoAlpha:1,y:0,scale:1,duration:.26},CUES.titleEnd);
tl.to('#artifact',{scale:.984,duration:.1,ease:'power2.out'},CUES.click).to('#artifact',{scale:1,duration:.18},CUES.click+.1);
// The document expands from the clicked card, reusing the reviewed surface morph.
function cardBounds(){const r=$('#artifact').getBoundingClientRect(),s=$('#stage').getBoundingClientRect(),scale=1920/s.width;return{x:(r.left-s.left)*scale,y:(r.top-s.top)*scale,sx:r.width*scale/1700,sy:r.height*scale/945};}
tl.set('#ppt',{autoAlpha:1,x:()=>cardBounds().x,y:()=>cardBounds().y,scaleX:()=>cardBounds().sx,scaleY:()=>cardBounds().sy},CUES.ppt);
tl.to('#ppt',{x:212,y:98,scaleX:.88,scaleY:.88,duration:1,ease:'minaraCamera'},CUES.ppt);
tl.to('#client',{autoAlpha:0,scale:.97,duration:.65},CUES.ppt+.15);
gsap.set('.ppt-titlebar,.ppt-tabs,.ppt-ribbon,.ppt-workspace,.ppt-status',{autoAlpha:0});
tl.to('.ppt-titlebar,.ppt-tabs,.ppt-ribbon,.ppt-workspace,.ppt-status',{autoAlpha:1,duration:.38,stagger:.055},CUES.ppt+.34);
tl.to('#ppt',{x:400,y:112,scaleX:.8,scaleY:.8,duration:.9,ease:'minaraCamera'},CUES.excel);
tl.fromTo('#excel',{autoAlpha:0,x:382,y:370,scale:.62},{autoAlpha:1,x:280,y:204,scale:.8,duration:.95,ease:'minaraEnter',immediateRender:false},CUES.excel);
tl.fromTo('#charts',{autoAlpha:0,x:260,y:474,scale:.6},{autoAlpha:1,x:160,y:296,scale:.8,duration:1,ease:'minaraEnter',immediateRender:false},CUES.charts);
tl.fromTo('.revenue-bar',{scaleY:.04},{scaleY:1,duration:.7,stagger:.13,ease:'minaraEnter'},CUES.charts+.15);
tl.fromTo('.donut-value',{strokeDasharray:'0 571.77'},{strokeDasharray:'514.59 571.77',duration:.8,ease:'minaraEnter'},CUES.charts+.18);
tl.to('#documents',{x:-2200,duration:1.2,ease:'minaraCamera'},CUES.exit);
tl.set('#browser-scene',{autoAlpha:1},CUES.browser);
gsap.set(browsers,{x:240,y:140,scale:1,autoAlpha:0});
tl.fromTo(browsers[0],{x:2050,y:140,scale:.94,autoAlpha:1},{x:240,y:140,scale:1,autoAlpha:1,duration:1,ease:'minaraCamera',immediateRender:false},CUES.browser);
tl.fromTo('.scan-light',{x:0},{x:1740,duration:1.05,ease:'power2.inOut',immediateRender:false},CUES.scan);
tl.to('.scan-light',{autoAlpha:1,duration:.1},CUES.scan);
tl.to('.scan-light',{autoAlpha:0,duration:.16},CUES.scan+.93);
tl.to('.scan-line',{autoAlpha:.7,duration:.12},CUES.scan+.86);
tl.to('.scan-line',{autoAlpha:0,duration:.28},CUES.scan+.98);
const gridPositions=browsers.map((_,i)=>({x:99+(i%3)*587,y:232+Math.floor(i/3)*355}));
tl.to(browsers[0],{...gridPositions[0],scale:.38,duration:1.05,ease:'minaraCamera'},CUES.grid);
browsers.slice(1).forEach((b,i)=>{const p=gridPositions[i+1];tl.fromTo(b,{x:p.x+80,y:p.y+100,scale:.3,autoAlpha:0},{...p,scale:.38,autoAlpha:1,duration:.85,ease:'minaraEnter',immediateRender:false},CUES.grid+.13+i*.075);});
tl.set('#computer-heading',{autoAlpha:1},CUES.grid);
tl.to('#computer-heading',{autoAlpha:0,y:-24,duration:.45},CUES.summary);
browsers.forEach((browser,i)=>{
  tl.to(browser,{x:695+(i-2.5)*12,y:388+(i-2.5)*9,scale:.36,duration:.85,ease:'minaraCamera'},CUES.summary+i*.035);
  tl.to(browser,{autoAlpha:0,duration:.25},CUES.summary+.78+i*.035);
});
tl.fromTo('#results-window',{scale:.36,y:100,autoAlpha:0},{scale:1,y:0,autoAlpha:1,duration:.95,ease:'minaraCamera',immediateRender:false},CUES.summary+.55);
tl.fromTo('#results-scroll',{scrollTop:0},{scrollTop:()=>$('#results-scroll').scrollHeight-$('#results-scroll').clientHeight,duration:2.8,ease:'power2.inOut',immediateRender:false},CUES.scroll);
tl.to({}, {duration:.01},DURATION-.01);

let interactive=false,driver=null,speed=1,lastTitleFrame=-1,lastComputerFrame=-1;
const playhead={time:0},flow=$('#flow'),ease=gsap.parseEase('minaraCamera');
function localPoint(el,root){const r=el.getBoundingClientRect(),b=root.getBoundingClientRect(),s=root.offsetWidth/b.width;return{x:(r.left+r.width*.62-b.left)*s,y:(r.top+r.height*.58-b.top)*s};}
function glide(a,b,u){const p=ease(clamp(u));return{x:a.x+(b.x-a.x)*p,y:a.y+(b.y-a.y)*p-Math.sin(p*Math.PI)*20};}
function formAt(index,t){
  const browser=browsers[index],form=forms[index],cursor=browser.querySelector('.form-cursor'),ring=browser.querySelector('.form-click');
  if(interactive){gsap.set([cursor,ring],{autoAlpha:0});form.querySelectorAll('.filling').forEach(x=>x.classList.remove('filling'));return;}
  const start=t<CUES.grid?CUES.single:CUES.many+index*.12;
  const active=(t<CUES.grid?index===0:t>=CUES.many)&&t>=start;
  const elapsed=t-start,step=.73,move=.27,inputs=[...form.querySelectorAll('input')],targets=inputs.map(input=>localPoint(input,browser));
  const submit=localPoint(form.querySelector('button'),browser);
  inputs.forEach((input,j)=>{const value=people[index][j],count=[...value].filter((_,k)=>elapsed*30>=window.snapAnswer.wordBirth(k,(j*step+move)*30,value.length/(.44*30))).length;input.value=active?value.slice(0,count):'';input.closest('label').classList.toggle('filling',active&&elapsed>=j*step&&elapsed<(j+1)*step);});
  const clicked=active&&elapsed>=step*4+.33;
  form.querySelector('.submit-registration').classList.toggle('saved-form',clicked);
  form.querySelector('.submit-registration>span').textContent=clicked?'Registered':'Register';
  form.querySelector('.form-status').textContent=clicked?'✓  Your registration is saved.':'';
  const leg=Math.min(4,Math.max(0,Math.floor(elapsed/step))),target=leg===4?submit:targets[leg];
  const previous=leg===0?{x:1330,y:690}:targets[leg-1];
  const position=glide(previous,target,(elapsed-leg*step)/move);
  const cursorScale=t<CUES.grid?1:2.25;
  gsap.set(cursor,{...position,autoAlpha:active&&elapsed<3.7?1:0,scale:cursorScale*(clicked&&elapsed<3.38?.87:1),transformOrigin:'0 0'});
  const pulse=(elapsed-leg*step-move)/.25;
  gsap.set(ring,{x:target.x-21,y:target.y-21,autoAlpha:active&&pulse>=0&&pulse<1?.7*(1-pulse):0,scale:.35+clamp(pulse)*.8});
}
function sync(t){
  if(!window.snapAnswer)return;
  tl.pause(t);
  const titleFrame=Math.min(54,Math.round(t*30));if(lastTitleFrame!==titleFrame){BeyondTitle.seek(titleFrame);lastTitleFrame=titleFrame;}
  gsap.set('#headline-root',{autoAlpha:t<CUES.titleEnd?1:0});
  const computerFrame=Math.max(0,Math.round((t-CUES.grid)*30));if(lastComputerFrame!==computerFrame){ComputerTitle.seek(computerFrame);lastComputerFrame=computerFrame;}
  // The installed AnswerStream curve settles the client into its normal frame.
  if(t>=CUES.titleEnd&&t<CUES.ppt)gsap.set('#client',{scale:window.snapAnswer.shotBScale(t*30,CUES.titleEnd*30,.26*30,.95,0,1)});
  for(const [selector,start] of [['#slide-content h2',CUES.ppt+.4],['.chart-heading h2',CUES.charts+.13]]){
    const p=gsap.parseEase('textSwapEnter')(clamp((t-start)/.6)),motion=snapText.motion;
    gsap.set(selector,{opacity:p,scale:motion.enterScale+(1-motion.enterScale)*p,filter:`blur(${motion.enterBlur*(1-p)}px)`,transformOrigin:'0 50%'});
  }
  gsap.set('.ticker-track',{x:-(Math.max(0,t-CUES.titleEnd)*90)%tickerWidth});
  const showCursor=t>=CUES.titleEnd&&t<CUES.ppt+.28&&!interactive;
  if(showCursor){const target=localPoint($('#artifact'),$('#stage')),position=glide({x:1530,y:835},target,(t-CUES.titleEnd)/(CUES.click-CUES.titleEnd));gsap.set('#cursor',{...position,autoAlpha:1,scale:t>=CUES.click&&t<CUES.click+.13?.85:1});const p=clamp((t-CUES.click)/.3);gsap.set('#click-ring',{x:target.x-26,y:target.y-26,scale:.4+p,autoAlpha:t>=CUES.click?1-p:0});}else gsap.set('#cursor,#click-ring',{autoAlpha:0});
  browsers.forEach((_,i)=>formAt(i,t));
  if(t>=CUES.summary)syncResults();
  $('#scrub').value=t;$('#time').textContent=`${t.toFixed(2)} / ${DURATION.toFixed(2)}s`;$('#play').textContent=driver?'Pause':'Play';
  if(Number.isFinite(flow.duration)&&!flow.seeking&&Math.abs(flow.currentTime-t%flow.duration)>.045)flow.currentTime=t%flow.duration;
}
function pause(){driver?.kill();driver=null;sync(playhead.time);}
function seek(t){driver?.kill();driver=null;playhead.time=Math.max(0,Math.min(DURATION,Number(t)||0));sync(playhead.time);}
function play(until=DURATION){driver?.kill();if(playhead.time>=DURATION-.001)playhead.time=0;driver=gsap.to(playhead,{time:until,duration:Math.max(.01,until-playhead.time)/speed,ease:'none',onUpdate:()=>sync(playhead.time),onComplete:()=>{driver=null;sync(playhead.time);}});}
$('#artifact').onclick=()=>{interactive=false;selectSlide(0);seek(CUES.click);play(CUES.excel-.2);};
$$('[data-open]').forEach(b=>b.onclick=()=>{interactive=false;seek(b.dataset.open==='excel'?CUES.excel:CUES.charts);play(b.dataset.open==='excel'?CUES.charts-.2:CUES.exit-.2);});
$$('[data-close]').forEach(b=>b.onclick=()=>{interactive=false;seek(b.dataset.close==='charts'?CUES.charts-.2:CUES.excel-.2);});
$('#close-ppt').onclick=()=>{interactive=false;seek(2.05);};
$$('[data-slide]').forEach(b=>b.onclick=()=>{pause();selectSlide(+b.dataset.slide);});
function downloadText(name,content,type){const url=URL.createObjectURL(new Blob([content],{type})),link=document.createElement('a');link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('#download-results').onclick=()=>{syncResults();const rows=[fields,...forms.map(form=>[...form.querySelectorAll('input')].map(input=>input.value))];downloadText('Briefing-registration-results.csv',rows.map(row=>row.map(value=>'"'+value.replaceAll('"','""')+'"').join(',')).join('\n'),'text/csv');};
$('#download-sheet').onclick=()=>downloadText('NVIDIA-FY2026-Financial-Model.csv',[...$('#financial-table tbody').rows].map(r=>[...r.cells].slice(1).map(c=>'"'+c.textContent.replaceAll('"','""')+'"').join(',')).join('\n'),'text/csv');
$('#download-chart').onclick=()=>{const svg=$('#revenue-chart').cloneNode(true);svg.setAttribute('xmlns','http://www.w3.org/2000/svg');svg.prepend(Object.assign(document.createElementNS('http://www.w3.org/2000/svg','style'),{textContent:'.chart-grid{stroke:#e9eaed;fill:none}.chart-axis,.chart-year{fill:#70737b;font:18px sans-serif}.revenue-bar{fill:#dce0e5}.current{fill:#15171a}.bar-value{font:600 27px sans-serif;text-anchor:middle}.chart-year{text-anchor:middle}'}));downloadText('NVIDIA-FY2026-Revenue.svg',svg.outerHTML,'image/svg+xml');};
$('#play').onclick=()=>{if(driver)pause();else{interactive=false;play();}};
$('#replay').onclick=()=>{interactive=false;selectSlide(0);seek(0);play();};
$('#scrub').oninput=e=>{interactive=false;selectSlide(0);seek(e.target.value);};
$('#speed').onchange=e=>{const playing=!!driver;pause();speed=+e.target.value;if(playing)play();};
$$('[data-time]').forEach(b=>b.onclick=()=>{interactive=false;selectSlide(0);seek(+b.dataset.time);});
$('#interactive').onclick=()=>{interactive=true;seek(CUES.single-.1);forms.forEach(resetForm);$('#review-note').textContent='Local interaction: edit the form and click Register. No information is sent to a server.';};
function resize(){const r=$('#viewport').getBoundingClientRect();$('#stage').style.transform=`scale(${r.width/1920})`;}
addEventListener('resize',resize);resize();
window.scene={duration:DURATION,cues:CUES,seek,play,pause,tl,get state(){return{time:playhead.time,interactive,selectedSlide};}};
async function ready(){await document.fonts.ready;if(!window.BeyondTitle?.ready||!window.ComputerTitle?.ready){requestAnimationFrame(ready);return;}tickerWidth=tickerGroup.offsetWidth;sync(0);window.scene.ready=true;}
ready();flow.addEventListener('loadeddata',()=>sync(playhead.time));
