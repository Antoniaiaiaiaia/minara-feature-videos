# Minara Harness 1-minute launch film

This public backup contains the scene-by-scene launch-film workspace.

## Working contract

- The approved draft fixes the timeline and title-card copy. Work one scene at a time after a prompt and references arrive; do not redesign structure, change timecodes, change approved English copy, or work ahead.
- `scenes/timeline.json` is authoritative. Each `scenes/sNN/brief.md` records the prompt, references, implementation decisions, and delivery history.
- Statuses move from Awaiting prompt → Prompt received → Generating → Pending review → Approved or Rejected. Work only on the one scene currently marked active.
- Build at the draft duration (±0.1 seconds unless the prompt requires more), 1920×1080, 30 fps. Inspect real output frames at start, key action, and end.
- Use local Geist fonts, client-sampled colors, deterministic seekable motion, and faithful DOM/SVG/vector UI redraws. Reference screenshots are for measurement only; screenshot pixels must not enter finished UI animation.
- Do not add voiceover, explanatory captions, invented panels, decorative labels, or unrequested copy.

## Directory contract

```text
scenes/        scene briefs, previews, and assets
remotion/      shared Remotion workspace
references/    supplied reference images
frames/        draft start/middle/end stills
output/        historical finished videos
codex/output2/ current versioned finished-video exports
```

Run long-lived preview servers in the foreground and stop them after validation. The public backup omits private context/change logs, installed dependencies, browser state, generated frame sequences, caches, and machine-specific paths.
