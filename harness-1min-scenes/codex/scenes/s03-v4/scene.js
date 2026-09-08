/* One seekable clock. Existing S06 research / S08 strategy UI; illustrative data only. */
gsap.registerPlugin(CustomEase);
const enter=CustomEase.create('s03-enter','.16,1,.3,1');
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const DURATION=10.6, RESEARCH=3.67, STRATEGY=7.35, EXIT=9.15, EXIT_DURATION=1.4;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const paths={home:'m3 10 9-7 9 7v11h-6v-8H9v8H3Z',chart:'M4 3v18h17M8 16V9m5 7V5m5 11v-5',chat:'M3 4h18v13H8l-5 4Z',code:'m8 6-6 6 6 6m8-12 6 6-6 6m-3-16-2 20',candle:'M5 3v3m0 9v6m7-19v10m0 7v3m7-19v5m0 8v5M3 6h4v9H3Zm7 6h4v7h-4Zm7-4h4v8h-4Z',wallet:'M21 8V4H5a3 3 0 0 0 0 6h16v10H5a3 3 0 0 1-3-3V7m19 6h-5v4h5',grid:'M3 3h7v7H3Zm11 0h7v7h-7ZM3 14h7v7H3Zm11 0h7v7h-7Z',panel:'M3 3h18v18H3Zm7 0v18',left:'m14 5-7 7 7 7M7 12h14',right:'m10 5 7 7-7 7M3 12h14',up:'m5 12 7-7 7 7m-7-7v16',search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',bell:'M18 8a6 6 0 0 0-12 0c0 8-3 8-3 10h18c0-2-3-2-3-10M10 22h4',rocket:'M12 15 9 12c2-5 6-8 12-9-1 6-4 10-9 12Zm-3-3-5 1 3-6 5-1m0 9-1 5 6-3 1-5M7 17l-4 4m2-6-3 3m7 1-3 3',sliders:'M3 6h8m4 0h6M3 18h4m4 0h10M11 3h4v6h-4ZM7 15h4v6H7Z',mic:'M9 4a3 3 0 0 1 6 0v9a3 3 0 0 1-6 0ZM5 11v2a7 7 0 0 0 14 0v-2m-7 9v3m-4 0h8',bot:'M6 7h12a3 3 0 0 1 3 3v9H3v-9a3 3 0 0 1 3-3Zm6 0V3m-2 0h4M7 11v4m10-4v4M8 19v2m8-2v2',database:'M21 5c0 2-4 3-9 3S3 7 3 5s4-3 9-3 9 1 9 3ZM3 5v14c0 2 4 3 9 3s9-1 9-3V5M3 12c0 2 4 3 9 3s9-1 9-3',screen:'M3 3h18v14H3Zm5 19 4-5 4 5M8 10l3-3 3 3 4-4',download:'M12 3v12m-5-5 5 5 5-5M3 16v5h18v-5'};
const icon=name=>`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]||paths.grid}"/></svg>`;
$$('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
const navs=[['Office','home'],['Markets','chart'],['Chat','chat'],['Coding','code'],['Strategies','candle'],['Portfolio','wallet'],['More','grid']];
$('#sidebar-tabs').innerHTML=navs.map(([name,key])=>`<button data-page="${name}" aria-selected="${name==='Office'}">${icon(key)}${name}</button>`).join('');
$$('#quick-actions button').forEach(el=>el.insertAdjacentHTML('afterbegin',icon(el.dataset.iconName)));
const agents={rhea:['Rhea','Coordinator'],atlas:['Atlas','Market research'],noor:['Noor','Execution research'],sable:['Sable','Risk review']};
let avatarCount=0;
const avatar=key=>{const prefix=`v4-${++avatarCount}-`;return niceAvatarMarkup[key].replace(/id="([^"]+)"/g,(_,id)=>`id="${prefix}${id}"`).replace(/url\(#([^)]+)\)/g,(_,id)=>`url(#${prefix}${id})`);};
$('.research-members').innerHTML=Object.keys(agents).map(key=>`<div class="member-avatar">${avatar(key)}</div>`).join('');
// Reuse the existing approved research conversation without adding trading behavior.
const messages=[
 ['rhea','I’ll coordinate. Atlas, check the market. Noor, execution. Sable, risk.'],
 ['atlas','The setup looks constructive. Refresh the $77,673 quote before entry.'],
 ['noor','Keep the size at 0.01 BTC. Add a slippage check to the market order.'],
 ['sable','I wouldn’t increase leverage. Margin is $155.35. Keep approval mandatory.'],
 ['atlas','Agreed on the limit. Don’t chase a moving quote—recheck before submitting.'],
 ['rhea','Checks aligned. I’ve prepared the execution workflow for your approval.'],
];
$('#research-thread').innerHTML=`<article class="research-row research-user"><div class="research-author">You</div><div class="research-bubble">Long 0.01 BTC at 5x. Ask me to confirm.</div></article>`+messages.map(([key,body],i)=>`<article class="research-row" id="research-message-${i}"><div class="research-avatar">${avatar(key)}</div><div class="research-message"><div class="research-author">${agents[key][0]}<span>${agents[key][1]}</span></div><div class="research-bubble">${body}</div></div></article>`).join('');
const escapeHTML=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
$('#code-lines').innerHTML=codeSource().map((line,i)=>`<div class="code-line"><span class="line-no">${i+1}</span><span class="code-text">${line.startsWith('//')?`<span class="comment">${escapeHTML(line)}</span>`:escapeHTML(line).replace(/(&quot;.*?&quot;)/g,'<span class="str">$1</span>')}</span></div>`).join('');
$('#assistant-result').hidden=true;
const tl=gsap.timeline({paused:true});
const grow=(target,at,duration=.55,stagger=0)=>tl.fromTo(target,{opacity:0,x:55},{opacity:1,x:0,duration,stagger,ease:'s03-enter',immediateRender:true},at);
grow('#window-controls',.09,.5);grow('#account-tools',.19,.6);
grow('#sidebar-tabs button',.42,.762,.145);grow('#side-bottom',2,.6);
grow('#breadcrumb',1.03,.7);grow('.hero-avatar',1.38,.762);grow('#office-page h1',1.57,.762);
grow('#office-composer',1.87,.762);grow('#quick-actions button',2.39,.762,.17);
grow('.office-summary',2.8,.762);grow('.explore',2.9,.762);grow('#market-tape',2.3,.65);
tl.set('#research,#strategy-page',{autoAlpha:0},0)
 .to('#office-page',{opacity:0,x:-38,duration:.24,ease:'power2.in'},RESEARCH)
 .fromTo('#research',{autoAlpha:0,x:55},{autoAlpha:1,x:0,duration:.3,ease:'s03-enter'},RESEARCH)
 .to('#research',{opacity:0,x:-45,duration:.24,ease:'power2.in'},STRATEGY)
 .fromTo('#strategy-page',{autoAlpha:0,x:65},{autoAlpha:1,x:0,duration:.3,ease:'s03-enter'},STRATEGY);
grow('.member-avatar',RESEARCH,.5,.05);grow('.research-heading h2,.research-heading p',RESEARCH+.04,.5,.08);grow('.research-composer',RESEARCH+.15,.65);
$$('.research-row').forEach((row,i)=>{
 const at=RESEARCH+.08+i*.48;
 grow(row,at,.5);
 const scroll=Math.max(0,row.offsetTop+row.offsetHeight-397);
 if(scroll)tl.to('#research-thread',{y:-scroll,duration:.5,ease:'power2.inOut'},at);
});
grow('.strategy-head',STRATEGY,.55);grow('.tabs',STRATEGY+.12,.55);grow('#code-view',STRATEGY+.22,.55);
grow('.assistant-pane>h3',STRATEGY+.1,.55);grow('.user-message',STRATEGY+.28,.55);grow('.assistant-intro',STRATEGY+.42,.55);
grow('.rule-list>div',STRATEGY+.48,.55,.1);grow('#review-code',STRATEGY+.84,.55);grow('#followup-form',STRATEGY+1.05,.75);
grow('.code-line',STRATEGY+.38,.55,.038);
tl.to({}, {duration:.01},DURATION-.01);
let time=0,playing=false,last=0,manualTab='code';
function windowX(t){
 const before=1950-1605*enter(clamp(t/2.2))-75*t;
 if(t<EXIT)return before;
 const start=345-75*EXIT;
 // Nonzero initial velocity connects the slow drift directly to the accelerating exit.
 const p=clamp((t-EXIT)/EXIT_DURATION);
 return start-75*EXIT_DURATION*p-((start+2452)-75*EXIT_DURATION)*p*p;
}
function resize(){const scale=Math.min(innerWidth/1920,(innerHeight-168)/1080);$('#viewport').style.width=`${1920*scale}px`;$('#viewport').style.height=`${1080*scale}px`;$('#stage').style.transform=`scale(${scale})`;}
function seek(value){
 if(!Number.isFinite(value))throw TypeError('Finite scene time required');
 time=clamp(value,0,DURATION);tl.seek(time,false);
 $('#client-window').style.transform=`translateX(${windowX(time)}px) scale(1.62)`;
 const page=time<RESEARCH?'Office':time<STRATEGY?'Chat':'Strategies';
 $('#breadcrumb>[data-icon]').innerHTML=icon(page==='Office'?'home':page==='Chat'?'chat':'candle');
 $('#page-label').textContent=page;$$('#sidebar-tabs button').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.page===page)));
 $('#market-tape>div').style.transform=`translateX(${-time*22}px)`;
 $('#scrub').value=time;$('#time').textContent=`${time.toFixed(2)} / ${DURATION.toFixed(2)} s`;
 window.scene.state={time,page,x:windowX(time),exitStart:EXIT,assemblyEnd:STRATEGY+1.05+.75};
}
function setPlaying(on){playing=on;last=performance.now();$('#play').textContent=playing?'Pause':'Play';}
function tick(now){if(playing){seek(time+(now-last)/1000);if(time>=DURATION)setPlaying(false);}last=now;requestAnimationFrame(tick);}
window.scene={seek,duration:DURATION,windowX,state:{}};
$('#play').onclick=()=>{if(time>=DURATION)seek(0);setPlaying(!playing);};
$('#replay').onclick=()=>{seek(0);setPlaying(true);};
$('#scrub').oninput=e=>{setPlaying(false);seek(+e.target.value);};
$$('[data-time]').forEach(b=>b.onclick=()=>{setPlaying(false);seek(+b.dataset.time);});
$$('#sidebar-tabs button').forEach(b=>b.onclick=()=>{const target={Office:2.9,Chat:5.5,Strategies:8.8}[b.dataset.page];if(target!==undefined){setPlaying(false);seek(target);}});
$('#office-composer').onsubmit=e=>{e.preventDefault();seek(RESEARCH);setPlaying(true);};
$$('#quick-actions button').forEach(b=>b.onclick=()=>{seek(RESEARCH);setPlaying(true);});
function tab(name){manualTab=name;$('#code-view').hidden=name!=='code';$('#backtest-view').hidden=name!=='backtest';$('#code-tab').setAttribute('aria-selected',String(name==='code'));$('#backtest-tab').setAttribute('aria-selected',String(name==='backtest'));$('#running').hidden=true;$('#results').hidden=false;}
$('#code-tab').onclick=()=>tab('code');$('#backtest-tab').onclick=()=>tab('backtest');$('#run').onclick=()=>{setPlaying(false);tab('backtest');};$('#rerun').onclick=()=>tab('backtest');$('#review-code').onclick=()=>tab('code');
const curve=[10000,9900,10020,9540,9690,9310,8990,9200,9090,9290,9050,9630,9520,9560,9800,10530,10400,11080,11540,11440,11850,11900,11240,10850,10750,10900,10100,10500,10190,9990,10300,11400,11100,11330,11800,11300,11750,12500,12800,13320,12940,13300,13080,13231];
$('#equity-line').setAttribute('d',curve.map((v,i)=>`${i?'L':'M'}${76+i/(curve.length-1)*840},${270-(v-8000)/6000*244}`).join(' '));
$('#chart-grid').innerHTML=[8000,10000,12000,14000].map(v=>`<line x1="76" x2="916" y1="${270-(v-8000)/6000*244}" y2="${270-(v-8000)/6000*244}"/>`).join('');
$('#rules-toggle').onclick=()=>{setPlaying(false);$('#sheet').hidden=false;$('#sheet-title').textContent='Strategy rules';$('#sheet-content').innerHTML=$('.rule-list').outerHTML;};$('#sheet-close').onclick=()=>$('#sheet').hidden=true;
$('#followup-form').onsubmit=e=>{e.preventDefault();$('.user-message').textContent=$('#followup').value||'Build a long-only semiconductor trend strategy.';};
window.addEventListener('resize',resize);window.addEventListener('keydown',e=>{if(e.target.matches('input,textarea'))return;if(e.code==='Space'){e.preventDefault();$('#play').click();}if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();setPlaying(false);seek(time+(e.key==='ArrowRight'?1:-1)/30);}});
document.fonts.ready.then(()=>{resize();seek(0);window.ready=true;requestAnimationFrame(tick);});
