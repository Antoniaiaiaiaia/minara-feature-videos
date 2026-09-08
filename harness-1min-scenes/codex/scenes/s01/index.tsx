import { Composition, registerRoot } from "remotion";
import { S01v2, S01_DURATION_FRAMES } from "./S01v2";

registerRoot(() => <Composition id="S01v2" component={S01v2}
  durationInFrames={S01_DURATION_FRAMES} fps={30} width={1920} height={1080} />);
