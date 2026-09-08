import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import {mkdir,writeFile,access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'../../..');
const require=createRequire(path.join(root,'remotion/package.json'));
const {build}=require('esbuild');
const text='from opportunity to execution';
const frames=path.join(here,'frames');await mkdir(frames,{recursive:true});
await mkdir(path.resolve(here,'../../output2'),{recursive:true});
let output=path.resolve(here,'../../output2',text+'.mp4'),version=1;
while(await access(output).then(()=>true,()=>false)||await access(path.resolve(here,'../../output',path.basename(output))).then(()=>true,()=>false))output=path.resolve(here,'../../output2',`${text} v${++version}.mp4`);
await build({stdin:{contents:`
import React,{useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {TextSwap} from './text-swap';
function Title(){return <div style={{position:'absolute',inset:0,background:'#202024'}}><TextSwap fromText="" toText=${JSON.stringify(text)} transition="fly-through" exitDuration={1} enterDuration={16} overlap={1} microDelay={0} fontFamily="Geist" fontSize={112} fontWeight={600} color="#e7e7ea"/></div>}
function Clip(){const ref=useRef(null);useEffect(()=>{window.clip=ref.current;},[]);return <Player ref={ref} component={Title} durationInFrames={75} fps={30} compositionWidth={1920} compositionHeight={1080} controls={false} clickToPlay={false} autoPlay={false} style={{width:1920,height:1080}}/>}
createRoot(document.getElementById('root')).render(<Clip/>);`,resolveDir:here,loader:'tsx'},bundle:true,format:'iife',jsx:'automatic',minify:true,define:{'process.env.NODE_ENV':'"production"'},nodePaths:[path.join(root,'remotion/node_modules')],alias:{react:path.join(root,'remotion/node_modules/react'),'react-dom':path.join(root,'remotion/node_modules/react-dom'),remotion:path.join(root,'remotion/node_modules/remotion'),'@remotion/player':path.join(root,'remotion/node_modules/@remotion/player'),'@/lib/snap-cn-ui':path.join(root,'codex/scenes/s16-s17-beyond-finance/title/lib/snap-cn-ui/index.ts')},outfile:path.join(here,'clip.js')});
await writeFile(path.join(here,'render.html'),`<!doctype html><meta charset="utf-8"><style>@font-face{font-family:Geist;src:url('../../assets/fonts/Geist-SemiBold.woff2');font-weight:600}*{box-sizing:border-box}html,body{margin:0;width:1920px;height:1080px;overflow:hidden;background:#202024}</style><div id="root"></div><script src="clip.js"></script>`);
const {chromium}=await import(pathToFileURL(path.resolve(path.dirname(process.execPath),'../lib/node_modules/@playwright/cli/node_modules/playwright/index.mjs')));
const browser=await chromium.launch({headless:true,channel:'chrome'}),errors=[];
try{
  const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto(pathToFileURL(path.join(here,'render.html')).href);
  await page.waitForFunction(()=>window.clip&&document.fonts.status==='loaded');
  assert.equal(await page.locator('body').innerText(),text);
  for(let frame=0;frame<75;frame++){
    await page.evaluate(f=>window.clip.seekTo(f),frame);
    await page.waitForFunction(f=>window.clip.getCurrentFrame()===f,frame);
    await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
    await page.screenshot({path:path.join(frames,`${String(frame).padStart(3,'0')}.png`)});
  }
  assert.deepEqual(errors,[]);
}finally{await browser.close();}
execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-framerate','30','-i',path.join(frames,'%03d.png'),'-frames:v','75','-c:v','libx264','-crf','13','-pix_fmt','yuv420p','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-an','-movflags','+faststart',output]);
const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',output],{encoding:'utf8'}));
assert.equal(probe.streams[0].nb_frames,'75');assert.equal(probe.streams[0].width,1920);assert.equal(probe.streams[0].height,1080);assert.equal(probe.streams[0].r_frame_rate,'30/1');assert.equal(+probe.format.duration,2.5);
execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-i',output,'-vf',"select='eq(n,0)+eq(n,8)+eq(n,16)+eq(n,74)',scale=800:450,tile=2x2",'-frames:v','1','-update','1',path.join(here,'encoded-check.jpg')]);
await writeFile(path.join(here,'render.json'),JSON.stringify({text,output,background:'#202024',animation:'User-supplied TextSwap, fly-through entrance, original 16-frame curve; remaining frames hold',probe,errors},null,2));
console.log(output);
