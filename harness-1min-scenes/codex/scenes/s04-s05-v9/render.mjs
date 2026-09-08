// Existing codex/scenes/s06 frame-capture workflow, adapted to this approved scene.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const frames=path.join(here,'render-frames'),verification=path.join(here,'render-verification');
const output=path.resolve(here,'../../output2/s04-s05-signal-wall-orders-v9.mp4');
const {chromium}=await import(pathToFileURL(path.resolve(path.dirname(process.execPath),'../lib/node_modules/@playwright/cli/node_modules/playwright/index.mjs')));
await mkdir(frames,{recursive:true});await mkdir(verification,{recursive:true});await mkdir(path.dirname(output),{recursive:true});
const fps=30,count=285,errors=[];
const browser=await chromium.launch({headless:true,channel:'chrome'});
try{
 const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
 page.setDefaultTimeout(20000);
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto(pathToFileURL(path.join(here,'_test.html')).href,{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>window.scene&&document.fonts.status==='loaded'&&document.querySelector('#flow').readyState>=2);
 assert.equal(Math.round(await page.evaluate(()=>scene.duration)*fps),count);
 await page.locator('img[src]').evaluateAll(images=>Promise.all(images.map(image=>image.decode())));
 await page.addStyleTag({content:`html,body{width:1920px!important;height:1080px!important;overflow:hidden!important}header,.transport,nav,footer{display:none!important}main{padding:0!important}#viewport{position:fixed!important;inset:0!important;width:1920px!important;height:1080px!important;border:0!important;border-radius:0!important;margin:0!important}#stage{transform:none!important}`});
 for(let frame=0;frame<count;frame++){
  await page.evaluate(async t=>{
   scene.seek(t);
   await Promise.all([...document.querySelectorAll('img[src]')].map(image=>image.decode()));
   const video=document.querySelector('#flow');
   if(video.seeking)await new Promise(resolve=>video.addEventListener('seeked',resolve,{once:true}));
   // Export each source background frame, bypassing preview seek throttling.
   const target=(7.633+t)%video.duration;
   if(Math.abs(video.currentTime-target)>1e-5)await new Promise(resolve=>{video.addEventListener('seeked',resolve,{once:true});video.currentTime=target;});
   await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  },frame/fps);
  await page.screenshot({path:path.join(frames,`f-${String(frame).padStart(5,'0')}.png`)});
  if((frame+1)%30===0||frame===count-1)console.log(`Captured ${frame+1}/${count}`);
 }
 assert.deepEqual(errors,[]);
}finally{await browser.close();}
execFileSync('ffmpeg',['-n','-hide_banner','-loglevel','error','-framerate',String(fps),'-i',path.join(frames,'f-%05d.png'),'-frames:v',String(count),'-t','9.5','-c:v','libx264','-crf','13','-pix_fmt','yuv420p','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-an','-movflags','+faststart',output],{stdio:'inherit'});
const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',output],{encoding:'utf8'}));
const video=probe.streams.find(stream=>stream.codec_type==='video');
assert.equal(video.width,1920);assert.equal(video.height,1080);assert.equal(+video.nb_frames,count);
assert.equal(video.r_frame_rate,'30/1');assert.equal(video.codec_name,'h264');assert.equal(video.pix_fmt,'yuv420p');
assert.equal(probe.streams.length,1);assert(Math.abs(+probe.format.duration-count/fps)<.001);
await writeFile(path.join(verification,'render.json'),JSON.stringify({output,frames:count,fps,errors,probe},null,2));
execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-i',output,'-vf',"select='eq(n,12)+eq(n,43)+eq(n,113)+eq(n,168)+eq(n,200)+eq(n,205)+eq(n,216)+eq(n,231)+eq(n,246)+eq(n,261)+eq(n,276)+eq(n,280)',scale=480:270,tile=4x3",'-frames:v','1',path.join(verification,'contact-sheet.jpg')],{stdio:'inherit'});
execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-i',output,'-vf',"select='eq(n,265)',scale=1600:900",'-frames:v','1',path.join(verification,'order-check.png')],{stdio:'inherit'});
console.log(`Rendered ${output} · ${count} frames · ${probe.format.duration}s`);
