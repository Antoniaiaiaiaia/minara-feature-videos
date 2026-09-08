# S01 v9 — exact revised timing

Latest user request: Introducing 0–1s; Minara Harness 1–2.5s;
General Financial Intelligence 2.5s–end. This replaces the interrupted
1–1.5s / 1.5s–end timing request before any implementation of that request.

Total remains 6 seconds. Card holds are 30,45,105 frames at 30fps;
hard cuts at frame 30 and frame 75. Exact copy, supplied motion, Geist,
gray flow and the second-card silver sweep are preserved from v8.
The immutable PunchLines-v8.tsx is reused directly.

Source: S01v9.tsx; entry: index-v9.tsx; preview: _test-v9.html.
Export: ../../output2/s01-introducing-minara-harness-v9.mp4.
Check: python3 codex/scenes/s01/verify-v9.py from the project root.
Revert by selecting the preserved v8 files.

Verified: verify-v9.py passes; nine actual encoded frames inspected.
Correct copy, third card enters at 2.500s, exact 6.000s total, silent
1920×1080 / 30fps. Ready for review.
