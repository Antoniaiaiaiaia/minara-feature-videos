# S04 + S05 · V11

Based on V10. Approved and rendered.

Order placed now uses the same full-card translucent Minara green as Signal, with a centered check and readable order label. Original card details remain visible beneath the overlay.

Signal entrance: 0.24 → 0.48 seconds. Order entrance: 0.22 → 0.44 seconds. Order onset is delayed by 0.24 seconds so the slower Signal entrance completes first. Cue staggering and all 80 signals / 60 orders remain.

Total duration remains 9.5 seconds. Signal/order wall remains 4.5–7.5 seconds; wall fade starts at 7.5 and trade history retains the final two seconds. Opening, composer, logos and silence are unchanged.

Validation: node verify.mjs passed. Headless browser screenshots inspected; full-card green matches Signal, all 60 orders complete by 7.3 seconds, final 14 history rows fit, reverse seek deterministic, no page errors or audio. Timing assertions confirm the two entrance curves play at half speed.

Preview: _test.html?t=6.2
Render: node render.mjs → ../../output2/s04-s05-signal-wall-history-v11.mp4
Revert: use unchanged s04-s05-v10.

Render verified: output2/s04-s05-signal-wall-history-v11.mp4; 1920×1080, H.264, 30fps, 285 frames, 9.5s, silent. Render contact sheet inspected; no browser errors.
