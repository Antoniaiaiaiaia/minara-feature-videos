const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
const GSAP=fs.readFileSync(require.resolve('gsap/dist/gsap.min.js'),'utf8');
(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  let html=fs.readFileSync('scene5.html','utf8').replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/gsap[^"]*"><\/script>/,'<script>'+GSAP+'</script>');
  fs.writeFileSync('_m5.html',html);
  await p.goto('file://'+path.resolve('_m5.html'),{waitUntil:'load'});
  for(let i=0;i<30;i++){await p.waitForTimeout(150);if(await p.evaluate(()=>!!(window.__timelines&&window.__timelines.root)))break;}
  await p.evaluate(()=>{const tl=window.__timelines.root;tl.pause();tl.time(4);}); // settled
  const r=await p.evaluate(()=>{
    const g=(id)=>{const e=document.getElementById(id);if(!e)return null;const b=e.getBoundingClientRect();return {l:Math.round(b.left),r:Math.round(b.right),t:Math.round(b.top),btm:Math.round(b.bottom),cx:Math.round(b.left+b.width/2),cy:Math.round(b.top+b.height/2)};};
    return {tool0:g('tool0'),tool1:g('tool1'),tool2:g('tool2'),tool3:g('tool3'),agent:g('agent')};
  });
  console.log(JSON.stringify(r,null,0));
  fs.unlinkSync('_m5.html'); await b.close();
})();
