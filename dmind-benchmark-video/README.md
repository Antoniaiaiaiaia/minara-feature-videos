# DMind Benchmark video

A light, pastel DMind Benchmark film built with HTML, CSS, and GSAP. Seven standalone scenes form a roughly two-minute film. The archive contains scene sources, design notes, inspection scripts, reference frames, individual exports, and `DMind-Benchmark-2min-light.mp4`.

## Preview

From this directory, run `python3 -m http.server 4093 --bind 127.0.0.1`, then visit `http://localhost:4093/preview.html`. The preview can play the full sequence or individual scenes. Stop the server when finished. Scene documents have paused timelines; use the preview to play them.

## Screenshots and renders

Optional screenshot dependencies: `npm install`, followed by `npx playwright install chromium`. Run `npm run screenshots` from this directory. Historical `_shoot*.cjs`, `_s5*.cjs`, and other inspection scripts preserve individual review checks; run them from this directory. GSAP is resolved from the installed dependency instead of an original machine's temporary file. Some preview checks expect a local server on port 8791.

The `_render/sceneN/index.html` files preserve isolated HyperFrames render inputs. From one of those directories, use the HyperFrames CLI to render a new versioned MP4, for example `npx hyperframes render --output ../../out-scene1-new.mp4`. Fonts and scene scripts load from their existing public CDNs.

## Snapshot notes

The original production notes identify some leaderboard and agent scores as illustrative placeholders. Treat these as video production sources, not verified benchmark results. Existing scene durations, numbers, and approved English captions are preserved.

Private production records (`context.md`, `change-log.md`) and macOS metadata are excluded. The original source folder was not modified. DMind marks, fonts, and third-party dependencies retain their respective rights; see the repository asset notice.
