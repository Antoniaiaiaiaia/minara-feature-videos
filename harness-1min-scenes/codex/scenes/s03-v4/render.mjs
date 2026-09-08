// Reuses the project browser PNG → FFmpeg pipeline. User approved v4 render.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const frames=path.join(here,'render-frames'),verification=path.join(here,'render-verification');
const output=path.resolve(here,'../../output/s03-product-reveal-v4.mp4');
assert(!existsSync(output),'Refusing to overwrite an existing export');
await mkdir(frames,{recursive:true});await mkdir(verification,{recursive:true});
const {chromium}=await import(pathToFileURL(path.resolve(path.dirname(process.execPath),'../lib/node_modules/@playwright/cli/node_modules/playwright/index.mjs')));
const browser=await chromium.launch({headless:true,channel:'chrome',args:['--disable-gpu']}),errors=[];
try{
 const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.join(here,'_test-v4.html')).href);
 await page.waitForFunction(()=>window.ready);
 await page.addStyleTag({content:`
  html,body{width:1920px!important;height:1080px!important;overflow:hidden!important}
  body>.review-header,body>.review-controls{display:none!important}
  #viewport{position:fixed!important;inset:0!important;width:1920px!important;height:1080px!important;max-width:none!important;margin:0!important}
  #stage{transform:none!important}
 `});
 assert.deepEqual(await page.locator('#stage').evaluate(e=>[e.getBoundingClientRect().width,e.getBoundingClientRect().height]),[1920,1080]);
 assert.equal(await page.evaluate(()=>scene.duration),10.6);
 for(let frame=0;frame<318;frame++){
  await page.evaluate(async t=>{scene.seek(t);await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));},frame/30);
  await page.screenshot({path:path.join(frames,`f-${String(frame).padStart(5,'0')}.png`)});
  if((frame+1)%30===0)console.log(`Captured ${frame+1}/318`);
 }
 assert.deepEqual(errors,[]);
}finally{await browser.close();}
execFileSync('ffmpeg',['-n','-hide_banner','-loglevel','error','-framerate','30','-i',path.join(frames,'f-%05d.png'),'-frames:v','318','-c:v','libx264','-crf','13','-pix_fmt','yuv420p','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-an','-movflags','+faststart',output],{stdio:'inherit'});
const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',output],{encoding:'utf8'}));
const v=probe.streams[0];
assert.equal(probe.streams.length,1);assert.equal(v.codec_name,'h264');assert.equal(v.width,1920);assert.equal(v.height,1080);assert.equal(v.r_frame_rate,'30/1');assert.equal(+v.nb_frames,318);assert.equal(+probe.format.duration,10.6);
await writeFile(path.join(verification,'render.json'),JSON.stringify({output,errors,probe},null,2));
const picks=[21,102,160,210,267,291,310,317].map(f=>`eq(n,${f})`).join('+');
execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-i',output,'-vf',`select='${picks}',scale=400:225,tile=4x2`,'-frames:v','1',path.join(verification,'contact-sheet.png')],{stdio:'inherit'});
console.log(`PASS: ${output} · 1920×1080 · 30fps · 318 frames · 10.600s · silent H.264`);
