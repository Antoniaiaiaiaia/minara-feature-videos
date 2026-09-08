// Research-only, one deterministic 3-second timeline; prior v4/v5 are untouched.
const tl=gsap.timeline({paused:true});
const grow=(target,at,duration=.3,stagger=0)=>tl.fromTo(target,{opacity:0,x:35},{opacity:1,x:0,duration,stagger,ease:'s03-enter',immediateRender:true},at);
grow('#window-controls,#account-tools,#sidebar-tabs,#side-bottom,#breadcrumb,#market-tape',0,.25);
grow('.member-avatar',.02,.28,.04);grow('.research-heading h2,.research-heading p',.04,.28,.06);grow('.research-composer',.08,.3);
$$('.research-row').forEach((row,i)=>{
 const at=.12+i*.32;
 grow(row,at,.31);
 const scroll=Math.max(0,row.offsetTop+row.offsetHeight-397);
 if(scroll)tl.to('#research-thread',{y:-scroll,duration:.31,ease:'power2.inOut'},at);
});
tl.to({}, {duration:.01},DURATION-.01);
let time=0,playing=false,last=0;
function windowX(t){
 if(t<EXIT)return 650-530*enter(clamp(t/.6))-75*t;
 const start=120-75*EXIT,p=clamp((t-EXIT)/EXIT_DURATION);
 return start-75*EXIT_DURATION*p-((start+2452)-75*EXIT_DURATION)*p*p;
}
function resize(){const scale=Math.min(innerWidth/1920,(innerHeight-168)/1080);$('#viewport').style.width=`${1920*scale}px`;$('#viewport').style.height=`${1080*scale}px`;$('#stage').style.transform=`scale(${scale})`;}
function seek(value){
 if(!Number.isFinite(value))throw TypeError('Finite scene time required');
 time=clamp(value,0,DURATION);tl.seek(time,false);
 $('#client-window').style.transform=`translateX(${windowX(time)}px) scale(1.62)`;
 $('#breadcrumb>[data-icon]').innerHTML=icon('chat');$('#page-label').textContent='Chat';
 $$('#sidebar-tabs button').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.page==='Chat')));
 $('#market-tape>div').style.transform=`translateX(${-time*40}px)`;
 $('#scrub').value=time;$('#time').textContent=`${time.toFixed(2)} / 3.00 s`;
 window.scene.state={time,page:'Chat',x:windowX(time),exitStart:EXIT,assemblyEnd:.12+6*.32+.31};
}
function setPlaying(on){playing=on;last=performance.now();$('#play').textContent=playing?'Pause':'Play';}
function tick(now){if(playing){seek(time+(now-last)/1000);if(time>=DURATION)setPlaying(false);}last=now;requestAnimationFrame(tick);}
window.scene={seek,duration:DURATION,windowX,state:{}};
$('#play').onclick=()=>{if(time>=DURATION)seek(0);setPlaying(!playing);};
$('#replay').onclick=()=>{seek(0);setPlaying(true);};
$('#scrub').oninput=e=>{setPlaying(false);seek(+e.target.value);};
$$('[data-time]').forEach(b=>b.onclick=()=>{setPlaying(false);seek(+b.dataset.time);});
window.addEventListener('resize',resize);
window.addEventListener('keydown',e=>{if(e.target.matches('input,textarea'))return;if(e.code==='Space'){e.preventDefault();$('#play').click();}if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();setPlaying(false);seek(time+(e.key==='ArrowRight'?1:-1)/30);}});
document.fonts.ready.then(()=>{resize();seek(0);window.ready=true;requestAnimationFrame(tick);});
