# Sources and limits

- `references/s08-factors.png`, `s08-assets.png`, `s08-workspace.png`: user-supplied visual references. Cards, rows, tabs, metrics, assistant panel and chart are redrawn HTML/SVG. No reference image is loaded by the scene.
- Original AgentSteps registry response: `assets/agent-steps.reference.json`, fetched from `https://snapcn.dev/r/agent-steps.json`. Source adapted in `source/agent-steps.tsx`. Kept the actual component's column shift, running/completed icons, clearing and result handoff. Replaced remote Inter with local Geist and redirected core imports to local copies.
- User's `pnpm dlx shadcn@latest add @snapcn/agent-steps --yes` reached the missing `components.json` prompt in the parent Remotion workspace. Continued with the project's documented vendor route; did not scaffold Next/Vite or change shared package dependencies.
- GSAP and CustomEase reused from the project. Minara travel curve: `M0,0 C0.95,0.03 0,0.98 1,1`. Entrance curve: `.16,1,.3,1`.
- Dark flow background copied from the existing shared `bg-dark-flow.mp4`. Local Geist regular, semibold, mono and pixel fonts. Logos copied from the project's sourced stock-asset library. Nonfeatured asset rows use neutral ticker abbreviations where no sourced logo was available.
- Selected factors reproduce visible reference names: inverted 30-day return volatility, 12-day ATR, full-history volume trend. Selected semiconductor assets: NVDA, AMD, AVGO, MU.
- Code is an illustrative TypeScript definition showing the relationship between selected assets, factors and rules, not an accepted executable Minara strategy. Metrics reproduce the supplied UI reference (+32.31%, 16.50% drawdown, 43.48% win rate, 1.53 profit factor, 1.59 Sharpe, 46 trades); the SVG curve is a fixed visual approximation, not API data. These are not claimed to be semiconductor backtest results. The review page states this outside the video stage.
- The Run action is an actual local interaction: immediate loading state, progress, result panel, Code/Backtest switching and a readable Rules panel. Live generation, individual trade records, paper trading and editing backtest settings are not connected; their preview panels state their limits.
- No MP4 export, real backtest, live trade, account connection or deployment has been performed.

## Text-swap correction

the project owner added: “Typography pnpm dlx shadcn\@latest add `@snapcn/text-swap`”.

Official registry: `https://snapcn.dev/r/text-swap.json`, saved to `assets/text-swap.reference.json`. The actual component is vendored as `source/text-swap.tsx`; title and AgentSteps labels use it directly. The rest of the DOM text uses its exported fly-through entrance motion and easing. The title exit retains the upstream perspective rush and 18 shutter samples. Text entrances are scale 0.82 → 1 and blur 9 → 0 with the component's cubic curve, rather than a typewriter. Local Geist Pixel remains reserved for the explicitly requested code transformation.

Run `node codex/s08/check.mjs` with the local Range server and named browser session active. It verifies duration, selected factor/asset counts, missing images, browser errors, Run, tabs and Rules, and saves nine 1600×1000 screenshots plus `verification/checks.json`.
