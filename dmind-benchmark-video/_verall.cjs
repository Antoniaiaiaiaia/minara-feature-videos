const { chromium } = require('playwright');
const fs=require('fs'),path=require('path'); const GSAP=fs.readFileSync(require.resolve('gsap/dist/gsap.min.js'),'utf8');
const dur={1:15.63,2:12.83,3:17.6,4:14.27,5:25.27,6:10.87,7:18.03};
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const p=await b.newPage({viewport:{width:2560,height:1440}});
for(let n=1;n<=7;n++){const file='scene'+n+'.html';
 let html=fs.readFileSync(file,'utf8').replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/gsap[^"]*"><\/script>/,'<script>'+GSAP+'</script>');
 fs.writeFileSync('_v'+n+'.html',html);const errs=[];p.removeAllListeners('pageerror');p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+path.resolve('_v'+n+'.html'),{waitUntil:'load'});
 let ok=false;for(let i=0;i<40;i++){await p.waitForTimeout(120);ok=await p.evaluate(()=>!!(window.__timelines&&window.__timelines.root));if(ok)break;}
 const tlen=ok?await p.evaluate(()=>window.__timelines.root.duration()):0;
 console.log('scene'+n,ok?'OK':'FAIL','tl='+tlen.toFixed(2)+'s target='+dur[n]+'s',errs[0]||'');
 fs.unlinkSync('_v'+n+'.html');}
await b.close();})();
