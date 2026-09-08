"use client";

/**
 * Project fork of snapcn `prompt-send` — SHOT LOGIC ONLY.
 *
 * Upstream (https://snapcn.dev/r/prompt-send.json) ships a full Inter-styled
 * composer plus the helpers below. This project's S05 needs the composer to be
 * Minara's own UI (rebuilt from apps/web-ui LandingPromptComposer / .composer-shell),
 * so the JSX and its snapcn `input` / Google-Fonts dependencies are omitted and
 * only the measured timing + camera math is kept, byte-for-byte:
 *   - the unroll / fade / blink / press constants measured off the reference
 *   - `beat`, `typedCount`, `typedProgress`, `keystrokeAt`, `caretOn`
 *   - `cameraFor`: the three hard camera states (wide → ride the caret → send)
 * Lines 36–242 of the upstream file, with the constants exported.
 */
import { Easing, interpolate } from "remotion";

export const REF_W = 890;
export const REF_H = 486;
/** How far past the stage the backdrop is painted, so a cut never frames off it. */
const BLEED = 1.4;
const OX = (REF_W * (BLEED - 1)) / 2;
const OY = (REF_H * (BLEED - 1)) / 2;

// --- Measured proportions --------------------------------------------------
//
// Everything the layout needs is either a fixed inset (a padding, which should
// not change when the type does) or a **ratio of a font size** (a type metric,
// which must). Feeding the defaults through `layoutFor` reproduces the
// recording's own geometry to a pixel; changing `fontSize`, `width`,
// `fieldHeight` or the labels moves the whole thing coherently instead of
// clipping against a constant that was tuned for one sentence.

/** Panel → field inset, and the panel's own bottom padding under the chips. */
const PAD = 4.7;
/** The panel sits a hair below the frame's centre line, as the reference's does. */
const PANEL_BIAS = 3.3;
/** Field text inset, and the line box, as multiples of the prompt's font size. */
const LINE_PAD_X = 1.12143;
const LINE_PAD_Y = 1.27857;
const LINE_HEIGHT = 1.21429;
export const CARET_RATIO = 0.15714;
/** The chip row's own metrics, as multiples of the chip font size. */
const CHIP_HEIGHT = 2;
const CHIP_PAD_X = 0.93496;
const CHIP_GAP = 0.70732;
const CHIP_TOP = 0.54472;
/** The row starts a little inside the field's text inset. */
const CHIP_INSET = 0.72639;
/** The send button's corner, measured off the field's bottom-right. */
const SEND_RIGHT = 14.4;
const SEND_BOTTOM = 10.3;

// --- Measured timeline, in seconds -----------------------------------------

/** Reveal: a hairline at the panel's top edge that unrolls downward. */
export const PANEL_GROW = 0.445;
/** The writing surface finishes first — 0.83 of the panel's own duration. */
export const FIELD_GROW = 0.831;
/** The panel also widens as it unrolls — 0.93 of its width to all of it. */
export const WIDEN = 0.2;
export const WIDEN_FROM = 0.93;
/** Placeholder and send button, together, on a straight ramp. */
export const FIELD_FADE = 0.3;
/** Each chip fades up over this, rising as it goes. */
const CHIP_DUR = 0.59;
const CHIP_RISE = 11.4;
/** Caret blink half-cycle, re-anchored on every keystroke. */
export const BLINK = 0.474;
/** Press, then release, on the send button. */
export const PRESS_DOWN = 0.067;
export const PRESS_UP = 0.25;
export const PRESS_SCALE = 0.87;

/**
 * The unroll. Nearly linear out of the gate, then a long settle — fitted to the
 * panel's measured height on twenty frames (rmse 2.5px on a 167px box).
 */
export const REVEAL_EASE = Easing.bezier(0.3, 0, 0.35, 1);
/** The chips' rise. Fitted separately: it is a harder ease-out than the unroll. */
export const CHIP_EASE = Easing.bezier(0.2, 0, 0.25, 1);
/** Real mouse deceleration — half the distance in the first eighth of the move. */
export const CURSOR_EASE = Easing.bezier(0.16, 1, 0.3, 1);

// --- Pure helpers (unit-tested) --------------------------------------------

