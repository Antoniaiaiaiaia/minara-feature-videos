const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
const GSAP=fs.readFileSync(require.resolve('gsap/dist/gsap.min.js'),'utf8');
(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  const p=await b.newPage({viewport:{width:2560,height:1440},deviceScaleFactor:1});
  let html=fs.readFileSync('scene5.html','utf8').replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/gsap[^"]*"><\/script>/,'<script>'+GSAP+'</script>');
  fs.writeFileSync('_s5a.html',html);
  await p.goto('file://'+path.resolve('_s5a.html'),{waitUntil:'load'});
  for(let i=0;i<40;i++){await p.waitForTimeout(150);if(await p.evaluate(()=>!!(window.__timelines&&window.__timelines.root)))break;}
  await p.waitForTimeout(400);
  await p.evaluate(()=>{const tl=window.__timelines.root;tl.pause();tl.time(3.6);});
  await p.waitForTimeout(160);
  // measure agent + card centers to confirm centering + connector reach
  const m=await p.evaluate(()=>{const q=s=>{const e=document.querySelector(s);if(!e)return null;const b=e.getBoundingClientRect();return{cx:Math.round(b.left+b.width/2),cy:Math.round(b.top+b.height/2),l:Math.round(b.left),r:Math.round(b.right)};};
    return{agent:q('#agent'),t0:q('#tool0'),t2:q('#tool2'),vw:window.innerWidth};});
  console.log(JSON.stringify(m));
  await p.screenshot({path:'_shots/s5a.png'});
  fs.unlinkSync('_s5a.html'); await b.close();
})();
