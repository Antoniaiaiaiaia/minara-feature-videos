# S04/S05 v2 — portfolio to execution

Preview: `_test.html`. Run `node verify.mjs` for the browser check.

Latest user revision replaces the spiral with a curved asset-card wall, a slow camera pullback, “Build me a better portfolio”, the approved green Signal overlay and a notification chime, then six one-second order cuts: NVDA, CL, BTC, GOLD, SNDK, HOOD.

Timing: opening 0–2.02s (same opening duration); composer 2.02–4.5s; signal wall 4.5–6.5s; orders 6.5–12.5s. A timing question was sent because the screenshot's six cuts are shorter than the explicit six × one-second instruction. User said “continue”; current interpretation preserves opening duration and honors six full seconds for orders. Total 375 frames at 30fps. This version is preview-only and awaits approval before rendering.

Reuses the approved v1 assets through a relative assets symlink, Minara confirmation fields from S06, and GSAP Minara / prompt-send curves. The 50 wall assets are distinct: 15 crypto, 35 US equities/futures. Logos have no added tile, border or background. SNDK uses unchanged source foreground SVG paths with its red background rectangle removed. `signal.wav` is an original 0.62s PCM two-note chime, played once at 5.02s. Future rendering must mix it at that exact timeline offset. No trading or account API is called; all prices, confirmations and fills are local illustrative states.

Verification: 13 headless screenshots at 1600×1000, source identity counts, six assets and filled states, deterministic reverse seeking, real textarea/send interaction, confirmation button and local audio/image decoding pass. Root agent inspected the asset wall, pullback, full prompt, signal overlays and filled-order screen. Original preview and exported MP4 remain untouched.

To revert, use the unchanged `../s04-s05/_test.html` and its existing output MP4.
