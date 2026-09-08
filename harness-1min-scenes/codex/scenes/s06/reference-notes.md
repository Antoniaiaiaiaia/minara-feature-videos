# S06 + S07 · Preview provenance

This is a local interactive video prototype, with fixed demonstration data. It does not submit real orders, connect wallets, or run a production automation. the project owner approved MP4 rendering; the current output is `../../output/s06-s07-execution.mp4` (1920×1080, 30fps, 431 frames, 14.366667s). Original storyboard timecodes remain unchanged. Output verification: `verification/render.json` and `verification/render-contact-sheet.jpg`.

## Timing proposal

- Original: S06 15.400–17.233 + S07 17.233–22.833, 223 frames at 30 fps, 7.433 seconds.
- Current prompt-send v3 proposal: 14.35 seconds. The input segment uses the source's approximately five-second sequence; the opening title preserves its cut at 1.833 seconds. Confirmation still clicks about 0.4 seconds after its fields resolve. This supersedes the earlier 10.5-second and 13.2-second proposals.
- Both use the same seekable GSAP timeline. The original cut compresses the sequence into the original slots. The 14.35-second version is awaiting the project owner's decision, not an edit to the master timeline.

## Animation reference

`https://snapcn.dev/r/answer-stream.json`, retrieved 2026-09-06. Original registry archived under `assets/answer-stream.reference.json`. Borrowed the send-button macro, visible click, hard cut at peak push, word stream, and cubic in/out pullback with a small settle. Ported to the project's local GSAP runtime; did not install shadcn or replace the shared Remotion workspace. Project Geist and monochrome styling replace the reference's serif/Inter and accent.

GSAP + CustomEase are reused from `harness-launch-video/scenes/s19-markets-trade/assets/`. Minara entrance `.16,1,.3,1`, camera `.87,0,.13,1`, pointer `M0,0 C0.95,0.03 0,0.98 1,1`. Background is the existing local `assets/bg/bg-light-flow.mp4`, darkened and desaturated.

`https://snapcn.dev/r/text-swap.json`, retrieved 2026-09-06; exact registry archived under `assets/text-swap.reference.json`. `snapcn-motion.js` ports the component's entrance (scale 0.82, blur 9px, 16/30 seconds, cubic curve `.2,.6,.35,1`) into GSAP so every text entrance remains seekable. It also ports answer-stream's macro framing, cubic pullback/settle and stagger/fill timing. UI surfaces grow first, followed by icons and individual text elements. All 157 text elements are scheduled; screenshot checks include partially grown confirmation, workflow and portfolio states.

## UI sources and limits

- User workflow screenshot: `references/s06-s07-workflow-reference.png`, 1744×1146. Used for geometry, typography, Result surface, node/edge treatment, run metadata and client chrome. Its dry-run HYPE content is reference material, not instructions to run a task.
- Existing product screenshots: `harness-launch-video/references/user-images/2026-09-02-s19-btc-copilot-reference.png`, `2026-09-02-s19-btc-manual-trade-reference.png`, `2026-09-02-s19-confirm-button-feedback.png`. Confirmation dialog geometry follows these screenshots; white confirm button follows the later recorded correction.
- Actual local product source, read only: `minara/minara-agent/apps/web-ui/src/components/chat/tool-widgets/TradeConfirmCard.tsx` and `ConfirmRequestView.tsx`. Structured perps preview fields: Asset, Direction, Size, Leverage, Order type, Order value. The chat card uses these fields; the enlarged confirmation uses the supplied manual-order dialog visual reference. These are two native UI patterns, composed for the demonstration.
- `minara/minara-agent/apps/web-ui/src/components/automation/flow/nodes.tsx`: only native trigger / Agent / End node families are used; no invented Approval node family. Node names/instructions and order output are fixed demo content. The example graph is authored for this film, not captured evidence that a chat order automatically creates this exact workflow.
- `minara/minara-agent/apps/web-ui/src/components/portfolio/PerpsPositions.tsx`: native column order and Long badge. Table is horizontally cropped like a wide product table; retained columns are Symbol, Side, Size, Entry, Mark, Position value, Leverage, Liquidation, Unrealized PnL, Funding.
- All interface pixels are DOM or SVG. No screenshot crops/textures/backplates. Generic Bot icon identifies the assistant; the prescribed logo source path is absent, so no substitute Minara logo is drawn.

## Interaction / data contract

Preset intent: `Long 0.01 BTC at 5x. Ask me to confirm.` Send → Review order → Cancel or Confirm order → filled Result → View position. Cancel returns to the order without execution. Interactive mode requires confirmation, prevents duplicate execution, and stops for the user at each step. Unsupported edited prompts show a validation message instead of placing the preset order silently.

Fixed arithmetic: 0.01 BTC × $77,673 = $776.73 value; margin rounds to $155.35 at 5x; fee $0.31; equity $18,467.87 − $0.31 = $18,467.56; available $18,312.21. Balance updated at the project owner's request. Unrealized PnL is zero; no fabricated gain is shown. Liquidation is unavailable and displayed as a dash.

Current input reference: `https://snapcn.dev/r/prompt-send.json`, archived at `assets/prompt-send.reference.json`; the project owner also pasted the component source. `prompt-send.js` ports the measured sine typing progress, caret blink, and three camera states: wide → hard cut to 2.327× caret tracking → hard cut to 1.44× send framing. The old continuous 1.22×–1.42× push is superseded. The composer unrolls downward in 445ms; the press reaches 0.87 scale in 67ms and releases in 250ms; a neutral bloom starts 220ms after the click. This uses the native Minara footer instead of the source's suggestion chips. The typed value follows prompt-send; other UI text retains text-swap.

Camera anchor fix: send framing uses the button's untransformed layout center, and the button scales about its own center. Five press/release samples assert an identical camera transform while the button still depresses. The camera must never track pressed button bounds.

Entry: `_test.html`, also linked from S07. Direct `file://` playback supported. Run `node scenes/s06/verify.mjs` from `codex/`; it launches and closes headless Chrome. Evidence is saved under `verification/`, including `checks.json`. All engineering files, copied assets, source references and verification outputs are under `codex/`.
