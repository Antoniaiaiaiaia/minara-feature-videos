# S14 + S15 Portfolio Preview

Static HTML scene preview combining asset cards and a redrawn Portfolio client. Open `_test.html` directly; no server is required. All product data is local mock data.

`scene.js` owns the deterministic 10-second review timeline and local interactions. Master timecodes remain unchanged. `scene.css` sets the reference geometry and restrained typography. `title.tsx` renders the installed snapcn TextSwap for "Portfolio management, aligned." plus three category words. `build.mjs` bundles the title and Lucide icons using the existing parent Remotion toolchain. Rebuild with `node build.mjs`; the narrow motion/curve check is `node verify-motion.mjs`.

The public seek entry is `window.scene.seek(seconds)`, which updates both GSAP and Remotion title frames, derived tabs, and the background video. A future capture must call this entry and wait for the video seek and React frame to finish. Seeking GSAP alone does not update the full scene.

Do not use supplied screenshots as UI textures. Keep all runtime fonts and assets local. Preserve the user-corrected headline and restore baseline demo data when leaving manual mode. Thirty cards scroll in three category rows and individually dissolve beside their own words, without a vertical mask. The entire moving field fades at 3.25-3.80s, without waiting for the full run. The client appears at 3.80s; category Players move and scale to actual tabs, handing over at 5.70s. Clicks are at 6.50/7.60/8.70s. No center stack or expanding client mask.

`chartProfiles` and `chartValues` provide distinct deterministic mock paths with consolidation, drawdowns and irregular fluctuations. Do not replace them with a shared linear/sinusoidal ramp. Typography keeps regular weight for secondary financial figures and controls, reserving semibold for the account total and selected tab.

Tab content is replaced by `renderPanel`, which recreates its component timeline. `sync` seeks that timeline relative to the current click; manual tab clicks play the same entrance. Warm both local font weights with the Font Loading API; cross-origin preload links fail for direct file previews.

The existing `verify.mjs` browser check has updated timing but was not rerun for this revision because browser URL policy denied the local page. V1 screenshots are historical, not evidence of the current UI. Do not bypass a browser policy denial through another navigation channel.

The user must approve the preview before any video export. No live accounts, APIs, or financial operations.
