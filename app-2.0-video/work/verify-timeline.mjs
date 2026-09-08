import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const project = fileURLToPath(new URL('../', import.meta.url));
const downloadPath = path.join(project, 'work', 'timeline-editor-test-downloads');
const screenshotPath = path.join(project, 'work', 'timeline-editor-verification.png');
fs.mkdirSync(downloadPath, { recursive: true });
for (const name of fs.readdirSync(downloadPath)) fs.rmSync(path.join(downloadPath, name));

const debugEndpoint = process.env.BROWSER_DEBUG_URL;
if (!debugEndpoint) throw new Error('Set BROWSER_DEBUG_URL to the local browser debugging endpoint');
const targets = await fetch(`${debugEndpoint}/json/list`).then(r => r.json());
const target = targets.find(item => item.type === 'page' && item.url.includes('app2-timeline-editor.html'));
if (!target) throw new Error('Timeline page not found');

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, { once: true });
  ws.addEventListener('error', reject, { once: true });
});

let id = 0;
const pending = new Map();
ws.addEventListener('message', ({ data }) => {
  const msg = JSON.parse(data);
  if (!msg.id || !pending.has(msg.id)) return;
  const { resolve, reject } = pending.get(msg.id);
  pending.delete(msg.id);
  msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const callId = ++id;
  pending.set(callId, { resolve, reject });
  ws.send(JSON.stringify({ id: callId, method, params }));
});
const evaluate = async expression => {
  const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

await send('Page.enable');
await send('Runtime.enable');
await send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath });
await wait(500);

const initial = await evaluate(`(() => ({
  title: document.title,
  cues: document.querySelectorAll('.cue-block').length,
  scenes: document.querySelectorAll('.scene-block').length,
  previewLoaded: document.querySelector('#previewImage')?.complete,
  cueStart: 15.533,
  rect: (() => { const r = document.querySelector('[data-id="c06"]').getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height}; })()
}))()`);
if (initial.cues !== 30 || initial.scenes !== 8 || !initial.previewLoaded) throw new Error(`Bad render: ${JSON.stringify(initial)}`);

const x = initial.rect.x + initial.rect.w / 2;
const y = initial.rect.y + initial.rect.h / 2;
await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: x + 28, y, button: 'left', buttons: 1 });
await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: x + 28, y, button: 'left', clickCount: 1 });
await wait(300);
const moved = await evaluate(`JSON.parse(localStorage.getItem('minara-app2-storyboard-timeline-v01')).cues.find(x => x.id === 'c06').start`);
if (moved <= initial.cueStart) throw new Error(`Drag did not persist: ${initial.cueStart} -> ${moved}`);

await send('Page.reload', { ignoreCache: true });
await wait(700);
const reloaded = await evaluate(`JSON.parse(localStorage.getItem('minara-app2-storyboard-timeline-v01')).cues.find(x => x.id === 'c06').start`);
if (reloaded !== moved) throw new Error(`Reload lost edit: ${moved} -> ${reloaded}`);

await evaluate(`document.querySelector('#exportSrtBtn').click(); document.querySelector('#exportJsonBtn').click(); true`);
await wait(800);
const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
fs.writeFileSync(screenshotPath, Buffer.from(shot.data, 'base64'));

await evaluate(`localStorage.removeItem('minara-app2-storyboard-timeline-v01'); location.reload(); true`);
await wait(700);
const restored = await evaluate(`(() => {
  const r = document.querySelector('[data-id="c06"]').getBoundingClientRect();
  const timeline = document.querySelector('#timeline').getBoundingClientRect();
  return Math.round(((r.left - timeline.left) / Number(document.querySelector('#zoomRange').value)) * 1000) / 1000;
})()`);
if (Math.abs(restored - initial.cueStart) > .001) throw new Error(`Initial state not restored: ${restored}`);

const downloads = fs.readdirSync(downloadPath).sort();
const srt = fs.readFileSync(path.join(downloadPath, 'app2.0-video-script-v02-edited.srt'), 'utf8');
const json = JSON.parse(fs.readFileSync(path.join(downloadPath, 'app2.0-video-storyboard-timeline-v01.json'), 'utf8'));
if ((srt.match(/-->/g) || []).length !== 30 || json.cues.length !== 30 || json.scenes.length !== 8) throw new Error('Export validation failed');

console.log(JSON.stringify({ initial, moved, reloaded, restored, downloads, screenshotPath }, null, 2));
ws.close();
