import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdir, stat, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const frames = path.join(here, 'render-frames');
const verification = path.join(here, 'render-verification');
const output = path.resolve(here, '../../output/s12-s13-autopilot-v2.mp4');
const fps = 30;
const count = 231;
const duration = 7.7;
const checkpoints = [
  [.30, 'title-01-autopilot'], [.70, 'title-02-fly-through'],
  [.90, 'title-03-arriving'], [1.20, 'title-04-tagline'],
  [3.50, 'dashboard'], [5.20, 'strategies'], [5.90, 'preRun'],
  [6.67, 'numberroll'], [7.66, 'ending'],
];

try {
  await stat(output);
  throw new Error(`Refusing to overwrite existing output: ${output}`);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const {chromium} = await import(pathToFileURL(path.resolve(
  path.dirname(process.execPath),
  '../lib/node_modules/@playwright/cli/node_modules/playwright/index.mjs',
)).href);

await mkdir(frames, {recursive: true});
await mkdir(verification, {recursive: true});
await mkdir(path.dirname(output), {recursive: true});

const errors = [];
const browser = await chromium.launch({
  headless: true,
  channel: 'chrome',
  args: ['--disable-gpu', '--disable-gpu-compositing'],
});

try {
  const page = await browser.newPage({viewport: {width: 1920, height: 1080}, deviceScaleFactor: 1});
  page.setDefaultTimeout(20000);
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(pathToFileURL(path.join(here, '_test.html')).href, {waitUntil: 'domcontentloaded'});
  await page.waitForFunction(() => {
    const video = document.querySelector('#flow');
    return window.scene && document.fonts.status === 'loaded' && video?.readyState >= 2 && Number.isFinite(video.duration);
  });
  assert.equal(Math.round(await page.evaluate(sceneFps => scene.duration * sceneFps, fps)), count);
  await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
  await page.addStyleTag({content: `
    html,body{width:1920px!important;height:1080px!important;overflow:hidden!important}
    .review-header,.review-controls{display:none!important}
    #viewport{position:fixed!important;inset:0!important;width:1920px!important;height:1080px!important;margin:0!important;border:0!important;border-radius:0!important}
    #stage{transform:none!important}
  `});

  for (let frame = 0; frame < count; frame++) {
    await page.evaluate(async t => {
      const video = document.querySelector('#flow');
      scene.seek(t);
      if (video.seeking) await new Promise(resolve => video.addEventListener('seeked', resolve, {once: true}));
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }, frame / fps);
    await page.locator('#stage').screenshot({path: path.join(frames, `f-${String(frame).padStart(5, '0')}.png`)});
    if ((frame + 1) % 30 === 0 || frame === count - 1) console.log(`Captured ${frame + 1}/${count}`);
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}

execFileSync('ffmpeg', [
  '-n', '-hide_banner', '-loglevel', 'error', '-framerate', String(fps),
  '-i', path.join(frames, 'f-%05d.png'), '-frames:v', String(count),
  '-c:v', 'libx264', '-crf', '13', '-pix_fmt', 'yuv420p',
  '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
  '-an', '-movflags', '+faststart', output,
], {stdio: 'inherit'});

const probe = JSON.parse(execFileSync('ffprobe', [
  '-v', 'error', '-show_streams', '-show_format', '-of', 'json', output,
], {encoding: 'utf8'}));
const video = probe.streams.find(stream => stream.codec_type === 'video');
assert.equal(video?.width, 1920);
assert.equal(video?.height, 1080);
assert.equal(+video?.nb_frames, count);
assert.equal(video?.r_frame_rate, '30/1');
assert.equal(video?.codec_name, 'h264');
assert.equal(video?.pix_fmt, 'yuv420p');
assert.equal(probe.streams.length, 1);
assert(Math.abs(+probe.format.duration - duration) < 0.001);

const frameIndexes = checkpoints.map(([time]) => Math.round(time * fps));
execFileSync('ffmpeg', [
  '-y', '-hide_banner', '-loglevel', 'error', '-i', output,
  '-vf', `select='${frameIndexes.map(index => `eq(n\\,${index})`).join('+')}',scale=533:300,tile=3x3`,
  '-frames:v', '1', path.join(verification, 'contact-sheet.jpg'),
], {stdio: 'inherit'});
execFileSync('ffmpeg', [
  '-y', '-hide_banner', '-loglevel', 'error', '-i', output,
  '-vf', `select='eq(n\\,${count - 1})',scale=1600:-1`,
  '-frames:v', '1', path.join(verification, 'finalframe.png'),
], {stdio: 'inherit'});

await writeFile(path.join(verification, 'render.json'), JSON.stringify({
  output, fps, frames: count, duration, checkpoints, frameIndexes,
  viewport: {width: 1920, height: 1080}, errors, probe,
  capture: {stage: '#stage', hidden: ['.review-header', '.review-controls'], chromeArgs: ['--disable-gpu', '--disable-gpu-compositing']},
}, null, 2));
console.log(`Rendered ${output} · ${count} frames · ${probe.format.duration}s`);
