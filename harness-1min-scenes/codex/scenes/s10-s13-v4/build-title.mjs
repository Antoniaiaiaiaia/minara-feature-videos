import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url));
const runtime=path.resolve(here,'../../../remotion');
const {build}=createRequire(path.join(runtime,'package.json'))('esbuild');
await build({entryPoints:[path.join(here,'source/title-preview.tsx')],bundle:true,minify:true,
 format:'iife',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},
 nodePaths:[path.join(runtime,'node_modules')],alias:{'@/lib/snap-cn-ui':path.join(here,'source/snap-core.ts')},
 outfile:path.join(here,'assets/title-preview.js')});
