# S14 + S15: Portfolio Cards

Status: both double-duration headline variants are exported. Default: `../../output/s14-s15-portfolio-management-aligned-title-2x.mp4`. Alternate: `../../output/s14-s15-autopilot-but-under-control-title-2x.mp4`, exact opening "Autopilot, but under control". Both are 1920x1080, 30fps, 355 frames, 11.833333 seconds, H.264/yuv420p, silent. The original TextSwap title runs at half speed (55 to 110 frames); product choreography is unchanged between variants. Title/per-frame tab assertions and encoded contact-sheet review passed. Preview alternate with `_test.html?title=autopilot`; export with `node render.mjs --autopilot`. All earlier MP4s are preserved; renderer refuses to overwrite existing output.

## User Request

> storyboard Project rules
>
> s14  s15 work together
>
> asset allocationslide across
> assets perpetualsperformance cards spotperformance cards   3   portfolio 
> portfolioreferencerealUI
> cursor demonstratesspot tab perps tab strategies tab click behavior assets Allmockdata  five-digit or larger 
>
> gray-white flowing-light background
>
> UIUI GSAP minaraMotion
>
> keep the product believable and usable in the video、interactions should also work as real interactions
>
> show me a test page for approval first render
>
> claude  ./claude
>
> codex  ./codex
>
> use this template for every large-title entrance pnpm dlx shadcn\@latest add @snapcn/text-swap Motion
>
> Motion do not ignore the template I provided

## Timing And Interpretation

- Original master range 45.933-53.633s, 231 frames, 7.700 seconds at 30 fps, 1920x1080. The master timeline is unchanged.
- Latest preview is 10.000 seconds / 300 frames. This is a review extension, not a change to master timecodes.
- User-corrected headline: "Portfolio management, aligned." This explicitly replaces the previous S14 wording.
- 0.00-1.833s: one regular-weight title line uses the actual official TextSwap component, with fly-through entrance and 18-sample shutter exit.
- From 1.833s: 30 DOM cards travel right-to-left in three category rows. Each whole card gently dissolves over 0.4s, finishing 48px beside its own word's right edge. There is no vertical mask or center stack.
- 3.25-3.80s: the whole card field fades while still moving, approximately halfway through its planned run. The preview does not wait for every card to pass.
- 3.80-6.24s: the desktop shell and DOM/SVG components enter independently. Between 4.20 and 5.70s the three large words move, recolor and scale to the actual tab labels. At 5.70s real interactive buttons take over. No card flies away and no client mask expands.
- Clicks at 6.50 / 7.60 / 8.70s: Spot, Perps, Strategies. Each actual tab view has its own component entrance, shared by manual tab clicks. Preview offers 0.5x/0.25x, chapter jumps and direct interaction.
- User's explicit Portfolio prompt governs the S15 product action even though the older storyboard describes trade history/learning.

## Assets And Template Provenance

- Ten supplied references are preserved as `../../references/s14-s15-01.png` through `s14-s15-10.png`. 01-06 inform card choreography; 07-10 inform Portfolio geometry and state. No reference image is loaded by the runtime.
- Actually ran `pnpm dlx shadcn@latest add @snapcn/text-swap --yes` in this directory; it succeeded and created `components/snap-cn/text-swap.tsx` plus the seven upstream core files.
- `title.tsx` imports and renders that installed component directly. Only component adaptations: use the local theme import with preloaded Geist instead of the remote-font barrel; zero letter spacing. Motion defaults, easing, perspective scale and shutter sampling are retained.
- Local Geist and grey-white flowing background reuse `../../assets/`. GSAP and CustomEase reuse `../s10/assets/`.
- Financial asset logos reuse the existing local `../s04-s05/assets/logos/` assets. The standalone portrait is the existing official-avatar asset from S04/S05, copied to `assets/avatar.png`, not an extracted UI screenshot. No Minara logomark/wordmark is introduced.
- Navigation and tool icons are generated from the installed Lucide package by `build.mjs`.

## Data And Interactions

All figures are fixed, local demonstration data. Initial total $386,742.80 = Spot $231,842.20 + Perps $154,900.60. Spot holdings each exceed $10,000. Perps unrealized PnL $34,320.50 is computed from position sizes, entry and mark prices.

The preview supports play/pause/replay, speed, scrubbing, chapter jumps, fullscreen, keyboard tab navigation, wallet switching, Portfolio views, record subtabs, chart periods, row details, strategy pause/resume, and local demo deposit/withdraw/transfer. Replaying or scrubbing restores original data after manual changes. No product APIs or real financial actions.

## Verification

Latest revision: `node build.mjs` rebuilt the actual TextSwap bundle with three additional category Players. `node verify-motion.mjs` passed actual-GSAP checks for 30 continuously scrolling cards, disappearance before the client, label-to-tab handoff, component staggering and reverse seeking. The same check verifies 30 distinct deterministic mock curves with meaningful pullbacks. `verification/curve-atlas.png` is a standalone SVG raster review of curve geometry, not a full-page browser screenshot.

Browser access to the existing local file was denied by URL policy, so this revision has not been full-page screenshot-verified. No alternate browser navigation was used to bypass that restriction.

`node verify.mjs` is the existing full browser check, updated to the new timing but not rerun for this revision. Existing screenshots and `verification/checks.json` describe V1 only.

## Latest User Feedback

- "  "
- " AllUI oneone"
- " Motion "

Follow-up revision:
- " "
- Three large left words: Spot / Perps / Strategies. More cards scroll beneath them, then all cards disappear, the client appears, the words transform to tabs, and the cursor clicks them.
- ""

This supersedes the previous central stack entirely. Curve data now uses 30 distinct mock regimes with irregular seeded intraperiod fluctuations; the large Portfolio chart uses the same family of mock paths and ends at the account balance. Metrics, returns, action buttons, row names, ticker and inactive tabs use regular weight; total balance and the active main tab retain emphasis. The original headline and real local interactions are unchanged.

Latest corrections: "" replaces the card mask with per-card opacity; "do not usewait for " adds the halfway group fade and advances the client sequence by 1.4s; " Portfolio management, aligned." supersedes the previous headline. Build and motion checks passed. Current-version MP4 exported and encoded frames visually reviewed; see `render-verification/render.json` and `render-verification/contact-sheet.jpg`.

No MP4 has been produced. Next step: the project owner reviews `_test.html`; rendering remains gated on her confirmation.

Final visual caveat: GPU-enabled headless Chrome intermittently drops text on repeated seeks/captures. Software rasterization and a fresh direct seek showed complete UI. Native in-app checking was blocked by its local-file URL policy. See `verification/visual-review.md`; automated interaction assertions passed, but this native-browser paint behavior remains unverified. A future authorized capture should use software rasterization and inspect encoded frames.
