const { chromium } = require('playwright');
const fs=require('fs'),path=require('path'); const GSAP=fs.readFileSync(require.resolve('gsap/dist/gsap.min.js'),'utf8');
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const p=await b.newPage({viewport:{width:2560,height:1440}});
let html=fs.readFileSync('scene5.html','utf8').replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/gsap[^"]*"><\/script>/,'<script>'+GSAP+'</script>');
fs.writeFileSync('_m.html',html);await p.goto('file://'+path.resolve('_m.html'),{waitUntil:'load'});
for(let i=0;i<30;i++){await p.waitForTimeout(120);if(await p.evaluate(()=>!!(window.__timelines&&window.__timelines.root)))break;}
await p.waitForTimeout(400);await p.evaluate(()=>{const tl=window.__timelines.root;tl.pause();tl.time(3.6);});await p.waitForTimeout(160);
const m=await p.evaluate(()=>{const q=s=>{const e=document.querySelector(s);const b=e.getBoundingClientRect();return{t:Math.round(b.top),b:Math.round(b.bottom)};};const t0=q('#tool0'),t1=q('#tool1');return{groupTop:t0.t,groupBot:t1.b,vh:window.innerHeight,centerGap_top:t0.t,centerGap_bot:window.innerHeight-t1.b};});
console.log('group top',m.groupTop,'bottom',m.groupBot,'| topMargin',m.centerGap_top,'botMargin',m.centerGap_bot);
await p.screenshot({path:'_shots/s5center.png'});fs.unlinkSync('_m.html');await b.close();})();
