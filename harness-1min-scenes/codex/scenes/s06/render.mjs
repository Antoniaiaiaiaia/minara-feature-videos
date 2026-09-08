// Same frame-capture/FFmpeg workflow as codex/s08/render.mjs, for the approved scene.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdir,writeFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const frames=path.join(here,'render-frames'),outputDir=path.resolve(here,'../../output2');
await mkdir(outputDir,{recursive:true});
const versions=[...await readdir(path.resolve(here,'../../output')),...await readdir(outputDir)].map(name=>Number(name.match(/^s06-s07-execution-exit-v(\d+)\.mp4$/)?.[1])||0);
const output=path.join(outputDir,`s06-s07-execution-exit-v${Math.max(1,...versions)+1}.mp4`);
const modulePath=path.resolve(path.dirname(process.execPath),'../lib/node_modules/@playwright/cli/node_modules/playwright/index.mjs');
const {chromium}=await import(pathToFileURL(modulePath));
await mkdir(frames,{recursive:true});await mkdir(path.dirname(output),{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chrome'});
const fps=30,errors=[];
let count;
try{
  const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(path.join(here,'index.html')).href);
  await page.waitForFunction(()=>window.scene&&document.fonts.status==='loaded'&&document.querySelector('#flow').readyState>=2);
  count=Math.ceil(await page.evaluate(()=>scene.duration())*fps);
  const title=await page.evaluate(()=>{
    const sample=t=>{scene.seek(t);return Array.from(document.querySelectorAll('.title-word')).map(word=>({opacity:+getComputedStyle(word).opacity,x:+gsap.getProperty(word,'x'),left:word.getBoundingClientRect().left,right:word.getBoundingClientRect().right}));};
    const entries=titleStarts.map((start,j)=>{
      scene.seek(start+pushDuration/2);const word=document.querySelectorAll('.title-word')[j];
      return {x:+gsap.getProperty(word,'x')-titlePositions[j][j],y:+gsap.getProperty(word,'y'),opacity:+getComputedStyle(word).opacity,scale:+gsap.getProperty(word,'scaleX'),blur:getComputedStyle(word).filter};
    });
    return {entries,pauseStart:sample(.57),pauseEnd:sample(.75),complete:sample(1.32)};
  });
  for(const entry of title.entries){
    assert(Math.abs(entry.x-title.entries[0].x)<.001,'Every word enters from the same horizontal offset');
    assert.equal(entry.y,0);assert.equal(entry.opacity,title.entries[0].opacity);
    assert.equal(entry.scale,title.entries[0].scale);assert.equal(entry.blur,title.entries[0].blur);
  }
  assert.deepEqual(title.pauseStart,title.pauseEnd,'Pause holds after from opportunity');
  assert.deepEqual(title.pauseStart.map(w=>w.opacity),[1,1,0,0]);
  assert(title.complete.every(w=>w.opacity===1&&w.left>0&&w.right<1920),'Full title is readable inside frame');
  const titleExit=await page.evaluate(()=>{
    scene.seek(1.76);return Array.from(document.querySelectorAll('.title-word')).every(word=>word.getBoundingClientRect().right<0);
  });
  assert(titleExit,'Whole title exits left before input');
  const exit=await page.evaluate(()=>{
    const rect=t=>{scene.seek(t);const r=document.querySelector('.client').getBoundingClientRect();return {left:r.left,right:r.right};};
    const start=rect(14.35),middle=rect(14.85),end=rect(15.35),reset=rect(14.35);
    return {start,middle,end,reset};
  });
  assert.equal(exit.start.left,150);assert(exit.middle.left<exit.start.left);
  assert(exit.end.right<0,'Client completely exits left');
  assert.deepEqual(exit.reset,exit.start,'Exit rewinds cleanly');
  const ticker=await page.evaluate(()=>{
    const track=document.querySelector('.ticker-track'),groups=document.querySelectorAll('.ticker-group');
    scene.seek(10);const x1=+gsap.getProperty(track,'x');
    scene.seek(11);const x2=+gsap.getProperty(track,'x');
    scene.seek(14);const right=track.getBoundingClientRect().right,edge=document.querySelector('.ticker').getBoundingClientRect().right;
    scene.seek(10);const reset=+gsap.getProperty(track,'x');
    return {delta:x2-x1,reset:x1===reset,covered:right>=edge,same:groups[0].textContent===groups[1].textContent};
  });
  assert(Math.abs(ticker.delta+34)<1e-6);assert(ticker.reset&&ticker.covered&&ticker.same,'Ticker scrolls seamlessly and seeks deterministically');
  for(let frame=0;frame<count;frame++){
    await page.evaluate(async t=>{
      scene.seek(t);
      const video=document.querySelector('#flow');
      if(video.seeking)await new Promise(resolve=>video.addEventListener('seeked',resolve,{once:true}));
      // Export every background frame, bypassing the preview's 60ms seek throttle.
      const target=t%video.duration;
      if(Math.abs(video.currentTime-target)>1e-5){
        await new Promise(resolve=>{video.addEventListener('seeked',resolve,{once:true});video.currentTime=target;});
      }
      await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    },frame/fps);
    await page.screenshot({path:path.join(frames,`f-${String(frame).padStart(5,'0')}.png`)});
    if((frame+1)%60===0||frame===count-1)console.log(`Captured ${frame+1}/${count}`);
  }
  assert.deepEqual(errors,[]);
}finally{await browser.close();}
execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-framerate',String(fps),'-i',path.join(frames,'f-%05d.png'),'-frames:v',String(count),'-c:v','libx264','-crf','13','-pix_fmt','yuv420p','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-an','-movflags','+faststart',output],{stdio:'inherit'});
const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',output],{encoding:'utf8'}));
const video=probe.streams.find(s=>s.codec_type==='video');
assert.equal(video.width,1920);assert.equal(video.height,1080);assert.equal(+video.nb_frames,count);
assert.equal(video.r_frame_rate,'30/1');assert.equal(video.codec_name,'h264');
await writeFile(path.join(here,'verification','render.json'),JSON.stringify({output,frames:count,fps,errors,probe},null,2));
console.log(`Rendered ${output} · ${count} frames · ${probe.format.duration}s`);
