const { chromium } = require('playwright');
const fs=require('fs'),path=require('path');
const GSAP=fs.readFileSync(require.resolve('gsap/dist/gsap.min.js'),'utf8');
(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  const p=await b.newPage({viewport:{width:2560,height:1440},deviceScaleFactor:1});
  let html=fs.readFileSync('scene5.html','utf8').replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/gsap[^"]*"><\/script>/,'<script>'+GSAP+'</script>');
  fs.writeFileSync('_m.html',html);
  await p.goto('file://'+path.resolve('_m.html'),{waitUntil:'load'});
  for(let i=0;i<30;i++){await p.waitForTimeout(120);if(await p.evaluate(()=>!!(window.__timelines&&window.__timelines.root)))break;}
  await p.waitForTimeout(400);
  await p.evaluate(()=>{const tl=window.__timelines.root;tl.pause();tl.time(3.6);});
  await p.waitForTimeout(160);
  const vb=await p.evaluate(()=>document.getElementById('conn').getAttribute('viewBox'));
  console.log('conn viewBox now:', vb);
  await p.screenshot({path:'_shots/s5conn.png'});
  fs.unlinkSync('_m.html'); await b.close();
})();
