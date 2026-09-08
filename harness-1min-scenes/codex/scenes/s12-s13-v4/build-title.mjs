import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.resolve(here, '../../../remotion/package.json'));
await require('esbuild').build({
  entryPoints: [path.join(here, 'title.tsx')],
  bundle: true, minify: true, format: 'iife', jsx: 'automatic',
  tsconfig: path.resolve(here, '../s12-s13-v2/title/tsconfig.json'),
  nodePaths: [path.resolve(here, '../s12-s13-v2/title/node_modules')],
  define: {'process.env.NODE_ENV': '"production"'},
  outfile: path.join(here, 'title.js'),
});
