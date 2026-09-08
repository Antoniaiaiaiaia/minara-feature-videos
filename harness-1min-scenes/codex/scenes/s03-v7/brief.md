# S03 v7 · Restore individual sidebar entrances

the project owner: “each”, with a sidebar reference saved in `references/sidebar-stagger.png`.

Root cause: v6 animated `#sidebar-tabs` as one container. V7 removes that group entrance and animates the seven buttons individually: first starts at 0.03s, 0.09s stagger, 0.40s duration each. All tabs settle by 0.97s. Research content, 3-second total duration, continuous leftward client motion and white ending are retained.

Version-isolated runtime snapshot; previous versions untouched. Preview `_test-v7.html`; MP4 `../../output2/s03-product-reveal-v7.mp4`. Render command `node codex/scenes/s03-v7/render.mjs` checks early/mid/final sidebar opacity and position, absence of Office/strategy pages, encoded metadata and runtime errors. Encoded contact sheet includes frames 1, 5, 9, 15, 23, 30, 70, 89.
