"use client";

/**
 * Project fork of snap-cn-ui/core/fonts.ts.
 *
 * Upstream loads six Google families through @remotion/google-fonts. This
 * project's STYLE.md requires Geist to be self-hosted (no network, no system
 * font), so the allowlist is exactly one face — Geist — registered from
 * public/fonts via @remotion/fonts. `resolveFont` keeps upstream semantics:
 * a known label resolves to the loaded CSS family, anything else passes
 * through unchanged, `undefined` stays `undefined`.
 */
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

const GEIST = "Geist";

// @remotion/fonts wraps the load in delayRender/continueRender, so a render
// waits for the face before capturing the first frame.
void loadFont({
  family: GEIST,
  url: staticFile("fonts/Geist-Regular.woff2"),
  weight: "400",
  format: "woff2",
});
void loadFont({
  family: GEIST,
  url: staticFile("fonts/Geist-SemiBold.woff2"),
  weight: "600",
  format: "woff2",
});

export const FONTS: Record<string, string> = {
  Geist: `"${GEIST}", -apple-system, BlinkMacSystemFont, sans-serif`,
};

export const DEFAULT_FONT = "Default";
export const FONT_NAMES = [DEFAULT_FONT, ...Object.keys(FONTS)];

export const resolveFont = (name?: string): string | undefined =>
  !name || name === DEFAULT_FONT ? undefined : (FONTS[name] ?? name);
