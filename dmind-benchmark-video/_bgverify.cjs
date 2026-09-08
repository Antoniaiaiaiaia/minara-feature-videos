const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
const GSAP=fs.readFileSync(require.resolve('gsap/dist/gsap.min.js'),'utf8');
const PROJ=__dirname;
(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  const p=await b.newPage({viewport:{width:2560,height:1440},deviceScaleFactor:1});
  const samples={};
  for(let n=1;n<=7;n++){
    const file='scene'+n+'.html';
    let html=fs.readFileSync(path.join(PROJ,file),'utf8').replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/gsap[^"]*"><\/script>/,'<script>'+GSAP+'</script>');
    const tmp=path.join(PROJ,'_bgv_'+file); fs.writeFileSync(tmp,html);
    const errs=[]; p.removeAllListeners('pageerror'); p.on('pageerror',e=>errs.push(e.message));
    await p.goto('file://'+tmp,{waitUntil:'load'});
    let ok=false;for(let i=0;i<40;i++){await p.waitForTimeout(120);ok=await p.evaluate(()=>!!(window.__timelines&&window.__timelines.root));if(ok)break;}
    if(ok) await p.evaluate(()=>{const tl=window.__timelines.root;tl.pause();tl.time(0.02);});
    await p.waitForTimeout(200);
    // sample bg pixels at fixed empty-ish corners
    const px=await p.evaluate(()=>{
      function pick(x,y){return new Promise(r=>{const c=document.createElement('canvas');c.width=1;c.height=1;});}
      return null;
    });
    await p.screenshot({path:path.join(PROJ,'_shots','bgv'+n+'.png')});
    console.log('scene'+n, ok?'OK':'FAIL', errs[0]||'');
    fs.unlinkSync(tmp);
  }
  await b.close();
})();
