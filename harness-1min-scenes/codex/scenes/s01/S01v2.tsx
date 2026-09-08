import { AbsoluteFill, Easing, interpolate, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { TextReveal } from "../../../remotion/src/registry/snap-cn/text-reveal";

/**
 * S01 · "Introducing" → "Minara Harness"
 *
 * Draft timeline (authoritative, scenes/timeline.json):
 *   S01  0.000 – 1.733 s  "Introducing"
 *   S02  1.733 – 3.667 s  "Minara Harness"
 * the project owner's prompt asks for one snapcn text-reveal where "Introducing" leads
 * and "Minara Harness" follows, so this composition spans both draft cards
 * (0 – 3.667 s = 110 frames @ 30 fps). The first trailing word ("Minara")
 * pushes in exactly on the draft's S01→S02 cut: frame 52 = 1.733 s.
 */
export const FPS = 30;
export const S01_DURATION_FRAMES = 110; // 3.667 s

// TextReveal schedule (frames). pushStart(Minara) = HOLD + WORD_DELAY = 52.
const HOLD = 34;        // lead word big + centred until 1.133 s
const WORD_DELAY = 18;  // Minara cuts in at frame 52 (1.733 s, the draft cut)
const RECEDE = 16;      // lead falls back 34 → 50
const ASSEMBLE = 34;    // line slides left 34 → 68
const WORD_STAGGER = 5; // Harness at frame 57
const WORD_DURATION = 16;

export const S01v2: React.FC = () => {
  const exitX = interpolate(useCurrentFrame(), [84, 106], [0, -1920], {
    easing: Easing.bezier(0.55, 0, 0.9, 0.35),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "#f5f5f7" }}>
      {/* Gray light-flow background: the 30 s seamless loop rendered in
          harness-launch-video/scenes/bg-light-flow (WebGL domain-warped silver
          plate). Used from t = 0, no re-grade. */}
      <OffthreadVideo
        src={staticFile("bg/bg-light-flow.mp4")}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill style={{ transform: `translateX(${exitX}px)` }}>
      <TextReveal
        text="Introducing Minara Harness"
        fontFamily="Geist"
        fontSize={96}
        fontWeight={600}
        color="#0a0a0b"
        letterSpacing="-0.03em"
        initialScale={2.3}
        introDuration={8}
        holdDuration={HOLD}
        pushScale={1.06}
        recedeDuration={RECEDE}
        assembleDuration={ASSEMBLE}
        wordDelay={WORD_DELAY}
        wordStagger={WORD_STAGGER}
        wordDuration={WORD_DURATION}
        wordPush={0.5}
        wordFade={2}
      />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
