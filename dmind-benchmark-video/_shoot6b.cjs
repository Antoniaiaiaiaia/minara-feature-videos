const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
const GSAP=fs.readFileSync(require.resolve('gsap/dist/gsap.min.js'),'utf8');
(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  const p=await b.newPage({viewport:{width:2560,height:1440},deviceScaleFactor:1});
  let html=fs.readFileSync('scene6.html','utf8').replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/gsap[^"]*"><\/script>/,'<script>'+GSAP+'</script>');
  fs.writeFileSync('_s6.html',html);
  await p.goto('file://'+path.resolve('_s6.html'),{waitUntil:'load'});
  for(let i=0;i<40;i++){await p.waitForTimeout(150);if(await p.evaluate(()=>!!(window.__timelines&&window.__timelines.root)))break;}
  await p.waitForTimeout(400);
  for(const t of [1.8,3.0]){await p.evaluate(tt=>{const tl=window.__timelines.root;tl.pause();tl.time(tt);},t);await p.waitForTimeout(160);
    await p.screenshot({path:'_shots/k6_t'+String(t).replace('.','_')+'.png'});}
  fs.unlinkSync('_s6.html'); await b.close(); console.log('done');
})();
