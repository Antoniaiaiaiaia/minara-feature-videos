"use client";

/**
 * The type faces a scene's `fontFamily` may name.
 *
 * ## Why an allowlist and not a free string
 *
 * This local scene vendors Geist beside its static bundle instead of loading a
 * Google font at runtime. The remaining labels stay available as raw family
 * names for registry compatibility, but this title only uses the local Geist
 * face.
 *
 * So a name only counts as a font here if this module has loaded it. Values map
 * label → the real CSS family string `loadFont` returns, which is not always the
 * label ("Instrument Serif", not "InstrumentSerif").
 *
 * ## A raw stack still works
 *
 * `resolveFont` passes anything it does not recognise straight through, so a
 * caller who has loaded their own face — a brand font, a local `@font-face` —
 * names it directly and gets it. The allowlist is the safe path, not the only one.
 *
 * ponytail: all six load at module scope, so a render fetches six latin subsets
 * whether or not the video uses them. Move to a lazy per-family `loadFont()` if
 * bundle time ever shows up in a render trace.
 */
export const FONTS: Record<string, string> = {
  Inter: "Inter",
  Geist: "Geist",
  "Space Grotesk": "Space Grotesk",
  Outfit: "Outfit",
  Montserrat: "Montserrat",
  "Instrument Serif": "Instrument Serif",
};

/**
 * What a select control offers. `DEFAULT_FONT` first: a scene's own face is a
 * design decision, so the knob has to have an "off", and it has to be the
 * value it ships at.
 */
export const DEFAULT_FONT = "Default";
export const FONT_NAMES = [DEFAULT_FONT, ...Object.keys(FONTS)];

/**
 * Label → loaded CSS family. Anything unrecognised passes through unchanged, so
 * a caller's own stack is never swallowed. `undefined` in, `undefined` out —
 * that is the signal for "keep the component's own face".
 */
export const resolveFont = (name?: string): string | undefined =>
  !name || name === DEFAULT_FONT ? undefined : (FONTS[name] ?? name);
