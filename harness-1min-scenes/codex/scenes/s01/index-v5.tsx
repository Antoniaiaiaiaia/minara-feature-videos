import { Composition, registerRoot } from "remotion";
import { S01v5, DURATION } from "./S01v5";

registerRoot(() => <Composition id="S01v5" component={S01v5}
  durationInFrames={DURATION} fps={30} width={1920} height={1080} />);
