# Minara Harness launch-film scene workspace

This is a public backup of the Minara Harness 1-minute launch-film workspace. It keeps the approved draft timeline, scene briefs, previews, source assets, shared Remotion workspace, references, and finished MP4 exports.

## Preview and render

- Open `storyboard.html` locally for the scene board.
- Open any retained `scenes/**/_test*.html` or `codex/scenes/**/_test*.html` file in a browser for a local preview. These previews use project-relative assets.
- For the shared Remotion scenes, run `pnpm install` once in `remotion/`, then use `pnpm studio` or an existing script such as `pnpm render:s01` from that directory. Rendering requires the Remotion dependencies and ffmpeg available on the host.

## What is included

- `AGENT.md`, `STYLE.md`, `scenes/timeline.json`, scene briefs, source previews, and shared Remotion source.
- Draft timing stills under `frames/`, supplied references under `references/`, local fonts/backgrounds, and finished MP4s under `output/` and `codex/output2/`.

## What is excluded

The backup omits private `context.md` and `change-log.md` files, Git metadata, installed `node_modules`, browser logs/state, disposable rendered frame sequences and verification screenshots, caches, deck-build scratch directories, and machine-specific absolute paths. Source-language fragments remain in some historical briefs because the translation pass was intentionally stopped; executable behavior and approved English on-screen copy are preserved.
