# Text Blur Pop — Canonical Project Example

## Project default

Use this effect whenever text appears in the App 2.0 video, unless Antonia specifies another entrance.

## Canonical source

- Source composition: `index.html`
- Reference: the opening `Minara App 2.0` title.
- Font: Geist.

## Exact motion

```js
tl.fromTo(
  ".text-pop",
  { opacity: 0, y: 24, scale: 0.94, filter: "blur(12px)" },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    duration: 0.58,
    ease: "power3.out",
    stagger: 0.18,
  },
  0.2,
);
```

## Usage rules

- Animate whole words or meaningful phrase groups, not individual letters.
- For one text block, keep the same values and omit `stagger`.
- Preserve the final typography, position, spacing, and scale; the entrance resolves into the designed layout.
- Keep the movement vertical and subtle: 24px lift with a 0.94 → 1 scale settle.
- Do not replace `power3.out` with spring, bounce, elastic, or overshoot easing.
- Do not add rotation, random drift, motion trails, glow, or extra blur pulses unless explicitly requested.

Open `index.html` and click **Replay text pop** to review the reusable example.
