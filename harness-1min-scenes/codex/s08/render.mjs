import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdir,rm,stat,readdir,readFile,writeFile,copyFile,cp} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const scene = path.join(here, '_test.html');
const outputDir = path.join(root, 'codex/output2');
await mkdir(outputDir, {recursive: true});
const outputFiles = (await Promise.all([outputDir, path.join(root, 'codex/output')].map(dir => readdir(dir)))).flat();
const versions = outputFiles.map(name => Number(name.match(/^s08-s09-strategy-studio-(?:v)?(\d+)\.mp4$/)?.[1] || 0));
const version = Math.max(0, ...versions) + 1;
const framesDir = path.join(outputDir, `s08-s09-strategy-studio-v${version}-frames`);
const output = path.join(outputDir, `s08-s09-strategy-studio-v${version}.mp4`);
const port = 4038;
const baseUrl = `http://127.0.0.1:${port}`;
const frameCount = Math.ceil(8.7 / .8 * 30);
const fps = 30;
// Only use when the first two seconds changed and the remaining captured frames are current.
const titleOnly = process.argv.includes('--title-only');

const playwrightModule = path.resolve(
  path.dirname(process.execPath),
  '../lib/node_modules/@playwright/cli/node_modules/playwright/index.mjs',
);
const {chromium} = await import(pathToFileURL(playwrightModule));

if (titleOnly) {
  const previousFrames = path.join(outputDir, `s08-s09-strategy-studio-v${version - 1}-frames`);
  await stat(path.join(previousFrames, `f-${String(frameCount-1).padStart(5, '0')}.png`));
  await cp(previousFrames, framesDir, {recursive: true});
}
else await rm(framesDir, {recursive: true, force: true});
await mkdir(framesDir, {recursive: true});

const server = spawn(process.execPath, ['tools/range-server.mjs', root, String(port)], {
  cwd: root,
  stdio: ['ignore', 'ignore', 'inherit'],
});
let browser;
const stopServer = () => {
  if (!server.killed) server.kill('SIGTERM');
};
process.once('exit', stopServer);
process.once('SIGINT', () => { stopServer(); process.exit(130); });
process.once('SIGTERM', () => { stopServer(); process.exit(143); });

try {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/codex/s08/_test.html`);
      if (response.ok) break;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
    if (attempt === 49) throw new Error(`Range server did not start on ${port}`);
  }

  browser = await chromium.launch({headless: true, channel: 'chrome'});
  const page = await browser.newPage({viewport: {width: 1920, height: 1080}, deviceScaleFactor: 1});
  const errors = [];
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('console', message => {
    if (message.type() === 'error' && !message.text().includes('Failed to load resource')) {
      errors.push(`console: ${message.text()}`);
    }
  });
  page.on('requestfailed', request => {
    if (!request.url().endsWith('/assets/bg-dark-flow.mp4')) errors.push(`requestfailed: ${request.url()}`);
  });

  await page.goto(`${baseUrl}/codex/s08/_test.html`, {waitUntil: 'load'});
  await page.waitForFunction(() => window.sceneReady === true);
  await page.locator('#flow').evaluate(video => new Promise((resolve, reject) => {
    if (video.readyState >= 2) return resolve();
    video.addEventListener('loadeddata', resolve, {once: true});
    video.addEventListener('error', () => reject(new Error('Background video failed to load')), {once: true});
  }));
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({content: `
    html, body { width: 1920px !important; height: 1080px !important; overflow: hidden !important; }
    .review-header, .review-controls { display: none !important; }
    #viewport { position: fixed !important; inset: 0 !important; width: 1920px !important; height: 1080px !important; margin: 0 !important; }
    #stage { transform: none !important; }
  `});

  for (let frame = 0; frame < (titleOnly ? 2 / .8 * fps : frameCount); frame += 1) {
    const time = frame / fps;
    await page.evaluate(t => window.seekScene(t), time);
    await page.waitForFunction(() => {
      const video = document.querySelector('#flow');
      return video && !video.seeking && video.readyState >= 2;
    });
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await page.locator('#stage').screenshot({
      path: path.join(framesDir, `f-${String(frame).padStart(5, '0')}.png`),
    });
    if ((frame + 1) % 30 === 0 || frame === frameCount - 1) {
      console.log(`captured ${frame + 1}/${frameCount} frames`);
    }
  }

  assert.deepEqual(await page.locator('#stage').evaluate(el => [el.clientWidth, el.clientHeight]), [1920, 1080]);
  assert.deepEqual(errors, [], errors.join('\n'));
  await browser.close();
  browser = undefined;
  stopServer();

  const {execFileSync} = await import('node:child_process');
  execFileSync('ffmpeg', [
    '-n', '-hide_banner', '-loglevel', 'error',
    '-framerate', String(fps), '-i', path.join(framesDir, 'f-%05d.png'),
    '-frames:v', String(frameCount),
    '-c:v', 'libx264', '-crf', '13', '-pix_fmt', 'yuv420p',
    '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
    '-an', '-movflags', '+faststart', output,
  ], {stdio: 'inherit'});
  let html = (await readFile(scene, 'utf8'))
    .replace(/— (?:v\d+ )?preview/g, `— v${version} preview`)
    .replace(/\.\.\/output(?:2)?\/s08-s09-strategy-studio(?:-(?:v)?\d+)?\.mp4/g, path.relative(here, output))
    .replace(/(?:v\d+ )?MP4 EXPORTED/g, `v${version} MP4 EXPORTED`);
  await writeFile(scene, html);
  for (const file of ['scene.js', 'scene.css', 'assets/agent-preview.js']) {
    const snapshot = file.replace(/(\.[^.]+)$/, `-v${version}$1`);
    await copyFile(path.join(here, file), path.join(here, snapshot));
    html = html.replace(file, snapshot);
  }
  await writeFile(path.join(outputDir, `s08-s09-strategy-studio-v${version}.html`), html.replace('<head>', '<head><base href="../s08/">'));
  console.log(`wrote ${output} (${( (await stat(output)).size / 1e6).toFixed(1)} MB)`);
} finally {
  if (browser) await browser.close();
  stopServer();
}
