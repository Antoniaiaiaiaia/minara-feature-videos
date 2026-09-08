# S06 + S07 v8 — floating review and confirmation

User request: click the order card directly in the floating conversation, without waiting for the client to be rebuilt. Show the confirmation dialog directly on the stage. After confirmation, reveal the client and workflow together, then exit left.

- Entry: `_test-v8.html`; source: `index-v8.html`, `scene-v8.js`, `team-v8.js`. Reuses v7 layout CSS and official react-nice-avatar assets. Earlier versions preserved.
- Card remains inside the conversation stream; there is no card transfer or intervening native chat/composer reconstruction. Review clicks at 13.65s. The stage-level confirmation opens at 13.70s; Confirm clicks at 15.10s. Client chrome and workflow begin appearing together at 15.35s.
- Existing result and portfolio update remain in sequence; all downstream timing advances 1.60s. Final client left exit: 19.95–20.95s. Total: 20.95s.
- `node codex/scenes/s06/verify-v8.mjs` passed: screenshots inspected; shell absent at Review/confirmation, simultaneous workflow/client entrance, live Review → Cancel → Review → Confirm, deterministic seeking and final exit. No runtime errors.
- the project owner approved rendering on 2026-09-07. Export: `../../output/s06-s07-execution-exit-v8.mp4`, H.264, 1920×1080, 30 fps, 629 frames / 20.966667s, silent. Reproduce with `render-v8.mjs`. FFprobe checks passed; actual encoded contact sheet inspected, including floating confirmation and fully cleared final frame. Evidence: `verification-v8/render.json` and `encoded-contact-sheet.jpg`. Revert by opening `_test-v7.html`.
