# S16 + S17 · Beyond finance.

2026-09-07 export approval: the project owner explicitly requested “render to mp4” after the typing-camera revision. This authorizes rendering the current preview, including the moving ticker and redistributed timing.

2026-09-07 camera feedback: “follow  ”. Camera now focuses the whole question input at 1.55× during typing. The installed AnswerStream pullback begins on the final character at 3.05s and returns to 1× by 3.32s; Send at 3.41s and the answer remain at normal scale. This replaces the send close-up and later pullback described in older revisions below. Timing, templates, continuous composer transition and moving ticker are retained. Verification: `node verify-camera.mjs` passed, four screenshots inspected and manual Send checked. No video render.

2026-09-07 ticker feedback: “base”. Replaced the static tape row with S08's repeated track pattern and time-driven GSAP translation at 90px/s. Local quote data and styling retained; duplicate groups are hidden from screen readers. Playback, pause and reverse seeking share the same deterministic position. Verification: `node verify-ticker.mjs`, actual 0.6s playback moves the tape 54px left; screenshots in `verification/ticker-before.png` and `ticker-after.png`. No video render.

2026-09-07 latest feedback: “ ” and “；6。”. Both are incorporated together. The send macro and answer now share one camera origin and an identical boundary pose; the same composer continuously settles to the bottom, with no hard layout reset. The installed AnswerStream pullback curve and word timing remain; its reference hard cut is overridden by this explicit continuity feedback. Removed the accelerated pre-cut push that depended on that cut.

Moved 0.92s from the final hold into input, send motion and generation through one deterministic time map. Preview timing: typing completes at 3.05s; Send at 3.41s; continuous pullback starts at 3.74s; summary card appears at 5.04s; document click at 6.27s; PPT opens at 6.35s and finishes resolving by 7.44s. Final hold 0.26s; original total 7.7s and 55-frame title retained. These are the current preview times; earlier timing notes below describe previous revisions. Reference images saved under `references/send-cut-before.png`, `send-cut-after.png` and `ending-hold-feedback.png`. Verification: `node verify-continuity.mjs`; no video render.

2026-09-07 review: “2.52.85 ”. Fixed the input-to-send camera in `scene.js`: hold through typing completion at 2.62s, then use one eased screen-space focal path and derive camera translation from the zoom and the button's untransformed layout. This removes the inconsistent pan/zoom blend that made the focus reverse. Original 2.86s commit, 3.08s cut, named template macro anchor and total timing remain. Focused verification: `node verify-camera.mjs`.

Status: the project owner approved export with “render to mp4”. Delivered `../../output/s16-s17-beyond-finance.mp4` at 1920×1080 / 30 fps / 231 frames / 7.700s, silent H.264. Metadata checks and actual encoded-frame inspection passed. Earlier preview-only notes describe prior revisions.

## the project owner's prompt

```text
storyboard Project rules
s16-s17 work together
Beyond finance.
onereal。 2026  —— minara —— ，onePPT。
reference pnpm dlx shadcn\@latest add @snapcn/answer-stream
Background
UIUI GSAP minaraMotion
keep the product believable and usable in the video、interactions should also work as real interactions
show me a test page for approval first render
claude  ./claude
codex  ./codex
use this template for every large-title entrance pnpm dlx shadcn\@latest add @snapcn/text-swap Motion
Motion do not ignore the template I provided
```

## Interpretation

- Read the parent storyboard, AGENT.md and STYLE.md. Retain 53.633–61.333s, 7.700s, 231 frames at 30 fps; the title ends at the original 55-frame cut. Exact narrative title: `Beyond finance.`
- The previous `../s16-s17/` trade-learning scene remains intact. This explicit new brief restores the board's original Beyond finance content. All new engineering, runtime assets, research, deck and verification stay in this directory under `codex/`.
- The query appears in English as `2026 NVIDIA earnings`, matching the film's English UI. The report explicitly resolves this to fiscal 2026, ended January 25, 2026, not calendar-year 2026.
- The financial research is grounded in public NVIDIA Investor Relations and the annual report. Values are fixed source snapshots, not a live-account or live-AI connection. The thin client market tape uses fictional fixed demo quotes. No personal/account information.
- The chat, document attachment and PowerPoint desktop are DOM/SVG. The existing desktop reference is measurement-only. No screenshot pixels are used in the scene. The official Minara logo path is absent on this device; use the generic product Bot glyph, never a substitute drawn logo.
- Summary file: `research/summary.md`; editable 3-slide presentation: `research/NVIDIA-FY2026-Earnings.pptx`; full source provenance: `research/research.json`.

## Motion and actual template use

- Successful command: `pnpm dlx shadcn@latest add @snapcn/text-swap @snapcn/answer-stream --yes --cwd codex/scenes/s16-s17-beyond-finance/title`.
- This generated 13 actual official registry files. `title/title.tsx` directly mounts `TextSwap` for both the entrance and fly-through exit of the narrative title, including the template's perspective shutter samples.
- `title/title.tsx` imports and exposes the installed `answer-stream` exports `shotBScale`, `wordBirth` and `heat`. `scene.js` executes those functions for the answer camera, word births and cooling; these are not placeholder imports. The official macro camera values (2.36×, .571/.591 parking), accelerating commit/click cut, negative-Y pullback focus, .028 undershoot and empty-card/four-frame-fill timing are mapped onto the faithful Minara redraw.
- Product headings use the same installed text-swap fly-through entrance targets (.82 scale, 9px blur, 16 frames; cubic-bezier .2,.6,.35,1) without changing their product layout.
- GSAP and CustomEase drive the deterministic timeline and document-to-PPT shape transform. Input-to-send motion, document click and the original 7.7-second timing are seekable. No CSS wall-clock animations or random values.
- Local Geist is the only font; only font-loading lines in the vendor modules were adapted to remove remote Google font requests. Grey-white flow, GSAP and fonts are copied locally from the existing Codex scene assets.

## Preview and validation

Open `_test.html` directly with file://. Play, replay, scrub, 0.5×/0.25× and chapter jumps work. `Try the interaction` supports a NVIDIA + 2026 query, Send, summary click, all three PPT slides, keyboard slide arrows, close/Escape and the actual editable PPTX download.

Build the title bundle with `node title/build.mjs`. Verify from the parent project with `node codex/scenes/s16-s17-beyond-finance/verify.mjs`.

2026-09-07: final browser pass completed with eight scene screenshots, reverse seek, input validation, Send → summary → PPT, slide navigation, download and close. No runtime errors or remote runtime assets. The title, query, macro click, streaming answer, summary, document expansion and desktop were visually inspected. The final deck uses the same verified financial figures and text as the scene; its reproducible source is `research/build-deck.mjs`. Video render remains gated on the project owner's explicit approval.
