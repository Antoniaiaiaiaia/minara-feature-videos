# S18 + S19 title provenance

- Registry command: `pnpm dlx shadcn@latest add @snapcn/text-swap --yes`
- Command result: successful; generated the official `components/snap-cn/text-swap.tsx` and `lib/snap-cn-ui/*` registry files.
- Files: `components/snap-cn/text-swap.tsx`, `lib/snap-cn-ui/*`, `title.tsx`, `build.mjs`, `PROVENANCE.md`.
- Adaptation: preserved the generated TextSwap component and animation source; changed only the font resolver to the local `Geist` CSS family supplied by the host page.
- Runtime: static IIFE bundle at `codex/scenes/s18-s19/title/assets/title.js`; transparent 1920×1080 Remotion Player, paused, 30 fps, 55 frames, no audio or network requests.
- API: `window.S18Title={ready:true,seek(frame):Promise<void>}` mounted into `#headline-root`.
- Build command: `pnpm build`.
