# S06 + S07 v10 — Workflow hold and running light

User revision: remove the final Portfolio page, keep the duration unchanged, extend the Workflow hold, and show light passing between nodes while the layout holds.

- Preview: `_test-v10.html`; source: `index-v10.html`, `scene-v10.js`. Total remains 18.65 seconds. Opening close-up, research, floating confirmation and client reveal retain v9 timing. Final left exit remains 17.65–18.65 seconds.
- Portfolio markup, its entrance tracks, View position button and automatic click are removed. Workflow stays visible through the former Portfolio interval.
- Three SVG light segments follow the existing connectors from left to right, with glow and staggered phases. Their positions derive from the same seekable scene clock; they continue during the hold and reset correctly on backward seeking. The run badge stays Running, with elapsed time. The filled transaction result remains visible.
- Verification: `node codex/scenes/s06/verify-v10.mjs` passed; screenshot inspected. Checks include unchanged duration, no Portfolio DOM, continuous Workflow visibility, light movement and reversible phases, direct input close-up, review/cancel/confirm and final exit. Evidence in `verification-v10/`.
- Rendering approved and completed 2026-09-08: `../../output2/s06-s07-execution-exit-v10.mp4`, 1920×1080, 30 fps, 560 frames / 18.666667 seconds, silent H.264. Renderer: `render-v10.mjs`. FFprobe checks passed; encoded contact sheet, two light-flow phases and cleared final frame visually inspected. Evidence: `verification-v10/render.json`, `encoded-contact-sheet.jpg`, `encoded-flow-check.jpg`. Revert by opening `_test-v9.html`.
