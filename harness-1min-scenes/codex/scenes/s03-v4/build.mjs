// Snapshot the already reviewed strategy DOM and illustrative code into this version.
import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url));
const source=readFileSync(path.join(here,'../../s08/_test-v3.html'),'utf8');
const workspace=source.slice(source.indexOf('<section id="workspace">'),source.indexOf('<div id="cursor"'));
const defs=source.slice(source.indexOf('<svg class="svg-defs"'),source.indexOf('</main>'));
const template=readFileSync(path.join(here,'template.html'),'utf8');
writeFileSync(path.join(here,'_test-v4.html'),template.replace('<!-- STRATEGY -->',workspace+defs));
const js=readFileSync(path.join(here,'../../s08/scene-v3.js'),'utf8');
const fn=js.slice(js.indexOf('function codeSource()'),js.indexOf('function updateCode()'));
if(!fn.includes('return ['))throw Error('Existing strategy code source not found');
writeFileSync(path.join(here,'strategy-data.js'),`// Existing illustrative S08/S09 UI content; no execution or trading API.\nconst selectedAssets=new Set(['NVDA','AMD','AVGO','MU']);\n${fn}`);
