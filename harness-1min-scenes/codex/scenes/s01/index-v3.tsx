import { Composition, registerRoot } from "remotion";
import { S01v3, DURATION } from "./S01v3";

registerRoot(() => <Composition id="S01v3" component={S01v3}
  durationInFrames={DURATION} fps={30} width={1920} height={1080} />);
