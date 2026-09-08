import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdir,stat,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const frames=path.resolve(here,'../../output2/s18-s19-direct-logo-render/frames');
const verification=path.resolve(here,'../../output2/s18-s19-direct-logo-render/verification');
const output=path.resolve(here,'../../output2/s18-s19-minara-direct-logo-gfi-ending.mp4');
const fps=30,count=354,duration=11.8,width=1920,height=1080;
const contactFrames=[21,112,186,200,210,231,258,312,342];

try{await stat(output);throw new Error(`Refusing to overwrite existing output: ${output}`)}
catch(error){if(error.code!=='ENOENT')throw error}

const {chromium}=await import(pathToFileURL(path.resolve(
  path.dirname(process.execPath),
  '../lib/node_modules/@playwright/cli/node_modules/playwright/index.mjs',
)).href);

await mkdir(frames,{recursive:true});
await mkdir(verification,{recursive:true});
await mkdir(path.dirname(output),{recursive:true});

const errors=[];
const remoteRequests=[];
const browser=await chromium.launch({headless:true,channel:'chrome'});

try{
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
  page.setDefaultTimeout(20000);
  page.on('pageerror',error=>errors.push(error.message));
  page.on('request',request=>{if(/^https?:/.test(request.url()))remoteRequests.push(request.url())});
  await page.goto(pathToFileURL(path.join(here,'_test.html')).href,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.scene&&window.S18Title?.ready&&window.S18Ending?.ready&&document.fonts.status==='loaded'&&document.querySelector('#flow')?.readyState>=2&&Number.isFinite(document.querySelector('#flow')?.duration));
  assert.equal(Math.round(await page.evaluate(()=>scene.duration*30)),count);
  await page.locator('img').evaluateAll(images=>Promise.all(images.map(image=>image.decode())));
  await page.addStyleTag({content:`
    html,body{width:1920px!important;height:1080px!important;overflow:hidden!important}
    .review,.controls{display:none!important}
    #viewport{position:fixed!important;inset:0!important;width:1920px!important;height:1080px!important;max-width:1920px!important;margin:0!important;border:0!important;border-radius:0!important}
    #stage{transform:none!important}
  `});
  const layout=await page.evaluate(()=>{
    const rect=selector=>{const r=document.querySelector(selector).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}};
    const viewport=rect('#viewport'),stage=rect('#stage'),root=rect('#headline-root');
    const close=(a,b)=>Math.abs(a-b)<.01;
    return {viewport,stage,root,review:getComputedStyle(document.querySelector('.review')).display,controls:getComputedStyle(document.querySelector('.controls')).display,fit:close(viewport.width,1920)&&close(viewport.height,1080)&&close(stage.width,1920)&&close(stage.height,1080)&&close(root.width,1920)&&close(root.height,1080)};
  });
  assert(layout.fit,'Rendered root, stage, and viewport must fit 1920x1080');
  assert.equal(layout.review,'none');
  assert.equal(layout.controls,'none');
  console.log(`Capture starting: ${count} frames at ${width}x${height}, ${fps} fps`);
  for(let frame=0;frame<count;frame++){
    const t=frame/fps;
    await page.evaluate(async t=>{
      await scene.seek(t);
      const video=document.querySelector('#flow');
      if(Math.abs(video.currentTime-t)>1e-6)video.currentTime=t;
      if(video.seeking||Math.abs(video.currentTime-t)>1e-6){
        await new Promise((resolve,reject)=>{
          let done=false;
          const finish=()=>{if(done)return;done=true;video.removeEventListener('seeked',finish);video.removeEventListener('error',fail);resolve()};
          const fail=()=>{if(done)return;done=true;video.removeEventListener('seeked',finish);video.removeEventListener('error',fail);reject(new Error('Background video seek failed'))};
          video.addEventListener('seeked',finish,{once:true});video.addEventListener('error',fail,{once:true});
        });
      }
      await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    },t);
    await page.locator('#viewport').screenshot({path:path.join(frames,`f-${String(frame).padStart(5,'0')}.png`)});
    if((frame+1)%30===0||frame===count-1)console.log(`Captured ${frame+1}/${count}`);
  }
  await page.evaluate(async()=>{await scene.seek(11.8);const video=document.querySelector('#flow');if(Math.abs(video.currentTime-11.8)>1e-6)video.currentTime=11.8;if(video.seeking)await new Promise(resolve=>video.addEventListener('seeked',resolve,{once:true}));await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))});
  const finalState=await page.evaluate(()=>({selected:scene.selected,minaraChecked:document.querySelector('#provider-minara')?.getAttribute('aria-checked'),controlsHidden:getComputedStyle(document.querySelector('.controls')).display==='none',reviewHidden:getComputedStyle(document.querySelector('.review')).display==='none'}));
  assert.equal(finalState.selected,'minara');
  assert.equal(finalState.minaraChecked,'true');
  assert(finalState.controlsHidden&&finalState.reviewHidden,'Final render must contain no review UI');
  assert.deepEqual(errors,[]);
  assert.deepEqual(remoteRequests,[]);
}finally{await browser.close()}

execFileSync('ffmpeg',['-n','-hide_banner','-loglevel','error','-framerate',String(fps),'-i',path.join(frames,'f-%05d.png'),'-frames:v',String(count),'-c:v','libx264','-crf','13','-pix_fmt','yuv420p','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-an','-movflags','+faststart',output],{stdio:'inherit'});

const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',output],{encoding:'utf8'}));
const video=probe.streams.find(stream=>stream.codec_type==='video');
assert.equal(video?.width,width);assert.equal(video?.height,height);assert.equal(+video?.nb_frames,count);
assert.equal(video?.r_frame_rate,'30/1');assert.equal(video?.codec_name,'h264');assert.equal(video?.pix_fmt,'yuv420p');
assert.equal(video?.color_space,'bt709');assert.equal(video?.color_transfer,'bt709');assert.equal(video?.color_primaries,'bt709');
assert.equal(probe.streams.length,1);assert(Math.abs(+probe.format.duration-duration)<.001);

const select=contactFrames.map(index=>`eq(n\\,${index})`).join('+');
execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-i',output,'-vf',`select='${select}',scale=533:300,tile=3x3`,'-frames:v','1',path.join(verification,'contact-sheet.jpg')],{stdio:'inherit'});
execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-i',output,'-vf',`select='eq(n\\,${count-1})',scale=1600:-1`,'-frames:v','1',path.join(verification,'finalframe.png')],{stdio:'inherit'});

await writeFile(path.join(verification,'render.json'),JSON.stringify({output,frames:count,fps,duration,viewport:{width,height},contactFrames,errors,remoteRequests,finalState:{selected:'minara',minaraChecked:'true',controlsHidden:true,reviewHidden:true},probe,capture:{source:'file://_test.html',waitFor:'window.S18Title.ready, document.fonts, img.decode(), exact background video seek to frame time, seeked, two requestAnimationFrame',hidden:['.review','.controls']}},null,2));
console.log(`Rendered ${output} · ${count} frames · ${probe.format.duration}s`);
