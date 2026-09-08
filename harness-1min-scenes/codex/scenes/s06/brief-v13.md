# S06 + S07 v13 — zoom, then drag

User revision: zoom the workflow before dragging it. Entry `_test-v13.html`; source `index-v13.html`, `scene-v13.js`. v12 bubble-width fix retained; total 18.65s and final left exit unchanged.

The cursor clicks the real + control at 15.10s. The graph zooms to 1.22×, then the pointer moves onto the canvas, presses and drags. Nodes, connectors, light pulses and grid transform together. The +, − and fit controls also work manually; native pointer dragging remains available.

`verify-v13.mjs` passed: + hit target, zoom completes before pan begins, 1.22× scale throughout dragging, stable client bounds, actual zoom/drag/fit interaction and reversible seeking. Screenshots inspected in `verification-v13/`.

Rendering approved and completed 2026-09-08: `../../output2/s06-s07-execution-exit-v13.mp4`, 1920×1080, 30 fps, 560 frames / 18.666667s, silent H.264. Reproduce with `render-v13.mjs`. FFprobe checks and encoded contact-sheet inspection passed, including bubble width, zoom before drag, ongoing light and fully cleared exit frame. Evidence: `verification-v13/render.json` and `encoded-contact-sheet.jpg`.
