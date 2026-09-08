import { Composition } from "remotion";
import { S01, S01_DURATION_FRAMES } from "./scenes/s01/S01";
import { S03, S03_DURATION_FRAMES } from "./scenes/s03/S03";
import { S03v2, S03V2_DURATION_FRAMES } from "./scenes/s03/S03v2";

export const Root: React.FC = () => {
  return (
    <>
      <Composition id="S03v3" component={S03v2} durationInFrames={Math.ceil(S03V2_DURATION_FRAMES / 0.7)}
        defaultProps={{ playbackSpeed: 0.7 }} fps={30} width={1920} height={1080} />
      <Composition id="S03v2" component={S03v2} durationInFrames={S03V2_DURATION_FRAMES}
        fps={30} width={1920} height={1080} />
      <Composition id="S03" component={S03} durationInFrames={S03_DURATION_FRAMES}
        fps={30} width={1920} height={1080} />
      <Composition
        id="S01"
        component={S01}
        durationInFrames={S01_DURATION_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
