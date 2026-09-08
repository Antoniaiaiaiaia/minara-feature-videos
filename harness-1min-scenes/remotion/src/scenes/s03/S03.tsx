import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

export const S03_DURATION_FRAMES = 119;
const WIDTH = 1439;
const HEIGHT = 900;
const ease = Easing.bezier(0.16, 1, 0.3, 1);

// Screenshot coordinates: each real UI component gets its own entrance.
const pieces = [
  { name: "Window controls", x: 10, y: 10, w: 293, h: 42, start: 4 },
  { name: "Account tools", x: 15, y: 70, w: 289, h: 44, start: 8 },
  ...["Office", "Markets", "Chat", "Coding", "Strategies", "Portfolio", "More"].map((name, i) =>
    ({ name, x: 20, y: 130 + 50 * i, w: 284, h: 50, start: 13 + 5 * i })),
  { name: "Update", x: 15, y: 748, w: 294, h: 73, start: 46 },
  { name: "Profile", x: 20, y: 832, w: 284, h: 52, start: 49 },
  { name: "Breadcrumb", x: 335, y: 18, w: 200, h: 36, start: 33 },
  { name: "Avatar", x: 827, y: 103, w: 96, h: 95, start: 44 },
  { name: "Headline", x: 635, y: 210, w: 480, h: 48, start: 50 },
  { name: "Composer", x: 411, y: 308, w: 925, h: 213, start: 59 },
  ...[411, 648, 884, 1120].map((x, i) =>
    ({ name: `Quick action ${i + 1}`, x, y: 542, w: 216, h: 137, start: 72 + 5 * i })),
  { name: "Activity", x: 572, y: 699, w: 603, h: 114, start: 88 },
  { name: "Explore", x: 732, y: 832, w: 280, h: 21, start: 91 },
  { name: "Market tape", x: 325, y: 853, w: 1109, h: 42, start: 94 },
];

// Mask the original components out of the shell so none appear twice.
const mask = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}"><rect width="100%" height="100%" fill="white"/>${pieces.map(p => `<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" fill="black"/>`).join("")}</svg>`)}`;
const source = staticFile("s03/desktop.png");

export const S03: React.FC = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 118], [1950, 345], {
    easing: Easing.bezier(0.22, 0.75, 0.25, 1), extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ background: "#fff", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: x, top: 90, width: WIDTH, height: HEIGHT,
        transform: "scale(1.62)", transformOrigin: "top left", borderRadius: 12,
        overflow: "hidden", background: "#080808" }}>
        <div style={{ position: "absolute", inset: "0 auto 0 0", width: 324,
          background: "linear-gradient(#2b2b2b, #191a19 35%)" }} />
        <Img src={source} style={{ position: "absolute", width: WIDTH, height: HEIGHT,
          maskImage: `url('${mask}')`, maskMode: "luminance" }} />
        {pieces.map(p => {
          const progress = interpolate(frame, [p.start, p.start + 20], [0, 1], {
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
