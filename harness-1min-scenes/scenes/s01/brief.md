# S01 · Introducing

- Draft timing：0.000 – 1.733 s（1.733 s）
- type：TITLE
- Draft frames：`../../frames/S01a.jpg` / `S01m.jpg` / `S01z.jpg`

## the project owner prompt
（2026-09-06 original wording）

> Project rules  s01
>
> pnpm dlx shadcn@latest add @snapcn/text-reveal
>
>  text Introducing Minara Harness
> Introducing   Minara Harness 
>
> Background
> localoneBackground

## the project owner reference
- snapcn `text-reveal` ：https://snapcn.dev/r/text-reveal.json（Remotion ，"lead word  →  → "）
- Background = local `assets/local-launch-video/scenes/bg-light-flow/`（2026-09-02  WebGL  30 s ，finished video `output/bg-light-flow.mp4`）。 `remotion/public/bg/bg-light-flow.mp4`。

## My interpretation / conflict（followpromptexecution，record）
- **s01 draft S01+S02（0 – 3.667 s）**。prompt "Introducing Minara Harness" bysame asone text-reveal completed，"Introducing" 、"Minara Harness" ，draftTitle。：composition 110  = 3.667 s；"Minara"  =  52  = 1.733 s，draft S01→S02 ，draft。S02  brief " s01"。
- Typography：Geist SemiBold 600（STYLE.md）， woff2；snapcn  fonts.ts  Google Fonts，change tolocal Geist（`remotion/src/lib/snap-cn-ui/fonts.ts`），did not change（ import ）。
- Color：Background（）；text `#0a0a0b`（STYLE §1 ）。Color。
- ： 96 px（ ≈ 69 px ≥ 56 px ）；"Introducing"  2.3× ≈ 221 px。

## Generation log
- 2026-09-06 · started。Remotion workspace created at `../../remotion/`（all scenes shareone node_modules，composition id = scene），S01  `remotion/src/scenes/s01/S01.tsx`。
- 2026-09-06 · **pending review**。deliverable：`output/s01-introducing-minara-harness.mp4`（1920×1080 · 30 fps · 110  = 3.667 s · H.264 crf 13 · ）。preview：`scenes/s01/_test.html`（，← → ）。：`remotion/src/scenes/s01/S01.tsx`（`scenes/s01/src` ）， `cd remotion && pnpm render:s01`。frame inspection：`scenes/s01/render-verification/`（f000 base → f008 Introducing  → f034  → f052 Minara  → f058 Harness  → f064  → f109 ）+ contact-sheet。
  - （）：Introducing  0–8 ·  34 ·  34–50 ·  34–68 · Minara 52–68 · Harness 57–73 ·  73–110（Background）。
  - wait for the project owner ✅ / 🙅。

## 2026-09-07 · Elastic left exit revision
User: “one”. Added a slight right pullback then left slide-out at frames 84–106; timing stays 110 frames. Source, preview and verification: `../../codex/scenes/s01/`. New video: `../../codex/output/s01-introducing-minara-harness-v2.mp4`. Original preserved. Rendered frames inspected; verify.py passes. Ready for review.

2026-09-07 correction: “”. Updated the Codex v2 exit to move directly left without rightward anticipation; same output path and duration.
