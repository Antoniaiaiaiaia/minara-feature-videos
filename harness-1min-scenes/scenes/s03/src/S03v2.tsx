import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

/**
 * S03 v2 · product reveal + 
 *
 * the project owner 2026-09-06 21:10: "s03add an exit animationhold briefly on screen first
 * then fly left during the final second". Same 119 frames (3.667 – 7.633 s, timeline is fixed):
 *   0 – 64   window slides in from the right (v1 used 0 – 118, compressed ×0.68)
 *   4 – 80   components assemble one by one (v1 cues ×0.68, 16 f each instead of 20)
 *   80 – 89  brief hold on the assembled client
 *   89 – 118 whole window flies out to the left (30 f = 1.0 s), accelerating
 * v1 (S03.tsx, output/s03-product-reveal.mp4) is untouched.
 */
export const S03V2_DURATION_FRAMES = 119;
const WIDTH = 1439;
const HEIGHT = 900;
const SCALE = 1.62;
const ease = Easing.bezier(0.16, 1, 0.3, 1);

const SETTLE = 64;      // window reaches its resting x
const CUE_SCALE = 0.68; // v1 cue × this
const PIECE_DUR = 16;
const EXIT_START = 89;  // 30 f before the end = 1.0 s
const REST_X = 345;
const EXIT_X = -(WIDTH * SCALE + 120); // fully off the left edge

const cue = (v1: number) => Math.round(v1 * CUE_SCALE);

// Screenshot coordinates: each real UI component gets its own entrance (cues from v1).
const pieces = [
  { name: "Window controls", x: 10, y: 10, w: 293, h: 42, start: cue(4) },
  { name: "Account tools", x: 15, y: 70, w: 289, h: 44, start: cue(8) },
  ...["Office", "Markets", "Chat", "Coding", "Strategies", "Portfolio", "More"].map((name, i) =>
    ({ name, x: 20, y: 130 + 50 * i, w: 284, h: 50, start: cue(13 + 5 * i) })),
  { name: "Update", x: 15, y: 748, w: 294, h: 73, start: cue(46) },
  { name: "Profile", x: 20, y: 832, w: 284, h: 52, start: cue(49) },
  { name: "Breadcrumb", x: 335, y: 18, w: 200, h: 36, start: cue(33) },
  { name: "Avatar", x: 827, y: 103, w: 96, h: 95, start: cue(44) },
  { name: "Headline", x: 635, y: 210, w: 480, h: 48, start: cue(50) },
  { name: "Composer", x: 411, y: 308, w: 925, h: 213, start: cue(59) },
  ...[411, 648, 884, 1120].map((x, i) =>
    ({ name: `Quick action ${i + 1}`, x, y: 542, w: 216, h: 137, start: cue(72 + 5 * i) })),
  { name: "Activity", x: 572, y: 699, w: 603, h: 114, start: cue(88) },
  { name: "Explore", x: 732, y: 832, w: 280, h: 21, start: cue(91) },
  { name: "Market tape", x: 325, y: 853, w: 1109, h: 42, start: cue(94) },
];

// Mask the original components out of the shell so none appear twice.
const mask = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}"><rect width="100%" height="100%" fill="white"/>${pieces.map(p => `<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" fill="black"/>`).join("")}</svg>`)}`;
const source = staticFile("s03/desktop.png");

export const S03v2: React.FC<{ playbackSpeed?: number }> = ({ playbackSpeed = 1 }) => {
  const frame = useCurrentFrame() * playbackSpeed;
  const enterX = interpolate(frame, [0, SETTLE], [1950, REST_X], {
    easing: Easing.bezier(0.22, 0.75, 0.25, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  // Exit: ease-in so the window gathers speed and clears the frame on the last frame.
  const exitX = interpolate(frame, [EXIT_START, S03V2_DURATION_FRAMES - 1], [REST_X, EXIT_X], {
    easing: Easing.bezier(0.55, 0, 0.9, 0.35), extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const x = frame < EXIT_START ? enterX : exitX;
  return (
    <AbsoluteFill style={{ background: "#fff", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: x, top: 90, width: WIDTH, height: HEIGHT,
        transform: `scale(${SCALE})`, transformOrigin: "top left", borderRadius: 12,
        overflow: "hidden", background: "#080808" }}>
        <div style={{ position: "absolute", inset: "0 auto 0 0", width: 324,
          background: "linear-gradient(#2b2b2b, #191a19 35%)" }} />
        <Img src={source} style={{ position: "absolute", width: WIDTH, height: HEIGHT,
          maskImage: `url('${mask}')`, maskMode: "luminance" }} />
        {pieces.map(p => {
          const progress = interpolate(frame, [p.start, p.start + PIECE_DUR], [0, 1], {
            easing: ease, extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });
          return <div key={p.name} data-component={p.name} style={{ position: "absolute",
            left: p.x, top: p.y, width: p.w, height: p.h, overflow: "hidden",
            visibility: frame < p.start ? "hidden" : "visible",
            transform: `translateX(${(1 - progress) * 90}px)`,
            clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)` }}>
            <Img src={source} style={{ position: "absolute", width: WIDTH, height: HEIGHT,
              maxWidth: "none", left: -p.x, top: -p.y }} />
          </div>;
        })}
      </div>
    </AbsoluteFill>
  );
};
