// Reuse the approved S16/S17 browser-frame → FFmpeg export pipeline.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {access, mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const frames = path.join(here, 'render-frames');
const verification = path.join(here, 'render-verification');
const output = path.resolve(here, '../../output/s16-s17-beyond-finance.mp4');
const fps = 30, count = 231, duration = count / fps, errors = [];
const {chromium} = await import(pathToFileURL(path.resolve(
  path.dirname(process.execPath),
  '../lib/node_modules/@playwright/cli/node_modules/playwright/index.mjs',
)).href);

async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}
assert.equal(await exists(output), false, `Refusing to overwrite existing output: ${output}`);
await mkdir(frames, {recursive: true});
await mkdir(verification, {recursive: true});

const browser = await chromium.launch({headless: true, channel: 'chrome'});
try {
  const page = await browser.newPage({viewport: {width: 1920, height: 1080}, deviceScaleFactor: 1});
  page.setDefaultTimeout(20000);
  page.on('pageerror', error => errors.push(error.stack || error.message));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto(pathToFileURL(path.join(here, '_test.html')).href, {waitUntil: 'domcontentloaded'});
  await page.waitForFunction(() => (
    window.scene?.ready && window.scene.duration === 7.7 &&
    window.BeyondTitle?.ready === true && document.fonts.status === 'loaded' &&
    document.querySelector('#flow')?.readyState >= 2
  ));
  await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
  await page.addStyleTag({content: `
    html, body { width: 1920px !important; height: 1080px !important; overflow: hidden !important; }
    body { padding: 0 !important; }
    .review-header, .review-controls { display: none !important; }
    #viewport { position: fixed !important; inset: 0 !important; width: 1920px !important; height: 1080px !important; max-width: none !important; aspect-ratio: auto !important; margin: 0 !important; border-radius: 0 !important; }
    #stage { transform: none !important; }
  `});
  assert.deepEqual(await page.locator('#stage').evaluate(element => [
    element.getBoundingClientRect().width, element.getBoundingClientRect().height,
  ]), [1920, 1080]);

  for (let frame = 0; frame < count; frame++) {
    await page.evaluate(async seconds => {
      window.scene.seek(seconds);
      window.BeyondTitle.seek(Math.round(seconds * 30));
      const video = document.querySelector('#flow');
      if (video.seeking) await new Promise(resolve => video.addEventListener('seeked', resolve, {once: true}));
      if (Math.abs(video.currentTime - seconds) > 1e-5) {
        await new Promise(resolve => {
          video.addEventListener('seeked', resolve, {once: true});
          video.currentTime = seconds;
        });
      }
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }, frame / fps);
    await page.screenshot({path: path.join(frames, `f-${String(frame).padStart(5, '0')}.png`)});
    if ((frame + 1) % 30 === 0 || frame === count - 1) console.log(`Captured ${frame + 1}/${count}`);
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}

execFileSync('ffmpeg', [
  '-n', '-hide_banner', '-loglevel', 'error',
  '-framerate', String(fps), '-i', path.join(frames, 'f-%05d.png'),
  '-frames:v', String(count), '-c:v', 'libx264', '-crf', '13', '-pix_fmt', 'yuv420p',
  '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
  '-an', '-movflags', '+faststart', output,
], {stdio: 'inherit'});

const probe = JSON.parse(execFileSync('ffprobe', [
  '-v', 'error', '-show_streams', '-show_format', '-of', 'json', output,
], {encoding: 'utf8'}));
const video = probe.streams.find(stream => stream.codec_type === 'video');
assert.ok(video);
assert.equal(video.width, 1920);
assert.equal(video.height, 1080);
assert.equal(+video.nb_frames, count);
assert.equal(video.r_frame_rate, '30/1');
assert.equal(video.codec_name, 'h264');
assert.equal(video.pix_fmt, 'yuv420p');
assert.equal(probe.streams.length, 1);
assert(Math.abs(+probe.format.duration - duration) < 0.001);
await writeFile(path.join(verification, 'render.json'), JSON.stringify({output, frames: count, fps, errors, probe}, null, 2));

const frameExpr = [18, 48, 76, 94, 105, 130, 164, 189, 210, 230].map(frame => `eq(n\\,${frame})`).join('+');
execFileSync('ffmpeg', [
  '-y', '-hide_banner', '-loglevel', 'error', '-i', output,
  '-vf', `select='${frameExpr}',scale=320:-2,tile=5x2`, '-frames:v', '1',
  path.join(verification, 'contact-sheet.jpg'),
], {stdio: 'inherit'});
execFileSync('ffmpeg', [
  '-y', '-hide_banner', '-loglevel', 'error', '-i', output,
  '-vf', "select='eq(n\\,230)',scale=1600:-2", '-frames:v', '1',
  path.join(verification, 'final-frame-230.png'),
], {stdio: 'inherit'});
console.log(`Rendered ${output} · ${count} frames · ${probe.format.duration}s`);
