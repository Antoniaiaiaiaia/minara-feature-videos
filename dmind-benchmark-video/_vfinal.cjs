const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
const GSAP=fs.readFileSync(require.resolve('gsap/dist/gsap.min.js'),'utf8');
const PROJ=__dirname;
const JOBS={'scene5.html':[3.6],'scene6.html':[8.5],'scene3.html':[3.5],'scene1.html':[2.8]};
(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  const p=await b.newPage({viewport:{width:2560,height:1440},deviceScaleFactor:1});
  for(const [file,times] of Object.entries(JOBS)){
    let html=fs.readFileSync(path.join(PROJ,file),'utf8').replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/gsap[^"]*"><\/script>/,'<script>'+GSAP+'</script>');
    const tmp=path.join(PROJ,'_v_'+file); fs.writeFileSync(tmp,html);
    const errs=[]; p.removeAllListeners('pageerror'); p.on('pageerror',e=>errs.push(e.message));
    await p.goto('file://'+tmp,{waitUntil:'load'});
    let ok=false;for(let i=0;i<40;i++){await p.waitForTimeout(150);ok=await p.evaluate(()=>!!(window.__timelines&&window.__timelines.root));if(ok)break;}
    console.log(file, ok?'OK':'FAIL', errs[0]||'');
    if(ok){await p.waitForTimeout(450);
      for(const t of times){await p.evaluate(tt=>{const tl=window.__timelines.root;tl.pause();tl.time(tt);},t);await p.waitForTimeout(160);
        await p.screenshot({path:path.join(PROJ,'_shots','vf_'+file.replace('.html','')+'.png')});}}
    fs.unlinkSync(tmp);
  }
  await b.close();
})();
