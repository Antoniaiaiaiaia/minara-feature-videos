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
  const r=await p.evaluate(()=>{
    const ag=document.getElementById('agent');
    const t0=document.getElementById('tool0');
    const conn=document.getElementById('conn');
    const out={};
    out.agent_off={l:ag.offsetLeft,t:ag.offsetTop,w:ag.offsetWidth,parent:ag.offsetParent?ag.offsetParent.className:'none'};
    out.tool0_off={l:t0.offsetLeft,t:t0.offsetTop,w:t0.offsetWidth,parent:t0.offsetParent?t0.offsetParent.className:'none'};
    out.conn_off={l:conn.offsetLeft,t:conn.offsetTop,w:conn.offsetWidth,parent:conn.offsetParent?conn.offsetParent.className:'none'};
    out.paths=[...document.querySelectorAll('#conng path')].map(p=>p.getAttribute('d'));
    out.connViewBox=conn.getAttribute('viewBox');
    return out;
  });
  console.log(JSON.stringify(r,null,1));
  fs.unlinkSync('_m.html'); await b.close();
})();
