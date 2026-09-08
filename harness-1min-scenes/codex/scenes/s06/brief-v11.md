# S06 + S07 v11 — drag the running workflow

User request: make the ending less static by showing the mouse dragging the workflow.

- Entry: `_test-v11.html`; source: `index-v11.html`, `scene-v11.js`. v10 is preserved. Total duration remains 18.65s; final client exit remains 17.65–18.65s.
- During the Workflow hold, the cursor approaches the blank canvas, presses, pans the graph left/up, pulls slightly back, and releases. GSAP drives the movement. Nodes, connectors, light pulses and grid move together; client chrome and canvas controls stay fixed. Light flow continues throughout.
- Real pointer dragging uses pointer capture and the stage scale to move the same graph. Timeline seeking resets the manual offset. No account connection or live trading behavior is involved.
- `verify-v11.mjs` passed: automatic pan displacements, node/connector alignment, static client bounds, light movement, reversible seeking and real mouse drag of +80/−20 screen pixels. Screenshot inspected; original input/confirmation path and duration checks passed.
- Preview only; no v11 MP4 rendered. Future approved exports go to `../../output2/`.
