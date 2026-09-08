import { AbsoluteFill, Easing, interpolate, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { PunchLines, punchLinesDuration } from "./PunchLines-v4";

export const SCRIPT = "Introducing | Minara Harness";
export const HOLDS = "52,58";
export const DURATION = punchLinesDuration(SCRIPT, HOLDS);

export const S01v5 = () => {
  const frame = useCurrentFrame();
  const subtitle = interpolate(frame, [52, 70], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "#f5f5f7", overflow: "hidden" }}>
      <OffthreadVideo src={staticFile("bg/bg-light-flow.mp4")} muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <AbsoluteFill style={{ transform: `translateY(${frame >= 52 ? -34 : 0}px)` }}>
        <PunchLines script={SCRIPT} holds={HOLDS} styles="slide,punch"
          sizes="1.55,1" fontFamily="Geist" fontWeight={600} fontSize={112}
          ground="transparent" ink="#0a0a0b" accentBeat={0} slideDrop={0} />
      </AbsoluteFill>
      <div style={{ position: "absolute", top: "calc(50% + 70px)", width: "100%",
        textAlign: "center", fontFamily: "Geist", fontWeight: 400, fontSize: 38,
        lineHeight: 1.2, letterSpacing: "-0.02em", color: "#3a3a40",
        opacity: subtitle, transform: `translateY(${12 * (1 - subtitle)}px)` }}>
        the general financial intelligence
      </div>
    </AbsoluteFill>
  );
};
