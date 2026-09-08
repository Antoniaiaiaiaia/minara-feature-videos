import { Composition, registerRoot } from "remotion";
import { S01v10, DURATION } from "./S01v10";

registerRoot(() => <Composition id="S01v10" component={S01v10}
  durationInFrames={DURATION} fps={30} width={1920} height={1080} />);
