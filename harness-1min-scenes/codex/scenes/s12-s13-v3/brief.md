# S12 + S13 · Abstract Autopilot

## User request · 2026-09-07

“realUI UI。Background tab  autopilot tab。strategy cards 。    +15 +20 +150    onetest page。”

This request replaces the previous faithful desktop/wallet/dashboard layout with an abstract interface. It explicitly permits green card fills and one sheen per card, overriding the corresponding project style restrictions. The earlier required title remains: “Autopilot” → “Where your profits flow.”, using the exact installed official `@snapcn/text-swap` component and its complete fly-through transition.

Gray-white flowing background; three large tabs slide in from the right. After the mouse clicks Autopilot, that tab lifts into the centered heading position, without an underline. The newest screenshot replaces the prior wide strips with three 500×586 dark-gray strategy cards, arranged horizontally as in the reference. Each card is redrawn in DOM/SVG: strategy icon and name, market/timeframe/stars/published metadata, headline return and upward area curve, window return/drawdown/Sharpe metrics, Window/Share/subscriber information and favorite indicator. The bottom Run button is omitted. Card spacing is 28px, and dollar gains appear above each card. Reference screenshots never appear as rendered card pixels; all values are local mock data.

7.7 seconds / 30 fps / 1920×1080. Title 0–1.6s; tabs slide in at 1.6s; tab click 2.55s; heading lifts and cards grow at 2.9–3.88s. The mouse clicks the first card's center at 4.12s: the card presses and rebounds, turns green, and emits exactly `+$15`, `+$20`, `+$150`. It clicks the same center again at 6.00s: profits stop and the card returns to dark gray. It clicks the second card's center at 6.32s; that card turns green and begins the same three dollar flips. Manual card clicks toggle running/stopped with the same feedback. Playback and seeking restore deterministic state.

These details incorporate both follow-up requests: right-side tab entrances, clicked Autopilot lifting, longer centered cards with more data, explicit dollar symbols, and the three-pop → stop → next-card interaction.

Latest follow-up: “。strategy cards referencerealstrategy cards，butbaserun button， 。” The supplied screenshot is preserved in `references/strategy-cards-reference.png`; it supersedes the prior wide-strip layout. Original title template and interaction sequence remain intact.

Preview only. The previous MP4 is retained, and approval of that old version does not authorize rendering this new revision.

Latest follow-up: “  。Typography UI。” This supersedes the former wide gaps/right-side gains. All UI typography is regular 400 and larger; the official TextSwap opening is also enlarged to 144px regular through v3-only CSS. Center-click run/stop and three-gain sequence remain intact.
