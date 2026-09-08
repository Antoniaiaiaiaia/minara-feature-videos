# S01 v3 — two PunchLines cards

User request: s01，Motion，text Introducing | Minara Harnerss Desktop
Clarification: `|` 。

The supplied TSX is the animation source; its comments and sample copy are
reference material, not additional user instructions. Exact submitted text is
preserved, including “Harnerss”. Card one is Introducing (frames 0–51); card two
is Minara Harnerss Desktop (52–109), on one line. The pipe is not displayed.

Supplied PunchLines motion is retained: slide/settle/rush, then staggered word
punch and gradual camera push, with the original hard-cut timeline. Local Geist
and the existing silver flow are retained. The old left exit is superseded by
the newly requested motion. Duration remains 110 frames / 30 fps / 3.667 seconds.
The original source attachment is preserved in punch-lines-supplied-v3.txt.
Only the external font import and local theme import are adapted in the vendor
copy. Previous versions and other scenes remain untouched.

Render from remotion/:
```
./node_modules/.bin/remotion render ../codex/scenes/s01/index-v3.tsx S01v3 ../codex/output/s01-introducing-minara-harness-v3.mp4 --public-dir public --codec h264 --crf 13 --pixel-format yuv420p --color-space bt709 --muted
```

Preview: _test-v3.html. Revert by selecting the preserved v2 preview/export.

Verified and ready for review: verify-v3.py passes. The actual encoded
contact sheet verification-v3.jpg was visually inspected across slide entrance,
rush, the frame-52 hard cut, staggered word entrance, and final full title.
Output: ../../output/s01-introducing-minara-harness-v3.mp4 (1920×1080,
30fps, 110 frames, 3.667s, H.264, silent). All requested content is present.
