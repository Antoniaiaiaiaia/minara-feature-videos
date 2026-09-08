# S01 v10 — extend Minara Harness by 0.5 seconds

User: “minara harness  0.5s”.

Introducing remains 0–1s. Minara Harness now occupies 1–3s, increased
from 1.5s to 2s. General Financial Intelligence starts at 3s and continues
to the existing 6s end. Holds: 30,60,90 frames. No other motion, text,
font or background changes; reuse immutable PunchLines-v8.tsx.

Source: S01v10.tsx; entry: index-v10.tsx; preview: _test-v10.html.
Export: ../../output2/s01-introducing-minara-harness-v10.mp4.
Check: python3 codex/scenes/s01/verify-v10.py from the project root.
Revert through preserved v9 files.

Verified: verify-v10.py passes. Nine actual encoded frames inspected in
../../output2/s01-verification-v10.jpg. Correct 1s and 3s cuts, 6.000s
total, silent 1920×1080 / 30fps. Ready for review.
