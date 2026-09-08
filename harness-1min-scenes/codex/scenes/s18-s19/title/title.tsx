import React, {useEffect, useRef} from "react";
import {createRoot} from "react-dom/client";
import {Player, type PlayerRef} from "@remotion/player";
import {TextSwap} from "./components/snap-cn/text-swap";

const TITLE = "Your models. One workspace.";
const DURATION = 55;

declare global {
  interface Window {
    S18Harness?: {ready:boolean;seek:(frame:number)=>Promise<void>};
    S18Ending?: {ready:boolean;seek:(frame:number)=>Promise<void>};
    S18Title?: {
      ready: boolean;
      seek: (frame: number) => Promise<void>;
    };
  }
}

function Title({ending=false,harness=false}:{ending?:boolean;harness?:boolean}) {
  return (
    <div style={{position: "relative", width: 1920, height: 1080, background: "transparent"}}>
      <TextSwap
        fromText=""
        toText={harness?"Harness":ending?"minara.ai":TITLE}
        transition="fly-through"
        exitDuration={1}
        enterDuration={harness?10:ending?8:13}
        overlap={1}
        microDelay={0}
        fontSize={ending?72:112}
        fontWeight={400}
        fontFamily="Geist"
        color="#15171a"
      />
    </div>
  );
}

function Preview({ending=false,harness=false}:{ending?:boolean;harness?:boolean}) {
  const ref = useRef<PlayerRef>(null);

  useEffect(() => {
    window[harness?"S18Harness":ending?"S18Ending":"S18Title"] = {
      ready: true,
      seek: async (frame) => {
        ref.current?.seekTo(Math.max(0, Math.min(DURATION - 1, Math.round(frame))));
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      },
    };
    return () => {
      delete window[harness?"S18Harness":ending?"S18Ending":"S18Title"];
    };
  }, [ending,harness]);

  return (
    <Player
      ref={ref}
      component={Title}
      inputProps={{ending,harness}}
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

createRoot(document.getElementById("ending-root")!).render(<Preview ending />);
