# Minara Strategy Studio 2

Public backup of the Strategy Studio v2 scene compositions, reusable assets, final narration, and versioned scene/output videos.

## Run

- Start a local preview with `cd v2 && python3 -m http.server 4098`.
- Open `_test.html` in that local server, choose a scene, and scrub the paused timeline.
- Render a scene from its directory with `npx hyperframes render --output sceneN-vN.mp4`.

Each scene is self-contained and uses relative `assets/` and `lib/` paths. The v2 compositions use 1920×1080 paused timelines registered as `window.__timelines.root`.

## Included

The fourteen v2 HTML scenes, scene-local assets and libraries, final scene MP4s and the assembled output set, the translated English storyboard, final narration WAV/MP3 and script, and the v2 preview page.

## Excluded and known blockers

Private context files, Git metadata, dependency folders, voice-comparison takes, and disposable caches were excluded. The storyboard, preview labels, and selected scene comments were translated to English. The long `v2/ss2-spec.md` still contains some original-language fragments from the source specification, and the preserved rendered media was not re-rendered or OCR-verified; inspect those files before claiming a fully English media release.
