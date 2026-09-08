# DMind Benchmark KDD video

The earlier dark-blue DMind Benchmark film: seven HTML/CSS/GSAP compositions, individual video exports, narration, subtitles, timing notes, and visual design references. This snapshot is independent of the later light version in `../dmind-benchmark-video/`.

## Preview and render

From this directory run `python3 -m http.server 4101 --bind 127.0.0.1`. Open `http://localhost:4101/_play.html` for Scene 1, or `_play2.html` through `_play7.html` for the other scenes. `_palette.html` and `_styleboard.html` show the design references. Stop the server when finished. Direct scene documents use paused timelines and need a playback wrapper.

The `_render-sceneN/index.html` directories preserve isolated HyperFrames render inputs. From one of those directories, run `npx hyperframes render --output ../final-videos/sceneN-new.mp4`, choosing the matching scene number and a new filename. Fonts and GSAP use the existing public CDN references. `final-videos/` preserves the available historical exports.

`_plan-server.py` is an optional local editor server with a `/save` endpoint for storyboard cell edits. It writes `_shot-visual-plan-edits.json`. The original editable storyboard page is not present in this snapshot.

## Reading the archive

- `design.md`: complete translated design specification.
- `narration.md`: approved English narration and visual beat mapping.
- `voice-srt.srt` and `voice-timing.md`: subtitle timing and the original duration discrepancy notes.

Some original production notes identify model scores as placeholders and flag a 31-versus-33 model-count mismatch. These historical production issues are preserved rather than silently revised. This is a video source archive, not an authoritative benchmark dataset.

Private production records, their merge note, and macOS metadata are excluded. The original folder remains unchanged. The third-party Amoeboids reference clip and contact sheets retain their original rights and are outside the source-code license.
