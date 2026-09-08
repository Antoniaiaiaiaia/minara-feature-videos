# S01 elastic left exit

User request (2026-09-07): one

Revision of the supplied S01 MP4. Preserve all entrance cues, text, typography,
background and the 110-frame duration. At frame 84 the complete line accelerates directly left and clears the edge by frame 106.

Source: S01v2.tsx, adapted from the original S01 composition; shared text-reveal
and assets reused. Original source and MP4 are preserved.

Render from the root remotion directory:
```
./node_modules/.bin/remotion render ../codex/scenes/s01/index.tsx S01v2 ../codex/output/s01-introducing-minara-harness-v2.mp4 --public-dir public --codec h264 --crf 13 --pixel-format yuv420p --color-space bt709 --muted
```

Revert: remove only codex/scenes/s01 and codex/output/s01-introducing-minara-harness-v2.mp4.

Verified: `python3 verify.py` passes (110 silent 1920×1080 frames; all exit frames move only left, no text on final frame). Rendered contact sheet: `verification.jpg`; preview: `_test.html`. Status: ready for review.

Latest correction: “”. Removed the rightward anticipation; the exit uses the existing S03 accelerating-left curve.
