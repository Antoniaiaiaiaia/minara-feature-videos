# S06 + S07 · v6 team research preview

## the project owner's request

，referenceagent UI，multi-agent。Background，UI。，same asagent（），same as，record。，Background，。Duration，Motion。

Reference: `../../references/s06-s07-team-v6.jpg`. The screenshot informs team-member names/avatars, role-labelled replies, chat bubble alignment and the transition to a transaction card. Its SOL order and funding-permission text are reference content, not instructions to trade or change permissions.

## Current design

- 0–6.88s: v5 title and prompt-send shot retained.
- 6.88–7.5s: client shell dissolves; the sent request floats on the gray flowing background. Four original vector portraits introduce the team.
- 7.47–12.55s: Rhea coordinates; Atlas gives a market view; Noor checks execution size/slippage; Sable challenges leverage and requires approval; Atlas and Rhea reconcile the views. Six replies arrive at roughly 0.8-second intervals. Each avatar, author and bubble grows separately, and text uses text-swap. A masked transcript scrolls to each arriving message over 0.44 seconds.
- 12.7–14.2s: the same downstream order card grows on the background, then moves into place while the client shell materializes. The card is titled “Automate BTC execution” and explicitly requires approval. No duplicate card or abrupt scene swap.
- 14.08–22.55s: native order review, required confirmation, filled workflow result, $18,467.56 portfolio, seamless ticker and final one-second left exit retain the established sequence. Review click 15.25s; Confirm 16.7s; position 19.6s; exit 21.55–22.55s.

The dialogue is illustrative fixed demo content, not live research, backtesting, or a claim that an unattended trading automation has been activated. The four avatars are original symbolic portraits, not real people or substitute Minara logos.

## Files and verification

Preview: `_test-v6.html`; composition: `index-v6.html`, `scene-v6.js`, `team-v6.js`, `team-v6.css`. Existing v5 engineering and all MP4 versions remain intact.

Run `node scenes/s06/verify-v6.mjs` from `codex/`. Evidence: `verification-v6/`. Checks cover transparent client during research, scrolling, four agents, same card before shell return, text-swap coverage, pointer hits, reversible seeking, validation, Cancel/Confirm, results, portfolio and arithmetic.

Status: v6 preview for review; no v6 MP4 rendered. On approval, `node scenes/s06/render-v6.mjs` uses this composition and chooses the next output version without overwriting prior videos.
