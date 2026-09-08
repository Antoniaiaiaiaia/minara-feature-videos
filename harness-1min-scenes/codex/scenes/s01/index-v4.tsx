import { Composition, registerRoot } from "remotion";
import { S01v4, DURATION } from "./S01v4";

registerRoot(() => <Composition id="S01v4" component={S01v4}
  durationInFrames={DURATION} fps={30} width={1920} height={1080} />);
