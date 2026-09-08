# S03 · Continuous desktop showcase · v4

Status: approved for render and exported on 2026-09-07. All files are under codex/. Prior versions retained.

the project owner explicitly requested “render”. Export: `../../output/s03-product-reveal-v4.mp4` — 1920×1080 / 30fps / 318 frames / 10.600s / H.264 CRF13 / no audio. Render completed without browser errors; FFprobe assertions passed and actual encoded key frames plus white ending inspected. Evidence: `render-verification/contact-sheet.png`, `render-verification/render.json`. Reproduce with `node codex/scenes/s03-v4/render.mjs`; existing output is protected against overwrite.

## the project owner’s instructions

  Duration

Latest expansion:


switching

agent （references04s05）
agent（reference）


## Implementation

- Preserve white stage and oversized 1.62× desktop framing; redraw Office as DOM/SVG. Reference screenshot `references/framing.png` is measurement only. Portrait is the existing standalone avatar from S04/S05, not a screenshot crop.
- Keep the previous slower entrance feel. The client translates continuously left at 75 stage pixels/second after entry. No stationary intermediate segment or cross-page camera reset.
- Office: 0–3.67s. Tab-level stagger, headline/composer/cards assembled in sequence.
- Research: 3.67–7.35s. Reuses Rhea, Atlas, Noor, Sable, their existing illustrative dialogue, offline nice-avatar markup and scroll behavior. The actual four-agent discussion is in `codex/scenes/s06/team-v8.js`; S04/S05 itself is asset/orbit/order footage, so the matching existing research component was selected.
- Strategy: 7.35–9.15s. Snapshot of existing S08/S09 v3 workspace markup, CSS and illustrative code. No new strategy algorithm, real backtest or trading connection. Sidebar selection and breadcrumb follow the active page.
- At exactly 9.15s the last strategy element finishes generating and the whole client starts its accelerating left exit, retaining its incoming drift velocity. Clears the frame at 10.55s; white ending through 10.60s.
- The latest expanded three-page request replaces the preceding request to merely shorten the single-page scene. Preview duration 10.6s, 318 frames at 30fps; master storyboard timecodes are untouched.

## Files and verification

- Preview: `_test-v4.html`; source: `template.html`, `scene.js`, `scene.css`; version snapshots: `strategy.css`, `strategy-data.js`, `research.css`, `assets/`.
- `node codex/scenes/s03-v4/build.mjs` snapshots existing S08 content and builds the static HTML. No server or build is required to view the delivered page.
- `node codex/scenes/s03-v4/verify.mjs`: local browser 1600×1000, seven screenshots, continuous left position at 30fps, immediate exit at assembly end, white ending, page-nav interaction, reversible research scroll, no screenshot textures or remote assets, no runtime errors.
- Preview was approved by the subsequent explicit render request. MP4 is now available at `codex/output/s03-product-reveal-v4.mp4`.
