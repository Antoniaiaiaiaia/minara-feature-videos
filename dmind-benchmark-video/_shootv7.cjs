const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
const GSAP=fs.readFileSync(require.resolve('gsap/dist/gsap.min.js'),'utf8');
const PROJ=__dirname;
const times={'scene4.html':[5.4,7.6,12.5,16.2,19.2]};
(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  for(const [file,ts] of Object.entries(times)){
    let html=fs.readFileSync(path.join(PROJ,file),'utf8').replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/gsap[^"]*"><\/script>/,'<script>'+GSAP+'</script>');
    const tmp=path.join(PROJ,'_shot_'+file); fs.writeFileSync(tmp,html);
    const errs=[]; p.on('pageerror',e=>errs.push(e.message));
    await p.goto('file://'+tmp,{waitUntil:'load'});
    let ok=false; for(let i=0;i<40;i++){await p.waitForTimeout(150);ok=await p.evaluate(()=>!!(window.__timelines&&window.__timelines.root));if(ok)break;}
    console.log(file, ok?'OK':'FAIL', errs[0]||'');
    if(ok){await p.waitForTimeout(500);
      for(const t of ts){await p.evaluate(tt=>{const tl=window.__timelines.root;tl.pause();tl.time(tt);},t);await p.waitForTimeout(170);
        await p.screenshot({path:path.join(PROJ,'_shots','v7_s4_t'+String(t).replace('.','_')+'.png')});}}
    fs.unlinkSync(tmp);
  }
  await b.close();
})();
