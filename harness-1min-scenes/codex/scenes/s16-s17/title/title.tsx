import React, {useEffect, useRef} from "react";
import {createRoot} from "react-dom/client";
import {Player, type PlayerRef} from "@remotion/player";
import {Sequence} from "remotion";
import {TextSwap} from "./components/snap-cn/text-swap";

const FIRST = "Learns from your trades.";
const SECOND = "Wins. Losses. Lessons.";
const DURATION = 60;

declare global {
  interface Window {
    S16Title?: {
      ready: boolean;
      seek: (frame: number) => Promise<void>;
    };
  }
}

function Title() {
  return (
    <div style={{position: "relative", width: 1920, height: 1080, background: "transparent"}}>
      <Sequence from={0} durationInFrames={25} layout="none">
        <TextSwap
          fromText=""
          toText={FIRST}
          transition="fade-through"
          exitDuration={1}
          enterDuration={8}
          overlap={1}
          microDelay={0}
          fontSize={110}
          color="#0a0a0b"
          fontWeight={400}
          fontFamily="Geist"
        />
      </Sequence>
      <Sequence from={25} durationInFrames={35} layout="none">
        <TextSwap
          fromText={FIRST}
          toText={SECOND}
          transition="fly-through"
          exitDuration={8}
          enterDuration={9}
          fontSize={110}
          color="#0a0a0b"
          fontWeight={400}
          fontFamily="Geist"
        />
      </Sequence>
    </div>
  );
}

function Preview() {
  const ref = useRef<PlayerRef>(null);

  useEffect(() => {
    window.S16Title = {
      ready: true,
      seek: async (frame) => {
        ref.current?.seekTo(Math.max(0, Math.min(DURATION - 1, Math.round(frame))));
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      },
    };
    return () => {
      delete window.S16Title;
    };
  }, []);

  return (
    <Player
      ref={ref}
      component={Title}
      durationInFrames={DURATION}
      fps={30}
      compositionWidth={1920}
      compositionHeight={1080}
      controls={false}
      clickToPlay={false}
      autoPlay={false}
      style={{width: 1920, height: 1080}}
    />
  );
}

createRoot(document.getElementById("headline-root")!).render(<Preview />);
