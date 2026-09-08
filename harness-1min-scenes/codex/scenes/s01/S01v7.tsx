import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { PunchLines, punchLinesDuration } from "./PunchLines-v7";

export const SCRIPT = "Introducing | Minara Harness | the general financial intelligence";
export const HOLDS = "30,90,60";
export const DURATION = punchLinesDuration(SCRIPT, HOLDS);

export const S01v7 = () => (
  <AbsoluteFill style={{ backgroundColor: "#f5f5f7", overflow: "hidden" }}>
    <OffthreadVideo src={staticFile("bg/bg-light-flow.mp4")} muted
      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <PunchLines script={SCRIPT} holds={HOLDS} styles="slide,punch,punch"
      sizes="1.55,1,0.82" fontFamily="Geist" fontWeight={600} fontSize={112}
      ground="transparent" ink="#0a0a0b" accentBeat={0} slideDrop={0} />
  </AbsoluteFill>
);
