# Scene directory contract

Each scene has one directory. IDs match `storyboard.html` and `timeline.json`.

```text
scenes/
├── timeline.json             # authoritative timecodes from the draft
└── s05/
    ├── brief.md              # prompt, references, and generation history
    ├── index.html             # scene source when the scene uses HTML
    ├── _test.html             # local seekable preview
    └── assets/
output/
└── s05-every-asset.mp4        # finished video: <id>-<slug>.mp4
```

A scene without a prompt contains only its `brief.md`. Do not merge unrelated scenes or change their timecodes. Append a dated entry to the brief after every generation or revision.
