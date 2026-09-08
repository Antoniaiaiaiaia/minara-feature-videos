import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url));
const require=createRequire(path.join(here,'../..','remotion/package.json'));
const {build}=require('esbuild');
await build({entryPoints:[path.join(here,'source/agent-preview.tsx')],bundle:true,minify:true,format:'iife',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},nodePaths:[path.join(here,'../../remotion/node_modules')],outfile:path.join(here,'assets/agent-preview.js')});
