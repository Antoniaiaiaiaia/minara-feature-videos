// Reuse v4's research DOM/assets, removing both other pages from this snapshot.
import {readFileSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const read=name=>readFileSync(path.join(here,'../s03-v4',name),'utf8');
let html=read('_test-v4.html');
html=html.slice(0,html.indexOf('<section id="office-page"'))+html.slice(html.indexOf('<section id="research"'));
html=html.slice(0,html.indexOf('<section id="strategy-page"'))+html.slice(html.indexOf('<div id="market-tape"'));
html=html.replaceAll('v4','v6').replace('Continuous desktop showcase','Multi-agent research').replace('Office → Research team → Strategies','Multi-agent research · 3 seconds').replace('max="10.6"','max="3"').replace('<span id="page-label">Office</span>','<span id="page-label">Chat</span>').replace('<script src="strategy-data.js"></script>','').replace('<script src="scene.js"></script>','<script src="research-setup.js"></script><script src="scene.js"></script>');
const chapterStart=html.indexOf('<nav id="chapters">'),chapterEnd=html.indexOf('</nav>',chapterStart)+6;
html=html.slice(0,chapterStart)+'<nav id="chapters"><button data-time="0.5">Research team</button><button data-time="1.5">Discussion</button><button data-time="2.3">Completed</button><button data-time="2.7">Exit</button></nav>'+html.slice(chapterEnd);
writeFileSync(path.join(here,'_test-v6.html'),html);
const source=read('scene.js');
let setup=source.slice(0,source.indexOf('const escapeHTML='));
setup=setup.replace('const DURATION=10.6, RESEARCH=3.67, STRATEGY=7.35, EXIT=9.15, EXIT_DURATION=1.4;','const DURATION=3, EXIT=2.35, EXIT_DURATION=.6;');
writeFileSync(path.join(here,'research-setup.js'),setup);
let render=read('render.mjs').replace(/\bv4\b/g,'v6').replace('../../output/','../../output2/').replaceAll('318','90').replace('10.600s','3.000s').replaceAll('10.6','3').replace('[21,102,160,210,267,291,310,317]','[5,15,30,45,60,70,81,89]');
// Per-frame assertions guard against accidentally reintroducing either removed page.
render=render.replace("assert.deepEqual(errors,[]);", "assert.equal(await page.locator('#office-page,#strategy-page').count(),0);\n assert.equal(await page.evaluate(()=>scene.state.page),'Chat');\n assert.deepEqual(errors,[]);");
writeFileSync(path.join(here,'render.mjs'),render);
