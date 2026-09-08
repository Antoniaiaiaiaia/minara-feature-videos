const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
const GSAP=fs.readFileSync(require.resolve('gsap/dist/gsap.min.js'),'utf8');
const PROJ=__dirname;
const JOBS={'scene1.html':[11.6],'scene3.html':[7.6],'scene4.html':[10.5,17.2],'scene5.html':[3.5],'scene7.html':[6.2]};
(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  for(const [file,times] of Object.entries(JOBS)){
    let html=fs.readFileSync(path.join(PROJ,file),'utf8').replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/gsap[^"]*"><\/script>/,'<script>'+GSAP+'</script>');
    const tmp=path.join(PROJ,'_shot_'+file); fs.writeFileSync(tmp,html);
    await p.goto('file://'+tmp,{waitUntil:'load'});
    let ok=false; for(let i=0;i<40;i++){await p.waitForTimeout(150);ok=await p.evaluate(()=>!!(window.__timelines&&window.__timelines.root));if(ok)break;}
    if(!ok){console.log('NO TL',file);fs.unlinkSync(tmp);continue;}
    await p.waitForTimeout(600);
    for(const t of times){await p.evaluate(tt=>{const tl=window.__timelines.root;tl.pause();tl.time(tt);},t);await p.waitForTimeout(170);
      await p.screenshot({path:path.join(PROJ,'_shots','v4_'+file.replace('.html','')+'_t'+String(t).replace('.','_')+'.png')});}
    fs.unlinkSync(tmp); console.log('done',file);
  }
  await b.close();
})();
