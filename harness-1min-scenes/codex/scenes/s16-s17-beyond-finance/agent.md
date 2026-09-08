# Beyond finance scene preview

S16–S17 is a static, deterministic 7.7-second DOM/SVG film scene: NVIDIA earnings query → research summary → document click → desktop presentation. The review page works without a server. It has local interactive controls and a downloadable editable presentation.

- `_test.html`, `scene.css`, `scene.js`: scene and review controls.
- `title/`: installed Snapcn registry sources, actual TextSwap Player and AnswerStream motion functions. `node title/build.mjs` rebuilds the static bundle.
- `assets/`: local Geist, grayscale flow and GSAP.
- `research/`: sourced fiscal 2026 facts, summary and editable PPTX.
- `verify.mjs`: one browser check for timeline, screenshots and local interactions.
- `render.mjs`: approved 231-frame browser PNG → H.264 export; run `node render.mjs`. Output is `../../output/s16-s17-beyond-finance.mp4`; existing files are protected from overwrite. Encoded verification frames and metadata are in `render-verification/`.

Keep reference screenshots out of runtime pixels. Financial content is public and fixed; the UI interaction is local. Do not render video until the user approves the test page. Preserve the prior trade-learning version in its separate directory.

Registry font loading is adapted to local Geist to avoid remote requests and mismatched output fonts. AnswerStream helpers use frame units even though the surrounding GSAP scene uses seconds. Convert at the call boundary. The PPT starts at the document card's exact bounds and grows to a desktop window after the document click.
