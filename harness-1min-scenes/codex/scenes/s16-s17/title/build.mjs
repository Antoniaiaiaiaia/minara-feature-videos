import {createRequire} from "node:module";
import {fileURLToPath} from "node:url";
import path from "node:path";
import {mkdir} from "node:fs/promises";

const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.resolve(here, "../../../../remotion/package.json"));
const {build} = require("esbuild");

await mkdir(path.join(here, "assets"), {recursive: true});
await build({
  entryPoints: [path.join(here, "title.tsx")],
  bundle: true,
  minify: true,
  format: "iife",
  jsx: "automatic",
  tsconfig: path.join(here, "tsconfig.json"),
  define: {"process.env.NODE_ENV": '"production"'},
  nodePaths: [path.join(here, "../../../../remotion/node_modules")],
  outfile: path.join(here, "assets/title.js"),
});
console.log("Built official @snapcn/text-swap title bundle. No video render.");
