# S03 · v5 · three seconds

the project owner: “one3”. New destination: all outputs under `codex/output2/` starting 2026-09-08.

Output: `../../output2/s03-product-reveal-v5.mp4`; preview: `_test-v5.html`.

The approved v4 lossless PNG master is uniformly retimed from frame 0…317 to 0…89. All stages remain: Office assembly → four-agent research → strategy workspace → immediate accelerating left exit → white background. Exact encoded duration 3.000s, 1920×1080, 30fps, 90 frames, H.264 CRF13, no audio. The tail is padded before frame-rate conversion so the white final frame survives resampling.

Verified via FFprobe assertions and actual encoded contact-sheet inspection. Final RGB sample is white. Evidence: `render-verification/render.json`, `render-verification/contact-sheet.png`. Render: `node codex/scenes/s03-v5/render.mjs`. Earlier versions unchanged.
