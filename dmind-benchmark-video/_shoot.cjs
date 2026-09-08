const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const GSAP = fs.readFileSync(require.resolve('gsap/dist/gsap.min.js'), 'utf8');
const PROJ = __dirname;

// scene file -> array of timestamps
const JOBS = {
  'scene1.html': [2.5, 7.6, 11.2],
  'scene2.html': [1.6, 6.8, 12.0],
  'scene3.html': [3.0, 7.6, 13.0, 18.2],
};

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const outDir = path.join(PROJ, '_shots');
  fs.mkdirSync(outDir, { recursive: true });

  for (const [file, times] of Object.entries(JOBS)) {
    let html = fs.readFileSync(path.join(PROJ, file), 'utf8');
    // inline gsap (replace CDN script tag)
    html = html.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/gsap[^"]*"><\/script>/,
      '<script>' + GSAP + '</script>');
    const tmp = path.join(PROJ, '_shot_' + file);
    fs.writeFileSync(tmp, html);
    await page.goto('file://' + tmp, { waitUntil: 'load' });
    // poll for timeline
    let ok = false;
    for (let i = 0; i < 40; i++) {
      await page.waitForTimeout(200);
      ok = await page.evaluate(() => !!(window.__timelines && window.__timelines.root));
      if (ok) break;
    }
    if (!ok) { console.log('NO TIMELINE', file); continue; }
    await page.waitForTimeout(600); // let fonts settle
    for (const t of times) {
      await page.evaluate((tt) => { const tl = window.__timelines.root; tl.pause(); tl.time(tt); }, t);
      await page.waitForTimeout(180);
      const name = file.replace('.html', '') + '_t' + String(t).replace('.', '_') + '.png';
      await page.screenshot({ path: path.join(outDir, name) });
      console.log('shot', name);
    }
    fs.unlinkSync(tmp);
  }
  await browser.close();
})();
