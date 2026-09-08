const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
const GSAP=fs.readFileSync(require.resolve('gsap/dist/gsap.min.js'),'utf8');
const PROJ=__dirname;
// verify all scenes still register timeline (catch JS errors from edits) + scene3 detail frames
const JOBS={'scene1.html':[2.8],'scene2.html':[7],'scene3.html':[7.6,12.3],'scene4.html':[17],'scene5.html':[10],'scene6.html':[9],'scene7.html':[11]};
(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  for(const [file,times] of Object.entries(JOBS)){
    let html=fs.readFileSync(path.join(PROJ,file),'utf8').replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/gsap[^"]*"><\/script>/,'<script>'+GSAP+'</script>');
    const tmp=path.join(PROJ,'_shot_'+file); fs.writeFileSync(tmp,html);
    const errs=[]; p.removeAllListeners('pageerror'); p.on('pageerror',e=>errs.push(e.message));
    await p.goto('file://'+tmp,{waitUntil:'load'});
    let ok=false; for(let i=0;i<40;i++){await p.waitForTimeout(150);ok=await p.evaluate(()=>!!(window.__timelines&&window.__timelines.root));if(ok)break;}
    console.log(file, ok?'TL-OK':'TL-FAIL', errs.length?('ERR:'+errs[0]):'');
    if(ok){ await p.waitForTimeout(500);
      for(const t of times){await p.evaluate(tt=>{const tl=window.__timelines.root;tl.pause();tl.time(tt);},t);await p.waitForTimeout(150);
        await p.screenshot({path:path.join(PROJ,'_shots','v5_'+file.replace('.html','')+'_t'+String(t).replace('.','_')+'.png')});}
    }
    fs.unlinkSync(tmp);
  }
  await b.close();
})();
