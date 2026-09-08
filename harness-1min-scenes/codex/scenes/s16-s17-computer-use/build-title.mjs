import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url));
const registry=path.resolve(here,'../s16-s17-beyond-finance/title');
const require=createRequire(path.resolve(here,'../../../remotion/package.json'));
await require('esbuild').build({entryPoints:[path.join(here,'title.tsx')],bundle:true,minify:true,format:'iife',jsx:'automatic',tsconfig:path.join(registry,'tsconfig.json'),define:{'process.env.NODE_ENV':'"production"'},nodePaths:[path.join(registry,'node_modules'),path.resolve(here,'../../../remotion/node_modules')],outfile:path.join(here,'assets/title.js')});
console.log('Built both actual Snapcn TextSwap titles and AnswerStream helpers. No video render.');
