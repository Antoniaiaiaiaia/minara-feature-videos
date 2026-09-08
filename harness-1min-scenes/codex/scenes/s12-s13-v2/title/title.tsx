import React from "react";
import { createRoot } from "react-dom/client";
import { Player, type PlayerRef } from "@remotion/player";
import { Sequence } from "remotion";
import { TextSwap } from "./components/snap-cn/text-swap";

const WIDTH = 1920;
const HEIGHT = 1080;
const FPS = 30;
const DURATION_IN_FRAMES = 51;
const SCRIPT_BASE =
  typeof document !== "undefined" && document.currentScript instanceof HTMLScriptElement
    ? new URL(".", document.currentScript.src).toString()
    : "";

function AutopilotTitle() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "transparent" }}>
      <Sequence from={0} durationInFrames={13}>
        <TextSwap
          fromText=""
          toText="Autopilot"
          transition="fly-through"
          exitDuration={1}
          overlap={1}
          microDelay={0}
          speed={2}
          fontSize={128}
          fontWeight={600}
          color="#141416"
          fontFamily="Geist Local"
        />
      </Sequence>
      <Sequence from={13}>
        <TextSwap
          fromText="Autopilot"
          toText="Where your profits flow."
          transition="fly-through"
          speed={1.8}
          fontSize={128}
          fontWeight={600}
          color="#141416"
          fontFamily="Geist Local"
        />
      </Sequence>
    </div>
  );
}

function TitlePlayer({ playerRef }: { playerRef: React.RefObject<PlayerRef | null> }) {
  return (
    <Player
      ref={playerRef}
      component={AutopilotTitle}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      compositionWidth={WIDTH}
      compositionHeight={HEIGHT}
      controls={false}
      clickToPlay={false}
      autoPlay={false}
      style={{ width: WIDTH, height: HEIGHT, background: "transparent" }}
    />
  );
}

function ensureLocalStyles() {
  if (document.querySelector("style[data-autopilot-title]") !== null) return;
  const style = document.createElement("style");
  style.dataset.autopilotTitle = "";
  style.textContent = `
    @font-face { font-family: "Geist Local"; src: url("${SCRIPT_BASE}assets/Geist-Regular.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: block; }
    @font-face { font-family: "Geist Local"; src: url("${SCRIPT_BASE}assets/Geist-SemiBold.woff2") format("woff2"); font-weight: 600; font-style: normal; font-display: block; }
  `;
  document.head.appendChild(style);
}

export function mountAutopilotTitle(element: HTMLElement) {
  if (!(element instanceof HTMLElement)) throw new TypeError("mountAutopilotTitle expects an HTMLElement");
  ensureLocalStyles();
  const playerRef = React.createRef<PlayerRef>();
  const root = createRoot(element);
  root.render(<TitlePlayer playerRef={playerRef} />);
  return {
    seek(seconds: number) {
      playerRef.current?.seekTo(Math.max(0, Math.min(DURATION_IN_FRAMES - 1, Math.round(seconds * FPS))));
    },
    pause() {
      playerRef.current?.pause();
    },
  };
}

declare global {
  interface Window {
    mountAutopilotTitle: typeof mountAutopilotTitle;
  }
}

if (typeof window !== "undefined") window.mountAutopilotTitle = mountAutopilotTitle;
