# S21 + S22 · Soft brand reveal · v1

Status: approved and rendered, 2026-09-07, after explicit “render”. Output: `../../output/s21-s22-soft-brand-v1.mp4` — 1920×1080 / 30fps / 300 frames / 10.000s / silent H.264 CRF13 / 6.6MB. Animation unchanged. Scene `render.mjs` reuses the browser PNG → FFmpeg pipeline. FFprobe assertions passed; encoded contact sheet and final frame inspected in `render-verification/`.

## Request, 2026-09-07

one10brand 

logo  logo
projectgeneralgray-white flowing-light background

logo
minara.ai 
onetest page

Reference: user supplied `Minara Logo Text-Light Mode.png`, copied unchanged into assets/minara-logo.png. This explicit asset choice takes precedence over the older global logo list.

## Implementation

- `_test-v1.html`: finite, reversible GSAP timeline and local player.
- Existing project gray-white light-flow video and Geist font reused.
- 0.15–5.71s: three soft concentric circular waves expand from the center and dissipate.
- 0.85–3.60s: feathered mask travels left to right as the original logo resolves from blur.
- 3.60–5.70s: logo holds completely still.
- 5.70–7.10s: logo blurs and dissolves.
- 7.05–9.05s: minara.ai slowly resolves; final hold until 10.00s.

The explicit 10-second request overrides the original S21/S22 total of 4.317s. Master cut timecodes are preserved pending integration. All work is isolated in this Codex scene directory.

Revert: use the prior storyboard entries; this is an additive scene preview.
