const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
const GSAP=fs.readFileSync(require.resolve('gsap/dist/gsap.min.js'),'utf8');
const PROJ=__dirname;
(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  fs.mkdirSync(path.join(PROJ,'_shots'),{recursive:true});
  let html=fs.readFileSync(path.join(PROJ,'scene1.html'),'utf8').replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/gsap[^"]*"><\/script>/,'<script>'+GSAP+'</script>');
  const tmp=path.join(PROJ,'_shot_scene1.html'); fs.writeFileSync(tmp,html);
  await p.goto('file://'+tmp,{waitUntil:'load'});
  for(let i=0;i<40;i++){await p.waitForTimeout(150);if(await p.evaluate(()=>!!(window.__timelines&&window.__timelines.root)))break;}
  await p.waitForTimeout(600);
  for(const t of [2.8,4.2]){await p.evaluate(tt=>{const tl=window.__timelines.root;tl.pause();tl.time(tt);},t);await p.waitForTimeout(180);
    await p.screenshot({path:path.join(PROJ,'_shots','scene1b_t'+String(t).replace('.','_')+'.png')});}
  fs.unlinkSync(tmp); await b.close(); console.log('done');
})();
