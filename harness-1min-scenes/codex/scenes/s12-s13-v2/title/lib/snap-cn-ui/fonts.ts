/** Local faces available to this self-contained Remotion bundle. */
export const FONTS: Record<string, string> = {
  Geist: "Geist Local",
  "Geist Local": "Geist Local",
};

export const DEFAULT_FONT = "Default";
export const FONT_NAMES = [DEFAULT_FONT, ...Object.keys(FONTS)];

/** Keep arbitrary caller supplied CSS families usable when the host loads them. */
export const resolveFont = (name?: string): string | undefined =>
  !name || name === DEFAULT_FONT ? undefined : (FONTS[name] ?? name);