/** Eased 0→1 for a beat that starts at `at` and runs for `dur` seconds. */
export function beat(
  t: number,
  at: number,
  dur: number,
  ease: (n: number) => number = REVEAL_EASE,
): number {
  if (dur <= 0) return t >= at ? 1 : 0;
  return interpolate(t, [at, at + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
}

/**
 * Characters revealed at `t`, on an **ease-in-out sine** over `dur`.
 *
 * This is the one measurement that surprised: the reference does not type at a
 * constant rate. It accelerates in and decelerates out — 17 chars/sec over the
 * first word, 33 in the middle, and a visible settle on the last three. Fitting
 * a sine ease to the character count read off twenty-four frames lands within
 * **0.30 characters rms** across all 69, which no constant rate comes close to.
 *
 * It is also what makes the shot work: the camera rides this same curve, so the
 * push never jerks and never coasts.
 */
export function typedCount(
  t: number,
  start: number,
  dur: number,
  total: number,
): number {
  if (t <= start) return 0;
  if (dur <= 0 || t >= start + dur) return total;
  const u = (t - start) / dur;
  return Math.min(total, Math.round((total * (1 - Math.cos(Math.PI * u))) / 2));
}

/** Continuous 0→1 of the same curve — what the camera and the field ride. */
export function typedProgress(t: number, start: number, dur: number): number {
  if (t <= start) return 0;
  if (dur <= 0 || t >= start + dur) return 1;
  return (1 - Math.cos((Math.PI * (t - start)) / dur)) / 2;
}

/**
 * When the `count`-th character landed — the inverse of the sine ease.
 *
 * Needed because a caret does not blink on a wall clock, it blinks a fixed
 * interval after the last thing you typed. Anchoring the blink here is what
 * keeps it solid through the sentence and gets the two measured blinks after it
 * (off at 4.27s, on at 4.74s) for free.
 */
export function keystrokeAt(
  count: number,
  start: number,
  dur: number,
  total: number,
): number {
  if (count <= 0 || total <= 0) return start;
  const p = Math.min(1, count / total);
  return start + (dur * Math.acos(1 - 2 * p)) / Math.PI;
}

/** Caret visibility: solid while typing, then blinking from the last keystroke. */
export function caretOn(t: number, anchor: number, half: number): boolean {
  if (t < anchor) return false;
  if (half <= 0) return true;
  return Math.floor((t - anchor) / half) % 2 === 0;
}

export interface CameraShot {
  scale: number;
  x: number;
  y: number;
}

/**
 * The camera, as three hard states — there is no interpolation between them.
 *
 * Measured on the reference: the wide view is whole on one frame and fully
 * pushed in on the very next (1.958s → 1.975s), and the same again on the way
 * back out at 4.008s. Nothing in between, either time. Ramping it, even across
 * two frames, turns a cut into a zoom and the shot stops snapping.
 *
 * What *does* move is the middle state. It is not a fixed frame: it is pinned to
 * the caret, so as the sentence grows the camera tracks left with it. The pin is
 * on the **continuous** typing curve, not on the character count — which is why
 * the caret in the reference wobbles ±8px around its mark instead of sitting
 * dead still. Each keystroke jumps it forward; the camera slides underneath.
 *
 * Both marks are *fractions of the frame*, never pixel offsets, so a wider panel
 * or a bigger type size reframes rather than drifting off the edge.
 */
export function cameraFor(
  t: number,
  o: {
    cutInAt: number;
    cutOutAt: number;
    zoomIn: number;
    zoomOut: number;
    caretX: number;
    caretY: number;
    sendX: number;
    sendY: number;
    focusX: number;
    focusY: number;
    outX: number;
    outY: number;
  },
): CameraShot {
  if (t >= o.cutOutAt) {
    return {
      scale: o.zoomOut,
      x: o.outX * REF_W - o.zoomOut * o.sendX,
      y: o.outY * REF_H - o.zoomOut * o.sendY,
    };
  }
  if (t >= o.cutInAt) {
    return {
      scale: o.zoomIn,
      x: o.focusX * REF_W - o.zoomIn * o.caretX,
      y: o.focusY * REF_H - o.zoomIn * o.caretY,
    };
  }
  return { scale: 1, x: 0, y: 0 };
}

/**
 * Greedy row-fill for the suggestion row.
 *
 * Four short labels are one row and that is the shot the reference shows, but a
 * component that only works for four short labels is one that breaks the first
 * time somebody writes a real one. Anything that will not fit wraps, the panel
 * grows by exactly the rows it gained, and the stagger keeps running in label
 * order across them.
 */
