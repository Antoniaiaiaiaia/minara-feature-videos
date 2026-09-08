// Approved preview export; reuses the project's Playwright PNG → FFmpeg workflow.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const frames=path.join(here,'render-frames'),output=path.resolve(here,'../../output2/s10-s11-or-find-your-fit.mp4');
const {chromium}=await import(pathToFileURL(path.resolve(path.dirname(process.execPath),'../lib/node_modules/@playwright/cli/node_modules/playwright/index.mjs')));
const count=231,fps=30,errors=[];
await mkdir(frames,{recursive:true});await mkdir(path.dirname(output),{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chrome'});
try{
 const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.join(here,'_test.html')).href);
 await page.waitForFunction(()=>window.scene&&window.titleReady&&document.fonts.status==='loaded'&&document.querySelector('#flow').readyState>=2);
 await page.addStyleTag({content:`html,body{width:1920px!important;height:1080px!important;overflow:hidden!important}.review,.controls{display:none!important}#viewport{position:fixed!important;inset:0!important;width:1920px!important;height:1080px!important;margin:0!important}#stage{transform:none!important}`});
 assert.deepEqual(await page.locator('#stage').evaluate(e=>[e.getBoundingClientRect().width,e.getBoundingClientRect().height]),[1920,1080]);
 for(let frame=0;frame<count;frame++){
  await page.evaluate(async t=>{
   scene.seek(t);const video=document.querySelector('#flow');
   if(video.seeking)await new Promise(r=>video.addEventListener('seeked',r,{once:true}));
   const target=t%video.duration;
   if(Math.abs(video.currentTime-target)>1e-5)await new Promise(r=>{video.addEventListener('seeked',r,{once:true});video.currentTime=target;});
   await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
  },frame/fps);
  await page.screenshot({path:path.join(frames,`f-${String(frame).padStart(5,'0')}.png`)});
  if((frame+1)%30===0||frame===count-1)console.log(`Captured ${frame+1}/${count}`);
 }
 assert.deepEqual(errors,[]);
 assert.equal(await page.locator('#hero-run').textContent(),'Running');
}finally{await browser.close();}
execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-framerate',String(fps),'-i',path.join(frames,'f-%05d.png'),'-frames:v',String(count),'-c:v','libx264','-crf','13','-pix_fmt','yuv420p','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-an','-movflags','+faststart',output],{stdio:'inherit'});
const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',output],{encoding:'utf8'}));
const video=probe.streams.find(s=>s.codec_type==='video');
assert.equal(video.width,1920);assert.equal(video.height,1080);assert.equal(+video.nb_frames,count);
assert.equal(video.r_frame_rate,'30/1');assert.equal(video.codec_name,'h264');assert.equal(+probe.format.duration,7.7);
await writeFile(path.join(here,'verification/render.json'),JSON.stringify({output,frames:count,fps,errors,probe},null,2));
console.log(`Rendered ${output} · ${count} frames · 7.700s`);
