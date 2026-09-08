# S16 + S17 · Beyond finance → Computer use

Export authorization: the project owner explicitly requested “render” for the current 19.1-second revision with half-second document holds. This supersedes the earlier preview-only approval gate for this version.

Delivered `../../output/s16-s17-computer-use.mp4`: 19.100s / 573 frames / 1920×1080 / 30 fps, silent H.264. Metadata checks and visual inspection of encoded frames passed. Reproduce using `node render.mjs`.

Latest feedback: “PPT  PPT excel charts0.5sone”. Each document now has exactly 0.5s between the end of its opening and the next transition: PPT settles at 3.32s → Excel at 3.82s; Excel settles at 4.77s → charts at 5.27s; charts settle at 6.27s → group exit at 6.77s. Chart contents finish inside that opening. Browser beats move earlier; one completed form holds 0.5s before the grid, and the final registrations hold 0.58s. Total reduced from 24.5s to 19.1s. `node verify.mjs` passed; updated screenshots inspected. No new render.

Earlier client feedback: “ / ”. Client entrance reduced from 0.7s to 0.26s. Cursor starts at the first client frame (1.833s), clicks at 2.20s, and PPT opens at 2.32s. No idle client hold. The hold times were subsequently shortened as recorded below. Focused check `node verify.mjs --client` passed, with both screenshots inspected. No new render.

## the project owner's revision

```text
beyongd finance

，，PPT，excelPPT  ，chartstype，；

，onechrome，，one，。computer use。GSAP。

、Motion。。
```

## Current interpretation

New 19.1-second proposal, 1920×1080 at 30 fps. The previous 7.7-second scene and MP4 are preserved in `../s16-s17-beyond-finance/` and `../../output/`. This version is approved and its MP4 is complete. The master storyboard's historical timecodes are not retimed automatically.

- 0–1.83s: preserve the actual installed Snapcn TextSwap “Beyond finance.” opening.
- 1.83–2.2s: completed Minara research files, no composer or question input. Cursor immediately approaches the presentation card while the client enters.
- 2.2–3.82s: click the card, expand that surface into the existing faithful PowerPoint redraw and hold.
- 3.82–5.27s: editable spreadsheet opens in front, offset left and down.
- 5.27–6.77s: charts open farther left and down; all three titlebars remain visible.
- 6.77–8.37s: the entire document stack leaves left as one group. A simplified Chrome-style browser enters from the right.
- 8.47–9.62s: a light sweeps across the browser.
- 9.62–12.87s: one cursor fills four native fields and registers locally.
- 13.37–14.67s: the original browser shrinks into the first tile of a six-browser grid. Actual TextSwap introduces “Computer use.”
- 14.67–18.52s: six visible cursors independently fill six forms, with slight offsets in their timing.
- 18.52–19.1s: completed registrations remain readable.

Motion uses GSAP and the existing Minara entrance/camera curves. Actual installed AnswerStream `shotBScale` controls client settling and `wordBirth` controls field typing; both headline treatments instantiate the actual installed TextSwap component. No substitute template implementation or new remote dependencies.

PPT markup, financial facts, local assets and icon redraws reuse the prior scene. Spreadsheet figures and charts are from the previously verified NVIDIA FY2026 source. Browser people/companies are fictional; `.example` / `example.com` indicate the local demonstration. No external registration is submitted. Native inputs, local submit, editable spreadsheet cells, PPT slide navigation, and file downloads are available in the test page.


Latest approved delivery: 24.1s / 723 frames at 30fps. Includes the additional five-second convergence into one registration results sheet and scrolling all 24 fields from six completed forms. User approved render; MP4 exported and visually checked.
