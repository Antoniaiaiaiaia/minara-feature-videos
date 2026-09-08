# STYLE.md — visual and motion specification

Use this specification with the current scene prompt. If they conflict, the current prompt wins and the conflict belongs in that scene brief.

## Color

Use colors present in the Harness client. Keep client status colors inside product UI and keep the wrapper neutral.

| Use | Color |
| --- | --- |
| Client base / sidebar | `#0f0f11` / `#141416` |
| Card and input surfaces | `#17171a`, border `rgba(255,255,255,.08–.12)` |
| Primary / secondary text | `#e7e7ea` / `#8a8a92` |
| Gain, success, running, filled | `#0AB56A` |
| Loss, drawdown, error | `#F75D5F` |
| Pending | `#FAC800` |
| Interaction blue | `#007BE5` |
| Neutral wrapper | `#0a0a0b`, `#ffffff`, and neutral grays |

Do not use cream, lime, pale blue, warm white, neon gradients, or large areas of green.

## Typography and motion

Use the bundled Geist Regular and Geist SemiBold WOFF2 files. Preserve approved title-card wording and punctuation. Product UI is the subject: redraw it faithfully with DOM/SVG/vector geometry, typography, colors, icons, and corner radii. Use causality, nonlinear easing, staggered entrances, and deterministic frame-driven motion. Avoid wall-clock randomness and uncontrolled loops.

Semantic caption groups are entrance beats, not automatic line breaks. Each group holds completely still after it lands; distribute holds evenly after entrance and exit time are reserved. Check mid-entrance, every hold, exit, and reverse seeking.

Every delivery preserves draft duration within tolerance, includes a brief entry and inspected start/key/end frames, and uses matching version numbers for the preview and MP4. Never overwrite an earlier export.
