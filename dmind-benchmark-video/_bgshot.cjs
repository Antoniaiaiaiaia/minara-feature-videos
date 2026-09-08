const { chromium } = require('playwright');
const path=require('path');
(async()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  const p=await b.newPage({viewport:{width:2560,height:1440},deviceScaleFactor:1});
  await p.goto('file://'+path.resolve('_bg.html'),{waitUntil:'load'});
  await p.waitForTimeout(400);
  await p.screenshot({path:'_shots/bg_preview.png'});
  await b.close(); console.log('done');
})();
