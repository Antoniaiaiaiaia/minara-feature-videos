# S12 + S13 · Autopilot · v2

Status: interactive test page ready; awaiting the project owner's approval. No video rendered.

## the project owner's request · 2026-09-07

storyboard Project rules

s12  s13 work together

Autopilot\
Where your profits flow.

autopilotboard all components grow one by one

walletstrategiesboard strategy cards  give each card one sheen during growth\
align the table headers that are misaligned in the reference
mockdata
all strategy curves must rise
run
then let the strategy curves rise animate the balance digits
use an upward odometer-style digit roll

gray-white flowing-light background

UIUI GSAP minaraMotion

keep the product believable and usable in the video、interactions should also work as real interactions

show me a test page for approval first render

codex 
./codex

use this template for every large-title entrance pnpm dlx shadcn\@latest add @snapcn/text-swap Motion

Motion do not ignore the template I provided

### Additional instruction

reuselocal12-13

## Implementation and interpretation

- Fresh DOM/SVG scene and motion timeline, written without reading or copying the rejected S12/S13 implementation. Its files are unchanged.
- Both current screenshot references are retained under `references/`; they are measurement references only and are never displayed by the scene.
- Maintains the original combined 7.700-second duration (231 frames at 30 fps), corresponding to 38.233–45.933 on the storyboard.
- This prompt explicitly replaces the earlier storyboard wording with “Autopilot / Where your profits flow.”
- This prompt explicitly requires one sheen on each card; it takes precedence over STYLE's generic two-sheen ceiling.
- Gray-white moving light comes from the existing shared source asset. Only local libraries, Geist fonts, token assets and client avatar are reused from other scenes; no rejected scene layout or timeline is reused.
- The actual official `@snapcn/text-swap` was installed with the requested shadcn CLI in `title/`. Both title lines mount the official `TextSwap` component through a 30-fps Remotion Player. Full registry source/provenance is retained; this is not a reimplementation of its motion constants.
- Autopilot tab → staggered metrics, wallet, strategy, chart and positions → wallet Strategies → four card rows growing with one clipped sheen each → strategy detail → Run → rolling numbers, rising curve, positions, and Running group update.
- All curves use fixed positive increments. Financial amounts, holdings, counts, and wallet address are mock data.
- Strategy headers and rows share the same CSS grid columns. The original tall dashboard is fitted to a 16:9 window with three representative position rows.
- The product review mode supports the requested path with real DOM click handlers, period selection, and closing the drawer. It is a local scene demonstration, with no account connection or order API.

## Review

Open `_test.html` directly; no server is required. Play/replay, 0.5×/0.75×/1×, scrub and chapter buttons sit outside the video stage. “Try the product” starts the manual click path.

Verification: `node codex/scenes/s12-s13-v2/verify.mjs` from the parent project. Evidence: `verification/`.

Do not render until the project owner explicitly approves this new test page.
