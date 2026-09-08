# S03 v6 · Multi-agent only · 3 seconds

Export completed 2026-09-08. Actual encoded contact sheet inspected: only Chat/multi-agent content; Office and strategy pages absent; final frame white. FFprobe confirms exactly 3.000000s / 90 frames / 1920×1080 / 30fps. Runtime assertions passed with no browser errors.

the project owner: “the opening does not need to show this entry strategy screen show only multi agent regenerate directly”. The request explicitly authorizes regeneration/export.

Office landing and strategy workspace removed from the delivered DOM and animation. The same desktop shell now shows Chat / Trading research team throughout: four agents, six successive research messages, continuous left drift, then immediate group exit when the final message finishes. No intermediary page or stationary pause.

Timeline: research generation 0–2.35s; accelerating left exit 2.35–2.95s; white ending through 3.00s. 1920×1080 / 30fps / 90 frames / silent H.264. Fixed illustrative dialogue reused from v4, no real account/trading actions.

Preview `_test-v6.html`; output `../../output2/s03-product-reveal-v6.mp4`. `build.mjs` snapshots only the required v4 layout/setup into this version; prior files are unchanged. `node codex/scenes/s03-v6/render.mjs` renders and checks metadata, missing Office/strategy DOM, Chat state and browser errors. Encoded frame evidence in `render-verification/`.
