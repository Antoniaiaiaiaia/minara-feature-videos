# S04/S05 v3 — counter-scrolling wall and order cards

Preview `_test.html`; browser check `node verify.mjs`. Total remains12.5s at30fps. Earlier v1/v2 previews and v1 MP4 are retained.

Latest requested changes: expand the opening wall and scroll adjacent columns in opposite directions during camera pullback; replace the trading terminal with a large central order card over the existing grey-black flow background.

Wall now uses100 distinct original asset logos,30crypto /70US-listed equities and futures. Additional rows provide overscan; columns alternate−112/+112px/s during opening. The portfolio input and Signal wall/chime remain.

Orders NVDA / CL / BTC / GOLD / SNDK / HOOD run from6.5s, one second each: float in0–.2; click.3; green check popup.42–.64; whole card flies left.74–1; next card appears. Button clicks advance through the same local animation and continue to the next asset. No trading API or real orders. Values illustrative. GSAP curves and Minara green#0AB56A retained.

Nine headless screenshots and a runnable check verify100unique assets,30/70mix, alternating column motion, six order checks/exits, transparent execution background, loaded logos and real click progression. Root inspected order, success, left exit and counter-scroll screenshots. Preview only; not rendered. Future renderer should include signal.wav at5.02s, total375frames. Revert by opening unchanged v2.
