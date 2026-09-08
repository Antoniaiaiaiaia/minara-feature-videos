// Retime the approved v4 lossless frames, preserving first and last frame.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {existsSync,mkdirSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const source=path.resolve(here,'../s03-v4/render-frames/f-%05d.png');
const output=path.resolve(here,'../../output2/s03-product-reveal-v5.mp4');
const checks=path.join(here,'render-verification');
assert(!existsSync(output),'Preserve existing exports');
assert(existsSync(source.replace('%05d','00317')),'Approved v4 master frames must be present');
mkdirSync(checks,{recursive:true});
// Map frame 317 onto frame 89 so the white ending survives the shorter duration.
execFileSync('ffmpeg',['-n','-hide_banner','-loglevel','error','-framerate','30','-i',source,'-vf','setpts=PTS*89/317,tpad=stop_mode=clone:stop_duration=0.1,fps=30','-frames:v','90','-c:v','libx264','-crf','13','-pix_fmt','yuv420p','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-an','-movflags','+faststart',output],{stdio:'inherit'});
const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',output],{encoding:'utf8'}));
const v=probe.streams[0];
assert.equal(probe.streams.length,1);assert.equal(v.codec_name,'h264');assert.equal(v.width,1920);assert.equal(v.height,1080);assert.equal(v.r_frame_rate,'30/1');assert.equal(+v.nb_frames,90);assert.equal(+probe.format.duration,3);
const last=execFileSync('ffmpeg',['-v','error','-i',output,'-vf',"select='eq(n,89)',scale=1:1,format=rgb24",'-frames:v','1','-f','rawvideo','-']);
assert([...last].every(value=>value>=250),'Final encoded frame is white');
writeFileSync(path.join(checks,'render.json'),JSON.stringify({source,output,frameMapping:'0…317 → 0…89',probe,whiteEnding:true},null,2));
execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-i',output,'-vf',"select='eq(n,6)+eq(n,29)+eq(n,45)+eq(n,59)+eq(n,75)+eq(n,82)+eq(n,87)+eq(n,89)',scale=400:225,tile=4x2",'-frames:v','1',path.join(checks,'contact-sheet.png')],{stdio:'inherit'});
console.log(`PASS: ${output} · 1920×1080 · 30fps · 90 frames · 3.000s · silent H.264 · white final frame`);
