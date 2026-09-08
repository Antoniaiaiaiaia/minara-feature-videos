# S01 v7 — Minara Harness enters at the start of the second second

User: “introducing  Minara harness ”.

Introducing now runs 0–1s (frames 0–29). Minara Harness enters at exactly
1.000s (frame 30) and remains until 4s. The third card keeps its 4–6s slot.
Total remains exactly 6s / 180 frames at 30fps. Existing wording, typography,
gray flow and supplied animation are retained. The silver sweep stays 24
frames after Minara Harness enters, now frames 54–84.

Source: S01v7.tsx, PunchLines-v7.tsx, index-v7.tsx.
Preview: _test-v7.html. Output: ../../output2/s01-introducing-minara-harness-v7.mp4.
Check: python3 codex/scenes/s01/verify-v7.py from the project root.
Revert by selecting the retained v6 source/preview/export.

Verified: verify-v7.py passes. Actual encoded contact sheet inspected;
Minara Harness is present at frame 30 (1s), third card starts at frame 120
(4s), and total duration is 6.000s / 180 frames. Silent 1080p H.264.
Ready for review.
