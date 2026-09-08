const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  // typical laptop window
  const p=await b.newPage({viewport:{width:1680,height:1010},deviceScaleFactor:1});
  await p.goto('http://localhost:8791/preview.html',{waitUntil:'load'});
  await p.waitForTimeout(2500);
  const info=await p.evaluate(()=>{
    const sc=document.getElementById('scaler');
    const fr=document.getElementById('frame');
    return {scalerTransform:sc?getComputedStyle(sc).transform:'none', innerW:window.innerWidth, innerH:window.innerHeight,
            frameW:fr?fr.getBoundingClientRect().width:0, frameH:fr?fr.getBoundingClientRect().height:0,
            frameLeft:fr?Math.round(fr.getBoundingClientRect().left):0, frameRight:fr?Math.round(fr.getBoundingClientRect().right):0,
            frameTop:fr?Math.round(fr.getBoundingClientRect().top):0, frameBottom:fr?Math.round(fr.getBoundingClientRect().bottom):0};
  });
  console.log(JSON.stringify(info,null,0));
  await p.screenshot({path:'_shots/preview_check.png'});
  await b.close();
})();
