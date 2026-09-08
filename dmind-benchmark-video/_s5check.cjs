const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
const GSAP=fs.readFileSync(require.resolve('gsap/dist/gsap.min.js'),'utf8');
(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  const p=await b.newPage({viewport:{width:2560,height:1440},deviceScaleFactor:1});
  let html=fs.readFileSync('scene5.html','utf8').replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/gsap[^"]*"><\/script>/,'<script>'+GSAP+'</script>');
  fs.writeFileSync('_s5.html',html);
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.resolve('_s5.html'),{waitUntil:'load'});
  let ok=false;for(let i=0;i<40;i++){await p.waitForTimeout(150);ok=await p.evaluate(()=>!!(window.__timelines&&window.__timelines.root));if(ok)break;}
  console.log('TL',ok,'err',errs[0]||'');
  await p.waitForTimeout(400);
  for(const t of [3.5,13.0]){await p.evaluate(tt=>{const tl=window.__timelines.root;tl.pause();tl.time(tt);},t);await p.waitForTimeout(170);
    await p.screenshot({path:'_shots/s5_t'+String(t).replace('.','_')+'.png'});}
  fs.unlinkSync('_s5.html'); await b.close();
})();
