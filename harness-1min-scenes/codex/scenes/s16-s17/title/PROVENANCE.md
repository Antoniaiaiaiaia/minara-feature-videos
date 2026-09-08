# S16 + S17 title provenance

- Registry command: `pnpm dlx shadcn@latest add @snapcn/text-swap --yes`
- Command result: successful; generated the official `components/snap-cn/text-swap.tsx` and `lib/snap-cn-ui/*` registry files.
- Files: `components/snap-cn/text-swap.tsx`, `lib/snap-cn-ui/*`, `title.tsx`, `build.mjs`, `_test.html`, `scene.css`, local `assets/Geist-Regular.woff2`, local `assets/Geist-SemiBold.woff2`.
- Adaptation: kept the registry component source and motion logic; changed only font resolution to the local `Geist` face backed by the vendored Geist files, and used the local `@/*` path resolver.
- Runtime: static IIFE bundle at `assets/title.js`; transparent 1920×1080 Remotion Player, no autoplay, controls, audio, or network requests.
- Build command: `pnpm build`.
