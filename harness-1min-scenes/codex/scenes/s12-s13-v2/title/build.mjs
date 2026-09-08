import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const remotionRequire = createRequire(path.resolve(here, "../../../../remotion/package.json"));
const { build } = remotionRequire("esbuild");

await build({
  entryPoints: [path.join(here, "title.tsx")],
  bundle: true,
  minify: true,
  format: "iife",
  jsx: "automatic",
  tsconfig: path.join(here, "tsconfig.json"),
  define: { "process.env.NODE_ENV": '"production"' },
  outfile: path.join(here, "title.js"),
});

console.log("Built title.js from official @snapcn/text-swap source.");
